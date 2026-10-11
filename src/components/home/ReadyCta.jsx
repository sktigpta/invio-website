import { Link } from 'react-router-dom';
import { detectDeviceOS, triggerDirectDownload } from '../../utils/osDetector';
import { AppleIcon, WindowsIcon, LinuxIcon } from '../Icons';

export function ReadyCta() {
  const activeOS = detectDeviceOS();

  const getOsIcon = (id, sizeClass = 'size-4 shrink-0') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-lg">
        {/* Ambient subtle violet glow */}
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#7C3AED]/30 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 bg-purple-900/50 border border-purple-700/50 px-3 py-1 rounded-full inline-block mb-4">
            START BILLING TODAY
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ready to simplify your shop&rsquo;s invoicing?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Download Invio for free. No credit card required, no account setup, and no internet connection needed. Install and create your first bill in minutes.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => triggerDirectDownload(activeOS)}
              className="h-11 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {getOsIcon(activeOS.id)}
              <span>Download Free for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
            </button>

            <Link
              to="/download"
              className="h-11 px-5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-full border border-white/20 transition-colors flex items-center gap-1.5"
            >
              All Versions &amp; Platforms →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReadyCta;
