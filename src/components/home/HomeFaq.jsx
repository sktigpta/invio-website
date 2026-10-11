import { Link } from 'react-router-dom';
import { FaqAccordion } from '../FaqAccordion';

export function HomeFaq() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED] bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full inline-block mb-3">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Learn more about 100% offline data privacy, hardware compatibility, and billing features.
          </p>
        </div>

        <Link
          to="/faq"
          className="text-xs font-semibold text-[#7C3AED] hover:underline shrink-0"
        >
          View all questions &amp; answers →
        </Link>
      </div>

      <FaqAccordion limit={5} />
    </section>
  );
}

export default HomeFaq;
