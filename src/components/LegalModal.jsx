import { useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';

export function LegalModal({ type, onClose }) {
  const isTerms = type === 'terms';
  const panelRef = useRef(null);

  useEffect(() => {
    const panel = panelRef.current;
    const prevActive = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel?.querySelector('button')?.focus();

    const focusables = () =>
      [...(panel?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])') ?? [])]
        .filter((el) => !el.disabled);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      if (prevActive instanceof HTMLElement) prevActive.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-paper-feed" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
      <div ref={panelRef} className="relative max-w-2xl w-full my-8 bg-white squircle-modal p-6 sm:p-8 border border-slate-200 shadow-2xl text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon className="size-4" />
        </button>

        <h2 id="legal-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 font-heading">
          {isTerms ? 'Terms of Service' : 'Privacy Policy'}
        </h2>
        <p className="text-xs text-slate-500 mb-5">
          Invio by Timrio &bull; Last updated September 2026 &bull; Free Offline Invoice Generator
        </p>

        <div className="text-xs sm:text-[13px] text-slate-600 space-y-4 max-h-[60vh] overflow-y-auto pr-3 leading-relaxed border-t border-slate-100 pt-4">
          {isTerms ? (
            <>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">1. Plans &amp; Open Software</h3>
                <p>
                  Invio by Timrio (&quot;Software&quot;) is a desktop invoice generator and billing application offered under Free, Plus, and Pro plans. Your plan determines which features are available. There are no watermark restrictions on your business data, which always stays on your device.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">2. Data Ownership &amp; Privacy</h3>
                <p>
                  You own 100% of all data created using Invio, including your business details, customer directory, invoice records, product catalogs, and transaction history. Invio stores your records locally on your computer in an encrypted/user-partitioned SQLite database and does not sell, monitor, or upload your private business ledgers.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">3. License &amp; Permitted Use</h3>
                <p>
                  You are granted a perpetual, non-exclusive, worldwide license to download, install, and use Invio on unlimited personal or commercial desktop computers (macOS, Windows, and Linux) for retail billing, wholesale invoicing, service billing, and inventory tracking.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">4. Offline Operation &amp; Hardware Compatibility</h3>
                <p>
                  Invio is engineered offline-first. You may generate bills, scan barcodes, calculate GST (CGST/SGST/IGST), and print receipts on standard 58mm/80mm thermal printers or A4 desktop printers without an active internet connection.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">5. Optional Cloud &amp; Email Services</h3>
                <p>
                  Direct email delivery through your own configured SMTP server (Gmail, Outlook, custom domain) is available on Plus with no per-email charge from Invio. Optional cloud relay features include a monthly free allowance as defined in your account dashboard.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">6. Backups &amp; Disclaimer</h3>
                <p>
                  Because Invio stores your data locally on your computer, you are encouraged to use the built-in 1-click database backup feature (under Settings &gt; Database) to regularly export backups to an external drive or USB drive. The software is provided &quot;as is&quot; without warranties of any kind. Timrio is not liable for data loss caused by hardware malfunctions or operating system failures.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">1. Offline-First Privacy Principle</h3>
                <p>
                  Your privacy and business autonomy are fundamental to Invio. Unlike cloud-only accounting platforms, Invio executes all invoice calculations, receipt generation, barcode processing, and inventory management locally on your machine.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">2. Local Storage Location</h3>
                <p>
                  All invoices, product catalogs, customer phone numbers, GSTIN records, and expenses are saved directly on your local device filesystem within your operating system user application directory.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">3. Zero Telemetry &amp; No Third-Party Trackers</h3>
                <p>
                  The Invio desktop software contains zero third-party advertising trackers, no behavioral telemetry monitors, and no sales of customer information to third parties.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">4. Communications &amp; Credentials Security</h3>
                <p>
                  If you configure your custom SMTP credentials for automated invoice emails, passwords and authentication tokens remain stored securely on your local computer.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">5. Data Portability &amp; Deletion</h3>
                <p>
                  You can export your complete invoice registry to spreadsheet CSV files or generate standalone database backup files at any time with a single click. Uninstalling the app and removing the application directory permanently deletes all local data.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">6. Contact &amp; Support</h3>
                <p>
                  For support inquiries or legal questions regarding Invio by Timrio, please email us directly at <a href="mailto:support@timrio.com" className="text-[#8646F4] font-medium underline">support@timrio.com</a>.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Invio by Timrio &bull; Open Source
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 h-9 rounded-lg bg-[#8646F4] hover:bg-[#7336e0] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default LegalModal;
