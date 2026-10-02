import { useState, useMemo } from 'react';

const SETTINGS_SECTIONS = [
  {
    id: 'business-profile',
    badge: '1. 🏢 Business Profile',
    title: 'Business Profile Configuration',
    summary: 'Configures your store identity across all printed bills, receipts, and client emails.',
    items: [
      {
        name: 'Store Logo',
        desc: 'Upload your company/store logo (PNG, JPG, SVG up to 5MB). Renders on invoice headers, thermal receipts, and email templates with auto-scaling.',
      },
      {
        name: 'Business Display Name',
        desc: 'Your store, shop, or trade brand name displayed prominently on top of every bill and PDF receipt.',
      },
      {
        name: 'Legal Entity Name',
        desc: 'Official registered business entity name used for statutory tax compliance and legal records.',
      },
      {
        name: 'Business Category',
        desc: 'Shop category (Retail Store, Supermarket, Electronics & Hardware, Pharmacy, Restaurant/Café, Professional Services, etc.) which auto-configures default billing units and taxes.',
      },
      {
        name: 'Tax ID / GSTIN',
        desc: '15-character Goods and Services Tax Identification Number (GSTIN) or national Tax ID printed on tax invoices.',
      },
      {
        name: 'Contact Information',
        desc: 'Store phone number, official billing email address, and company website printed on invoices.',
      },
      {
        name: 'Physical Address',
        desc: 'Complete street address, city, state, postal/PIN code, and country for dispatch and tax state determination.',
      },
    ],
  },
  {
    id: 'invoice-pos-display',
    badge: '2. 🧾 Invoice & POS Display',
    title: 'Invoice Formatting, Thermal Printing & POS Display',
    summary: 'Controls bill layouts, thermal receipt rules, barcode inclusion, tax defaults, and secondary customer screens.',
    items: [
      {
        name: 'Paper Format',
        desc: 'Select standard A4 (Full Sheet), 80mm Thermal (3-inch POS), or 58mm Thermal (2-inch POS) receipt formats.',
      },
      {
        name: 'Receipt Header Title',
        desc: 'Custom receipt title (e.g., "Tax Invoice / Cash Receipt", "Sales Bill", or "Retail Memo").',
      },
      {
        name: 'Receipt Footer Note',
        desc: 'Custom goodwill or return policy message printed at the bottom of bills (e.g., "Thank you for your visit! Goods once sold cannot be returned.").',
      },
      {
        name: 'Print Store Logo Toggle',
        desc: 'Show or hide your uploaded business logo on printed thermal receipts and PDF invoices.',
      },
      {
        name: 'Print Dynamic UPI QR Toggle',
        desc: 'Generate and print an instant UPI QR code encoded with the exact bill payable amount and your VPA on receipts.',
      },
      {
        name: 'Print Barcode Toggle',
        desc: 'Print a CODE128 scannable invoice ID barcode at the foot of receipts for fast returns and barcode lookups.',
      },
      {
        name: 'Auto-Print on Save Toggle',
        desc: 'Automatically trigger the system print dialog whenever an invoice is marked paid or saved.',
      },
      {
        name: 'Customer-Facing POS Display',
        desc: 'Enable a standalone, secondary screen that mirrors the live checkout cart to customers with real-time totals and payment QR.',
      },
      {
        name: 'Display Auto-Open & Monitor Selection',
        desc: 'Auto-detects connected secondary monitors (HDMI / DisplayPort / USB-C) and launches customer screen on draft creation.',
      },
      {
        name: 'Default Tax Rate %',
        desc: 'Default single bill-level GST percentage (e.g. 18%, 12%, 5%, 0%) automatically prefilled when drafting invoices.',
      },
      {
        name: 'Currency & Symbol',
        desc: 'Configure primary currency (INR, USD, EUR, GBP, AED, etc.) and currency symbol (₹, $, €, £).',
      },
      {
        name: 'Default Billing Unit',
        desc: 'Default item unit of measure (pcs, kg, boxes, meters, hrs) populated on newly added invoice line items.',
      },
      {
        name: 'Authorized Signatory & Terms',
        desc: 'Signatory person name, designation title, and default terms and conditions printed on all formal invoices.',
      },
    ],
  },
  {
    id: 'payments-bank',
    badge: '3. 🏦 Payments & Bank',
    title: 'Bank Accounts & Instant Payment Details',
    summary: 'Configures direct bank wire instructions and automated UPI payment gateways.',
    items: [
      {
        name: 'Beneficiary Bank Name',
        desc: 'The commercial bank name where wire transfers and RTGS/NEFT/IMPS should be deposited.',
      },
      {
        name: 'Account Number',
        desc: 'Beneficiary bank account number printed in the banking details box on invoices.',
      },
      {
        name: 'IFSC / Routing Code',
        desc: '11-character Indian Financial System Code (IFSC) or international branch routing identifier.',
      },
      {
        name: 'UPI ID / VPA',
        desc: 'Virtual Payment Address (e.g. yourbusiness@okaxis, store@upi) used to dynamically render instant scan-to-pay QR codes.',
      },
    ],
  },
  {
    id: 'notifications-email',
    badge: '4. ✉️ Notifications & Email Dispatch',
    title: 'Email Delivery Engine & Google OAuth',
    summary: 'Setup automated dispatch of professional invoice PDFs and payment receipts directly to customer inboxes.',
    items: [
      {
        name: '1-Click Google OAuth2 Connect',
        desc: 'Direct integration with Google Workspace or personal Gmail. Eliminates insecure passwords or SMTP server configuration.',
      },
      {
        name: 'Custom SMTP Mail Server',
        desc: 'Connect custom mail servers (Host, Port 587/465, Username, App Password, and Sender Display Name) with STARTTLS/SSL.',
      },
      {
        name: 'Live Connection Handshake',
        desc: 'Automated background handshake verification checks token freshness and SMTP connectivity on startup with zero latency.',
      },
      {
        name: 'Automated Delivery Health & Retries',
        desc: 'Background outbox queues with exponential backoff retries and non-blocking background dispatch.',
      },
    ],
  },
  {
    id: 'database-backup',
    badge: '5. 💾 Database & Backup',
    title: 'Local SQLite Data Safety & PostgreSQL Engine',
    summary: 'Local offline SQLite database backups and optional external cloud PostgreSQL connections.',
    items: [
      {
        name: 'Local SQLite Backup Export (All Plans)',
        desc: 'Export a complete, timestamped .sqlite backup file containing all invoices, inventory catalog, customers, and expenses in one click.',
      },
      {
        name: 'Restore from Backup (All Plans)',
        desc: 'Restore your entire Invio workspace from any previously exported backup file with automatic schema migration.',
      },
      {
        name: 'External PostgreSQL Storage Engine (Plus & Pro)',
        desc: 'Connect Invio to an external cloud PostgreSQL database (AWS RDS, Supabase, Neon, Aiven, or local server) for multi-device network synchronization.',
      },
      {
        name: 'Encrypted Credential Storage',
        desc: 'Database connection strings, passwords, and tokens are stored securely in the OS keychain using hardware encryption.',
      },
    ],
  },
];

const FEATURES_LIST = [
  {
    id: 'offline-first',
    icon: '⚡',
    title: '100% Offline-First SQLite Architecture',
    desc: 'Invio runs entirely on your local machine with an embedded SQLite engine. Create bills, manage stock, and print receipts with zero internet connection.',
    bullets: [
      'No cloud lock-in or recurring server downtime',
      'Zero latency database lookups for instant bill creation',
      'Data resides safely on your computer under your total ownership',
    ],
  },
  {
    id: 'gst-billing',
    icon: '🧾',
    title: 'Intelligent GST Billing & Tax Engine',
    desc: 'Comprehensive tax compliance tailored for retail and commercial trade.',
    bullets: [
      'Intra-state automatic 50% CGST + 50% SGST tax split',
      'Inter-state 100% IGST allocation based on customer state',
      'Line-level item discounts (% percentage or flat ₹ amount)',
      'Automated number-to-words currency conversion in Indian numbering system',
    ],
  },
  {
    id: 'thermal-pos',
    icon: '🖨️',
    title: 'High-Speed Thermal POS & UPI QR Receipts',
    desc: 'Fast checkout built for busy retail counters, grocery stores, and pharmacies.',
    bullets: [
      'Supports standard 58mm (2-inch) and 80mm (3-inch) thermal ESC/POS printers',
      'Prints dynamic scan-and-pay UPI QR codes encoded with invoice amount',
      'Barcodes printed at receipt foot for fast customer returns',
    ],
  },
  {
    id: 'customer-pos-screen',
    icon: '🖥️',
    title: 'Customer-Facing POS Secondary Screen',
    desc: 'Give shoppers total clarity during checkout with a live, synchronized customer screen.',
    bullets: [
      'Live itemized cart updates in real time as items are scanned',
      'Shows discounted totals, tax breakdowns, and final payable amount',
      'Full-screen UPI QR code on secondary monitor for contactless payments',
    ],
  },
  {
    id: 'inventory-stock',
    icon: '📦',
    title: 'Real-Time Inventory & Low Stock Alerts',
    desc: 'Keep full visibility over product catalog, SKU stock levels, and purchasing costs.',
    bullets: [
      'Automatic stock depletion upon saving completed invoices',
      'Low stock warning badges for items falling below threshold',
      'HSN codes, default units, and warranty tracker per product',
    ],
  },
  {
    id: 'barcode-scanning',
    icon: '🔍',
    title: 'Instant Barcode Scanner Integration',
    desc: 'Plug-and-play USB & Bluetooth barcode scanner compatibility.',
    bullets: [
      'Scan barcodes directly into new invoices to auto-fill line items',
      'Scanning identical items auto-increments quantity seamlessly',
      'Prevents overselling by checking available physical stock',
    ],
  },
  {
    id: 'customer-ledger',
    icon: '👥',
    title: 'Customer Ledger & Credit Balance (Khata)',
    desc: 'Maintain detailed customer accounts, outstanding balance due, and credit history.',
    bullets: [
      'Track partial payments, pending dues, and overdue invoices',
      'Walk-in Customer default mode for fast counter retail sales',
      'GSTIN and billing address profiles for regular corporate clients',
    ],
  },
  {
    id: 'reports-analytics',
    icon: '📊',
    title: 'Business Reports & Expense Tracking',
    desc: 'Clear insight into financial health and operational profits.',
    bullets: [
      'Total revenue, paid receipts, and outstanding collections',
      'Categorized expense tracking with net profit calculation',
      'Exportable financial summaries for monthly tax filing',
    ],
  },
];

export function DocsPage({ initialTab = 'features', onNavigate, onDirectDownload }) {
  const [tabOverride, setTabOverride] = useState(null);
  const activeTab = tabOverride ?? initialTab;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionId, setActiveSectionId] = useState('business-profile');

  const filteredSettings = useMemo(() => {
    if (!searchQuery.trim()) return SETTINGS_SECTIONS;
    const q = searchQuery.toLowerCase();
    return SETTINGS_SECTIONS.map((sec) => {
      const matchedItems = sec.items.filter(
        (it) => it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
      );
      const matchesSec = sec.title.toLowerCase().includes(q) || sec.summary.toLowerCase().includes(q);
      if (matchesSec || matchedItems.length > 0) {
        return { ...sec, items: matchedItems.length > 0 ? matchedItems : sec.items };
      }
      return null;
    }).filter(Boolean);
  }, [searchQuery]);

  const filteredFeatures = useMemo(() => {
    if (!searchQuery.trim()) return FEATURES_LIST;
    const q = searchQuery.toLowerCase();
    return FEATURES_LIST.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q) ||
        f.bullets.some((b) => b.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pt-20 pb-24">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8646F4]/10 text-[#8646F4] text-xs font-semibold uppercase tracking-wider mb-4">
            Documentation &amp; User Manual
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Invio Features &amp; Settings Guide
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed mb-6">
            Comprehensive documentation covering all 5 configuration sections, GST billing capabilities, POS thermal receipt options, customer screen setup, and database safeguards.
          </p>

          {/* Tab Navigation + Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setTabOverride('features');
                  window.history.pushState(null, '', '/docs/features');
                }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-white text-[#8646F4] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Features &amp; Capabilities
              </button>
              <button
                type="button"
                onClick={() => {
                  setTabOverride('settings');
                  window.history.pushState(null, '', '/docs/settings');
                }}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-white text-[#8646F4] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Settings Reference (5 Sections)
              </button>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search settings &amp; features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8646F4] focus:ring-2 focus:ring-[#8646F4]/10 transition-all"
              />
              <svg
                className="size-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'features' ? (
          /* FEATURES TAB */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeatures.map((feat) => (
              <div
                key={feat.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:border-[#8646F4]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{feat.icon}</span>
                  <h2 className="text-lg font-bold text-slate-900">{feat.title}</h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{feat.desc}</p>
                <ul className="space-y-2 text-xs text-slate-700">
                  {feat.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="size-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {filteredFeatures.length === 0 && (
              <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                No features found matching &quot;{searchQuery}&quot;. Try a different search term.
              </div>
            )}
          </div>
        ) : (
          /* SETTINGS TAB */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigator */}
            <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-2 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3">
                Settings Sections
              </span>
              {SETTINGS_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionId(sec.id);
                    const el = document.getElementById(sec.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
                      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
                    }
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    activeSectionId === sec.id
                      ? 'bg-[#8646F4]/10 text-[#8646F4]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{sec.badge}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold">
                    {sec.items.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Detailed Settings Content */}
            <div className="lg:col-span-8 space-y-8">
              {filteredSettings.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm scroll-mt-24"
                >
                  <div className="inline-block text-xs font-bold text-[#8646F4] bg-[#8646F4]/10 px-2.5 py-1 rounded-md mb-2">
                    {sec.badge}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{sec.title}</h2>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{sec.summary}</p>

                  <div className="divide-y divide-slate-100 border-t border-slate-100">
                    {sec.items.map((item, idx) => (
                      <div key={idx} className="py-4 first:pt-4 last:pb-0">
                        <div className="font-semibold text-slate-900 text-sm mb-1 flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#8646F4]" />
                          <span>{item.name}</span>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-3.5">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {filteredSettings.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
                  No settings found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Download & Help Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Ready to simplify your store billing?</h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Download Invio for Mac, Windows, or Linux. Set up your business profile in 60 seconds and start printing invoices.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onDirectDownload?.()}
              className="px-6 py-3 rounded-xl bg-[#8646F4] hover:bg-[#7336e0] text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
            >
              Download Free
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate?.('subscription');
                window.history.pushState(null, '', '/subscription');
              }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
