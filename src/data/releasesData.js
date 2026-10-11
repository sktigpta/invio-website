/**
 * Invio Product Releases & Changelog Registry
 * Matches real GitHub Releases from sktigpta/invio-desktop
 */

export const RELEASES_DATA = [
  {
    version: '1.0.1',
    tag: 'v1.0.1',
    name: 'Invio v1.0.1 — Multi-Platform Release',
    date: 'October 2026',
    publishedAt: '2026-10-07T02:46:15Z',
    isLatest: true,
    badge: 'Latest Release',
    githubUrl: 'https://github.com/sktigpta/invio-desktop/releases/tag/v1.0.1',
    commitCompareUrl: 'https://github.com/sktigpta/invio-desktop/compare/v1.0.0...v1.0.1',
    summary:
      'Official multi-platform release of Invio: A privacy-first, 100% offline desktop invoicing and inventory management suite for retail shops, small businesses, and freelancers across Windows, macOS, and Linux.',
    highlights: [
      'Dual-Screen POS Customer Display: Secondary monitor projection showing live cart items and instant UPI payment QR.',
      'ESC/POS Thermal Paper Printing: Full compatibility with 58mm (2-inch) and 80mm (3-inch) thermal slip printers.',
      'Dynamic UPI Payment QR Codes: Automated generation of merchant UPI QR codes with exact bill amounts.',
      'Automated GST Tax Engine: Instant CGST, SGST, and IGST tax splits across all standard tax slabs.',
      'Hardware Barcode Gun Integration: Real-time HID scanning with automatic quantity incrementation.',
      '100% Offline Local SQLite Privacy: All invoices, customers, and stock remain on your computer.',
      'Verified Release Binaries: Signed and checksummed packages distributed via GitHub Actions CI pipeline.',
    ],
    assets: [
      {
        platform: 'windows',
        name: 'Invio-1.0.1-win-x64.exe',
        type: 'Installer (.exe)',
        size: '113.9 MB',
        arch: 'x64 (64-bit)',
        recommended: true,
      },
      {
        platform: 'windows',
        name: 'Invio-1.0.1-win-x64-portable.exe',
        type: 'Portable (.exe)',
        size: '113.8 MB',
        arch: 'x64 (64-bit)',
        recommended: false,
      },
      {
        platform: 'mac',
        name: 'Invio-1.0.1-mac-arm64.dmg',
        type: 'Disk Image (.dmg)',
        size: '133.3 MB',
        arch: 'Apple Silicon (M1/M2/M3/M4)',
        recommended: true,
      },
      {
        platform: 'mac',
        name: 'Invio-1.0.1-mac-x64.dmg',
        type: 'Disk Image (.dmg)',
        size: '139.6 MB',
        arch: 'Intel 64-bit',
        recommended: false,
      },
      {
        platform: 'linux',
        name: 'Invio-1.0.1-linux-x86_64.AppImage',
        type: 'AppImage Package',
        size: '130.1 MB',
        arch: 'x86_64 / amd64',
        recommended: true,
      },
      {
        platform: 'linux',
        name: 'Invio-1.0.1-linux-amd64.deb',
        type: 'Debian / Ubuntu (.deb)',
        size: '102.3 MB',
        arch: 'Debian 64-bit',
        recommended: false,
      },
    ],
  },
  {
    version: '1.0.0',
    tag: 'v1.0.0',
    name: 'Invio v1.0.0 — Initial Production Release',
    date: 'October 2026',
    publishedAt: '2026-10-02T10:15:00Z',
    isLatest: false,
    badge: 'Initial Release',
    githubUrl: 'https://github.com/sktigpta/invio-desktop/releases/tag/v1.0.0',
    summary:
      'Foundational production release of Invio: Desktop offline billing application with embedded SQLite database, product inventory tracking, customer ledger, and A4/A5 PDF generation.',
    highlights: [
      'Local SQLite embedded database engine with zero external dependencies.',
      'Product catalogue with SKU, barcode, MRP, purchase cost, and sale price tracking.',
      'Customer accounts with credit balance (udhar) management.',
      'A4 & A5 invoice design with custom store logo and bank wire details.',
    ],
  },
];
