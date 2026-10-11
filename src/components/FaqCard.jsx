import { ChevronDownIcon, ChevronUpIcon } from './Icons';

export function FaqCard({
  id,
  question,
  answer,
  isOpen = false,
  onToggle,
  badge,
  className = '',
}) {
  const contentId = id ? `faq-content-${id}` : undefined;
  const buttonId = id ? `faq-btn-${id}` : undefined;

  return (
    <div
      className={`border rounded-squircle-sm bg-white overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-[#7C3AED]/40 shadow-xs ring-1 ring-[#7C3AED]/10'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
      } ${className}`}
    >
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full text-left px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3
            className={`text-xs sm:text-sm font-bold transition-colors leading-snug ${
              isOpen ? 'text-[#7C3AED]' : 'text-slate-900 group-hover:text-[#7C3AED]'
            }`}
          >
            {question}
          </h3>
          {badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200/60 shrink-0">
              {badge}
            </span>
          )}
        </div>

        <div
          className={`size-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
            isOpen
              ? 'bg-purple-100/70 text-[#7C3AED]'
              : 'bg-slate-100/70 text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100'
          }`}
          aria-hidden="true"
        >
          {isOpen ? (
            <ChevronUpIcon className="size-3.5 text-[#7C3AED]" />
          ) : (
            <ChevronDownIcon className="size-3.5 text-slate-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={buttonId}
          className="px-5 pb-5 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default FaqCard;
