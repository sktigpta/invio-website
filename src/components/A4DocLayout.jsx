export function A4DocLayout({ title, subtitle, badge, children, className = '' }) {
  return (
    <article className={`max-w-[780px] w-full mx-auto px-4 sm:px-6 pt-4 pb-10 sm:pt-6 sm:pb-12 text-slate-900 bg-transparent ${className}`}>
      <header className="mb-6">
        {badge && (
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-[#7C3AED] border border-purple-200/80 mb-2">
            {badge}
          </span>
        )}
        <h1 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900 mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">
            {subtitle}
          </p>
        )}
      </header>

      <div className="space-y-4 text-xs leading-relaxed text-slate-800">
        {children}
      </div>
    </article>
  );
}

export default A4DocLayout;

