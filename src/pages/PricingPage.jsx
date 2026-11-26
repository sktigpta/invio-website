import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { FaqAccordion } from '../components/FaqAccordion';
import { useDownloadModal } from '../context/DownloadModalContext';
import { fetchSubscriptionPlans } from '../services/paymentService';

function parsePrice(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function formatPrice(value) {
  return Number(value).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
  });
}

function getYearlySavings(monthly, yearly) {
  if (!(monthly > 0) || !(yearly > 0) || yearly >= monthly * 12) return null;
  return Math.round((1 - yearly / (monthly * 12)) * 100);
}

// Authoritative fallback plan prices matching backend catalog (SUBSCRIPTION_PRICES).
// Used for immediate offline-resilient rendering and updated seamlessly once GET /api/account/plans resolves.
const DEFAULT_PLANS_STATE = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Everything you need to make bills and track stock for free.',
    priceMonthly: 0,
    priceYearly: 0,
    badge: 'Free Forever',
    ctaText: 'Download Free App',
    ctaLink: '/download',
    features: [
      'Unlimited offline bills, quotes, and receipts',
      'Unlimited customer contacts and shop products',
      'Automatic GST tax math on every bill',
      'Clean A4 & A5 PDF bills with your shop logo',
      'Works with any plug-in barcode scanner',
      'All your bills and records stay safely on your computer',
      'One-click backup to a pen drive or folder',
    ],
  },
  plus: {
    id: 'plus',
    name: 'Plus',
    description: 'Extra tools for busy counters, receipt printers, and restaurants.',
    priceMonthly: 149,
    priceYearly: 999,
    badge: 'Most Popular',
    ctaText: 'Get Invio Plus',
    ctaLink: '/download',
    features: [
      'Everything in the Free Plan',
      'Small paper receipt printing',
      'Scan-and-pay UPI QR code printed on every receipt',
      'Second screen for customers to see their bill and QR code',
      'Fast barcode scanning that adds items and counts automatically',
      'Send PDF bills by Email or WhatsApp in 1 click',
      'Use multiple billing computers together on your shop Wi-Fi',
      'Priority help with setup and printers by email',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For larger teams and multiple cashiers. Coming soon.',
    priceMonthly: 1299,
    priceYearly: 9999,
    badge: 'Coming Soon',
    ctaText: 'Coming Soon',
    ctaLink: '#',
    isComingSoon: true,
    features: [
      'Everything in Invio Plus Plan',
      'Separate logins for cashiers and shop managers',
      'Connect as many billing counters as you need',
      'Detailed profit reports and ready-to-file GST reports for your CA',
      'Low-stock reorder reminders and bulk Excel / CSV item upload',
      'Dedicated remote setup help for your shop',
      'Custom bill designs and receipt headers',
      'Direct priority WhatsApp and phone support',
    ],
  },
};

export function PricingPage() {
  const { openDownloadModal } = useDownloadModal();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read query parameters passed from desktop or marketing links
  const paramEmail = searchParams.get('email') || '';
  const paramCycle = searchParams.get('cycle') || '';
  const paramPlan = searchParams.get('plan') || '';
  const paramCoupon = searchParams.get('coupon') || searchParams.get('discount') || searchParams.get('promo') || '';
  const isAutoCheckout = searchParams.get('checkout') === '1' || searchParams.get('checkout') === 'true' || searchParams.get('action') === 'buy';

  const [billingCycle, setBillingCycle] = useState(
    paramCycle === 'monthly' ? 'monthly' : 'yearly'
  );
  const [plansData, setPlansData] = useState(DEFAULT_PLANS_STATE);
  const [plansError, setPlansError] = useState('');
  const plusSavings = getYearlySavings(
    plansData.plus.priceMonthly,
    plansData.plus.priceYearly
  );
  const proSavings = getYearlySavings(
    plansData.pro.priceMonthly,
    plansData.pro.priceYearly
  );

  useEffect(() => {
    applySEO('pricing');
    window.scrollTo(0, 0);

    // If query params specified auto-checkout or a purchasable plan, redirect to dedicated /checkout page
    // Pro / Enterprise are marked Coming Soon on PricingPage, so only Plus is purchasable.
    if (isAutoCheckout || (paramPlan && paramPlan.toLowerCase() === 'plus')) {
      const redirectParams = new URLSearchParams(searchParams);
      redirectParams.set('plan', 'plus');
      redirectParams.set('cycle', paramCycle || 'yearly');
      if (paramEmail) redirectParams.set('email', paramEmail);
      navigate(`/checkout?${redirectParams.toString()}`, { replace: true });
      return;
    }

    // Fetch dynamic plan catalog and live prices from backend API (/api/account/plans)
    const loadPlans = async () => {
      try {
        const res = await fetchSubscriptionPlans();
        if (res.success && Array.isArray(res.plans)) {
          setPlansData((prev) => {
            const updated = { ...prev };
            res.plans.forEach((p) => {
              const planKey = String(p.id).toLowerCase();
              if (updated[planKey]) {
                const parsedMonthly = parsePrice(p.prices?.monthly);
                const parsedYearly = parsePrice(p.prices?.yearly);
                updated[planKey] = {
                  ...updated[planKey],
                  name: p.name || updated[planKey].name,
                  description: p.description || updated[planKey].description,
                  priceMonthly: parsedMonthly !== null ? parsedMonthly : updated[planKey].priceMonthly,
                  priceYearly: parsedYearly !== null ? parsedYearly : updated[planKey].priceYearly,
                };
              }
            });
            return updated;
          });
          setPlansError('');
        }
      } catch {
        // Retain authoritative fallback prices
      }
    };

    loadPlans();
  }, [isAutoCheckout, paramPlan, paramCycle, paramEmail, navigate]);

  const pricingFaqs = [
    {
      q: 'Is the Free Core plan really free forever?',
      a: 'Yes. There is no trial expiration date, no invoice count cap, and no forced upgrade. All core features will remain completely free forever for desktop billing.'
    },
    {
      q: 'How does billing work between monthly and yearly cycles?',
      a: 'Yearly billing offers plan-specific discounts. You pay once for the full year and receive continuous updates and feature enhancements. The exact annual price and effective monthly equivalent are shown on each plan.'
    },
    {
      q: 'Are there any hidden monthly server or cloud fees?',
      a: 'No. Because Invio saves all your bills and records directly on your own computer, there are zero cloud storage fees or hidden charges.'
    },
    {
      q: 'What do I get with Invio Plus and Pro?',
      a: 'Invio Plus unlocks small paper receipt printers, UPI QR codes on slips, a second customer screen, Restaurant QR ordering, and Email & WhatsApp bill sharing. Pro adds staff logins, detailed profit reports, custom bill templates, and phone support.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept secure payments via Razorpay including UPI (Google Pay, PhonePe, Paytm, CRED), all major Debit and Credit Cards, and Netbanking.'
    },
    {
      q: 'What is your refund policy?',
      a: 'Because you can evaluate the desktop software completely for free before deciding to purchase Plus or Pro, digital license activations are non-refundable once unlocked. However, you can cancel any recurring plan at any time without fees.'
    }
  ];

  return (
    <PageContainer
      badge="Simple, Transparent Pricing"
      title="Invio Pricing Plans"
      subtitle="Honest pricing designed for shops and small businesses. Use the core desktop billing application free forever, or upgrade to Plus or Pro for advanced POS hardware and team management."
    >
      {/* Monthly / Yearly Billing Toggle */}
      <div className="flex items-center justify-center mt-6 mb-8">
        <div
          className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 shadow-sm select-none"
          role="radiogroup"
          aria-label="Billing cycle selection"
        >
          {/* Visually-hidden live region announces billing cycle change to screen readers */}
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {billingCycle === 'yearly' ? 'Yearly billing selected' : 'Monthly billing selected'}
          </span>
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            role="radio"
            aria-checked={billingCycle === 'monthly'}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#7C3AED] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            role="radio"
            aria-checked={billingCycle === 'yearly'}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#7C3AED] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Yearly Billing</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#7C3AED]'
            }`}>
              {plusSavings === null ? 'Annual pricing' : `Save ${plusSavings}%`}
            </span>
          </button>
        </div>
      </div>

      {/* 3-Column Pricing Grid (Free, Plus, Pro) */}
      {plansData.plus.priceMonthly === null || plansData.plus.priceYearly === null ? (
        <div className="my-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-sm font-semibold text-amber-900">
            {plansError || 'Pricing is temporarily unavailable.'}
          </p>
          <p className="mt-1 text-xs text-amber-800">Refresh the page to load the latest prices.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8 items-stretch">
        {/* 1. Free Plan */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-sm hover:shadow-sm transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-slate-900">{plansData.free.name}</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                {plansData.free.badge}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">₹0</span>
              <span className="text-xs text-slate-500 ml-1">/ forever</span>
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {plansData.free.description}
            </p>

            <div className="w-full border-t border-slate-100 mb-6" />

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              {plansData.free.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => openDownloadModal()}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-sm select-none block cursor-pointer"
          >
            {plansData.free.ctaText}
          </button>
        </div>

        {/* 2. Plus Plan (Highlighted) */}
        <div className="p-6 rounded-squircle border-2 border-[#7C3AED] bg-white relative flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#7C3AED] text-white px-3 py-1 rounded-full shadow-sm">
              {plansData.plus.badge}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 pt-2">
              <h2 className="text-xl font-bold text-slate-900">{plansData.plus.name}</h2>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-2.5 py-0.5 rounded-full">
                Retail POS
              </span>
            </div>

            <div className="mb-3" aria-live="polite" aria-atomic="true">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">
                ₹{formatPrice(billingCycle === 'yearly' ? plansData.plus.priceYearly : plansData.plus.priceMonthly)}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                {billingCycle === 'yearly' ? '/ year' : '/ month'}
              </span>
              {billingCycle === 'yearly' && plansData.plus.priceYearly > 0 && (
                <span className="block text-[11px] font-semibold text-emerald-600 mt-1">
                  Effective ₹{formatPrice(Math.round(plansData.plus.priceYearly / 12))}/month
                  {plusSavings !== null && (
                    <> · Save {plusSavings}%</>
                  )}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {plansData.plus.description}
            </p>

            <div className="w-full border-t border-purple-100 mb-6" />

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              {plansData.plus.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#7C3AED] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to={`/checkout?plan=plus&cycle=${billingCycle}${paramEmail ? `&email=${encodeURIComponent(paramEmail)}` : ''}${paramCoupon ? `&coupon=${encodeURIComponent(paramCoupon)}` : ''}`}
            className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center transition-colors shadow-sm select-none cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{plansData.plus.ctaText}</span>
          </Link>
        </div>

        {/* 3. Pro Plan (Enterprise -> Coming Soon) */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-sm hover:shadow-sm transition-shadow relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-slate-900">{plansData.pro.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#7C3AED] border border-purple-200/80 px-2.5 py-0.5 rounded-full">
                {plansData.pro.badge}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                ₹{formatPrice(billingCycle === 'yearly' ? plansData.pro.priceYearly : plansData.pro.priceMonthly)}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                {billingCycle === 'yearly' ? '/ year' : '/ month'}
              </span>
              {billingCycle === 'yearly' && plansData.pro.priceYearly > 0 && (
                <span className="block text-[11px] font-semibold text-emerald-600 mt-1">
                  Effective ₹{formatPrice(Math.round(plansData.pro.priceYearly / 12))}/month
                  {proSavings !== null && (
                    <> · Save {proSavings}%</>
                  )}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {plansData.pro.description}
            </p>

            <div className="w-full border-t border-slate-100 mb-6" />

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              {plansData.pro.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#7C3AED] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 bg-slate-100 text-slate-400 cursor-not-allowed rounded-full font-semibold text-xs text-center transition-colors select-none block"
          >
            Coming Soon
          </button>
        </div>
      </div>
      )}


      {/* Pricing FAQs - Single Column Accordion Stack matching FAQ page */}
      <section className="my-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
          Frequently Asked Questions About Pricing
        </h2>
        <FaqAccordion
          items={pricingFaqs.map((faq, idx) => ({
            id: `pricing-faq-${idx}`,
            question: faq.q,
            answer: faq.a,
          }))}
        />
      </section>

      <DownloadCta
        title="Start Billing for Free Today"
        subtitle="No credit card required. Install Invio on your PC or Mac and create your first invoice in minutes."
      />
    </PageContainer>
  );
}

export default PricingPage;
