export function PageContainer({ title, subtitle, badge, children, className = '' }) {
  return (
    <main className={`max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pt-6 sm:pb-16 text-slate-900 bg-transparent ${className}`}>
      {title && (
        <header className="mb-6">
          {badge && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200/80 mb-2">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </main>
  );
}

export default PageContainer;
