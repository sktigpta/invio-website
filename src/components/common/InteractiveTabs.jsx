import { useRef } from 'react';

/**
 * Reusable accessible pill tablist with Left/Right keyboard navigation.
 * Styled with Invio's slate/purple design tokens.
 */
export function InteractiveTabs({
  tabs,
  activeId,
  onChange,
  ariaLabel = 'Section tabs',
  className = '',
}) {
  const listRef = useRef(null);

  const handleKeyDown = (e, idx) => {
    if (!tabs.length) return;
    let nextIdx = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextTab = tabs[nextIdx];
      onChange(nextTab.id);
      const buttons = listRef.current?.querySelectorAll('[role="tab"]');
      buttons?.[nextIdx]?.focus();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/90 shadow-sm ${className}`}
    >
      {tabs.map((tab, idx) => {
        const isActive = tab.id === activeId;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] ${
              isActive
                ? 'bg-white text-[#7C3AED] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {Icon && <Icon className="size-3.5 shrink-0" />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default InteractiveTabs;
