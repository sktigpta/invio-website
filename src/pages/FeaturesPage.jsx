import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { FEATURES_DATA } from '../data/featuresData';
import { OFFICIAL_EXTENSIONS_SHOWCASE } from '../data/extensionsShowcaseData';
import { useDownloadModal } from '../context/DownloadModalContext';

const CATEGORY_ACCENTS = [
  'text-[#7C3AED] bg-purple-50 border-purple-200/70',
  'text-sky-700 bg-sky-50 border-sky-200/70',
  'text-emerald-700 bg-emerald-50 border-emerald-200/70',
  'text-amber-700 bg-amber-50 border-amber-200/70',
  'text-indigo-700 bg-indigo-50 border-indigo-200/70',
  'text-rose-700 bg-rose-50 border-rose-200/70',
];

export function FeaturesPage() {
  const { openDownloadModal } = useDownloadModal();
  const coreFeatures = FEATURES_DATA.filter((f) => f.id !== 'extensions-marketplace');

  useEffect(() => {
    applySEO('features');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 overflow-hidden">
      {/* 1. Official Add-ons / Extensions (Sorted Most-Used to Least-Used) */}
      <section id="extensions" className="w-full py-14 sm:py-20 bg-slate-50/60 border-b border-slate-200 scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-8 max-w-[1200px]">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3">
              Add-ons &amp; Features
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 leading-tight">
              Official <span className="text-[#7C3AED]">Add-ons</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Extra tools built into Invio, sorted from the most commonly used to specialized shop tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICIAL_EXTENSIONS_SHOWCASE.map((ext, index) => {
              const isLastOdd =
                OFFICIAL_EXTENSIONS_SHOWCASE.length % 2 === 1 &&
                index === OFFICIAL_EXTENSIONS_SHOWCASE.length - 1;

              return (
                <article
                  key={ext.id}
                  className={`p-6 sm:p-7 rounded-squircle bg-white border border-slate-200/90 shadow-sm hover:border-[#7C3AED]/40 hover:shadow-md transition-all ${
                    isLastOdd ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={isLastOdd ? 'flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10' : 'space-y-4'}>
                    <div className={isLastOdd ? 'lg:w-5/12 space-y-3' : 'space-y-3'}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div className="size-11 rounded-squircle-sm overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                            <img
                              src={ext.logoUrl}
                              alt={`${ext.name} logo`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </div>
                          <div>
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                              {ext.name}
                            </h2>
                            <span className="text-xs font-medium text-slate-500">{ext.category}</span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border shrink-0 ${
                            ext.tier === 'Free'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                          }`}
                        >
                          {ext.tier}{ext.status === 'Beta' ? ' · Beta' : ''}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {ext.summary}
                      </p>
                    </div>

                    <ul className={`space-y-2 ${isLastOdd ? 'lg:w-7/12' : ''}`}>
                      {ext.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <span className="size-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. All Core Features (After Extensions) */}
      <section id="all-features" className="w-full pt-14 sm:pt-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-8 max-w-[1200px] text-center mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3">
            Built-in Features (Free Forever)
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 leading-tight">
            All everyday billing &amp; <span className="text-[#7C3AED]">shop features</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything below comes built into Invio from day one—works without internet and keeps all your records safely on your computer.
          </p>
        </div>

        <div className="w-full">
          {coreFeatures.map((feature, idx) => {
            const isReversed = idx % 2 === 1;
            const isAlternateBg = isReversed;

            return (
              <div
                key={feature.id}
                className={`w-full py-16 sm:py-24 ${
                  isAlternateBg ? 'bg-slate-50/70' : 'bg-white'
                }`}
              >
                <div className="container mx-auto px-6 sm:px-8 max-w-[1200px]">
                  <div
                    className={`flex flex-col ${
                      isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                    } items-center gap-12 lg:gap-16`}
                  >
                    {/* Content Column */}
                    <div className="flex-1 space-y-5">
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider border px-3 py-1 rounded-full ${CATEGORY_ACCENTS[idx % CATEGORY_ACCENTS.length]}`}>
                        {feature.category}
                      </span>

                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {feature.title}
                      </h3>

                      <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                        {feature.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <ul className="space-y-3 pt-1">
                        {feature.bullets?.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                            <span className="size-2 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1 w-full flex items-center justify-center">
                      <div className="w-full aspect-[16/10] sm:aspect-[3/2] rounded-squircle bg-white border border-slate-200/90 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md group">
                        {feature.imageUrl ? (
                          <img
                            src={feature.imageUrl}
                            alt={feature.imageAlt || `${feature.title} - Invio free invoice software`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center select-none bg-gradient-to-br from-purple-50/50 via-white to-slate-50">
                            <div className="size-16 rounded-squircle bg-purple-50/90 shadow-sm flex items-center justify-center mb-4 text-[#7C3AED] group-hover:scale-110 transition-transform duration-300">
                              {feature.icon ? <feature.icon className="size-8" /> : null}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 px-3 py-1 rounded-full mb-2">
                              {feature.category}
                            </span>
                            <span className="text-sm font-bold text-slate-800 max-w-xs leading-snug">
                              {feature.tagline}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Bottom CTA Section */}
      <section className="w-full bg-slate-50 text-center py-20 sm:py-28 relative overflow-hidden border-t border-slate-200">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Ready to simplify your shop&rsquo;s billing?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Download Invio for free. No credit card needed, easy 2-minute setup, and works 100% without internet on your computer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openDownloadModal()}
              className="h-12 px-8 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold flex items-center justify-center transition-colors shadow-md select-none cursor-pointer"
            >
              Download Free for Desktop →
            </button>
            <Link
              to="/pricing"
              className="h-12 px-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-sm font-semibold flex items-center justify-center transition-colors shadow-sm select-none"
            >
              View Free &amp; Plus Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;
