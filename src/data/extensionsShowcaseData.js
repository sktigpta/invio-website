import {
  CalculatorIcon,
  MailIcon,
  PrinterIcon,
  PuzzleIcon,
  ReceiptIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ZapIcon,
} from '../components/Icons';

export const MODULARITY_PILLARS = [
  {
    title: 'Lean Core, Zero Bloat',
    description:
      'Invio Core stays fast and focused on GST billing, inventory, barcode scanning, customer ledgers, and reports. Heavy workflows only load when you enable them.',
    icon: ZapIcon,
  },
  {
    title: 'Signed & Sandboxed',
    description:
      'Every official extension is Ed25519 signed and SHA-256 verified, running inside an isolated sandbox with capability-checked bridges and dedicated local storage.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Enable or Remove Anytime',
    description:
      'Turn extensions on or off in one click without touching your SQLite or PostgreSQL business data. Stylesheets and background services mount and unmount cleanly.',
    icon: PuzzleIcon,
  },
];

export const OFFICIAL_EXTENSIONS_SHOWCASE = [
  {
    id: 'timrio.pos-tiles',
    name: 'POS',
    tier: 'Free',
    status: 'Ready',
    category: 'Point of Sale',
    icon: CalculatorIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.pos-tiles',
    summary:
      'High-speed touch-friendly visual counter billing for retail stores, cafes, and receptions with instant thermal tokens and live Customer POS Display sync.',
    capabilities: ['Navigation', 'Printing', 'Settings', 'Local Storage'],
    integration:
      'Syncs live cart & UPI QR directly to Customer POS Display, prints tight thermal tokens, and records paid invoices with automatic stock deduction.',
    highlights: [
      'Visual item tile grid with shared product/dish photos, live search, and stock guards',
      'On-tile quantity controls (+, −, badge) for rapid touch or mouse checkout',
      '1-click thermal receipt token printing with auto-incrementing token numbers (#1–#999)',
      'Automatically pushes cart totals, UPI QR, and Paid confirmation to Customer POS Display',
    ],
  },
  {
    id: 'timrio.pos-display',
    name: 'Customer POS Display',
    tier: 'Free',
    status: 'Ready',
    category: 'Point of Sale',
    icon: SparklesIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.pos-display',
    summary:
      'Turn any secondary monitor, counter tablet, or TV into a live customer-facing billing screen with real-time itemization and dynamic UPI QR payments.',
    capabilities: ['Navigation', 'Multi-Monitor', 'Local Storage'],
    integration:
      'Receives zero-lag IPC updates from both the core Invoice Editor and the POS extension, including live payment status and countdown timers.',
    highlights: [
      'Multi-monitor detection with 1-click launch, move-to-display, and fullscreen support',
      'Real-time itemized cart, tax breakdown, discount, and grand total display',
      'Dynamic exact-amount UPI QR code for GPay, PhonePe, Paytm, and BHIM scan-to-pay',
      'Customizable idle welcome banner and shop branding when no bill is active',
    ],
  },
  {
    id: 'timrio.restaurant',
    name: 'Restaurant',
    tier: 'Plus',
    status: 'Ready',
    category: 'Hospitality',
    icon: ReceiptIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.restaurant',
    summary:
      'Complete restaurant operations inside Invio: local Wi-Fi QR table ordering web app, live Kitchen Display System (KDS), and 1-click invoice conversion.',
    capabilities: ['Navigation', 'Restaurant Server', 'Printing', 'Reports', 'Local Storage'],
    integration:
      'Runs an embedded local Wi-Fi server for table QR ordering, syncs KDS tickets, and converts completed orders into official core GST invoices.',
    highlights: [
      'Local Wi-Fi mobile menu & ordering portal—customers scan table QR codes with no internet needed',
      'Live Kitchen Display (KDS) with rotating OTP access and real-time order status tracking',
      'Menu availability toggles, veg/non-veg badges, dish photo management, and QR stand generator',
      '1-click order-to-invoice conversion supporting Cash, UPI, and Card payment sync',
    ],
  },
  {
    id: 'timrio.email',
    name: 'Email',
    tier: 'Plus',
    status: 'Ready',
    category: 'Communication',
    icon: MailIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.email',
    summary:
      'Automated PDF invoice delivery via 1-click Gmail OAuth or Custom SMTP, backed by an offline-resilient outbox queue and custom HTML templates.',
    capabilities: ['Email Dispatch', 'Settings', 'Printing', 'Local Storage'],
    integration:
      'Generates PDF invoices from core billing, encrypts SMTP/OAuth credentials in the OS keychain, and retries queued emails automatically when online.',
    highlights: [
      '1-click Gmail OAuth authorization or Custom SMTP (host, port, TLS/SSL) with connection test',
      'Offline-resilient background delivery outbox with automatic retries and health status',
      'Customizable branded HTML invoice templates with shop logo, greeting, and tax summary',
      'Secure OS keychain / safeStorage credential protection—never stored in plain text',
    ],
  },
  {
    id: 'timrio.whatsapp',
    name: 'WhatsApp',
    tier: 'Plus',
    status: 'Beta',
    category: 'Communication',
    icon: PrinterIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.whatsapp',
    summary:
      '1-click customer WhatsApp billing dispatch with customizable message templates, dynamic invoice totals, and embedded UPI payment instructions.',
    capabilities: ['Settings', 'Local Storage'],
    integration:
      'Reads your configured template and UPI settings to launch pre-filled WhatsApp Web or Desktop drafts directly from any core invoice.',
    highlights: [
      '1-click invoice & receipt dispatch from Invoice View or directly after checkout',
      'Customizable message template supporting {customer_name}, {invoice_id}, {amount_due}, and {upiId}',
      'Optional automatic UPI payment ID inclusion for instant customer settlement',
      'International phone formatting with automatic country-code normalization',
    ],
  },
];
