export function Button({
  children,
  variant = 'primary', // 'primary' | 'gold' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon,
  iconLeft,
  iconRight,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) {
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-xs font-semibold gap-2',
    lg: 'h-11 px-5 text-sm font-semibold gap-2.5',
  }[size] || 'h-10 px-4 text-xs font-semibold gap-2';

  const variantClasses = {
    primary: 'bg-[#8646F4] hover:bg-[#7232d6] active:bg-[#5e22b8] text-white border border-[#8646F4] shadow-sm',
    secondary: 'bg-[#F5F3FF] hover:bg-[#EDE9FE] active:bg-[#DDD6FE] text-[#8646F4] border border-[#DDD6FE] font-medium',
    dark: 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white border border-slate-800 shadow-sm',
    outline: 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-transparent',
    danger: 'bg-red-500 hover:bg-red-600 text-white border border-red-500',
  }[variant] || 'bg-[#8646F4] text-white border border-[#8646F4]';

  const leftIconElement = iconLeft || icon;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center squircle-btn transition-all duration-200 cursor-pointer select-none whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {leftIconElement && <span className="shrink-0 flex items-center">{leftIconElement}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
    </button>
  );
}
