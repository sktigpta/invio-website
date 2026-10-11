import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { FEATURES_DATA } from '../data/featuresData';

export function FeaturesPage() {
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

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

                  {/* Image Container Column - Clean image / placeholder for your custom screenshots */}
                  <div className="flex-1 w-full flex items-center justify-center">
                    <div className="w-full aspect-[4/3] rounded-squircle-lg bg-gradient-to-br from-slate-100 to-slate-200/80 border border-slate-200 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md group">
                      {feature.imageUrl ? (
                        <img
                          src={feature.imageUrl}
                          alt={feature.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center p-8 select-none flex flex-col items-center justify-center">
                          <div className="size-16 rounded-squircle-sm bg-white/80 border border-slate-200/90 shadow-2xs flex items-center justify-center mb-3 text-slate-400 group-hover:text-[#7C3AED] group-hover:border-purple-200 transition-colors">
                            <svg className="size-8 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                            {feature.title} Preview
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Screenshot Placeholder
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

      {/* 3. Bottom CTA Section (Timrio Style) */}
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
            <Link
              to="/download"
              className="h-12 px-8 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold flex items-center justify-center transition-colors shadow-md select-none"
            >
              Download Free for Desktop →
            </Link>
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
