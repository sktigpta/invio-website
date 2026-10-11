import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCta } from '../components/DownloadCta';
import { ReceiptIcon, PrinterIcon, BarcodeIcon, ShieldCheckIcon, ZapIcon, SparklesIcon } from '../components/Icons';

export function ProductPage() {
  useEffect(() => {
    applySEO('product');
    window.scrollTo(0, 0);
  }, []);

  const coreModules = [
    {
      icon: <BarcodeIcon className="size-5 text-[#8646F4]" />,
      title: '1. High-Speed Checkout & Barcode Billing',
      desc: 'Connect USB or wireless 1D/2D barcode scanners. Scan item barcodes to populate invoices instantly. Stock levels decrease in real-time as items are scanned and billed.'
    },
    {
      icon: <SparklesIcon className="size-5 text-[#8646F4]" />,
      title: '2. Dual-Screen Customer POS Display',
      desc: 'Project a live itemized bill summary and dynamic UPI payment QR code onto a secondary monitor facing the customer. Speed up verification and digital collections.'
    },
    {
      icon: <PrinterIcon className="size-5 text-[#8646F4]" />,
      title: '3. Thermal Receipts & A4/A5 Laser Invoices',
      desc: 'Support for ESC/POS thermal printers (58mm and 80mm roll sizes) as well as full-page A4 and A5 laser or inkjet invoices with custom company logos and tax summaries.'
    },
    {
      icon: <ZapIcon className="size-5 text-[#8646F4]" />,
      title: '4. Automated GST Compliance & Tax Engine',
      desc: 'Smart 15-digit GSTIN state detection automatically calculates intra-state CGST + SGST (50/50 split) or inter-state IGST (100%), preventing expensive calculation errors.'
    },
    {
      icon: <ReceiptIcon className="size-5 text-[#8646F4]" />,
      title: '5. Instant Customer Ledgers & Digital Sharing',
      desc: 'Manage customer credit ledgers, track receivables, and share invoices with 1-click WhatsApp messaging or automated PDF email dispatches.'
    },
    {
      icon: <ShieldCheckIcon className="size-5 text-[#8646F4]" />,
      title: '6. Embedded Local SQLite Database',
      desc: 'Zero latency and zero risk of cloud data leaks. Invoices, products, and financials reside entirely on your physical machine with one-click export and import.'
    }
  ];

  return (
    <PageContainer
      badge="Product Deep Dive"
      title="Invio Desktop Invoicing Software"
      subtitle="A standalone, offline desktop billing application by Timrio designed for retail stores, freelance professionals, wholesale distributors, and small businesses requiring speed, privacy, and dependable operation."
    >
      <DownloadCta
        title="Get Invio Desktop for Windows & Mac"
        subtitle="Version 1.0.2 is available for Windows 10/11 and macOS 11.0+. Free forever for core billing."
      />

      {/* Why Desktop with Local SQLite */}
      <section className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
          Why Desktop Invoicing with Embedded SQLite?
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Most modern invoicing tools have transitioned into web-only cloud platforms. While convenient, this model introduces continuous monthly subscription charges, unexpected counter downtime during internet disruptions, and serious privacy risks when uploading proprietary financial ledgers to remote servers.
          </p>
          <p>
            Invio operates <strong>100% offline</strong> on your desktop. Invoices, tax rates, inventory balances, and customer credit ledgers reside inside a fast, embedded SQLite file in your local operating system profile. No external server ever inspects, indexes, or holds your business records.
          </p>
        </div>
      </section>

      {/* Core Modules */}
      <section className="my-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Core Modules &amp; Capabilities
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          Built from the ground up to replace clunky legacy software with a fast, modern desktop experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {coreModules.map((mod, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-white">
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

      {/* Technical Specifications */}
      <section className="my-8 p-5 rounded-2xl border border-slate-200/90 bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-3">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Architecture</span>
            <span className="text-slate-600">Electron with strict Context Isolation and disabled Node integration.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Database Engine</span>
            <span className="text-slate-600">Local embedded SQLite 3 with optional external PostgreSQL connectivity.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Supported Platforms</span>
            <span className="text-slate-600">Windows 10/11 (64-bit), macOS 11.0+ (Universal), Linux (64-bit AppImage).</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-900 block mb-1">Printing Protocols</span>
            <span className="text-slate-600">Raw ESC/POS thermal printing (58mm/80mm) and standard OS PDF print pipeline.</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link to="/features" className="font-semibold text-[#8646F4] hover:underline">
            View full features list →
          </Link>
          <Link to="/docs/installation" className="font-semibold text-[#8646F4] hover:underline">
            Read installation guide →
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

export default ProductPage;
