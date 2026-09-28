import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { DownloadIcon, CloseIcon } from './Icons';
import { triggerDirectDownload } from '../utils/osDetector';
import { createPaymentOrder, checkPaymentStatus } from '../services/paymentService';

const PRESET_AMOUNTS = [21, 51, 101];

// Official Right-side up UPI Vector Logo
function UpiIcon({ className = 'h-3.5 w-auto' }) {
  return (
    <svg className={className} viewBox="0 0 432 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="UPI">
      <g transform="matrix(1 0 0 -1 0 150)">
        <path d="M376.6 148.2l24.4-48.6-51.3-48.5z" fill="#27803B"/>
        <path d="M359.5 148.2l24.4-48.6-51.3-48.5z" fill="#E9661C"/>
        <path d="M156.1 57.5c-1-3.8-4.5-6.5-8.5-6.5H48.1c-2.7 0-4.7.9-6 2.8-1.3 1.8-1.6 4.1-.9 6.9l24.3 87.4h19.3l-21.7-78.1h77.2l21.7 78.1h19.3z" fill="#475569"/>
        <path d="M306.5 145.3c-1.3 1.8-3.4 2.8-6.2 2.8H194.3l-5.3-19h19.3v0h77.2l-5.6-20.3H202.7v0h-19.3l-16-57.8h19.3l10.7 38.8h86.7c2.7 0 5.3.9 7.7 2.8 2.4 1.8 4 4.1 4.7 6.8l6.7 41.7c.8 2.8.5 5.1-.8 7z" fill="#475569"/>
        <path d="M316.5 51.5h-19.3l26.8 96.9h19.3z" fill="#475569"/>
      </g>
    </svg>
  );
}

export function DownloadModal({ platform, onClose }) {
  const [phase, setPhase] = useState('support'); // 'support' | 'downloading' | 'thankyou' | 'paid_success'
  const [amount, setAmount] = useState(51);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [order, setOrder] = useState(null);
  const [loadingQr, setLoadingQr] = useState(true);
  const [qrError, setQrError] = useState('');

  const panelRef = useRef(null);
  const debounceTimer = useRef(null);
  const downloadTimer = useRef(null);
  const pollTimer = useRef(null);

  // Load / update FamGateway order & QR code when amount changes
  useEffect(() => {
    let isCancelled = false;
    const effectiveAmount = isCustom ? Number(customAmount) || 0 : amount;

    if (effectiveAmount < 21) {
      const t = setTimeout(() => {
        if (!isCancelled) {
          setOrder(null);
          setQrError('');
          setLoadingQr(false);
        }
      }, 0);
      return () => clearTimeout(t);
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      if (isCancelled) return;
      setLoadingQr(true);
      setQrError('');
      try {
        const res = await createPaymentOrder(effectiveAmount);
        if (!isCancelled) {
          if (res.success) {
            let sanitizedSvg = res.qrSvg
              ? res.qrSvg.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, '')
              : '';
            setOrder({ ...res, qrSvg: sanitizedSvg });
          } else {
            setOrder(null);
            setQrError(res.error || 'Could not create a payment QR. You can still download Invio for free.');
          }
        }
      } catch {
        if (!isCancelled) {
          setOrder(null);
          setQrError('Could not create a payment QR. You can still download Invio for free.');
        }
      } finally {
        if (!isCancelled) setLoadingQr(false);
      }
    }, isCustom ? 250 : 0);

    return () => {
      isCancelled = true;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [amount, customAmount, isCustom]);

  // Live status polling for FamGateway order clearance (Webhook & API verification)
  useEffect(() => {
    if (!order?.orderId || phase !== 'support') {
      if (pollTimer.current) clearInterval(pollTimer.current);
      return;
    }

    pollTimer.current = setInterval(async () => {
      const statusRes = await checkPaymentStatus(order.orderId);
      if (statusRes.status === 'success') {
        if (pollTimer.current) clearInterval(pollTimer.current);
        setPhase('paid_success');
        triggerDirectDownload(platform);
      }
    }, 3500);

    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, [order?.orderId, phase, platform]);

  // Clean up timers on unmount
  useEffect(() => () => {
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (pollTimer.current) clearInterval(pollTimer.current);
  }, []);

  // Trap focus and handle ESC key
  useEffect(() => {
    const panel = panelRef.current;
    const prevActive = document.activeElement;
    const focusables = () =>
      [...(panel?.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])') ?? [])]
        .filter((el) => !el.disabled);

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

  const handleTriggerDownload = () => {
    setPhase('downloading');
    triggerDirectDownload(platform);

    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
  };

  const isCustomTooLow = isCustom && customAmount !== '' && Number(customAmount) < 21;
  const currentPayAmount = isCustom ? Number(customAmount) || 21 : amount;

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
        {/* PHASE 1: Support Developer — FamGateway Instant Checkout & QR             */}
        {/* ========================================================================= */}
        {phase === 'support' && (
          <div className="animate-fade-in text-left">
            {/* Top Left: Powered by FamGateway */}
            <div className="flex items-center justify-start mb-2">
              <div className="flex items-center gap-1 text-[10.5px] text-slate-400 font-normal">
                <span>Powered by</span>
                <a
                  href="https://famgateway.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                  title="FamGateway UPI Gateway"
                >
                  <img
                    src="https://famgateway.in/assets/img/logo-navbar-bright.png?v=9.0"
                    alt="FamGateway"
                    className="h-3 w-auto object-contain brightness-0"
                    loading="lazy"
                  />
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

            {/* QR Code Container */}
            <div className="flex justify-center my-3.5">
              <div className="relative size-[175px] flex items-center justify-center">
                {loadingQr ? (
                  <div className="flex flex-col items-center justify-center text-slate-400 text-xs" role="status" aria-live="polite">
                    <span className="size-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></span>
                    <span>Generating Gateway QR...</span>
                  </div>
                ) : order?.qrSvg ? (
                  <>
                    <div
                      className="size-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: order.qrSvg }}
                    />
                    {/* Small Invio Logo Centered in QR */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="size-8 rounded-lg bg-white border border-slate-200 shadow-md flex items-center justify-center p-1">
                        <img
                          src="./appLogo.png"
                          alt="Invio"
                          className="size-5 object-contain"
                          width="20"
                          height="20"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="px-4 text-center text-xs text-amber-700" role="status">
                    {qrError || 'Payment QR is unavailable. You can still download Invio for free.'}
                  </p>
                )}
              </div>
            </div>

            {/* Scan with UPI App (UPI Only) */}
            <div className="flex flex-col items-center gap-2 justify-center text-center">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span>Scan with</span>
                <UpiIcon className="h-3.5 w-auto" />
              </div>

              {/* Direct UPI Intent Link: Pay ₹X with any UPI App → (Clean text link, no icon before) */}
              {order?.upiIntent && (
                <a
                  href={order.upiIntent}
                  className="text-xs font-semibold text-[#8646F4] hover:text-[#7030db] hover:underline inline-flex items-center gap-1 transition-colors mt-0.5"
                >
                  <span>Pay ₹{currentPayAmount} with any UPI App</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
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
        {/* PHASE: Instant Payment Clearance Success (Auto-detected via FamGateway)   */}
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
