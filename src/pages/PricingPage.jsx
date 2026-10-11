import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';

export function PricingPage() {
  useEffect(() => {
    applySEO('pricing');
    window.scrollTo(0, 0);
  }, []);

  const pricingFaqs = [
    {
      q: 'Is the Free Core plan really free forever?',
      a: 'Yes. There is no trial expiration date, no invoice count cap, and no forced upgrade. All core features will remain completely free forever for desktop billing.'
    },
    {
      q: 'Are there any hidden cloud or synchronization fees?',
      a: 'No. Because Invio stores your data locally on your computer in an embedded SQLite database, there are zero server hosting fees or cloud egress costs passed onto you.'
    },
    {
      q: 'What is included in the Invio Plus commercial plan?',
      a: 'Invio Plus unlocks advanced hardware capabilities for retail shops: ESC/POS thermal receipt printers (58mm/80mm), dynamic UPI payment QR codes on receipts, secondary customer-facing POS display monitors, automated email invoice dispatches, and priority setup support.'
    },
    {
      q: 'What payment methods do you accept for Invio Plus?',
      a: 'We accept secure payments via Razorpay including UPI (Google Pay, PhonePe, Paytm, CRED), all major Debit and Credit Cards, and Netbanking.'
    },
    {
      q: 'What is your refund policy?',
      a: 'Because you can evaluate the desktop software completely for free before deciding to purchase Plus, digital license activations are non-refundable once unlocked. However, you can cancel any recurring plan at any time without fees.'
    }
  ];

  return (
    <PageContainer
      badge="Simple, Transparent Pricing"
      title="Invio Pricing Plans"
      subtitle="Honest pricing designed for small businesses. Use the core desktop billing application free forever, or upgrade to Plus for advanced retail hardware and POS features."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        {/* Free Plan */}
        <div className="p-6 rounded-2xl border border-slate-200/90 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900">Free Core Plan</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                Free Forever
              </span>
            </div>
            <p className="text-2xl font-black text-slate-900 mb-2">₹0</p>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Ideal for freelancers, solo professionals, service businesses, and small shops needing simple, dependable offline billing.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>Unlimited invoices</strong>, quotations, and estimates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>Unlimited customer directory</strong> and inventory items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>Automated GST tax engine (CGST, SGST, IGST splits)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>Standard A4 and A5 PDF invoice generation and printing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>100% private local SQLite database on your computer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>One-click backup export and restore</span>
              </li>
            </ul>
          </div>

          <Link
            to="/download"
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors"
          >
            Download Free Desktop App
          </Link>
        </div>

        {/* Plus Plan */}
        <div className="p-6 rounded-2xl border-2 border-[#8646F4] bg-white relative flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900">Invio Plus</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-[#8646F4] px-2.5 py-0.5 rounded-full">
                Commercial Retail
              </span>
            </div>
            <p className="text-2xl font-black text-[#8646F4] mb-2">
              ₹499 <span className="text-xs font-normal text-slate-500">/ month or ₹4,999 / year</span>
            </p>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              For retail stores, supermarkets, grocery outlets, and busy billing desks that need high-speed hardware POS tools.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>Everything in Free Core Plan</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>58mm &amp; 80mm ESC/POS</strong> thermal receipt printing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>Dynamic UPI QR codes</strong> printed on paper receipts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span><strong>Dual-screen customer display</strong> live bill projection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>Barcode scanner high-speed rapid checkout engine</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>Automated Gmail &amp; SMTP email invoice dispatch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#8646F4] font-bold">✓</span>
                <span>Priority email and remote configuration assistance</span>
              </li>
            </ul>
          </div>

          <Link
            to="/download"
            className="w-full py-2.5 px-4 bg-[#8646F4] hover:bg-[#7234de] text-white rounded-full font-semibold text-xs text-center transition-colors shadow-sm"
          >
            Get Invio Plus
          </Link>
        </div>
      </div>

      {/* Pricing FAQs */}
      <section className="my-8">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
          Frequently Asked Questions About Pricing
        </h2>
        <div className="space-y-3">
          {pricingFaqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">{faq.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <DownloadCta
        title="Start Billing for Free Today"
        subtitle="No credit card required. Install Invio on your PC or Mac and create your first invoice in minutes."
      />
    </PageContainer>
  );
}

export default PricingPage;
