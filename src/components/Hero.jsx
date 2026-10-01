import { Button } from './Button';
import { AppleIcon, WindowsIcon, LinuxIcon } from './Icons';
import { onRadioGroupKeyDown, radioTabIndex } from '../utils/a11y';

const OS_IDS = ['mac', 'windows', 'linux'];

export function Hero({ activeOS, onSelectOS, onDirectDownload }) {
  const getOsIcon = (id) => {
    if (id === 'mac') return <AppleIcon className="size-4" />;
    if (id === 'windows') return <WindowsIcon className="size-4" />;
    return <LinuxIcon className="size-4" />;
  };

  return (
    <section
      id="product"
      className="relative w-full bg-white text-slate-900 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-grid-subtle"
    >
      {/* Subtle Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-3xl">
          Simple billing &amp; inventory software for your shop
        </h1>

        {/* Clear non-tech subtitle */}
        <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl mx-auto mt-4 leading-relaxed">
          Create GST invoices in seconds, print thermal receipts with UPI payment QR codes, scan barcodes, and track stock. Fast, simple, and works 100% offline on your computer.
        </p>

        {/* Key Highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700 max-w-3xl">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full shadow-none">
            <span aria-hidden="true" className="text-emerald-500 font-bold text-sm">✓</span>
            <span>Works 100% Offline</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full shadow-none">
            <span aria-hidden="true" className="text-emerald-500 font-bold text-sm">✓</span>
            <span>Automated GST (CGST/SGST/IGST)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full shadow-none">
            <span aria-hidden="true" className="text-emerald-500 font-bold text-sm">✓</span>
            <span>2&quot; &amp; 3&quot; Thermal Receipts</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full shadow-none">
            <span aria-hidden="true" className="text-emerald-500 font-bold text-sm">✓</span>
            <span>Barcode Scanner Ready</span>
          </div>
        </div>

        {/* CTA Controls - Download button */}
        <div className="mt-8 flex flex-col items-center justify-center w-full max-w-sm gap-2">
          <Button
            variant="primary"
            size="lg"
            iconLeft={getOsIcon(activeOS.id)}
            onClick={() => onDirectDownload(activeOS)}
            className="w-full sm:w-auto text-xs font-semibold shimmer-btn shadow-md hover:shadow-lg transition-all px-8 h-11"
          >
            Download for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}
          </Button>
          {activeOS.isMobileFallback ? (
            <p className="text-[11px] text-slate-500 leading-relaxed text-center px-4">
              You&apos;re on a phone or tablet — Invio runs on Mac, Windows, or Linux computers. Pick your desktop OS below.
            </p>
          ) : null}
        </div>

        {/* Platform Selector */}
        <div id="platform-selector" className="mt-5 flex flex-col items-center gap-1.5 text-xs font-medium">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">Available on:</span>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100/70 p-1.5 rounded-[18px] border border-slate-200/70 text-slate-600 max-w-full overflow-x-auto" role="radiogroup" aria-label="Select download platform" onKeyDown={(e) => onRadioGroupKeyDown(e, OS_IDS, activeOS.id, onSelectOS)}>
            <button
              type="button"
              onClick={() => onSelectOS('mac')}
              role="radio"
              aria-checked={activeOS.id === 'mac'}
              tabIndex={radioTabIndex('mac', activeOS.id)}
              className={`px-3 py-1 rounded-[12px] cursor-pointer flex items-center gap-1.5 transition-all shrink-0 ${activeOS.id === 'mac' ? 'bg-white font-bold text-[#8646F4] shadow-sm' : 'hover:text-slate-900'}`}
            >
              <AppleIcon className="size-3.5" />
              <span>macOS</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectOS('windows')}
              role="radio"
              aria-checked={activeOS.id === 'windows'}
              tabIndex={radioTabIndex('windows', activeOS.id)}
              className={`px-3 py-1 rounded-[12px] cursor-pointer flex items-center gap-1.5 transition-all shrink-0 ${activeOS.id === 'windows' ? 'bg-white font-bold text-[#8646F4] shadow-sm' : 'hover:text-slate-900'}`}
            >
              <WindowsIcon className="size-3.5" />
              <span>Windows</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectOS('linux')}
              role="radio"
              aria-checked={activeOS.id === 'linux'}
              tabIndex={radioTabIndex('linux', activeOS.id)}
              className={`px-3 py-1 rounded-[12px] cursor-pointer flex items-center gap-1.5 transition-all shrink-0 ${activeOS.id === 'linux' ? 'bg-white font-bold text-[#8646F4] shadow-sm' : 'hover:text-slate-900'}`}
            >
              <LinuxIcon className="size-3.5" />
              <span>Linux</span>
            </button>
          </div>
        </div>

        {/* Clean Static Desktop Mockup Window (No tilt, no floating badges) */}
        <div className="relative w-full max-w-4xl mt-12 sm:mt-16">
          {/* Subtle Ambient Glowing Background Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[680px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-purple-500/20 via-indigo-400/15 to-purple-300/15 blur-3xl rounded-[100px] pointer-events-none -z-10" />

          {/* Desktop Window Frame */}
          <div className="w-full squircle-window bg-slate-950 text-left border border-slate-800 shadow-2xl">
            {/* Window titlebar - 3 traffic light buttons + title */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/95 border-b border-slate-800">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff5f56]" />
                <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[11px] font-medium text-slate-400 font-mono">Invio Desktop • Billing Dashboard</span>
              <div className="size-2.5" />
            </div>

            {/* Application Screenshot */}
            <img
              src="/screenshots/dashboard.png"
              alt="Invio Desktop Application Billing Interface"
              width="1200"
              height="750"
              className="w-full h-auto object-cover block"
              loading="eager"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
