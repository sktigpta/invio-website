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
            className="border border-slate-200/90 rounded-xl bg-white overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full text-left px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-4 cursor-pointer"
            >
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {faq.question}
              </h3>
              <span className={`text-slate-400 font-mono text-sm shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
