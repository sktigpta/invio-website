import { API_BASE_URL } from '../utils/osDetector';

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL;
  }
}

export async function submitContactMessage({ name, email, subject, message }) {
  const res = await fetch(`${apiBase()}/api/contact`, {
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
