import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

/**
 * CouponTicket Component
 *
 * Visual specifications:
 * - Ultra-compact size: 260px width, 116px height
 * - Yellow to red smooth gradient background
 * - Cutout notches on left and right edges
 * - Left stub: "ENJOY YOUR GIFT" rotated -90deg in bold red
 * - Center section:
 *    - Discount text with 'Libre Caslon Condensed' italic font, black, bold
 *    - "Coupon" title with 'Libre Caslon Condensed'
 *    - Validity text in deep red
 *    - No background box, no dashed border
 * - Right stub:
 *    - Pure white background, no hover bg change
 *    - Barcode using 'Libre Barcode 128 Text' rotated -90deg
 *    - Bottom row: Invio logo + "INVIO" text horizontally side-by-side
 *    - Clickable to copy coupon code
 * - Remove cross button (FiX) positioned 50% outside top-right
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
    <div className="relative inline-block my-1.5 select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&family=Libre+Caslon+Condensed:ital,wght@0,700;1,700&display=swap');

        .coupon-ticket-card {
          width: 260px;
          max-width: 100%;
          height: 116px;
          min-height: 116px;
          border-radius: 8px;
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

        /* Side cutout notches */
        .coupon-mask-left {
          position: absolute;
          left: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 24px;
          background-color: white;
          border-radius: 0 24px 24px 0;
          z-index: 5;
        }

        .coupon-mask-right {
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 24px;
          background-color: white;
          border-radius: 24px 0 0 24px;
          z-index: 5;
        }

        .coupon-ticket-card > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Left vertical stub */
        .coupon-ticket-card .left {
          width: 17%;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .coupon-ticket-card .left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.52rem;
          letter-spacing: 1.2px;
          color: #7f1d1d;
          line-height: 1;
        }

        /* Center details */
        .coupon-ticket-card .center {
          flex-grow: 1;
          text-align: center;
          padding: 4px 2px;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Discount text with Libre Caslon Condensed italic font */
        .coupon-caslon-discount {
          font-family: 'Libre Caslon Condensed', Georgia, serif;
          font-size: 1.65rem;
          font-weight: 700;
          font-style: italic;
          line-height: 0.95;
          color: #000000;
          white-space: nowrap;
          letter-spacing: 0.5px;
          margin: 0;
          padding: 0;
        }

        .coupon-ticket-card .center h3 {
          font-family: 'Libre Caslon Condensed', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #0f172a;
          line-height: 1;
          margin: 2px 0 0 0;
          padding: 0;
        }

        .coupon-ticket-card .center small {
          font-size: 0.46rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #7f1d1d;
          display: block;
          margin-top: 3px;
          line-height: 1;
        }

        /* Right section: Barcode in top/center, Invio Logo and INVIO in bottom row */
        .coupon-ticket-card .right {
          width: 76px;
          background-color: #ffffff;
          position: relative;
          z-index: 2;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 4px 2px 4px 2px;
        }

        .coupon-barcode {
          font-family: "Libre Barcode 128 Text", cursive;
          font-size: 1.45rem;
          font-weight: 400;
          line-height: 1;
          color: #0f172a;
          transform: rotate(-90deg);
          white-space: nowrap;
          user-select: none;
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
            padding: 10px 8px;
          }
          .coupon-barcode {
            transform: rotate(0deg);
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
          className="absolute -top-2 -right-2 z-30 size-5 rounded-full bg-slate-900 hover:bg-rose-600 active:scale-90 text-white flex items-center justify-center transition-colors cursor-pointer border-2 border-white shadow-xs"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <FiX className="size-2.5 text-white" />
        </button>
      )}

      {/* Coupon Ticket Card */}
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

        {/* Right stub: Barcode + Logo and INVIO row at bottom, pure white, no hover bg change */}
        <div
          className="right"
          onClick={handleCopyCode}
          title="Click to copy coupon code"
        >
          {copied ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-1 text-emerald-600 font-bold text-[9px] animate-fadeIn">
              <FiCheck className="size-3.5" />
              <span>COPIED!</span>
            </div>
          ) : (
            <>
              {/* Barcode section */}
              <div className="flex-1 flex items-center justify-center overflow-hidden w-full">
                <div className="coupon-barcode">
                  {code || '87878521112'}
                </div>
              </div>

              {/* Logo and INVIO in horizontal row at bottom */}
              <div className="flex flex-row items-center justify-center gap-1 w-full pb-0.5">
                <img
                  src="/appLogo.png"
                  alt="Invio"
                  className="size-3.5 object-contain"
                  width="14"
                  height="14"
                />
                <span className="font-black text-[8.5px] tracking-widest text-slate-900 leading-none">
                  INVIO
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
