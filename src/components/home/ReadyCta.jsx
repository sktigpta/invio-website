import { Link } from 'react-router-dom';
import { detectDeviceOS, triggerDirectDownload } from '../../utils/osDetector';
import { AppleIcon, WindowsIcon, LinuxIcon, CalculatorIcon } from '../Icons';

export function ReadyCta() {
  const activeOS = detectDeviceOS();

  const getOsIcon = (id, sizeClass = 'size-3.5 shrink-0 pointer-events-none') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  return (
    <section className="w-full pt-12 pb-0 mb-0">
      <div className="w-[90%] max-w-[1200px] mx-auto rounded-t-3xl rounded-b-none bg-slate-900 text-white p-8 sm:p-12 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg mb-0 border-b-0">
        {/* Subtle violet ambient glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Part 1: Ready to Simplify Invoicing */}
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ready to simplify your shop&rsquo;s invoicing?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
            Download Invio for free. No credit card required, no account setup, and works 100% offline on your computer with private local SQLite storage.
          </p>

          {/* Download button - Identical pill button style as navbar */}
          <button
            type="button"
            onClick={() => triggerDirectDownload(activeOS)}
            className="h-9 px-5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs select-none"
            title={`Download Invio for ${activeOS.name}`}
          >
            {getOsIcon(activeOS.id)}
            <span>Download Free for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
          </button>
        </div>

        {/* Subtle Horizontal Divider */}
        <div className="relative z-10 w-full max-w-2xl my-8 border-t border-slate-800" />

        {/* Part 2: Merged Free Online Finance, Tax & Payroll Suite */}
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CalculatorIcon className="size-4 text-purple-300" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Free Online Finance, Tax &amp; Payroll Suite
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-xl">
            Need quick calculations without installing? Use our free in-browser GST calculator, FY 25–26 income tax planner, UK &amp; UAE VAT tools, and payslip generator.
          </p>

          {/* Tools button - Identical pill button style as navbar */}
          <Link
            to="/tools"
            className="h-9 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs select-none"
          >
            <CalculatorIcon className="size-3.5 shrink-0 pointer-events-none" />
            <span>Explore Free Tools Suite →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ReadyCta;
