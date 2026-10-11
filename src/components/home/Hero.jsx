import { useState } from 'react';
import { AppleIcon, WindowsIcon, LinuxIcon } from '../Icons';
import { detectDeviceOS, PLATFORM_DOWNLOADS } from '../../utils/osDetector';
import { useDownloadModal } from '../../context/DownloadModalContext';

export function Hero() {
  const initialOS = detectDeviceOS();
  const { openDownloadModal } = useDownloadModal();
  const [selectedOSId, setSelectedOSId] = useState(
    initialOS.id === 'linux' ? 'linux' : initialOS.id === 'windows' ? 'windows' : 'mac'
  );

  const currentOS = PLATFORM_DOWNLOADS[selectedOSId] || initialOS;

  const getOsIcon = (id, sizeClass = 'size-4 shrink-0') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  const handleDownload = () => {
    openDownloadModal(currentOS);
  };

  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white border-b border-slate-100">
      {/* Background Software Dashboard Image (Full Width, Left-to-Right) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/screenshots/dashboard.png"
          alt="Invio Free Offline Invoice Generator App & GST Billing Software Dashboard Screenshot"
          width="1280"
          height="800"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-left md:object-left-top opacity-80 sm:opacity-90"
        />
      </div>

      {/* Overlay: Left-to-right gradient ensuring high text contrast while showcasing dashboard across full width */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50 md:from-white/90 md:via-white/75 md:to-white/45 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Soft Ambient Radial Violet Glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-2xl text-center flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-5">
            Create &amp; Send Customer Invoices in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl text-center">
            Create professional invoices in a few clicks. 60+ templates or customize your own. Easily add logo, rates, and photos. Let clients pay online. Automatically send receipts.
          </p>

          {/* Platform Selector & Download Controls (Centered relative to each other) */}
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex flex-col items-center gap-3">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                Available on:
              </span>

              {/* Platform Selector Buttons in a Row */}
              <div
                className="inline-flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/80 text-slate-600 shadow-2xs"
                role="radiogroup"
                aria-label="Select desktop operating system"
              >
                <button
                  type="button"
                  onClick={() => setSelectedOSId('mac')}
                  role="radio"
                  aria-checked={selectedOSId === 'mac'}
                  className={`px-3.5 py-1 rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'mac'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <AppleIcon className="size-3.5" />
                  <span>macOS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOSId('windows')}
                  role="radio"
                  aria-checked={selectedOSId === 'windows'}
                  className={`px-3.5 py-1 rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'windows'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <WindowsIcon className="size-3.5" />
                  <span>Windows</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOSId('linux')}
                  role="radio"
                  aria-checked={selectedOSId === 'linux'}
                  className={`px-3.5 py-1 rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'linux'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <LinuxIcon className="size-3.5" />
                  <span>Linux</span>
                </button>
              </div>

              {/* Download CTA Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="h-12 px-8 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-purple-200/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer mt-1"
              >
                {getOsIcon(selectedOSId)}
                <span>Download for {currentOS.name} ({currentOS.extension})</span>
              </button>
            </div>
          </div>

          {/* Key Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700 pt-3 border-t border-slate-100 w-full">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Works 100% Offline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Automated GST (CGST/SGST/IGST)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Thermal POS &amp; UPI QR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Barcode Scanner Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
