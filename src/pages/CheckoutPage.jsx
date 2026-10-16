import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import {
  getStoredUser,
  getStoredToken,
  setStoredAuth,
  clearStoredAuth,
  fetchAccountContext,
  loginUser,
  registerUser,
  triggerGoogleSignIn,
  verifyEmail,
  resendVerification,
  updateAccountProfile,
} from '../services/authService';
import {
  fetchSubscriptionPlans,
  createSubscriptionOrder,
  verifyPayment,
  loadRazorpayCheckout,
  openRazorpayCheckout,
  validateDiscount,
} from '../services/paymentService';
import {
  CheckIcon,
  GoogleIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
} from '../components/Icons';
import { FEATURES_DATA } from '../data/featuresData';
import { CouponTicket } from '../components/CouponTicket';

// Computed once at module level — avoids re-randomizing on every render in React 18 Strict Mode.
const CHECKOUT_FEATURE_INDEX = Math.floor(Math.random() * FEATURES_DATA.length);

const DEFAULT_PLUS_PRICE = {
  monthly: 149,
  yearly: 999,
};

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paramEmail = searchParams.get('email') || '';
  const paramCycle = searchParams.get('cycle') || 'yearly';
  const paramCoupon = searchParams.get('coupon') || searchParams.get('discount') || searchParams.get('promo') || '';
  const isFromDesktop = Boolean(paramEmail || searchParams.get('source') === 'desktop');

  const [billingCycle, setBillingCycle] = useState(
    paramCycle === 'monthly' ? 'monthly' : 'yearly'
  );
  const [prices, setPrices] = useState(DEFAULT_PLUS_PRICE);

  // Discount & Coupon State
  const [couponInput, setCouponInput] = useState(paramCoupon);
  const [couponApplied, setCouponApplied] = useState(null);
  const [validatingCoupon, setValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [showCouponInput, setShowCouponInput] = useState(() => Boolean(paramCoupon));

  // Random feature from FEATURES_DATA for left-side image section
  const [featureIndex] = useState(CHECKOUT_FEATURE_INDEX);
  const activeFeature = FEATURES_DATA[featureIndex] || FEATURES_DATA[0];

  // Auth state — Default tab is 'login' (Sign In)
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'
  const [needsBusinessDetails, setNeedsBusinessDetails] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
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
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [checkingMembership, setCheckingMembership] = useState(() => Boolean(getStoredUser()));
  const [allowReorder, setAllowReorder] = useState(false);

  // OTP verification state
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [resendCooldownSeconds, setResendCooldownSeconds] = useState(0);

  const basePrice = billingCycle === 'yearly' ? prices.yearly : prices.monthly;
  const currentPrice = couponApplied
    ? Math.max(0, basePrice - (couponApplied.discountAmount || 0))
    : basePrice;

  const handleApplyCoupon = async (codeToApply = couponInput) => {
    const clean = String(codeToApply || '').trim().toUpperCase();
    if (!clean) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    setValidatingCoupon(true);
    setCouponError('');
    try {
      const res = await validateDiscount(clean, 'plus', billingCycle, currentUser?.id);
      if (res.valid) {
        setCouponApplied(res);
        setCouponInput(clean);
        setCouponError('');
        setShowCouponInput(false);
      } else {
        setCouponApplied(null);
        setCouponError(res.message || 'Invalid coupon code.');
      }
    } catch {
      setCouponError('Failed to validate coupon. Please try again.');
    } finally {
      setValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponInput('');
    setCouponError('');
    setShowCouponInput(false);
  };

  const checkMembership = async (user, token) => {
    if (!user) return null;
    let plan = (user.plan || '').toLowerCase();
    let status = 'active';
    let expiresAt = null;

    try {
      const ctx = await fetchAccountContext(token || getStoredToken());
      if (ctx && ctx.subscription) {
        plan = (ctx.subscription.plan || plan).toLowerCase();
        status = (ctx.subscription.status || status).toLowerCase();
        expiresAt = ctx.subscription.expiresAt || null;
      }
    } catch {
      // Fall back to user.plan
    }

    const isPaid = plan === 'plus' || plan === 'pro';
    const isActive = status === 'active' || status === 'trialing';
    const isNotExpired = !expiresAt || new Date(expiresAt).getTime() > Date.now();

    if (isPaid && isActive && isNotExpired) {
      return {
        hasMembership: true,
        plan: plan === 'pro' ? 'Pro' : 'Plus',
        status,
        expiresAt,
      };
    }
    return null;
  };

  useEffect(() => {
    applySEO('checkout');
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

    // If an account is already stored, check its active membership status
    if (currentUser) {
      // If business name is missing, prompt for it
      if (!currentUser.businessName || currentUser.businessName.trim() === '') {
        setNeedsBusinessDetails(true);
        setCheckingMembership(false);
        return;
      }
      setCheckingMembership(true);
      checkMembership(currentUser)
        .then((mem) => {
          if (mem?.hasMembership) {
            setMembershipInfo(mem);
          }
        })
        .finally(() => {
          setCheckingMembership(false);
        });
    }
  }, []);

  // Auto-apply coupon from URL if present
  useEffect(() => {
    if (paramCoupon && currentUser) {
      handleApplyCoupon(paramCoupon);
    }
  }, [currentUser]);

  // Re-validate coupon when billing cycle changes
  useEffect(() => {
    if (couponApplied?.code && currentUser) {
      handleApplyCoupon(couponApplied.code);
    }
  }, [billingCycle]);

  const executePayment = async (user) => {
    if (paying || successData) return;
    setPaying(true);
    setPayError('');

    const targetEmail = (user?.email || currentUser?.email || email).trim().toLowerCase();
    const effectiveName = user?.fullName || currentUser?.fullName || fullName.trim();
    const effectiveBiz = user?.businessName || currentUser?.businessName || businessName.trim();

    try {
      const order = await createSubscriptionOrder(
        'plus',
        billingCycle,
        couponApplied?.code || null,
        user?.id || currentUser?.id
      );
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
            firstName: effectiveName || undefined,
            password: password || undefined,
          });

          setPaying(false);

          if (result.success) {
            if (result.data?.token && result.data?.user) {
              setStoredAuth(result.data.token, result.data.user);
              setCurrentUser(result.data.user);
            }
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

  useEffect(() => {
    if (resendCooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setResendCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldownSeconds]);

  // Handle OTP Code Verification
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const cleanCode = verificationCode.trim();
    if (!/^\d{4}$/.test(cleanCode)) {
      setAuthError('Please enter the 4-digit numeric verification code.');
      return;
    }
    setAuthError('');
    setIsVerifyingCode(true);
    const res = await verifyEmail(pendingVerificationEmail, cleanCode);
    setIsVerifyingCode(false);

    if (res.success) {
      if (res.user) {
        setPendingVerificationEmail('');
        setCurrentUser(res.user);
        // If business name is missing, prompt for it
        if (!res.user.businessName || res.user.businessName.trim() === '') {
          setNeedsBusinessDetails(true);
          return;
        }
        // Check existing membership
        setCheckingMembership(true);
        const mem = await checkMembership(res.user, res.token);
        setCheckingMembership(false);
        if (mem?.hasMembership) {
          setMembershipInfo(mem);
        }
      } else {
        setPendingVerificationEmail('');
        setAuthTab('login');
        setAuthError('Email verified successfully! Please sign in with your password to continue.');
      }
    } else {
      setAuthError(res.error || 'Verification code failed. Please check the code and try again.');
    }
  };

  const handleResendCode = async () => {
    if (!pendingVerificationEmail || resendCooldownSeconds > 0) return;
    setAuthError('');
    const res = await resendVerification(pendingVerificationEmail);
    if (res.success) {
      setResendCooldownSeconds(60);
      setAuthError('A fresh verification code was sent to your email.');
    } else {
      setAuthError(res.error || 'Could not resend code. Please try again shortly.');
    }
  };

  // Handle Google Auth
  const handleGoogleAuth = () => {
    setAuthError('');
    setAuthLoading(true);
    const authMode = authTab === 'register' ? 'signup' : 'signin';
    triggerGoogleSignIn({
      mode: authMode,
      businessName: businessName.trim() || undefined,
      onSuccess: async (user, token) => {
        setAuthLoading(false);
        // Check if businessName is provided and non-empty
        const hasValidBizName = Boolean(user?.businessName && user.businessName.trim().length > 0 && user.businessName.trim() !== user.email);
        setCurrentUser(user);
        if (user.email) setEmail(user.email);
        if (user.businessName) setBusinessName(user.businessName);

        if (!hasValidBizName) {
          // DO NOT forward to payment without business details
          setNeedsBusinessDetails(true);
          return;
        }

        setCheckingMembership(true);
        const mem = await checkMembership(user, token);
        setCheckingMembership(false);

        if (mem?.hasMembership) {
          setMembershipInfo(mem);
        }
      },
      onError: (err) => {
        setAuthLoading(false);
        if (authMode === 'signin' && (err.includes('not found') || err.includes('sign up first'))) {
          setAuthTab('register');
          setAuthError('No account found for this Google email. Please create your account below.');
        } else {
          setAuthError(err || 'Google sign-in could not be completed.');
        }
      },
    });
  };

  // Handle Saving Business Details (for Google or missing profiles)
  const handleSaveBusinessDetails = async (e) => {
    e.preventDefault();
    const cleanBiz = businessName.trim();
    if (!cleanBiz) {
      setAuthError('Please enter your business or shop name.');
      return;
    }
    setAuthLoading(true);
    setAuthError('');

    const res = await updateAccountProfile({
      businessName: cleanBiz,
      legalName: fullName.trim() || undefined,
    });
    setAuthLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      setNeedsBusinessDetails(false);

      setCheckingMembership(true);
      const mem = await checkMembership(res.user);
      setCheckingMembership(false);
      if (mem?.hasMembership) {
        setMembershipInfo(mem);
      }
    } else {
      setAuthError(res.error || 'Failed to update business details. Please try again.');
    }
  };

  // Handle Email Auth (Sign In or Sign Up)
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
      const cleanName = fullName.trim();
      const cleanBiz = businessName.trim();

      if (!cleanName) {
        setAuthError('Please enter your full name.');
        return;
      }

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

      // If registration requires email OTP verification
      if (regRes.requiresVerification) {
        setPendingVerificationEmail(regRes.email || cleanEmail);
        setVerificationCode('');
        setResendCooldownSeconds(60);
        setAuthLoading(false);
        setAuthError('');
        return;
      }

      // If immediately verified, sign in
      const logRes = await loginUser(cleanEmail, password);
      setAuthLoading(false);
      if (logRes.success && logRes.user) {
        setCurrentUser(logRes.user);
        setCheckingMembership(true);
        const mem = await checkMembership(logRes.user, logRes.token);
        setCheckingMembership(false);
        if (mem?.hasMembership) {
          setMembershipInfo(mem);
        }
      } else {
        setAuthError(logRes.error || 'Account created. Please sign in.');
        setAuthTab('login');
      }
    } else {
      // Sign In Flow
      setAuthLoading(true);
      const logRes = await loginUser(cleanEmail, password);
      setAuthLoading(false);

      if (!logRes.success) {
        if (logRes.requiresVerification) {
          setPendingVerificationEmail(cleanEmail);
          setVerificationCode('');
          setResendCooldownSeconds(60);
          setAuthError('');
          return;
        }
        setAuthError(logRes.error || 'Invalid email or password.');
        return;
      }

      if (logRes.user) {
        setCurrentUser(logRes.user);
        // If business name is missing, prompt for it
        if (!logRes.user.businessName || logRes.user.businessName.trim() === '') {
          setNeedsBusinessDetails(true);
          return;
        }

        setCheckingMembership(true);
        const mem = await checkMembership(logRes.user, logRes.token);
        setCheckingMembership(false);
        if (mem?.hasMembership) {
          setMembershipInfo(mem);
        }
      }
    }
  };

  const handleSwitchAccount = () => {
    clearStoredAuth();
    setCurrentUser(null);
    setMembershipInfo(null);
    setAllowReorder(false);
    setNeedsBusinessDetails(false);
    setAuthTab('login');
    setAuthError('');
    setPassword('');
    setPayError('');
  };

  const handleStartPayment = () => {
    if (!currentUser) {
      setAuthTab('login');
      return;
    }
    executePayment(currentUser);
  };

  // 1. Success Screen (Payment Confirmed)
  if (successData) {
    return (
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4 sm:p-6">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg text-center">
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

  // 2. Main Full Width Layout (Left Feature Hero, Right Dynamic State Workspace)
  return (
    <div className="w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-white lg:overflow-hidden select-none">
      {/* Left Section: Feature Showcase */}
      <div className="w-full lg:w-[60%] bg-slate-950 lg:h-full min-h-[350px] flex items-center justify-center overflow-hidden relative group shrink-0">
        <img
          src={activeFeature.imageUrl}
          alt={activeFeature.imageAlt}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </div>

      {/* Right Section: Multi-Step Funnel */}
      <div className="w-full lg:w-[40%] bg-white p-6 sm:p-8 lg:p-12 lg:h-full lg:overflow-y-auto flex flex-col select-text">
        <div className="w-full max-w-md mx-auto my-auto py-6 sm:py-8">

          {/* STEP 1: Not Authenticated -> Show Sign In / Sign Up Form ONLY */}
          {!currentUser ? (
            pendingVerificationEmail ? (
              /* OTP Verification Sub-step */
              <div className="rounded-2xl border border-purple-200 bg-purple-50/30 p-5 shadow-xs">
                <div className="text-center mb-4">
                  <div className="size-12 rounded-full bg-purple-100 text-[#7C3AED] flex items-center justify-center mx-auto mb-2">
                    <MailIcon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Verify Your Email</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    We sent a 4-digit verification code to <strong className="text-slate-900 font-mono">{pendingVerificationEmail}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyCode} className="space-y-3.5">
                  <div>
                    <label htmlFor="checkout-otp" className="block text-xs font-medium text-slate-700 mb-1 text-center">
                      Enter 4-Digit Code
                    </label>
                    <input
                      id="checkout-otp"
                      type="text"
                      maxLength={4}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="0000"
                      className="w-full h-11 text-center font-mono text-xl tracking-widest rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                      autoFocus
                    />
                  </div>

                  {authError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-snug">
                      {authError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingCode || verificationCode.trim().length !== 4}
                    className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isVerifyingCode ? 'Verifying...' : 'Verify & Continue'}
                  </button>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setPendingVerificationEmail('');
                        setAuthError('');
                      }}
                      className="text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      ← Back to Sign In
                    </button>
                    <button
                      type="button"
                      disabled={resendCooldownSeconds > 0}
                      onClick={handleResendCode}
                      className="text-[#7C3AED] hover:text-[#6D28D9] font-medium disabled:text-slate-400 cursor-pointer"
                    >
                      {resendCooldownSeconds > 0
                        ? `Resend in ${resendCooldownSeconds}s`
                        : 'Resend code'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Clean Authentication Screen (No billing plans, no coupons, no payment buttons) */
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {authTab === 'login' ? 'Sign In to Continue' : 'Create Your Account'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {authTab === 'login'
                      ? 'Sign in to your Invio account to continue to checkout and license activation.'
                      : 'Set up your business account to proceed with your Invio Plus license.'}
                  </p>
                </div>

                {/* Tab Switcher: Sign In (Default) vs Sign Up */}
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

                {/* Form */}
                <form onSubmit={handleEmailAuthSubmit} className="space-y-3.5">
                  {authTab === 'register' && (
                    <>
                      <div>
                        <label htmlFor="checkout-fullName" className="block text-xs font-medium text-slate-700 mb-1">
                          Full Name
                        </label>
                        <input
                          id="checkout-fullName"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                        />
                      </div>

                      <div>
                        <label htmlFor="checkout-businessName" className="block text-xs font-medium text-slate-700 mb-1">
                          Business / Shop Name
                        </label>
                        <input
                          id="checkout-businessName"
                          type="text"
                          required
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Business or shop name"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="checkout-email"
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
                    <label htmlFor="checkout-password" className="block text-xs font-medium text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="checkout-password"
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
                      <span>{authTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-4 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-medium text-slate-400">
                    Or continue with
                  </span>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <GoogleIcon className="size-4" />
                  <span>Continue with Google</span>
                </button>
              </div>
            )
          ) : needsBusinessDetails ? (
            /* Google Sign-in: Missing Business Details Form */
            <div className="rounded-2xl border border-slate-200 p-5 shadow-xs bg-white">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">Complete Your Business Profile</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Signed in as <strong className="text-slate-800">{currentUser.email}</strong>. Please provide your business details to proceed to checkout.
                </p>
              </div>

              <form onSubmit={handleSaveBusinessDetails} className="space-y-3.5">
                <div>
                  <label htmlFor="google-biz-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Shop Name *
                  </label>
                  <input
                    id="google-biz-name"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Gupta Retail Stores"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="google-full-name" className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name (Optional)
                  </label>
                  <input
                    id="google-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your contact name"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 text-xs sm:text-sm placeholder:text-slate-400 outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 transition-all shadow-2xs"
                  />
                </div>

                {authError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-snug">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading || !businessName.trim()}
                  className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] disabled:bg-purple-300 text-white rounded-full font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {authLoading ? 'Saving...' : 'Save & Continue to Checkout'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleSwitchAccount}
                    className="text-xs text-slate-400 hover:text-slate-700 underline cursor-pointer"
                  >
                    Cancel and use another account
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* STEP 2: Authenticated -> Check Active Membership OR Proceed to Checkout */
            <div>
              {/* Account Pill Header */}
              <div className="rounded-2xl border border-slate-200/90 bg-linear-to-b from-slate-50/70 to-white p-4 shadow-2xs mb-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-9 rounded-full bg-purple-100 text-[#7C3AED] font-bold text-sm flex items-center justify-center shrink-0 ring-2 ring-white">
                      {(currentUser.businessName || currentUser.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {currentUser.businessName || 'Business Account'}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSwitchAccount}
                    className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    Switch
                  </button>
                </div>
              </div>

              {checkingMembership ? (
                /* Checking Membership Loader */
                <div className="py-8 text-center space-y-3">
                  <div className="size-6 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-medium text-slate-500">
                    Checking account license status...
                  </p>
                </div>
              ) : membershipInfo?.hasMembership && !allowReorder ? (
                /* Already has Active Membership State */
                <div className="space-y-5 text-center">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                        <span className="size-1.5 rounded-full bg-white animate-pulse" />
                        Invio {membershipInfo.plan} Active
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      You already have an active license for <strong>Invio {membershipInfo.plan}</strong> on this account.
                      {membershipInfo.expiresAt && (
                        <span> Valid until <strong>{new Date(membershipInfo.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</strong>.</span>
                      )}
                    </p>
                    <p className="text-[11px] text-emerald-700">
                      You do not need to purchase this license again to use Invio {membershipInfo.plan}.
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <Link
                      to="/download"
                      className="w-full py-3 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 text-center cursor-pointer"
                    >
                      Download Desktop App
                    </Link>

                    <button
                      type="button"
                      onClick={handleSwitchAccount}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
                    >
                      Sign In with Another Account
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setAllowReorder(true)}
                      className="text-[11px] text-slate-400 hover:text-slate-700 underline cursor-pointer"
                    >
                      Need to renew or extend your license duration? Proceed to checkout
                    </button>
                  </div>
                </div>
              ) : (
                /* Authenticated Checkout & Pay Screen */
                <div>
                  <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      Invio Plus Checkout
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Choose your billing plan and complete checkout to activate Invio Plus immediately.
                    </p>
                  </div>

                  {/* Billing Cycle Picker */}
                  <div className="mb-5">
                    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('yearly')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          billingCycle === 'yearly'
                            ? 'bg-white text-slate-900 shadow-2xs ring-1 ring-purple-100 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Yearly</span>
                          <span className="bg-purple-100 text-[#7C3AED] text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                            Save 44%
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">₹{prices.yearly} / year</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                          billingCycle === 'monthly'
                            ? 'bg-white text-slate-900 shadow-2xs ring-1 ring-purple-100 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>Monthly</span>
                        <span className="text-[11px] text-slate-500">₹{prices.monthly} / month</span>
                      </button>
                    </div>
                  </div>

                  {/* Coupon & Discount Code Toggle Section */}
                  {couponApplied ? (
                    <div className="mb-4">
                      <CouponTicket
                        mode="verified"
                        variant="gold"
                        code={couponApplied.code}
                        discountText={
                          couponApplied.discountType === 'percentage'
                            ? `${couponApplied.discountValue}% OFF`
                            : `₹${couponApplied.discountValue} OFF`
                        }
                        validity="Valid for Invio Plus"
                        onRemove={handleRemoveCoupon}
                      />
                    </div>
                  ) : !showCouponInput ? (
                    <div className="flex justify-end mt-2 mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCouponInput(true);
                          setCouponError('');
                        }}
                        className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] cursor-pointer inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Have a coupon or discount code?</span>
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <CouponTicket
                        mode="input"
                        variant="gold"
                        inputCode={couponInput}
                        onInputChange={(val) => {
                          setCouponInput(val);
                          setCouponError('');
                        }}
                        onApply={(codeToApply) => handleApplyCoupon(codeToApply)}
                        onCancel={() => {
                          setShowCouponInput(false);
                          setCouponError('');
                        }}
                        loading={validatingCoupon}
                        error={couponError}
                      />
                    </div>
                  )}

                  {payError && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {payError}
                    </div>
                  )}

                  {/* Payment Button */}
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
                      <span className="flex items-center gap-1.5">
                        <span>Pay</span>
                        {couponApplied && (
                          <span className="line-through text-purple-200 text-xs font-normal">
                            ₹{basePrice}
                          </span>
                        )}
                        <span>₹{currentPrice}</span>
                        {couponApplied && (
                          <span className="text-[11px] font-normal text-emerald-200 ml-1">
                            (Saved ₹{couponApplied.discountAmount})
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
