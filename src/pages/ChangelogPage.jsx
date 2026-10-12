import { useEffect, useState, useCallback } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';
import { useDownloadModal } from '../context/DownloadModalContext';
import { PLATFORM_DOWNLOADS, API_BASE_URL } from '../utils/osDetector';
import {
  DownloadIcon,
  PrinterIcon,
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
} from '../components/Icons';

const RELEASES_METADATA = [
  {
    tag: 'v1.0.2',
    anchorId: 'v1-0-2',
    name: 'Version 1.0.2 (Latest Production Release)',
    date: 'October 12, 2026',
    isLatest: true,
    assets: [
      { name: 'Invio-1.0.2-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Disk Image (.dmg)', size: '128.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update (.zip)', size: '126.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Disk Image (.dmg)', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update (.zip)', size: '131.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'NSIS Setup (.exe)', size: '111.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.2-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable (.exe)', size: '110.9 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.2-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '125.4 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.2-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package (.deb)', size: '100.2 MB', platform: 'linux', icon: LinuxIcon },
    ],
    fallbackNotes: `### Security & OTP Verification Gates
- **Strict OTP Verification Gate:** Unverified user accounts are strictly barred from opening or creating invoices, billing workspaces, customer ledgers, or business settings until their 4-digit email code is verified.
- **Fail-Closed Offline Security:** If an unverified session attempts to access local offline billing storage, the system strictly fails closed and prompts for code verification.
- **OAuth Identity Isolation:** Google sign-in strictly separates newly registered email identities from pre-existing accounts to prevent unverified workspace takeovers.

### Multi-Account Plan Isolation & Entitlements
- **Instant Plan Refresh:** Resolved an issue where signing out of a paid account and logging in with a new account inadvertently retained the previous account's cached subscription tier.
- **Reactive Identity Context:** The desktop UI immediately flushes and re-syncs user entitlements on identity changes, session teardown, and SQLite partition reload events.
- **Strict Payment Signatures:** Plus and Pro tiers are activated strictly upon receipt of verified payment signatures; default accounts remain on the Free offline tier.

### Navigation Hardening & Startup Reset
- **Consistent Dashboard Landing:** Launching the application or completing authentication consistently routes the user to the Dashboard, preventing accidental retention of previous Settings views.
- **Clean Storage Purge on Logout:** Signing out purges cached partition pointers and authentication tokens from memory and local storage, ensuring true multi-tenant isolation on shared computers.`,
  },
  {
    tag: 'v1.0.1',
    anchorId: 'v1-0-1',
    name: 'Version 1.0.1 (Hardware & POS Integration)',
    date: 'October 7, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.1-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Disk Image (.dmg)', size: '127.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.1-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'NSIS Setup (.exe)', size: '109.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.1-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '124.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    fallbackNotes: `### Features & Hardware
- **Dual-Screen Customer POS Display:** Real-time checkout projection onto secondary HDMI or USB monitors showing line items, itemized discounts, taxes, and dynamic payment QR code.
- **ESC/POS Thermal Slip Engine:** Native raw driver communication for 58mm (2-inch) and 80mm (3-inch) thermal receipt printers without system dialog prompts.
- **Barcode Scanner HID Integration:** Automatic barcode reader detection with instantaneous catalog lookup and line quantity increments.

### Taxes & Email Integrations
- **Automated GST Splits:** In-engine separation of intra-state transactions (CGST 50% + SGST 50%) and inter-state transactions (IGST 100%) based on customer place of supply.
- **Encrypted Email Delivery:** Direct dispatch of PDF invoices via Gmail OAuth or custom SMTP credentials stored in the OS cryptographic keychain.
- **Dynamic UPI Payment QR:** Generates standard merchant UPI QR payment strings on customer bills for instant smartphone settlement.`,
  },
  {
    tag: 'v1.0.0',
    anchorId: 'v1-0-0',
    name: 'Version 1.0.0 (Initial Production Launch)',
    date: 'October 2, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.0-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Disk Image (.dmg)', size: '126.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.0-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'NSIS Setup (.exe)', size: '108.2 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.0-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '122.9 MB', platform: 'linux', icon: LinuxIcon },
    ],
    fallbackNotes: `### Core Billing Architecture
- **Embedded SQLite Storage Engine:** Invoices, products, and customer records reside exclusively in a local database partition in your user application directory.
- **Vector A4 & A5 PDF Generator:** High-resolution vector document rendering with custom store logos, bank account details, and terms.
- **Inventory Catalog & Low-Stock Warnings:** Product stock tracking, barcode SKU index, and real-time inventory ledger adjustments.
- **Customer Ledger & Tax Identifiers:** Contact management with GSTIN validation, historical invoice trails, and credit tracking.`,
  },
];

/**
 * Lightweight pure-React Markdown renderer without external dependencies.
 * Formats headings, bullets, bold text, code, and removes private repository URLs.
 */
function renderMarkdown(mdText) {
  if (!mdText) return null;
  const lines = mdText.split('\n');
  const elements = [];
  let currentList = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="list-disc pl-5 space-y-1.5 my-2 text-slate-700">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (text) => {
    let sanitized = text.replace(/\[([^\]]+)\]\((https:\/\/github\.com[^\)]+)\)/g, '$1');
    const parts = sanitized.split(/(\*\*.*?\*\*|`.*?`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-purple-700 font-mono text-[11px]">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3 pb-1">
          {formatInline(trimmed.replace('### ', ''))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-sm font-bold uppercase tracking-tight text-slate-900 pt-3 pb-1">
          {formatInline(trimmed.replace(/^#+\s*/, ''))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
      continue;
    }

    flushList();
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed text-slate-700 my-1.5">
        {formatInline(trimmed)}
      </p>
    );
  }

  flushList();
  return elements;
}

export function ChangelogPage() {
  const { openDownloadModal } = useDownloadModal();

  // Dynamic release notes cache: { [tag]: string }
  const [notesCache, setNotesCache] = useState({});
  const [loadingTag, setLoadingTag] = useState(null);

  useEffect(() => {
    applySEO('changelog');
    window.scrollTo(0, 0);
  }, []);

  /**
   * Fetch release notes dynamically from release feeds.
   */
  const loadReleaseNotes = useCallback(async (tag) => {
    if (notesCache[tag]) return;

    setLoadingTag(tag);
    let fetchedNotes = null;

    // 1. Try public GitHub releases API endpoint
    try {
      const ghRes = await fetch(`https://api.github.com/repos/sktigpta/invio-desktop/releases/tags/${tag}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      });
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        if (ghData.body && ghData.body.trim()) {
          fetchedNotes = ghData.body;
        }
      }
    } catch {
      // Fall through to backend proxy
    }

    // 2. Try Backend releases metadata proxy
    if (!fetchedNotes) {
      try {
        const backendRes = await fetch(`${API_BASE_URL}/api/download/meta/releases`);
        if (backendRes.ok) {
          const bData = await backendRes.json();
          const match = bData.releases?.find((r) => r.tag === tag || r.version === tag.replace(/^v/, ''));
          if (match?.notes && match.notes.trim()) {
            fetchedNotes = match.notes;
          }
        }
      } catch {
        // Fall through
      }
    }

    // 3. Try Backend latest release endpoint if tag is v1.0.2
    if (!fetchedNotes && tag === 'v1.0.2') {
      try {
        const latestRes = await fetch(`${API_BASE_URL}/api/download/meta/latest`);
        if (latestRes.ok) {
          const lData = await latestRes.json();
          if (lData.notes && lData.notes.trim()) {
            fetchedNotes = lData.notes;
          }
        }
      } catch {
        // Fall through
      }
    }

    // 4. Fallback to local structured notes if remote unavailable
    if (!fetchedNotes) {
      const fallbackItem = RELEASES_METADATA.find((v) => v.tag === tag);
      if (fallbackItem) {
        fetchedNotes = fallbackItem.fallbackNotes;
      }
    }

    setNotesCache((prev) => ({
      ...prev,
      [tag]: fetchedNotes || 'Release notes currently unavailable.',
    }));
    setLoadingTag(null);
  }, [notesCache]);

  // Load notes on mount
  useEffect(() => {
    RELEASES_METADATA.forEach((rel) => {
      loadReleaseNotes(rel.tag);
    });
  }, [loadReleaseNotes]);

  return (
    <A4DocLayout
      title="Invio Desktop Release Notes & Version History"
      subtitle="Official release documentation, verified distribution binaries, security bulletins, and hardware specifications • Published by Timrio • Last updated: October 2026"
    >
      {/* Quick Jump Navigation (Clean Hypertext, Sticky below Navbar, No Borders) */}
      <div className="sticky top-16 z-30 bg-[#f8fafc]/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 flex flex-wrap items-center gap-2 text-xs text-slate-600 my-4 shadow-2xs not-prose">
        <span className="font-semibold text-slate-900">Jump to:</span>
        <a
          href="#v1-0-2"
          className="text-[#7C3AED] underline hover:text-[#6D28D9] font-semibold flex items-center gap-1"
        >
          <span className="size-1.5 rounded-full bg-[#7C3AED]"></span>
          <span>v1.0.2 (Latest)</span>
        </a>
        <span className="text-slate-300">•</span>
        <a
          href="#v1-0-1"
          className="text-[#7C3AED] underline hover:text-[#6D28D9] font-medium"
        >
          v1.0.1
        </a>
        <span className="text-slate-300">•</span>
        <a
          href="#v1-0-0"
          className="text-[#7C3AED] underline hover:text-[#6D28D9] font-medium"
        >
          v1.0.0
        </a>
        <span className="text-slate-300">•</span>
        <a
          href="#print-specs"
          className="text-[#7C3AED] underline hover:text-[#6D28D9] font-medium"
        >
          Print Specifications
        </a>
      </div>

      <p className="text-slate-600">
        This document provides the definitive change log, distribution manifests, security bulletins, and hardware compatibility specifications for the Invio desktop application on macOS, Windows, and Linux. All official release binaries are compiled directly from source and verified for offline production readiness.
      </p>

      {/* Release Sections (Clean Document Style, Scroll Margins, No Harsh Borders) */}
      {RELEASES_METADATA.map((rel, index) => (
        <section
          key={rel.tag}
          id={rel.anchorId}
          className="pt-6 scroll-mt-32 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold uppercase tracking-tight text-slate-900">
                  {index + 1}. {rel.name}
                </h2>
                {rel.isLatest && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED]">
                    Latest
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Released: {rel.date} • Tag: <code>{rel.tag}</code> • Status: Production Verified
              </p>
            </div>

            <button
              type="button"
              onClick={() => openDownloadModal()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <DownloadIcon className="size-3.5" />
              <span>Download {rel.tag}</span>
            </button>
          </div>

          {/* Dynamic Release Notes Content */}
          <div className="text-xs leading-relaxed text-slate-800 space-y-1">
            {loadingTag === rel.tag && !notesCache[rel.tag] ? (
              <div className="py-4 flex items-center gap-2 text-slate-400 text-xs">
                <div className="size-4 rounded-full border-2 border-slate-300 border-t-[#7C3AED] animate-spin" />
                <span>Loading release notes...</span>
              </div>
            ) : (
              renderMarkdown(notesCache[rel.tag] || rel.fallbackNotes)
            )}
          </div>

          {/* Verified Binaries Table */}
          {rel.assets && rel.assets.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Distribution Binaries ({rel.tag})
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  {rel.assets.length} Verified Platform Packages
                </span>
              </div>

              <div className="overflow-x-auto rounded bg-white shadow-2xs">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead className="bg-slate-100/70 text-slate-800 font-semibold">
                    <tr>
                      <th className="py-2 px-3">Distribution File</th>
                      <th className="py-2 px-3">Target Architecture</th>
                      <th className="py-2 px-3">Package Format</th>
                      <th className="py-2 px-3">Size</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {rel.assets.map((asset, idx) => {
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
          )}
        </section>
      ))}

      {/* Hardware Printing Specifications Section */}
      <section id="print-specs" className="pt-6 scroll-mt-32 space-y-3">
        <div className="flex items-center gap-2 pb-1">
          <PrinterIcon className="size-4 text-[#7C3AED]" />
          <h2 className="text-base font-bold uppercase tracking-tight text-slate-900">
            4. Supported Invoice Paper &amp; Printing Specifications
          </h2>
        </div>

        <p className="text-slate-600">
          Invio natively renders and prints across standard laser/inkjet sheet paper and specialized continuous roll thermal receipt hardware:
        </p>

        <div className="overflow-x-auto rounded bg-white shadow-2xs mt-2">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead className="bg-slate-100/70 text-slate-800 font-semibold">
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

      {/* Security Baseline Note */}
      <section className="pt-6 space-y-1.5 text-slate-600">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          5. Binary Verification &amp; Security Baseline
        </h3>
        <p>
          All Invio desktop installers enforce Electron <code>contextIsolation: true</code>, strictly disable <code>nodeIntegration: false</code>, validate all IPC payloads, and secure email credentials inside the OS cryptographic keychain via <code>safeStorage</code>.
        </p>
      </section>
    </A4DocLayout>
  );
}

export default ChangelogPage;
