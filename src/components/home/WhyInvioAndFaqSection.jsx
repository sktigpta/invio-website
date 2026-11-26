import { Link } from 'react-router-dom';
import { FaqAccordion } from '../FaqAccordion';
import { FAQ_ITEMS } from '../../data/faqData';

const COMPARISON_ITEMS = [
  {
    feature: 'Core Invoice & Billing Software',
    badge: 'Zero Subscription',
    invio: 'Free forever (₹0)',
    others: 'Trial limits or monthly fee',
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    feature: 'Works Without Internet',
    badge: 'Counter Speed',
    invio: '100% offline on PC & Mac',
    others: 'Stops when Wi-Fi disconnects',
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    feature: 'Data Privacy & Control',
    badge: 'Local SQLite',
    invio: 'Saved safely on your computer',
    others: 'Uploaded to external servers',
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    feature: 'GST Bills, Receipts & UPI QR',
    badge: 'All Formats',
    invio: 'A4/A5 PDFs + 58mm/80mm slips',
    others: 'Often restricted to paid tiers',
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
  },
  {
    feature: 'Windows, Mac & Linux Support',
    badge: 'Native Desktop',
    invio: 'Native desktop app for all 3',
    others: 'Usually browser-only or Windows-only',
    icon: (
      <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
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
        {/* 1. Comparison Cards - Line-Free, Table-Free Design */}
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

          {/* Feature Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {COMPARISON_ITEMS.map((item, index) => {
              const spanClass =
                index < 2
                  ? 'lg:col-span-3 md:col-span-1'
                  : index === 4
                  ? 'lg:col-span-2 md:col-span-2 md:max-w-md md:mx-auto md:w-full'
                  : 'lg:col-span-2 md:col-span-1';

              return (
                <div
                  key={item.feature}
                  className={`bg-white rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(124,58,237,0.07)] transition-all duration-300 flex flex-col justify-between ${spanClass}`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#7C3AED] block">
                          {item.badge}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {item.feature}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mt-3">
                    {/* Invio Invoice - Highlighted Counter Solution */}
                    <div className="bg-emerald-50/80 rounded-2xl p-4 transition-colors">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                            Invio Invoice (by Timrio)
                          </span>
                          <p className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
                            {item.invio}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Cloud Billing Apps - Contrast */}
                    <div className="bg-slate-50/90 rounded-2xl p-3.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                            Monthly Cloud Billing Apps
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
                            {item.others}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Solution Links */}
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
