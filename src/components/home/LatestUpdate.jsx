import { Link } from 'react-router-dom';
import { SparklesIcon } from '../Icons';

export function LatestUpdate() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="p-5 sm:p-6 rounded-2xl border border-purple-200/90 bg-gradient-to-r from-purple-50/70 via-white to-purple-50/40 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="size-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <SparklesIcon className="size-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] px-2 py-0.5 rounded-full">
                Latest Update • v1.0.2
              </span>
              <span className="text-xs text-slate-500 font-medium">October 2026</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
              Dual-Screen POS Customer Display &amp; Dynamic UPI QR Receipts
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Added secondary customer monitor projection, dynamic offline UPI QR codes on 58mm/80mm thermal receipts, and zero-margin error handling across our calculation suite.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Link
            to="/changelog"
            className="text-xs font-semibold text-[#7C3AED] hover:underline"
          >
            Release Notes →
          </Link>
          <Link
            to="/download"
            className="h-9 px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-xs"
          >
            Get v1.0.2
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestUpdate;
