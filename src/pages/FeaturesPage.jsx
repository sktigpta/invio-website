import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { FEATURES_DATA } from '../data/featuresData';
import { FeatureIllustration } from '../components/FeatureIllustration';

export function FeaturesPage() {
  useEffect(() => {
    applySEO('features');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Product Capabilities"
      title="Invio Desktop Features & Capabilities"
      subtitle="Complete retail and wholesale billing capabilities without external cloud dependencies. Everything you need to manage customers, print thermal receipts, scan barcodes, and stay tax-compliant."
    >
      {/* Alternating Feature Showcase Rows: Image-Content, Content-Image, Image-Content */}
      <section className="space-y-12 sm:space-y-16 my-8">
        {FEATURES_DATA.map((feature, idx) => {
          const Icon = feature.icon;
          const isReversed = idx % 2 === 1;

          return (
            <div
              key={feature.id}
              className={`flex flex-col ${
                isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-8 lg:gap-12`}
            >
              {/* Visual Side (Illustration / Image) */}
              <div className="w-full lg:w-1/2">
                <FeatureIllustration type={feature.imageType} title={feature.title} />
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="size-8 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                    {feature.category}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-2.5 leading-snug">
                  {feature.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-3">
                  {feature.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 w-full mb-2">
                  {feature.bullets?.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* Clean Bottom CTA Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
            Ready to experience fast offline billing?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Download Invio v1.0.2 for your desktop. No credit card required, 100% private local SQLite database, and free forever for core invoicing.
          </p>
        </div>
        <Link
          to="/download"
          className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors shadow-xs shrink-0 select-none"
        >
          Download Free Now →
        </Link>
      </div>
    </PageContainer>
  );
}

export default FeaturesPage;
