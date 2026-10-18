import { useState, useEffect, useCallback } from 'react';
import { crmApi } from '../services/crmApi';
import { useCrmAuth } from '../context/CrmAuthContext';
import { useCrmToast } from '../context/CrmToastContext';
import { CheckCircleIcon, RefreshCwIcon, AlertCircleIcon } from '../components/CrmIcons';
import { PricingCardSkeleton } from '../../components/common/Skeleton';

const FALLBACK_PLANS = [
  {
    id: 'free',
    name: 'Free Starter',
    price: 0,
    interval: 'Lifetime',
    badge: 'Default Tier',
    popular: false,
    description: 'Essential billing for retail shops and local merchants.',
    features: [
      'Core Offline Invoicing & Local SQLite Storage',
      'Standard A4 and 80mm Thermal Receipt Formats',
      'Up to 100 Products and 50 Invoices/month',
      'Standard UPI Dynamic QR Payment Codes',
      'Community Support via Docs & FAQ',
    ],
    limits: '50 invoices/mo, 100 items',
  },
  {
    id: 'plus',
    name: 'Plus Professional',
    price: 999,
    interval: '/ year',
    badge: 'Most Popular',
    popular: true,
    description: 'Advanced retail operations with multi-device barcode scanning and inventory tracking.',
    features: [
      'Everything in Free Plan',
      'Unlimited Invoices, Products & Customers',
      'Barcode Scanner & Bluetooth Thermal Printer Support',
      'Detailed GST HSN/SAC Tax Reporting',
      'Automated Email & WhatsApp Delivery Integration',
      'Priority Email & Ticket Support (24h SLA)',
    ],
    limits: 'Unlimited invoices & catalog',
  },
  {
    id: 'pro',
    name: 'Pro Enterprise',
    price: 4999,
    interval: '/ year',
    badge: 'Enterprise',
    popular: false,
    description: 'Multi-store analytics, custom branding, and dedicated staff management.',
    features: [
      'Everything in Plus Plan',
      'Custom White-Label Invoice Templates & Brand Signatures',
      'Comprehensive Profit & Loss, Tax Audit Exports',
      'Advanced Multi-Store Role Delegation',
      'Dedicated Account Manager & 2-Hour SLA Support',
    ],
    limits: 'Unlimited everything, Multi-device',
  },
];

function toNumberPrice(v) {
  if (typeof v === 'number') return v;
  if (v == null) return 0;
  const n = Number(String(v).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function formatPrice(v) {
  const n = toNumberPrice(v);
  return `₹${n.toLocaleString('en-IN')}`;
}

function normalizePlans(raw) {
  const list = Array.isArray(raw)
    ? raw
    : raw?.plans || raw?.data || raw?.items || [];
  if (!Array.isArray(list) || !list.length) return null;
  return list.map((r, idx) => {
    const fb = FALLBACK_PLANS[idx] || FALLBACK_PLANS[0];
    const featuresRaw = r.features ?? r.includedFeatures ?? r.included_features ?? fb.features;
    const features = Array.isArray(featuresRaw)
      ? featuresRaw.map(String)
      : typeof featuresRaw === 'string'
        ? featuresRaw.split('\n').map((s) => s.trim()).filter(Boolean)
        : [...fb.features];
    return {
      _raw: r,
      id: r.id ?? r.planId ?? r.plan_id ?? r.code ?? fb.id,
      name: r.name ?? r.title ?? r.planName ?? fb.name,
      price: r.price ?? r.amount ?? r.priceInr ?? r.price_inr ?? r.price_yearly ?? r.prices?.yearly ?? fb.price,
      interval: r.interval ?? r.validity ?? r.billingInterval ?? r.duration ?? fb.interval,
      badge: r.badge ?? r.tag ?? r.label ?? fb.badge,
      popular: Boolean(r.popular ?? r.isPopular ?? r.is_popular ?? r.highlighted ?? fb.popular),
      description: r.description ?? r.desc ?? fb.description,
      features,
      limits: r.limits ?? r.entitlement ?? r.featureLimits ?? r.limitsText ?? fb.limits,
      active: r.active ?? r.isActive ?? r.is_active ?? r.status !== 'inactive',
      subscribers: r.subscribers ?? r.subscriberCount ?? r.totalCustomers ?? null,
      updatedAt: r.updatedAt ?? r.updated_at ?? null,
    };
  });
}

export function CrmPlansPage() {
  const { isAdmin } = useCrmAuth();
  const { toast } = useCrmToast();
  const [plans, setPlans] = useState(FALLBACK_PLANS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingLive, setUsingLive] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // Edit modal (admin only)
  const [editing, setEditing] = useState(null);
  const [fName, setFName] = useState('');
  const [fPrice, setFPrice] = useState(0);
  const [fInterval, setFInterval] = useState('/ year');
  const [fBadge, setFBadge] = useState('');
  const [fDescription, setFDescription] = useState('');
  const [fFeatures, setFFeatures] = useState('');
  const [fLimits, setFLimits] = useState('');
  const [fPopular, setFPopular] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await crmApi.getPlans();
      const normalized = normalizePlans(res);
      if (normalized) {
        setPlans(normalized);
        setUsingLive(true);
        setLastSynced(new Date());
      } else {
        throw new Error('Plans API returned an empty catalog.');
      }
    } catch (err) {
      const msg = err.message || 'Failed to load live plan catalog.';
      setError(msg);
      setUsingLive(false);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  function openEdit(plan) {
    if (!isAdmin) {
      toast.warning('Only admins can change pricing.');
      return;
    }
    setEditing(plan);
    setFName(plan.name || '');
    setFPrice(toNumberPrice(plan.price));
    setFInterval(plan.interval || '/ year');
    setFBadge(plan.badge || '');
    setFDescription(plan.description || '');
    setFFeatures((plan.features || []).join('\n'));
    setFLimits(plan.limits || '');
    setFPopular(Boolean(plan.popular));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!editing || !isAdmin) return;
    setSaving(true);
    try {
      const features = fFeatures.split('\n').map((s) => s.trim()).filter(Boolean);
      const price = Number(fPrice) || 0;
      const payload = {
        name: fName,
        price,
        amount: price,
        priceInr: price,
        interval: fInterval,
        validity: fInterval,
        badge: fBadge,
        description: fDescription,
        features,
        includedFeatures: features,
        limits: fLimits,
        entitlement: fLimits,
        popular: fPopular,
        isPopular: fPopular,
      };
      await crmApi.updatePlan(editing.id, payload);
      setEditing(null);
      toast.success(`Plan "${fName}" pricing updated.`);
      fetchPlans();
    } catch (err) {
      toast.error(err.message || 'Failed to update plan.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Subscription Plans & Entitlements</h2>
          <p className="text-xs text-slate-500">
            {usingLive ? (
              <>Live catalog from API <span className="font-mono">GET /api/crm/plans</span>{lastSynced && <> · synced {lastSynced.toLocaleTimeString()}</>}</>
            ) : (
              <>Authoritative plan catalog definitions, monetisation intervals, and feature limits.</>
            )}
            {!isAdmin && <span className="text-amber-600 font-semibold"> (Read-only — only admins can change pricing)</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-1 uppercase rounded-full ${usingLive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
            {loading ? 'Syncing…' : usingLive ? '● Live data' : '○ Fallback data'}
          </span>
          <button
            onClick={fetchPlans}
            disabled={loading}
            className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-xs transition disabled:opacity-50 cursor-pointer rounded-lg"
            title="Reload live pricing"
          >
            <RefreshCwIcon className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2 rounded-xl">
          <AlertCircleIcon className="size-4 text-red-500 flex-shrink-0" />
          <span>{error} Showing fallback catalog.</span>
        </div>
      )}

      {/* Plans Grid with Skeleton loader */}
      {loading && !plans.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading plans">
          <PricingCardSkeleton />
          <PricingCardSkeleton isFeatured={true} />
          <PricingCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 border transition flex flex-col justify-between shadow-xs ${
                plan.popular ? 'border-purple-300 ring-2 ring-purple-600/10' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-base text-slate-900">{plan.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    plan.popular ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-2xl font-black text-slate-900">{formatPrice(plan.price)}</span>
                  <span className="text-xs text-slate-500">{plan.interval}</span>
                </div>

                <p className="text-xs text-slate-600 mb-4">{plan.description}</p>

                <div className="border-t border-slate-100 pt-4 space-y-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Included Features</p>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircleIcon className="size-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 font-mono mb-3">
                  Entitlement: {plan.limits}
                </div>
                {isAdmin && (
                  <button
                    onClick={() => openEdit(plan)}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    Edit Pricing & Features
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Edit Plan Pricing: {editing.name}</h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {editing.id}</p>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Plan Display Name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Price (INR ₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={fPrice}
                    onChange={(e) => setFPrice(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Billing Interval</label>
                  <input
                    type="text"
                    value={fInterval}
                    onChange={(e) => setFInterval(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600"
                    placeholder="/ year or Lifetime"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={fBadge}
                  onChange={(e) => setFBadge(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600"
                  placeholder="e.g. Most Popular"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={fDescription}
                  onChange={(e) => setFDescription(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Features (One per line)</label>
                <textarea
                  rows="4"
                  value={fFeatures}
                  onChange={(e) => setFFeatures(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Limits Summary</label>
                <input
                  type="text"
                  value={fLimits}
                  onChange={(e) => setFLimits(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-purple-600"
                  placeholder="e.g. Unlimited invoices & catalog"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="crm-edit-popular"
                  checked={fPopular}
                  onChange={(e) => setFPopular(e.target.checked)}
                  className="size-4 rounded text-purple-600 border-slate-300 focus:ring-purple-500"
                />
                <label htmlFor="crm-edit-popular" className="font-semibold text-slate-700 cursor-pointer">
                  Highlight as &quot;Most Popular&quot;
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50 cursor-pointer"
                >
                  {saving ? 'Saving...' : 'Save Plan Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrmPlansPage;
