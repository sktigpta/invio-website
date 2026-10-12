import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { FaqAccordion } from '../components/FaqAccordion';
import { FAQ_ITEMS } from '../data/faqData';
import { DownloadCta } from '../components/DownloadCta';

export function FaqPage() {
  useEffect(() => {
    applySEO('faq');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Support & Answers"
      title="Frequently Asked Questions (FAQ)"
      subtitle="Everything you need to know about Invio desktop invoicing software, offline local SQLite storage, thermal printing, and GST compliance."
      center={true}
    >
      <div className="my-6 max-w-3xl mx-auto">
        <FaqAccordion items={FAQ_ITEMS} />
      </div>

      <div className="my-8 max-w-3xl mx-auto p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1">Still have questions?</h2>
          <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
            Our support engineering team is available to assist with hardware configuration, thermal printer setup, data migrations, and custom billing rules.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="mailto:support@timrio.com"
            className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-2xs select-none"
          >
            Email support@timrio.com
          </a>
          <Link
            to="/support"
            className="text-xs font-semibold text-[#7C3AED] hover:underline"
          >
            Help Center →
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <DownloadCta
          title="Ready to Try Invio?"
          subtitle="Version 1.0.2 is free forever for core desktop billing. Zero cloud setup required."
        />
      </div>
    </PageContainer>
  );
}

export default FaqPage;
