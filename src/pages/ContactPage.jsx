import { useState, useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { MailIcon, CopyIcon, CheckIcon } from '../components/Icons';

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

  return (
    <PageContainer
      title="Contact Us"
      subtitle="Email us for support and inquiries."
    >
      <div className="my-12 max-w-lg mx-auto text-center p-8 sm:p-10 rounded-2xl border border-slate-200/90 bg-white shadow-xs">
        <div className="size-12 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto mb-4">
          <MailIcon className="size-6" />
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
          Email Support
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          For any help, questions, or issues, write to us directly:
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 max-w-full">
          <span className="px-3.5 py-1.5 text-sm sm:text-base font-mono font-bold text-slate-900 select-all">
            support@timrio.com
          </span>

          <div className="flex items-center gap-1.5">
            <a
              href="mailto:support@timrio.com"
              className="h-8 px-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <MailIcon className="size-3.5" />
              <span>Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="h-8 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <CheckIcon className="size-3 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="size-3 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          We typically reply within 24 business hours.
        </p>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
