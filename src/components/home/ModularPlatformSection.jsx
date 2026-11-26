import { useState, useEffect } from 'react';
import {
  MODULARITY_PILLARS,
  OFFICIAL_EXTENSIONS_SHOWCASE,
} from '../../data/extensionsShowcaseData';
import { PuzzleIcon, CheckIcon } from '../Icons';
import { API_BASE_URL } from '../../utils/osDetector';

export function ModularPlatformSection() {
  const [extensions, setExtensions] = useState(OFFICIAL_EXTENSIONS_SHOWCASE);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/extensions/catalog`, { headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        const remoteList = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.extensions)
            ? data.extensions
            : null;
        if (remoteList && remoteList.length > 0) {
          const remoteMap = new Map(remoteList.map((r) => [r.id, r]));
          const merged = OFFICIAL_EXTENSIONS_SHOWCASE.map((local) => {
            const remote = remoteMap.get(local.id);
            if (!remote) return local;
            return {
              ...local,
              name: local.name || remote.name,
              summary: local.summary || remote.description || '',
              highlights: local.highlights?.length ? local.highlights : remote.features || [],
              logoUrl: remote.iconUrl || `${API_BASE_URL}/api/extensions/logo/${remote.id}`,
            };
          });
          for (const remote of remoteList) {
            if (!OFFICIAL_EXTENSIONS_SHOWCASE.some((l) => l.id === remote.id)) {
              merged.push({
                id: remote.id,
                name: remote.name,
                summary: remote.description || '',
                highlights: remote.features || [],
                logoUrl: remote.iconUrl || `${API_BASE_URL}/api/extensions/logo/${remote.id}`,
              });
            }
          }
          setExtensions(merged);
        }
      })
      .catch(() => {
        // Keep immediate local showcase
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="modularity"
      className="w-full bg-white py-16 sm:py-24 px-6 sm:px-8 border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
            <PuzzleIcon className="size-3.5 text-[#7C3AED]" />
            <span>OFFICIAL INVIO ADD-ONS</span>
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            Start simple with billing. <span className="text-[#7C3AED]">Add tools as you grow.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Turn on POS, Customer Screen, Restaurant QR ordering, Email, or WhatsApp in 1 click—without slowing down your computer.
          </p>
        </div>

        {/* Alternating Left-Right / Right-Left Add-on Showcase */}
        <div className="space-y-16 sm:space-y-24 mb-16 sm:mb-20">
          {extensions.map((ext, idx) => {
            const isReversed = idx % 2 === 1;
            const FallbackIcon = ext.icon;
            return (
              <div
                key={ext.id}
                className={`flex flex-col ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Text & Highlights Column */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl overflow-hidden border border-slate-200/80 bg-white shrink-0 flex items-center justify-center relative">
                      {/* Invio Logo Background Watermark: 300% size, 0.2 opacity */}
                      <img
                        src="/appLogo.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute w-full h-full object-contain scale-[3] opacity-20 pointer-events-none select-none"
                      />
                      {FallbackIcon && (
                        <div className="absolute inset-0 flex items-center justify-center text-[#7C3AED]/60 pointer-events-none">
                          <FallbackIcon className="size-5" />
                        </div>
                      )}
                      <img
                        src={ext.logoUrl}
                        alt={`${ext.name} add-on icon`}
                        className="relative z-10 size-7 object-contain"
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {ext.name}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                    {ext.summary}
                  </p>

                  <ul className="space-y-2.5 pt-1">
                    {ext.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="size-5 rounded-full bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                          <CheckIcon className="size-3" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Logo Card Column */}
                <div className="flex-1 w-full flex items-center justify-center">
                  <div className="w-full max-w-[224px] aspect-square rounded-squircle bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#7C3AED]/30 transition-all duration-300 overflow-hidden flex items-center justify-center group relative">
                    {/* Invio Logo Background Watermark: 300% size, 0.2 opacity, overflow hidden */}
                    <img
                      src="/appLogo.png"
                      alt=""
                      aria-hidden="true"
                      className="absolute w-full h-full object-contain scale-[3] opacity-20 pointer-events-none select-none transition-transform duration-500 group-hover:scale-[3.1]"
                    />

                    {/* Fallback Icon when image not available */}
                    {FallbackIcon && (
                      <div className="absolute inset-0 flex items-center justify-center text-[#7C3AED]/60 pointer-events-none">
                        <FallbackIcon className="size-16" />
                      </div>
                    )}

                    {/* Extension Logo */}
                    <img
                      src={ext.logoUrl}
                      alt={`${ext.name} add-on`}
                      className="relative z-10 size-24 sm:size-28 rounded-2xl object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Modularity Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
          {MODULARITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="flex items-start gap-3.5">
                <div className="size-10 rounded-squircle-sm bg-purple-50 text-[#7C3AED] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{pillar.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ModularPlatformSection;
