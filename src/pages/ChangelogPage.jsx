import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { useDownloadModal } from '../context/DownloadModalContext';
import { PLATFORM_DOWNLOADS } from '../utils/osDetector';
import {
  DownloadIcon,
  ExternalLinkIcon,
} from '../components/Icons';

export function ChangelogPage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('changelog');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Release Notes &amp; Changelog"
      title="Invio Releases &amp; Version History"
      subtitle="Track all improvements, performance optimizations, and feature additions across releases of the Invio desktop application. Built and verified via GitHub Actions CI."
    >
      <div className="space-y-6 my-8">
        {/* Version 1.0.2 - Current Latest Release */}
        <article className="p-6 sm:p-7 rounded-squircle border-2 border-[#7C3AED]/40 bg-white shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Invio Version 1.0.2
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-2.5 py-0.5 rounded-full">
                  Latest Production Release
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Released: October 2026 • Tag: <code>v1.0.2</code>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openDownloadModal()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-xs"
              >
                <DownloadIcon className="size-3.5" />
                <span>Download v1.0.2</span>
              </button>
              <a
                href="https://github.com/sktigpta/invio-desktop/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                <span>GitHub</span>
                <ExternalLinkIcon className="size-3" />
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            Multi-platform desktop invoicing update featuring dual-screen customer checkout displays, dynamic UPI QR code receipts, full-page A4 PDF tax invoicing, and calculation engine hardening.
          </p>

          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
            Key Changes &amp; Improvements:
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Dual-Screen POS Customer Display:</strong> Secondary monitor projection showing live cart items and instant UPI payment QR.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>ESC/POS Thermal Paper Printing:</strong> Full compatibility with 58mm (2-inch) and 80mm (3-inch) thermal slip printers.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Full-Page A4 &amp; A5 PDF Tax Invoicing:</strong> High-resolution vector PDF printing with GST breakdown, logo branding, and bank details.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Dynamic UPI Payment QR Codes:</strong> Automated generation of merchant UPI QR codes with exact bill amounts directly on receipts.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Automated GST Tax Engine:</strong> Instant CGST, SGST, and IGST tax splits across all standard tax slabs.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Hardware Barcode Gun Integration:</strong> Real-time HID scanning with automatic quantity incrementation.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>100% Offline Local SQLite Privacy:</strong> All invoices, customers, and stock remain on your computer with zero cloud telemetry.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-[#7C3AED] font-bold shrink-0 select-none">✓</span>
              <span><strong>Verified Release Binaries:</strong> Signed and checksummed packages distributed via GitHub Actions CI pipeline.</span>
            </p>
          </div>

          {/* Compiled Assets Markdown-Style Table */}
          <div className="pt-5 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Compiled Assets Attached to v1.0.2:
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                Verified binaries • GitHub Actions CI
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200/90 rounded-squircle-sm bg-white">
              <table className="w-full text-left font-mono text-[11px] sm:text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="px-3.5 py-2 font-semibold">Asset File</th>
                    <th className="px-3.5 py-2 font-semibold">Platform / Arch</th>
                    <th className="px-3.5 py-2 font-semibold">Package Type</th>
                    <th className="px-3.5 py-2 font-semibold">Size</th>
                    <th className="px-3.5 py-2 font-semibold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {[
                    { name: 'Invio-1.0.2-win-x64.exe', size: '113.9 MB', arch: 'Windows x64', type: 'Installer (.exe)', platform: 'windows' },
                    { name: 'Invio-1.0.2-win-x64-portable.exe', size: '113.8 MB', arch: 'Windows Portable', type: 'Portable (.exe)', platform: 'windows' },
                    { name: 'Invio-1.0.2-mac-arm64.dmg', size: '133.3 MB', arch: 'Apple Silicon', type: 'Disk Image (.dmg)', platform: 'mac' },
                    { name: 'Invio-1.0.2-mac-x64.dmg', size: '139.6 MB', arch: 'macOS Intel', type: 'Disk Image (.dmg)', platform: 'mac' },
                    { name: 'Invio-1.0.2-linux-x86_64.AppImage', size: '130.1 MB', arch: 'Linux x86_64', type: 'AppImage', platform: 'linux' },
                    { name: 'Invio-1.0.2-linux-amd64.deb', size: '102.3 MB', arch: 'Debian / Ubuntu', type: 'Debian (.deb)', platform: 'linux' },
                  ].map((asset, idx) => (
                    <tr key={idx} className="hover:bg-purple-50/20 transition-colors">
                      <td className="px-3.5 py-2 text-slate-900 font-semibold whitespace-nowrap">
                        {asset.name}
                      </td>
                      <td className="px-3.5 py-2 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {asset.arch}
                        </span>
                      </td>
                      <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                        {asset.type}
                      </td>
                      <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                        {asset.size}
                      </td>
                      <td className="px-3.5 py-2 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openDownloadModal(PLATFORM_DOWNLOADS[asset.platform])}
                          className="inline-flex items-center gap-1 font-semibold text-[#7C3AED] hover:underline cursor-pointer"
                        >
                          <span>Download</span>
                          <DownloadIcon className="size-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        {/* Supported Invoice & Printing Specifications Markdown Table */}
        <section className="p-6 sm:p-7 rounded-squircle border border-slate-200/90 bg-white shadow-2xs">
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
                  <th className="px-3.5 py-2 font-semibold">Format</th>
                  <th className="px-3.5 py-2 font-semibold">Paper Dimensions</th>
                  <th className="px-3.5 py-2 font-semibold">Hardware Type</th>
                  <th className="px-3.5 py-2 font-semibold">Typical Use Case</th>
                  <th className="px-3.5 py-2 font-semibold text-right">Output Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2 text-slate-900 font-semibold whitespace-nowrap">
                    A4 Full Page
                  </td>
                  <td className="px-3.5 py-2 whitespace-nowrap">210 × 297 mm</td>
                  <td className="px-3.5 py-2 whitespace-nowrap">Laser / Inkjet / PDF</td>
                  <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                    B2B Tax Invoices, GST Filings, Detailed Quotations
                  </td>
                  <td className="px-3.5 py-2 text-right font-semibold text-emerald-700 whitespace-nowrap">
                    Vector PDF &amp; Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2 text-slate-900 font-semibold whitespace-nowrap">
                    A5 Half Page
                  </td>
                  <td className="px-3.5 py-2 whitespace-nowrap">148 × 210 mm</td>
                  <td className="px-3.5 py-2 whitespace-nowrap">Laser, Inkjet, Dot-Matrix</td>
                  <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                    Wholesale bills, Delivery challans, Compact memos
                  </td>
                  <td className="px-3.5 py-2 text-right font-semibold text-emerald-700 whitespace-nowrap">
                    Vector PDF &amp; Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2 text-slate-900 font-semibold whitespace-nowrap">
                    80mm Thermal Slip
                  </td>
                  <td className="px-3.5 py-2 whitespace-nowrap">80 mm roll (3-inch)</td>
                  <td className="px-3.5 py-2 whitespace-nowrap">ESC/POS Thermal Receipt Printers</td>
                  <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                    Supermarkets, Grocery counters, Dine-in POS receipts
                  </td>
                  <td className="px-3.5 py-2 text-right font-semibold text-purple-700 whitespace-nowrap">
                    Direct ESC/POS Raw Print
                  </td>
                </tr>
                <tr className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-3.5 py-2 text-slate-900 font-semibold whitespace-nowrap">
                    58mm Thermal Slip
                  </td>
                  <td className="px-3.5 py-2 whitespace-nowrap">58 mm roll (2-inch)</td>
                  <td className="px-3.5 py-2 whitespace-nowrap">Bluetooth / USB Mini Thermal</td>
                  <td className="px-3.5 py-2 text-slate-500 whitespace-nowrap">
                    Small kiosks, Mobile vans, Quick billing counters
                  </td>
                  <td className="px-3.5 py-2 text-right font-semibold text-purple-700 whitespace-nowrap">
                    Direct ESC/POS Raw Print
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Version 1.0.1 */}
        <div className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-slate-900">Version 1.0.1</h3>
            <span className="text-xs text-slate-500">August 2026</span>
          </div>
          <p className="text-xs font-semibold text-slate-700 mb-3">Thermal Print Formats &amp; Email Dispatch</p>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>Integrated 58mm and 80mm ESC/POS receipt thermal printing drivers.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>Added Google OAuth and custom SMTP email sending support with local credential encryption.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>Enabled automated intra-state (CGST+SGST) and inter-state (IGST) GST tax calculations.</span></li>
          </ul>
        </div>

        {/* Version 1.0.0 */}
        <div className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-slate-900">Version 1.0.0</h3>
            <span className="text-xs text-slate-500">July 2026</span>
          </div>
          <p className="text-xs font-semibold text-slate-700 mb-3">Initial Production Release</p>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>First public release of Invio desktop invoicing for Windows and macOS.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>Embedded local SQLite database engine with 100% offline data storage.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-slate-400 font-bold">•</span><span>Product catalog, customer directory, invoice creation, and PDF printing.</span></li>
          </ul>
        </div>
      </div>

      <DownloadCta
        title="Download the Latest Version (1.0.2)"
        subtitle="Enjoy the latest features, security improvements, and hardware compatibility."
      />
    </PageContainer>
  );
}

export default ChangelogPage;
