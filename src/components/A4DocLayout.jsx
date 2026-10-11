export function A4DocLayout({ title, subtitle, children }) {
  return (
    <main className="max-w-[780px] w-full mx-auto px-4 sm:px-6 pt-4 pb-10 sm:pt-6 sm:pb-12 text-slate-900 bg-transparent">
      <header className="mb-5">
        <h1 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900 mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[11px] text-slate-500 leading-normal">
            {subtitle}
          </p>
        )}
      </header>

      <div className="space-y-3.5 text-xs leading-relaxed text-slate-800">
        {children}
      </div>
    </main>
  );
}

export default A4DocLayout;
