import { Link } from 'react-router-dom';
import { PLATFORM_DOWNLOADS, MICROSOFT_STORE_URL } from '../../utils/osDetector';
import { useDeviceOS } from '../../hooks/useDeviceOS';
import { AppleIcon, WindowsIcon, LinuxIcon, CalculatorIcon, DownloadIcon, MicrosoftStoreIcon } from '../Icons';
import { useDownloadModal } from '../../context/DownloadModalContext';

const QUICK_TOOLS = [
  { label: 'Invoice Generator', path: '/tools/invoice-generator' },
  { label: 'GST Calculator', path: '/tools/gst-calculator' },
  { label: 'Income Tax', path: '/tools/income-tax-india' },
  { label: 'UK VAT', path: '/tools/vat-uk' },
  { label: 'UAE VAT', path: '/tools/vat-uae' },
  { label: 'Payslip Maker', path: '/tools/payslip-generator' },
];

export function ReadyCta() {
  const activeOS = useDeviceOS();
  const { openDownloadModal } = useDownloadModal();

  const getOsIcon = (id, sizeClass = 'size-3.5 shrink-0 pointer-events-none') => {
    if (id === 'mac') return <AppleIcon className={sizeClass} />;
    if (id === 'windows') return <WindowsIcon className={sizeClass} />;
    if (id === 'linux') return <LinuxIcon className={sizeClass} />;
    return <DownloadIcon className={sizeClass} />;
  };

  return (
    <section className="w-full pt-16 pb-0 mb-0">
      {/* Free In-Browser Tools Intro */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-12 sm:mb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[#7C3AED] text-xs font-semibold mb-3.5">
          <CalculatorIcon className="size-3.5 text-[#7C3AED]" />
          <span>Free Online Invoice &amp; Tax Tools</span>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto mb-5 font-normal">
          Need quick billing or tax math without downloading anything? Try our free online invoice generator, GST calculator, and salary slip maker right in your browser.
        </p>

        {/* Quick-launch tool pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          {QUICK_TOOLS.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-200 text-xs font-semibold text-slate-700 hover:text-[#7C3AED] transition-all shadow-sm"
            >
              {tool.label}
            </Link>
          ))}
        </div>

        <Link
          to="/tools"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] hover:underline transition-colors"
        >
          <span>Explore All Free Financial Tools</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Main Ready CTA Card */}
      <div className="w-[90%] max-w-[1200px] mx-auto rounded-t-3xl rounded-b-none bg-slate-900 text-white p-8 sm:p-12 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-lg mb-0 border-b-0">
        {/* Subtle violet ambient glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Ready to Simplify Invoicing */}
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            Ready to try Invio free invoice software?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl font-normal">
            Download Invio Invoice for free. No credit card needed, no sign-up required, and works 100% offline with all your records saved safely on your computer.
          </p>

          {/* Download button - Windows gets Microsoft Store option */}
          {activeOS.id === 'windows' ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={MICROSOFT_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm select-none"
                title="Get Invio from Microsoft Store"
              >
                <MicrosoftStoreIcon className="size-4 shrink-0" />
                <span>Get Free from Microsoft Store</span>
              </a>

              <button
                type="button"
                onClick={() => openDownloadModal(PLATFORM_DOWNLOADS.windows)}
                className="h-10 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700 select-none"
                title="Download for Windows"
              >
                <WindowsIcon className="size-3.5 shrink-0" />
                <span>Download for Windows</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openDownloadModal(activeOS)}
              className="h-10 px-6 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm select-none"
              title={`Download Invio for ${activeOS.id === 'mac' || activeOS.id === 'macIntel' ? 'Mac' : activeOS.name}`}
            >
              {getOsIcon(activeOS.id)}
              <span>Download Free for {activeOS.isMobileFallback ? 'Desktop' : (activeOS.id === 'mac' || activeOS.id === 'macIntel' ? 'Mac' : activeOS.name)}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ReadyCta;
