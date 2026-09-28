import { useState, useEffect } from 'react';
import { AppleIcon, WindowsIcon, LinuxIcon } from './Icons';

export function Navbar({ currentPage, onNavigate, activeOS, onDirectDownload }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (currentPage === 'tools' || currentPage === 'privacy' || currentPage === 'terms' || currentPage === '404') {
        setHidden(false);
        setScrolled(false);
        return;
      }

      const current = window.scrollY;
      if (current > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (current > lastScrollY && current > 150) {
        setHidden(true);
        setMobileMenuOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Lock the page while the mobile menu is open and restore the prior state.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const getOsIcon = (id, sizeClass = 'size-3.5') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    return <LinuxIcon className={sizeClass} />;
  };

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  const isToolsPage = currentPage === 'tools';

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 flex items-center ${
        hidden && !isToolsPage ? '-translate-y-full' : 'translate-y-0'
      } ${
        isToolsPage
          ? 'bg-white border-b border-slate-200'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-black/[0.05] shadow-none'
      }`}
    >
      {isToolsPage ? (
        /* Dedicated Clean Minimal Tools Header */
        <div className="w-full h-full flex items-center justify-between px-4 sm:px-6">
          {/* Brand Logo Aligned on Left */}
          <div className="h-full flex items-center gap-2.5 z-50">
            <button
              type="button"
              onClick={() => handleNavClick('product')}
              className="cursor-pointer bg-transparent border-0 p-0 group select-none flex items-center"
              aria-label="Invio - Home"
            >
              <img
                src="./appLogo.png"
                alt="Invio Logo"
                className="size-8 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
                width="32"
                height="32"
              />
            </button>
            <div className="flex flex-col justify-center leading-none select-none">
              <button
                type="button"
                onClick={() => handleNavClick('product')}
                className="font-extrabold text-[16px] tracking-tight text-slate-900 leading-none text-left cursor-pointer bg-transparent border-0 p-0 hover:text-[#8646F4] transition-colors"
              >
                Invio
              </button>
              <a
                href="https://timrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10.5px] text-slate-500 hover:text-[#8646F4] font-medium tracking-wide leading-none mt-1 inline-flex items-center gap-0.5 transition-colors group/timrio"
                title="Visit Timrio"
              >
                <span>by Timrio</span>
                <svg className="size-2.5 text-slate-400 group-hover/timrio:text-[#8646F4] transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Minimal Right Header on Tools Page: Home, FAQ, Download only */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleNavClick('product')}
                className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('faq')}
                className="text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                FAQ
              </button>
            </nav>

            <button
              type="button"
              onClick={() => onDirectDownload(activeOS)}
              className="h-[34px] px-4 rounded-full bg-[#8646F4] hover:bg-[#7336e0] active:scale-95 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-none"
              title={activeOS.isMobileFallback ? 'Invio needs a Mac, Windows, or Linux computer' : undefined}
            >
              {getOsIcon(activeOS.id, 'size-3.5')}
              <span>Download</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center z-50">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-1.5 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Standard Landing Page Header */
        <div className="w-full max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          {/* Left: Brand Logo + Invio by Timrio (Column layout with Timrio link) */}
          <div className="flex items-center gap-2.5 z-50">
            <button
              type="button"
              onClick={() => handleNavClick('product')}
              className="cursor-pointer bg-transparent border-0 p-0 group select-none flex items-center"
              aria-label="Invio - Home"
            >
              <img
                src="./appLogo.png"
                alt="Invio Logo"
                className="size-8 object-contain transition-transform duration-200 group-hover:scale-105 shrink-0"
                width="32"
                height="32"
              />
            </button>
            <div className="flex flex-col justify-center leading-none select-none">
              <button
                type="button"
                onClick={() => handleNavClick('product')}
                className="font-extrabold text-[16px] tracking-tight text-slate-900 leading-none text-left cursor-pointer bg-transparent border-0 p-0 hover:text-[#8646F4] transition-colors"
              >
                Invio
              </button>
              <a
                href="https://timrio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10.5px] text-slate-500 hover:text-[#8646F4] font-medium tracking-wide leading-none mt-1 inline-flex items-center gap-0.5 transition-colors group/timrio"
                title="Visit Timrio"
              >
                <span>by Timrio</span>
                <svg className="size-2.5 text-slate-400 group-hover/timrio:text-[#8646F4] transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Section: Desktop Navigation Links + Pill Action Button */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => handleNavClick('product')}
                className={`text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                  currentPage === 'product' ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('features')}
                className={`text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                  currentPage === 'features' ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('tools')}
                className={`text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                  currentPage === 'tools' ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Free Tools
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('faq')}
                className={`text-[14px] font-medium transition-colors cursor-pointer bg-transparent border-0 p-0 ${
                  currentPage === 'faq' ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                FAQ
              </button>
            </nav>

            {/* Timrio-styled pill CTA Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onDirectDownload(activeOS)}
                className="h-[38px] px-5 rounded-full bg-[#8646F4] hover:bg-[#7336e0] active:scale-95 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-none"
                title={activeOS.isMobileFallback ? 'Invio needs a Mac, Windows, or Linux computer' : undefined}
              >
                {getOsIcon(activeOS.id)}
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center z-50">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer (matching Timrio mobile menu pattern) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-[999] md:hidden overflow-y-auto border-t border-slate-100 flex flex-col h-[calc(100vh-60px)]">
          <nav className="flex flex-col p-6 gap-6 relative z-[1000]">
            <button
              type="button"
              onClick={() => handleNavClick('product')}
              className="text-left text-xl font-medium text-slate-900 hover:text-[#8646F4] transition-colors"
            >
              Home
            </button>
            {!isToolsPage && (
              <>
                <button
                  type="button"
                  onClick={() => handleNavClick('features')}
                  className="text-left text-xl font-medium text-slate-900 hover:text-[#8646F4] transition-colors"
                >
                  Features
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('tools')}
                  className="text-left text-xl font-medium text-slate-900 hover:text-[#8646F4] transition-colors"
                >
                  Free Tools
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="text-left text-xl font-medium text-slate-900 hover:text-[#8646F4] transition-colors"
            >
              FAQ
            </button>
            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDirectDownload(activeOS);
                }}
                className="w-full text-center py-3.5 bg-[#8646F4] text-white rounded-full font-semibold text-sm hover:bg-[#7336e0] transition-colors flex items-center justify-center gap-2"
              >
                {getOsIcon(activeOS.id)}
                <span>Download for {activeOS.isMobileFallback ? 'Desktop' : activeOS.name}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
