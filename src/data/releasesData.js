/**
 * Invio Product Releases, Changelog & Version Registry
 * Structured for SEO indexing and extensible for future updates (e.g. 1.0.2, 1.0.3, 2.0.0).
 */

export const RELEASES_DATA = [
  {
    version: '1.0.1',
    tag: 'v1.0.1',
    name: 'Version 1.0.1 — Official Multi-Platform Release',
    date: 'October 2026',
    isLatest: true,
    badge: 'Latest Release',
    summary:
      'Official multi-platform release of Invio: A privacy-first, 100% offline desktop invoicing and inventory management suite for retail shops, small businesses, and freelancers across Windows, macOS, and Linux.',
    features: [
      {
        title: '100% Offline SQLite Architecture',
        description:
          'All business data—invoices, customers, stock, expenses, and settings—lives strictly on your local computer in SQLite. Zero telemetry, no cloud requirement, and complete immunity to internet downtime.',
      },
      {
        title: 'Automated GST & Tax Logic (India)',
        description:
          'Automated intra-state CGST (50%) + SGST (50%) and inter-state IGST (100%) calculations. Supports 0%, 3%, 5%, 12%, 18%, 28%, and 40% slabs with HSN code auto-completion and reverse MRP extraction.',
      },
      {
        title: '58mm & 80mm Thermal POS Receipt Printing',
        description:
          'Fast thermal slip printing compatible with standard ESC/POS hardware. Prints clean itemized summaries, store headers, taxes, customer details, and dynamic UPI payment QR codes.',
      },
      {
        title: 'Dual-Screen POS Customer Display',
        description:
          'Secondary external monitor display tailored for retail checkouts. Shows scanned products in real time, running totals, and an instant Bharat QR / UPI code for customer payment.',
      },
      {
        title: 'Hardware Barcode Scanner Integration',
        description:
          'Seamless USB and wireless handheld barcode scanner support. Automatically matches SKUs, increments quantities on the active bill, and prevents duplicate entries.',
      },
      {
        title: 'Dynamic UPI Payment QR Codes',
        description:
          'Generates high-contrast UPI QR codes with custom merchant VPA and exact invoice amounts. Compatible with Google Pay, PhonePe, Paytm, BHIM, and any UPI mobile app.',
      },
      {
        title: 'Inventory Control & Low-Stock Alerts',
        description:
          'Real-time inventory decrementing on billing, minimum stock warning thresholds, and automatic stock restoration upon invoice deletion or cancellation.',
      },
      {
        title: 'Customer Ledger & Expense Tracking',
        description:
          'Track customer credit balances, outstanding payments, expense categorization, and generate monthly profit/loss reports.',
      },
      {
        title: 'A4 & Thermal Multi-Format Export',
        description:
          'Export invoices as professional full-page A4 PDFs with authorized signatures and bank details, or export compact thermal slips for quick retail handoffs.',
      },
      {
        title: 'Cross-Platform Native Binaries',
        description:
          'Native installers for macOS Apple Silicon (arm64) and Intel (x64) DMG/ZIP, Windows 10/11 NSIS installer and portable executable, and Linux DEB and AppImage packages.',
      },
    ],
    changes: [
      {
        category: 'Release Highlights',
        items: [
          'Direct GitHub Releases asset distribution with SHA-512 checksum validation.',
          'Automated background updater manifests for seamless client updates.',
          'Cross-platform operating system keychain and Electron safeStorage encryption.',
        ],
      },
    ],
  },
];
