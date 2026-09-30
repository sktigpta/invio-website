import { API_BASE_URL } from '../utils/osDetector';

const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Razorpay payment service for Invio plan subscriptions.
 * Backend endpoints: `/api/payment/create-subscription-order`,
 * `/api/payment/verify`, `/api/payment/order-status/:orderId`,
 * `/api/account/plans`. There is no UPI-direct fallback —
 * Razorpay Checkout itself supports UPI, cards, netbanking and wallets.
 */

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

/**
 * Fetches public plan pricing from the backend catalog
 * (`GET /api/account/plans`). This is the single source of truth for
 * subscription prices — the pricing page never hardcodes amounts and falls
 * back to bundled defaults only when the API is unreachable.
 */
export async function fetchSubscriptionPlans() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${apiBase()}/api/account/plans`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && data.success && Array.isArray(data.plans)) {
      return { success: true, plans: data.plans };
    }
    return { success: false, error: (data && data.error) || 'Could not load plans.' };
  } catch {
    return { success: false, error: 'Could not reach the server.' };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Creates a Razorpay order for a plan subscription. The chargeable amount is
 * resolved server-side from the plan catalog — only `{ planId, validity }`
 * (`monthly` | `yearly`) is sent, never an amount.
 */
export async function createSubscriptionOrder(planId, validity) {
  const plan = String(planId || '').trim().toLowerCase();
  const term = String(validity || '').trim().toLowerCase();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${apiBase()}/api/payment/create-subscription-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ planId: plan, validity: term }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && data.success && data.order_id && data.key_id) {
      return {
        success: true,
        amount: data.amount_rupees,
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
export async function verifyPayment({ orderId, paymentId, signature }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${apiBase()}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature,
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
 * `onSuccess` receives { orderId, paymentId, signature } from Checkout's
 * handler — the caller must still pass it to `verifyPayment`.
 */
export function openRazorpayCheckout({ keyId, orderId, amountPaise, currency = 'INR', amountRupees, description, onSuccess, onDismiss, onError }) {
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
      theme: { color: '#8646F4' },
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
