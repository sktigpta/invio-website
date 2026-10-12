import { useState, useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { MailIcon, CopyIcon, CheckIcon } from '../components/Icons';
import { submitContactMessage } from '../services/contactService';

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    applySEO('contact');
    window.scrollTo(0, 0);
  }, []);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText('support@timrio.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    setSending(true);
    try {
      await submitContactMessage({ name, email, subject, message });
      setSent(true);
    } catch (err) {
      setFormError(err.message || 'Failed to send your message. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <PageContainer
      title="Contact Us"
      subtitle="Send us a message — we usually reply within 24 hours."
      center={true}
    >
      <div className="w-full max-w-md mx-auto my-6">
        {/* Contact Card matching Checkout & Auth UI */}
        <div className="rounded-2xl border border-slate-200/90 bg-linear-to-b from-slate-50/70 to-white p-5 sm:p-6 shadow-xs mb-5">
          {/* Header row with avatar and email */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200/70">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 ring-2 ring-white">
                <MailIcon className="size-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 truncate">
                  Direct Support
                </h4>
                <p className="text-xs font-mono font-medium text-slate-600 truncate select-all">
                  support@timrio.com
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckIcon className="size-3 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="size-3 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Status info row */}
          <div className="pt-3.5 flex items-center justify-between gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Direct Email Channel
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Replies within 24h
            </span>
          </div>
        </div>

        {/* Contact form -> API -> contact sheet -> Zoho auto-reply */}
        {sent ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <CheckIcon className="size-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Thank you! We received your message.</h4>
            <p className="text-xs text-slate-600">
              We will get back to you soon — a confirmation email is on its way to <span className="font-mono font-semibold">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
              }}
              className="mt-4 text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] cursor-pointer"
            >
              Send another message →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  required
                  maxLength={100}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  required
                  maxLength={100}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="How can we help?"
                required
                maxLength={150}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your question, hardware setup, or licensing need..."
                required
                maxLength={5000}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#7C3AED]"
              />
            </div>

            {formError && (
              <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <MailIcon className="size-4" />
              <span>{sending ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        )}

        <p className="text-center text-[11px] text-slate-400 mt-5">
          Support hours: Monday – Friday, 9:00 AM – 6:00 PM IST
        </p>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
