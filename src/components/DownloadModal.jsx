import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { DownloadIcon, CloseIcon } from './Icons';
import { triggerDirectDownload } from '../utils/osDetector';

export function DownloadModal({ platform, onClose }) {
  const [phase, setPhase] = useState('downloading'); // 'downloading' | 'thankyou'
  const panelRef = useRef(null);
  const downloadTimer = useRef(null);

  // Start the download as soon as the modal opens, then show thank-you.
  useEffect(() => {
    triggerDirectDownload(platform);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
    return () => {
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
    };
  }, [platform]);

  // Clean up timers on unmount
  useEffect(() => () => {
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
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

  const handleRetryDownload = () => {
    setPhase('downloading');
    triggerDirectDownload(platform);
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
  };

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
        {/* PHASE 1: Downloading... State                                              */}
        {/* ========================================================================= */}
        {phase === 'downloading' && (
          <div className="min-h-[380px] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
            <div className="size-16 rounded-2xl bg-purple-50 text-[#8646F4] flex items-center justify-center mx-auto mb-5 shadow-sm animate-pulse">
              <DownloadIcon className="size-8" />
            </div>
            <h3 id="download-modal-title" className="text-2xl font-bold text-slate-900 tracking-tight">
              Downloading...
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-normal">
              Your installer is starting for {platform.name}
            </p>
            <p className="text-[11px] text-slate-400 mt-3 max-w-[280px]">
              If nothing happens, check for a blocked popup and{' '}
              <button type="button" onClick={handleRetryDownload} className="underline hover:text-slate-600 cursor-pointer">
                click here to retry
              </button>
              .
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PHASE 2: Thank You Note                                                    */}
        {/* ========================================================================= */}
        {phase === 'thankyou' && (
          <div className="animate-fade-in text-center py-4">
            <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-5">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>

            <h3 id="download-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              Thank you for downloading!
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
              Your download for <span className="font-semibold text-slate-700">{platform.name}</span> should have started. If it didn&apos;t,{' '}
              <button type="button" onClick={handleRetryDownload} className="underline hover:text-slate-700 cursor-pointer">
                click here to start it again
              </button>
              . Enjoy using Invio!
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
