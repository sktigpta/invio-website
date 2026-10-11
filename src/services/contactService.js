import { API_BASE_URL } from '../utils/osDetector';

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

/**
 * Submit an inquiry or support request to the Invio backend
 * @param {Object} payload
 * @param {string} payload.name
 * @param {string} payload.email
 * @param {string} payload.category
 * @param {string} payload.subject
 * @param {string} payload.message
 * @returns {Promise<{ success: boolean, ticketId?: string, error?: string, mailtoFallback?: string }>}
 */
export async function submitContactMessage({ name, email, category = 'support', subject, message }) {
  const mailtoFallback = `mailto:support@timrio.com?subject=${encodeURIComponent(`[${category}] ${subject || 'Inquiry'}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  try {
    const res = await fetch(`${apiBase()}/api/bugs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `[${category}] ${subject.trim()}`,
        category: category.toLowerCase(),
        severity: 'low',
        os: typeof navigator !== 'undefined' ? navigator.platform || 'web' : 'web',
        appVersion: 'website',
        email: email.trim().toLowerCase(),
        description: `Name: ${name.trim()}\nEmail: ${email.trim()}\nCategory: ${category}\n\nMessage:\n${message.trim()}`,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      return {
        success: true,
        ticketId: data.ticketId || null,
      };
    }

    return {
      success: false,
      error: data.error || 'Could not send message through the online gateway.',
      mailtoFallback,
    };
  } catch (err) {
    return {
      success: false,
      error: 'Network connection issue. Please use direct email.',
      mailtoFallback,
    };
  }
}
