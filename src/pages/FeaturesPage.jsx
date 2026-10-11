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
                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center select-none bg-gradient-to-br from-purple-50/50 via-white to-slate-50">
                          <div className="size-16 rounded-squircle bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center mb-4 text-[#7C3AED] group-hover:scale-110 transition-transform duration-300">
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
