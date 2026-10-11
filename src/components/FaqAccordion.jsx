import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faqData';
import { FaqCard } from './FaqCard';

export function FaqAccordion({ items = FAQ_ITEMS, limit = items.length, className = "" }) {
  const displayItems = items.slice(0, limit);
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {displayItems.map((faq, idx) => (
        <FaqCard
          key={faq.id || idx}
          id={faq.id || `faq-${idx}`}
          question={faq.question}
          answer={faq.answer}
          badge={faq.badge}
          isOpen={openIndex === idx}
          onToggle={() => toggle(idx)}
        />
      ))}
    </div>
  );
}

export default FaqAccordion;
