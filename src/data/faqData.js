export const FAQ_ITEMS = [
  {
    id: 'offline-storage',
    question: 'Where are my invoices and customer records stored?',
    answer: 'All your invoices, products, customer records, and financial summaries are stored 100% locally on your computer in an embedded SQLite database file. No business records or invoice contents are ever uploaded to Timrio cloud servers.',
  },
  {
    id: 'internet-connection',
    question: 'Do I need an active internet connection to use Invio?',
    answer: 'No. Invio is completely offline-first. You can create invoices, print thermal receipts, scan barcodes, and track stock without any internet connection. An internet connection is only needed when checking for software updates or sending digital invoices via email.',
  },
  {
    id: 'free-forever',
    question: 'Is the free invoice generator plan time-limited or restricted?',
    answer: 'No. The free core version of Invio has no trial period, no expiration date, and no limit on the number of invoices you can generate. It is free forever for desktop billing.',
  },
  {
    id: 'printers',
    question: 'Which printers and paper formats are supported?',
    answer: 'Invio supports standard ESC/POS thermal receipt printers in 58mm (2-inch) and 80mm (3-inch) roll widths. It also supports standard laser and inkjet desktop printers in full A4 and A5 document formats with custom letterhead.',
  },
  {
    id: 'upi-qr',
    question: 'How does the dynamic UPI QR code work on invoices?',
    answer: 'When you configure your UPI VPA ID in Settings, Invio dynamically generates an offline payment QR code encoded with the exact bill grand total. Customers can scan the code on the printed receipt with any UPI app (Google Pay, PhonePe, Paytm, BHIM) for instant payment.',
  },
  {
    id: 'barcode-scanners',
    question: 'Can I connect a hardware barcode scanner?',
    answer: 'Yes! Invio functions out of the box with any standard 1D or 2D USB/Bluetooth barcode scanner running keyboard emulation mode. Scanning an item at the counter immediately adds it to the active invoice.',
  },
  {
    id: 'backup-transfer',
    question: 'How do I back up or transfer my database to another PC?',
    answer: 'In Invio, navigate to Settings > Database and click "Export SQLite Backup". Copy the backup file to your new computer, install Invio, and select "Import Backup". Your entire product catalogue, customer ledger, and invoice history will be restored.',
  },
  {
    id: 'os-support',
    question: 'Which operating systems and architectures are supported?',
    answer: 'Invio runs natively on Windows 10/11 (64-bit), macOS 11.0+ (Universal build supporting Apple Silicon M1-M4 and Intel processors), and standard 64-bit Linux distributions via AppImage.',
  },
];
