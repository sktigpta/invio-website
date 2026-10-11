import { Link } from 'react-router-dom';
import { CalculatorIcon } from '../Icons';

export function FreeToolsBanner() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-50/90 via-white to-purple-50/60 border-y border-slate-200/90 py-6 sm:py-8 my-0">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="size-11 sm:size-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-xs">
            <CalculatorIcon className="size-5 sm:size-6 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Free Online Finance, Tax &amp; Payroll Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Instant in-browser calculations: India GST, Income Tax (FY 2025–26), UK &amp; UAE VAT, Payslip generator, HRA, and Gratuity.
            </p>
          </div>
        </div>

        <Link
          to="/tools"
          className="h-10 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-xs flex items-center justify-center shrink-0 whitespace-nowrap self-start md:self-center cursor-pointer"
        >
          Explore Free Tools Suite →
        </Link>
      </div>
    </section>
  );
}

export default FreeToolsBanner;
