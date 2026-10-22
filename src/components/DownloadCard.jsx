import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { triggerDirectDownload, detectDeviceOS, PLATFORM_DOWNLOADS, MICROSOFT_STORE_URL } from '../utils/osDetector';
import { DownloadIcon, CloseIcon, CheckIcon, MicrosoftStoreIcon, ShieldCheckIcon, ExternalLinkIcon } from './Icons';

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

  const isWindows = platform?.id === 'windows';

  // Windows starts in 'windows_options' so the user can choose the safe Microsoft Store method
  // to bypass Windows Defender SmartScreen & Firewall warnings. Non-Windows desktop starts in 'downloading'.
  const [phase, setPhase] = useState(() => {
    if (isMobile) return 'thankyou';
    if (initialPlatform?.id === 'windows' || (!initialPlatform && detectedOS?.id === 'windows')) {
      return 'windows_options';
    }
    return 'downloading';
  });

  const [downloadMethod, setDownloadMethod] = useState(null); // 'store' | 'exe' | null
  const downloadTimer = useRef(null);
  const hasAutoTriggeredRef = useRef(false);

  // Trigger download on mount only for non-Windows desktop platforms;
  // Windows shows Store vs Standalone options so users can bypass firewall & risk alerts.
  useEffect(() => {
    if (autoTrigger && !isMobile && platform && !platform.isMobileFallback && !hasAutoTriggeredRef.current) {
      if (platform.id !== 'windows') {
        hasAutoTriggeredRef.current = true;
        triggerDirectDownload(platform);
        downloadTimer.current = setTimeout(() => {
          setPhase('thankyou');
        }, 2500);
      }
    }
    return () => {
      if (downloadTimer.current) clearTimeout(downloadTimer.current);
    };
  }, [autoTrigger, platform, isMobile]);

  const handleRetryDownload = () => {
    setPhase('downloading');
    setDownloadMethod('exe');
    triggerDirectDownload(platform);
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
  };

  const handleSelectPlatform = (selected) => {
    setPlatform(selected);
    if (downloadTimer.current) clearTimeout(downloadTimer.current);

    if (selected.id === 'windows') {
      setPhase('windows_options');
      setDownloadMethod(null);
    } else {
      setPhase('downloading');
      setDownloadMethod('direct');
    }
  };

  const handleStoreClick = () => {
    setDownloadMethod('store');
    setPhase('thankyou');
    window.open(MICROSOFT_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleDirectExeDownload = () => {
    setDownloadMethod('exe');
    setPhase('downloading');
    triggerDirectDownload(platform);
    if (downloadTimer.current) clearTimeout(downloadTimer.current);
    downloadTimer.current = setTimeout(() => {
      setPhase('thankyou');
    }, 2500);
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
      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100/90 rounded-full mb-3 max-w-sm sm:max-w-md mx-auto">
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

      {/* WINDOWS CHOICE VIEW */}
      {isWindows && phase === 'windows_options' && (
        <div className="flex flex-col text-center pt-1 animate-fadeIn">
          {/* Primary Recommended: Microsoft Store */}
          <div className="bg-gradient-to-b from-purple-50/80 to-white rounded-2xl border border-purple-200/90 p-5 shadow-xs mb-3 text-left relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7C3AED] text-white uppercase tracking-wider">
                <ShieldCheckIcon className="size-3" />
                Recommended &bull; Verified
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Windows 10 / 11</span>
            </div>

            <h3 id="download-modal-title" className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <MicrosoftStoreIcon className="size-4 shrink-0" />
              <span>Get from Microsoft Store</span>
            </h3>

            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Officially verified by Microsoft. Installs in 1-click and <strong>bypasses Windows Defender SmartScreen &amp; firewall risk alerts</strong> with automatic background updates.
            </p>

            <button
              type="button"
              onClick={handleStoreClick}
              className="mt-3.5 w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer group"
            >
              <MicrosoftStoreIcon className="size-4 shrink-0" />
              <span>Get from Microsoft Store (Free)</span>
              <ExternalLinkIcon className="size-3 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1.5 text-slate-300 text-xs">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">or direct installer</span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Secondary Alternative: Standalone Offline Setup */}
          <div className="rounded-xl border border-slate-200/80 p-3.5 text-left hover:border-slate-300 transition-colors">
            <h4 className="text-xs font-bold text-slate-800">
              Standalone Offline Setup (.exe)
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
              Direct installer ({platform.sizeEstimate || '99 MB'}) for offline computers without Microsoft Store.
            </p>

            <button
              type="button"
              onClick={handleDirectExeDownload}
              className="mt-2.5 w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full font-semibold text-xs text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="size-3.5 text-slate-600" />
              <span>Download Standalone Setup (.exe)</span>
            </button>

            <p className="text-[10px] text-slate-400 mt-1.5 text-center leading-normal">
              If Windows displays &ldquo;Windows protected your PC&rdquo;, click &ldquo;More info&rdquo; &rarr; &ldquo;Run anyway&rdquo;.
            </p>
          </div>
        </div>
      )}

      {/* PHASE 1: Downloading... State (Used for Mac, Linux, or standalone .exe) */}
      {phase === 'downloading' && (
        <div className="min-h-[280px] flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
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
        <div className="min-h-[280px] flex flex-col items-center justify-center text-center p-5 animate-fadeIn">
          <div className="size-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="size-7" />
          </div>

          <h3 id="download-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
            {downloadMethod === 'store' ? 'Microsoft Store Opened!' : 'Thank you for downloading!'}
          </h3>

          {downloadMethod === 'store' ? (
            <div className="space-y-2 mt-2">
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Your browser opened the official <span className="font-semibold text-slate-800">Microsoft Store</span> page. Click <strong>&ldquo;Get in Store app&rdquo;</strong> to complete installation with zero firewall alerts.
              </p>
              <p className="text-[11px] text-slate-400">
                Didn&apos;t open?{' '}
                <button
                  type="button"
                  onClick={handleStoreClick}
                  className="underline text-[#7C3AED] font-medium hover:text-[#6D28D9] cursor-pointer"
                >
                  Click here to open Microsoft Store again
                </button>
                {' '}or{' '}
                <button
                  type="button"
                  onClick={handleDirectExeDownload}
                  className="underline text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  download standalone .exe
                </button>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Your download for <span className="font-semibold text-slate-700">{platform?.name || 'Desktop'}</span> should have started. If it didn&apos;t,{' '}
                <button
                  type="button"
                  onClick={handleRetryDownload}
                  className="underline hover:text-slate-700 cursor-pointer text-[#7C3AED] font-medium"
                >
                  click here to start it again
                </button>
                .
              </p>
              {isWindows && (
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg text-[11px] text-slate-600 max-w-xs mx-auto text-left">
                  <strong>Tip:</strong> If Windows Defender displays &ldquo;Windows protected your PC&rdquo;, click <strong>&ldquo;More info&rdquo;</strong> &rarr; <strong>&ldquo;Run anyway&rdquo;</strong>, or{' '}
                  <button
                    type="button"
                    onClick={handleStoreClick}
                    className="text-[#7C3AED] font-semibold underline cursor-pointer"
                  >
                    get it from Microsoft Store
                  </button>{' '}
                  to bypass this warning completely.
                </div>
              )}
            </div>
          )}

          <div className="mt-5 w-full">
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
