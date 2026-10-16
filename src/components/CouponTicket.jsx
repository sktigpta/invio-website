import React from 'react';

/**
 * CouponTicket Component
 *
 * Matches the user's CodePen reference & specifications:
 * - Card width 60% only (compact and centered)
 * - Left notch cutout via radial-gradient
 * - Left vertical stub ("ENJOY YOUR GIFT") with dashed line
 * - Center: Dynamic discount text (NO background, plain bold black text), "COUPON" title, and validity text
 * - Right: Clean white background, NO dashed line, vertical code text (plain black, NO background), Invio logo at bottom right
 * - Remove button at top right, 50% outside of card with clean cross (X) icon
 * - Zero drop shadow
 */
export function CouponTicket({
  code = '',
  discountText = '50% OFF',
  title = 'COUPON',
  validity = 'VALID FOR INVIO PLUS',
  leftTag = 'ENJOY YOUR GIFT',
  onRemove,
}) {
  return (
    <div className="relative w-[60%] min-w-[260px] max-w-[320px] mx-auto select-none font-sans my-3">
      {/* Remove button at top right, 50% outside of card with cross icon */}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-2.5 -right-2.5 z-30 size-6 rounded-full bg-black hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer border-2 border-white shadow-xs"
          title="Remove coupon"
          aria-label="Remove coupon"
        >
          <svg
            className="size-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="6" />
          </svg>
        </button>
      )}

      {/* Ticket Card (60% width, No shadow) */}
      <div className="w-full h-[140px] rounded-[10px] overflow-hidden flex relative uppercase border border-slate-200/80 bg-white">
        {/* Left & Center section with yellow background & left semicircle cutout */}
        <div
          className="flex-1 h-full flex items-stretch relative"
          style={{
            backgroundImage:
              'radial-gradient(circle at 0 50%, transparent 18px, #ffd100 19px)',
            backgroundColor: '#ffd100',
          }}
        >
          {/* Left Vertical Stub with dashed line on right */}
          <div className="w-[24%] border-r-2 border-dashed border-black/20 flex items-center justify-center relative z-10 pl-2">
            <span
              className="font-serif font-black text-[9.5px] tracking-[2px] text-black whitespace-nowrap"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {leftTag}
            </span>
          </div>

          {/* Center Details: No bg on discount, plain bold black text */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2 relative z-10">
            {/* Dynamic Discount: pure black bold text, no background box */}
            <div className="font-serif font-black text-2xl tracking-tight text-black leading-none mb-1">
              {discountText}
            </div>

            {/* Coupon Title */}
            <div className="font-serif font-black text-lg tracking-wider text-black leading-none mb-1.5">
              {title}
            </div>

            {/* Validity small text */}
            <div className="font-sans font-bold text-[8px] tracking-[1.5px] text-black/80 leading-none">
              {validity}
            </div>
          </div>
        </div>

        {/* Right Section: White background, NO dashed line, vertical code, Invio logo at bottom right */}
        <div className="w-[80px] h-full bg-white relative flex flex-col items-center justify-center shrink-0">
          {/* Coupon Code: Rotated vertical, plain black text, NO background */}
          <div className="flex-1 flex items-center justify-center w-full">
            <span
              className="font-mono font-black text-[11px] tracking-[1.5px] text-black whitespace-nowrap"
              style={{ transform: 'rotate(-90deg)' }}
            >
              {code}
            </span>
          </div>

          {/* Invio brand logo at bottom right */}
          <div className="absolute bottom-1.5 right-1.5 flex items-center justify-center">
            <img
              src="/appLogo.png"
              alt="Invio"
              className="size-4.5 object-contain"
              width="18"
              height="18"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponTicket;
