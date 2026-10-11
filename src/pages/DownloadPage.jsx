import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { PLATFORM_DOWNLOADS, triggerDirectDownload, detectDeviceOS } from '../utils/osDetector';
import { fetchLatestReleaseNotes } from '../services/releaseService';
import {
  WindowsIcon,
  AppleIcon,
  LinuxIcon,
  DownloadIcon,
  GithubIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  CheckIcon,
} from '../components/Icons';

export function DownloadPage() {
  const [detectedOS, setDetectedOS] = useState(PLATFORM_DOWNLOADS.mac);
  const [downloadingPlatform, setDownloadingPlatform] = useState(null);
  const [downloadNotice, setDownloadNotice] = useState(null);
  const [releaseInfo, setReleaseInfo] = useState(null);
  const [activeInstallTab, setActiveInstallTab] = useState('windows');

  useEffect(() => {
    applySEO('download');
    window.scrollTo(0, 0);

    const os = detectDeviceOS();
    if (os && !os.isMobileFallback) {
      setDetectedOS(os);
      setActiveInstallTab(os.id);
    }

    // Fetch real latest release notes and assets from GitHub via backend API
    const loadRelease = async () => {
      const data = await fetchLatestReleaseNotes();
      setReleaseInfo(data);
    };

    loadRelease();
  }, []);

  const handleDownload = (platformMeta) => {
    const target = platformMeta || detectedOS;
    setDownloadingPlatform(target.id);
    setDownloadNotice(target);
    triggerDirectDownload(target);

    setTimeout(() => {
      setDownloadingPlatform(null);
    }, 2000);
  };

  const mac = PLATFORM_DOWNLOADS.mac;
  const win = PLATFORM_DOWNLOADS.windows;
  const linux = PLATFORM_DOWNLOADS.linux;

  return (
    <PageContainer
      badge="Official Desktop Releases"
      title="Download Invio Desktop Application"
      subtitle="Invio is a 100% offline desktop billing and inventory engine for Windows, macOS, and Linux. Choose your operating system below to start downloading. All binaries are built and signed directly via our release pipeline."
    >
      {/* Download Status Notification */}
      {downloadNotice && (
        <div className="my-6 p-4 rounded-squircle-sm bg-purple-50/80 border border-purple-200/90 text-slate-800 shadow-2xs flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shrink-0">
              <DownloadIcon className="size-4 animate-bounce" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">
                Download started for {downloadNotice.name}!
              </p>
              <p className="text-slate-600">
                Your browser should automatically begin saving <code>{downloadNotice.filename}</code>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleDownload(downloadNotice)}
            className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer shrink-0"
          >
            Didn't start? Click to retry
          </button>
        </div>
      )}

      {/* Auto-Detected Hero Card */}
      <section className="my-8 p-6 sm:p-8 rounded-squircle bg-gradient-to-br from-purple-50/50 via-white to-slate-50/60 border-2 border-[#7C3AED]/30 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Recommended for your computer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Invio for {detectedOS.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Native standalone application with 100% offline SQLite storage. Unlimited invoices, POS thermal printing, barcode scanning, and instant UPI QR payments.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500" />
                Version {releaseInfo?.tag || 'v1.0.1'}
              </span>
              <span>•</span>
              <span>{detectedOS.archLabel}</span>
              <span>•</span>
              <span>~{detectedOS.sizeEstimate}</span>
              <span>•</span>
              <span>{detectedOS.minRequirement}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleDownload(detectedOS)}
              disabled={downloadingPlatform === detectedOS.id}
              className="h-12 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-full transition-all shadow-md hover:shadow-purple-200 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <DownloadIcon className="size-4" />
              <span>
                {downloadingPlatform === detectedOS.id ? 'Starting Download...' : `Download for ${detectedOS.shortName}`}
              </span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 py-1 px-3 rounded-full border border-emerald-200/60">
              <CheckIcon className="size-3.5" />
              <span>Verified Release Asset</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Platform OS Matrix Cards */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            All Supported Platforms
          </h2>
          <span className="text-xs text-slate-500">64-bit Native Installers</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* 1. Windows Card */}
          <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-50 text-[#0078D7]">
                    <WindowsIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Windows</h3>
                    <span className="text-[11px] text-slate-500">10 &amp; 11 (64-bit)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  .exe
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-6 leading-relaxed">
                <p><strong>Package:</strong> {win.filename}</p>
                <p><strong>Size:</strong> ~{win.sizeEstimate}</p>
                <p><strong>System:</strong> {win.minRequirement}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed mb-6">
                <p className="font-semibold text-slate-800 mb-0.5">SmartScreen Tip:</p>
                <p>{win.securityTip}</p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleDownload(win)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer mb-2.5"
              >
                <DownloadIcon className="size-3.5" />
                <span>Download for Windows (.exe)</span>
              </button>
              <a
                href="https://github.com/sktigpta/invio-desktop/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] font-semibold text-[#7C3AED] hover:underline"
              >
                Also available: Portable EXE →
              </a>
            </div>
          </div>

          {/* 2. macOS Card */}
          <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                    <AppleIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">macOS</h3>
                    <span className="text-[11px] text-slate-500">Apple Silicon &amp; Intel</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  .dmg
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-6 leading-relaxed">
                <p><strong>Package:</strong> {mac.filename}</p>
                <p><strong>Size:</strong> ~{mac.sizeEstimate}</p>
                <p><strong>System:</strong> {mac.minRequirement}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed mb-6">
                <p className="font-semibold text-slate-800 mb-0.5">Gatekeeper Tip:</p>
                <p>{mac.securityTip}</p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleDownload(mac)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer mb-2.5"
              >
                <DownloadIcon className="size-3.5" />
                <span>Download for macOS (.dmg)</span>
              </button>
              <a
                href="https://github.com/sktigpta/invio-desktop/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] font-semibold text-[#7C3AED] hover:underline"
              >
                Intel x64 DMG Available →
              </a>
            </div>
          </div>

          {/* 3. Linux Card */}
          <div className="p-6 rounded-squircle border border-slate-200/90 bg-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-orange-50 text-slate-800">
                    <LinuxIcon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Linux</h3>
                    <span className="text-[11px] text-slate-500">Ubuntu, Debian, Fedora, Arch</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  .AppImage
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 mb-6 leading-relaxed">
                <p><strong>Package:</strong> {linux.filename}</p>
                <p><strong>Size:</strong> ~{linux.sizeEstimate}</p>
                <p><strong>System:</strong> {linux.minRequirement}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed mb-6">
                <p className="font-semibold text-slate-800 mb-0.5">Execution Tip:</p>
                <p>Run <code>chmod +x Invio-*.AppImage</code> or allow executing in file properties.</p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleDownload(linux)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold text-xs text-center transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer mb-2.5"
              >
                <DownloadIcon className="size-3.5" />
                <span>Download AppImage (.AppImage)</span>
              </button>
              <a
                href="https://github.com/sktigpta/invio-desktop/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] font-semibold text-[#7C3AED] hover:underline"
              >
                Debian / Ubuntu (.deb) Package →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Real Release Notes from GitHub */}
      <section className="my-10 p-6 sm:p-8 rounded-squircle bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-squircle-sm bg-purple-50 text-[#7C3AED]">
              <GithubIcon className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {releaseInfo?.name || 'Invio v1.0.1'}
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-2 py-0.5 rounded-full">
                  Official GitHub Release
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Released {releaseInfo?.date || 'October 2026'} • Tag: <code>{releaseInfo?.tag || 'v1.0.1'}</code>
              </p>
            </div>
          </div>

          <a
            href={releaseInfo?.htmlUrl || 'https://github.com/sktigpta/invio-desktop/releases/latest'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors cursor-pointer shrink-0"
          >
            <span>View on GitHub</span>
            <ExternalLinkIcon className="size-3.5" />
          </a>
        </div>

        {/* Release Summary & Highlights */}
        <div className="mb-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {releaseInfo?.summary ||
              'Official multi-platform release of Invio: A privacy-first, 100% offline desktop invoicing and inventory management suite for retail shops, small businesses, and freelancers.'}
          </p>

          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Key Changes &amp; Improvements in this Release:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-slate-700">
            {(releaseInfo?.highlights || [
              'Dual-Screen POS Customer Display monitor projection',
              'ESC/POS thermal paper printing (58mm and 80mm)',
              'Dynamic UPI payment QR codes on counter slips',
              'Automated GST tax calculations (CGST/SGST/IGST)',
              'Hardware barcode gun auto-scanning & incrementing',
              '100% offline SQLite local database privacy',
            ]).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[#7C3AED] font-bold shrink-0 mt-0.5">✓</span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Real GitHub Release Assets Table */}
        <div className="pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Compiled Assets Attached to this Release:
          </h3>
          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-squircle-sm overflow-hidden bg-slate-50/40">
            {(releaseInfo?.assets || [
              { name: 'Invio-1.0.1-win-x64.exe', size: '113.9 MB', arch: 'Windows x64', platform: 'windows' },
              { name: 'Invio-1.0.1-win-x64-portable.exe', size: '113.8 MB', arch: 'Windows Portable', platform: 'windows' },
              { name: 'Invio-1.0.1-mac-arm64.dmg', size: '133.3 MB', arch: 'macOS Apple Silicon', platform: 'mac' },
              { name: 'Invio-1.0.1-mac-x64.dmg', size: '139.6 MB', arch: 'macOS Intel', platform: 'mac' },
              { name: 'Invio-1.0.1-linux-x86_64.AppImage', size: '130.1 MB', arch: 'Linux AppImage', platform: 'linux' },
              { name: 'Invio-1.0.1-linux-amd64.deb', size: '102.3 MB', arch: 'Linux Debian / Ubuntu', platform: 'linux' },
            ]).map((asset, idx) => (
              <div
                key={idx}
                className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-slate-800">
                    {asset.name}
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                    {asset.arch}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-500">{asset.size}</span>
                  <button
                    type="button"
                    onClick={() => handleDownload(PLATFORM_DOWNLOADS[asset.platform] || detectedOS)}
                    className="text-xs font-semibold text-[#7C3AED] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Download</span>
                    <DownloadIcon className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Installation Walkthrough with OS Tabs */}
      <section className="my-10 p-6 sm:p-8 rounded-squircle bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Step-by-Step Installation Guide
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Select your platform to review the 3-step setup walkthrough.
            </p>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-full select-none" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeInstallTab === 'windows'}
              onClick={() => setActiveInstallTab('windows')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeInstallTab === 'windows'
                  ? 'bg-white text-[#7C3AED] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Windows
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeInstallTab === 'mac'}
              onClick={() => setActiveInstallTab('mac')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeInstallTab === 'mac'
                  ? 'bg-white text-[#7C3AED] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              macOS
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeInstallTab === 'linux'}
              onClick={() => setActiveInstallTab('linux')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeInstallTab === 'linux'
                  ? 'bg-white text-[#7C3AED] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Linux
            </button>
          </div>
        </div>

        {/* Tab 1: Windows Steps */}
        {activeInstallTab === 'windows' && (
          <div className="space-y-4 animate-fadeIn text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Download &amp; Open Installer</strong>
                <p className="text-slate-600 leading-relaxed">
                  Download <code>{win.filename}</code> and double-click to launch the 1-step installer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Windows SmartScreen Verification</strong>
                <p className="text-slate-600 leading-relaxed">
                  If Windows SmartScreen prompts <em>&ldquo;Windows protected your PC&rdquo;</em>, click <strong>&ldquo;More info&rdquo;</strong> and then select <strong>&ldquo;Run anyway&rdquo;</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Instant Launch &amp; Desktop Shortcut</strong>
                <p className="text-slate-600 leading-relaxed">
                  Invio opens automatically and creates a Desktop shortcut. You can begin generating invoices immediately without registration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: macOS Steps */}
        {activeInstallTab === 'mac' && (
          <div className="space-y-4 animate-fadeIn text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Mount the Disk Image</strong>
                <p className="text-slate-600 leading-relaxed">
                  Double-click the downloaded <code>{mac.filename}</code> file to mount the disk image.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Drag to Applications Folder</strong>
                <p className="text-slate-600 leading-relaxed">
                  Drag the Invio application icon into your <strong>Applications</strong> shortcut folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Open from Applications</strong>
                <p className="text-slate-600 leading-relaxed">
                  Launch Invio from Applications or Spotlight. If macOS Gatekeeper prompts on first launch, click <strong>&ldquo;Open&rdquo;</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Linux Steps */}
        {activeInstallTab === 'linux' && (
          <div className="space-y-4 animate-fadeIn text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Download AppImage or DEB</strong>
                <p className="text-slate-600 leading-relaxed">
                  Save <code>{linux.filename}</code> to your Downloads or Applications folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Grant Execute Permission</strong>
                <p className="text-slate-600 leading-relaxed">
                  Right-click the AppImage file &gt; Properties &gt; Permissions &gt; Check &ldquo;Allow executing file as program&rdquo;, or run in terminal: <code>chmod +x Invio-*.AppImage</code>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-squircle-sm bg-slate-50 border border-slate-100">
              <span className="size-6 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="block text-slate-900 mb-1">Double-Click to Launch</strong>
                <p className="text-slate-600 leading-relaxed">
                  Double-click the AppImage to launch Invio. Works on Ubuntu, Debian, Fedora, Arch, and compatible Linux distributions.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link to="/docs/installation" className="font-semibold text-[#7C3AED] hover:underline">
            Read complete installation walkthrough →
          </Link>
          <Link to="/system-requirements" className="font-semibold text-[#7C3AED] hover:underline">
            View hardware &amp; peripheral requirements →
          </Link>
        </div>
      </section>

      {/* Data Privacy & Security Assurance */}
      <section className="my-8 p-5 rounded-squircle border border-slate-200/90 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
            <ShieldCheckIcon className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              100% Offline &amp; Private by Design
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
              All invoice data, customer directories, stock levels, and settings live strictly on your computer in SQLite. Zero cloud sync required.
            </p>
          </div>
        </div>
        <Link
          to="/security"
          className="text-xs font-semibold text-[#7C3AED] hover:underline shrink-0"
        >
          Read security whitepaper →
        </Link>
      </section>
    </PageContainer>
  );
}

export default DownloadPage;
