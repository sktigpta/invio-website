import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { FaqAccordion } from '../components/FaqAccordion';
import { useDownloadModal } from '../context/DownloadModalContext';
import {
  fetchSubscriptionPlans,
  createSubscriptionOrder,
  verifyPayment,
  loadRazorpayCheckout,
  openRazorpayCheckout,
} from '../services/paymentService';
import { CloseIcon, ReceiptIcon, CheckIcon } from '../components/Icons';

// Default static fallback values if backend is unreachable or booting
const DEFAULT_PLANS_STATE = {
  free: {
    id: 'free',
    name: 'Free Core',
    description: 'Lifetime starter plan for freelancers, solo professionals, and small shops needing simple, dependable offline billing.',
    priceMonthly: 0,
    priceYearly: 0,
    badge: 'Free Forever',
    ctaText: 'Download Free App',
    ctaLink: '/download',
    features: [
      'Unlimited invoices, estimates, and receipts',
      'Unlimited customer contacts & stock items',
      'Automated GST tax engine (CGST / SGST / IGST)',
      'Standard A4 & A5 PDF invoice generation',
      'Basic barcode scanner input (standard HID)',
      '100% offline local SQLite database privacy',
      'One-click data backup export & restore',
    ],
  },
  plus: {
    id: 'plus',
    name: 'Invio Plus',
    description: 'For retail counters, grocery stores, and traders that need fast POS checkout, thermal printing, and dynamic UPI QR collections.',
    priceMonthly: 149,
    priceYearly: 999,
    badge: 'Most Popular',
    ctaText: 'Get Invio Plus',
    ctaLink: '/download',
    features: [
      'Everything in Free Core Plan',
      '58mm & 80mm ESC/POS thermal receipt printing',
      'Dynamic UPI QR code printed on counter slips',
      'Dual-screen customer display POS projection',
      'Rapid item barcode scanning with auto-cart increment',
      'Automated WhatsApp and email invoice dispatch',
      'Multi-counter local network database support',
      'Priority email and remote setup assistance',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro Enterprise',
    description: 'For multi-store retailers, wholesalers, and growing enterprises requiring advanced analytics, audit trails, and multi-user team access.',
    priceMonthly: 499,
    priceYearly: 4999,
    badge: 'Coming Soon',
    ctaText: 'Coming Soon',
    ctaLink: '#',
    isComingSoon: true,
    features: [
      'Everything in Invio Plus Plan',
      'Multi-user cashier & manager permission roles',
      'Unlimited multi-counter networked terminals',
      'Advanced profit margin & GSTR-1 tax audit reports',
      'Automated low-inventory reorder alerts & bulk CSV catalog tools',
      'Dedicated remote deployment engineer',
      'Custom invoice branding, templates & receipt headers',
      'Direct priority WhatsApp & telephone support',
    ],
  },
};

export function PricingPage() {
  const { openDownloadModal } = useDownloadModal();
  const [searchParams] = useSearchParams();

  // Read query parameters passed from desktop or marketing links
  const paramEmail = searchParams.get('email') || '';
  const paramCycle = searchParams.get('cycle') || '';
  const paramPlan = searchParams.get('plan') || '';
  const paramPhone = searchParams.get('phone') || '';
  const isAutoCheckout = searchParams.get('checkout') === '1' || searchParams.get('checkout') === 'true' || searchParams.get('action') === 'buy';

  const [billingCycle, setBillingCycle] = useState(
    paramCycle === 'monthly' ? 'monthly' : 'yearly'
  );
  const [plansData, setPlansData] = useState(DEFAULT_PLANS_STATE);
  const [payingPlan, setPayingPlan] = useState(null);
  const [payError, setPayError] = useState('');
  const [success, setSuccess] = useState(null);

  // Checkout Email Modal State
  const [checkoutModalPlan, setCheckoutModalPlan] = useState(null);
  const [checkoutEmail, setCheckoutEmail] = useState(paramEmail);
  const [checkoutPhone, setCheckoutPhone] = useState(paramPhone);
  const [emailInputError, setEmailInputError] = useState('');
  const isFromDesktop = Boolean(paramEmail || searchParams.get('source') === 'desktop');

  useEffect(() => {
    applySEO('pricing');
    window.scrollTo(0, 0);

    // If query params specified auto-checkout or plus plan, open checkout modal
    if (isAutoCheckout || (paramPlan && paramPlan.toLowerCase() === 'plus')) {
      setCheckoutModalPlan('plus');
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
                const mPrice = p.prices?.monthly;
                const yPrice = p.prices?.yearly;
                updated[planKey] = {
                  ...updated[planKey],
                  name: p.name || updated[planKey].name,
                  description: p.description || updated[planKey].description,
                  priceMonthly: typeof mPrice === 'number' ? mPrice : updated[planKey].priceMonthly,
                  priceYearly: typeof yPrice === 'number' ? yPrice : updated[planKey].priceYearly,
                };
              }
            });
            return updated;
          });
        }
      } catch (err) {
        console.debug('[Pricing] Using standard catalog pricing defaults:', err);
      }
    };

    loadPlans();
  }, [isAutoCheckout, paramPlan]);

  useEffect(() => {
    if (!checkoutModalPlan) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCheckoutModalPlan(null);
        setEmailInputError('');
        setPayError('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [checkoutModalPlan]);

  const handleOpenCheckoutModal = (planId) => {
    setPayError('');
    setEmailInputError('');
    setCheckoutModalPlan(planId);
  };

  const handleStartPayment = async (planId) => {
    const trimmedEmail = checkoutEmail.trim().toLowerCase();
    if (!trimmedEmail) {
      setEmailInputError('Please enter your account email address to link your license.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      setEmailInputError('Please enter a valid email address (e.g. yourname@shop.com).');
      return;
    }

    setEmailInputError('');
    if (payingPlan || success) return;
    setPayingPlan(planId);
    setPayError('');

    try {
      const order = await createSubscriptionOrder(planId, billingCycle);
      if (!order.success) {
        setPayError(order.error || 'Could not start checkout. Please try again.');
        setPayingPlan(null);
        return;
      }
      const scriptOk = await loadRazorpayCheckout();
      if (!scriptOk) {
        setPayError('Payment window could not be loaded. Please check your internet connection and try again.');
        setPayingPlan(null);
        return;
      }

      openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amountPaise: order.amountPaise,
        currency: order.currency,
        amountRupees: order.amount,
        customerEmail: trimmedEmail,
        customerPhone: checkoutPhone.trim() || undefined,
        description: `Invio Plus — ${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
        onSuccess: async ({ orderId, paymentId, signature }) => {
          const result = await verifyPayment({
            orderId,
            paymentId,
            signature,
            planId,
            validity: billingCycle,
            email: trimmedEmail,
          });
          setPayingPlan(null);
          setCheckoutModalPlan(null);
          if (result.success) {
            setSuccess({
              plan: 'plus',
              validity: billingCycle,
              amount: order.amount,
              orderId,
              paymentId,
              email: trimmedEmail,
              activated: result.data?.activated,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setPayError('Payment signature could not be verified by server. If money was deducted, it will be refunded automatically.');
          }
        },
        onDismiss: () => setPayingPlan(null),
        onError: (err) => {
          setPayingPlan(null);
          setPayError(err?.message || 'Payment failed. No money was deducted.');
        },
      });
    } catch {
      setPayingPlan(null);
      setPayError('An unexpected error occurred while starting checkout.');
    }
  };

  const pricingFaqs = [
    {
      q: 'Is the Free Core plan really free forever?',
      a: 'Yes. There is no trial expiration date, no invoice count cap, and no forced upgrade. All core features will remain completely free forever for desktop billing.'
    },
    {
      q: 'How does billing work between monthly and yearly cycles?',
      a: 'Yearly billing offers significant discounts (over 40% off). You pay once for the full year and receive continuous updates and feature enhancements.'
    },
    {
      q: 'Are there any hidden cloud or synchronization fees?',
      a: 'No. Because Invio stores your data locally on your computer in an embedded SQLite database, there are zero server hosting fees or cloud egress costs passed onto you.'
    },
    {
      q: 'What is included in the Invio Plus and Pro commercial plans?',
      a: 'Invio Plus unlocks hardware POS peripherals (58mm/80mm thermal receipt printers, dynamic UPI QR codes, dual-screen customer display, and email sharing). Pro Enterprise adds multi-user staff roles, advanced analytics, custom receipt templates, and priority telephone support.'
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
          className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 shadow-2xs select-none"
          role="radiogroup"
          aria-label="Billing cycle selection"
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            role="radio"
            aria-checked={billingCycle === 'monthly'}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white text-[#7C3AED] shadow-xs'
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
                ? 'bg-[#7C3AED] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Yearly Billing</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              billingCycle === 'yearly' ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#7C3AED]'
            }`}>
              Save 40%+
            </span>
          </button>
        </div>
      </div>

      {/* Payment Success Notification */}
      {success && (
        <div className="my-6 p-6 rounded-squircle bg-emerald-50 border border-emerald-200 text-slate-800 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="size-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              ✓
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Payment Verified — Welcome to Invio Plus!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                Your payment of <strong>₹{success.amount}</strong> for Invio Plus ({success.validity}) is confirmed.
                {success.email && (
                  <> License linked to: <strong className="text-slate-900 bg-emerald-100/70 px-2 py-0.5 rounded font-mono">{success.email}</strong>.</>
                )}
                {' '}Razorpay Payment ID: <code className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800 font-semibold">{success.paymentId}</code>.
              </p>
              <div className="text-xs text-slate-600 leading-relaxed mb-4 bg-white/70 p-3 rounded-lg border border-emerald-100 space-y-1">
                <p className="font-bold text-slate-800">Quick steps to start using Invio Plus:</p>
                <p>1. Open the Invio desktop application on your PC or Mac.</p>
                <p>2. Open <strong>Settings &gt; Account</strong> and sign in with <strong>{success.email || 'your account email'}</strong>.</p>
                <p>3. Your Plus features (thermal receipts, dynamic UPI QR, dual-screen POS display) will unlock immediately!</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openDownloadModal()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  Download Invio Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setSuccess(null)}
                  className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Error Alert */}
      {payError && (
        <div className="my-6 p-4 rounded-squircle-sm bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center justify-between gap-3 shadow-2xs">
          <span>{payError}</span>
          <button
            type="button"
            onClick={() => setPayError('')}
            className="font-bold text-rose-500 hover:text-rose-700 px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3-Column Pricing Grid (Free, Plus, Pro) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8 items-stretch">
        {/* 1. Free Plan */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
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
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs select-none block cursor-pointer"
          >
            {plansData.free.ctaText}
          </button>
        </div>

        {/* 2. Plus Plan (Highlighted) */}
        <div className="p-6 rounded-squircle border-2 border-[#7C3AED] bg-white relative flex flex-col justify-between shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#7C3AED] text-white px-3 py-1 rounded-full shadow-xs">
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

            <div className="mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7C3AED]">
                ₹{billingCycle === 'yearly' ? plansData.plus.priceYearly : plansData.plus.priceMonthly}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                {billingCycle === 'yearly' ? '/ year' : '/ month'}
              </span>
              {billingCycle === 'yearly' && (
                <span className="block text-[11px] font-semibold text-emerald-600 mt-1">
                  Effective ₹{Math.round(plansData.plus.priceYearly / 12)}/month
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

          <button
            type="button"
            disabled={payingPlan === 'plus'}
            onClick={() => handleOpenCheckoutModal('plus')}
            className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-xs select-none cursor-pointer flex items-center justify-center gap-2"
          >
            {payingPlan === 'plus' ? (
              <>
                <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Opening Checkout...</span>
              </>
            ) : (
              <span>{plansData.plus.ctaText}</span>
            )}
          </button>
        </div>

        {/* 3. Pro Plan (Enterprise -> Coming Soon) */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-slate-900">{plansData.pro.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#7C3AED] border border-purple-200/80 px-2.5 py-0.5 rounded-full">
                {plansData.pro.badge}
              </span>
            </div>

            <div className="mb-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                ₹{billingCycle === 'yearly' ? plansData.pro.priceYearly : plansData.pro.priceMonthly}
              </span>
              <span className="text-xs text-slate-500 ml-1">
                {billingCycle === 'yearly' ? '/ year' : '/ month'}
              </span>
              {billingCycle === 'yearly' && (
                <span className="block text-[11px] font-semibold text-emerald-600 mt-1">
                  Effective ₹{Math.round(plansData.pro.priceYearly / 12)}/month
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

      {/* Checkout Modal — Collect & Associate Customer Account Email */}
      {checkoutModalPlan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setCheckoutModalPlan(null);
              setEmailInputError('');
              setPayError('');
            }
          }}
        >
          <div
            className="bg-white rounded-squircle max-w-md w-full p-6 sm:p-7 border border-slate-200/90 shadow-2xl relative text-slate-900 my-auto animate-fadeIn"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setCheckoutModalPlan(null);
                setEmailInputError('');
                setPayError('');
              }}
              className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <CloseIcon className="size-4" />
            </button>

            {/* Top Icon Badge */}
            <div className="size-14 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <ReceiptIcon className="size-7" />
            </div>

            <h3 id="checkout-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight text-center">
              Order Invio Plus
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-normal text-center max-w-xs mx-auto">
              Enter your email to link your license so all commercial features activate in your Invio desktop app.
            </p>

            {/* Order Summary Box */}
            <div className="mt-4 mb-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    Invio Plus ({billingCycle === 'yearly' ? '1 Year License' : '1 Month Access'})
                  </span>
                  {billingCycle === 'yearly' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-purple-100 text-[#7C3AED]">
                      Save 40%+
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Thermal receipts, dynamic UPI QR & dual-screen POS
                </p>
              </div>
              <div className="text-right pl-3 shrink-0">
                <span className="text-base sm:text-lg font-extrabold text-[#7C3AED]">
                  ₹{billingCycle === 'yearly' ? plansData.plus.priceYearly : plansData.plus.priceMonthly}
                </span>
              </div>
            </div>

            {/* Email Association Field */}
            <div className="mb-3.5">
              <label htmlFor="checkout-email-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Account Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                id="checkout-email-input"
                type="email"
                autoComplete="email"
                value={checkoutEmail}
                onChange={(e) => {
                  setCheckoutEmail(e.target.value);
                  setEmailInputError('');
                }}
                placeholder="yourname@shop.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  emailInputError
                    ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 bg-white text-slate-900 focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100'
                }`}
              />

              {isFromDesktop && !emailInputError && (
                <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                  <CheckIcon className="size-3" />
                  <span>Linked from your Invio desktop app</span>
                </p>
              )}

              {emailInputError && (
                <p className="text-[11px] text-rose-600 font-medium mt-1">
                  {emailInputError}
                </p>
              )}
            </div>

            {/* Optional Phone Field */}
            <div className="mb-4">
              <label htmlFor="checkout-phone-input" className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-slate-400 font-normal text-[11px]">(Optional — for WhatsApp/SMS receipt)</span>
              </label>
              <input
                id="checkout-phone-input"
                type="tel"
                autoComplete="tel"
                value={checkoutPhone}
                onChange={(e) => setCheckoutPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>

            {/* Error Notice */}
            {payError && (
              <div className="mb-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-snug">
                {payError}
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button
                type="button"
                disabled={payingPlan === checkoutModalPlan}
                onClick={() => handleStartPayment(checkoutModalPlan)}
                className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm text-center transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
              >
                {payingPlan === checkoutModalPlan ? (
                  <>
                    <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Opening Secure Payment...</span>
                  </>
                ) : (
                  <span>
                    Proceed to Payment — ₹{billingCycle === 'yearly' ? plansData.plus.priceYearly : plansData.plus.priceMonthly}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCheckoutModalPlan(null);
                  setEmailInputError('');
                  setPayError('');
                }}
                className="w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
            </div>

            {/* Security Footer */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-2">
                <span>🔒 256-Bit SSL</span>
                <span>•</span>
                <span>Razorpay Verified</span>
                <span>•</span>
                <span>Instant Activation</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default PricingPage;
