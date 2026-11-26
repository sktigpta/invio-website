import { Link } from 'react-router-dom';
import { FaqAccordion } from '../FaqAccordion';
import { FAQ_ITEMS } from '../../data/faqData';

const COMPARISON_ROWS = [
  {
    feature: 'Core Invoice & Billing Software',
    invio: 'Free forever (₹0)',
    others: 'Trial limits or monthly fee',
  },
  {
    feature: 'Works Without Internet',
    invio: '100% offline on PC & Mac',
    others: 'Stops when Wi-Fi disconnects',
  },
  {
    feature: 'Data Privacy & Control',
    invio: 'Saved safely on your computer',
    others: 'Uploaded to external servers',
  },
  {
    feature: 'GST Bills, Receipts & UPI QR',
    invio: 'A4/A5 PDFs + 58mm/80mm slips',
    others: 'Often restricted to paid tiers',
  },
  {
    feature: 'Windows, Mac & Linux Support',
    invio: 'Native desktop app for all 3',
    others: 'Usually browser-only or Windows-only',
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
      className="w-full bg-slate-50/60 py-16 sm:py-24 px-6 sm:px-8 border-b border-slate-200"
    >
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* 1. Compact Comparison */}
        <div>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-4">
              WHY INVIO INVOICE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
              Why shops choose <span className="text-[#7C3AED]">Invio free invoice software</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Built for shopkeepers, freelancers, and growing teams who want fast billing without forced cloud subscriptions.
            </p>
          </div>

          <div className="overflow-x-auto rounded-squircle border border-slate-200/90 bg-white shadow-sm max-w-4xl mx-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <tr>
                  <th className="py-3.5 px-5 font-bold">What Matters at Your Counter</th>
                  <th className="py-3.5 px-5 font-bold text-[#7C3AED]">Invio Invoice (by Timrio)</th>
                  <th className="py-3.5 px-5 font-bold text-slate-500">Monthly Cloud Billing Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-5 font-semibold text-emerald-700">{row.invio}</td>
                    <td className="py-3.5 px-5 text-slate-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {SOLUTION_PILLS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-xs font-semibold text-slate-700 hover:text-[#7C3AED] transition-colors shadow-sm"
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
