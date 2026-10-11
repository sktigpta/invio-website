import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import {
  MailIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  SendIcon,
} from '../components/Icons';
import { submitContactMessage } from '../services/contactService';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Technical Support',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { success: boolean, message: string, ticketId?: string, mailtoFallback?: string }

  useEffect(() => {
    applySEO('contact');
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name.trim()) {
      setStatus({ success: false, message: 'Please enter your full name.' });
      return;
    }

    const cleanEmail = formData.email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      setStatus({ success: false, message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.subject.trim()) {
      setStatus({ success: false, message: 'Please enter a subject for your message.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ success: false, message: 'Please write a message with at least 10 characters.' });
      return;
    }

    setLoading(true);

    const result = await submitContactMessage({
      name: formData.name,
      email: cleanEmail,
      category: formData.category,
      subject: formData.subject,
      message: formData.message,
    });

    setLoading(false);

    if (result.success) {
      setStatus({
        success: true,
        ticketId: result.ticketId,
        message: 'Thank you! Your message has been received. Our support team will reply to your email within 24 business hours.',
      });
      setFormData({
        name: '',
        email: '',
        category: 'Technical Support',
        subject: '',
        message: '',
      });
    } else {
      setStatus({
        success: false,
        message: result.error || 'Could not send message automatically.',
        mailtoFallback: result.mailtoFallback,
      });
    }
  };

  return (
    <PageContainer
      badge="Direct Support"
      title="Contact Us"
      subtitle="Have questions about Invio desktop software, need hardware setup assistance, or want volume licensing? Reach out to our engineering team."
    >
      {/* 1. Quick Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-8">
        {/* Support Channel */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-purple-200 transition-colors flex flex-col justify-between">
          <div>
            <div className="size-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-3.5">
              <MailIcon className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Technical Support</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Assistance with local SQLite database backups, thermal printer setup, or app installation.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href="mailto:support@timrio.com"
              className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors flex items-center gap-1"
            >
              support@timrio.com →
            </a>
            <span className="text-[11px] text-slate-400">Within 24h</span>
          </div>
        </div>

        {/* Sales & Commercial Channel */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-purple-200 transition-colors flex flex-col justify-between">
          <div>
            <div className="size-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mb-3.5">
              <ReceiptIcon className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Sales &amp; Upgrades</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Questions about Invio Plus, multi-terminal shop networks, custom licensing, and enterprise quotes.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href="mailto:support@timrio.com?subject=Sales%20Inquiry%20-%20Invio"
              className="text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors flex items-center gap-1"
            >
              support@timrio.com →
            </a>
            <span className="text-[11px] text-slate-400">Sales inquiries</span>
          </div>
        </div>

        {/* Security & Disclosures */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-emerald-200 transition-colors flex flex-col justify-between">
          <div>
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5">
              <ShieldCheckIcon className="size-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Security &amp; Trust</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Responsible vulnerability disclosures, privacy audit requests, or zero-telemetry architecture questions.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href="mailto:support@timrio.com?subject=Security%20Disclosure"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              support@timrio.com →
            </a>
            <span className="text-[11px] text-slate-400">Priority review</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Message Form & Information Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 my-8 items-start">
        {/* Left Section: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-white shadow-xs">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Send Us a Direct Message
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Fill in your details below and our team will get back to your inbox promptly.
            </p>
          </div>

          {status && (
            <div
              className={`p-4 rounded-xl text-xs mb-5 border ${
                status.success
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {status.success ? (
                  <CheckIcon className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <span className="size-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{status.message}</p>
                  {status.ticketId && (
                    <p className="text-[11px] text-emerald-700 mt-1">
                      Reference Ticket ID:{' '}
                      <span className="font-mono font-bold bg-white/70 px-1.5 py-0.5 rounded border border-emerald-300">
                        {status.ticketId}
                      </span>
                    </p>
                  )}
                  {status.mailtoFallback && (
                    <div className="mt-2.5">
                      <a
                        href={status.mailtoFallback}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-full font-semibold text-xs hover:bg-rose-700 transition-colors shadow-2xs"
                      >
                        <MailIcon className="size-3" />
                        Send via Email App Instead
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Full Name <span className="text-purple-600">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  required
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-purple-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@business.com"
                  required
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer"
                >
                  <option value="Technical Support">Technical Support</option>
                  <option value="Licensing & Payments">Licensing &amp; Payments</option>
                  <option value="Printer & Hardware">Printer &amp; Hardware Setup</option>
                  <option value="Feature Request">Feature Request / Feedback</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Subject Line <span className="text-purple-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Assistance setting up thermal receipt printer"
                  required
                  className="w-full h-10 px-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Message &amp; Details <span className="text-purple-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your question, issue, or setup requirement with as much detail as possible..."
                required
                className="w-full p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all resize-y"
              />
              <span className="block text-[11px] text-slate-400 mt-1 text-right">
                {formData.message.length} characters
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <SendIcon className="size-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Section: Publisher Info & Immediate Help (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Business & Organization Card */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-linear-to-b from-slate-50/80 to-white shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3.5 pb-2 border-b border-slate-200/70 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#7C3AED]" />
              Business Identity &amp; Publishing
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium">Product</span>
                <span className="font-semibold text-slate-900 text-right">Invio Desktop Invoicing</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium">Publisher</span>
                <span className="font-semibold text-slate-900 text-right">Timrio</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium">Website</span>
                <a
                  href="https://timrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#7C3AED] hover:underline text-right"
                >
                  timrio.com
                </a>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium">Support Email</span>
                <a
                  href="mailto:support@timrio.com"
                  className="font-medium text-[#7C3AED] hover:underline text-right"
                >
                  support@timrio.com
                </a>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <MapPinIcon className="size-3 text-slate-400" />
                  Headquarters
                </span>
                <span className="font-medium text-slate-700 text-right">India (Worldwide Software Distribution)</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <ClockIcon className="size-3 text-slate-400" />
                  Support Hours
                </span>
                <span className="font-medium text-slate-700 text-right">Monday – Friday, 9am – 6pm IST</span>
              </div>
            </div>
          </div>

          {/* Quick Help Resources */}
          <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              Looking for Immediate Answers?
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Find instant solutions in our documentation, requirements, and guides:
            </p>
            <div className="space-y-2 text-xs">
              <Link
                to="/faq"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100"
              >
                <span>Frequently Asked Questions</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                to="/docs/installation"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100"
              >
                <span>Installation &amp; Setup Walkthrough</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                to="/system-requirements"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100"
              >
                <span>Hardware &amp; System Requirements</span>
                <span className="text-slate-400">→</span>
              </Link>
              <Link
                to="/tools"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50/60 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100"
              >
                <span>Free Invoicing &amp; Tax Calculators</span>
                <span className="text-slate-400">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
