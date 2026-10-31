import { API_BASE_URL } from '../utils/osDetector';
import { getStoredToken } from './authService';

const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Razorpay payment service for Invio plan subscriptions.
 * Backend endpoints:
 * - GET  /api/account/plans
 * - POST /api/payment/create-subscription-order
 * - POST /api/payment/verify
 * - GET  /api/payment/order-status/:orderId
 */

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

/**
 * Fetches public plan pricing from the backend catalog (GET /api/account/plans).
 * This is the single source of truth for subscription prices.
 */
export async function fetchSubscriptionPlans() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${apiBase()}/api/account/plans`, {
      method: 'GET',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && data.success && Array.isArray(data.plans)) {
      return { success: true, plans: data.plans };
    }
    return { success: false, error: (data && data.error) || 'Could not load plans from server.' };
  } catch {
    return { success: false, error: 'Could not reach the server.' };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Validates a discount / coupon code against the backend pricing catalog.
 */
export async function validateDiscount(code, planId = 'plus', validity = 'yearly', customerUserId = null) {
  const cleanCode = String(code || '').trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, message: 'Please enter a coupon code.' };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const response = await fetch(`${apiBase()}/api/payment/validate-discount`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        code: cleanCode,
        planId: String(planId).toLowerCase(),
        validity: String(validity).toLowerCase(),
        customerUserId,
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && (data.valid || data.success)) {
      return {
        valid: true,
        code: data.code || cleanCode,
        discountType: data.discountType,
        discountValue: data.discountValue,
        discountAmount: data.discountAmount,
        finalAmount: data.finalAmount,
        baseAmount: data.baseAmount,
        message: data.message || `Coupon "${cleanCode}" applied successfully!`,
      };
    }
    return {
      valid: false,
      message: (data && (data.message || data.error)) || 'Invalid or expired coupon code.',
    };
  } catch {
    return {
      valid: false,
      message: 'Could not connect to verify the coupon. Please try again.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Creates a Razorpay order for a plan subscription. The chargeable amount is
 * resolved server-side from the plan catalog — only `{ planId, validity, couponCode? }`
 * is sent, never an amount.
 */
export async function createSubscriptionOrder(planId, validity, couponCode = null, customerUserId = null) {
  const plan = String(planId || '').trim().toLowerCase();
  const term = String(validity || '').trim().toLowerCase();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  try {
    const response = await fetch(`${apiBase()}/api/payment/create-subscription-order`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        planId: plan,
        validity: term,
        ...(couponCode ? { couponCode: String(couponCode).trim().toUpperCase() } : {}),
        ...(customerUserId ? { customerUserId } : {}),
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && data.success && data.order_id && data.key_id) {
      return {
        success: true,
        amount: data.amount_rupees,
        baseAmount: data.base_amount_rupees,
        discountApplied: data.discount_applied || 0,
        couponCode: data.coupon_code || null,
        amountPaise: data.amount,
        currency: data.currency || 'INR',
        orderId: data.order_id,
        keyId: data.key_id,
        plan: data.plan || plan,
        validity: data.validity || term,
        source: 'razorpay',
      };
    }
    return {
      success: false,
      error: (data && data.error) || 'Could not start the subscription checkout. Please try again.',
      code: data && data.code,
    };
  } catch {
    return {
      success: false,
      error: 'Could not reach the payment server. Check your connection and try again.',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Asks the backend to verify the Razorpay Checkout signature server-side.
 * Client-reported success is never trusted on its own.
 */
export async function verifyPayment({
  orderId,
  paymentId,
  signature,
  email,
  planId,
  validity,
  businessName,
  firstName,
  lastName,
  password,
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${apiBase()}/api/payment/verify`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
        email: email || undefined,
        planId: planId || undefined,
        validity: validity || undefined,
        businessName: businessName || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        password: password || undefined,
      }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    return { success: response.ok && data && data.verified === true, data };
  } catch {
    return { success: false };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Polls payment status for a Razorpay order ID (returns 'pending' | 'success' | 'expired').
 */
export async function checkPaymentStatus(orderId) {
  if (!orderId) return { status: 'unknown' };
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`${apiBase()}/api/payment/order-status/${encodeURIComponent(orderId)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        orderId: data.order_id,
        status: data.status || 'unknown',
      };
    }
  } catch {
    /* silent network retry */
  }

  return { success: false, status: 'unknown' };
}

let checkoutScriptPromise = null;

/** Loads Razorpay Checkout.js exactly once. Resolves false when unreachable. */
export function loadRazorpayCheckout() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (!checkoutScriptPromise) {
    checkoutScriptPromise = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = RAZORPAY_CHECKOUT_SRC;
      script.async = true;
      script.onload = () => resolve(Boolean(window.Razorpay));
      script.onerror = () => {
        checkoutScriptPromise = null;
        resolve(false);
      };
      document.head.appendChild(script);
    });
  }
  return checkoutScriptPromise;
}

/**
 * Opens Razorpay Checkout for a backend-created order.
 * Uses Invio brand violet (#7C3AED).
 */
export function openRazorpayCheckout({
  keyId,
  orderId,
  amountPaise,
  currency = 'INR',
  amountRupees,
  description,
  customerEmail,
  customerPhone,
  onSuccess,
  onDismiss,
  onError,
}) {
  if (!window.Razorpay) {
    onError?.(new Error('Payment window could not be loaded. Check your connection and try again.'));
    return;
  }
  try {
    const rzp = new window.Razorpay({
      key: keyId,
      order_id: orderId,
      amount: amountPaise,
      currency,
      name: 'Invio',
      description: description || `Invio Plus subscription — ₹${amountRupees}`,
      theme: { color: '#7C3AED' },
      prefill: {
        ...(customerEmail ? { email: customerEmail } : {}),
        ...(customerPhone ? { contact: customerPhone } : {}),
      },
      handler(response) {
        onSuccess?.({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => onDismiss?.(),
      },
    });
    rzp.on('payment.failed', (resp) => {
      onError?.(new Error((resp && resp.error && resp.error.description) || 'Payment failed. No money was deducted.'));
    });
    rzp.open();
  } catch (err) {
    onError?.(err instanceof Error ? err : new Error('Could not open the payment window.'));
  }
}
