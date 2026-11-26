import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FEATURES_DATA } from '../../data/featuresData';
import { InteractiveTabs } from '../common/InteractiveTabs';

const ICON_ACCENTS = [
  'bg-purple-50/90 text-[#7C3AED]',
  'bg-sky-50/90 text-sky-600',
  'bg-emerald-50/90 text-emerald-600',
  'bg-amber-50/90 text-amber-600',
  'bg-indigo-50/90 text-indigo-600',
  'bg-rose-50/90 text-rose-600',
];

const FEATURE_FILTERS = [
  { id: 'all', label: 'All Capabilities' },
  {
    id: 'billing',
    label: 'Billing & Counter',
    ids: ['gst-invoicing', 'thermal-upi-receipts', 'barcode-billing', 'digital-sharing'],
  },
  {
    id: 'management',
    label: 'Stock & Reports',
    ids: ['inventory-stock', 'customer-credit-ledger', 'reports-analytics'],
  },
  {
    id: 'platform',
    label: 'Offline & Safety',
    ids: ['offline-sqlite', 'backup-portability'],
  },
];

export function StickyFeatures() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const coreFeatures = FEATURES_DATA.filter((f) => f.id !== 'extensions-marketplace');
  const activeGroup = FEATURE_FILTERS.find((f) => f.id === activeFilter);
  const features =
    activeFilter === 'all' || !activeGroup?.ids
      ? coreFeatures
      : coreFeatures.filter((item) => activeGroup.ids.includes(item.id));

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-br from-[#fbf9fe] via-white to-purple-50/25 py-16 sm:py-24 px-6 sm:px-8 border-y border-slate-200 relative scroll-mt-24"
    >
      {/* Decorative ambient blurred orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#7C3AED]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Sticky Intro */}
          <div className="relative h-full">
            <div className="lg:sticky lg:top-28 flex flex-col gap-4 sm:gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                  STORE CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 text-slate-900">
                  Explore Our <span className="text-[#7C3AED]">Features</span>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-5">
                  Other billing apps charge you every month and stop working when your internet goes out. Invio is free to start, works without internet, and keeps all your shop bills safely on your computer. Upgrade to Plus only when you want fast paper receipt printers, UPI QR codes on slips, or extra counter screens.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold text-sm hover:underline group"
                  >
                    <span>See Everything Invio Can Do</span>
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Filterable Features 2-Col Grid */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-start">
              <InteractiveTabs
                tabs={FEATURE_FILTERS}
                activeId={activeFilter}
                onChange={setActiveFilter}
                ariaLabel="Filter shop capabilities"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                const accentClass = ICON_ACCENTS[idx % ICON_ACCENTS.length];
                const isExpanded = expandedId === feature.id;
                return (
                  <article
                    key={feature.id || feature.title}
                    onClick={() => setExpandedId(isExpanded ? null : feature.id)}
                    className={`group text-left relative p-6 rounded-squircle bg-white border transition-all duration-300 flex flex-col justify-between min-h-[240px] sm:min-h-[250px] h-full overflow-hidden cursor-pointer shadow-sm ${
                      isExpanded
                        ? 'border-[#7C3AED] shadow-xl shadow-purple-900/10 ring-1 ring-[#7C3AED]/15'
                        : 'border-slate-200/90 hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10'
                    }`}
                  >
                    {/* Feature Background Image */}
                    {feature.imageUrl && (
                      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
                        <img
                          src={feature.imageUrl}
                          alt=""
                          loading="lazy"
                          className={`w-full h-full object-cover object-center transition-all duration-500 ${
                            isExpanded ? 'opacity-20 scale-105' : 'opacity-55 group-hover:opacity-70 group-hover:scale-105'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col justify-between h-full w-full">
                      {/* Top: Icon & Accessible Expand button */}
                      <div className="flex items-center justify-between gap-2 w-full">
                        <div className={`size-11 rounded-squircle-sm backdrop-blur-sm flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white group-hover:scale-105 transition-all duration-200 shrink-0 shadow-sm ${accentClass}`}>
                          <Icon className="size-5 transition-colors duration-200" />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId(isExpanded ? null : feature.id);
                          }}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Hide details for' : 'Show details for'} ${feature.title}`}
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
                            isExpanded
                              ? 'bg-purple-50 text-[#7C3AED] border-purple-200'
                              : 'bg-white/80 text-slate-500 border-slate-200/80 group-hover:text-[#7C3AED] group-hover:border-purple-200'
                          }`}
                        >
                          {isExpanded ? 'Less' : 'Details'}
                        </button>
                      </div>

                      {/* Bottom: Title & Description or Expanded Highlights */}
                      <div className="pt-4">
                        <h3 className={`text-sm sm:text-base font-bold tracking-tight mb-1.5 transition-colors ${
                          isExpanded ? 'text-[#7C3AED]' : 'text-slate-900 group-hover:text-[#7C3AED]'
                        }`}>
                          {feature.title}
                        </h3>
                        {isExpanded && feature.bullets?.length ? (
                          <ul className="space-y-1.5 mt-2 animate-fadeIn">
                            {feature.bullets.slice(0, 3).map((b) => (
                              <li key={b} className="flex items-start gap-1.5 text-xs text-slate-700 leading-snug">
                                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StickyFeatures;
