import { Link } from 'react-router-dom';
import {
  MODULARITY_PILLARS,
  OFFICIAL_EXTENSIONS_SHOWCASE,
} from '../../data/extensionsShowcaseData';
import { PuzzleIcon } from '../Icons';

export function ModularPlatformSection() {
  return (
    <section
      id="modularity"
      className="w-full bg-white py-16 sm:py-24 px-6 sm:px-8 border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <PuzzleIcon className="size-3.5 text-[#7C3AED]" />
            <span>ADD-ONS &amp; MODULES</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            Start simple with billing. <span className="text-[#7C3AED]">Add tools as you grow.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Keep your billing counter fast and clutter-free. Start with Invio for everyday bills and stock, and turn on extra tools like POS, Restaurant, or Email only when your shop needs them.
          </p>
        </div>

        {/* 3 Simple Highlights (Clean Borderless Row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 sm:mb-16">
          {MODULARITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-3.5">
                <div className="size-10 rounded-squircle-sm bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Official Extensions Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Official Timrio Extensions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Every add-on works smoothly with your existing bills, products, and customers without slowing down your computer.
            </p>
          </div>
          <Link
            to="/features#extensions"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:underline shrink-0"
          >
            <span>See All Add-ons</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Clean Flat Grid of Extension Cards (No Outer Wrapper Card, No Nested Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFICIAL_EXTENSIONS_SHOWCASE.map((ext) => (
            <div
              key={ext.id}
              className="p-5 rounded-squircle bg-slate-50/70 border border-slate-200/80 hover:border-[#7C3AED]/40 hover:bg-white transition-all flex flex-col gap-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-squircle-sm overflow-hidden shrink-0">
                    <img
                      src={ext.logoUrl}
                      alt={`${ext.name} logo`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{ext.name}</h4>
                    <span className="text-xs text-slate-500">{ext.category}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                    ext.tier === 'Free'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                  }`}
                >
                  {ext.tier}{ext.status === 'Beta' ? ' · Beta' : ''}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {ext.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModularPlatformSection;
