import { Link } from 'react-router-dom';
import { useDownloadModal } from '../context/DownloadModalContext';
import { MailIcon } from './Icons';

export function Footer() {
  const { openDownloadModal } = useDownloadModal();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-6 sm:gap-8 mb-4">
          {/* Brand Info with increased width */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/appLogo.png" alt="Invio Logo" className="size-5 object-contain" width="20" height="20" />
              <span className="font-bold text-slate-900 text-sm">Invio</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mb-3">
              Fast, privacy-first desktop invoicing and inventory management software for Windows, macOS, and Linux by Timrio.
            </p>

            {/* Direct Contact Email */}
            <div className="space-y-1 text-xs">
              <a
                href="mailto:support@timrio.com"
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#7C3AED] transition-colors font-medium"
              >
                <MailIcon className="size-3.5 text-[#7C3AED] shrink-0" />
                <span>support@timrio.com</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Mon – Fri • Response within 24h
              </p>
            </div>
          </div>

          {/* Software */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Software</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/features" className="hover:text-[#7C3AED] transition-colors">Features</Link></li>
              <li><button type="button" onClick={() => openDownloadModal()} className="hover:text-[#7C3AED] transition-colors cursor-pointer text-left">Download App</button></li>
              <li><Link to="/pricing" className="hover:text-[#7C3AED] transition-colors">Pricing</Link></li>
              <li><Link to="/changelog" className="hover:text-[#7C3AED] transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Resources</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/docs" className="hover:text-[#7C3AED] transition-colors font-medium text-slate-700">Documentation</Link></li>
              <li><Link to="/faq" className="hover:text-[#7C3AED] transition-colors">FAQ</Link></li>
              <li><Link to="/docs/troubleshooting" className="hover:text-[#7C3AED] transition-colors">Support Center</Link></li>
              <li><Link to="/contact" className="hover:text-[#7C3AED] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Free Tools</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/tools/gst-calculator" className="hover:text-[#7C3AED] transition-colors">GST Calculator</Link></li>
              <li><Link to="/tools/income-tax-india" className="hover:text-[#7C3AED] transition-colors">Income Tax</Link></li>
              <li><Link to="/tools/vat-uk" className="hover:text-[#7C3AED] transition-colors">UK VAT</Link></li>
              <li><Link to="/tools/vat-uae" className="hover:text-[#7C3AED] transition-colors">UAE VAT</Link></li>
              <li><Link to="/tools/payslip-generator" className="hover:text-[#7C3AED] transition-colors">Payslip</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Legal &amp; Trust</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-[#7C3AED] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#7C3AED] transition-colors">Terms of Use</Link></li>
              <li><Link to="/eula" className="hover:text-[#7C3AED] transition-colors">EULA</Link></li>
              <li><Link to="/security" className="hover:text-[#7C3AED] transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Timrio. All rights reserved. Invio is a trademark of Timrio.</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:support@timrio.com"
              className="inline-flex items-center gap-1.5 hover:text-[#7C3AED] transition-colors font-medium text-slate-600"
            >
              <MailIcon className="size-3.5 text-[#7C3AED]" />
              support@timrio.com
            </a>
            <span className="text-slate-300">•</span>
            <a href="https://timrio.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7C3AED] transition-colors">
              timrio.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
