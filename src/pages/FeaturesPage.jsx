import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';

export function FeaturesPage() {
  useEffect(() => {
    applySEO('features');
    window.scrollTo(0, 0);
  }, []);

  const featureSections = [
    {
      title: '1. Offline-First Architecture & SQLite Privacy',
      items: [
        'Zero dependency on internet connections for billing, editing, printing, or inventory updates.',
        'High-performance embedded SQLite engine handles hundreds of thousands of entries with sub-millisecond lookups.',
        'Your financial ledgers remain physically stored on your computer, eliminating cloud outages and leaks.'
      ]
    },
    {
      title: '2. Invoicing & Automated GST Compliance',
      items: [
        'Full GST invoice layout compliance with automatic state code detection from 15-digit GSTIN.',
        'Automatic calculation of CGST, SGST, IGST, and UTGST across standard slabs (0%, 3%, 5%, 12%, 18%, 28%).',
        'Support for both tax-exclusive and tax-inclusive item pricing models.',
        'Reverse tax extraction from maximum retail price (MRP) for retail store counters.'
      ]
    },
    {
      title: '3. POS Thermal Printing & Hardware Peripherals',
      items: [
        'Direct hardware support for ESC/POS thermal printers in 58mm (2-inch) and 80mm (3-inch) roll sizes.',
        'Dynamic UPI payment QR codes printed directly on paper slips for instant smartphone collections.',
        'Standard office printer support (A4 and A5 formats) with custom business letterhead and bank accounts.',
        'USB and Bluetooth barcode scanner integration with keyboard emulation (HID) support.'
      ]
    },
    {
      title: '4. Real-Time Inventory & Stock Decrement',
      items: [
        'Automatic inventory decrements upon invoice creation to maintain accurate live stock.',
        'Automatic stock restoration if an invoice is canceled, edited, or refunded.',
        'Configurable low-stock threshold alerts to prevent unexpected stock-outs.',
        'Bulk CSV catalog import and export for effortless inventory updates.'
      ]
    },
    {
      title: '5. Customer Directory & Credit Ledger',
      items: [
        'Complete customer profiles with tax IDs, billing/shipping addresses, and phone numbers.',
        'Purchase history tracking with outstanding receivables and credit ledger balances.',
        'One-click WhatsApp message triggers and automated PDF invoice email delivery.'
      ]
    },
    {
      title: '6. Business Reports & Financial Analytics',
      items: [
        'Real-time dashboards displaying gross revenue, tax collected, and net sales trends.',
        'Expense tracking categorized by rent, utilities, payroll, and maintenance.',
        'Exportable accounting summaries in CSV and PDF formats ready for your tax consultant.'
      ]
    },
    {
      title: '7. Backup, Portability & Multi-Counter Setup',
      items: [
        'One-click local database export to easily back up your records to external drives or encrypted USBs.',
        'Database restore utility to transfer your business setup to another computer without data loss.',
        'Optional PostgreSQL multi-counter connectivity for busy retail stores running multiple billing desks.'
      ]
    }
  ];

  return (
    <PageContainer
      badge="Features Breakdown"
      title="Invio Core Features &amp; Functionality"
      subtitle="Engineered to provide complete retail and wholesale billing capabilities without external cloud dependencies. Below is a comprehensive breakdown of all features included in the software."
    >
      <DownloadCta
        title="Experience Invio Desktop Features"
        subtitle="Version 1.0.2 for Windows and macOS. Free forever for core billing."
      />

      <div className="space-y-4 my-8">
        {featureSections.map((sec, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-slate-200/90 bg-white">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mb-3">
              {sec.title}
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {sec.items.map((it, itIdx) => (
                <li key={itIdx} className="flex items-start gap-2">
                  <span className="text-[#8646F4] font-bold shrink-0">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-purple-50/50 border border-purple-200">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Ready to start billing offline?</h3>
          <p className="text-xs text-slate-600">Download the installer for your operating system and start creating invoices in under 3 minutes.</p>
        </div>
        <Link
          to="/download"
          className="h-9 px-5 bg-[#8646F4] hover:bg-[#7234de] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-sm"
        >
          Download Free Now →
        </Link>
      </div>
    </PageContainer>
  );
}

export default FeaturesPage;
