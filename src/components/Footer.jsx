export function Footer({ onNavigate, onDirectDownload }) {
  return (
    <footer className="w-full bg-slate-950 text-white border-t border-slate-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          {/* Brand Logo - Invio by Timrio (Column layout with Timrio link) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigate('product')}
              className="cursor-pointer bg-transparent border-0 p-0 group select-none flex items-center"
              aria-label="Invio - Home"
            >
              <img
                src="/appLogo.png"
                alt="Invio Logo"
                className="size-8 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
                width="32"
                height="32"
              />
            </button>
            <div className="flex flex-col justify-center leading-none select-none">
              <button
                type="button"
                onClick={() => onNavigate('product')}
                className="font-extrabold text-[16px] tracking-tight text-white leading-none text-left cursor-pointer bg-transparent border-0 p-0 hover:text-[#a855f7] transition-colors"
              >
                Invio
              </button>
              <a
                href="https://timrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10.5px] text-slate-400 hover:text-white font-medium tracking-wide leading-none mt-1 inline-flex items-center gap-0.5 transition-colors group/timrio"
                title="Visit Timrio"
              >
                <span>by Timrio</span>
                <svg className="size-2.5 text-slate-500 group-hover/timrio:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation & Legal Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs font-medium text-slate-400">
            <button
              type="button"
              onClick={() => onNavigate('product')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => onNavigate('features')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tools')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Free Tools Suite
            </button>
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => onNavigate('subscription')}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              Pricing
            </button>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('privacy');
              }}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-slate-400"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('terms');
              }}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-slate-400"
            >
              Terms of Service
            </a>
            <a
              href="mailto:support@timrio.com"
              className="hover:text-white transition-colors"
            >
              Contact Support
            </a>
            <button
              type="button"
              onClick={() => (onDirectDownload ? onDirectDownload() : onNavigate('product'))}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 font-semibold text-[#a855f7]"
            >
              Download
            </button>
          </nav>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; 2026 Invio by Timrio. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <a href="mailto:support@timrio.com" className="hover:text-white transition-colors">
              support@timrio.com
            </a>
            <span>&bull;</span>
            <span>Free Desktop Application</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
