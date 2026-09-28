import { API_BASE_URL } from '../utils/osDetector';
import { generateQrSvgString } from '../utils/qrCode';

/**
 * Service to create FamGateway dynamic UPI payment orders & verify live transaction clearance.
 * Interacts with backend `/api/payment/create-order` and `/api/payment/order-status/:orderId`.
 * Transparently falls back to client-side UPI generation if backend is waking up or offline.
 */

export async function createPaymentOrder(amount = 51) {
  const sanitizedAmount = Math.max(21, Math.min(100000, Math.round(Number(amount) || 51)));

  let validatedBase = API_BASE_URL;
  try {
    validatedBase = new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    /* keep default */
  }

  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${validatedBase}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        amount: sanitizedAmount,
        redirect_url: typeof window !== 'undefined' ? window.location.href : 'https://invio.timrio.com',
      }),
      signal: controller.signal,
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.success) {
        return {
          success: true,
          amount: sanitizedAmount,
          payableAmount: data.payable_amount || String(sanitizedAmount),
          orderId: data.order_id || null,
          checkoutUrl: data.checkout_url || null,
          qrUrl: data.qr_url || null,
          upiIntent: data.upi_intent || null,
          qrSvg: data.qrSvg || (data.upi_intent ? generateQrSvgString(data.upi_intent, 220) : null),
          expiresAt: data.expires_at || null,
          source: data.source || 'famgateway',
        };
      }
    }
  } catch {
    // Graceful fallback on API unreachable/timeout
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }

  // Client-side fallback if backend is sleeping (uses FamGateway VPA)
  try {
    const params = new URLSearchParams({
      pa: 'sktigpta@fam',
      pn: 'FamPay',
      am: String(sanitizedAmount),
      cu: 'INR',
      tn: 'FamGateway-Invio',
    });
    const upiPayload = `upi://pay?${params.toString()}`;
    const fallbackSvg = generateQrSvgString(upiPayload, 220);
    return {
      success: true,
      amount: sanitizedAmount,
      payableAmount: String(sanitizedAmount),
      orderId: null,
      checkoutUrl: null,
      qrUrl: null,
      upiIntent: upiPayload,
      qrSvg: fallbackSvg,
      expiresAt: null,
      source: 'famgateway_fallback',
    };
  } catch (err) {
    return {
      success: false,
      amount: sanitizedAmount,
      error: err instanceof Error ? err.message : 'Failed to generate payment QR',
    };
  }
}

/**
 * Polls payment status for a FamGateway order ID (returns 'pending' | 'success' | 'expired').
 */
export async function checkPaymentStatus(orderId) {
  if (!orderId) return { status: 'unknown' };

  let validatedBase = API_BASE_URL;
  try {
    validatedBase = new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    /* keep default */
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(`${validatedBase}/api/payment/order-status/${encodeURIComponent(orderId)}`, {
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

/**
 * Legacy support function for existing components
 */
export async function fetchSupportQr(amount = 51) {
  return createPaymentOrder(amount);
}
