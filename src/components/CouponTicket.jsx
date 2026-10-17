import React from 'react';
import { FiX } from 'react-icons/fi';

/**
 * CouponTicket Component
 *
 * Implements the exact user CodePen structure and styles:
 * - Left stub with rotated "Enjoy Your Gift" and dashed border
 * - Center with black badge gold h2, h3 "Coupon", and small validity text
 * - Right stub with radial cutout, Libre Barcode 128 Text font, rotated -90deg
 * - Radial cutouts at (0 50%) and (100% 50%) with gold color
 * - Proper cross button using icon library (FiX from react-icons)
 * - Responsive grid collapse on mobile
 */
export function CouponTicket({
  code = '87878521112',
  discountText = '50% OFF',
  title = 'Coupon',
  validity = 'Valid until May, 2023',
  leftTag = 'Enjoy Your Gift',
  onRemove,
}) {
  return (
    <div className="relative inline-block my-2 select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap');

        .coupon {
          width: 400px;
          max-width: 100%;
          height: auto;
          min-height: 200px;
          border-radius: 10px;
          overflow: hidden;
          margin: auto;
          filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.5));
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
          isolation: isolate;
        }

        .coupon::before,
        .coupon::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          z-index: -1;
        }

        .coupon::before {
          left: 0;
          background-image: radial-gradient(
            circle at 0 50%,
            transparent 25px,
            gold 26px
          );
        }

        .coupon::after {
          right: 0;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 25px,
            gold 26px
          );
        }

        .coupon > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coupon .left {
          width: 20%;
          border-right: 2px dashed rgba(0, 0, 0, 0.13);
        }

        .coupon .left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: bold;
        }

        .coupon .center {
          flex-grow: 1;
          text-align: center;
          padding: 8px 10px;
        }

        .coupon .right {
          width: 120px;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 25px,
            #fff 26px
          );
        }

        .coupon .right div {
          font-family: "Libre Barcode 128 Text", cursive;
          font-size: 2.5rem;
          font-weight: 400;
          transform: rotate(-90deg);
          white-space: nowrap;
        }

        .coupon .center h2 {
          background: #000;
          color: gold;
          padding: 0 10px;
          font-size: 2.15rem;
          white-space: nowrap;
        }

        .coupon .center h3 {
          font-size: 2.15rem;
          font-weight: 700;
        }

        .coupon .center small {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 2px;
          display: block;
        }

        @media screen and (max-width: 500px) {
          .coupon {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
            height: auto;
          }
          .coupon::before,
          .coupon::after {
            display: none;
          }
          .coupon {
            background: gold;
          }
          .coupon .left {
            width: 100%;
            border-right: none;
            border-bottom: 2px dashed rgba(0, 0, 0, 0.13);
            padding: 8px 0;
          }
          .coupon .left div {
            transform: rotate(0deg);
          }
          .coupon .right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed rgba(0, 0, 0, 0.13);
            background: #ffffff;
            padding: 14px 10px;
          }
          .coupon .right div {
            transform: rotate(0deg);
          }
        }
      `}</style>

      {/* Proper cross button from react-icons */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-3 -right-3 z-30 size-7 rounded-full bg-slate-900 hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-md"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <FiX className="size-4 text-white" />
        </button>
      )}

      <div className="coupon">
        <div className="left">
          <div>{leftTag}</div>
        </div>

        <div className="center">
          <div>
            <h2>{discountText}</h2>
            <h3>{title}</h3>
            <small>{validity}</small>
          </div>
        </div>

        <div className="right">
          <div>{code || '87878521112'}</div>
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
