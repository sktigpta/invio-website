/**
 * Invio Product Metadata & Single Source of Truth
 * Powers website copy, JSON-LD Schema.org structured data,
 * and the Google Merchant Center product feed.
 */

export const PRODUCT_METADATA = {
  // Feed-level commercial product identifier & pricing (compliant with Google Merchant Center price > 0 rule)
  id: 'invio-desktop-plus',
  name: 'Invio Plus — Desktop Invoicing Software',
  shortName: 'Invio Plus',
  brand: 'Timrio',
  publisherUrl: 'https://timrio.com',
  canonicalUrl: 'https://invio.timrio.com/subscription',
  productLandingUrl: 'https://invio.timrio.com/product',
  homeUrl: 'https://invio.timrio.com/',
  feedUrl: 'https://invio.timrio.com/feeds/google-merchant.tsv',

  // Google Merchant Center compliant description (plain text, max 5000 chars)
  description:
    'Invio Plus by Timrio is a privacy-first desktop invoicing and inventory management software for Windows and macOS. Features automated GST calculations (CGST, SGST, IGST), 58mm and 80mm thermal receipt printing with dynamic UPI payment QR codes, barcode scanner checkout, WhatsApp and email invoice dispatch, customer POS display, and 100% offline local SQLite storage.',

  fullDescription:
    'Invio Plus Desktop Invoicing Software is designed specifically for retail shops, freelancers, and small businesses who need fast, reliable billing without relying on an internet connection. Includes automated GST intra-state and inter-state tax splits, thermal receipt printing, dual-screen POS customer display, barcode scanner support, and local SQLite data storage.',

  // Legally compliant commercial pricing (matches https://invio.timrio.com/subscription)
  price: '999.00',
  currency: 'INR',
  priceString: '999.00 INR',
  pricingModel: 'Annual License',
  pricingSummary: '₹999 / year (or ₹149 / month) for Invio Plus with thermal printing, WhatsApp & email delivery, and priority support. A free forever core plan is also available.',
  availability: 'in_stock',
  condition: 'new',
  identifierExists: 'no', // Custom proprietary software without universal GTIN / barcode

  category: 'BusinessApplication',
  applicationSubCategory: 'Invoicing & Inventory Management',
  googleProductCategory: 'Software > Computer Software > Business & Productivity Software',
  productType: 'Software > Invoicing Software > Desktop Billing App',

  imageLink: 'https://invio.timrio.com/screenshots/dashboard.png',
  logoLink: 'https://invio.timrio.com/appLogo.png',
  ogImageLink: 'https://invio.timrio.com/og-image.jpg',

  targetAudience: 'Freelancers, retail shopkeepers, small businesses, and independent professionals.',

  supportedPlatforms: ['Windows', 'macOS', 'Linux'],

  systemRequirements: {
    windows: {
      os: 'Windows 10 or Windows 11 (64-bit)',
      processor: '1.6 GHz or faster 64-bit processor',
      ram: '4 GB RAM (8 GB recommended)',
      diskSpace: '250 MB available disk space',
      display: '1280 x 720 minimum screen resolution',
    },
    mac: {
      os: 'macOS 11.0 (Big Sur) or later',
      processor: 'Apple Silicon (M1/M2/M3/M4) or Intel 64-bit',
      ram: '4 GB RAM (8 GB recommended)',
      diskSpace: '250 MB available disk space',
      display: '1280 x 720 minimum screen resolution',
    },
    linux: {
      os: 'Ubuntu 20.04+, Debian 11+, Fedora 36+, or compatible 64-bit distribution',
      processor: '1.6 GHz or faster 64-bit processor',
      ram: '4 GB RAM',
      diskSpace: '250 MB available disk space',
      display: '1280 x 720 minimum screen resolution',
    },
  },

  installationInstructions: {
    windows: 'Download Invio for Windows (.exe installer). Double-click the downloaded setup file and follow the quick 1-step installer. Invio will launch automatically and create a desktop shortcut.',
    mac: 'Download Invio for macOS (.dmg). Open the .dmg file and drag the Invio icon into your Applications folder. Open Invio from Applications or Spotlight to begin billing.',
    linux: 'Download the Invio AppImage (.AppImage). Make the file executable via terminal (chmod +x Invio-*.AppImage) or File Properties > Permissions > "Allow executing file as program", then double-click to run.',
  },

  keyFeatures: [
    {
      title: 'Invoice Creation & GST Tax Engine',
      description:
        'Generate professional invoices in seconds. Includes automated intra-state CGST (50%) + SGST (50%) and inter-state IGST (100%) tax calculation, HSN code auto-completion, reverse MRP extraction, line item discounts, and numbers-to-words total conversion.',
    },
    {
      title: 'Thermal Receipts & A4 PDF Printing',
      description:
        'Print itemized retail slips on standard 58mm (2-inch) and 80mm (3-inch) thermal receipt printers with store branding and dynamic UPI QR payment codes. Also supports full-page A4/A5 PDF exports with bank details and authorized signature areas.',
    },
    {
      title: 'Barcode Scanner Hardware Integration',
      description:
        'Plug-and-play support for all standard USB and wireless handheld barcode scanners. Scanning items instantly increments quantities on the active bill without typing or search latency.',
    },
    {
      title: 'Product Catalog & Inventory Tracking',
      description:
        'Track stock quantities with automatic decrements on checkout, minimum stock warning alerts, and automatic inventory restoration upon invoice cancellation or deletion.',
    },
    {
      title: 'Customer Directory & Credit (Udhar) Ledger',
      description:
        'Maintain a customer directory with contact numbers, billing addresses, pending credit balances (udhar), partial payment logging, and detailed account history.',
    },
    {
      title: 'Invoice-Sharing Integrations',
      description:
        'Share invoices with customers in 1 click via WhatsApp Web or automated email delivery using secure Google OAuth or custom SMTP credentials.',
    },
    {
      title: 'Dual-Screen POS Customer Display',
      description:
        'Dedicated secondary monitor display for retail billing counters showing live scanned products, running totals, and an instant UPI QR payment code for the customer.',
    },
    {
      title: '100% Offline Local SQLite Storage',
      description:
        'All business data—invoices, customer details, inventory, expenses, and settings—lives strictly on your local machine in SQLite. Zero cloud requirement, complete immunity to internet outages, and zero telemetry.',
    },
  ],

  dataPrivacyGuarantee: {
    storageType: 'Local SQLite Database',
    telemetry: 'Zero Telemetry & Zero Cloud Sync by default',
    security: 'Optional OS Keychain encryption for email credentials and PostgreSQL connection strings',
    backup: 'One-click full database export and restore to local storage or external media',
  },

  supportContact: {
    email: 'support@timrio.com',
    website: 'https://timrio.com',
    docsUrl: 'https://invio.timrio.com/docs/features',
    privacyUrl: 'https://invio.timrio.com/privacy',
    termsUrl: 'https://invio.timrio.com/terms',
  },
};
