export const INTENT_LANDING_PAGES = {
  'free-invoice-software': {
    seoKey: 'free-invoice-software',
    path: '/free-invoice-software',
    badge: '100% Free Forever Core Plan',
    title: 'Free Invoice Software for Windows, Mac & Linux',
    subtitle:
      'Invio Invoice is free invoice software built for shops, freelancers, and small businesses. Create unlimited bills, manage stock and customer dues, and print clean A4 or A5 PDFs—with zero trial expiry and no internet required.',
    highlightsTitle: 'Why Invio is the top free invoice app for everyday billing',
    highlights: [
      {
        title: 'Unlimited Free Invoices Forever',
        description:
          'No 14-day trial lockouts, no per-invoice fees, and no monthly limit on bills, products, or customers on your computer.',
      },
      {
        title: 'Works Offline on Windows, Mac & Linux',
        description:
          'Install Invio directly on Windows 10/11 (including Microsoft Store), Apple Mac, or Linux and keep billing even when Wi-Fi goes down.',
      },
      {
        title: 'Automatic GST & Regular Tax Math',
        description:
          'Handles CGST, SGST, IGST, discounts, HSN/SAC codes, and totals in words automatically—or try our free online invoice generator in your browser.',
      },
      {
        title: 'Your Shop Data Stays on Your Computer',
        description:
          'Unlike cloud apps that hold your customer phone numbers hostage behind paid subscriptions, Invio saves every record locally with 1-click USB backups.',
      },
    ],
    comparisonRows: [
      { label: 'Core billing, stock & customers', invio: 'Free forever (₹0)', cloud: 'Free trial or capped invoices' },
      { label: 'Works without internet', invio: '100% offline', cloud: 'Requires active internet connection' },
      { label: 'Where shop records are stored', invio: 'Safely on your computer', cloud: 'Uploaded to third-party servers' },
      { label: 'Desktop OS support', invio: 'Windows, Mac & Linux', cloud: 'Usually browser or Windows only' },
      { label: 'UPI QR & paper receipts', invio: 'Built-in & Plus ready', cloud: 'Often paid add-on' },
    ],
    relatedLinks: [
      { label: 'Try Free Online Invoice Generator', to: '/tools/invoice-generator' },
      { label: 'Explore Offline Billing Software', to: '/offline-billing-software' },
      { label: 'See GST Billing Features', to: '/gst-billing-software' },
      { label: 'Compare Free & Plus Plans', to: '/pricing' },
    ],
    ctaTitle: 'Download Invio Free Invoice Software',
    ctaSubtitle:
      'Install Invio Invoice in under 1 minute on Windows, Mac, or Linux. No credit card or sign-up required.',
    faqs: [
      {
        id: 'fis-really-free',
        question: 'Is Invio invoice software really free forever?',
        answer:
          'Yes. The Free plan gives you unlimited offline invoices, customer contacts, inventory tracking, barcode scanning, and A4/A5 PDF bills with no expiry date or invoice cap.',
      },
      {
        id: 'fis-no-signup',
        question: 'Can I make invoices offline without monthly cloud fees?',
        answer:
          'Yes. Invio runs directly on your Windows, Mac, or Linux computer and saves all your bills locally, so there are zero monthly cloud server charges.',
      },
      {
        id: 'fis-online-tool',
        question: 'Can I make a quick invoice in my browser without installing anything?',
        answer:
          'Yes. You can use our Free Online Invoice Generator right in your browser to build and print/save a PDF invoice anytime.',
      },
      {
        id: 'fis-plus',
        question: 'When would I ever need Invio Plus?',
        answer:
          'Upgrade to Invio Plus only if your shop wants small 58mm/80mm paper receipt printing, dynamic UPI QR codes on thermal slips, Restaurant QR ordering, or 1-click Email/WhatsApp bill sharing.',
      },
    ],
  },
  'offline-billing-software': {
    seoKey: 'offline-billing-software',
    path: '/offline-billing-software',
    badge: 'Zero Internet Needed',
    title: 'Offline Billing Software That Never Stops',
    subtitle:
      'Keep your billing counter running at full speed even when your shop internet disconnects. Invio saves every invoice, product, and customer record safely on your own computer with instant local speed.',
    highlightsTitle: 'Built for reliable offline counter billing & data privacy',
    highlights: [
      {
        title: 'Zero Internet Downtime at Checkout',
        description:
          'Make bills, scan barcodes, print receipts, and update stock without waiting for slow cloud web pages or server timeouts.',
      },
      {
        title: '100% Private Local Storage',
        description:
          'Your sales history, profit margins, and customer phone numbers stay strictly on your own computer—never uploaded or mined.',
      },
      {
        title: '1-Click Pen Drive Backups',
        description:
          'Export a full backup file to a USB pen drive or local folder anytime and restore everything onto a new shop computer in seconds.',
      },
      {
        title: 'Optional Shop Wi-Fi Multi-Counter Mode',
        description:
          'When your store grows to multiple counters, connect billing PCs over your own local shop Wi-Fi without sending data to the public cloud.',
      },
    ],
    comparisonRows: [
      { label: 'Billing during internet outage', invio: 'Full speed offline', cloud: 'Blocked or sync conflicts' },
      { label: 'Checkout response speed', invio: 'Instant local database', cloud: 'Depends on internet speed' },
      { label: 'Customer data ownership', invio: '100% yours on your PC', cloud: 'Hosted on vendor cloud' },
      { label: 'Pen drive backup & restore', invio: '1-click anytime', cloud: 'Limited export formats' },
    ],
    relatedLinks: [
      { label: 'Free Invoice Software Overview', to: '/free-invoice-software' },
      { label: 'Read Backup & Restore Guide', to: '/docs/backups' },
      { label: 'How Invio Protects Your Data', to: '/security' },
      { label: 'Download Desktop App', to: '/download' },
    ],
    ctaTitle: 'Get Reliable Offline Billing Software Free',
    ctaSubtitle:
      'Keep billing without internet interruptions on Windows, Mac, and Linux.',
    faqs: [
      {
        id: 'obs-internet',
        question: 'What features work completely offline in Invio?',
        answer:
          'Making invoices, printing A4/A5 PDFs and thermal receipts, generating UPI QR codes, scanning barcodes, updating stock, tracking customer credit (udhar), and viewing sales reports all work 100% offline.',
      },
      {
        id: 'obs-multi-pc',
        question: 'Can I connect two billing counters in the same shop offline?',
        answer:
          'Yes. Invio supports connecting multiple computers over your own local shop Wi-Fi or LAN network without uploading your data to the internet.',
      },
      {
        id: 'obs-backup',
        question: 'What happens if I buy a new shop laptop?',
        answer:
          'Click Export Backup in Settings to save a backup file to a pen drive, install Invio on your new PC or Mac, and click Import Backup to restore all bills, items, and customers.',
      },
    ],
  },
  'gst-billing-software': {
    seoKey: 'gst-billing-software',
    path: '/gst-billing-software',
    badge: 'GST Compliant & Fast',
    title: 'Free GST Billing Software & Tax Invoice Maker',
    subtitle:
      'Generate accurate GST tax invoices with automatic CGST, SGST, and IGST splits, HSN/SAC codes, inclusive or exclusive pricing, and clean A4/A5 or thermal bills—free forever for core desktop billing.',
    highlightsTitle: 'Everything small shops & wholesalers need for GST bills',
    highlights: [
      {
        title: 'Automatic CGST, SGST & IGST Splits',
        description:
          'Invio checks your shop state and customer GSTIN state code automatically to split local taxes (CGST + SGST) or apply IGST for out-of-state buyers.',
      },
      {
        title: 'HSN / SAC Codes & Tax-Inclusive Support',
        description:
          'Supports 0%, 5%, 12%, 18%, 28% and custom GST slabs whether your MRP already includes tax or adds GST on top.',
      },
      {
        title: 'A4 Tax Invoices & Monthly CA Reports',
        description:
          'Print neat A4/A5 tax invoices with your shop logo, bank details, and authorized signature block, and export monthly GST sales spreadsheets for your accountant.',
      },
      {
        title: 'Free Browser GST Calculator Included',
        description:
          'Need a quick reverse-GST check before making a bill? Use our free India GST Calculator right in your browser anytime.',
      },
    ],
    comparisonRows: [
      { label: 'CGST / SGST / IGST auto-split', invio: 'Automatic from GSTIN', cloud: 'Supported' },
      { label: 'MRP inclusive & exclusive math', invio: 'Built-in toggle', cloud: 'Supported' },
      { label: 'A4 / A5 GST PDF generation', invio: 'Free forever offline', cloud: 'Often gated or watermarked' },
      { label: 'GSTR summary CSV export', invio: 'Included free', cloud: 'Often paid plan only' },
    ],
    relatedLinks: [
      { label: 'Open Free India GST Calculator', to: '/tools/gst-calculator' },
      { label: 'Create Free Online GST Invoice', to: '/tools/invoice-generator' },
      { label: 'A4 & A5 Printer Setup Guide', to: '/docs/standard-printer' },
      { label: 'Download Invio Free', to: '/download' },
    ],
    ctaTitle: 'Start Making GST Invoices for Free',
    ctaSubtitle:
      'Download Invio GST billing software for Windows, Mac, or Linux—or calculate tax instantly online.',
    faqs: [
      {
        id: 'gbs-gstin',
        question: 'Can I make both GST and non-GST bills in Invio?',
        answer:
          'Yes. Enter your GSTIN to generate tax invoices with CGST, SGST, IGST, and HSN summaries, or leave GSTIN blank for regular retail cash memos and estimates.',
      },
      {
        id: 'gbs-reverse',
        question: 'Does Invio support tax-inclusive retail pricing (MRP billing)?',
        answer:
          'Yes. You can mark product prices as tax-inclusive or tax-exclusive, and Invio automatically calculates the exact taxable base and GST breakdown on the bill.',
      },
      {
        id: 'gbs-reports',
        question: 'Can I export GST sales data for my accountant?',
        answer:
          'Yes. Invio includes daily and monthly GST sales summary reports that export cleanly to CSV/Excel for your CA or tax filing.',
      },
    ],
  },
  'pos-billing-software': {
    seoKey: 'pos-billing-software',
    path: '/pos-billing-software',
    badge: 'Counter POS & Restaurant Ready',
    title: 'POS Billing Software, Receipt Printing & Restaurant QR',
    subtitle:
      'Speed up your retail counter or cafe with picture-tile POS checkout, 58mm & 80mm thermal receipts with UPI QR codes, USB barcode scanners, a second customer screen, and table QR ordering for restaurants.',
    highlightsTitle: 'Modular POS tools you can turn on in 1 click',
    highlights: [
      {
        title: 'Picture-Tile POS & Token Slips',
        description:
          'Tap product photos with quick + and − controls, search items instantly, and print compact paper token slips for fast-moving counters.',
      },
      {
        title: '58mm & 80mm Thermal Receipts + UPI QR',
        description:
          'Connect USB or LAN thermal receipt printers for instant silent auto-printing with a dynamic scan-and-pay UPI QR code for the exact bill total.',
      },
      {
        title: 'Live Customer POS Display Screen',
        description:
          'Turn any second monitor or TV at the counter into a live customer screen showing items, totals, store branding, and a large UPI payment QR code.',
      },
      {
        title: 'Restaurant Table QR & Kitchen Screen',
        description:
          'Print table QR stands so dine-in guests order over your shop Wi-Fi directly to a live Kitchen Screen, then convert any table to a GST bill in 1 click.',
      },
    ],
    comparisonRows: [
      { label: 'Picture-tile POS & Customer Screen', invio: 'Free official add-ons', cloud: 'Expensive POS tier' },
      { label: '58mm & 80mm silent thermal print', invio: 'Built into Invio Plus', cloud: 'Often Windows-only plugins' },
      { label: 'Table QR menu over shop Wi-Fi', invio: 'Works without internet', cloud: 'Requires active internet' },
      { label: 'USB barcode & cash drawer kick', invio: 'Plug-and-play ready', cloud: 'Hardware lock-in common' },
    ],
    relatedLinks: [
      { label: 'Thermal Printer Setup Guide', to: '/docs/thermal-printer' },
      { label: 'POS Tile Billing Guide', to: '/docs/pos-extension' },
      { label: 'Restaurant & Table QR Guide', to: '/docs/restaurant-extension' },
      { label: 'Customer POS Display Guide', to: '/docs/pos-display-extension' },
    ],
    ctaTitle: 'Upgrade Your Counter With Invio POS',
    ctaSubtitle:
      'Start free with desktop billing and POS tiles, then enable thermal receipts, UPI QR, and Restaurant mode whenever your shop is ready.',
    faqs: [
      {
        id: 'pos-printers',
        question: 'Which thermal printers and barcode scanners work with Invio?',
        answer:
          'Invio works with standard 58mm (2-inch) and 80mm (3-inch) ESC/POS thermal printers (TVS, Epson, Citizen, Everycom, generic USB/LAN) and all plug-and-play USB or Bluetooth barcode scanners.',
      },
      {
        id: 'pos-display-free',
        question: 'Is the Picture-Tile POS and Customer POS Display included?',
        answer:
          'Yes! Both the POS picture-tile add-on and Customer POS Display add-on are listed as Free in the official Invio Add-ons store.',
      },
      {
        id: 'pos-restaurant-wifi',
        question: 'Does Restaurant Table QR ordering work if internet goes out?',
        answer:
          'Yes. Guests scan your table QR code and send orders over your local shop Wi-Fi straight to your counter and Kitchen Screen without needing external internet.',
      },
    ],
  },
};
