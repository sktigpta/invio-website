export function PageContainer({ title, subtitle, badge, children, className = '', center = true }) {
  return (
    <main className={`max-w-[1200px] w-full mx-auto px-6 sm:px-8 pt-4 pb-12 sm:pt-6 sm:pb-16 text-slate-900 bg-transparent ${className}`}>
      {title && (
        <header className={`mb-6 sm:mb-8 ${center ? 'text-center max-w-2xl mx-auto' : ''}`}>
          {badge && (
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200/80 mb-2">
              {badge}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className={`text-sm sm:text-base text-slate-600 leading-relaxed ${center ? 'mx-auto' : 'max-w-2xl'}`}>
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
