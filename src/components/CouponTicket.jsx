import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

/**
 * CouponTicket Component
 *
 * Implements user's updated specifications:
 * - Smaller overall card: compact 290px width, 135px height
 * - No background and no dashed border in center section
 * - No dashed borders in main (clean seamless transitions)
 * - Discount text using 'Libre Caslon Condensed' font (italic bold)
 * - Right section: pure white background with centered Invio logo and "INVIO" text, no hover bg change
 * - Yellow to red smooth gradient background
 * - Top-right cross button (FiX) 50% outside card
 */
export function CouponTicket({
  code = '87878521112',
  discountText = '50% OFF',
  title = 'Coupon',
  validity = 'Valid for Invio Plus',
  leftTag = 'Enjoy Your Gift',
  onRemove,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (e) => {
    e.stopPropagation();
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block my-2 select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Caslon+Condensed:ital,wght@0,700;1,700&display=swap');

        .coupon-ticket-card {
          width: 290px;
          max-width: 100%;
          height: 135px;
          min-height: 135px;
          border-radius: 10px;
          overflow: hidden;
          margin: auto;
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
          isolation: isolate;
          background: linear-gradient(135deg, #ffd100 0%, #ff8c00 50%, #dc2626 100%);
          filter: none;
          box-shadow: none;
        }

        /* Cutout masks */
        .coupon-mask-left {
          position: absolute;
          left: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 32px;
          background-color: white;
          border-radius: 0 32px 32px 0;
          z-index: 5;
        }

        .coupon-mask-right {
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 32px;
          background-color: white;
          border-radius: 32px 0 0 32px;
          z-index: 5;
        }

        .coupon-ticket-card > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Left vertical stub - No dashed border */
        .coupon-ticket-card .left {
          width: 20%;
          position: relative;
          z-index: 2;
        }

        .coupon-ticket-card .left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.6rem;
          letter-spacing: 1.5px;
          color: #7f1d1d;
        }

        /* Center details - No background box, No dashed border */
        .coupon-ticket-card .center {
          flex-grow: 1;
          text-align: center;
          padding: 6px 4px;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Discount text with Libre Caslon Condensed font */
        .coupon-caslon-discount {
          font-family: 'Libre Caslon Condensed', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          font-style: italic;
          line-height: 1;
          color: #000000;
          white-space: nowrap;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
        }

        .coupon-ticket-card .center h3 {
          font-family: 'Libre Caslon Condensed', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #0f172a;
          line-height: 1;
          margin: 0;
        }

        .coupon-ticket-card .center small {
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #7f1d1d;
          display: block;
          margin-top: 4px;
          line-height: 1;
        }

        /* Right section: Centered Invio Logo and INVIO text, pure white, no hover color shift */
        .coupon-ticket-card .right {
          width: 90px;
          background-color: #ffffff;
          position: relative;
          z-index: 2;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px;
        }

        @media screen and (max-width: 500px) {
          .coupon-ticket-card {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            height: auto;
          }
          .coupon-ticket-card .left {
            width: 100%;
            padding: 8px 0;
          }
          .coupon-ticket-card .left div {
            transform: rotate(0deg);
          }
          .coupon-ticket-card .right {
            width: 100%;
            padding: 12px 10px;
          }
          .coupon-mask-left,
          .coupon-mask-right {
            display: none;
          }
        }
      `}</style>

      {/* Proper cross button from react-icons */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2.5 -right-2.5 z-30 size-6 rounded-full bg-slate-900 hover:bg-rose-600 active:scale-90 text-white flex items-center justify-center transition-colors cursor-pointer border-2 border-white shadow-xs"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <FiX className="size-3 text-white" />
        </button>
      )}

      {/* Coupon Ticket Card (Compact 290px, yellow-to-red, no shadow, no dashed borders, no hover bg change) */}
      <div className="coupon-ticket-card">
        {/* Semi-circular side cutouts */}
        <div className="coupon-mask-left" aria-hidden="true" />
        <div className="coupon-mask-right" aria-hidden="true" />

        {/* Left vertical stub (no dashed border) */}
        <div className="left">
          <div>{leftTag}</div>
        </div>

        {/* Center coupon details (no background box, no dashed border, Libre Caslon Condensed font) */}
        <div className="center">
          <div className="coupon-caslon-discount">
            {discountText}
          </div>
          <h3>{title}</h3>
          <small>{validity}</small>
        </div>

        {/* Right stub: Logo and INVIO centered in white, no hover background change */}
        <div
          className="right"
          onClick={handleCopyCode}
          title="Click to copy coupon code"
        >
          {copied ? (
            <div className="flex flex-col items-center justify-center gap-1 text-emerald-600 font-bold text-[10px] animate-fadeIn">
              <FiCheck className="size-4" />
              <span>COPIED!</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center gap-1">
              <img
                src="/appLogo.png"
                alt="Invio"
                className="size-5 object-contain"
                width="20"
                height="20"
              />
              <span className="font-black text-[10px] tracking-widest text-slate-900 leading-none">
                INVIO
              </span>
              <span className="font-mono font-bold text-[8.5px] tracking-wider text-slate-600 bg-slate-100 px-1 py-0.5 rounded leading-none mt-0.5">
                {code}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
