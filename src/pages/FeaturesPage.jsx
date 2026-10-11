import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import {
  ReceiptIcon,
  PrinterIcon,
  BarcodeIcon,
  ShieldCheckIcon,
  ZapIcon,
  SparklesIcon,
  CalculatorIcon
} from '../components/Icons';

export function FeaturesPage() {
  useEffect(() => {
    applySEO('features');
    window.scrollTo(0, 0);
  }, []);

  const coreModules = [
    {
      icon: <BarcodeIcon className="size-5 text-[#7C3AED]" />,
      title: '1. High-Speed Checkout & Barcode Billing',
      desc: 'Plug in standard USB or wireless 1D/2D barcode scanners. Scan item barcodes to populate invoices instantly. Stock levels decrement in real-time as items are scanned and sold at the counter.'
    },
    {
      icon: <SparklesIcon className="size-5 text-[#7C3AED]" />,
      title: '2. Dual-Screen Customer POS Display',
      desc: 'Project a live itemized bill summary and dynamic UPI payment QR code onto a secondary monitor facing the customer. Speed up verification and digital collections without awkward counter turns.'
    },
    {
      icon: <PrinterIcon className="size-5 text-[#7C3AED]" />,
      title: '3. Thermal Receipts & A4/A5 Laser Invoices',
      desc: 'Direct support for ESC/POS thermal printers (58mm and 80mm roll widths) as well as full-page A4 and A5 laser or inkjet invoices with custom company logos, bank details, and tax breakdowns.'
    },
    {
      icon: <ZapIcon className="size-5 text-[#7C3AED]" />,
      title: '4. Automated GST Compliance & Tax Engine',
      desc: 'Smart 15-digit GSTIN state detection automatically calculates intra-state CGST + SGST (50/50 split) or inter-state IGST (100%), preventing expensive calculation errors.'
    },
    {
      icon: <ReceiptIcon className="size-5 text-[#7C3AED]" />,
      title: '5. Customer Ledgers & Digital Sharing',
      desc: 'Manage customer credit ledgers, track receivables, and share invoices with 1-click WhatsApp messaging or automated PDF email dispatches via encrypted local credentials.'
    },
    {
      icon: <ShieldCheckIcon className="size-5 text-[#7C3AED]" />,
      title: '6. Embedded Local SQLite Database',
      desc: 'Zero latency and zero risk of cloud data leaks. Invoices, products, and financials reside entirely on your physical machine with 1-click export and import.'
    }
  ];

  const featureSections = [
    {
      title: 'Offline-First Architecture & SQLite Privacy',
      items: [
        'Zero dependency on internet connections for billing, editing, printing, or inventory updates.',
        'High-performance embedded SQLite engine handles hundreds of thousands of entries with sub-millisecond lookups.',
        'Your financial ledgers remain physically stored on your computer, eliminating cloud outages, leaks, and vendor lock-in.'
      ]
    },
    {
      title: 'Invoicing & Automated GST Compliance',
      items: [
        'Full GST invoice layout compliance with automatic state code detection from 15-digit GSTIN.',
        'Automatic calculation of CGST, SGST, IGST, and UTGST across standard slabs (0%, 3%, 5%, 12%, 18%, 28%).',
        'Support for both tax-exclusive and tax-inclusive item pricing models.',
        'Reverse tax extraction from maximum retail price (MRP) for retail store counters.'
      ]
    },
    {
      title: 'POS Thermal Printing & Hardware Peripherals',
      items: [
        'Direct hardware support for ESC/POS thermal printers in 58mm (2-inch) and 80mm (3-inch) roll sizes.',
        'Dynamic UPI payment QR codes printed directly on paper slips for instant smartphone collections.',
        'Standard office printer support (A4 and A5 formats) with custom business letterhead and bank accounts.',
        'USB and Bluetooth barcode scanner integration with keyboard emulation (HID) support.'
      ]
    },
    {
      title: 'Real-Time Inventory & Stock Decrement',
      items: [
        'Automatic inventory decrements upon invoice creation to maintain accurate live stock.',
        'Automatic stock restoration if an invoice is canceled, edited, or refunded.',
        'Configurable low-stock threshold alerts to prevent unexpected stock-outs.',
        'Bulk CSV catalog import and export for effortless inventory updates.'
      ]
    },
    {
      title: 'Customer Directory & Credit Ledger',
      items: [
        'Complete customer profiles with tax IDs, billing/shipping addresses, and phone numbers.',
        'Purchase history tracking with outstanding receivables and credit ledger balances.',
        'One-click WhatsApp message triggers and automated PDF invoice email delivery.'
      ]
    },
    {
      title: 'Business Reports & Financial Analytics',
      items: [
        'Real-time dashboards displaying gross revenue, tax collected, and net sales trends.',
        'Expense tracking categorized by rent, utilities, payroll, and maintenance.',
        'Exportable accounting summaries in CSV and PDF formats ready for your tax consultant.'
      ]
    },
    {
      title: 'Backup, Portability & Multi-Counter Setup',
      items: [
        'One-click local database export to easily back up your records to external drives or encrypted USBs.',
        'Database restore utility to transfer your business setup to another computer without data loss.',
        'Optional PostgreSQL multi-counter connectivity for busy retail stores running multiple billing desks.'
      ]
    }
  ];

  return (
    <PageContainer
      badge="Product & Features Guide"
      title="Invio Desktop Product Features & Capabilities"
      subtitle="Complete retail and wholesale billing capabilities without external cloud dependencies. Everything you need to manage customers, print thermal receipts, scan barcodes, and comply with tax rules."
    >
      <DownloadCta
        title="Get Started with Invio Desktop"
        subtitle="Version 1.0.2 is available for Windows 10/11 and macOS 11.0+. Free forever for core billing."
      />

      {/* Why Desktop with Local SQLite */}
      <section className="my-8 p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheckIcon className="size-5 text-[#7C3AED]" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Why Desktop Invoicing with Embedded SQLite?
          </h2>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Most modern invoicing tools have transitioned into web-only cloud platforms. While convenient, this model introduces continuous monthly subscription charges, unexpected counter downtime during internet disruptions, and serious privacy risks when uploading proprietary financial ledgers to remote servers.
          </p>
          <p>
            Invio operates <strong>100% offline</strong> on your desktop. Invoices, tax rates, inventory balances, and customer credit ledgers reside inside a fast, embedded SQLite file in your local operating system profile. No external server ever inspects, indexes, or holds your business records.
          </p>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Core Capabilities &amp; Modules
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Engineered to replace clunky legacy billing tools with a fast, modern desktop experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {coreModules.map((mod, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-purple-200 transition-all hover:shadow-2xs">
              <div className="mb-2.5 p-2 rounded-lg bg-purple-50 inline-block">
                {mod.icon}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Feature Breakdown */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Comprehensive Feature Breakdown
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Detailed breakdown of all tools, capabilities, and options available in Invio.
        </p>

        <div className="space-y-3.5">
          {featureSections.map((sec, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-200/90 bg-white">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight mb-2.5">
                {idx + 1}. {sec.title}
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                {sec.items.map((it, itIdx) => (
                  <li key={itIdx} className="flex items-start gap-2">
                    <span className="text-[#7C3AED] font-bold shrink-0">✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="my-8 p-6 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
          Technical Specifications &amp; Architecture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Architecture</span>
            <span className="text-slate-600">Electron with strict Context Isolation and disabled Node integration.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Database Engine</span>
            <span className="text-slate-600">Local embedded SQLite 3 with optional external PostgreSQL connectivity.</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Supported Platforms</span>
            <span className="text-slate-600">Windows 10/11 (64-bit), macOS 11.0+ (Universal Apple Silicon &amp; Intel), Linux (64-bit AppImage).</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Printing Protocols</span>
            <span className="text-slate-600">Raw ESC/POS thermal printing (58mm/80mm) and standard OS PDF print pipeline.</span>
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-purple-50/50 border border-purple-200">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Ready to start billing offline?</h3>
          <p className="text-xs text-slate-600">Download the installer for your operating system and start creating invoices in under 3 minutes.</p>
        </div>
        <Link
          to="/download"
          className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          Download Free Now →
        </Link>
      </div>
    </PageContainer>
  );
}

export default FeaturesPage;
