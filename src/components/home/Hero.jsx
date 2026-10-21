import { useState } from 'react';
import { AppleIcon, WindowsIcon, LinuxIcon, MicrosoftStoreIcon, DownloadIcon } from '../Icons';
import { detectDeviceOS, PLATFORM_DOWNLOADS, MICROSOFT_STORE_URL } from '../../utils/osDetector';
import { useDownloadModal } from '../../context/DownloadModalContext';
import { ProgressiveImage } from '../common/ProgressiveImage';

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

  const selectedPlatformName = currentOS.name || selectedOSId;

  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white border-b border-slate-100">
      {/* Background Software Hero Image (Desktop Only: hidden on mobile and tablet) */}
      <div
        className="hidden lg:flex absolute inset-0 w-full h-full overflow-hidden pointer-events-none justify-end z-30"
        aria-hidden="true"
      >
        <ProgressiveImage
          srcLow="/screenshots/hero-360p.webp"
          srcHigh="/screenshots/hero.webp"
          alt="Invio Free Offline Invoice Generator App & GST Billing Software Hero Screenshot"
          width={1920}
          height={1301}
          aspectRatio="1920 / 1301"
          priority={true}
          className="h-full w-auto max-w-none flex justify-end"
          imgClassName="h-full w-auto max-w-none object-contain object-right"
          style={{ height: '100%', width: 'auto' }}
        />
      </div>

      {/* Soft Ambient Radial Violet Glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7C3AED]/5 rounded-full blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="max-w-2xl text-center flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-5">
            Create &amp; Send Customer Invoices in Seconds
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-[17px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl text-center">
            Create professional GST invoices and retail bills in seconds. Print thermal receipts with dynamic UPI QR codes, scan barcodes, track inventory, and keep your business data 100% private in local SQLite storage.
          </p>

          {/* Platform Selector & Download Controls (Centered relative to each other) */}
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex flex-col items-center gap-3">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                Available on:
              </span>

              {/* Platform Selector Buttons in a Row */}
              <div
                className="inline-flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200/90 text-slate-700 shadow-2xs"
                role="radiogroup"
                aria-label="Select desktop operating system"
              >
                {/* Visually-hidden live region announces platform change to screen readers */}
                <span className="sr-only" aria-live="polite" aria-atomic="true">
                  Selected: {selectedPlatformName}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedOSId('mac')}
                  role="radio"
                  aria-checked={selectedOSId === 'mac'}
                  className={`px-4 py-2 min-h-[36px] rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'mac'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
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
                  className={`px-4 py-2 min-h-[36px] rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'windows'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
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
                  className={`px-4 py-2 min-h-[36px] rounded-full cursor-pointer flex items-center gap-1.5 text-xs transition-all ${
                    selectedOSId === 'linux'
                      ? 'bg-white font-bold text-[#7C3AED] shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <LinuxIcon className="size-3.5" />
                  <span>Linux</span>
                </button>
              </div>

              {/* Download CTA Button */}
              {selectedOSId === 'windows' ? (
                <div className="flex flex-col items-center gap-2 mt-1">
                  <div className="flex flex-wrap items-center justify-center gap-2.5">
                    <a
                      href={MICROSOFT_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-12 px-7 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-purple-200/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      title="Get from Microsoft Store — Safe, Certified & Bypasses Firewall Warnings"
                    >
                      <MicrosoftStoreIcon className="size-4 shrink-0" />
                      <span>Get from Microsoft Store</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => openDownloadModal(PLATFORM_DOWNLOADS.windows)}
                      className="h-12 px-5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium rounded-full shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title="Download Standalone Offline Setup (.exe)"
                    >
                      <DownloadIcon className="size-3.5 text-slate-500" />
                      <span>Standalone .exe</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Microsoft Store version bypasses Windows SmartScreen &amp; firewall alerts
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="h-12 px-8 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-purple-200/80 transition-all flex items-center justify-center gap-2.5 cursor-pointer mt-1"
                >
                  {getOsIcon(selectedOSId)}
                  <span>Download for {currentOS.name} ({currentOS.extension})</span>
                </button>
              )}
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
