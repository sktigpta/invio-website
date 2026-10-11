import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { FaqAccordion } from '../components/FaqAccordion';
import { ReceiptIcon, PrinterIcon, BarcodeIcon, ShieldCheckIcon, ZapIcon, SparklesIcon } from '../components/Icons';

export function HomePage() {
  useEffect(() => {
    applySEO('home');
    window.scrollTo(0, 0);
  }, []);

  const featureCards = [
    {
      icon: <ReceiptIcon className="size-5 text-[#7C3AED]" />,
      title: 'Free Invoice Generator App',
      description: 'Create unlimited professional tax invoices, estimates, and bills without watermarks, trial lockouts, or monthly subscription fees.'
    },
    {
      icon: <ShieldCheckIcon className="size-5 text-[#7C3AED]" />,
      title: '100% Private Local SQLite',
      description: 'Zero cloud latency and zero vendor lock-in. Your invoices, customer directory, and financial data reside completely on your computer.'
    },
    {
      icon: <PrinterIcon className="size-5 text-[#7C3AED]" />,
      title: 'Thermal POS & Dynamic UPI QR',
      description: 'Print high-speed 58mm and 80mm ESC/POS receipts with auto-generated UPI QR codes for instant smartphone scan-and-pay counter checkout.'
    },
    {
      icon: <BarcodeIcon className="size-5 text-[#7C3AED]" />,
      title: 'Barcode Scanner Rapid Billing',
      description: 'Plug in any standard USB or Bluetooth barcode scanner. Scan items to populate bills instantly with real-time inventory decrement.'
    },
    {
      icon: <ZapIcon className="size-5 text-[#7C3AED]" />,
      title: 'Automated GST Tax Engine',
      description: 'Smart tax engine automatically determines intra-state (CGST + SGST) or inter-state (IGST) splits based on 15-digit GSTIN identifiers.'
    },
    {
      icon: <SparklesIcon className="size-5 text-[#7C3AED]" />,
      title: 'Customer Ledger & Sharing',
      description: 'Track customer balances, payment histories, and credit ledgers with 1-click WhatsApp messaging and automated PDF email dispatch.'
    }
  ];

  const useCases = [
    {
      title: 'Retail Stores & Supermarkets',
      points: [
        'Instant barcode lookups at billing counter',
        'Dual-screen customer display support',
        'Thermal receipts with dynamic UPI QR payment'
      ]
    },
    {
      title: 'Wholesalers & Distributors',
      points: [
        'Automated GST tax splitting (CGST/SGST/IGST)',
        'Customer credit ledgers and balance tracking',
        'Bulk product import via CSV catalogues'
      ]
    },
    {
      title: 'Freelancers & Service Pros',
      points: [
        'Clean A4 and A5 PDF invoice generation',
        'Custom business logo and bank account details',
        'Direct 1-click email and WhatsApp invoice delivery'
      ]
    }
  ];

  return (
    <PageContainer
      badge="Offline Desktop Invoicing v1.0.2"
      title="Invio – Free Invoice Generator App & Offline Desktop Billing Software"
      subtitle="The modern, lightweight desktop invoicing app for Windows and macOS. Create compliant GST invoices, print thermal receipts, scan barcodes, and manage customers with 100% offline local SQLite storage."
    >
      {/* Primary Download CTA */}
      <DownloadCta
        title="Download Invio for Windows & macOS"
        subtitle="Version 1.0.2. Completely free forever for core desktop billing with no cloud lock-in."
      />

      {/* Trust Badges */}
      <section aria-label="Product highlights" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-center">
        <div className="p-3 rounded-xl border border-slate-200/90 bg-white">
          <p className="text-xs font-bold text-slate-900">100% Free</p>
          <p className="text-[11px] text-slate-500">Core desktop billing</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200/90 bg-white">
          <p className="text-xs font-bold text-slate-900">Local SQLite</p>
          <p className="text-[11px] text-slate-500">Private offline storage</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200/90 bg-white">
          <p className="text-xs font-bold text-slate-900">Win &amp; Mac</p>
          <p className="text-[11px] text-slate-500">Native 64-bit builds</p>
        </div>
        <div className="p-3 rounded-xl border border-slate-200/90 bg-white">
          <p className="text-xs font-bold text-slate-900">GST Ready</p>
          <p className="text-[11px] text-slate-500">Auto CGST/SGST/IGST</p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Everything You Need in a Free Invoice Software
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Engineered for speed, dependability, and data sovereignty. No recurring monthly fees or mandatory internet connectivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {featureCards.map((feat, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white flex flex-col justify-between">
              <div>
                <div className="mb-2.5 p-2 rounded-lg bg-purple-50 inline-block">
                  {feat.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built For Real Business Use Cases */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Tailored for Modern Businesses
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Whether running a busy high-speed retail checkout or sending monthly client invoices, Invio adapts to your workflow.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {useCases.map((uc, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">
                {uc.title}
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {uc.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-[#7C3AED] font-bold">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware & Compatibility */}
      <section className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
          Universal Hardware &amp; Printer Compatibility
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
          Invio integrates seamlessly with your existing billing counter setup without requiring proprietary hardware or expensive recurring drivers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          <div>
            <p className="font-bold text-slate-900 mb-1">Receipt Printers</p>
            <p className="text-slate-600 leading-relaxed">58mm (2-inch) and 80mm (3-inch) ESC/POS thermal printers via USB, Network, or Virtual COM.</p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-1">Barcode Scanners</p>
            <p className="text-slate-600 leading-relaxed">Any standard 1D/2D laser or CCD scanner via USB or Bluetooth Keyboard emulation (HID).</p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-1">Customer Displays</p>
            <p className="text-slate-600 leading-relaxed">Secondary HDMI, DisplayPort, or USB-C monitor showing live bills and UPI QR codes.</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">Supports Windows 10/11 &amp; macOS 11.0+ (Apple Silicon &amp; Intel)</span>
          <Link to="/system-requirements" className="font-semibold text-[#7C3AED] hover:underline">
            Check system requirements →
          </Link>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="my-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers about offline billing, security, and setup.
            </p>
          </div>
          <Link to="/faq" className="text-xs font-semibold text-[#7C3AED] hover:underline shrink-0">
            View all FAQs →
          </Link>
        </div>

        <FaqAccordion limit={5} />
      </section>

      {/* Free Finance Calculators Suite Banner */}
      <section className="my-8 p-5 rounded-2xl border border-purple-200/80 bg-purple-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-[#7C3AED] mb-1.5">
            Free Web Tools
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Free Online Tax &amp; Finance Calculators Suite
          </h2>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Need quick calculations without installing anything? Use our free GST calculator, FY 25-26 income tax planner, UK/UAE VAT estimators, and payslip generator.
          </p>
        </div>
        <Link
          to="/tools"
          className="h-9 px-4 bg-white border border-purple-200 text-[#7C3AED] hover:bg-purple-50 text-xs font-semibold rounded-full flex items-center justify-center shrink-0 transition-colors shadow-2xs"
        >
          Explore Free Tools →
        </Link>
      </section>
    </PageContainer>
  );
}

export default HomePage;
