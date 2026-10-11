import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { MailIcon } from '../components/Icons';

export function ContactPage() {
  useEffect(() => {
    applySEO('contact');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Direct Contact"
      title="Contact Invio by Timrio"
      subtitle="Have questions about Invio desktop software, need enterprise configuration, or want to report an issue? Reach out to our team."
    >
      <div className="my-8 p-6 rounded-squircle border border-slate-200/90 bg-white">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-50 text-[#7C3AED] shrink-0 mt-0.5">
            <MailIcon className="size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Customer Support &amp; Inquiries</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              For desktop app support, bug reports, licensing questions, and partnership inquiries:
            </p>
            <a
              href="mailto:support@timrio.com"
              className="text-sm font-bold text-[#7C3AED] hover:underline"
            >
              support@timrio.com
            </a>
            <p className="text-[11px] text-slate-500 mt-1">Typical response time: Within 24 business hours.</p>
          </div>
        </div>
      </div>

      <div className="my-8 p-5 rounded-squircle border border-slate-200/90 bg-white">
        <h2 className="text-sm font-bold text-slate-900 mb-3">Business Identity &amp; Publishing</h2>
        <div className="space-y-2 text-xs text-slate-600">
          <p>• <strong>Product:</strong> Invio Desktop Invoicing</p>
          <p>• <strong>Publisher / Organization:</strong> Timrio</p>
          <p>• <strong>Official Website:</strong> <a href="https://timrio.com" target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline">timrio.com</a></p>
          <p>• <strong>Contact Email:</strong> <a href="mailto:support@timrio.com" className="text-[#7C3AED] underline">support@timrio.com</a></p>
          <p>• <strong>Headquarters:</strong> India</p>
        </div>
      </div>

      <div className="my-8 p-5 rounded-squircle border border-slate-200/90 bg-white">
        <h2 className="text-sm font-bold text-slate-900 mb-2">Security Disclosures</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          For responsible vulnerability disclosures or security-related queries, please write directly to <a href="mailto:support@timrio.com" className="text-[#7C3AED] underline">support@timrio.com</a>. We review all submissions within 24 hours.
        </p>
      </div>
    </PageContainer>
  );
}

export default ContactPage;
