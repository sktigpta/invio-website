import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';

export function ChangelogPage() {
  useEffect(() => {
    applySEO('changelog');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Release Notes"
      title="Invio Changelog &amp; Release History"
      subtitle="Track all improvements, performance optimizations, and feature additions across releases of the Invio desktop application."
    >
      <div className="space-y-4 my-8">
        {/* Version 1.0.2 */}
        <div className="p-5 rounded-squircle border-2 border-[#7C3AED]/40 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Version 1.0.2</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-2 py-0.5 rounded-full">
                Latest Release
              </span>
            </div>
            <span className="text-xs text-slate-500">October 2026</span>
          </div>
          <p className="text-xs font-semibold text-slate-700 mb-3">POS Customer Display, Dynamic UPI QR &amp; Calculation Hardening</p>
          <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed mb-4">
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Added dual-screen customer POS display monitor support.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Added dynamic UPI payment QR codes directly on ESC/POS thermal paper receipts.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Configured INR commercial product feeds compliant with Google Merchant Center specifications.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Hardened calculation engine: non-negative net floor in payslips, 5-yr tenure notice on gratuity, Section 87A marginal relief.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Optimized SQLite transaction handling and query caching in desktop-app.</span></li>
            <li className="flex items-start gap-1.5"><span className="text-[#7C3AED] font-bold">•</span><span>Improved direct download streaming endpoints for Windows and macOS.</span></li>
          </ul>
          <Link to="/download" className="text-xs font-semibold text-[#7C3AED] hover:underline">
            Download Version 1.0.2 →
          </Link>
        </div>

        {/* Version 1.0.1 */}
        <div className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="text-base font-bold text-slate-900">Version 1.0.1</h2>
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
            <h2 className="text-base font-bold text-slate-900">Version 1.0.0</h2>
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
