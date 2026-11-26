import { Link } from 'react-router-dom';
import { FaqAccordion } from '../FaqAccordion';
import { FAQ_ITEMS } from '../../data/faqData';

const INVIO_BENEFITS = [
  {
    feature: 'Core Invoice & Billing Software',
    highlight: 'Free forever (₹0)',
    detail: 'Unlimited invoices, no watermark, no trial limits or expiry',
  },
  {
    feature: 'Works Without Internet',
    highlight: '100% offline on PC & Mac',
    detail: 'Zero internet needed to create, calculate, and print bills',
  },
  {
    feature: 'Data Privacy & Control',
    highlight: 'Saved safely on your computer',
    detail: '100% private local SQLite database that you fully own',
  },
  {
    feature: 'GST Bills, Receipts & UPI QR',
    highlight: 'A4/A5 PDFs + 58mm/80mm slips',
    detail: 'Full GST tax invoices + thermal receipts with dynamic UPI QR',
  },
  {
    feature: 'Windows, Mac & Linux Support',
    highlight: 'Native desktop app for all 3',
    detail: 'Fast, native performance built for high-volume store counters',
  },
];

const CLOUD_APP_DRAWBACKS = [
  {
    feature: 'Core Invoice & Billing Software',
    highlight: 'Trial limits or monthly fee',
    detail: 'Charges ₹500–₹1,500/month or locks basic invoicing features',
  },
  {
    feature: 'Works Without Internet',
    highlight: 'Requires active internet connection',
    detail: 'Cannot create bills or print slips when Wi-Fi or broadband drops',
  },
  {
    feature: 'Data Privacy & Control',
    highlight: 'Uploaded to external servers',
    detail: 'Customer data and sales numbers stored on third-party cloud',
  },
  {
    feature: 'GST Bills, Receipts & UPI QR',
    highlight: 'Often restricted to paid tiers',
    detail: 'Thermal printer drivers and dynamic QR locked in higher plans',
  },
  {
    feature: 'Windows, Mac & Linux Support',
    highlight: 'Usually browser-only or Windows-only',
    detail: 'Slow browser tabs that freeze, or lack of Mac & Linux desktop apps',
  },
];

const SOLUTION_PILLS = [
  { label: 'Free Invoice Software', to: '/free-invoice-software' },
  { label: 'Offline Billing Software', to: '/offline-billing-software' },
  { label: 'GST Billing Software', to: '/gst-billing-software' },
  { label: 'POS & Receipt Software', to: '/pos-billing-software' },
  { label: 'Free Online Invoice Generator', to: '/tools/invoice-generator' },
];

export function WhyInvioAndFaqSection() {
  return (
    <section
      id="why-invio"
      className="w-full bg-slate-50/50 py-16 sm:py-24 px-6 sm:px-8"
    >
      <div className="max-w-[1200px] mx-auto space-y-16 sm:space-y-20">
        {/* 1. Comparison - Clean Unified Split (No Gap, No Inner Border Radius, Matching Rhythm) */}
        <div>
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 px-3.5 py-1 rounded-full inline-block mb-4">
              WHAT MATTERS AT YOUR COUNTER
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Why shops choose <span className="text-[#7C3AED]">Invio free invoice software</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Built for shopkeepers, freelancers, and growing teams who want fast billing without forced cloud subscriptions.
            </p>
          </div>

          {/* Unified Comparison Container: Zero Gap, Matches Across Both Sides */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left: Invio Invoice */}
            <div className="p-6 sm:p-8 bg-white flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-3">
                    Recommended for Counters
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Invio Invoice <span className="text-sm font-semibold text-slate-500 block sm:inline">(by Timrio)</span>
                  </h3>
                </div>

                <div className="space-y-5">
                  {INVIO_BENEFITS.map((item) => (
                    <div key={item.feature} className="flex items-start gap-3 min-h-[58px]">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-xs font-bold text-slate-900">
                            {item.feature}:
                          </span>
                          <span className="text-xs font-extrabold text-emerald-700">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Monthly Cloud Billing Apps */}
            <div className="p-6 sm:p-8 bg-slate-50/80 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full inline-block mb-3">
                    Traditional Cloud SaaS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-700">
                    Monthly Cloud Billing Apps
                  </h3>
                </div>

                <div className="space-y-5">
                  {CLOUD_APP_DRAWBACKS.map((item) => (
                    <div key={item.feature} className="flex items-start gap-3 min-h-[58px]">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-slate-800">
                            {item.feature}:
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Solution Links (SEO Pillars) */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {SOLUTION_PILLS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-4 py-2 rounded-full bg-white hover:bg-purple-50 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#7C3AED] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Top FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
              Common questions about Invio Invoice
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers about offline billing, free forever usage, GST invoices, and thermal printers.
            </p>
          </div>

          <FaqAccordion items={FAQ_ITEMS} limit={6} />

          <div className="mt-6 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:underline"
            >
              <span>View all frequently asked questions</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyInvioAndFaqSection;
