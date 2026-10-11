import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { applySEO } from '../utils/seoHelper';
import {
  getStoredUser,
  setStoredAuth,
  clearStoredAuth,
  loginUser,
  registerUser,
  triggerGoogleSignIn,
} from '../services/authService';
import {
  fetchSubscriptionPlans,
  createSubscriptionOrder,
  verifyPayment,
  loadRazorpayCheckout,
  openRazorpayCheckout,
} from '../services/paymentService';
import {
  CheckIcon,
  ReceiptIcon,
  GoogleIcon,
  EyeIcon,
  EyeOffIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from '../components/Icons';
import { FEATURES_DATA } from '../data/featuresData';

const DEFAULT_PLUS_PRICE = {
  monthly: 149,
  yearly: 999,
};

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paramEmail = searchParams.get('email') || '';
  const paramCycle = searchParams.get('cycle') || 'yearly';
  const isFromDesktop = Boolean(paramEmail || searchParams.get('source') === 'desktop');

  const [billingCycle, setBillingCycle] = useState(
    paramCycle === 'monthly' ? 'monthly' : 'yearly'
  );
  const [prices, setPrices] = useState(DEFAULT_PLUS_PRICE);

  // Random feature from FEATURES_DATA for left-side showcase
  const [featureIndex, setFeatureIndex] = useState(() => {
    return Math.floor(Math.random() * FEATURES_DATA.length);
  });
  const activeFeature = FEATURES_DATA[featureIndex] || FEATURES_DATA[0];

  // Auth state — Default tab is 'login' (Sign In)
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [authTab, setAuthTab] = useState('login'); // 'login' (default) | 'register'

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState(paramEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & error states
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    applySEO('pricing');
    window.scrollTo(0, 0);

    // Fetch dynamic plan catalog from backend
    fetchSubscriptionPlans()
      .then((res) => {
        if (res.success && Array.isArray(res.plans)) {
          const plusPlan = res.plans.find((p) => String(p.id).toLowerCase() === 'plus');
          if (plusPlan?.prices) {
            setPrices({
              monthly: plusPlan.prices.monthly || DEFAULT_PLUS_PRICE.monthly,
              yearly: plusPlan.prices.yearly || DEFAULT_PLUS_PRICE.yearly,
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleNextFeature = () => {
    setFeatureIndex((prev) => (prev + 1) % FEATURES_DATA.length);
  };

  const executePayment = async (user) => {
    if (paying || successData) return;
    setPaying(true);
    setPayError('');

    const targetEmail = (user?.email || email).trim().toLowerCase();
    const effectiveBiz = user?.businessName || businessName.trim();
    const effectiveFirst = user?.firstName || firstName.trim();
    const effectiveLast = user?.lastName || lastName.trim();

    try {
      const order = await createSubscriptionOrder('plus', billingCycle);
      if (!order.success) {
        setPayError(order.error || 'Could not start checkout. Please try again.');
        setPaying(false);
        return;
      }

      const scriptOk = await loadRazorpayCheckout();
      if (!scriptOk) {
        setPayError('Payment window could not be loaded. Please check your internet connection.');
        setPaying(false);
        return;
      }

      openRazorpayCheckout({
        keyId: order.keyId,
        orderId: order.orderId,
        amountPaise: order.amountPaise,
        currency: order.currency,
        amountRupees: order.amount,
        customerEmail: targetEmail,
        customerPhone: undefined,
        description: `Invio Plus — ${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
        onSuccess: async ({ orderId, paymentId, signature }) => {
          const result = await verifyPayment({
            orderId,
            paymentId,
            signature,
            email: targetEmail,
            planId: 'plus',
            validity: billingCycle,
            businessName: effectiveBiz,
            firstName: effectiveFirst,
            lastName: effectiveLast,
            password: password || undefined,
          });

          setPaying(false);

          if (result.success) {
            setSuccessData({
              email: targetEmail,
              businessName: effectiveBiz,
              validity: billingCycle,
              amount: order.amount,
              orderId,
              paymentId,
              activated: result.data?.activated,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setPayError('Payment verification could not be completed. If money was deducted, it will be refunded automatically.');
          }
        },
        onDismiss: () => setPaying(false),
        onError: (err) => {
          setPaying(false);
          setPayError(err?.message || 'Payment failed. No money was deducted.');
        },
      });
    } catch {
      setPaying(false);
      setPayError('An unexpected error occurred while starting checkout.');
    }
  };

  const handleGoogleAuth = () => {
    setAuthError('');
    setAuthLoading(true);
    triggerGoogleSignIn({
      businessName: businessName.trim() || undefined,
      onSuccess: (user) => {
        setAuthLoading(false);
        setCurrentUser(user);
        if (user.email) setEmail(user.email);
        if (user.businessName) setBusinessName(user.businessName);
        executePayment(user);
      },
      onError: (err) => {
        setAuthLoading(false);
        setAuthError(err || 'Google sign-in could not be completed.');
      },
    });
  };

  const handleEmailAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      setAuthError('Please enter a valid email address (e.g. yourname@shop.com).');
      return;
    }

    if (!password || password.length < 6) {
      setAuthError('Password must be at least 6 characters.');
      return;
    }

    if (authTab === 'register') {
      const cleanFirst = firstName.trim();
      const cleanLast = lastName.trim();
      const cleanBiz = businessName.trim();

      if (!cleanFirst) {
        setAuthError('Please enter your first name.');
        return;
      }
      if (!cleanLast) {
        setAuthError('Please enter your last name.');
        return;
      }
      if (!cleanBiz) {
        setAuthError('Please enter your shop or business name.');
        return;
      }

      setAuthLoading(true);
      const regRes = await registerUser({
        email: cleanEmail,
        password,
        businessName: cleanBiz,
      });

      if (!regRes.success) {
        if (regRes.error && regRes.error.toLowerCase().includes('already registered')) {
          setAuthError('This email is already registered. Please sign in below.');
          setAuthTab('login');
          setAuthLoading(false);
          return;
        }
        setAuthError(regRes.error || 'Registration failed. Please check your details.');
        setAuthLoading(false);
        return;
      }

      const userObj = {
        email: cleanEmail,
        businessName: cleanBiz,
        firstName: cleanFirst,
        lastName: cleanLast,
      };
      setStoredAuth(null, userObj);
      setCurrentUser(userObj);
      setAuthLoading(false);
      executePayment(userObj);
    } else {
      // Login flow
      setAuthLoading(true);
      const logRes = await loginUser(cleanEmail, password);
      setAuthLoading(false);

      if (!logRes.success) {
        setAuthError(logRes.error || 'Invalid email or password.');
        return;
      }

      setCurrentUser(logRes.user);
      executePayment(logRes.user);
    }
  };

  const handleStartPayment = () => {
    executePayment(currentUser);
  };

  const handleSwitchAccount = () => {
    clearStoredAuth();
    setCurrentUser(null);
    setPassword('');
    setPayError('');
    setAuthError('');
  };

  const currentPrice = billingCycle === 'yearly' ? prices.yearly : prices.monthly;

  // 1. Success State View
  if (successData) {
    return (
      <PageContainer
        badge="Payment Successful"
        title="Welcome to Invio Plus!"
        subtitle="Your commercial license has been activated and linked to your account."
      >
        <div className="max-w-xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-squircle border border-emerald-200 shadow-xl text-center">
          <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="size-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            License Successfully Activated
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed max-w-md mx-auto">
            Payment of <strong className="text-slate-900">₹{successData.amount}</strong> confirmed for Invio Plus ({successData.validity}).
            Payment ID: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-xs font-semibold">{successData.paymentId}</span>.
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-left mb-6 space-y-2">
            <h4 className="text-xs font-bold text-[#7C3AED] uppercase tracking-wider">
              How to access your Plus features:
            </h4>
            <ol className="text-xs text-slate-700 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Open the Invio desktop application on your PC or Mac.</li>
              <li>Sign in with your email: <strong className="text-slate-900 font-mono">{successData.email}</strong>.</li>
              <li>Thermal printing, dynamic UPI QR receipts, and dual POS display unlock automatically!</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/download"
              className="w-full sm:w-auto py-2.5 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs text-center cursor-pointer"
            >
              Download Invio Desktop
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      badge="Simple &amp; Secure"
      title="Complete Your Order"
      subtitle="Sign in or create your account to unlock Invio Plus on your desktop application."
    >
      <div className="max-w-6xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Feature Spotlight Image & Plan Summary (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Feature Showcase Card */}
          <div className="bg-white rounded-squircle p-6 sm:p-7 border border-slate-200/90 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[#7C3AED] text-xs font-semibold">
                <SparklesIcon className="size-3.5 text-[#7C3AED]" />
                <span>Feature Spotlight • {activeFeature.category}</span>
              </div>
              <button
                type="button"
                onClick={handleNextFeature}
                className="text-[11px] font-semibold text-slate-500 hover:text-[#7C3AED] transition-colors cursor-pointer flex items-center gap-1"
                title="View another feature"
              >
                <span>Next Feature</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
              {activeFeature.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
              {activeFeature.tagline}
            </p>

            {/* Random Feature WebP Screenshot */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-xs aspect-video mb-4 group">
              <img
                src={activeFeature.imageUrl}
                alt={activeFeature.imageAlt}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#7C3AED] shadow-2xs border border-purple-100">
                Included in Plus
              </div>
            </div>

            {/* Feature Bullets */}
            <ul className="space-y-2 text-xs text-slate-600 mb-2">
              {activeFeature.bullets.slice(0, 3).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan Summary Card */}
          <div className="bg-white rounded-squircle p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shadow-2xs">
                  <ReceiptIcon className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Invio Plus Plan</h4>
                  <p className="text-[11px] text-slate-500">Commercial Counter POS License</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-[#7C3AED]">₹{currentPrice}</span>
                <span className="text-[11px] text-slate-500 ml-1">
                  {billingCycle === 'yearly' ? '/ year' : '/ mo'}
                </span>
              </div>
            </div>

            {/* Billing Cycle Picker */}
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex text-center">
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#7C3AED] text-white shadow-2xs'
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
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#7C3AED] shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <ShieldCheckIcon className="size-4" />
                <span>100% Offline Local Privacy</span>
              </div>
              <span>No Cloud Egress Fees</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form (Sign In Default, Sign Up, or Confirmed Payment) (6 Cols) */}
        <div className="lg:col-span-6 bg-white rounded-squircle p-6 sm:p-8 border border-slate-200/90 shadow-xl">
          {currentUser ? (
            /* State: Already Signed In */
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="size-12 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-bold text-base shadow-2xs">
                  {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentUser.businessName || 'Your Business Account'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-emerald-600 shrink-0" />
                  <span>Account confirmed. Ready for instant license activation.</span>
                </div>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-950 underline cursor-pointer shrink-0 ml-2"
                >
                  Switch account
                </button>
              </div>

              {payError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {payError}
                </div>
              )}

              <button
                type="button"
                disabled={paying}
                onClick={handleStartPayment}
                className="w-full py-3 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                {paying ? (
                  <>
                    <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Opening Secure Payment Window...</span>
                  </>
                ) : (
                  <span>
                    Proceed to Payment — ₹{currentPrice} {billingCycle === 'yearly' ? '/ year' : '/ month'}
                  </span>
                )}
              </button>
            </div>
          ) : (
            /* State: Not Signed In (Sign In by DEFAULT, Sign Up secondary) */
            <div>
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {authTab === 'login' ? 'Sign In to Your Account' : 'Create Your Business Account'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {authTab === 'login'
                    ? 'Enter your credentials to link your Invio Plus license.'
                    : 'Enter your basic shop details to register and activate your license.'}
                </p>
              </div>

              {/* Two-Tab Switcher: Sign In (Default) vs Sign Up */}
              <div className="flex p-1 rounded-full bg-slate-100 border border-slate-200/80 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('login');
                    setAuthError('');
                  }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    authTab === 'login'
                      ? 'bg-white text-[#7C3AED] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('register');
                    setAuthError('');
                  }}
                  className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    authTab === 'register'
                      ? 'bg-white text-[#7C3AED] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Google One-Click Auth */}
              <button
                type="button"
                disabled={authLoading}
                onClick={handleGoogleAuth}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2.5 mb-4"
              >
                <GoogleIcon className="size-4" />
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-medium text-slate-400">
                  Or with email and password
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleEmailAuthSubmit} className="space-y-3.5">
                {authTab === 'register' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Rahul"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Sharma"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business / Shop Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Sharma Kirana &amp; General Store"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sharma.store@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                  />
                  {isFromDesktop && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <CheckIcon className="size-3" />
                      <span>Linked from your Invio desktop app</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete={authTab === 'register' ? 'new-password' : 'current-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password (min. 6 characters)"
                      className="w-full px-3 py-2 pr-10 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-snug">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {authLoading ? (
                    <>
                      <span className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>
                      {authTab === 'login'
                        ? 'Sign In & Proceed to Payment'
                        : 'Create Account & Proceed to Payment'}
                    </span>
                  )}
                </button>

                {/* Footer Switch Prompt */}
                <div className="pt-2 text-center text-xs text-slate-500">
                  {authTab === 'login' ? (
                    <span>
                      Don't have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('register');
                          setAuthError('');
                        }}
                        className="text-[#7C3AED] font-semibold hover:underline cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthTab('login');
                          setAuthError('');
                        }}
                        className="text-[#7C3AED] font-semibold hover:underline cursor-pointer"
                      >
                        Sign In
                      </button>
                    </span>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

export default CheckoutPage;
