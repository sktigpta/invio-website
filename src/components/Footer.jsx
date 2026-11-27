import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon } from './Icons';

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600 text-sm">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-6 sm:gap-8 mb-6">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/appLogo.png" alt="Invio Invoice Logo" className="size-5 object-contain" width="20" height="20" />
              <span className="font-bold text-slate-900 text-sm">Invio Invoice</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md mb-3">
              Free invoice software and offline billing app for Windows, Mac, and Linux by Timrio.
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
              <p className="text-[11px] text-slate-600 font-medium">
                Mon – Fri • Response within 24h
              </p>
            </div>
          </div>

          {/* Software */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Software</h3>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/features" className="hover:text-[#7C3AED] transition-colors">Features</Link></li>
              <li><Link to="/download" className="hover:text-[#7C3AED] transition-colors">Download App</Link></li>
              <li><Link to="/pricing" className="hover:text-[#7C3AED] transition-colors">Pricing</Link></li>
              <li><Link to="/changelog" className="hover:text-[#7C3AED] transition-colors">Changelog</Link></li>
              <li>
                <a
                  href="https://apps.microsoft.com/detail/9nd42tj7n976?hl=en-US&gl=IN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7C3AED] transition-colors inline-flex items-center gap-1"
                  title="Rate Invio on Microsoft Store"
                >
                  <span>Rate on Store</span>
                  <span className="text-amber-500">★</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Resources</h3>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/docs" className="hover:text-[#7C3AED] transition-colors font-medium text-slate-700">Documentation</Link></li>
              <li><Link to="/faq" className="hover:text-[#7C3AED] transition-colors">FAQ</Link></li>
              <li><Link to="/docs/troubleshooting" className="hover:text-[#7C3AED] transition-colors">Support Center</Link></li>
              <li><Link to="/contact" className="hover:text-[#7C3AED] transition-colors">Contact Us</Link></li>
              <li><Link to="/report-bug" className="hover:text-[#7C3AED] transition-colors">Report a Bug</Link></li>
            </ul>
          </div>

          {/* Free Tools */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Free Tools</h3>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/tools/invoice-generator" className="hover:text-[#7C3AED] transition-colors">Invoice Generator</Link></li>
              <li><Link to="/tools/gst-calculator" className="hover:text-[#7C3AED] transition-colors">GST Calculator</Link></li>
              <li><Link to="/tools/income-tax-india" className="hover:text-[#7C3AED] transition-colors">Income Tax</Link></li>
              <li><Link to="/tools/payslip-generator" className="hover:text-[#7C3AED] transition-colors">Payslip Maker</Link></li>
              <li><Link to="/tools" className="hover:text-[#7C3AED] transition-colors font-medium text-slate-700">All Free Tools</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-[11px] text-slate-900 uppercase tracking-wider mb-2.5">Legal &amp; Trust</h3>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-[#7C3AED] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#7C3AED] transition-colors">Terms of Use</Link></li>
              <li><Link to="/eula" className="hover:text-[#7C3AED] transition-colors">EULA</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-[#7C3AED] transition-colors">Cookie Policy</Link></li>
              <li><Link to="/security" className="hover:text-[#7C3AED] transition-colors">Security</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-[#7C3AED] transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Popular Solutions Strip */}
        <div className="py-3 border-t border-slate-100 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-slate-500">
          <span className="font-semibold uppercase tracking-wider text-slate-400">Solutions:</span>
          <Link to="/free-invoice-software" className="hover:text-[#7C3AED] transition-colors">Free Invoice Software</Link>
          <Link to="/offline-billing-software" className="hover:text-[#7C3AED] transition-colors">Offline Billing Software</Link>
          <Link to="/gst-billing-software" className="hover:text-[#7C3AED] transition-colors">GST Billing Software</Link>
          <Link to="/pos-billing-software" className="hover:text-[#7C3AED] transition-colors">POS &amp; Restaurant Billing</Link>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {year} Timrio. All rights reserved. Invio is a trademark of Timrio.</p>
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
