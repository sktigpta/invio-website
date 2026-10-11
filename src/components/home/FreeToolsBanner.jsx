import { Link } from 'react-router-dom';
import { CalculatorIcon } from '../Icons';

export function FreeToolsBanner() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-purple-50/80 via-white to-purple-50/40 border border-purple-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-xs">
            <CalculatorIcon className="size-6 text-white" />
          </div>
          <div>
            <strong className="block text-slate-900 text-base sm:text-lg font-bold">
              Free Online Finance, Tax &amp; Payroll Suite
            </strong>
            <span className="text-xs sm:text-sm text-slate-600 leading-relaxed block mt-0.5">
              Instant in-browser calculations: India GST, Income Tax (FY 2025–26), UK &amp; UAE VAT, Payslip generator, HRA, and Gratuity.
            </span>
          </div>
        </div>
        <Link
          to="/tools"
          className="h-11 px-6 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs sm:text-sm rounded-full transition-all whitespace-nowrap shadow-sm hover:shadow-purple-200/80 flex items-center justify-center shrink-0 cursor-pointer"
        >
          Explore Free Tools Suite →
        </Link>
      </div>
    </section>
  );
}

export default FreeToolsBanner;
