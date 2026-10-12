import { useEffect, useState } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { useDownloadModal } from '../context/DownloadModalContext';
import { PLATFORM_DOWNLOADS } from '../utils/osDetector';
import {
  DownloadIcon,
  CheckIcon,
  ShieldCheckIcon,
  ZapIcon,
  PrinterIcon,
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
} from '../components/Icons';

export function ChangelogPage() {
  const { openDownloadModal } = useDownloadModal();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    applySEO('changelog');
    window.scrollTo(0, 0);
  }, []);

  const V102_ASSETS = [
    { name: 'Invio-1.0.2-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Apple Disk Image (.dmg)', size: '128.8 MB', platform: 'mac', icon: AppleIcon },
    { name: 'Invio-1.0.2-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Archive (.zip)', size: '126.9 MB', platform: 'mac', icon: AppleIcon },
    { name: 'Invio-1.0.2-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Apple Disk Image (.dmg)', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
    { name: 'Invio-1.0.2-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Archive (.zip)', size: '131.5 MB', platform: 'mac', icon: AppleIcon },
    { name: 'Invio-1.0.2-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'NSIS Installer (.exe)', size: '111.1 MB', platform: 'windows', icon: WindowsIcon },
    { name: 'Invio-1.0.2-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Standalone Portable (.exe)', size: '110.9 MB', platform: 'windows', icon: WindowsIcon },
    { name: 'Invio-1.0.2-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '125.4 MB', platform: 'linux', icon: LinuxIcon },
    { name: 'Invio-1.0.2-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package (.deb)', size: '100.2 MB', platform: 'linux', icon: LinuxIcon },
  ];

  return (
    <PageContainer
      badge="Release Notes & Version History"
      title="Invio Desktop Releases"
      subtitle="Discover all new features, security hardening, multi-platform binaries, and hardware integrations across every production release of Invio."
    >
      {/* Quick Jump Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <a
          href="#v1-0-2"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-[#7C3AED] hover:bg-purple-200 transition-colors"
        >
          <span className="size-1.5 rounded-full bg-[#7C3AED] animate-pulse"></span>
          v1.0.2 (Latest)
        </a>
        <a
          href="#v1-0-1"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          v1.0.1
        </a>
        <a
          href="#v1-0-0"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          v1.0.0 (Initial)
        </a>
        <a
          href="#print-specs"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          <PrinterIcon className="size-3" />
          Print Specifications
        </a>
      </div>

      <div className="space-y-10 my-6">
        {/* ========================================================================= */}
        {/* Version 1.0.2 - Current Latest Production Release */}
        {/* ========================================================================= */}
        <article id="v1-0-2" className="p-6 sm:p-8 rounded-squircle border-2 border-[#7C3AED]/40 bg-white shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

          {/* Release Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Invio Version 1.0.2
                </h2>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-3 py-1 rounded-full shadow-2xs">
                  <span className="size-1.5 rounded-full bg-[#7C3AED] animate-ping"></span>
                  Latest Production Release
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-mono flex flex-wrap items-center gap-2">
                <span>Released: October 12, 2026</span>
                <span>•</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">Build v1.0.2</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckIcon className="size-3" /> Production Verified
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => openDownloadModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <DownloadIcon className="size-4" />
              <span>Download v1.0.2</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-medium">
            Invio Desktop v1.0.2 delivers vital authentication reliability improvements, multi-account state isolation, strict 4-digit email verification gates, and guaranteed dashboard startup navigation.
          </p>

          {/* Categorized Detailed Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Column 1: Security & Verification */}
            <div className="p-4 sm:p-5 rounded-squircle-sm bg-purple-50/40 border border-purple-100/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-purple-100 text-[#7C3AED]">
                  <ShieldCheckIcon className="size-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Security &amp; OTP Gates
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Strict OTP Verification:</strong> Unverified accounts cannot access local billing workspaces, invoices, or customer data until 4-digit email code is verified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Offline Session Hardening:</strong> Unverified sessions are rejected even during offline transitions; system strictly fails closed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>OAuth Workflow Isolation:</strong> Google sign-in strictly separates account creation from existing user sign-in to prevent unverified takeovers.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Multi-Account & Plan Sync */}
            <div className="p-4 sm:p-5 rounded-squircle-sm bg-purple-50/40 border border-purple-100/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-purple-100 text-[#7C3AED]">
                  <ZapIcon className="size-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Multi-Account &amp; Plans
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Instant Plan Refresh:</strong> Resolved an issue where logging out and switching to a new account retained the previous user's subscription plan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Reactive Context Synchronization:</strong> Client immediately refreshes on both auth identity change and SQLite partition reload events.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Default Plan Integrity:</strong> Default plan is strictly set to Free; Plus and Pro tiers require verified payment signatures.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation & UX */}
            <div className="p-4 sm:p-5 rounded-squircle-sm bg-purple-50/40 border border-purple-100/80">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-purple-100 text-[#7C3AED]">
                  <CheckIcon className="size-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Navigation &amp; UI Polish
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Dashboard Startup Reset:</strong> Launching the app or signing in now consistently lands on Dashboard instead of lingering on Settings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Clean Cache Purge:</strong> Cached partition pointers and user tokens are purged on logout to guarantee clean tenant isolation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                  <span><strong>Informative Alerts:</strong> Clear toast notifications when sessions expire or sign-outs complete.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Compiled Distribution Packages Table */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Production Distribution Packages for v1.0.2:
                </h4>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Native standalone installers &amp; automatic in-app updater manifests
                </p>
              </div>
              <span className="text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200/60 px-2.5 py-1 rounded-md self-start sm:self-auto">
                8 Platform Binaries
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-squircle-sm bg-white">
              <table className="w-full text-left font-mono text-[11px] sm:text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="px-3.5 py-2.5 font-semibold">Distribution File</th>
                    <th className="px-3.5 py-2.5 font-semibold">Platform &amp; Architecture</th>
                    <th className="px-3.5 py-2.5 font-semibold">Package Format</th>
                    <th className="px-3.5 py-2.5 font-semibold">File Size</th>
                    <th className="px-3.5 py-2.5 font-semibold text-right">Direct Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {V102_ASSETS.map((asset, idx) => {
                    const IconComp = asset.icon;
                    return (
                      <tr key={idx} className="hover:bg-purple-50/25 transition-colors">
                        <td className="px-3.5 py-2.5 text-slate-900 font-semibold whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <IconComp className="size-3.5 text-slate-400 shrink-0" />
                            <span>{asset.name}</span>
                          </div>
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-medium">
                            {asset.arch}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                          {asset.format}
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap font-medium">
                          {asset.size}
                        </td>
                        <td className="px-3.5 py-2.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => openDownloadModal(PLATFORM_DOWNLOADS[asset.platform])}
                            className="inline-flex items-center gap-1 font-semibold text-[#7C3AED] hover:text-[#6D28D9] hover:underline cursor-pointer"
                          >
                            <span>Download</span>
                            <DownloadIcon className="size-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* Version 1.0.1 - Hardware & Dual Screen POS */}
        {/* ========================================================================= */}
        <article id="v1-0-1" className="p-6 sm:p-7 rounded-squircle border border-slate-200/90 bg-white shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Invio Version 1.0.1
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                  Maintenance Release
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Released: October 7, 2026 • Tag: <code>v1.0.1</code>
              </p>
            </div>

            <button
              type="button"
              onClick={() => openDownloadModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              <DownloadIcon className="size-3" />
              <span>Download v1.0.1</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Added secondary dual-screen customer checkout displays, 58mm &amp; 80mm ESC/POS hardware thermal slip printing, dynamic UPI payment QR codes, and multi-tenant email integrations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
            <div className="p-3.5 rounded-squircle-sm bg-slate-50/60 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Features &amp; Hardware</h4>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Dual-Screen POS Customer Display:</strong> Project real-time cart items, tax breakdown, and instant UPI QR code onto any secondary monitor.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>ESC/POS Thermal Slip Printing:</strong> Native raw driver support for 58mm (2-inch) and 80mm (3-inch) thermal receipt printers.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Hardware Barcode Scanning:</strong> USB &amp; Bluetooth HID scanner integration with automatic quantity incrementing.</span>
              </p>
            </div>

            <div className="p-3.5 rounded-squircle-sm bg-slate-50/60 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Taxes &amp; Integrations</h4>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Automated GST Splits:</strong> Automatic intra-state (CGST 50% + SGST 50%) and inter-state (IGST 100%) tax calculation.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>OAuth &amp; SMTP Email Dispatch:</strong> 1-click Google OAuth and custom SMTP relay with encrypted local credential storage.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>UPI Payment QR:</strong> Dynamic payment string encoding on receipts for instant merchant settlement.</span>
              </p>
            </div>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* Version 1.0.0 - Initial Production Launch */}
        {/* ========================================================================= */}
        <article id="v1-0-0" className="p-6 sm:p-7 rounded-squircle border border-slate-200/90 bg-white shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Invio Version 1.0.0
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                  Initial Launch
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Released: October 2, 2026 • Tag: <code>v1.0.0</code>
              </p>
            </div>

            <button
              type="button"
              onClick={() => openDownloadModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              <DownloadIcon className="size-3" />
              <span>Download v1.0.0</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Foundational release of Invio desktop invoicing for Windows, macOS, and Linux. Built from the ground up for 100% offline billing with zero cloud dependency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-3.5 rounded-squircle-sm bg-slate-50/60 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Core Invoicing</h4>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Embedded Local SQLite Engine:</strong> Invoices, customers, and inventory remain strictly local on your computer.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Vector A4 &amp; A5 PDF Generator:</strong> High-resolution vector PDF export with business logo and custom bank details.</span>
              </p>
            </div>

            <div className="p-3.5 rounded-squircle-sm bg-slate-50/60 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inventory &amp; Contacts</h4>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Catalog &amp; Stock Tracking:</strong> Product SKU directory, stock level management, and automated low-stock badges.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#7C3AED] font-bold shrink-0">•</span>
                <span><strong>Customer Management:</strong> Customer ledger, GSTIN verification, and multi-format contact records.</span>
              </p>
            </div>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* Supported Invoice & Printing Specifications Markdown Table */}
        {/* ========================================================================= */}
        <section id="print-specs" className="p-6 sm:p-7 rounded-squircle border border-slate-200/90 bg-white shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Supported Invoice Paper &amp; Print Specifications:
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Native A4 vector rendering • Hardware ESC/POS integration
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200/90 rounded-squircle-sm bg-white">
            <table className="w-full text-left font-mono text-[11px] sm:text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="px-3.5 py-2.5 font-semibold">Format</th>
                  <th className="px-3.5 py-2.5 font-semibold">Paper Dimensions</th>
                  <th className="px-3.5 py-2.5 font-semibold">Hardware Type</th>
                  <th className="px-3.5 py-2.5 font-semibold">Typical Use Case</th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">Output Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2.5 text-slate-900 font-semibold whitespace-nowrap">
                    A4 Full Page
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">210 × 297 mm</td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">Laser / Inkjet / PDF</td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    B2B Tax Invoices, GST Filings, Detailed Quotations
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-emerald-700 whitespace-nowrap">
                    Vector PDF &amp; Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2.5 text-slate-900 font-semibold whitespace-nowrap">
                    A5 Half Page
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">148 × 210 mm</td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">Laser, Inkjet, Dot-Matrix</td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    Wholesale bills, Delivery challans, Compact memos
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-emerald-700 whitespace-nowrap">
                    Vector PDF &amp; Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2.5 text-slate-900 font-semibold whitespace-nowrap">
                    80mm Thermal Slip
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">80 mm roll (3-inch)</td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">ESC/POS Thermal Receipt Printers</td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    Supermarkets, Grocery counters, Dine-in POS receipts
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-purple-700 whitespace-nowrap">
                    Direct ESC/POS Raw Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2.5 text-slate-900 font-semibold whitespace-nowrap">
                    58mm Thermal Slip
                  </td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">58 mm roll (2-inch)</td>
                  <td className="px-3.5 py-2.5 whitespace-nowrap">Bluetooth / USB Mini Thermal</td>
                  <td className="px-3.5 py-2.5 text-slate-500 whitespace-nowrap">
                    Small kiosks, Mobile vans, Quick billing counters
                  </td>
                  <td className="px-3.5 py-2.5 text-right font-semibold text-purple-700 whitespace-nowrap">
                    Direct ESC/POS Raw Print
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <DownloadCta
        title="Download Invio Desktop (Version 1.0.2)"
        subtitle="Experience instant offline billing, thermal receipt printing, and customer displays."
      />
    </PageContainer>
  );
}

export default ChangelogPage;
