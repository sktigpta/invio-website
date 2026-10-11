import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqData';

export function FaqAccordion({ items = FAQ_ITEMS, limit = items.length, className = "" }) {
  const displayItems = items.slice(0, limit);
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {displayItems.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq.id || idx}
            className={`border rounded-squircle-sm bg-white overflow-hidden transition-all ${
              isOpen ? 'border-[#7C3AED]/40 shadow-xs' : 'border-slate-200/90 hover:border-slate-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full text-left px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 cursor-pointer"
            >
              <h3 className={`text-xs sm:text-sm font-bold transition-colors leading-snug ${
                isOpen ? 'text-[#7C3AED]' : 'text-slate-900'
              }`}>
                {faq.question}
              </h3>
              <span className={`text-slate-400 font-bold text-xs shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#7C3AED]' : ''}`}>
                ▼
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
