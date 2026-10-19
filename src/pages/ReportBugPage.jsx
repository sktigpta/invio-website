import { useState, useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { detectDeviceOS, APP_VERSION } from '../utils/osDetector';
import { submitBugReport, checkBugStatus } from '../services/bugService';
import { CheckIcon, CopyIcon } from '../components/Icons';

export function ReportBugPage() {
  const [activeTab, setActiveTab] = useState('report'); // 'report' | 'status'

  // Report Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('invoicing');
  const [severity, setSeverity] = useState('medium');
  const [os, setOs] = useState('');
  const [appVersion, setAppVersion] = useState(APP_VERSION);
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [email, setEmail] = useState('');
  const [logs, setLogs] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdTicket, setCreatedTicket] = useState(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Status Lookup state
  const [lookupTicketId, setLookupTicketId] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [ticketDetails, setTicketDetails] = useState(null);

  useEffect(() => {
    applySEO('report-bug');
    window.scrollTo(0, 0);

    const detected = detectDeviceOS();
    if (detected && detected.name) {
      setOs(detected.name);
    }
  }, []);

  async function handleReportSubmit(e) {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const res = await submitBugReport({
        title,
        category,
        severity,
        os,
        appVersion,
        description,
        stepsToReproduce,
        email,
        logs,
      });
      setCreatedTicket(res.ticketId || res.report?.ticketId || 'BUG-REGISTERED');
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit bug report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLookupSubmit(e) {
    e.preventDefault();
    setLookupError('');
    setTicketDetails(null);
    setLookingUp(true);
    try {
      const res = await checkBugStatus(lookupTicketId);
      if (res && res.ticket) {
        setTicketDetails(res.ticket);
      } else {
        setLookupError('Ticket record not found.');
      }
    } catch (err) {
      setLookupError(err.message || 'Ticket lookup failed.');
    } finally {
      setLookingUp(false);
    }
  }

  function handleCopyTicket(ticketId) {
    try {
      navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <PageContainer
      title="Issue Reporting & Diagnostic Desk"
      subtitle="Found an issue or unexpected behavior? Report it directly to our engineering team."
      center={true}
    >
      <div className="w-full max-w-2xl mx-auto my-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center p-1 bg-slate-200/70 rounded-xl mb-6 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'report'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Submit Bug Report
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeTab === 'status'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Check Ticket Status
          </button>
        </div>

        {activeTab === 'report' ? (
          createdTicket ? (
            <div className="rounded-2xl border border-emerald-200 bg-linear-to-b from-emerald-50/70 to-white p-6 sm:p-8 shadow-sm text-center">
              <div className="size-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <CheckIcon className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Issue Registered Successfully</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-5">
                Our core engineering team has received your diagnostic report and scheduled an investigation.
              </p>

              <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 font-mono text-sm text-slate-800 font-bold mb-6">
                <span>{createdTicket}</span>
                <button
                  type="button"
                  onClick={() => handleCopyTicket(createdTicket)}
                  className="p-1 text-slate-500 hover:text-purple-600 transition cursor-pointer"
                  title="Copy Ticket ID"
                >
                  {copiedTicket ? <CheckIcon className="size-4 text-emerald-600" /> : <CopyIcon className="size-4" />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLookupTicketId(createdTicket);
                    setActiveTab('status');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
                >
                  Track This Ticket →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedTicket(null);
                    setTitle('');
                    setDescription('');
                    setStepsToReproduce('');
                    setLogs('');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Submit Another Report
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleReportSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4 text-left"
            >
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900">Report a Software Problem</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your feedback helps us eliminate glitches across Windows, macOS, and Linux.
                </p>
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Problem Area / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="invoicing">Invoicing &amp; Calculations</option>
                    <option value="printing">Thermal &amp; A4 Printing</option>
                    <option value="pdf">PDF Export &amp; Formatting</option>
                    <option value="email-dispatch">Email &amp; WhatsApp Dispatch</option>
                    <option value="database">Database, Backup &amp; Storage</option>
                    <option value="ui">UI, Shortcuts &amp; Display</option>
                    <option value="crash">Crash or Freeze</option>
                    <option value="general">General / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Severity Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-[#7C3AED]"
                  >
                    <option value="low">Low — Minor cosmetic or typo</option>
                    <option value="medium">Medium — Annoying but workaround exists</option>
                    <option value="high">High — Important feature broken</option>
                    <option value="critical">Critical — Blocks daily billing / app crashes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GST roundoff error on multi-item invoice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Operating System</label>
                  <input
                    type="text"
                    value={os}
                    onChange={(e) => setOs(e.target.value)}
                    placeholder="e.g. macOS Apple Silicon, Windows 11"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">App Version</label>
                  <input
                    type="text"
                    value={appVersion}
                    onChange={(e) => setAppVersion(e.target.value)}
                    placeholder="e.g. 1.0.2"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what occurred, what you expected to happen, and any error message displayed..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Steps to Reproduce</label>
                <textarea
                  rows={2}
                  value={stepsToReproduce}
                  onChange={(e) => setStepsToReproduce(e.target.value)}
                  placeholder="1. Open Invoices tab&#10;2. Click New Invoice&#10;3. Click Save &amp; Print"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email (for updates &amp; resolution notices)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Console Logs / Stack Traces (Optional)
                  </label>
                  <input
                    type="text"
                    value={logs}
                    onChange={(e) => setLogs(e.target.value)}
                    placeholder="Paste relevant diagnostic text"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Submitting Report...' : 'Submit Diagnostic Report →'}
                </button>
              </div>
            </form>
          )
        ) : (
          /* Status Lookup Tab */
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5 text-left">
            <div>
              <h3 className="text-base font-bold text-slate-900">Check Issue Status</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your ticket reference code (e.g. INV-BUG-ABCD-123456) to see current engineering progress.
              </p>
            </div>

            <form onSubmit={handleLookupSubmit} className="flex gap-2">
              <input
                type="text"
                required
                value={lookupTicketId}
                onChange={(e) => setLookupTicketId(e.target.value)}
                placeholder="Enter Ticket ID (e.g. INV-BUG-ABCD-123456)"
                className="flex-1 px-3.5 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:border-[#7C3AED] text-slate-800"
              />
              <button
                type="submit"
                disabled={lookingUp}
                className="px-5 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs rounded-lg transition cursor-pointer disabled:opacity-50"
              >
                {lookingUp ? 'Checking...' : 'Check Status'}
              </button>
            </form>

            {lookupError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
                {lookupError}
              </div>
            )}

            {ticketDetails && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#7C3AED]">{ticketDetails.ticketId}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{ticketDetails.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                      ticketDetails.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        : ticketDetails.status === 'investigating'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}
                  >
                    {ticketDetails.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                    <span className="font-medium text-slate-700 capitalize">{ticketDetails.category}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Severity</span>
                    <span className="font-medium text-slate-700 capitalize">{ticketDetails.severity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Reported On</span>
                    <span className="font-medium text-slate-700">
                      {ticketDetails.createdAt ? new Date(ticketDetails.createdAt).toLocaleDateString() : '—'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
