import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';

export function PrivacyPage({ onNavigate }) {
  useEffect(() => {
    applySEO('privacy');
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
            Privacy Policy
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
              Privacy Summary (Offline-First Guarantee)
            </h2>
            <p>
              <strong>Invio does not collect, track, sell, or upload your invoices, customer details, product inventories, or sales revenue.</strong> Invio is engineered as a 100% offline desktop application. All database transactions remain stored privately on your computer’s local disk.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              1. Information We Do Not Collect
            </h2>
            <p>
              Unlike cloud-based billing and POS software, Invio operates locally. We do not store, access, or intercept:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>Customer names, phone numbers, email addresses, and ledger credit balances.</li>
              <li>Business GSTIN, tax ID numbers, PAN, or physical store addresses.</li>
              <li>Product catalog items, wholesale cost prices, barcodes, and inventory counts.</li>
              <li>Financial records, payment amounts, daily sales summaries, and expense journals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              2. Local Device Storage &amp; SQLite Database
            </h2>
            <p>
              All application data created in Invio is saved directly onto your device’s local filesystem within your user partition (SQLite database files).
            </p>
            <p className="mt-2">
              You retain 100% full ownership of your data files. You can export your data at any time via CSV spreadsheets or use the built-in database backup utility to save snapshot files to an external flash drive or cloud storage drive of your choice.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              3. Telemetry, Analytics &amp; Zero Trackers
            </h2>
            <p>
              The Invio desktop software contains:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li><strong>Zero advertising trackers</strong> or third-party marketing SDKs.</li>
              <li><strong>Zero behavioral tracking</strong> or user keystroke logging.</li>
              <li><strong>Zero data selling</strong> or sharing with data brokers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              4. Invoicing, UPI QR Codes &amp; Thermal Printing
            </h2>
            <p>
              When printing thermal receipts or generating dynamic UPI payment QR codes:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>Dynamic UPI QR codes are rendered offline using standard string encoding (<code>upi://pay?pa=...</code>). No third-party payment gateway or intermediary server is contacted during QR generation.</li>
              <li>Thermal printer communication (58mm / 80mm ESC/POS) executes directly through local hardware drivers (USB, Bluetooth, or LAN) with no external server involvement.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              5. Custom SMTP &amp; Email Credentials
            </h2>
            <p>
              If you optionally configure your own custom SMTP mail settings (e.g., Gmail App Password, Outlook, or custom business domain SMTP) to send invoices via email:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>SMTP credentials are encrypted and stored solely on your local computer.</li>
              <li>Emails are dispatched directly from your device to your configured mail server without routing through Invio or Timrio servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              6. Website Usage &amp; Web Calculators
            </h2>
            <p>
              When visiting the Invio website (<code>https://invio.timrio.com</code>) or using the free online finance calculators (GST, Income Tax, VAT, Payslip Generator, HRA, Gratuity):
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>All calculator math is evaluated client-side inside your browser via JavaScript. None of the salary, expense, or tax numbers you type are submitted to or stored on our servers.</li>
              <li>Our hosting provider may process technical access logs, including IP address, request headers, and browser user agent, for service operation, diagnostics, and abuse prevention.</li>
              <li>The website does not load Google Analytics or other third-party analytics trackers. Calculator inputs stay in your browser and are not sent to analytics services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              7. Children’s Privacy (COPPA Compliance)
            </h2>
            <p>
              Invio is a business invoicing tool and does not knowingly collect or solicit data from children under the age of 13.
            </p>
          </section>

          <section>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              8. User Rights &amp; Data Deletion (GDPR &amp; CCPA)
            </h2>
            <p>
              Because your data is stored locally on your machine, you have complete control:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li><strong>Right of Access &amp; Portability:</strong> Export all records to CSV or backup files instantly.</li>
              <li><strong>Right of Erasure:</strong> Uninstalling the software and deleting the application data directory permanently deletes all local records from your computer.</li>
            </ul>
          </section>

          <section className="pt-2 border-t border-slate-100">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
              9. Contact Information
            </h2>
            <p>
              If you have any questions or compliance inquiries regarding this Privacy Policy, please contact us:
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

export default PrivacyPage;
