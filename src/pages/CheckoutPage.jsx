import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
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
  GoogleIcon,
  EyeIcon,
  EyeOffIcon,
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

  // Random feature from FEATURES_DATA for left-side image section
  const [featureIndex, setFeatureIndex] = useState(() => {
    return Math.floor(Math.random() * FEATURES_DATA.length);
  });
  const activeFeature = FEATURES_DATA[featureIndex] || FEATURES_DATA[0];

  // Auth state — Default tab is 'login' (Sign In)
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [authTab, setAuthTab] = useState('login'); // 'login' (default) | 'register'

  // Form fields
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

  const executePayment = async (user) => {
    if (paying || successData) return;
    setPaying(true);
    setPayError('');

    const targetEmail = (user?.email || email).trim().toLowerCase();
    const effectiveBiz = user?.businessName || businessName.trim();

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
      const cleanBiz = businessName.trim();

      if (!cleanBiz) {
        setAuthError('Please enter your business or shop name.');
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
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-[#f8fafc]">
        <div className="max-w-md w-full p-8 bg-white rounded-squircle border border-emerald-200 shadow-xl text-center">
          <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="size-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Payment Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Payment of <strong className="text-slate-900">₹{successData.amount}</strong> confirmed for Invio Plus ({successData.validity}).
            Payment ID: <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-800 text-xs font-semibold">{successData.paymentId}</span>.
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-left mb-6 space-y-1.5 text-xs text-slate-700">
            <p className="font-bold text-[#7C3AED] uppercase tracking-wider text-[11px]">
              How to access your Plus license:
            </p>
            <p>1. Open the Invio desktop application.</p>
            <p>2. Sign in with <strong className="text-slate-900 font-mono">{successData.email}</strong>.</p>
            <p>3. Your Plus features unlock automatically!</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/download"
              className="w-full sm:w-auto py-2.5 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs text-center cursor-pointer"
            >
              Download Desktop App
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto py-2.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Width, Two-Section Layout
  return (
    <div className="w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white lg:overflow-hidden">
      {/* Left Section: Image (More width: 60%, full height, pinned) */}
      <div className="w-full lg:w-[60%] bg-slate-950 lg:h-full min-h-[350px] flex items-center justify-center overflow-hidden relative group shrink-0">
        <img
          src={activeFeature.imageUrl}
          alt={activeFeature.imageAlt}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </div>

      {/* Right Section: Form (40% width with independent smooth overflow scroll) */}
      <div className="w-full lg:w-[40%] bg-white p-6 sm:p-8 lg:p-12 lg:h-full lg:overflow-y-auto flex flex-col">
        <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8">
          {currentUser ? (
            /* State: Already Signed In */
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Ready for Checkout
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Complete payment to instantly link Invio Plus to your account.
                </p>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 mb-5">
                <div className="size-11 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-bold text-base shadow-2xs">
                  {currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {currentUser.businessName || 'Your Business Account'}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {currentUser.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline cursor-pointer shrink-0"
                >
                  Switch
                </button>
              </div>

              {/* Plan Summary Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100/90 mb-5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-xs font-bold text-slate-900 tracking-tight">Invio Plus License</span>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">
                    {billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#7C3AED]">
                  ₹{currentPrice}
                </span>
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
                    <span>Opening Payment Gateway...</span>
                  </>
                ) : (
                  <span>
                    Pay ₹{currentPrice}
                  </span>
                )}
              </button>
            </div>
          ) : (
            /* State: Not Signed In (Sign In by DEFAULT, Sign Up secondary) */
            <div>
              {/* Plan Summary Badge */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/70 border border-purple-100/90 mb-5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-xs font-bold text-slate-900 tracking-tight">Invio Plus License</span>
                  <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">
                    {billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#7C3AED]">
                  ₹{currentPrice}
                </span>
              </div>

              {/* Two-Tab Switcher: Sign In (DEFAULT) vs Sign Up */}
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
                  Or with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleEmailAuthSubmit} className="space-y-3.5">
                {authTab === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Business / Shop Name
                    </label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Business or shop name"
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@business.com"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                  />
                  {isFromDesktop && (
                    <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <CheckIcon className="size-3" />
                      <span>Linked from Invio desktop app</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete={authTab === 'register' ? 'new-password' : 'current-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authTab === 'register' ? 'At least 6 characters' : 'Enter your password'}
                      className="w-full h-10 px-3 pr-10 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
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
                        ? `Sign In & Pay ₹${currentPrice}`
                        : `Create Account & Pay ₹${currentPrice}`}
                    </span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
