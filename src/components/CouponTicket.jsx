import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * CouponTicket Component
 * Faithful implementation of user coupon ticket specification:
 * - Radial cutouts at (0 50%) and (100% 50%)
 * - Left vertical rotated stub ("ENJOY YOUR GIFT")
 * - Center block with black badge dynamic discount h2, coupon title h3, and validity small text
 * - Right stub with Invio logo, dynamic discount text, horizontal barcode, and 1-click apply/copy button
 * - Fully responsive with @media (max-width: 500px) grid collapse
 */
export function CouponTicket({
  code = 'WELCOME20',
  discountText = '50% OFF',
  title = 'COUPON',
  validity = 'Valid until Limited Window',
  leftTag = 'ENJOY YOUR GIFT',
  variant = 'gold', // 'gold' | 'purple'
  onApply,
  showClaimButton = true,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopied(true);
    if (onApply) onApply(code);
    setTimeout(() => setCopied(false), 2200);
  };

  const isPurple = variant === 'purple';
  const primaryColor = isPurple ? '#7c3aed' : '#f59e0b';
  const primaryLight = isPurple ? '#8b5cf6' : 'gold';
  const badgeTextColor = '#fbbf24';
  const rightBg = 'radial-gradient(circle at 100% 50%, transparent 25px, #ffffff 26px)';

  return (
    <div className="w-full max-w-[440px] mx-auto select-none font-sans my-2">
      <style>{`
        .invio-coupon-card {
          width: 100%;
          min-height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin: auto;
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .invio-coupon-card:hover {
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.28));
          transform: translateY(-2px);
        }

        .invio-coupon-card::before,
        .invio-coupon-card::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50.5%;
          height: 100%;
          z-index: 0;
        }

        .invio-coupon-card::before {
          left: 0;
          background-image: radial-gradient(
            circle at 0 50%,
            transparent 25px,
            ${primaryLight} 26px
          );
        }

        .invio-coupon-card::after {
          right: 0;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 25px,
            ${primaryLight} 26px
          );
        }

        .invio-coupon-card > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .invio-coupon-left {
          width: 20%;
          border-right: 2px dashed rgba(0, 0, 0, 0.15);
        }

        .invio-coupon-left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.68rem;
          letter-spacing: 2px;
          color: ${isPurple ? '#ffffff' : '#1e1b4b'};
        }

        .invio-coupon-center {
          flex-grow: 1;
          text-align: center;
          padding: 12px 14px;
        }

        .invio-coupon-center h2 {
          background: #000;
          color: ${badgeTextColor};
          padding: 4px 12px;
          font-size: 1.85rem;
          font-weight: 900;
          white-space: nowrap;
          border-radius: 6px;
          display: inline-block;
          letter-spacing: -0.5px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }

        .invio-coupon-center h3 {
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: 1px;
          margin-top: 6px;
          color: ${isPurple ? '#ffffff' : '#0f172a'};
        }

        .invio-coupon-center small {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: ${isPurple ? 'rgba(255,255,255,0.9)' : 'rgba(15,23,42,0.85)'};
          display: block;
          margin-top: 6px;
        }

        .invio-coupon-right {
          width: 135px;
          background-image: ${rightBg};
          padding: 12px 10px;
          flex-direction: column;
          border-left: 2px dashed rgba(0, 0, 0, 0.12);
        }

        @media screen and (max-width: 500px) {
          .invio-coupon-card {
            display: grid;
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .invio-coupon-card::before,
          .invio-coupon-card::after {
            display: none;
          }
          .invio-coupon-card {
            background: ${primaryColor};
          }
          .invio-coupon-left {
            width: 100%;
            border-right: none;
            border-bottom: 2px dashed rgba(0, 0, 0, 0.15);
            padding: 8px 0;
          }
          .invio-coupon-left div {
            transform: rotate(0deg);
          }
          .invio-coupon-right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed rgba(0, 0, 0, 0.15);
            background: #ffffff;
            padding: 14px 10px;
          }
        }
      `}</style>

      <div className="invio-coupon-card">
        {/* Left vertical stub */}
        <div className="invio-coupon-left relative z-10">
          <div>{leftTag}</div>
        </div>

        {/* Center coupon details */}
        <div className="invio-coupon-center relative z-10 flex flex-col items-center justify-center">
          <div>
            <h2>{discountText}</h2>
            <h3>{title}</h3>
            <small>{validity}</small>
          </div>
        </div>

        {/* Right stub with Invio logo, horizontal barcode, and dynamic off */}
        <div className="invio-coupon-right relative z-10 flex flex-col items-center justify-center text-center">
          {/* Invio Brand Logo */}
          <div className="flex items-center gap-1.5 mb-1">
            <img
              src="/appLogo.png"
              alt="Invio"
              className="size-5 object-contain"
              width="20"
              height="20"
            />
            <span className="font-black text-[11px] tracking-wider text-slate-900">
              INVIO
            </span>
          </div>

          {/* Dynamic Off Tag */}
          <div className="text-[10.5px] font-extrabold text-[#7C3AED] leading-none mb-1">
            {discountText}
          </div>

          {/* Coupon Code Pill */}
          <div className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 font-mono font-black text-[10px] tracking-widest mb-1.5 shadow-2xs">
            {code}
          </div>

          {/* Horizontal Barcode */}
          <div className="w-full flex items-center justify-center px-1 mb-1.5 opacity-90">
            <svg
              className="w-20 h-4 text-slate-900"
              viewBox="0 0 100 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="0" width="3" height="24" />
              <rect x="7" y="0" width="1.5" height="24" />
              <rect x="11" y="0" width="4" height="24" />
              <rect x="18" y="0" width="1.5" height="24" />
              <rect x="22" y="0" width="5" height="24" />
              <rect x="30" y="0" width="2" height="24" />
              <rect x="34" y="0" width="3.5" height="24" />
              <rect x="40" y="0" width="1.5" height="24" />
              <rect x="44" y="0" width="5" height="24" />
              <rect x="52" y="0" width="3" height="24" />
              <rect x="58" y="0" width="1.5" height="24" />
              <rect x="62" y="0" width="4" height="24" />
              <rect x="69" y="0" width="2" height="24" />
              <rect x="74" y="0" width="4.5" height="24" />
              <rect x="81" y="0" width="1.5" height="24" />
              <rect x="85" y="0" width="3" height="24" />
              <rect x="91" y="0" width="2" height="24" />
              <rect x="95" y="0" width="3" height="24" />
            </svg>
          </div>

          {/* 1-Click Action */}
          {showClaimButton ? (
            <Link
              to={`/checkout?plan=plus&cycle=yearly&coupon=${encodeURIComponent(code)}`}
              className="w-full py-1 px-2 rounded-md bg-black hover:bg-slate-800 text-amber-400 font-bold text-[9.5px] uppercase tracking-wider text-center transition-colors shadow-2xs"
            >
              Apply
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-1 px-2 rounded-md bg-black hover:bg-slate-800 text-amber-400 font-bold text-[9.5px] uppercase tracking-wider text-center transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
