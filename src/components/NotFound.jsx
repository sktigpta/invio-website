import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';

export function NotFound({ onNavigate }) {
  useEffect(() => {
    applySEO('404');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-64px)] mt-16 flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
      <div className="flex flex-col items-center max-w-sm mx-auto">
        {/* Simple Plain Logo without bg, shadow, border radius, or hover */}
        <div className="mb-5 flex items-center justify-center">
          <img
            src="/appLogo.png"
            alt="Invio Logo"
            className="w-11 h-11 object-contain block select-none"
            width="44"
            height="44"
          />
        </div>

        {/* 404 ERROR without bg or radius */}
        <span className="text-[11px] font-bold text-[#8646F4] uppercase tracking-widest font-mono mb-2">
          404 ERROR
        </span>

        {/* Main Not Found Heading */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading mb-2">
          Not Found!
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
          The page or tool you are looking for does not exist or has been moved.
        </p>

        {/* Text-only Go Home link with Timrio-style arrow icon */}
        <a
          href="/"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('product');
            }
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8646F4] hover:text-[#7234de] transition-colors cursor-pointer group"
        >
          <span>Go Home</span>
          <svg
            className="size-3 text-[#8646F4] group-hover:text-[#7234de] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default NotFound;
