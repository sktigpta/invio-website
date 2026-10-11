/**
 * Invio Product Metadata & Single Source of Truth
 * Powers website copy, JSON-LD Schema.org structured data,
 * and the Google Merchant Center multi-product feed.
 */

export const SHARED_PRODUCT_SPECS = {
  brand: 'Timrio',
  publisherUrl: 'https://timrio.com',
  homeUrl: 'https://invio.timrio.com/',
  productLandingUrl: 'https://invio.timrio.com/product',
  feedUrl: 'https://invio.timrio.com/feeds/google-merchant.tsv',
  category: 'BusinessApplication',
  applicationSubCategory: 'Invoicing & Inventory Management',
  googleProductCategory: 'Software > Computer Software > Business & Productivity Software',
  productType: 'Software > Invoicing Software > Desktop Billing App',
  condition: 'new',
  identifierExists: 'no',
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

/**
 * Three distinct commercial tiers / plans for Google Merchant Center & Website:
 * 1. invio-desktop-free (Free Core Plan, ₹0 / free forever)
 * 2. invio-desktop-plus-monthly (Invio Plus Monthly, ₹149 / month)
 * 3. invio-desktop-plus-yearly (Invio Plus Yearly, ₹999 / year)
 */
export const PRODUCT_TIERS = [
  {
    id: 'invio-desktop-free',
    name: 'Invio — Free Desktop Invoicing Software',
    shortName: 'Invio Free',
    planType: 'free',
    planPeriod: 'lifetime',
    price: '0.00',
    currency: 'INR',
    priceString: '0.00 INR',
    pricingDisplay: 'Free Forever',
    availability: 'in_stock',
    canonicalUrl: 'https://invio.timrio.com/product',
    description:
      'Invio by Timrio is a 100% free offline desktop invoicing software for Windows, macOS, and Linux. Unlimited offline bills, automated GST tax calculation (CGST/SGST/IGST), A4 PDF printing, barcode scanner checkout, customer credit ledger, and local SQLite data privacy.',
    features: [
      'Unlimited offline invoices & billing',
      'A4 & A5 invoice printing and PDF exports',
      'Automated GST tax calculation (CGST, SGST, IGST)',
      'Product catalog with barcode scanner support',
      'Customer directory & credit (udhar) ledger',
      '100% offline local SQLite database',
    ],
  },
  {
    id: 'invio-desktop-plus-monthly',
    name: 'Invio Plus Monthly — Desktop Invoicing Software',
    shortName: 'Invio Plus Monthly',
    planType: 'plus',
    planPeriod: 'monthly',
    price: '149.00',
    currency: 'INR',
    priceString: '149.00 INR',
    pricingDisplay: '₹149 / month',
    availability: 'in_stock',
    canonicalUrl: 'https://invio.timrio.com/subscription?plan=monthly',
    description:
      'Invio Plus Monthly Subscription by Timrio for Windows and macOS. Includes everything in Free plus 58mm/80mm thermal receipt printing, dynamic UPI payment QR codes, WhatsApp bill sharing, Gmail/SMTP invoice dispatch, dual-screen POS customer display, and automated backups.',
    features: [
      'Everything in Free Core plan',
      '58mm & 80mm thermal receipt roll printing',
      'Dynamic UPI payment QR codes on bills',
      'Automated email invoices (Gmail / SMTP)',
      'WhatsApp Web 1-click invoice sharing',
      'Dual-screen POS counter customer display',
      '1-click SQLite & PostgreSQL backup & restore',
      'Priority customer support',
    ],
  },
  {
    id: 'invio-desktop-plus-yearly',
    name: 'Invio Plus Yearly — Desktop Invoicing Software',
    shortName: 'Invio Plus Yearly',
    planType: 'plus',
    planPeriod: 'yearly',
    price: '999.00',
    currency: 'INR',
    priceString: '999.00 INR',
    pricingDisplay: '₹999 / year',
    availability: 'in_stock',
    canonicalUrl: 'https://invio.timrio.com/subscription',
    description:
      'Invio Plus Annual License by Timrio for Windows and macOS. Best value plan (save 44%). Full access to 58mm/80mm thermal printing, dynamic UPI QR codes, WhatsApp & email delivery, dual-screen POS customer display, local database backups, and dedicated priority support.',
    features: [
      'Everything in Free Core plan',
      '58mm & 80mm thermal receipt roll printing',
      'Dynamic UPI payment QR codes on bills',
      'Automated email invoices (Gmail / SMTP)',
      'WhatsApp Web 1-click invoice sharing',
      'Dual-screen POS counter customer display',
      '1-click SQLite & PostgreSQL backup & restore',
      'Priority customer support & 44% annual savings',
    ],
  },
];

// Default export preserving backward-compatibility with existing consumers
export const PRODUCT_METADATA = {
  ...SHARED_PRODUCT_SPECS,
  // Primary default product (Plus Yearly)
  ...PRODUCT_TIERS[2],
  // Legacy alias IDs
  legacyId: 'invio-desktop-plus',
  // Expose all tiers
  tiers: PRODUCT_TIERS,
};
