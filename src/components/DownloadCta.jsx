import { Link } from 'react-router-dom';
import { detectDeviceOS } from '../utils/osDetector';
import { useDownloadModal } from '../context/DownloadModalContext';
import { AppleIcon, WindowsIcon, LinuxIcon } from './Icons';

export function DownloadCta({
  title = "Download Invio for Desktop",
  subtitle = "Version 1.0.2 for Windows and macOS. Free forever for core billing with 100% local SQLite storage.",
  showAllLinks = true,
  className = ""
}) {
  const activeOS = detectDeviceOS();
  const { openDownloadModal } = useDownloadModal();

  const getOsIcon = (id, sizeClass = "size-4") => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  return (
    <section className={`my-6 p-5 sm:p-6 border border-slate-200/90 rounded-squircle bg-white shadow-2xs ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openDownloadModal(activeOS)}
            className="h-10 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-purple-200"
          >
            {getOsIcon(activeOS.id)}
            <span>Download for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
          </button>

          {showAllLinks && (
            <Link
              to="/changelog"
              className="text-xs font-semibold text-[#7C3AED] hover:underline"
            >
              All platforms &amp; changelog →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default DownloadCta;
