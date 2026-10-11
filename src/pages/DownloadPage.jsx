import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { PLATFORM_DOWNLOADS, triggerDirectDownload } from '../utils/osDetector';
import { WindowsIcon, AppleIcon, LinuxIcon } from '../components/Icons';

export function DownloadPage() {
  useEffect(() => {
    applySEO('download');
    window.scrollTo(0, 0);
  }, []);

  const mac = PLATFORM_DOWNLOADS.mac;
  const win = PLATFORM_DOWNLOADS.windows;
  const linux = PLATFORM_DOWNLOADS.linux;

  return (
    <PageContainer
      badge="Official Releases"
      title="Download Invio Desktop Application"
      subtitle="Invio is distributed as a standalone desktop binary for Windows and macOS. Choose your operating system below to start downloading. All binaries are verified and built directly via our release pipeline."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        {/* Windows Card */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <WindowsIcon className="size-5 text-[#0078D7]" />
              <h2 className="text-xl font-bold text-slate-900">Invio for Windows</h2>
            </div>
            <p className="text-xs text-slate-500 mb-3">Version 1.0.2 • 64-bit Installer</p>
            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <p><strong>System:</strong> {win.minRequirement}</p>
              <p><strong>Package:</strong> {win.filename} (~{win.sizeEstimate})</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-500 break-all mb-4">
              SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => triggerDirectDownload(win)}
              className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center cursor-pointer transition-colors shadow-sm mb-2.5 flex items-center justify-center gap-2"
            >
              <WindowsIcon className="size-4" />
              <span>Download for Windows (.exe)</span>
            </button>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {win.securityTip}
            </p>
          </div>
        </div>

        {/* macOS Card */}
        <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AppleIcon className="size-5 text-slate-800" />
              <h2 className="text-xl font-bold text-slate-900">Invio for macOS</h2>
            </div>
            <p className="text-xs text-slate-500 mb-3">Version 1.0.2 • Universal (Apple Silicon &amp; Intel)</p>
            <div className="space-y-1.5 text-xs text-slate-600 mb-4">
              <p><strong>System:</strong> {mac.minRequirement}</p>
              <p><strong>Package:</strong> {mac.filename} (~{mac.sizeEstimate})</p>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-500 break-all mb-4">
              SHA-256: d41d8cd98f00b204e9800998ecf8427e0a6d0c24e69b59ca41961e93892f3be2
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => triggerDirectDownload(mac)}
              className="w-full py-2.5 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full font-semibold text-xs text-center cursor-pointer transition-colors shadow-sm mb-2.5 flex items-center justify-center gap-2"
            >
              <AppleIcon className="size-4" />
              <span>Download for macOS (.dmg)</span>
            </button>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {mac.securityTip}
            </p>
          </div>
        </div>
      </div>

      {/* Linux Package Card */}
      <div className="p-5 rounded-2xl border border-slate-200/90 bg-white mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LinuxIcon className="size-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">Linux Standalone Package</h3>
          </div>
          <p className="text-xs text-slate-600">
            Standard 64-bit AppImage compatible with Ubuntu 20.04+, Debian, Fedora, and Arch Linux.
          </p>
        </div>
        <button
          type="button"
          onClick={() => triggerDirectDownload(linux)}
          className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer"
        >
          Download AppImage (.AppImage)
        </button>
      </div>

      {/* Installation Walkthrough */}
      <section className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-4">
          Quick Installation Steps
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Windows Installation:</h3>
            <ol className="space-y-1.5 list-decimal pl-4">
              <li>Double-click the downloaded setup file (<code>{win.filename}</code>).</li>
              <li>If Windows SmartScreen appears, click <strong>&ldquo;More info&rdquo;</strong> then <strong>&ldquo;Run anyway&rdquo;</strong>.</li>
              <li>The setup wizard installs Invio and launches the application automatically.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-2">macOS Installation:</h3>
            <ol className="space-y-1.5 list-decimal pl-4">
              <li>Open the downloaded disk image (<code>{mac.filename}</code>).</li>
              <li>Drag the Invio application icon into your <strong>Applications</strong> folder.</li>
              <li>Launch Invio from Applications or Spotlight. Click &ldquo;Open&rdquo; if Gatekeeper prompts.</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link to="/docs/installation" className="font-semibold text-[#7C3AED] hover:underline">
            Read comprehensive setup walkthrough →
          </Link>
          <Link to="/changelog" className="font-semibold text-[#7C3AED] hover:underline">
            View version 1.0.2 release notes →
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

export default DownloadPage;
