import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppleIcon, WindowsIcon, LinuxIcon, DownloadIcon } from './Icons';
import { detectDeviceOS } from '../utils/osDetector';
import { useDownloadModal } from '../context/DownloadModalContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { openDownloadModal } = useDownloadModal();
  const activeOS = detectDeviceOS();

  const isFullWidthPage = location.pathname.startsWith('/tools') || location.pathname.startsWith('/docs') || location.pathname.startsWith('/doc');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isFullWidthPage || location.pathname !== '/') {
        setHidden(false);
        setScrolled(false);
        return;
      }

      const current = window.scrollY;
      setScrolled(current > 40);

      if (current > lastScrollY && current > 120) {
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
  }, [location.pathname, isFullWidthPage]);

  // Lock scroll on mobile menu open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getOsIcon = (id, sizeClass = 'size-3.5') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    if (id === 'linux') return <LinuxIcon className={sizeClass} />;
    return <DownloadIcon className={sizeClass} />;
  };

  const handleDownload = () => {
    openDownloadModal(activeOS);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Docs', path: '/docs' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Free Tools', path: '/tools' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-transform duration-300 ease-out flex items-center ${
        hidden && !isFullWidthPage ? '-translate-y-full' : 'translate-y-0'
      } ${
        isFullWidthPage
          ? 'bg-white border-b border-slate-200 shadow-2xs'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      {/* Container: 100% width on Tools & Docs page, max-w-[1200px] on all other pages */}
      <div
        className={`w-full h-full flex items-center justify-between ${
          isFullWidthPage ? 'px-4 sm:px-6' : 'max-w-[1200px] mx-auto px-6 sm:px-8'
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 z-50">
          <Link
            to="/"
            className="cursor-pointer bg-transparent border-0 p-0 select-none flex items-center"
            aria-label="Invio - Home"
          >
            <img
              src="/appLogo.png"
              alt="Invio Logo"
              className="size-8 object-contain shrink-0"
              width="32"
              height="32"
            />
          </Link>
          <div className="flex flex-col justify-center leading-none select-none">
            <Link
              to="/"
              className="font-extrabold text-[16px] tracking-tight text-slate-900 leading-none text-left hover:text-[#7C3AED] transition-colors"
            >
              Invio
            </Link>
            <a
              href="https://timrio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-slate-500 hover:text-[#7C3AED] font-medium tracking-wide leading-none mt-1 inline-flex items-center gap-0.5 transition-colors"
              title="Visit Timrio"
            >
              <span>by Timrio</span>
              <svg className="size-2 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop Navigation Links: Home, Features, Pricing, FAQ, Free Tools */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13.5px] font-medium transition-colors relative py-1 ${
                    active
                      ? 'text-[#7C3AED] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7C3AED] rounded-full animate-fadeIn" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Download CTA Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="h-9 px-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-2 transition-colors duration-150 cursor-pointer shadow-xs select-none"
              title={activeOS.isMobileFallback ? 'View downloads for Windows and Mac' : `Download for ${activeOS.name}`}
            >
              {getOsIcon(activeOS.id, "size-3.5 shrink-0 pointer-events-none")}
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center z-50">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 top-16 bg-white z-[999] md:hidden overflow-y-auto border-t border-slate-100 flex flex-col h-[calc(100dvh-64px)] animate-fadeIn"
        >
          <nav className="flex flex-col p-6 gap-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-left text-base font-medium transition-colors py-2 px-3 rounded-lg ${
                    active
                      ? 'bg-purple-50 text-[#7C3AED] font-bold'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full py-2.5 bg-[#7C3AED] text-white rounded-full font-semibold text-xs hover:bg-[#6D28D9] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {getOsIcon(activeOS.id, "size-3.5 shrink-0 pointer-events-none")}
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
