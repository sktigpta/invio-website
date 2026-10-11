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

  const topics = [
    {
      title: 'Technical Support',
      icon: MailIcon,
      subject: 'Technical Support - Invio',
      tag: 'Engineering',
      items: [
        'ESC/POS thermal printer setup (58mm / 80mm)',
        'Local SQLite database export & restore',
        'Multi-counter LAN setup & crash diagnostics',
      ],
      tip: 'Tip: Include your OS and app version.',
    },
    {
      title: 'Billing & Licenses',
      icon: ReceiptIcon,
      subject: 'Billing & License - Invio',
      tag: 'Accounts',
      items: [
        'Invio Plus license unlocks & activations',
        'Tax invoice receipts & payment records',
        'Subscription renewals & plan queries',
      ],
      tip: 'Tip: Include your registered email or Order ID.',
    },
    {
      title: 'Security & Privacy',
      icon: ShieldCheckIcon,
      subject: 'Security Disclosure - Invio',
      tag: 'Security',
      items: [
        'Responsible vulnerability disclosures',
        'Zero-telemetry & local storage audits',
        'Data privacy architecture questions',
      ],
      tip: 'Tip: Reviewed by security team within 24h.',
    },
  ];

  return (
    <PageContainer
      badge="Direct Support"
      title="Contact Us"
      subtitle="Direct email support for Invio desktop users, retailers, and developers."
    >
      {/* 1. Primary Email Hub Card */}
      <div className="my-6 p-5 sm:p-7 rounded-2xl border border-slate-200/90 bg-linear-to-b from-purple-50/30 to-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0 ring-4 ring-purple-50">
              <MailIcon className="size-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Primary Support Channel
              </span>
              <span className="text-lg sm:text-xl font-mono font-extrabold text-slate-900 select-all">
                support@timrio.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="mailto:support@timrio.com"
              className="h-10 px-5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <MailIcon className="size-3.5" />
              <span>Open Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="h-10 px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
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

        {/* Status specs strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Turnaround</span>
            <span className="font-semibold text-slate-800">&lt; 24 Business Hours</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Operating Hours</span>
            <span className="font-semibold text-slate-800">Mon – Fri, 9 AM – 6 PM IST</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Method</span>
            <span className="font-semibold text-slate-800">100% Direct Email</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Publisher</span>
            <span className="font-semibold text-slate-800">Timrio (India)</span>
          </div>
        </div>
      </div>

      {/* 2. Structured Topic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-6">
        {topics.map((t, idx) => {
          const Icon = t.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:border-purple-200 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="size-9 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                    <Icon className="size-4.5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    {t.tag}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2.5">
                  {t.title}
                </h3>

                <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
                  {t.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#7C3AED] font-bold text-[11px] leading-tight">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 truncate mr-2">
                  {t.tip}
                </span>
                <a
                  href={`mailto:support@timrio.com?subject=${encodeURIComponent(t.subject)}`}
                  className="font-bold text-[#7C3AED] hover:text-[#6D28D9] shrink-0"
                >
                  Email →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Specs & Quick Links Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 my-6">
        {/* Business Specs */}
        <div className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 shadow-2xs">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Publishing Identity
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Product</span>
              <span className="font-semibold text-slate-800">Invio Desktop</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Publisher</span>
              <span className="font-semibold text-slate-800">Timrio</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Website</span>
              <a
                href="https://timrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
              >
                <span>timrio.com</span>
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Region</span>
              <span className="font-semibold text-slate-800">Global (India HQ)</span>
            </div>
          </div>
        </div>

        {/* Self-Service Shortcuts */}
        <div className="p-5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            Instant Self-Help Guides
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/faq"
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100 flex items-center justify-between"
            >
              <span>FAQ</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              to="/docs/installation"
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100 flex items-center justify-between"
            >
              <span>Install Guide</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              to="/system-requirements"
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100 flex items-center justify-between"
            >
              <span>Requirements</span>
              <span className="text-slate-400">→</span>
            </Link>
            <Link
              to="/tools"
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-[#7C3AED] text-slate-700 font-medium transition-colors border border-slate-100 flex items-center justify-between"
            >
              <span>Free Tools</span>
              <span className="text-slate-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
