import { Link } from 'react-router-dom';
import { FEATURES_DATA } from '../../data/featuresData';

export function StickyFeatures() {
  const features = FEATURES_DATA;

  return (
    <section
      id="features"
      className="w-full bg-gradient-to-br from-[#fbf9fe] via-white to-purple-50/25 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-slate-200 relative scroll-mt-24"
    >
      {/* Decorative ambient blurred orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#7C3AED]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Left Side: Sticky Intro (stays pinned as feature cards scroll past smoothly) */}
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
                  Unlike traditional cloud tools that require costly monthly subscriptions and constant internet access, Invio starts free forever with lightning-fast desktop billing and total local data privacy. Step up to Plus only when you need multi-counter hardware POS, thermal printing, and dynamic UPI QR dispatches.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 text-[#7C3AED] font-semibold text-sm hover:underline group"
                  >
                    <span>View All Capabilities &amp; Specs</span>
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Features Responsive 2-Col Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group relative p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-slate-200/90 hover:border-[#7C3AED]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-900/5 transition-all duration-300 flex flex-col justify-start h-[220px] overflow-hidden cursor-default shadow-xs"
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="size-11 rounded-2xl bg-purple-50 flex items-center justify-center mb-3.5 text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white group-hover:scale-105 transition-all duration-200 shrink-0">
                        <Icon className="size-5 text-[#7C3AED] group-hover:text-white transition-colors duration-200" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2 line-clamp-1 group-hover:text-[#7C3AED] transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
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
