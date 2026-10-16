import { API_BASE_URL } from '../utils/osDetector';

const TOKEN_KEY = 'invio_auth_token';
const USER_KEY = 'invio_auth_user';

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

export function getStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function getStoredUser() {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(token, user) {
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    if (user) sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.debug('[Auth] Storage write warning:', err);
  }
}

export function clearStoredAuth() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  } catch (err) {
    console.debug('[Auth] Storage clear warning:', err);
  }
}

export async function fetchAccountContext(token) {
  const authToken = token || getStoredToken();
  if (!authToken) return null;
  try {
    const res = await fetch(`${apiBase()}/api/account/context`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (data && data.success) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${apiBase()}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      if (data.token) {
        setStoredAuth(data.token, data.user);
      }
      return { success: true, user: data.user, token: data.token };
    }
    return {
      success: false,
      error: data.error || 'Failed to sign in. Please verify your credentials.',
      requiresVerification: Boolean(data.requiresVerification),
    };
  } catch {
    return { success: false, error: 'Could not connect to authentication server.' };
  }
}

export async function registerUser({ email, password, businessName }) {
  try {
    const res = await fetch(`${apiBase()}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
        businessName: businessName?.trim() || '',
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return {
        success: true,
        requiresVerification: Boolean(data.requiresVerification),
        message: data.message,
        email: data.email || email.trim().toLowerCase(),
      };
    }
    return {
      success: false,
      error: data.error || 'Registration failed. Please check your details.',
    };
  } catch {
    return { success: false, error: 'Could not connect to registration server.' };
  }
}

let activeGoogleCleanup = null;

export function triggerGoogleSignIn({ businessName = '', mode = 'signin', onSuccess, onError }) {
  if (activeGoogleCleanup) {
    activeGoogleCleanup();
    activeGoogleCleanup = null;
  }

  try {
    const sessionId = crypto.randomUUID();
    const base = apiBase();
    const authMode = mode === 'signup' ? 'signup' : 'signin';
    const loginUrl = `${base}/api/auth/google/login?sessionId=${encodeURIComponent(sessionId)}&mode=${encodeURIComponent(authMode)}&businessName=${encodeURIComponent(businessName)}`;

    let resolved = false;
    let pollInterval = null;
    let pollTimeout = null;
    let pollInFlight = false;

    // Open Google Sign-In in a centered popup window
    const width = 520;
    const height = 640;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const popup = window.open(
      loginUrl,
      'invio_google_signin',
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no`
    );

    const cleanup = () => {
      resolved = true;
      activeGoogleCleanup = null;
      if (pollInterval) clearInterval(pollInterval);
      if (pollTimeout) clearTimeout(pollTimeout);
      if (popup && !popup.closed) {
        try { popup.close(); } catch { /* ignore */ }
      }
    };
    activeGoogleCleanup = cleanup;

    pollInterval = setInterval(async () => {
      if (resolved || pollInFlight) return;
      if (popup && popup.closed) {
        // Run a final poll before treating closure as cancellation in case user closed after success
        try {
          const res = await fetch(`${base}/api/auth/google/poll?sessionId=${encodeURIComponent(sessionId)}`, {
            signal: AbortSignal.timeout(4000),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.token && data.user) {
              setStoredAuth(data.token, data.user);
              cleanup();
              if (onSuccess) onSuccess(data.user, data.token);
              return;
            }
          }
        } catch {
          // ignore final attempt error
        }
        cleanup();
        if (onError) onError('Google sign-in window was closed.');
        return;
      }
      pollInFlight = true;
      try {
        const res = await fetch(`${base}/api/auth/google/poll?sessionId=${encodeURIComponent(sessionId)}`, {
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.token && data.user) {
            setStoredAuth(data.token, data.user);
            cleanup();
            if (onSuccess) onSuccess(data.user, data.token);
          } else if (data.status === 'failed' || data.status === 'error') {
            cleanup();
            if (onError) onError(data.error || 'Google sign-in was cancelled or failed.');
          }
        }
      } catch {
        // Retry next interval
      } finally {
        pollInFlight = false;
      }
    }, 1500);

    pollTimeout = setTimeout(() => {
      if (!resolved) {
        cleanup();
        if (onError) onError('Google sign-in timed out. Please try again.');
      }
    }, 3 * 60 * 1000);
  } catch (err) {
    if (onError) onError(err?.message || 'Unable to start Google sign-in window.');
  }
}

export async function verifyEmail(email, code) {
  try {
    const res = await fetch(`${apiBase()}/api/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: email.trim().toLowerCase(), code: String(code).trim() }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      if (data.token && data.user) {
        setStoredAuth(data.token, data.user);
      }
      return { success: true, alreadyVerified: Boolean(data.alreadyVerified), user: data.user, token: data.token };
    }
    return { success: false, error: data.error || 'Verification failed. Please check the code.' };
  } catch {
    return { success: false, error: 'Could not connect to verification server.' };
  }
}

export async function resendVerification(email) {
  try {
    const res = await fetch(`${apiBase()}/api/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok && Boolean(data.success), message: data.message, retryAfterSeconds: data.retryAfterSeconds };
  } catch {
    return { success: false, error: 'Could not connect to verification server.' };
  }
}

export async function updateAccountProfile(data, token) {
  const authToken = token || getStoredToken();
  if (!authToken) return { success: false, error: 'Not authenticated.' };
  try {
    const res = await fetch(`${apiBase()}/api/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      if (result.user) {
        setStoredAuth(authToken, result.user);
      }
      return { success: true, user: result.user };
    }
    return { success: false, error: result.error || 'Failed to update profile.' };
  } catch {
    return { success: false, error: 'Could not connect to server.' };
  }
}

