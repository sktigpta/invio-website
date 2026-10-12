import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';
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
    <A4DocLayout
      title="Invio Desktop Release Notes & Version History"
      subtitle="Official release documentation, verified distribution binaries, security bulletins, and hardware specifications • Published by Timrio • Last updated: October 2026"
    >
      {/* Quick Jump Navigation (Sticky below Navbar) */}
      <div className="sticky top-16 z-30 bg-[#f8fafc]/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 border-y border-slate-200/90 flex flex-wrap items-center gap-2 text-xs text-slate-600 my-4 shadow-2xs not-prose">
        <span className="font-semibold text-slate-900">Jump to:</span>
        <a href="#v1-0-2" className="text-[#7C3AED] hover:underline font-semibold flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#7C3AED]"></span>
          v1.0.2 (Latest)
        </a>
        <span>•</span>
        <a href="#v1-0-1" className="text-[#7C3AED] hover:underline font-medium">v1.0.1</a>
        <span>•</span>
        <a href="#v1-0-0" className="text-[#7C3AED] hover:underline font-medium">v1.0.0</a>
        <span>•</span>
        <a href="#print-specs" className="text-[#7C3AED] hover:underline font-medium">Print Specifications</a>
      </div>

      <p>
        This document provides the definitive change log, distribution manifests, security bulletins, and hardware compatibility specifications for the Invio desktop application on macOS, Windows, and Linux. All official release binaries are compiled directly from source and verified for offline production readiness.
      </p>

      {/* ========================================================================= */}
      {/* Version 1.0.2 - Current Latest Production Release */}
      {/* ========================================================================= */}
      <section id="v1-0-2" className="pt-4 scroll-mt-32">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-300">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900">
                1. Version 1.0.2 (Latest Production Release)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED]">
                Latest
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Released: October 12, 2026 • Tag: <code>v1.0.2</code> • Status: Production Verified
            </p>
          </div>

          <button
            type="button"
            onClick={() => openDownloadModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <DownloadIcon className="size-3.5" />
            <span>Download v1.0.2</span>
          </button>
        </div>

        <p className="mt-3">
          Version 1.0.2 is a major stability and security release delivering strict 4-digit email verification gating, robust multi-account state isolation, immediate subscription tier synchronization, and guaranteed dashboard startup navigation.
        </p>

        {/* Detailed Sections for v1.0.2 */}
        <div className="space-y-3 mt-3">
          <div className="p-3 bg-purple-50/50 border border-purple-200/70 rounded text-xs space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheckIcon className="size-4 text-[#7C3AED]" />
              <span>1.1 Security &amp; Email Verification Gates</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>
                <strong>Strict OTP Verification Gate:</strong> Unverified accounts are strictly barred from opening or creating invoices, billing workspaces, customer ledgers, or business settings until their 4-digit email code is verified.
              </li>
              <li>
                <strong>Fail-Closed Offline Security:</strong> If an unverified account attempts to access offline billing storage, the system strictly fails closed and returns the user to the verification view.
              </li>
              <li>
                <strong>OAuth Account Isolation:</strong> Google sign-in strictly separates newly registered email identities from pre-existing accounts to prevent unverified workspace takeovers.
              </li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <ZapIcon className="size-4 text-[#7C3AED]" />
              <span>1.2 Multi-Account Plan Isolation &amp; Entitlement Integrity</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>
                <strong>Instant Subscription Refresh:</strong> Resolved an issue where signing out of a paid account and logging in with a new account inadvertently retained the previous account&rsquo;s cached plan.
              </li>
              <li>
                <strong>Reactive Identity Context:</strong> The desktop UI now immediately flushes and refreshes user entitlements on identity changes, session teardown, and SQLite partition reloads.
              </li>
              <li>
                <strong>Strict Payment Signatures:</strong> Commercial Plus and Pro tiers are activated strictly upon receipt of verified payment signatures; default accounts remain on the Free offline tier.
              </li>
            </ul>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckIcon className="size-4 text-emerald-600" />
              <span>1.3 Navigation Hardening &amp; Startup Reset</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li>
                <strong>Consistent Dashboard Landing:</strong> Launching the application or completing authentication consistently routes the user to the Dashboard, preventing accidental retention of previous Settings views.
              </li>
              <li>
                <strong>Clean Storage Purge on Logout:</strong> Signing out flushes cached partition keys and auth tokens from memory and local storage, ensuring true multi-tenant isolation on shared computers.
              </li>
            </ul>
          </div>
        </div>

        {/* Compiled Distribution Packages Table */}
        <div className="mt-4 pt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Official Release Distribution Packages (v1.0.2)
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              8 Verified Platform Binaries
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded bg-white">
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-semibold">
                <tr>
                  <th className="py-2 px-3">Distribution File</th>
                  <th className="py-2 px-3">Architecture</th>
                  <th className="py-2 px-3">Format</th>
                  <th className="py-2 px-3">Size</th>
                  <th className="py-2 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {V102_ASSETS.map((asset, idx) => {
                  const IconComp = asset.icon;
                  return (
                    <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-2 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <IconComp className="size-3 text-slate-400 shrink-0" />
                          <span>{asset.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap text-slate-600">
                        {asset.arch}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap text-slate-500">
                        {asset.format}
                      </td>
                      <td className="py-2 px-3 whitespace-nowrap text-slate-600">
                        {asset.size}
                      </td>
                      <td className="py-2 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openDownloadModal(PLATFORM_DOWNLOADS[asset.platform])}
                          className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Download</span>
                          <DownloadIcon className="size-2.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Version 1.0.1 - Maintenance & Hardware Release */}
      {/* ========================================================================= */}
      <section id="v1-0-1" className="pt-6 border-t border-slate-200 scroll-mt-32">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900">
                2. Version 1.0.1 (Hardware &amp; POS Integration)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                Maintenance
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Released: October 7, 2026 • Tag: <code>v1.0.1</code>
            </p>
          </div>

          <button
            type="button"
            onClick={() => openDownloadModal()}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <DownloadIcon className="size-3" />
            <span>Download</span>
          </button>
        </div>

        <p className="mt-3">
          Introduced secondary dual-screen customer checkout displays, 58mm and 80mm ESC/POS raw thermal slip printing, dynamic UPI payment QR generation, and automated intra/inter-state GST tax splits.
        </p>

        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-700">
          <li>
            <strong>Dual-Screen Customer POS Display:</strong> Real-time checkout projection onto secondary HDMI or USB monitors showing line items, itemized discounts, taxes, and dynamic payment QR code.
          </li>
          <li>
            <strong>ESC/POS Thermal Slip Engine:</strong> Native raw driver communication for 58mm (2-inch) and 80mm (3-inch) thermal receipt printers without system dialog prompts.
          </li>
          <li>
            <strong>Barcode Scanner HID Integration:</strong> Automatic barcode reader detection with instantaneous catalog lookup and line quantity increments.
          </li>
          <li>
            <strong>Automated GST Splits:</strong> In-engine separation of intra-state transactions (CGST 50% + SGST 50%) and inter-state transactions (IGST 100%) based on customer place of supply.
          </li>
          <li>
            <strong>Encrypted Email Delivery:</strong> Direct dispatch of PDF invoices via Gmail OAuth or custom SMTP credentials stored in the OS cryptographic keychain.
          </li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* Version 1.0.0 - Initial Production Launch */}
      {/* ========================================================================= */}
      <section id="v1-0-0" className="pt-6 border-t border-slate-200 scroll-mt-32">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900">
                3. Version 1.0.0 (Initial Production Launch)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                Initial
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Released: October 2, 2026 • Tag: <code>v1.0.0</code>
            </p>
          </div>

          <button
            type="button"
            onClick={() => openDownloadModal()}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold rounded transition-colors cursor-pointer"
          >
            <DownloadIcon className="size-3" />
            <span>Download</span>
          </button>
        </div>

        <p className="mt-3">
          Foundational release of Invio desktop invoicing for Windows, macOS, and Linux. Built from the ground up for 100% offline local billing with zero mandatory cloud dependencies.
        </p>

        <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-700">
          <li>
            <strong>Embedded SQLite Storage Engine:</strong> Invoices, products, and customer records reside exclusively in a local database partition in your user application directory.
          </li>
          <li>
            <strong>Vector A4 &amp; A5 PDF Generator:</strong> High-resolution vector document rendering with custom store logos, bank account details, and terms.
          </li>
          <li>
            <strong>Inventory Catalog &amp; Low-Stock Warnings:</strong> Product stock tracking, barcode SKU index, and real-time inventory ledger adjustments.
          </li>
          <li>
            <strong>Customer Ledger &amp; Tax Identifiers:</strong> Contact management with GSTIN validation, historical invoice trails, and credit tracking.
          </li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* Printing Specifications Table */}
      {/* ========================================================================= */}
      <section id="print-specs" className="pt-6 border-t border-slate-200 scroll-mt-32">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <PrinterIcon className="size-4 text-[#7C3AED]" />
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900">
            4. Supported Invoice Paper &amp; Printing Specifications
          </h2>
        </div>

        <p className="mt-3">
          Invio natively renders and prints across standard laser/inkjet sheet paper and specialized continuous roll thermal receipt hardware:
        </p>

        <div className="overflow-x-auto border border-slate-200 rounded bg-white mt-3">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-semibold">
              <tr>
                <th className="py-2 px-3">Format</th>
                <th className="py-2 px-3">Dimensions</th>
                <th className="py-2 px-3">Hardware Type</th>
                <th className="py-2 px-3">Typical Application</th>
                <th className="py-2 px-3 text-right">Rendering Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">A4 Full Page</td>
                <td className="py-2 px-3 whitespace-nowrap">210 × 297 mm</td>
                <td className="py-2 px-3 whitespace-nowrap">Laser / Inkjet / PDF</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">B2B Tax Invoices, GST Filings, Detailed Quotes</td>
                <td className="py-2 px-3 text-right font-semibold text-emerald-700 whitespace-nowrap">Vector PDF &amp; Print</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">A5 Half Page</td>
                <td className="py-2 px-3 whitespace-nowrap">148 × 210 mm</td>
                <td className="py-2 px-3 whitespace-nowrap">Laser, Inkjet, Dot-Matrix</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Wholesale slips, Delivery challans, Compact bills</td>
                <td className="py-2 px-3 text-right font-semibold text-emerald-700 whitespace-nowrap">Vector PDF &amp; Print</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">80mm Thermal</td>
                <td className="py-2 px-3 whitespace-nowrap">80 mm roll (3-inch)</td>
                <td className="py-2 px-3 whitespace-nowrap">ESC/POS Thermal Receipt Printers</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Retail checkout, Supermarkets, Restaurants</td>
                <td className="py-2 px-3 text-right font-semibold text-purple-700 whitespace-nowrap">Raw ESC/POS Commands</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">58mm Thermal</td>
                <td className="py-2 px-3 whitespace-nowrap">58 mm roll (2-inch)</td>
                <td className="py-2 px-3 whitespace-nowrap">Bluetooth / USB Mini Thermal Printers</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Kiosks, Mobile sales, Compact counters</td>
                <td className="py-2 px-3 text-right font-semibold text-purple-700 whitespace-nowrap">Raw ESC/POS Commands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Security Architecture Summary */}
      {/* ========================================================================= */}
      <section className="pt-6 border-t border-slate-200">
        <h2 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900 pb-1">
          5. Binary Verification &amp; Security Baseline
        </h2>
        <p>
          All Invio desktop installers are built under strict security constraints: Electron <code>contextIsolation: true</code> is enforced, <code>nodeIntegration: false</code> is strictly guaranteed, all inter-process communications (IPC) are schema-validated, and credentials are protected by the host operating system&rsquo;s cryptographic key storage via Electron <code>safeStorage</code>.
        </p>
        <p className="mt-2 text-slate-500">
          For technical security inquiries or vulnerability disclosure, consult our <a href="/security" className="text-[#7C3AED] underline font-semibold">Security Architecture Document</a> or contact <a href="mailto:support@timrio.com" className="text-slate-900 font-semibold underline">support@timrio.com</a>.
        </p>
      </section>
    </A4DocLayout>
  );
}

export default ChangelogPage;
