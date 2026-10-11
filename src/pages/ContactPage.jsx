import { useState, useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { CopyIcon, CheckIcon } from '../components/Icons';

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
      <div className="py-6 max-w-xl">
        <h2 className="text-base font-bold text-slate-900 mb-1.5">
          Email Support
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          For any help, questions, or issues, write to us directly:
        </p>

        <div className="flex items-center gap-3 mb-3">
          <a
            href="mailto:support@timrio.com"
            className="text-lg font-mono font-bold text-[#7C3AED] hover:underline"
          >
            support@timrio.com
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <CheckIcon className="size-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <CopyIcon className="size-3.5 text-slate-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Typically replies within 24 business hours.
        </p>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
