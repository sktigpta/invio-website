import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * CouponTicket Component
 * Authentic ticket voucher with radial cutout notches, vertical tear stub,
 * bold discount display, simulated barcode, and 1-click copy / claim interaction.
 */
export function CouponTicket({
  code = 'WELCOME20',
  discountText = '20% OFF',
  title = 'Invio Plus',
  subtitle = 'Lifetime Discount Voucher',
  validity = 'Limited Period Offer',
  leftTag = 'ENJOY YOUR GIFT',
  variant = 'purple', // 'purple' | 'gold' | 'dark'
  onApply,
  showClaimButton = true,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopied(true);
    if (onApply) onApply(code);
    setTimeout(() => setCopied(false), 2500);
  };

  // Color schemes
  const themes = {
    purple: {
      bgBefore: 'radial-gradient(circle at 0 50%, transparent 20px, #7c3aed 21px)',
      bgAfter: 'radial-gradient(circle at 100% 50%, transparent 20px, #6d28d9 21px)',
      leftBorder: 'rgba(255, 255, 255, 0.25)',
      badgeBg: '#1e1b4b',
      badgeText: '#f59e0b',
      textColor: '#ffffff',
      codeBg: 'rgba(255, 255, 255, 0.15)',
      btnBg: 'bg-white text-indigo-900 hover:bg-slate-100',
    },
    gold: {
      bgBefore: 'radial-gradient(circle at 0 50%, transparent 20px, #f59e0b 21px)',
      bgAfter: 'radial-gradient(circle at 100% 50%, transparent 20px, #d97706 21px)',
      leftBorder: 'rgba(0, 0, 0, 0.15)',
      badgeBg: '#0f172a',
      badgeText: '#fbbf24',
      textColor: '#0f172a',
      codeBg: 'rgba(0, 0, 0, 0.08)',
      btnBg: 'bg-slate-900 text-amber-400 hover:bg-slate-800',
    },
    dark: {
      bgBefore: 'radial-gradient(circle at 0 50%, transparent 20px, #1e293b 21px)',
      bgAfter: 'radial-gradient(circle at 100% 50%, transparent 20px, #0f172a 21px)',
      leftBorder: 'rgba(255, 255, 255, 0.18)',
      badgeBg: '#7c3aed',
      badgeText: '#ffffff',
      textColor: '#f8fafc',
      codeBg: 'rgba(255, 255, 255, 0.1)',
      btnBg: 'bg-purple-600 text-white hover:bg-purple-700',
    },
  };

  const theme = themes[variant] || themes.purple;

  return (
    <div className="w-full max-w-[420px] mx-auto select-none font-sans">
      <style>{`
        .coupon-ticket-wrap {
          width: 100%;
          min-height: 180px;
          border-radius: 14px;
          overflow: hidden;
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.14));
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .coupon-ticket-wrap:hover {
          filter: drop-shadow(0 12px 28px rgba(124, 58, 237, 0.24));
          transform: translateY(-2px);
        }

        .coupon-ticket-wrap::before,
        .coupon-ticket-wrap::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50.5%;
          height: 100%;
          z-index: 0;
        }

        .coupon-ticket-wrap::before {
          left: 0;
          background-image: ${theme.bgBefore};
        }

        .coupon-ticket-wrap::after {
          right: 0;
          background-image: ${theme.bgAfter};
        }

        @media (max-width: 480px) {
          .coupon-ticket-wrap {
            flex-direction: column;
            min-height: auto;
          }
          .coupon-ticket-wrap::before,
          .coupon-ticket-wrap::after {
            display: none;
          }
          .coupon-ticket-wrap {
            background: ${variant === 'gold' ? '#f59e0b' : variant === 'dark' ? '#1e293b' : '#7c3aed'};
          }
          .coupon-ticket-left div,
          .coupon-ticket-right div {
            transform: none !important;
          }
          .coupon-ticket-left {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 2px dashed rgba(255, 255, 255, 0.25) !important;
            padding: 8px 0 !important;
          }
          .coupon-ticket-right {
            width: 100% !important;
            border-left: none !important;
            border-top: 2px dashed rgba(255, 255, 255, 0.25) !important;
            padding: 12px 0 !important;
          }
        }
      `}</style>

      <div className="coupon-ticket-wrap">
        {/* Left Vertical Stub */}
        <div
          className="coupon-ticket-left relative z-10 w-[18%] flex items-center justify-center py-4"
          style={{ borderRight: `2px dashed ${theme.leftBorder}` }}
        >
          <div
            className="text-[10px] font-black tracking-widest text-center whitespace-nowrap opacity-90"
            style={{
              transform: 'rotate(-90deg)',
              color: theme.textColor,
            }}
          >
            {leftTag}
          </div>
        </div>

        {/* Center Main Coupon Body */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-4.5">
          {/* Discount Pill / Badge */}
          <div
            className="px-3.5 py-1 rounded-lg font-black text-xl sm:text-2xl tracking-tight mb-1.5 shadow-2xs whitespace-nowrap"
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
            }}
          >
            {discountText}
          </div>

          {/* Title */}
          <div
            className="text-sm sm:text-base font-extrabold tracking-wider leading-tight"
            style={{ color: theme.textColor }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            className="text-[10.5px] font-medium tracking-wide opacity-85 mt-0.5 leading-snug"
            style={{ color: theme.textColor }}
          >
            {subtitle}
          </div>

          {/* Validity Small Text */}
          <div
            className="text-[9px] font-semibold tracking-widest mt-2 px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              color: theme.textColor,
            }}
          >
            {validity}
          </div>
        </div>

        {/* Right Barcode Stub & Code */}
        <div
          className="coupon-ticket-right relative z-10 w-[30%] flex flex-col items-center justify-center p-3 text-center"
          style={{ borderLeft: `2px dashed ${theme.leftBorder}` }}
        >
          {/* Simulated SVG Barcode */}
          <div className="mb-2 opacity-85 flex justify-center items-center">
            <svg
              className="w-16 h-8"
              viewBox="0 0 100 40"
              fill="currentColor"
              style={{ color: theme.textColor }}
            >
              <rect x="2" y="2" width="4" height="36" />
              <rect x="8" y="2" width="2" height="36" />
              <rect x="13" y="2" width="6" height="36" />
              <rect x="22" y="2" width="2" height="36" />
              <rect x="27" y="2" width="8" height="36" />
              <rect x="38" y="2" width="3" height="36" />
              <rect x="44" y="2" width="5" height="36" />
              <rect x="52" y="2" width="2" height="36" />
              <rect x="57" y="2" width="7" height="36" />
              <rect x="67" y="2" width="4" height="36" />
              <rect x="74" y="2" width="3" height="36" />
              <rect x="80" y="2" width="6" height="36" />
              <rect x="89" y="2" width="2" height="36" />
              <rect x="94" y="2" width="4" height="36" />
            </svg>
          </div>

          {/* Promo Code Box */}
          <div
            className="px-2 py-0.5 rounded font-mono font-black text-xs tracking-wider mb-2"
            style={{
              backgroundColor: theme.codeBg,
              color: theme.textColor,
            }}
          >
            {code}
          </div>

          {/* Interactive Button */}
          {showClaimButton ? (
            <Link
              to={`/checkout?plan=plus&cycle=yearly&coupon=${encodeURIComponent(code)}`}
              className={`w-full py-1.5 px-2 rounded-lg text-[10.5px] font-bold uppercase tracking-wider text-center transition-all duration-150 active:scale-95 shadow-xs ${theme.btnBg}`}
            >
              Apply Code
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-1.5 px-2 rounded-lg text-[10.5px] font-bold uppercase tracking-wider text-center transition-all duration-150 active:scale-95 shadow-xs cursor-pointer ${theme.btnBg}`}
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
