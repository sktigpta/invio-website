import React from 'react';

/**
 * CouponTicket Component
 *
 * Implements the user's yellow ticket design:
 * - Radial cutouts at (0 50%) and (100% 50%) with gold gradient
 * - Left vertical rotated stub ("Enjoy Your Gift")
 * - Center block with black badge dynamic discount h2, "Coupon" h3, and validity text
 * - Right stub with Invio logo and coupon code (replacing barcode)
 * - No drop shadow, no buttons inside the card
 * - Remove button at top right, 50% outside of the card with cross (X) icon
 * - Responsive grid collapse on mobile (<= 500px)
 */
export function CouponTicket({
  code = '',
  discountText = '50% OFF',
  title = 'Coupon',
  validity = 'Valid for Invio Plus',
  leftTag = 'Enjoy Your Gift',
  onRemove,
}) {
  return (
    <div className="relative w-full max-w-[380px] mx-auto select-none font-sans my-3">
      <style>{`
        .user-coupon {
          width: 100%;
          height: 155px;
          border-radius: 10px;
          overflow: visible;
          margin: auto;
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
        }

        .user-coupon::before,
        .user-coupon::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50.5%;
          height: 100%;
          z-index: 0;
        }

        .user-coupon::before {
          left: 0;
          border-radius: 10px 0 0 10px;
          background-image: radial-gradient(
            circle at 0 50%,
            transparent 20px,
            gold 21px
          );
        }

        .user-coupon::after {
          right: 0;
          border-radius: 0 10px 10px 0;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 20px,
            gold 21px
          );
        }

        .user-coupon > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-coupon-left {
          width: 20%;
          border-right: 2px dashed rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 1;
        }

        .user-coupon-left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 1.5px;
          color: #1e1b4b;
        }

        .user-coupon-center {
          flex-grow: 1;
          text-align: center;
          position: relative;
          z-index: 1;
          padding: 6px 10px;
        }

        .user-coupon-center h2 {
          background: #000;
          color: gold;
          padding: 2px 10px;
          font-size: 1.55rem;
          font-weight: 900;
          white-space: nowrap;
          border-radius: 5px;
          display: inline-block;
          letter-spacing: -0.5px;
        }

        .user-coupon-center h3 {
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: 1px;
          margin-top: 4px;
          color: #0f172a;
        }

        .user-coupon-center small {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: rgba(15, 23, 42, 0.85);
          display: block;
          margin-top: 3px;
        }

        .user-coupon-right {
          width: 105px;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 20px,
            #ffffff 21px
          );
          border-radius: 0 10px 10px 0;
          position: relative;
          z-index: 1;
          border-left: 2px dashed rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 6px;
        }

        @media screen and (max-width: 500px) {
          .user-coupon {
            display: grid;
            grid-template-columns: 1fr;
            height: auto;
          }
          .user-coupon::before,
          .user-coupon::after {
            display: none;
          }
          .user-coupon {
            background: gold;
          }
          .user-coupon-left {
            width: 100%;
            border-right: none;
            border-bottom: 2px dashed rgba(0, 0, 0, 0.15);
            padding: 8px 0;
          }
          .user-coupon-left div {
            transform: rotate(0deg);
          }
          .user-coupon-right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed rgba(0, 0, 0, 0.15);
            background: #ffffff;
            padding: 12px 8px;
          }
        }
      `}</style>

      {/* Remove button at top right, 50% outside of card with cross icon */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-3 -right-3 z-20 size-6 rounded-full bg-slate-900 hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-xs"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <svg
            className="size-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="6" />
          </svg>
        </button>
      )}

      <div className="user-coupon">
        {/* Left vertical stub */}
        <div className="user-coupon-left">
          <div>{leftTag}</div>
        </div>

        {/* Center coupon details */}
        <div className="user-coupon-center">
          <div>
            <h2>{discountText}</h2>
            <h3>{title}</h3>
            <small>{validity}</small>
          </div>
        </div>

        {/* Right stub with Invio logo and coupon code */}
        <div className="user-coupon-right">
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <img
              src="/appLogo.png"
              alt="Invio"
              className="size-5 object-contain"
              width="20"
              height="20"
            />
            <span className="font-mono font-black text-[11px] tracking-wider text-slate-900 px-1 py-0.5 rounded bg-amber-100/80 border border-amber-300">
              {code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
