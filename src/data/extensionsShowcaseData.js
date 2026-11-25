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
    title: 'Simple & Fast Core',
    description:
      'Invio starts clean with everything a shop needs every day: fast GST bills, stock tracking, barcode scanning, customer dues, and sales reports.',
    icon: ZapIcon,
  },
  {
    title: 'Official & Safe Add-ons',
    description:
      'Every add-on is built and checked by Timrio. Your shop bills and customer records stay safe on your computer and never mix or break.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Turn On or Off Anytime',
    description:
      'Add or remove any tool in one click without losing a single bill, customer, or product. Only keep what your shop uses.',
    icon: PuzzleIcon,
  },
];

export const OFFICIAL_EXTENSIONS_SHOWCASE = [
  {
    id: 'timrio.pos-tiles',
    name: 'POS',
    tier: 'Free',
    status: 'Ready',
    category: 'Counter Billing',
    icon: CalculatorIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.pos-tiles',
    summary:
      'Fast touch-friendly picture billing for retail counters, cafes, and bakeries with quick token receipts and live customer screen updates.',
    capabilities: ['Quick Tiles', 'Token Printing', 'Customer Screen', 'Offline Ready'],
    integration:
      'Sends live items and UPI QR code straight to your Customer POS Display, prints small token slips, and updates your stock automatically.',
    highlights: [
      'Visual item cards with product photos, quick search, and out-of-stock checks',
      'Tap + or − right on each item card to build bills in seconds',
      '1-click small token slip printing with automatic token numbers (#1 to #999)',
      'Shows the live bill, UPI QR code, and Paid checkmark on the customer screen',
    ],
  },
  {
    id: 'timrio.pos-display',
    name: 'Customer POS Display',
    tier: 'Free',
    status: 'Ready',
    category: 'Customer Screen',
    icon: SparklesIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.pos-display',
    summary:
      'Turn any second monitor, counter tablet, or TV into a live customer-facing billing screen with itemized totals and scan-and-pay UPI QR.',
    capabilities: ['Second Screen', 'Live Bill', 'UPI QR Pay', 'Shop Branding'],
    integration:
      'Updates instantly from both your main Invoice screen and POS counter, showing the exact bill and payment status in real time.',
    highlights: [
      'Finds your second screen automatically with 1-click launch and full-screen view',
      'Shows customers every item, tax, discount, and final total clearly as you bill',
      'Displays a ready-to-scan UPI QR code for GPay, PhonePe, Paytm, and BHIM',
      'Shows your shop name and welcome message when no customer is at the counter',
    ],
  },
  {
    id: 'timrio.restaurant',
    name: 'Restaurant',
    tier: 'Plus',
    status: 'Ready',
    category: 'Food & Hospitality',
    icon: ReceiptIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.restaurant',
    summary:
      'Run your restaurant or cafe smoothly: table QR ordering on your shop Wi-Fi, a live kitchen screen for cooks, and 1-click GST billing.',
    capabilities: ['Table QR Menu', 'Kitchen Screen', 'Order Tracking', '1-Click Bill'],
    integration:
      'Takes customer table orders over your shop Wi-Fi, sends them straight to the kitchen, and turns finished orders into GST bills in one click.',
    highlights: [
      'Customers scan a table QR code to browse your menu and order—works without internet',
      'Live Kitchen Screen so chefs and staff see new orders and mark them ready right away',
      'Easy controls to mark dishes in/out of stock, add food photos, and print table QR stands',
      'Turn any table order into a paid Cash, UPI, or Card bill in one click',
    ],
  },
  {
    id: 'timrio.email',
    name: 'Email',
    tier: 'Plus',
    status: 'Ready',
    category: 'Customer Sharing',
    icon: MailIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.email',
    summary:
      'Send neat PDF bills to customers automatically using your Gmail or business email—even if your shop internet goes down for a while.',
    capabilities: ['1-Click Gmail', 'Auto Retry', 'PDF Bills', 'Safe Password Lock'],
    integration:
      'Creates PDF bills from your normal invoicing screen, keeps your email login locked safely on your computer, and sends queued emails once internet returns.',
    highlights: [
      'Connect your Gmail in 1 click, or enter your own business email settings with a quick test',
      'If internet disconnects, unsent emails wait safely and send automatically when you are back online',
      'Clean branded email bills with your shop logo, thank-you note, and tax summary',
      'Your email password is locked safely inside your computer—never saved as plain text',
    ],
  },
  {
    id: 'timrio.whatsapp',
    name: 'WhatsApp',
    tier: 'Plus',
    status: 'Beta',
    category: 'Customer Sharing',
    icon: PrinterIcon,
    logoUrl: 'https://api.invio.timrio.com/api/extensions/logo/timrio.whatsapp',
    summary:
      'Send bills on WhatsApp in one click with your own custom message, exact bill total, and your UPI payment ID included.',
    capabilities: ['1-Click Send', 'Custom Message', 'UPI Payment ID', 'Paperless'],
    integration:
      'Picks up the customer phone number, bill total, and your UPI ID straight from your invoice to open a ready-to-send WhatsApp message.',
    highlights: [
      'Send bills straight to WhatsApp right after saving or printing a bill',
      'Write your own friendly greeting message with customer name, bill number, and amount',
      'Include your UPI ID automatically so customers can pay from their phone right away',
      'Handles phone numbers and country codes automatically with zero extra cost per message',
    ],
  },
];
