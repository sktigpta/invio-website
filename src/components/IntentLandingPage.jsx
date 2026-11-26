import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from './PageContainer';
import { DownloadCta } from './DownloadCta';
import { FaqAccordion } from './FaqAccordion';
import { CheckIcon } from './Icons';

/**
 * Reusable SEO & conversion landing page layout for high-intent software categories
 * (Free Invoice Software, Offline Billing, GST Billing, POS Billing).
 */
export function IntentLandingPage({ content }) {
  useEffect(() => {
    applySEO(content.seoKey);
    window.scrollTo(0, 0);
  }, [content.seoKey]);

  return (
    <PageContainer
      badge={content.badge}
      title={content.title}
      subtitle={content.subtitle}
      center={true}
    >
      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link
          to="/download"
          className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center shadow-sm transition-colors"
        >
          Download Free for Desktop
        </Link>
        <Link
          to="/tools/invoice-generator"
          className="h-10 px-5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center shadow-sm transition-colors"
        >
          Try Online Invoice Generator →
        </Link>
      </div>

      {/* Key Highlights Grid */}
      <section className="mb-12" aria-labelledby="intent-highlights-heading">
        <h2
          id="intent-highlights-heading"
          className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight text-center mb-6"
        >
          {content.highlightsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.highlights.map((item) => (
            <article
              key={item.title}
              className="p-6 rounded-squircle bg-white border border-slate-200/90 shadow-sm hover:border-[#7C3AED]/40 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="size-6 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckIcon className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison Table: Invio vs Cloud Billing Subscriptions */}
      {content.comparisonRows?.length > 0 && (
        <section className="mb-12" aria-labelledby="intent-comparison-heading">
          <h2
            id="intent-comparison-heading"
            className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight text-center mb-5"
          >
            Invio Invoice vs Cloud Monthly Billing Apps
          </h2>
          <div className="overflow-x-auto rounded-squircle border border-slate-200/90 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <tr>
                  <th className="py-3.5 px-5 font-bold">Capability</th>
                  <th className="py-3.5 px-5 font-bold text-[#7C3AED]">Invio (Offline Desktop)</th>
                  <th className="py-3.5 px-5 font-bold text-slate-500">Typical Cloud Billing Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {content.comparisonRows.map((row) => (
                  <tr key={row.label} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">{row.label}</td>
                    <td className="py-3.5 px-5 font-semibold text-emerald-700">{row.invio}</td>
                    <td className="py-3.5 px-5 text-slate-500">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Resources & Internal Links */}
      {content.relatedLinks?.length > 0 && (
        <section className="mb-12 text-center" aria-label="Related Invio guides and tools">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Explore Related Invio Resources
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {content.relatedLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-full bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-xs font-semibold text-slate-700 hover:text-[#7C3AED] transition-colors shadow-sm"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Targeted FAQs */}
      {content.faqs?.length > 0 && (
        <section className="mb-12 max-w-3xl mx-auto" aria-labelledby="intent-faq-heading">
          <h2
            id="intent-faq-heading"
            className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={content.faqs} />
        </section>
      )}

      <DownloadCta
        title={content.ctaTitle}
        subtitle={content.ctaSubtitle}
      />
    </PageContainer>
  );
}

export default IntentLandingPage;
