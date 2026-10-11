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
    >
      <div className="my-6">
        <FaqAccordion items={FAQ_ITEMS} />
      </div>

      <div className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">Still have questions?</h2>
          <p className="text-xs text-slate-600">
            Our support engineering team is available to assist with setup, data migrations, and custom queries.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="mailto:support@timrio.com"
            className="h-9 px-4 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            Email support@timrio.com
          </a>
          <Link
            to="/support"
            className="text-xs font-semibold text-[#8646F4] hover:underline"
          >
            Help Center →
          </Link>
        </div>
      </div>

      <DownloadCta
        title="Ready to Try Invio?"
        subtitle="Version 1.0.2 is free forever for core desktop billing. Zero cloud setup required."
      />
    </PageContainer>
  );
}

export default FaqPage;
