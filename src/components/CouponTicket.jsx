import React, { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

/**
 * CouponTicket Component
 *
 * Implements user's updated specifications:
 * - Zero drop-shadow, zero hover translate (flat, static)
 * - Compact width (330px max, down from 400px)
 * - Yellow to red gradient transition (gold #ffd100 -> orange #ff8c00 -> red #dc2626)
 * - Inner red dashed border framing the ticket and red dashed separator
 * - Signature style font for discount text ('Dancing Script', 'Caveat', cursive)
 * - Interactive UI with 1-click copy feedback & icon library cross button (FiX)
 * - Right stub with Libre Barcode 128 Text font and cutout
 */
export function CouponTicket({
  code = '87878521112',
  discountText = '50% OFF',
  title = 'Coupon',
  validity = 'Valid until May, 2023',
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
        @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&family=Dancing+Script:wght@700&family=Caveat:wght@700&display=swap');

        .coupon-ticket-card {
          width: 330px;
          max-width: 100%;
          min-height: 180px;
          height: auto;
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
          width: 22px;
          height: 44px;
          background-color: white;
          border-radius: 0 44px 44px 0;
          z-index: 5;
        }

        .coupon-mask-right {
          position: absolute;
          right: -1px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 44px;
          background-color: white;
          border-radius: 44px 0 0 44px;
          z-index: 5;
        }

        .coupon-ticket-card > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coupon-ticket-card .left {
          width: 22%;
          border-right: 2px dashed #dc2626;
          position: relative;
          z-index: 2;
        }

        .coupon-ticket-card .left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 2px;
          color: #7f1d1d;
        }

        .coupon-ticket-card .center {
          flex-grow: 1;
          text-align: center;
          padding: 8px;
          position: relative;
          z-index: 2;
        }

        /* Inner red dashed border framing the center area */
        .coupon-inner-border {
          width: 100%;
          height: 100%;
          border: 1.5px dashed #dc2626;
          border-radius: 8px;
          padding: 8px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(2px);
        }

        /* Signature style for discount text */
        .coupon-signature-discount {
          font-family: 'Dancing Script', 'Caveat', cursive;
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.1;
          color: #000000;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
          transform: rotate(-3deg);
          display: inline-block;
          white-space: nowrap;
          margin-bottom: 2px;
          letter-spacing: 0;
          text-transform: none;
        }

        .coupon-ticket-card .center h3 {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #111827;
          margin-top: 2px;
          line-height: 1.1;
        }

        .coupon-ticket-card .center small {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #7f1d1d;
          display: block;
          margin-top: 4px;
        }

        .coupon-ticket-card .right {
          width: 105px;
          background-color: #ffffff;
          position: relative;
          z-index: 2;
          border-left: 2px dashed #dc2626;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .coupon-ticket-card .right:hover {
          background-color: #fef2f2;
        }

        .coupon-ticket-card .right div.barcode-text {
          font-family: "Libre Barcode 128 Text", cursive;
          font-size: 2.2rem;
          font-weight: 400;
          transform: rotate(-90deg);
          white-space: nowrap;
          color: #000000;
        }

        @media screen and (max-width: 500px) {
          .coupon-ticket-card {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            min-height: auto;
          }
          .coupon-ticket-card .left {
            width: 100%;
            border-right: none;
            border-bottom: 2px dashed #dc2626;
            padding: 8px 0;
          }
          .coupon-ticket-card .left div {
            transform: rotate(0deg);
          }
          .coupon-ticket-card .right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed #dc2626;
            padding: 14px 10px;
          }
          .coupon-ticket-card .right div.barcode-text {
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
          className="absolute -top-2.5 -right-2.5 z-30 size-6.5 rounded-full bg-slate-900 hover:bg-rose-600 active:scale-90 text-white flex items-center justify-center transition-colors cursor-pointer border-2 border-white shadow-xs"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <FiX className="size-3.5 text-white" />
        </button>
      )}

      {/* Interactive Coupon Ticket (No shadow, no hover, yellow-to-red, inner red border) */}
      <div className="coupon-ticket-card">
        {/* Semi-circular side cutouts */}
        <div className="coupon-mask-left" aria-hidden="true" />
        <div className="coupon-mask-right" aria-hidden="true" />

        {/* Left vertical stub */}
        <div className="left">
          <div>{leftTag}</div>
        </div>

        {/* Center coupon details with inner red border & signature discount text */}
        <div className="center">
          <div className="coupon-inner-border">
            {/* Signature style discount text */}
            <div className="coupon-signature-discount">
              {discountText}
            </div>
            <h3>{title}</h3>
            <small>{validity}</small>
          </div>
        </div>

        {/* Right stub with Libre Barcode font, 1-click copy feedback & Invio logo */}
        <div
          className="right flex flex-col items-center justify-center"
          onClick={handleCopyCode}
          title="Click to copy code"
        >
          {copied ? (
            <div className="flex flex-col items-center justify-center gap-1 text-emerald-600 font-bold text-[11px] animate-fadeIn">
              <FiCheck className="size-5" />
              <span>COPIED!</span>
            </div>
          ) : (
            <div className="barcode-text">
              {code || '87878521112'}
            </div>
          )}

          {/* Invio brand icon at bottom right */}
          <div className="absolute bottom-1.5 right-1.5 opacity-80">
            <img
              src="/appLogo.png"
              alt="Invio"
              className="size-4 object-contain"
              width="16"
              height="16"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
