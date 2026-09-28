import { API_BASE_URL } from '../utils/osDetector';

const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Razorpay-only support payment service for voluntary Invio contributions.
 * Backend endpoints: `/api/payment/create-order`, `/api/payment/verify`,
 * `/api/payment/order-status/:orderId`. There is no UPI-direct fallback —
 * Razorpay Checkout itself supports UPI, cards, netbanking and wallets.
 */

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

export async function createPaymentOrder(amount = 51) {
  const sanitizedAmount = Math.max(21, Math.min(100000, Math.round(Number(amount) || 51)));
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${apiBase()}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ amount: sanitizedAmount }),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data && data.success && data.order_id && data.key_id) {
      return {
        success: true,
        amount: sanitizedAmount,
        amountPaise: data.amount || sanitizedAmount * 100,
        currency: data.currency || 'INR',
        orderId: data.order_id,
        keyId: data.key_id,
        source: 'razorpay',
      };
    }
    return {
      success: false,
      amount: sanitizedAmount,
      error: (data && data.error) || 'Online payments are unavailable right now. You can still download Invio for free.',
    };
  } catch {
    return {
      success: false,
      amount: sanitizedAmount,
      error: 'Could not reach the payment server. You can still download Invio for free.',
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
export function openRazorpayCheckout({ keyId, orderId, amountPaise, currency = 'INR', amountRupees, onSuccess, onDismiss, onError }) {
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
      description: `Support Invio development — ₹${amountRupees}`,
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

/**
 * Legacy support function for existing components
 */
export async function fetchSupportQr(amount = 51) {
  return createPaymentOrder(amount);
}
