import React from 'react';

/**
 * CouponTicket Component
 *
 * Implements the ticket cutout style:
 * - Radial cutouts at (0 50%) and (100% 50%)
 * - Left vertical rotated stub ("ENJOY YOUR GIFT")
 * - Center block with black badge dynamic discount h2, coupon code h3, and validity text
 * - Right stub with Invio logo, dynamic discount text, horizontal barcode, and action button
 * - Responsive grid collapse on small screens (<= 500px)
 *
 * Modes:
 * 1. Verified / Applied (Yellow Coupon):
 *    - variant="gold", shows discount, code, barcode, and Remove button
 * 2. Input Mode:
 *    - interactive code input + Apply button + Cancel button, zero placeholder hints or examples
 */
export function CouponTicket({
  mode = 'verified', // 'verified' | 'input'
  code = '',
  discountText = '50% OFF',
  title = 'COUPON',
  validity = 'Valid for Invio Plus',
  leftTag = 'ENJOY YOUR GIFT',
  variant = 'gold', // 'gold' | 'purple'
  // Input mode props
  inputCode = '',
  onInputChange,
  onApply,
  onCancel,
  onRemove,
  loading = false,
  error = '',
}) {
  const isPurple = variant === 'purple';
  const primaryLight = isPurple ? '#8b5cf6' : 'gold';
  const isInputMode = mode === 'input';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onApply && inputCode.trim()) {
      onApply(inputCode.trim().toUpperCase());
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto select-none font-sans my-2">
      <style>{`
        .invio-coupon {
          width: 100%;
          min-height: 180px;
          border-radius: 10px;
          overflow: hidden;
          margin: auto;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.22));
          display: flex;
          align-items: stretch;
          position: relative;
          text-transform: uppercase;
        }

        .invio-coupon::before,
        .invio-coupon::after {
          content: "";
          position: absolute;
          top: 0;
          width: 50.5%;
          height: 100%;
          z-index: 0;
        }

        .invio-coupon::before {
          left: 0;
          background-image: radial-gradient(
            circle at 0 50%,
            transparent 22px,
            ${primaryLight} 23px
          );
        }

        .invio-coupon::after {
          right: 0;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 22px,
            ${primaryLight} 23px
          );
        }

        .invio-coupon > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .invio-coupon-left {
          width: 18%;
          border-right: 2px dashed rgba(0, 0, 0, 0.15);
        }

        .invio-coupon-left div {
          transform: rotate(-90deg);
          white-space: nowrap;
          font-weight: 800;
          font-size: 0.65rem;
          letter-spacing: 2px;
          color: #1e1b4b;
        }

        .invio-coupon-center {
          flex-grow: 1;
          text-align: center;
          padding: 10px 12px;
        }

        .invio-coupon-center h2 {
          background: #000;
          color: gold;
          padding: 3px 12px;
          font-size: 1.65rem;
          font-weight: 900;
          white-space: nowrap;
          border-radius: 6px;
          display: inline-block;
          letter-spacing: -0.5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .invio-coupon-center h3 {
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 1px;
          margin-top: 4px;
          color: #0f172a;
        }

        .invio-coupon-center small {
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: rgba(15, 23, 42, 0.85);
          display: block;
          margin-top: 4px;
        }

        .invio-coupon-right {
          width: 125px;
          background-image: radial-gradient(
            circle at 100% 50%,
            transparent 22px,
            #ffffff 23px
          );
          padding: 10px 8px;
          flex-direction: column;
          border-left: 2px dashed rgba(0, 0, 0, 0.12);
        }

        @media screen and (max-width: 500px) {
          .invio-coupon {
            display: grid;
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .invio-coupon::before,
          .invio-coupon::after {
            display: none;
          }
          .invio-coupon {
            background: ${primaryLight};
          }
          .invio-coupon-left {
            width: 100%;
            border-right: none;
            border-bottom: 2px dashed rgba(0, 0, 0, 0.15);
            padding: 6px 0;
          }
          .invio-coupon-left div {
            transform: rotate(0deg);
          }
          .invio-coupon-right {
            width: 100%;
            border-left: none;
            border-top: 2px dashed rgba(0, 0, 0, 0.15);
            background: #ffffff;
            padding: 12px 8px;
          }
        }
      `}</style>

      <div className="invio-coupon">
        {/* Left vertical stub */}
        <div className="invio-coupon-left relative z-10">
          <div>{leftTag}</div>
        </div>

        {/* Center coupon details / Input */}
        <div className="invio-coupon-center relative z-10 flex flex-col items-center justify-center">
          {isInputMode ? (
            <form onSubmit={handleFormSubmit} className="w-full px-2 flex flex-col items-center">
              <div className="text-[11px] font-extrabold text-slate-900 tracking-wider mb-2">
                ENTER COUPON CODE
              </div>
              <div className="flex w-full gap-1.5 items-center">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => onInputChange && onInputChange(e.target.value.toUpperCase())}
                  placeholder="COUPON CODE"
                  className="w-full text-xs font-mono font-bold tracking-wider px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 uppercase text-center focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-2xs"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={loading || !inputCode.trim()}
                  className="px-3 py-1.5 bg-black hover:bg-slate-800 disabled:opacity-50 text-amber-300 font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  {loading ? '...' : 'APPLY'}
                </button>
              </div>
              {error && (
                <p className="text-[10px] text-rose-700 font-bold mt-1.5 bg-white/90 px-2 py-0.5 rounded shadow-2xs">
                  {error}
                </p>
              )}
            </form>
          ) : (
            <div>
              <h2>{discountText}</h2>
              <h3>{code || title}</h3>
              <small>{validity}</small>
            </div>
          )}
        </div>

        {/* Right stub with Invio logo, dynamic discount text, horizontal barcode, and action */}
        <div className="invio-coupon-right relative z-10 flex flex-col items-center justify-center text-center">
          {/* Invio Brand Logo */}
          <div className="flex items-center gap-1 mb-1">
            <img
              src="/appLogo.png"
              alt="Invio"
              className="size-4.5 object-contain"
              width="18"
              height="18"
            />
            <span className="font-black text-[10px] tracking-wider text-slate-900">
              INVIO
            </span>
          </div>

          {/* Dynamic Off Tag */}
          <div className="text-[10px] font-extrabold text-[#7C3AED] leading-none mb-1">
            {discountText}
          </div>

          {/* Code pill (if verified) */}
          {!isInputMode && code && (
            <div className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-400 font-mono font-black text-[9.5px] tracking-widest mb-1 shadow-2xs">
              {code}
            </div>
          )}

          {/* Horizontal Barcode */}
          <div className="w-full flex items-center justify-center px-1 mb-1.5 opacity-90">
            <svg
              className="w-18 h-3.5 text-slate-900"
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

          {/* Action button */}
          {isInputMode ? (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-1 px-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[9px] uppercase tracking-wider text-center transition-colors cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={onRemove}
              className="w-full py-1 px-2 rounded-md bg-black hover:bg-rose-700 text-amber-300 hover:text-white font-bold text-[9px] uppercase tracking-wider text-center transition-colors shadow-2xs cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
