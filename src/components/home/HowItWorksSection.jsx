import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DownloadIcon, ReceiptIcon, SparklesIcon } from '../Icons';
import { useDownloadModal } from '../../context/DownloadModalContext';

const STEPS = [
  {
    step: '1',
    title: 'Download & Open (Free)',
    description:
      'Install Invio on Windows, Mac, or Linux in 1 minute. No sign-up or credit card needed.',
    icon: DownloadIcon,
    iconBg: 'bg-purple-100/80 text-[#7C3AED]',
    badgeClass: 'text-[#7C3AED] border-purple-200/80 bg-purple-50',
  },
  {
    step: '2',
    title: 'Add Your Shop & Items',
    description:
      'Add your shop name, products, and UPI ID to print scan-and-pay QR codes on bills.',
    icon: SparklesIcon,
    iconBg: 'bg-sky-100/80 text-sky-600',
    badgeClass: 'text-sky-700 border-sky-200/80 bg-sky-50',
  },
  {
    step: '3',
    title: 'Make Bills in Seconds',
    description:
      'Pick items or scan barcodes, print receipts or PDFs, and track stock automatically.',
    icon: ReceiptIcon,
    iconBg: 'bg-emerald-100/80 text-emerald-600',
    badgeClass: 'text-emerald-700 border-emerald-200/80 bg-emerald-50',
  },
];

const PILL_STYLES = [
  'bg-purple-50/80 text-purple-800 border-purple-200/70',
  'bg-emerald-50/80 text-emerald-800 border-emerald-200/70',
  'bg-sky-50/80 text-sky-800 border-sky-200/70',
  'bg-amber-50/80 text-amber-800 border-amber-200/70',
  'bg-rose-50/80 text-rose-800 border-rose-200/70',
  'bg-indigo-50/80 text-indigo-800 border-indigo-200/70',
];

const BUSINESS_TYPES = [
  'Grocery & Kirana Stores',
  'Medical & Pharmacy Shops',
  'Cafes & Restaurants',
  'Electronics & Mobile Shops',
  'Clothing & Boutiques',
  'Freelancers & Services',
  'Bakeries & Sweet Shops',
  'Hardware & Paint Stores',
  'Salons & Spas',
  'Bookstores & Stationery',
  'Auto Parts & Repair',
  'Wholesale & Distributors',
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState('1');
  const { openDownloadModal } = useDownloadModal();

  return (
    <section
      id="how-it-works"
      className="w-full bg-white py-16 sm:py-24 px-6 sm:px-8 border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-4">
            EASY TO START
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            How Invio works in <span className="text-[#7C3AED]">3 simple steps</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Anyone in your shop can learn Invio in 5 minutes and start making clean bills right away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STEPS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeStep === item.step;
            return (
              <div
                key={item.step}
                onMouseEnter={() => setActiveStep(item.step)}
                onClick={() => setActiveStep(item.step)}
                className={`p-6 rounded-squircle border transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#7C3AED]/60 shadow-lg shadow-purple-900/5 -translate-y-0.5'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`size-10 rounded-squircle-sm flex items-center justify-center transition-transform duration-200 ${isSelected ? 'scale-105' : ''} ${item.iconBg}`}>
                      <Icon className="size-5" />
                    </div>
                    <span className={`text-xs font-extrabold border px-2.5 py-1 rounded-full ${item.badgeClass}`}>
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {item.step === '1' ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDownloadModal();
                      }}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Download free now</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  ) : item.step === '2' ? (
                    <Link
                      to="/docs/quickstart"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
                    >
                      <span>See quickstart guide</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <Link
                      to="/features"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-[#7C3AED] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Explore billing features</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Who Uses Invio */}
        <div className="pt-4 flex flex-col items-center text-center gap-6 overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
              Free invoice software built for every kind of shop
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you print 5 bills a day or 500, Invio keeps your counter fast and your records safe on your own computer.
            </p>
          </div>

          <div
            className="w-full overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
          >
            <div className="animate-marquee">
              <div className="flex items-center gap-3 pr-3 shrink-0">
                {BUSINESS_TYPES.map((type, idx) => (
                  <span
                    key={type}
                    className={`text-xs font-medium border px-4 py-2 rounded-full whitespace-nowrap shrink-0 ${PILL_STYLES[idx % PILL_STYLES.length]}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 pr-3 shrink-0" aria-hidden="true">
                {BUSINESS_TYPES.map((type, idx) => (
                  <span
                    key={`${type}-dup`}
                    className={`text-xs font-medium border px-4 py-2 rounded-full whitespace-nowrap shrink-0 ${PILL_STYLES[idx % PILL_STYLES.length]}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
