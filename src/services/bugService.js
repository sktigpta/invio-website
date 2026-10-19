import { API_BASE_URL } from '../utils/osDetector';

function apiBase() {
  try {
    return new URL(API_BASE_URL).toString().replace(/\/$/, '');
  } catch {
    return API_BASE_URL || '';
  }
}

/**
 * Submit a public bug report to the Invio issue tracking engine.
 * @param {Object} report
 * @param {string} report.title
 * @param {string} [report.category]
 * @param {string} [report.severity]
 * @param {string} [report.os]
 * @param {string} [report.appVersion]
 * @param {string} report.description
 * @param {string} [report.stepsToReproduce]
 * @param {string} [report.email]
 * @param {string} [report.logs]
 */
export async function submitBugReport(report) {
  const res = await fetch(`${apiBase()}/api/bugs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit bug report. Please try again.');
  }
  return data;
}

/**
 * Check the status of an existing bug ticket.
 * @param {string} ticketId - e.g. INV-BUG-ABCD-123456
 */
export async function checkBugStatus(ticketId) {
  const cleanedTicket = String(ticketId || '').trim();
  if (!cleanedTicket) {
    throw new Error('Please enter a ticket ID.');
  }

  const res = await fetch(`${apiBase()}/api/bugs/status/${encodeURIComponent(cleanedTicket)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Ticket not found or lookup failed.');
  }
  return data;
}
