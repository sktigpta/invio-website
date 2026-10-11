import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { applySEO } from '../utils/seoHelper';
import {
  getStoredUser,
  getStoredToken,
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
} from '../components/Icons';

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

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [authTab, setAuthTab] = useState('register'); // 'register' | 'login'

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

    // Fetch dynamic plan catalog
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

  const handleGoogleAuth = () => {
    setAuthError('');
    setAuthLoading(true);
    triggerGoogleSignIn({
      businessName: businessName.trim() || undefined,
      onSuccess: (user, token) => {
        setAuthLoading(false);
        setCurrentUser(user);
        if (user.email) setEmail(user.email);
        if (user.businessName) setBusinessName(user.businessName);
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
        // If email is already registered, suggest logging in
        if (regRes.error && regRes.error.toLowerCase().includes('already registered')) {
          setAuthError('This email is already registered. Please switch to Sign In.');
          setAuthTab('login');
          setAuthLoading(false);
          return;
        }
        setAuthError(regRes.error || 'Registration failed. Please check your details.');
        setAuthLoading(false);
        return;
      }

      // If user requires email verification before standard login,
      // in the checkout flow they can proceed directly to checkout payment
      // which automatically marks the account as verified upon successful payment!
      const userObj = {
        email: cleanEmail,
        businessName: cleanBiz,
        firstName: cleanFirst,
        lastName: cleanLast,
      };
      setStoredAuth(null, userObj);
      setCurrentUser(userObj);
      setAuthLoading(false);
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
    }
  };

  const handleStartPayment = async () => {
    if (paying || successData) return;
    setPaying(true);
    setPayError('');

    const targetEmail = (currentUser?.email || email).trim().toLowerCase();
    const effectiveBiz = currentUser?.businessName || businessName.trim();
    const effectiveFirst = currentUser?.firstName || firstName.trim();
    const effectiveLast = currentUser?.lastName || lastName.trim();

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
              <li>Thermal printing, dynamic UPI QR receipts, and dual POS will unlock automatically!</li>
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
      badge="Simple & Secure"
      title="Complete Your Order"
      subtitle="Sign in or create your account, then complete payment to instantly unlock Invio Plus on your desktop app."
    >
      <div className="max-w-4xl mx-auto my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Auth / Account Step (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-squircle p-6 sm:p-8 border border-slate-200/90 shadow-xl">
          {currentUser ? (
            /* State: Already Signed In */
            <div>
              <div className="flex items-center gap-3 mb-4">
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
                  <span>Account confirmed. Ready for instant license linkage.</span>
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
            /* State: Not Signed In (Tabs for Sign Up & Sign In + Google Auth) */
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab('register');
                      setAuthError('');
                    }}
                    className={`text-xs sm:text-sm font-bold pb-1 cursor-pointer transition-colors relative ${
                      authTab === 'register'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    1. Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthTab('login');
                      setAuthError('');
                    }}
                    className={`text-xs sm:text-sm font-bold pb-1 cursor-pointer transition-colors relative ${
                      authTab === 'login'
                        ? 'text-[#7C3AED] border-b-2 border-[#7C3AED]'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Existing User (Sign In)
                  </button>
                </div>
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
                  Or continue with email
                </span>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailAuthSubmit} className="space-y-3">
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
                          placeholder="John"
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
                          placeholder="Doe"
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
                        placeholder="Apex Supermarket"
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
                    placeholder="yourname@shop.com"
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
                      placeholder="Min. 6 characters"
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
                      {authTab === 'register'
                        ? 'Create Account & Continue'
                        : 'Sign In & Continue'}
                    </span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-squircle p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center shadow-2xs">
              <ReceiptIcon className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Invio Plus Plan</h3>
              <p className="text-xs text-slate-500">Commercial Counter POS License</p>
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
              <span>Yearly</span>
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
              Monthly
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-slate-700">Subtotal</span>
              <span className="text-base font-extrabold text-[#7C3AED]">
                ₹{currentPrice}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              {billingCycle === 'yearly' ? 'Billed annually (₹83/mo equivalent)' : 'Billed monthly'}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2.5">
              Included Commercial POS Features:
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>58mm & 80mm ESC/POS thermal receipt printing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>Dynamic UPI QR code printed on counter slips</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>Dual-screen customer display POS projection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>Rapid item barcode scanner auto-increment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="size-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
                <span>Multi-counter local networked database support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default CheckoutPage;
