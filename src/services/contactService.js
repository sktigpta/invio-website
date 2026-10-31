import { API_BASE_URL } from '../utils/osDetector';

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

async function fetchWithTimeout(url, options, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

export async function submitContactMessage({ name, email, subject, message }) {
  const res = await fetchWithTimeout(`${apiBase()}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to send your message. Please try again.');
  }
  return data;
}
