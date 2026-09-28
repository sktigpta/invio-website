import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';

export function TermsPage({ onNavigate }) {
  useEffect(() => {
    applySEO('terms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] mt-16 bg-white text-slate-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Minimal Back Link */}
        <div className="mb-6">
          <a
            href="/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('product');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8646F4] hover:text-[#7234de] transition-colors cursor-pointer group"
          >
            <svg
              className="size-3.5 group-hover:-translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" x2="5" y1="12" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </a>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-5 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading mb-2">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span>Invio by Timrio</span>
            <span className="text-slate-300">•</span>
            <span>Effective Date: January 1, 2025</span>
            <span className="text-slate-300">•</span>
            <span>Last Updated: September 2026</span>
          </p>
        </div>

        {/* Plain, clean content without container cards or background boxes */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              1. 100% Free &amp; Open Software
            </h2>
            <p>
              <strong>Invio by Timrio</strong> is provided as a 100% free desktop invoice generator, POS billing, and inventory tracking application. There are no mandatory subscription fees, paywalled features, watermark locks, or artificial caps on invoice volume, customers, or items.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              2. License &amp; Permitted Use
            </h2>
            <p>
              Subject to these Terms, Timrio grants you a perpetual, non-exclusive, royalty-free, worldwide license to download, install, and use Invio on unlimited desktop computers (macOS, Windows, and Linux).
            </p>
            <p className="mt-2">
              You are permitted to use Invio for both personal and commercial operations, including retail shop checkouts, freelance client billing, wholesale distribution, agency quotes, and internal business bookkeeping.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              3. Data Ownership &amp; Privacy
            </h2>
            <p>
              You own 100% of all data created, processed, or stored within Invio, including your business branding, customer directory, GST invoices, and stock catalogs. Invio operates locally and does not claim any intellectual property rights or ownership over your private business records.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              4. Offline Responsibility &amp; Backups
            </h2>
            <p>
              Because Invio is engineered offline-first and stores records on your local disk:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>You are solely responsible for maintaining periodic backups of your database.</li>
              <li>Invio includes an automated 1-click database export tool under Settings to make backing up straightforward.</li>
              <li>Timrio does not maintain cloud copies of your database and cannot restore data lost due to hardware failure, operating system formatting, or accidental deletion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              5. GST &amp; Tax Compliance Disclaimer
            </h2>
            <p>
              Invio calculates GST (CGST, SGST, IGST, UTGST) and tax breakdowns based on standard mathematical formulas and user-input tax rates. While we strive to provide accurate calculation tools, you are responsible for ensuring that your invoices and tax filings comply with the statutory tax laws of your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              6. Disclaimer of Warranties
            </h2>
            <p>
              The software and related documentation are provided &quot;as is&quot; and &quot;as available&quot;, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              In no event shall Timrio or its contributors be liable for any direct, indirect, incidental, special, exemplary, or consequential damages (including, but not limited to, loss of profits, business interruption, or loss of data) arising in any way out of the use of this software.
            </p>
          </section>

          <section className="pt-2 border-t border-slate-100">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              8. Contact Information
            </h2>
            <p>
              For legal inquiries, feedback, or support regarding these Terms of Service, please contact us:
            </p>
            <div className="mt-2 space-y-1 text-slate-600">
              <p>Entity: <strong>Timrio</strong></p>
              <p>Product: <strong>Invio (Free Offline Invoice Generator)</strong></p>
              <p>Website: <a href="https://invio.timrio.com" className="text-[#8646F4] hover:underline">https://invio.timrio.com</a></p>
              <p>Email: <a href="mailto:support@timrio.com" className="text-[#8646F4] hover:underline">support@timrio.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
