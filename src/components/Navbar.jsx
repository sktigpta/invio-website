import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppleIcon, WindowsIcon, LinuxIcon } from './Icons';
import { detectDeviceOS, triggerDirectDownload } from '../utils/osDetector';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeOS = detectDeviceOS();

  const isToolsPage = location.pathname.startsWith('/tools');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isToolsPage || location.pathname !== '/') {
        setHidden(false);
        setScrolled(false);
        return;
      }

      const current = window.scrollY;
      setScrolled(current > 50);

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
  }, [location.pathname, isToolsPage]);

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
    return <LinuxIcon className={sizeClass} />;
  };

  const handleDownload = () => {
    if (activeOS.isMobileFallback) {
      navigate('/download');
    } else {
      triggerDirectDownload(activeOS);
    }
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 flex items-center ${
        hidden && !isToolsPage ? '-translate-y-full' : 'translate-y-0'
      } ${
        isToolsPage
          ? 'bg-white border-b border-slate-200'
          : scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-xs'
          : 'bg-white/90 backdrop-blur-sm border-b border-black/[0.05]'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 sm:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 z-50">
          <Link
            to="/"
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
          </Link>
          <div className="flex flex-col justify-center leading-none select-none">
            <Link
              to="/"
              className="font-extrabold text-[16px] tracking-tight text-slate-900 leading-none text-left hover:text-[#8646F4] transition-colors"
            >
              Invio
            </Link>
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products/invio"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/products') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Product
            </Link>
            <Link
              to="/features"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/features') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Features
            </Link>
            <Link
              to="/docs/installation"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/docs') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Docs
            </Link>
            <Link
              to="/tools"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/tools') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Free Tools
            </Link>
            <Link
              to="/pricing"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/pricing') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/faq"
              className={`text-[14px] font-medium transition-colors ${
                isActive('/faq') ? 'text-slate-900 font-semibold' : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* Download CTA Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="h-[38px] px-5 rounded-full bg-[#8646F4] hover:bg-[#7336e0] active:scale-95 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-none"
              title={activeOS.isMobileFallback ? 'View downloads for Windows and Mac' : `Download for ${activeOS.name}`}
            >
              {getOsIcon(activeOS.id)}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav" role="dialog" aria-modal="true" aria-label="Site navigation" className="fixed inset-0 top-16 bg-white z-[999] md:hidden overflow-y-auto border-t border-slate-100 flex flex-col h-[calc(100dvh-64px)]">
          <nav className="flex flex-col p-6 gap-5">
            <Link to="/" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Home
            </Link>
            <Link to="/products/invio" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Product Overview
            </Link>
            <Link to="/features" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Features
            </Link>
            <Link to="/docs/installation" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Installation Guide
            </Link>
            <Link to="/tools" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Free Tools
            </Link>
            <Link to="/pricing" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Pricing
            </Link>
            <Link to="/changelog" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Changelog
            </Link>
            <Link to="/system-requirements" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              System Requirements
            </Link>
            <Link to="/faq" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              FAQ
            </Link>
            <Link to="/support" className="text-left text-lg font-medium text-slate-900 hover:text-[#8646F4]">
              Support
            </Link>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full py-3 bg-[#8646F4] text-white rounded-full font-semibold text-sm hover:bg-[#7336e0] transition-colors flex items-center justify-center gap-2"
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
