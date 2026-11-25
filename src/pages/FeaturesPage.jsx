import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { FEATURES_DATA } from '../data/featuresData';
import {
  MODULARITY_PILLARS,
  OFFICIAL_EXTENSIONS_SHOWCASE,
} from '../data/extensionsShowcaseData';
import { useDownloadModal } from '../context/DownloadModalContext';

export function FeaturesPage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('features');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 overflow-hidden">
      {/* 1. Full-Page Hero Header (Timrio Style) */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-purple-50/40 via-white to-white">
        {/* Soft Ambient Radial Violet Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-8 text-center relative z-10">
          <span className="block text-[#7C3AED] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4">
            Product Capabilities &amp; Architecture
          </span>

          <h1 className="mb-6 text-center text-slate-900">
            <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Manage exactly
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-[#7C3AED] to-slate-900 mt-1">
              how you work.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A comprehensive offline desktop billing engine designed for retail stores, supermarkets, pharmacies, and traders who demand speed, reliability, and 100% data privacy.
          </p>
        </div>
      </section>

      {/* 2. Full-Page Alternating Feature Showcase Sections (Timrio Style) */}
      <div className="w-full">
        {FEATURES_DATA.map((feature, idx) => {
          const isReversed = idx % 2 === 1;
          const isAlternateBg = isReversed;

          return (
            <section
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
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {feature.title}
                    </h2>

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
                    <div className="w-full aspect-[16/10] sm:aspect-[3/2] rounded-squircle bg-white border border-slate-200/90 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md group">
                      {feature.imageUrl ? (
                        <img
                          src={feature.imageUrl}
                          alt={feature.imageAlt || `${feature.title} - Invio desktop invoicing`}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center select-none bg-gradient-to-br from-purple-50/50 via-white to-slate-50">
                          <div className="size-16 rounded-squircle bg-purple-50/90 shadow-2xs flex items-center justify-center mb-4 text-[#7C3AED] group-hover:scale-110 transition-transform duration-300">
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
            </section>
          );
        })}
      </div>

      {/* 3. Comprehensive Modular Extensions & Capabilities Deep-Dive */}
      <section id="extensions" className="w-full py-16 sm:py-24 bg-gradient-to-b from-purple-50/35 via-white to-white border-t border-slate-200 scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-8 max-w-[1200px]">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-4">
              Every Extension Explained
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              Modular by design. <span className="text-[#7C3AED]">Built for real counters.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every add-on is checked by Timrio and works neatly alongside your billing—so you only turn on the tools your shop actually needs.
            </p>
          </div>

          {/* 3 Simple Highlights (Clean Borderless Row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {MODULARITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="flex items-start gap-3.5">
                  <div className="size-10 rounded-squircle-sm bg-purple-100/80 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{pillar.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Extension Breakdown Rows (No Nested Cards) */}
          <div className="space-y-6">
            {OFFICIAL_EXTENSIONS_SHOWCASE.map((ext) => (
              <article
                key={ext.id}
                className="p-6 sm:p-8 rounded-squircle bg-white border border-slate-200/80"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
                  <div className="lg:w-5/12 space-y-3.5">
                    <div className="flex items-center gap-3.5">
                      <div className="size-12 rounded-squircle-sm overflow-hidden shrink-0">
                        <img
                          src={ext.logoUrl}
                          alt={`${ext.name} logo`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-extrabold text-slate-900">{ext.name}</h3>
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                              ext.tier === 'Free'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                            }`}
                          >
                            {ext.tier}{ext.status === 'Beta' ? ' · Beta' : ''}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-slate-500">{ext.category}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {ext.summary}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <strong className="text-slate-900 font-semibold">Works with your bills:</strong> {ext.integration}
                    </p>
                  </div>

                  <div className="lg:w-7/12">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      What You Can Do
                    </h4>
                    <ul className="space-y-2.5">
                      {ext.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="size-1.5 rounded-full bg-[#7C3AED] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA Section (Timrio Style) */}
      <section className="w-full bg-slate-50 text-center py-20 sm:py-28 relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Ready to upgrade your shop&rsquo;s billing?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Download Invio for free. No credit card required, zero setup hurdles, and operates 100% offline on your desktop computer.
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
              className="h-12 px-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 text-sm font-semibold flex items-center justify-center transition-colors shadow-xs select-none"
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
