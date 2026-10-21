import { Link } from 'react-router-dom';
import { detectDeviceOS, PLATFORM_DOWNLOADS, MICROSOFT_STORE_URL } from '../../utils/osDetector';
import { AppleIcon, WindowsIcon, LinuxIcon, CalculatorIcon, DownloadIcon, MicrosoftStoreIcon } from '../Icons';
import { useDownloadModal } from '../../context/DownloadModalContext';

export function ReadyCta() {
  const activeOS = detectDeviceOS();
  const { openDownloadModal } = useDownloadModal();

  const getOsIcon = (id, sizeClass = 'size-3.5 shrink-0 pointer-events-none') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    if (id === 'linux') return <LinuxIcon className={sizeClass} />;
    return <DownloadIcon className={sizeClass} />;
  };

  return (
    <section className="w-full pt-16 pb-0 mb-0">
      {/* Free In-Browser Tools Intro (Outside the card, on top of CTA) */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-12 sm:mb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[#7C3AED] text-xs font-semibold mb-3.5">
          <CalculatorIcon className="size-3.5 text-[#7C3AED]" />
          <span>In-Browser Financial &amp; Tax Suite</span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-4 font-normal">
          Need quick calculations without installing? Use our free in-browser GST calculator, FY 25–26 income tax planner, UK &amp; UAE VAT tools, and payslip generator.
        </p>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] hover:underline transition-colors"
        >
          <span>Explore Free Financial Tools</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Main Ready CTA Card */}
      <div className="w-[90%] max-w-[1200px] mx-auto rounded-t-3xl rounded-b-none bg-slate-900 text-white p-8 sm:p-12 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg mb-0 border-b-0">
        {/* Subtle violet ambient glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Ready to Simplify Invoicing */}
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ready to simplify your shop&rsquo;s invoicing?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl font-normal">
            Download Invio for free. No credit card required, no account setup, and works 100% offline on your computer with private local SQLite storage.
          </p>

          {/* Download button - Windows gets Microsoft Store option to bypass firewall & risk alerts */}
          {activeOS.id === 'windows' ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={MICROSOFT_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs select-none"
                title="Get Invio from Microsoft Store — Safe, Certified & Bypasses Firewall Warnings"
              >
                <MicrosoftStoreIcon className="size-4 shrink-0" />
                <span>Get Free from Microsoft Store</span>
              </a>

              <button
                type="button"
                onClick={() => openDownloadModal(PLATFORM_DOWNLOADS.windows)}
                className="h-10 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700 select-none"
                title="Download Standalone Offline Setup (.exe)"
              >
                <WindowsIcon className="size-3.5 shrink-0" />
                <span>Standalone .exe</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openDownloadModal(activeOS)}
              className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs select-none"
              title={`Download Invio for ${activeOS.name}`}
            >
              {getOsIcon(activeOS.id)}
              <span>Download Free for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReadyCta;
