import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  PLATFORM_DOWNLOADS,
  triggerDirectDownload,
  detectDeviceOS,
} from '../utils/osDetector';
import {
  DownloadIcon,
  CloseIcon,
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
  ShieldCheckIcon,
} from './Icons';

export function DownloadCard({
  initialPlatform = null,
  autoTrigger = true,
  isModal = false,
  onClose = null,
  className = '',
}) {
  const [platform, setPlatform] = useState(() => {
    if (initialPlatform) return initialPlatform;
    return detectDeviceOS();
  });
  const [downloadStarted, setDownloadStarted] = useState(false);
  const timerRef = useRef(null);
  const initialTriggerDone = useRef(false);

  useEffect(() => {
    if (autoTrigger && !initialTriggerDone.current && platform) {
      initialTriggerDone.current = true;
      setDownloadStarted(true);
      triggerDirectDownload(platform);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDownloadStarted(false);
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [autoTrigger, platform]);

  const handleRetry = () => {
    setDownloadStarted(true);
    triggerDirectDownload(platform);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDownloadStarted(false);
    }, 3500);
  };

  const handleSelectPlatform = (key) => {
    const target = PLATFORM_DOWNLOADS[key];
    if (target) {
      setPlatform(target);
      setDownloadStarted(true);
      triggerDirectDownload(target);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setDownloadStarted(false);
      }, 3500);
    }
  };

  const getOsIcon = (id, sizeClass = 'size-4') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  return (
    <div
      className={`bg-white rounded-squircle max-w-lg w-full p-6 sm:p-7 border border-slate-200/90 shadow-lg relative text-slate-800 ${className}`}
    >
      {/* Close Button if inside Modal */}
      {isModal && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <CloseIcon className="size-4" />
        </button>
      )}

      {/* Header: Download Icon & Status */}
      <div className="text-center pt-2 pb-4">
        <div className="size-14 rounded-2xl bg-purple-50 text-[#7C3AED] flex items-center justify-center mx-auto mb-3 shadow-2xs">
          <DownloadIcon className={`size-7 ${downloadStarted ? 'animate-bounce' : ''}`} />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Downloading Invio for {platform.name}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
          Your installer file <code className="font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded text-[11px] font-semibold">{platform.filename}</code> should begin downloading automatically.
        </p>

        {/* Retry Link */}
        <div className="mt-3">
          <button
            type="button"
            onClick={handleRetry}
            className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer inline-flex items-center gap-1.5"
          >
            <DownloadIcon className="size-3" />
            <span>Didn&apos;t start? Click here to retry download</span>
          </button>
        </div>
      </div>

      {/* Switch Operating System */}
      <div className="my-4 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
        <span className="block text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-2">
          SWITCH OPERATING SYSTEM:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'windows', label: 'Windows (.exe)' },
            { id: 'mac', label: 'macOS (.dmg)' },
            { id: 'linux', label: 'Linux (.AppImage)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectPlatform(item.id)}
              className={`py-2 px-2 rounded-squircle-sm text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                platform.id === item.id
                  ? 'bg-[#7C3AED] text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {getOsIcon(item.id, 'size-3.5 shrink-0')}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick 3-Step Setup Guidance */}
      <div className="my-4 space-y-2">
        <span className="block text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">
          QUICK 3-STEP SETUP FOR {platform.name.toUpperCase()}:
        </span>

        {platform.id === 'windows' && (
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-squircle-sm border border-slate-100">
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">1.</span>
              <span>Open downloaded <code>{platform.filename}</code>.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">2.</span>
              <span>If Windows SmartScreen prompts, click <strong>&ldquo;More info&rdquo;</strong> then <strong>&ldquo;Run anyway&rdquo;</strong>.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">3.</span>
              <span>Invio launches automatically — start creating offline invoices immediately!</span>
            </p>
          </div>
        )}

        {platform.id === 'mac' && (
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-squircle-sm border border-slate-100">
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">1.</span>
              <span>Double-click <code>{platform.filename}</code> to mount the disk image.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">2.</span>
              <span>Drag the <strong>Invio</strong> icon into your <strong>Applications</strong> folder.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">3.</span>
              <span>Open Invio from Applications or Spotlight. 100% offline SQLite ready!</span>
            </p>
          </div>
        )}

        {platform.id === 'linux' && (
          <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-squircle-sm border border-slate-100">
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">1.</span>
              <span>Download <code>{platform.filename}</code> to your computer.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">2.</span>
              <span>Grant permission: <code>chmod +x {platform.filename}</code> or enable in file Properties.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="font-bold text-[#7C3AED]">3.</span>
              <span>Double-click to launch on Ubuntu, Debian, Fedora, Arch, and Linux distros.</span>
            </p>
          </div>
        )}
      </div>

      {/* Footer: Offline Guarantee & Changelog Link */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <ShieldCheckIcon className="size-4 shrink-0" />
          <span>100% Offline • Zero Telemetry</span>
        </div>

        <Link
          to="/changelog"
          onClick={onClose}
          className="font-semibold text-[#7C3AED] hover:underline"
        >
          Release Changelog &amp; Assets →
        </Link>
      </div>
    </div>
  );
}

export default DownloadCard;
