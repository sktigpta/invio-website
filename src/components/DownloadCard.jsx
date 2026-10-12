import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { triggerDirectDownload, detectDeviceOS, PLATFORM_DOWNLOADS } from '../utils/osDetector';
import { DownloadIcon, CloseIcon, CheckIcon } from './Icons';

export function DownloadCard({
  initialPlatform = null,
  autoTrigger = true,
  isModal = false,
  onClose = null,
  className = '',
}) {
  const detectedOS = detectDeviceOS();
  const isMobile = Boolean(detectedOS?.isMobileFallback);

  const [platform, setPlatform] = useState(() => {
    if (initialPlatform && !initialPlatform.isMobileFallback) return initialPlatform;
    return detectedOS.isMobileFallback ? PLATFORM_DOWNLOADS.windows : detectedOS;
  });
  const [phase, setPhase] = useState(isMobile ? 'thankyou' : 'downloading'); // 'downloading' | 'thankyou'
  const downloadTimer = useRef(null);
  const hasAutoTriggeredRef = useRef(false);

  // Trigger download on mount only for desktop; mobile visitors must explicitly choose a platform
  useEffect(() => {
    if (autoTrigger && !isMobile && platform && !platform.isMobileFallback && !hasAutoTriggeredRef.current) {
      hasAutoTriggeredRef.current = true;
      triggerDirectDownload(platform);
      downloadTimer.current = setTimeout(() => {
        setPhase('thankyou');
      }, 2500);
    }
    return () => {
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
    };
  }, [autoTrigger, platform, isMobile]);

  const handleRetryDownload = () => {
    setPhase('downloading');
    triggerDirectDownload(platform);
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
  };

  const handleSelectPlatform = (selected) => {
    // Tab click only updates the displayed platform — does not trigger a download.
    // Download only fires on explicit retry or the initial autoTrigger.
    setPlatform(selected);
    setPhase('downloading');
  };

  return (
    <div
      className={`bg-white rounded-squircle max-w-md w-full p-6 sm:p-7 border border-slate-200/90 shadow-2xl relative text-slate-900 ${className}`}
    >
      {/* Close Button if modal */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <CloseIcon className="size-4" />
        </button>
      )}

      {/* Platform Switcher Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100/90 rounded-full mb-2 max-w-sm sm:max-w-md mx-auto">
        {Object.values(PLATFORM_DOWNLOADS).map((item) => {
          const isSelected = platform?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectPlatform(item)}
              className={`flex-1 py-1 px-3 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.shortName || item.name}
            </button>
          );
        })}
      </div>

      {/* PHASE 1: Downloading... State */}
      {phase === 'downloading' && (
        <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
          <div className="size-16 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto mb-5 shadow-sm animate-pulse">
            <DownloadIcon className="size-8" />
          </div>
          <h3 id="download-modal-title" className="text-2xl font-bold text-slate-900 tracking-tight">
            Downloading...
          </h3>
          <p className="text-xs text-slate-500 mt-2 font-normal">
            Your installer is starting for {platform?.name || 'Desktop'}
          </p>
          <p className="text-[11px] text-slate-400 mt-3 max-w-[280px]">
            If nothing happens, check for a blocked popup and{' '}
            <button
              type="button"
              onClick={handleRetryDownload}
              className="underline hover:text-slate-700 cursor-pointer text-[#7C3AED] font-medium"
            >
              click here to retry
            </button>
            .
          </p>
        </div>
      )}

      {/* PHASE 2: Thank You Note */}
      {phase === 'thankyou' && (
        <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
          <div className="size-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-5">
            <CheckIcon className="size-8" />
          </div>

          <h3 id="download-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
            Thank you for downloading!
          </h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
            Your download for <span className="font-semibold text-slate-700">{platform?.name || 'Desktop'}</span> should have started. If it didn&apos;t,{' '}
            <button
              type="button"
              onClick={handleRetryDownload}
              className="underline hover:text-slate-700 cursor-pointer text-[#7C3AED] font-medium"
            >
              click here to start it again
            </button>
            . Enjoy using Invio!
          </p>

          <div className="mt-6 w-full">
            {onClose ? (
              <button
                type="button"
                className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs cursor-pointer"
                onClick={onClose}
              >
                Back to Invio Website
              </button>
            ) : (
              <Link
                to="/"
                className="block w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs cursor-pointer"
              >
                Back to Invio Website
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadCard;
