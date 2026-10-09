import { useState } from 'react';
import { RELEASES_DATA } from '../data/releasesData';
import { AppleIcon, WindowsIcon, LinuxIcon } from './Icons';

export function VersionPage({ onNavigate, onDirectDownload, activeOS }) {
  const [selectedTag, setSelectedTag] = useState(RELEASES_DATA[0]?.tag || 'v1.0.1');
  const latestRelease = RELEASES_DATA[0];

  const getOsIcon = (id) => {
    if (id === 'mac') return <AppleIcon className="size-4" />;
    if (id === 'windows') return <WindowsIcon className="size-4" />;
    return <LinuxIcon className="size-4" />;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            type="button"
            onClick={() => onNavigate('product')}
            className="hover:text-purple-600 transition-colors cursor-pointer"
          >
            Invio Home
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Changelog &amp; Release Notes</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-[#8646F4] mb-3">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Current Release: {latestRelease.tag}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
                Invio Release Notes &amp; Version History
              </h1>
              <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                Discover all features, performance improvements, and security enhancements built into Invio.
                Every release preserves our 100% offline-first architecture, local SQLite privacy, and zero-telemetry guarantee.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onDirectDownload(activeOS)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8646F4] hover:bg-[#7234de] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {activeOS ? getOsIcon(activeOS.id) : null}
                <span>Download {latestRelease.tag} for {activeOS?.name || 'Desktop'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('docs-features')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Explore Full Feature Docs →
              </button>
            </div>
          </div>
        </div>

        {/* Release Timeline Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-8 overflow-x-auto">
          {RELEASES_DATA.map((rel) => (
            <button
              key={rel.tag}
              type="button"
              onClick={() => setSelectedTag(rel.tag)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedTag === rel.tag
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{rel.tag}</span>
              {rel.isLatest ? (
                <span className="ml-2 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                  Latest
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Selected Release Detail Container */}
        {RELEASES_DATA.filter((rel) => rel.tag === selectedTag).map((rel) => (
          <article key={rel.tag} className="space-y-8">
            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 font-heading">
                      {rel.name}
                    </h2>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {rel.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Released: {rel.date}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onDirectDownload(activeOS)}
                  className="px-4 py-2 bg-purple-50 text-[#8646F4] hover:bg-purple-100 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Download {rel.tag} Assets
                </button>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                {rel.summary}
              </p>

              {/* Version 1.0.0 Feature Grid */}
              {rel.features && (
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-4 font-heading">
                    Core Capabilities &amp; Architecture:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rel.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="size-2 rounded-full bg-[#8646F4]" />
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                              {feat.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {feat.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Version Incremental Changes (v1.0.1, v1.0.2) */}
              {rel.changes && (
                <div className="space-y-6">
                  {rel.changes.map((group, gIdx) => (
                    <div key={gIdx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-3 font-heading">
                        {group.category}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2.5">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Platform Compatibility Matrix for this Release */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 font-heading">
                Supported Platforms &amp; Installers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <AppleIcon className="size-4 text-slate-800" />
                    <span>macOS</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Apple Silicon (M1/M2/M3/M4) and Intel x64. Provided as standalone DMG installer and ZIP archive.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <WindowsIcon className="size-4 text-slate-800" />
                    <span>Windows</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Windows 10 and Windows 11 (64-bit). Provided as NSIS one-click installer and zero-install Portable executable.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <LinuxIcon className="size-4 text-slate-800" />
                    <span>Linux</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Debian, Ubuntu, Linux Mint, and major distributions. Provided as native DEB package and universal AppImage.
                  </p>
                </div>
              </div>
            </section>
          </article>
        ))}

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-gradient-to-r from-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
            Experience Fast, 100% Offline Billing Today
          </h2>
          <p className="mt-3 text-purple-200 text-sm max-w-xl mx-auto leading-relaxed">
            Download Invio for free. No credit card required, no cloud account needed, and 100% local SQLite privacy.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onDirectDownload(activeOS)}
              className="px-8 py-3.5 bg-white text-slate-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all shadow-md cursor-pointer"
            >
              Download Latest Release ({latestRelease.tag})
            </button>
            <button
              type="button"
              onClick={() => onNavigate('product')}
              className="px-6 py-3.5 bg-purple-800/60 hover:bg-purple-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer border border-purple-700/50"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersionPage;
