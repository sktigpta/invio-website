import { ALL_TOOLS } from './tools/toolsData';

export function Footer({ onNavigate, onDirectDownload }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Top Multi-Column Site Map Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800/80">
          
          {/* Column 1: Brand & App Info (Spans 2 cols on lg) */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('product')}
                className="cursor-pointer bg-transparent border-0 p-0 group select-none flex items-center"
                aria-label="Invio Home"
              >
                <img
                  src="/appLogo.png"
                  alt="Invio Logo"
                  className="size-9 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
                  width="36"
                  height="36"
                />
              </button>
              <div className="flex flex-col justify-center leading-none select-none">
                <button
                  type="button"
                  onClick={() => onNavigate('product')}
                  className="font-black text-xl tracking-tight text-white text-left cursor-pointer bg-transparent border-0 p-0 hover:text-[#a855f7] transition-colors"
                >
                  Invio
                </button>
                <a
                  href="https://timrio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white font-medium tracking-wide leading-none mt-1 inline-flex items-center gap-1 transition-colors group/timrio"
                  title="Visit Timrio"
                >
                  <span>by Timrio</span>
                  <svg className="size-2.5 text-slate-500 group-hover/timrio:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Offline-First Desktop Invoicing &amp; Inventory Suite. Fast thermal slips, GST/IGST calculations, UPI QR codes, stock control, and local SQLite data privacy for Windows, macOS, and Linux.
            </p>
          </div>


          {/* Column 2: Product & App Features Site Map */}
          <div className="flex flex-col gap-3">
            <strong className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Desktop Application
            </strong>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('product-page')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left font-medium text-slate-200"
                >
                  Product Details &amp; Specs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('product')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('features')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Core Capabilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('features')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Thermal &amp; A4 Printing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('features')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  POS Display (Second Screen)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('features')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  GST &amp; Tax Logic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('subscription')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-[#c084fc] font-medium"
                >
                  Plans &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onDirectDownload?.()}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-slate-300 font-medium"
                >
                  Download for Desktop
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Free Finance Tools Suite Site Map */}
          <div className="flex flex-col gap-3">
            <strong className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Free Tools Suite
            </strong>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              {ALL_TOOLS.slice(0, 6).map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('tools');
                      window.history.pushState(null, '', `/tools/${tool.id}`);
                    }}
                    className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left truncate max-w-[180px]"
                    title={tool.name}
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tools')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-[#c084fc] font-semibold"
                >
                  Explore All 8 Tools &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Documentation, Support & Legal Site Map */}
          <div className="flex flex-col gap-3">
            <strong className="text-xs font-bold text-white uppercase tracking-wider font-heading">
              Resources &amp; Legal
            </strong>
            <ul className="flex flex-col gap-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs-features')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  User Manual &amp; Docs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('docs-settings')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Settings &amp; Database Config
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => { e.preventDefault(); onNavigate('terms'); }}
                  className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@timrio.com"
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>&copy; {currentYear} Invio by Timrio. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <p className="text-slate-400">Built for Windows, macOS, and Linux.</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="mailto:support@timrio.com" className="hover:text-white transition-colors">
              support@timrio.com
            </a>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              100% Local Data Privacy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
