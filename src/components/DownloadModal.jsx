import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { DownloadIcon, CloseIcon } from './Icons';
import { triggerDirectDownload } from '../utils/osDetector';
import { createPaymentOrder, verifyPayment, loadRazorpayCheckout, openRazorpayCheckout } from '../services/paymentService';

const PRESET_AMOUNTS = [21, 51, 101];

export function DownloadModal({ platform, onClose }) {
  const [phase, setPhase] = useState('support'); // 'support' | 'downloading' | 'thankyou' | 'paid_success'
  const [amount, setAmount] = useState(51);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [order, setOrder] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(true);
  const [orderError, setOrderError] = useState('');
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  const panelRef = useRef(null);
  const debounceTimer = useRef(null);
  const downloadTimer = useRef(null);

  // Create a Razorpay order when the amount changes (debounced for custom input)
  useEffect(() => {
    let isCancelled = false;
    const effectiveAmount = isCustom ? Number(customAmount) || 0 : amount;

    if (effectiveAmount < 21) {
      const t = setTimeout(() => {
        if (!isCancelled) {
          setOrder(null);
          setOrderError('');
          setCreatingOrder(false);
        }
      }, 0);
      return () => clearTimeout(t);
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      if (isCancelled) return;
      setCreatingOrder(true);
      setOrderError('');
      setPayError('');
      try {
        const res = await createPaymentOrder(effectiveAmount);
        if (!isCancelled) {
          if (res.success) {
            setOrder(res);
          } else {
            setOrder(null);
            setOrderError(res.error || 'Online payments are unavailable. You can still download Invio for free.');
          }
        }
      } catch {
        if (!isCancelled) {
          setOrder(null);
          setOrderError('Online payments are unavailable. You can still download Invio for free.');
        }
      } finally {
        if (!isCancelled) setCreatingOrder(false);
      }
    }, isCustom ? 350 : 0);

    return () => {
      isCancelled = true;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [amount, customAmount, isCustom]);

  // Clean up timers on unmount
  useEffect(() => () => {
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
  }, []);

  // Trap focus and handle ESC key
  useEffect(() => {
    const panel = panelRef.current;
    const prevActive = document.activeElement;
    const focusables = () =>
      [...(panel?.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])') ?? [])]
        .filter((el) => !el.disabled);

    focusables()[0]?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    if (document.body.style.overflow !== 'hidden') document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      if (prevActive instanceof HTMLElement) prevActive.focus();
    };
  }, [onClose]);

  if (!platform) return null;

  const handleSelectPreset = (preset) => {
    setIsCustom(false);
    setAmount(preset);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    setIsCustom(true);
  };

  const handlePay = async () => {
    if (!order || paying) return;
    setPaying(true);
    setPayError('');
    const scriptOk = await loadRazorpayCheckout();
    if (!scriptOk) {
      setPaying(false);
      setPayError('Payment window could not be loaded. Check your connection and try again.');
      return;
    }
    openRazorpayCheckout({
      keyId: order.keyId,
      orderId: order.orderId,
      amountPaise: order.amountPaise,
      currency: order.currency,
      amountRupees: order.amount,
      onSuccess: async ({ orderId, paymentId, signature }) => {
        const result = await verifyPayment({ orderId, paymentId, signature });
        setPaying(false);
        if (result.success) {
          setPhase('paid_success');
          triggerDirectDownload(platform);
        } else {
          setPayError('Payment could not be verified. If money was deducted, it will be refunded automatically.');
        }
      },
      onDismiss: () => setPaying(false),
      onError: (err) => {
        setPaying(false);
        setPayError(err?.message || 'Payment failed. No money was deducted.');
      },
    });
  };

  const handleTriggerDownload = () => {
    setPhase('downloading');
    triggerDirectDownload(platform);

    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
  };

  const isCustomTooLow = isCustom && customAmount !== '' && Number(customAmount) < 21;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 border border-slate-200 shadow-2xl relative text-[#0f172a]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <CloseIcon className="size-4" />
        </button>

        {/* ========================================================================= */}
        {/* PHASE 1: Support Developer — Razorpay Secure Checkout                  */}
        {/* ========================================================================= */}
        {phase === 'support' && (
          <div className="animate-fade-in text-left">
            {/* Top Left: Secured by Razorpay */}
            <div className="flex items-center justify-start mb-2">
              <div className="flex items-center gap-1 text-[10.5px] text-slate-400 font-normal">
                <span>Secured by</span>
                <a
                  href="https://razorpay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-500 hover:text-[#8646F4] transition-colors"
                  title="Razorpay — UPI, cards, netbanking & wallets"
                >
                  Razorpay
                </a>
              </div>
            </div>

            {/* Title & Subtitle with single top heart */}
            <div className="flex items-center justify-between pr-8">
              <h3 id="download-modal-title" className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Support Invio Development</span>
                <span className="text-rose-500 text-base" aria-hidden="true">❤️</span>
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-[340px]">
              Invio is 100% free &amp; open source. Help support ongoing maintenance &amp; cross-platform updates.
            </p>

            {/* Amount Selection */}
            <div className="mt-5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                CHOOSE AMOUNT (MIN ₹21)
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {PRESET_AMOUNTS.map((preset) => {
                  const isSelected = !isCustom && amount === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                        isSelected
                          ? 'text-[#8646F4] border-[#8646F4]'
                          : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      ₹{preset}
                    </button>
                  );
                })}
                {/* Custom amount inline */}
                <div className="relative flex items-center ml-0.5">
                  <span className="absolute left-2 text-xs sm:text-sm font-semibold text-slate-400 pointer-events-none">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Other"
                    value={customAmount}
                    onChange={handleCustomChange}
                    className={`w-[75px] sm:w-[85px] pl-5 sm:pl-6 pr-2 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold border-b-2 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      isCustom
                        ? 'border-[#8646F4] text-[#8646F4]'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                  />
                </div>
              </div>
              {isCustomTooLow && (
                <p className="text-[11px] text-amber-600 mt-1.5 font-medium">
                  Please enter minimum ₹21
                </p>
              )}
            </div>

            {/* Payment action: Razorpay Checkout (UPI, cards, netbanking, wallets) */}
            <div className="flex justify-center my-3.5">
              <div className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 text-center">
                {creatingOrder ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 text-xs py-2" role="status" aria-live="polite">
                    <span className="size-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></span>
                    <span>Preparing secure payment...</span>
                  </div>
                ) : order ? (
                  <>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      CONTRIBUTION AMOUNT
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-0.5">₹{order.amount}</p>
                    <button
                      type="button"
                      onClick={handlePay}
                      disabled={paying}
                      className="mt-3 w-full rounded-lg bg-[#8646F4] hover:bg-[#7030db] disabled:opacity-60 disabled:cursor-wait px-4 py-2.5 text-sm font-semibold text-white transition-colors cursor-pointer"
                    >
                      {paying ? 'Waiting for payment...' : `Pay ₹${order.amount} securely`}
                    </button>
                    <p className="mt-2 text-[11px] text-slate-400">
                      UPI, cards, netbanking &amp; wallets via Razorpay
                    </p>
                  </>
                ) : (
                  <p className="px-2 text-center text-xs text-amber-700" role="status">
                    {orderError || 'Online payments are unavailable. You can still download Invio for free.'}
                  </p>
                )}
                {payError ? (
                  <p className="mt-2 text-xs font-medium text-rose-600" role="alert">{payError}</p>
                ) : null}
              </div>
            </div>

            {/* Bottom Actions: Discreet Skip link (no bg, lighter) */}
            <div className="mt-4 pt-1 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleTriggerDownload}
                className="text-[11px] text-slate-400/80 hover:text-slate-600 transition-colors py-1 cursor-pointer font-normal hover:underline"
              >
                Skip &amp; Download Free ({platform.shortName || platform.name})
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE: Payment Success (verified server-side via Razorpay)           */}
        {/* ========================================================================= */}
        {phase === 'paid_success' && (
          <div className="animate-fade-in text-center py-4">
            <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="size-9" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Payment Received! 🎉
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xs mx-auto">
              Thank you so much for supporting Invio. Your download for <span className="font-semibold text-slate-800">{platform.name}</span> has initiated automatically.
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                size="md"
                className="w-full font-semibold"
                onClick={onClose}
              >
                Back to Invio Website
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: Downloading... State                                              */}
        {/* ========================================================================= */}
        {phase === 'downloading' && (
          <div className="min-h-[380px] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            <div className="size-16 rounded-2xl bg-purple-50 text-[#8646F4] flex items-center justify-center mx-auto mb-5 shadow-sm animate-pulse">
              <DownloadIcon className="size-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Downloading...
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              Your installer is starting for {platform.name}
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 3: Thank You Note (Free Download)                                    */}
        {/* ========================================================================= */}
        {phase === 'thankyou' && (
          <div className="animate-fade-in text-center py-4">
            <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-5">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Thank you for downloading!
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
              Your download for <span className="font-semibold text-slate-700">{platform.name}</span> has started. Enjoy using Invio!
            </p>

            <div className="mt-5">
              <Button
                variant="primary"
                size="md"
                className="w-full font-semibold"
                onClick={onClose}
              >
                Back to Invio Website
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadModal;
