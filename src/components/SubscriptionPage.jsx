import { useEffect, useState } from 'react';
import {
  fetchSubscriptionPlans,
  createSubscriptionOrder,
  verifyPayment,
  loadRazorpayCheckout,
  openRazorpayCheckout,
} from '../services/paymentService';

/**
 * Standalone billing page (`/subscription`). Plan pricing comes from the
 * backend catalog (`GET /api/account/plans`); bundled fallback prices mirror
 * `backend/src/plans/planCatalog.ts` and are used only when the API is
 * unreachable. Buying a plan creates the Razorpay order server-side
 * (`POST /api/payment/create-subscription-order`) — the client never sends
 * an amount — then opens Razorpay Checkout and verifies server-side.
 */
const FALLBACK_PRICES = {
  free: { monthly: null, yearly: null },
  plus: { monthly: 149, yearly: 999 },
  pro: { monthly: null, yearly: null },
};

const PLAN_BLURBS = {
  free: 'Core offline billing for getting started. Free forever.',
  plus: 'Unlock everything: thermal printing, email & WhatsApp dispatch, POS display, backups and more.',
  pro: 'For teams and power sellers. Pro-only features are on the way.',
};

const PLAN_FEATURES = {
  free: [
    'Unlimited core invoices (100/month cloud sync)',
    'A4 invoice printing',
    'Inventory, customers & expenses',
    'Basic sales reports',
    'Barcode tools',
  ],
  plus: [
    'Everything in Free',
    '58mm / 80mm thermal printing',
    'Email invoices (Gmail / SMTP)',
    'WhatsApp bill sharing',
    'Customer-facing POS display',
    'Backup & restore (SQLite / PostgreSQL)',
    'Priority support',
  ],
  pro: [
    'Everything in Plus',
    'Multi-user team access (coming soon)',
    'Advanced reports & API (coming soon)',
  ],
};

function planPrice(plan, validity, apiPrices) {
  const prices = (apiPrices && apiPrices[plan.id]) || FALLBACK_PRICES[plan.id] || { monthly: null, yearly: null };
  return validity === 'yearly' ? prices.yearly : prices.monthly;
}

export function SubscriptionPage({ onNavigate, onDirectDownload }) {
  const [plans, setPlans] = useState([]);
  const [plansFromApi, setPlansFromApi] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [validity, setValidity] = useState('yearly');
  const [payingPlan, setPayingPlan] = useState(null);
  const [payError, setPayError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetchSubscriptionPlans();
      if (cancelled) return;
      if (res.success && res.plans.length > 0) {
        setPlans(res.plans);
        setPlansFromApi(true);
      } else {
        setPlans([
          { id: 'free', name: 'Free', description: PLAN_BLURBS.free, rank: 0, active: true },
          { id: 'plus', name: 'Plus', description: PLAN_BLURBS.plus, rank: 1, active: true },
          { id: 'pro', name: 'Pro', description: PLAN_BLURBS.pro, rank: 2, active: true },
        ]);
        setPlansFromApi(false);
      }
      setLoadingPlans(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const apiPrices = {};
  if (plansFromApi) {
    for (const p of plans) {
      if (p && p.id && p.prices) apiPrices[p.id] = p.prices;
    }
  }

  const sorted = [...plans].filter((p) => p && p.active !== false).sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const plusMonthly = planPrice({ id: 'plus' }, 'monthly', apiPrices);
  const plusYearly = planPrice({ id: 'plus' }, 'yearly', apiPrices);
  const savings = plusMonthly && plusYearly ? Math.round((1 - plusYearly / (plusMonthly * 12)) * 100) : 0;

  const handleBuy = async (plan) => {
    if (payingPlan || success) return;
    setPayingPlan(plan.id);
    setPayError('');
    try {
      const order = await createSubscriptionOrder(plan.id, validity);
      if (!order.success) {
        setPayError(order.error || 'Could not start checkout. Please try again.');
        setPayingPlan(null);
        return;
      }
      const scriptOk = await loadRazorpayCheckout();
      if (!scriptOk) {
        setPayError('Payment window could not be loaded. Check your connection and try again.');
        setPayingPlan(null);
        return;
      }
      openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amountPaise: order.amountPaise,
        currency: order.currency,
        amountRupees: order.amount,
        description: `Invio ${order.plan === 'plus' ? 'Plus' : order.plan} — ${order.validity} subscription`,
        onSuccess: async ({ orderId, paymentId, signature }) => {
          const result = await verifyPayment({ orderId, paymentId, signature });
          setPayingPlan(null);
          if (result.success) {
            setSuccess({
              plan: order.plan,
              validity: order.validity,
              amount: order.amount,
              orderId,
              paymentId,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setPayError('Payment could not be verified. If money was deducted, it will be refunded automatically.');
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
      setPayError('Something went wrong starting checkout. Please try again.');
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8646F4]">Subscription</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Simple plans that grow with your shop
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600">
          Start free. Upgrade to Plus when you need thermal printing, email &amp; WhatsApp dispatch, POS display and backups.
        </p>
      </div>

      {success ? (
        <div
          className="mt-10 max-w-xl mx-auto bg-white border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center shadow-sm"
          role="status"
          aria-live="polite"
        >
          <div className="mx-auto size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl" aria-hidden="true">
            ✓
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">Payment verified — thank you!</h2>
          <p className="mt-2 text-sm text-slate-600">
            Your Invio {success.plan === 'plus' ? 'Plus' : success.plan} ({success.validity}) payment of ₹{success.amount} is confirmed.
            A receipt has been sent by Razorpay — please keep payment ID <span className="font-mono font-semibold">{success.paymentId}</span> for your records.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            To link Plus to your app, open Invio on your computer and sign in — or write to{' '}
            <a href="mailto:support@timrio.com" className="text-[#8646F4] font-semibold hover:underline">
              support@timrio.com
            </a>{' '}
            with this payment ID.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Back to plans
            </button>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('product')}
              className="px-6 py-2.5 rounded-xl bg-[#8646F4] hover:bg-[#7234de] text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              Explore Invio
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Billing period toggle */}
          <div className="mt-8 flex justify-center">
            <div
              className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200"
              role="radiogroup"
              aria-label="Billing period"
            >
              {['monthly', 'yearly'].map((term) => (
                <button
                  key={term}
                  type="button"
                  role="radio"
                  aria-checked={validity === term}
                  onClick={() => setValidity(term)}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    validity === term ? 'bg-white text-[#8646F4] shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {term === 'monthly' ? 'Monthly' : `Yearly${savings > 0 ? ` — save ${savings}%` : ''}`}
                </button>
              ))}
            </div>
          </div>

          <div aria-live="polite">
            {payError && (
              <p className="mt-6 max-w-xl mx-auto text-center text-sm font-medium text-rose-600" role="alert">
                {payError}
              </p>
            )}
          </div>

          {/* Plan cards */}
          {loadingPlans ? (
            <div className="mt-8 grid gap-5 md:grid-cols-3" role="status" aria-label="Loading plans">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 animate-pulse">
                  <div className="h-5 w-20 bg-slate-100 rounded" />
                  <div className="mt-3 h-8 w-28 bg-slate-100 rounded" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 bg-slate-100 rounded" />
                    <div className="h-3 bg-slate-100 rounded" />
                    <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-3 items-stretch">
              {sorted.map((plan) => {
                const price = planPrice(plan, validity, apiPrices);
                const purchasable = price !== null && price !== undefined;
                const isPlus = plan.id === 'plus';
                const busy = payingPlan === plan.id;
                return (
                  <article
                    key={plan.id}
                    className={`relative rounded-3xl border bg-white p-6 flex flex-col shadow-sm ${
                      isPlus ? 'border-[#8646F4] ring-2 ring-[#8646F4]/20' : 'border-slate-200'
                    }`}
                    aria-label={`${plan.name} plan`}
                  >
                    {isPlus && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#8646F4] text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                        Most popular
                      </span>
                    )}
                    <h2 className="text-lg font-bold text-slate-900">{plan.name}</h2>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed min-h-8">
                      {PLAN_BLURBS[plan.id] || plan.description}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      {purchasable ? (
                        <>
                          <span className="text-3xl font-extrabold text-slate-900">₹{price}</span>
                          <span className="text-xs text-slate-500">/{validity === 'yearly' ? 'year' : 'month'}</span>
                        </>
                      ) : plan.id === 'free' ? (
                        <>
                          <span className="text-3xl font-extrabold text-slate-900">₹0</span>
                          <span className="text-xs text-slate-500">free forever</span>
                        </>
                      ) : (
                        <span className="text-3xl font-extrabold text-slate-400">Soon</span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2 text-[13px] text-slate-600 flex-1">
                      {(PLAN_FEATURES[plan.id] || []).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold" aria-hidden="true">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      {plan.id === 'free' ? (
                        <button
                          type="button"
                          onClick={() => onDirectDownload && onDirectDownload()}
                          className="w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Download Free
                        </button>
                      ) : purchasable ? (
                        <button
                          type="button"
                          onClick={() => handleBuy(plan)}
                          disabled={busy}
                          className="w-full py-2.5 rounded-xl bg-[#8646F4] hover:bg-[#7234de] disabled:opacity-60 disabled:cursor-wait text-sm font-semibold text-white transition-colors cursor-pointer"
                        >
                          {busy ? 'Opening secure checkout…' : `Buy ${plan.name} — ₹${price}`}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full py-2.5 rounded-xl bg-slate-100 text-sm font-semibold text-slate-400 cursor-not-allowed"
                          title="Coming soon"
                        >
                          Coming soon
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-slate-500">
            Secured by <span className="font-semibold">Razorpay</span> — UPI, cards, netbanking &amp; wallets.
            {!plansFromApi && !loadingPlans && ' Showing standard prices while offline.'}
          </p>
        </>
      )}
    </section>
  );
}

export default SubscriptionPage;
