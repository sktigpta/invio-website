import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import {
  MailIcon,
  CopyIcon,
  CheckIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  ClockIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from '../components/Icons';

export function ContactPage() {
  const [copied, setCopied] = useState(false);

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

  const contactTopics = [
    {
      title: 'Technical & Bug Support',
      desc: 'Assistance with installation, ESC/POS thermal printers, local SQLite database exports, and multi-counter LAN setups.',
      email: 'support@timrio.com',
      subject: 'Technical Support - Invio',
      icon: MailIcon,
      badge: 'Engineering',
      badgeColor: 'bg-purple-50 text-[#7C3AED] border-purple-200/80',
    },
    {
      title: 'Licensing & Billing',
      desc: 'Inquiries about Invio Plus activation, Razorpay invoice receipts, plan renewals, or payment queries.',
      email: 'support@timrio.com',
      subject: 'Licensing & Billing - Invio',
      icon: ReceiptIcon,
      badge: 'Billing',
      badgeColor: 'bg-purple-50 text-[#7C3AED] border-purple-200/80',
    },
    {
      title: 'Security & Responsible Disclosure',
      desc: 'Security vulnerability reports, zero-cloud data privacy verification, and infrastructure queries.',
      email: 'support@timrio.com',
      subject: 'Security Disclosure - Invio',
      icon: ShieldCheckIcon,
      badge: 'Security',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
  ];

  return (
    <PageContainer
      badge="Direct Email Support"
      title="Contact Us"
      subtitle="We handle all customer support, technical troubleshooting, and licensing inquiries directly through email."
    >
      {/* 1. Primary Email Support Hero Box */}
      <div className="my-8 p-6 sm:p-10 rounded-2xl border border-slate-200/90 bg-linear-to-b from-purple-50/40 via-white to-white shadow-xs text-center max-w-3xl mx-auto">
        <div className="size-14 rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center mx-auto mb-4 shadow-2xs ring-4 ring-purple-50">
          <MailIcon className="size-7" />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Email Our Support Team
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
          We provide dedicated human support directly via email. Every message is reviewed by our engineering and product team.
        </p>

        {/* Email Highlight & Action Buttons */}
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2.5 p-2 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs max-w-full">
          <div className="px-4 py-2 text-sm sm:text-base font-bold text-slate-900 font-mono tracking-tight select-all">
            support@timrio.com
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="mailto:support@timrio.com"
              className="flex-1 sm:flex-initial h-9 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <MailIcon className="size-3.5" />
              <span>Email Us</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial h-9 px-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <CheckIcon className="size-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="size-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="size-3.5 text-slate-400" />
            Typical turnaround: Within 24 business hours
          </span>
          <span>•</span>
          <span>Monday to Friday, 9:00 AM – 6:00 PM IST</span>
        </div>
      </div>

      {/* 2. Topic-Specific Email Channels */}
      <div className="my-10">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-4">
          Choose a Topic for Faster Response
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {contactTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-purple-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="size-10 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${topic.badgeColor}`}>
                      {topic.badge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {topic.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href={`mailto:${topic.email}?subject=${encodeURIComponent(topic.subject)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
                  >
                    <span>Send email</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Publisher Identity & Quick Self-Service Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-10">
        {/* Business Identity */}
        <div className="p-6 rounded-2xl border border-slate-200/90 bg-linear-to-b from-slate-50/70 to-white shadow-2xs">
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
              <span className="text-slate-400 font-medium">Official Website</span>
              <a
                href="https://timrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#7C3AED] hover:underline flex items-center gap-1"
              >
                <span>timrio.com</span>
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-slate-400 font-medium">Support Contact</span>
              <a
                href="mailto:support@timrio.com"
                className="font-medium text-[#7C3AED] hover:underline"
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
                Working Hours
              </span>
              <span className="font-medium text-slate-700 text-right">Monday – Friday, 9:00 AM – 6:00 PM IST</span>
            </div>
          </div>
        </div>

        {/* Immediate Self-Service Resources */}
        <div className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">
            Looking for Immediate Answers?
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Check our guides, requirements, and answers before sending an email:
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
    </PageContainer>
  );
}

export default ContactPage;
