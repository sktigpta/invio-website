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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <PuzzleIcon className="size-3.5 text-[#7C3AED]" />
            <span>MODULAR ARCHITECTURE</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            Start with a fast core. <span className="text-[#7C3AED]">Add modules as you grow.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Invio separates essential billing from specialized workflows. Keep your counter fast with Invio Core, and plug in verified, sandboxed extensions only when your business needs them.
          </p>
        </div>

        {/* 3 Modularity Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {MODULARITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-squircle bg-slate-50/70 border border-slate-200/90 flex flex-col gap-3"
              >
                <div className="size-10 rounded-squircle-sm bg-purple-100/80 text-[#7C3AED] flex items-center justify-center shrink-0">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Official Extensions Overview Grid */}
        <div className="rounded-squircle border border-slate-200 bg-gradient-to-br from-[#fbf9fe] via-white to-slate-50/60 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Official Timrio Extensions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Every module integrates directly with Invio Core data while running in its own isolated sandbox.
              </p>
            </div>
            <Link
              to="/features#extensions"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:underline shrink-0"
            >
              <span>Deep-Dive Every Extension</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {OFFICIAL_EXTENSIONS_SHOWCASE.map((ext) => {
              const Icon = ext.icon;
              return (
                <div
                  key={ext.id}
                  className="p-5 rounded-squircle bg-white border border-slate-200/90 hover:border-[#7C3AED]/40 transition-colors flex flex-col justify-between gap-4 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-9 rounded-squircle-sm bg-slate-50 border border-slate-200/70 flex items-center justify-center shrink-0 overflow-hidden p-1">
                          <img
                            src={ext.logoUrl}
                            alt={`${ext.name} extension logo`}
                            className="size-7 object-contain"
                            width="28"
                            height="28"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-tight">{ext.name}</h4>
                          <span className="text-[11px] text-slate-500">{ext.category}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                          ext.tier === 'Free'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-purple-50 text-[#7C3AED] border-purple-200'
                        }`}
                      >
                        {ext.tier}{ext.status === 'Beta' ? ' · Beta' : ''}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {ext.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {ext.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModularPlatformSection;
