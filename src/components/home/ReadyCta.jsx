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
    <section className="w-full pt-12 pb-0 mb-0">
      <div className="w-[90%] max-w-6xl mx-auto rounded-t-3xl rounded-b-none bg-slate-900 text-white p-8 sm:p-12 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg mb-0">
        {/* Subtle violet ambient glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ready to simplify your shop&rsquo;s invoicing?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-7 max-w-xl">
            Download Invio for free. No credit card required, no account setup, and no internet connection needed. Install and create your first bill in minutes.
          </p>

          <button
            type="button"
            onClick={() => triggerDirectDownload(activeOS)}
            className="h-11 px-8 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold rounded-none shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {getOsIcon(activeOS.id)}
            <span>Download Free for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReadyCta;
