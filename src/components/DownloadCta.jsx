import { Link } from 'react-router-dom';
import { detectDeviceOS, PLATFORM_DOWNLOADS, MICROSOFT_STORE_URL, APP_VERSION } from '../utils/osDetector';
import { useDownloadModal } from '../context/DownloadModalContext';
import { AppleIcon, WindowsIcon, LinuxIcon, DownloadIcon, MicrosoftStoreIcon } from './Icons';

export function DownloadCta({
  title = "Download Invio for Desktop",
  subtitle = `Version ${APP_VERSION} for Windows, macOS, and Linux. Free forever for core billing with 100% local SQLite storage.`,
  showAllLinks = true,
  className = ""
}) {
  const activeOS = detectDeviceOS();
  const { openDownloadModal } = useDownloadModal();

  const getOsIcon = (id, sizeClass = "size-4") => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    if (id === 'linux') return <LinuxIcon className={sizeClass} />;
    return <DownloadIcon className={sizeClass} />;
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
          {activeOS.id === 'windows' ? (
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={MICROSOFT_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-purple-200"
                title="Get Invio from Microsoft Store — Certified to bypass firewall & SmartScreen warnings"
              >
                <MicrosoftStoreIcon className="size-3.5" />
                <span>Get from Microsoft Store</span>
              </a>

              <button
                type="button"
                onClick={() => openDownloadModal(PLATFORM_DOWNLOADS.windows)}
                className="h-10 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full transition-all cursor-pointer"
                title="Download Standalone Offline Setup (.exe)"
              >
                Offline .exe
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openDownloadModal(activeOS)}
              className="h-10 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-purple-200"
            >
              {getOsIcon(activeOS.id)}
              <span>Download for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
            </button>
          )}

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
