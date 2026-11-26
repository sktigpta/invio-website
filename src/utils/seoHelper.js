import { FAQ_ITEMS } from '../data/faqData';

/**
 * Dynamic & SSG SEO Metadata + JSON-LD Registry for Invio Website
 * Pure computation works identically in Node build-time prerendering and browser runtime.
 */

export const BASE_URL = 'https://invio.timrio.com';
export const CURRENT_VERSION =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_APP_VERSION) ||
  '1.1.6';

export const MICROSOFT_STORE_INSTALL_URL =
  'https://apps.microsoft.com/detail/9nd42tj7n976?hl=en-US&gl=IN';

export const PAGE_METADATA = {
  home: {
    title: 'Invio Invoice – Free Invoice Software & Billing App | Timrio',
    description:
      'Invio Invoice is free invoice software and offline billing app for Windows, Mac & Linux. Make GST bills in seconds, print paper receipts with UPI QR codes, scan barcodes, track stock, and keep all records safely on your own computer.',
    canonical: `${BASE_URL}/`,
    keywords:
      'Invio invoice, Invio, Invio software, free invoice software, free invoice app, free invoice maker, free billing software, offline billing software, GST invoice software, shop billing software, retail POS software, Timrio',
    schemaType: 'SoftwareApplication',
    includeHomeFaqSchema: true,
  },
  features: {
    title: 'Features & Add-ons – Free Invoice Software, POS & Restaurant | Invio',
    description:
      'See everything Invio Invoice can do: free offline GST billing, A4/A5 PDFs, paper receipts with UPI QR, picture-tile POS, Customer POS Display, Restaurant table QR & kitchen screen, Email bills, and WhatsApp sharing.',
    canonical: `${BASE_URL}/features`,
    keywords:
      'Invio features, Invio invoice features, free invoice software, POS billing tiles, customer POS display, restaurant QR ordering, kitchen display screen, offline GST billing, receipt printing, email bills, WhatsApp bills',
    schemaType: 'SoftwareApplication',
  },
  pricing: {
    title: 'Pricing – Free Forever Invoice Plan & Invio Plus | Invio',
    description:
      'Transparent pricing for Invio Invoice: ₹0 Free forever for offline computer billing, Plus plan (₹149/mo or ₹999/yr) for small paper receipts, UPI QR on slips, Restaurant mode, and Email/WhatsApp sharing.',
    canonical: `${BASE_URL}/pricing`,
    keywords:
      'Invio pricing, free billing software, free invoice software, Invio Plus price, shop billing plan, retail POS plans',
    schemaType: 'WebPage',
  },
  checkout: {
    title: 'Checkout & Subscription – Upgrade to Invio Plus | Invio',
    description:
      'Upgrade to Invio Plus for small receipt printing, UPI QR codes on slips, Email & WhatsApp bills, and extra counter tools.',
    canonical: `${BASE_URL}/checkout`,
    keywords: 'Invio checkout, Invio Plus subscription, billing software upgrade, secure checkout',
    schemaType: 'WebPage',
    noindex: true,
    noindexFollow: true,
  },
  download: {
    title: 'Download Invio – Free Invoice App for Windows, Mac & Linux',
    description: `Download Invio v${CURRENT_VERSION} free for Windows 10/11 (Microsoft Store or .exe), Apple Mac (.dmg), and Linux. Free offline invoice software with safe local storage and no monthly cloud fees.`,
    canonical: `${BASE_URL}/download`,
    keywords:
      'Download Invio, Invio invoice download, free invoice software download, free invoice app Windows Mac, Invio Windows download, Invio Mac download, free billing software',
    schemaType: 'SoftwareApplication',
  },
  'free-invoice-software': {
    title: 'Free Invoice Software for PC, Mac & Linux (Free Forever) | Invio',
    description:
      'Looking for free invoice software with no trial expiry? Invio Invoice lets shops and freelancers create unlimited GST and normal invoices offline on Windows, Mac, and Linux—free forever.',
    canonical: `${BASE_URL}/free-invoice-software`,
    keywords:
      'free invoice software, free invoice app, free invoice maker, invio invoice, free billing software for PC, free invoice software for Mac, offline invoice software',
    schemaType: 'SoftwareApplication',
    parentCategory: 'Solutions',
    parentUrl: `${BASE_URL}/features`,
  },
  'offline-billing-software': {
    title: 'Free Offline Billing Software Without Internet | Invio',
    description:
      'Run your billing counter 100% offline with Invio. Save all invoices, stock, and customer credit records safely on your own computer with zero cloud fees or internet downtime.',
    canonical: `${BASE_URL}/offline-billing-software`,
    keywords:
      'offline billing software, offline invoice software, free offline billing app, billing software without internet, local shop billing software, Invio offline',
    schemaType: 'SoftwareApplication',
    parentCategory: 'Solutions',
    parentUrl: `${BASE_URL}/features`,
  },
  'gst-billing-software': {
    title: 'Free GST Billing Software & Tax Invoice Maker | Invio',
    description:
      'Create GST-compliant tax invoices in seconds with automatic CGST, SGST, and IGST splits, HSN/SAC codes, A4/A5 PDF printing, and monthly CA summary reports—free forever offline.',
    canonical: `${BASE_URL}/gst-billing-software`,
    keywords:
      'free GST billing software, GST invoice software, GST billing app, GST invoice maker, CGST SGST IGST billing software, Invio GST billing',
    schemaType: 'SoftwareApplication',
    parentCategory: 'Solutions',
    parentUrl: `${BASE_URL}/features`,
  },
  'pos-billing-software': {
    title: 'Free POS Billing Software, Receipt Printer & Restaurant QR | Invio',
    description:
      'Fast picture-tile POS billing, 58mm & 80mm thermal receipt printing with UPI QR, USB barcode scanners, Customer POS Display second screen, and Restaurant Table QR & Kitchen Screen.',
    canonical: `${BASE_URL}/pos-billing-software`,
    keywords:
      'free POS billing software, retail POS software, thermal receipt billing software, restaurant POS billing software, UPI QR billing app, Invio POS',
    schemaType: 'SoftwareApplication',
    parentCategory: 'Solutions',
    parentUrl: `${BASE_URL}/features`,
  },
  changelog: {
    title: 'Changelog & Release Notes – Version History | Invio',
    description:
      'Documenting all improvements, bug fixes, and feature releases for the Invio desktop invoicing application on Windows, macOS, and Linux.',
    canonical: `${BASE_URL}/changelog`,
    keywords: 'Invio changelog, release notes, version history, Invio updates, desktop app releases',
    schemaType: 'WebPage',
  },
  docs: {
    title: 'Documentation Hub & Setup Guides – Invio Invoice | Timrio',
    description:
      'Official documentation for Invio Invoice: setup instructions, system requirements, 58mm/80mm thermal printing, POS tiles, Restaurant QR, backups, and security.',
    canonical: `${BASE_URL}/docs`,
    keywords: 'Invio documentation, Invio docs, setup guide, system requirements, thermal printing guide, offline invoice database',
    schemaType: 'TechArticle',
  },
  'docs-download': {
    title: 'How to Download Invio – Official Desktop Packages | Timrio',
    description: `Download Invio v${CURRENT_VERSION} for Windows, macOS Apple Silicon & Intel, and Linux with verified installers.`,
    canonical: `${BASE_URL}/docs/download`,
    keywords: 'download Invio desktop, Invio installer, Microsoft Store Invio, Windows exe, macOS dmg',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-system': {
    title: 'System & Printer Requirements – Invio Docs | Timrio',
    description: 'Hardware, operating system (Windows, macOS, Linux), and thermal receipt printer specifications for Invio desktop invoicing.',
    canonical: `${BASE_URL}/docs/system`,
    keywords: 'Invio system requirements, minimum specs, thermal printer compatibility, ESC/POS, Windows 10, macOS',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-installation': {
    title: 'Installation Guide & Setup Instructions – Invio Docs | Timrio',
    description: 'Step-by-step installation instructions for Invio on Windows and macOS, including Microsoft Store setup and first-run walkthrough.',
    canonical: `${BASE_URL}/docs/installation`,
    keywords: 'Invio installation guide, install Invio Mac, install Invio Windows, installation walkthrough, desktop app setup',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-quickstart': {
    title: 'Quickstart & First Invoice Setup – Invio Docs | Timrio',
    description: 'Learn how to configure business profiles, UPI QR codes, catalogue items, and print your first retail invoice in 60 seconds.',
    canonical: `${BASE_URL}/docs/quickstart`,
    keywords: 'Invio quickstart, first invoice setup, UPI QR billing, store profile setup, retail billing',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-standard-printer': {
    title: 'A4 & A5 Office Printers Setup – Invio Docs | Timrio',
    description: 'Configure standard office inkjet and laser printers for full-page A4 and A5 GST invoices with authorized signatures and bank details.',
    canonical: `${BASE_URL}/docs/standard-printer`,
    keywords: 'A4 GST invoice printing, A5 bill printer, laser printer invoice, office printer setup Invio, PDF print',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-thermal-printer': {
    title: 'Thermal Receipt Printer Setup Guide – Invio Docs | Timrio',
    description: 'Complete setup guide for 58mm and 80mm ESC/POS thermal printers: USB, Ethernet LAN, silent printing, auto-cutting, and UPI QR codes.',
    canonical: `${BASE_URL}/docs/thermal-printer`,
    keywords: 'thermal printer setup, ESC/POS, 58mm receipt, 80mm POS receipt, silent print, cash drawer kick',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-barcode-hardware': {
    title: 'Barcode Scanners & Cash Drawers Hardware Setup – Invio Docs | Timrio',
    description: 'Plug-and-play USB and wireless barcode scanner integration and automatic cash drawer kick trigger on invoice print in Invio.',
    canonical: `${BASE_URL}/docs/barcode-hardware`,
    keywords: 'barcode scanner billing, retail POS scanner, USB barcode reader, cash drawer RJ11 setup, point and scan checkout',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-email-setup': {
    title: 'Email & SMTP Outbox Configuration – Invio Docs | Timrio',
    description: 'Connect Google Gmail via one-click OAuth or custom SMTP (ports 587/465, App Passwords) for automated PDF invoice delivery.',
    canonical: `${BASE_URL}/docs/email-setup`,
    keywords: 'Invio email setup, SMTP configuration, Gmail OAuth, invoice email, app password, email outbox',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-whatsapp': {
    title: 'How to Share Invoices on WhatsApp – Invio Docs | Timrio',
    description: 'Learn how to send invoices and bills to customers on WhatsApp for free directly from Invio desktop billing software.',
    canonical: `${BASE_URL}/docs/whatsapp`,
    keywords: 'WhatsApp invoice sharing, send bill WhatsApp, WhatsApp billing, free invoice sharing',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-pos-display': {
    title: 'Customer POS Display Screen Setup – Invio Docs | Timrio',
    description: 'Setup a second customer-facing monitor at your checkout counter to show live items, bill total, and UPI payment QR code.',
    canonical: `${BASE_URL}/docs/pos-display`,
    keywords: 'customer POS display, dual screen billing, counter screen, customer monitor POS, scan to pay screen',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-extensions-guide': {
    title: 'Add-Ons Store Guide – Invio Docs | Timrio',
    description: 'Learn how to turn official Invio add-ons on or off in 1 click without losing any bills or slowing down your computer.',
    canonical: `${BASE_URL}/docs/extensions-guide`,
    keywords: 'Invio add-ons, Invio store, POS add-on, restaurant add-on, email billing add-on',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-pos-extension': {
    title: 'POS (Counter Tile Billing) – Invio Docs | Timrio',
    description: 'Bill customers in seconds using picture product tiles, quick + and - buttons, small token slips, and live Customer POS Display updates.',
    canonical: `${BASE_URL}/docs/pos-extension`,
    keywords: 'POS billing, counter tile billing, retail POS, token receipt printing, Invio POS',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-restaurant-extension': {
    title: 'Restaurant & Table QR Ordering – Invio Docs | Timrio',
    description: 'Run your restaurant with table maps, phone QR menu ordering over shop Wi-Fi, a live kitchen screen, and 1-click GST billing.',
    canonical: `${BASE_URL}/docs/restaurant-extension`,
    keywords: 'restaurant billing, table QR ordering, kitchen screen, dine-in billing, cafe POS',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-pos-display-extension': {
    title: 'Customer POS Display – Invio Docs | Timrio',
    description: 'Connect a second screen at your counter to show live items, totals, store branding, and scan-and-pay UPI QR codes.',
    canonical: `${BASE_URL}/docs/pos-display-extension`,
    keywords: 'customer POS display, second screen billing, customer monitor POS, UPI QR customer screen',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-email-whatsapp-extensions': {
    title: 'Email & WhatsApp Bills – Invio Docs | Timrio',
    description: 'Send neat PDF bills to customers using Gmail or business email, and share instant bill summaries on WhatsApp in 1 click.',
    canonical: `${BASE_URL}/docs/email-whatsapp-extensions`,
    keywords: 'email invoice PDF, WhatsApp billing, send bill WhatsApp, offline email queue',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-backups': {
    title: 'Saving Backups of Your Data – Invio Docs | Timrio',
    description: 'Save a 1-click backup of your bills, products, and customers to a pen drive and move Invio to a new computer anytime.',
    canonical: `${BASE_URL}/docs/backups`,
    keywords: 'Invio backup, pen drive backup, export backup Invio, restore store data',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-security': {
    title: 'Security & Privacy Architecture – Invio Docs | Timrio',
    description: 'Overview of Invio zero-cloud privacy, OS-level credential encryption, and isolated desktop application architecture.',
    canonical: `${BASE_URL}/docs/security`,
    keywords: 'Invio security, offline privacy, zero cloud sync, credential encryption, desktop security',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  'docs-troubleshooting': {
    title: 'Troubleshooting & Support Guide – Invio Docs | Timrio',
    description: 'Troubleshooting guide for Invio: Printer connection issues, multi-terminal LAN billing mode, antivirus exclusions, and support contact.',
    canonical: `${BASE_URL}/docs/troubleshooting`,
    keywords: 'Invio troubleshooting, printer not printing, LAN billing mode, antivirus false positive, Invio support',
    schemaType: 'TechArticle',
    parentCategory: 'Documentation',
    parentUrl: `${BASE_URL}/docs`,
  },
  faq: {
    title: 'Frequently Asked Questions – Free Invoice Software | Invio',
    description: 'Simple answers to common questions about Invio Invoice: how your bills stay safe offline, receipt printer support, GST tax math, UPI QR codes, and free updates.',
    canonical: `${BASE_URL}/faq`,
    keywords: 'Invio FAQ, invio invoice FAQ, free invoice software FAQ, offline billing questions, receipt printer setup FAQ',
    schemaType: 'FAQPage',
  },
  privacy: {
    title: 'Privacy Policy – Invio Desktop Software | Timrio',
    description: 'Invio privacy policy: local-first invoice storage on your device, what account and support data we receive, Gmail and payment handling, marketing consent, and your privacy rights.',
    canonical: `${BASE_URL}/privacy-policy`,
    keywords: 'Invio privacy policy, data privacy, local data storage policy, DPDP compliance, zero cloud sync',
    schemaType: 'WebPage',
  },
  terms: {
    title: 'Terms of Use – Invio Software & Website | Timrio',
    description: 'Terms and conditions governing the use of Invio website and desktop software, user responsibilities, intellectual property, and limitations of liability.',
    canonical: `${BASE_URL}/terms`,
    keywords: 'Invio terms of use, terms and conditions, acceptable use, software terms',
    schemaType: 'WebPage',
  },
  eula: {
    title: 'End User License Agreement (EULA) – Invio Software | Timrio',
    description: 'Software license agreement for Invio: Grant of license, permitted uses, restrictions, local desktop installation terms, warranty disclaimers, and limitation of liability.',
    canonical: `${BASE_URL}/eula`,
    keywords: 'Invio EULA, software license agreement, desktop software license, end user license',
    schemaType: 'WebPage',
  },
  'cookie-policy': {
    title: 'Cookie Policy – Invio Website | Timrio',
    description: 'Information regarding cookies and client-side storage technologies on the Invio website and how user preferences are preserved.',
    canonical: `${BASE_URL}/cookie-policy`,
    keywords: 'Invio cookie policy, website cookies, tracking policy, local storage',
    schemaType: 'WebPage',
  },
  security: {
    title: 'How Invio Keeps Your Shop Data Safe | Invio',
    description: 'How Invio keeps your bills, customer records, and email passwords safe on your own computer without uploading your shop data to the internet.',
    canonical: `${BASE_URL}/security`,
    keywords: 'Invio security, offline privacy, safe shop data, privacy first',
    schemaType: 'WebPage',
  },
  contact: {
    title: 'Contact Us – Support & Business Identity | Timrio',
    description: 'Contact the team behind Invio Invoice. Email support, report issues, and verify Timrio business identity.',
    canonical: `${BASE_URL}/contact`,
    keywords: 'Contact Invio, Timrio contact, support email, developer contact',
    schemaType: 'ContactPage',
  },
  'report-bug': {
    title: 'Report a Bug or Hardware Issue – Issue Escalation | Invio',
    description: 'Submit technical bug reports, thermal printer compatibility issues, or application glitches directly to the Invio engineering team.',
    canonical: `${BASE_URL}/report-bug`,
    keywords: 'report bug Invio, issue escalation, support ticket, printer glitch, desktop crash log',
    schemaType: 'ContactPage',
  },
  tools: {
    title: 'Free Online Invoice Generator, GST & Tax Tools | Invio',
    description: 'Suite of 100% free online business tools: Free Online Invoice Generator, India GST calculator, FY 25-26 Income Tax calculator, UK & UAE VAT, and Payslip generator.',
    canonical: `${BASE_URL}/tools`,
    keywords: 'free online invoice generator, Invio free tools, GST calculator, income tax calculator, UK VAT calculator, payslip generator',
    schemaType: 'CollectionPage',
  },
  'invoice-generator': {
    title: 'Free Online Invoice Generator & PDF Maker – No Sign-Up | Invio',
    description: 'Create and print professional GST or regular invoices online for free with zero sign-up. Add shop details, items, taxes, and discounts, then save as PDF.',
    canonical: `${BASE_URL}/tools/invoice-generator`,
    keywords: 'free invoice generator, free online invoice maker, GST invoice generator online, free PDF invoice generator, Invio invoice generator',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'gst-calculator': {
    title: 'Free GST Calculator Online India – CGST, SGST & IGST | Invio',
    description: 'Calculate intra-state CGST & SGST splits, inter-state IGST, and reverse GST inclusive extractions across 0%, 5%, 12%, 18%, 28%, and 40% slabs.',
    canonical: `${BASE_URL}/tools/gst-calculator`,
    keywords: 'GST calculator India, CGST SGST calculator, IGST calculator, reverse GST calculator',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'income-tax-india': {
    title: 'Income Tax Calculator India FY 2025-26 (New vs Old Regime) | Invio',
    description: 'Calculate income tax liability comparing New Tax Regime (with ₹75,000 standard deduction) vs Old Tax Regime with instant tax slab and rebate comparison.',
    canonical: `${BASE_URL}/tools/income-tax-india`,
    keywords: 'Income tax calculator India, FY 2025-26 tax calculator, new vs old tax regime',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'vat-uk': {
    title: 'UK VAT Calculator (HMRC Standard 20% & Reduced 5%) | Invio',
    description: 'Calculate HMRC standard 20%, reduced 5%, and zero-rated VAT or reverse extract net prices from gross totals.',
    canonical: `${BASE_URL}/tools/vat-uk`,
    keywords: 'UK VAT calculator, HMRC 20% VAT calculator, reverse VAT UK',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'vat-uae': {
    title: 'UAE VAT Calculator (FTA 5%) – Online Tax Calculator | Invio',
    description: 'Calculate 5% UAE Federal Tax Authority VAT or reverse calculate net amounts from inclusive invoice totals.',
    canonical: `${BASE_URL}/tools/vat-uae`,
    keywords: 'UAE VAT calculator, FTA 5% VAT calculator, Dubai VAT reverse calculation',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'payslip-generator': {
    title: 'Free Payslip Generator – Monthly Employee Pay Slip Maker | Invio',
    description: 'Generate, customize, and print formal monthly employee salary pay slips for free with earnings, deductions, and net salary calculations.',
    canonical: `${BASE_URL}/tools/payslip-generator`,
    keywords: 'free payslip generator, salary slip maker online, employee pay slip PDF',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'paycheck-calc': {
    title: 'Take-Home Paycheck Calculator – Gross to Net Pay | Invio',
    description: 'Calculate net take-home salary after taxes, withholdings, and pre-tax deductions.',
    canonical: `${BASE_URL}/tools/paycheck-calc`,
    keywords: 'paycheck calculator, take home salary calculator, gross to net pay',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'hra-exemption': {
    title: 'HRA Exemption Calculator (Section 10(13A)) – Income Tax | Invio',
    description: 'Calculate tax-exempt House Rent Allowance under Section 10(13A) of the Income Tax Act for metro and non-metro cities.',
    canonical: `${BASE_URL}/tools/hra-exemption`,
    keywords: 'HRA exemption calculator, Section 10 13A calculator, house rent allowance tax',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'gratuity-calc': {
    title: 'Gratuity Calculator India – Payment of Gratuity Act 1972 | Invio',
    description: 'Calculate statutory employee gratuity payout using the 15/26 formula under the Payment of Gratuity Act 1972.',
    canonical: `${BASE_URL}/tools/gratuity-calc`,
    keywords: 'gratuity calculator India, 15/26 gratuity formula, Payment of Gratuity Act',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  'project-estimate': {
    title: 'Project Cost Estimator – Hourly Billing & Contingency | Invio',
    description: 'Estimate project costs, labor hours, direct costs, and contingency risk buffers for client proposals.',
    canonical: `${BASE_URL}/tools/project-estimate`,
    keywords: 'project cost estimator, freelance quote calculator, project budget estimator',
    schemaType: 'WebApplication',
    parentCategory: 'Free Tools',
    parentUrl: `${BASE_URL}/tools`,
  },
  '404': {
    title: '404 - Page Not Found | Invio',
    description: 'The requested page does not exist on Invio website.',
    canonical: null,
    noindex: true,
  },
};

function buildOrganizationNode() {
  return {
    '@type': 'Organization',
    '@id': 'https://timrio.com/#organization',
    name: 'Timrio',
    url: 'https://timrio.com/',
    logo: `${BASE_URL}/appLogo.png`,
    email: 'support@timrio.com',
    sameAs: [
      'https://twitter.com/timriocorp',
      'https://github.com/sktigpta/invio-desktop',
    ],
  };
}

function buildSoftwareAppNode(meta) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${BASE_URL}/#software`,
    name: 'Invio',
    alternateName: [
      'Invio Invoice',
      'Invio Invoice Software',
      'Invio Billing Software',
      'Invio App',
      'Invio POS',
    ],
    operatingSystem: 'Windows 10, Windows 11, macOS 11.0+, Linux 64-bit',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Invoicing Software, Billing Software, Point of Sale',
    softwareVersion: CURRENT_VERSION,
    isAccessibleForFree: true,
    description: meta.description,
    url: meta.canonical || `${BASE_URL}/`,
    downloadUrl: `${BASE_URL}/download`,
    installUrl: MICROSOFT_STORE_INSTALL_URL,
    softwareHelp: `${BASE_URL}/docs`,
    releaseNotes: `${BASE_URL}/changelog`,
    image: `${BASE_URL}/og-image.jpg`,
    screenshot: `${BASE_URL}/screenshots/hero.webp`,
    sameAs: [
      MICROSOFT_STORE_INSTALL_URL,
      'https://github.com/sktigpta/invio-desktop',
    ],
    featureList: [
      '100% Offline Billing Saved Safely on Your Computer',
      'Automatic GST Tax Calculation (CGST, SGST, IGST) on Bills',
      'Paper Receipt Printing (58mm and 80mm rolls) & A4/A5 PDFs',
      'UPI Payment QR Codes Printed on Receipts',
      'USB & Bluetooth Barcode Scanner Support',
      'Automatic Stock & Inventory Tracking with Low-Stock Alerts',
      'Customer Contacts and Credit (Udhar) Diary',
      'Official Add-ons: Picture-Tile POS, Customer POS Display, Restaurant Table QR & Kitchen Screen, Email & WhatsApp',
    ],
    offers: {
      '@type': 'Offer',
      name: 'Invio Free Forever Plan',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/download`,
    },
    author: { '@id': 'https://timrio.com/#organization' },
    publisher: { '@id': 'https://timrio.com/#organization' },
  };
}

function buildWebSiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Invio',
    alternateName: ['Invio Invoice', 'Invio by Timrio'],
    url: `${BASE_URL}/`,
    description:
      'Official website, downloads, calculators, and guides for Invio free invoice software and offline billing app.',
    publisher: { '@id': 'https://timrio.com/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/docs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Pure SEO builder used by both server-side prerendering and client-side navigation.
 */
export function buildPageSEOData(pageKey, overrides = {}) {
  const meta = { ...(PAGE_METADATA[pageKey] || PAGE_METADATA.home), ...overrides };
  const robots = meta.noindex
    ? meta.noindexFollow
      ? 'noindex, follow'
      : 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const graph = [];

  if (meta.schemaType === 'SoftwareApplication') {
    graph.push(buildSoftwareAppNode(meta));
    if (pageKey === 'home') {
      graph.push(buildWebSiteNode());
    }
    graph.push(buildOrganizationNode());

    if (meta.includeHomeFaqSchema) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.slice(0, 6).map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }
  } else if (meta.schemaType === 'FAQPage') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    graph.push(buildOrganizationNode());
  } else if (meta.schemaType === 'WebApplication') {
    graph.push({
      '@type': 'WebApplication',
      name: meta.title.split('–')[0].split('|')[0].trim(),
      description: meta.description,
      url: meta.canonical || BASE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (Web Browser)',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
      publisher: { '@id': 'https://timrio.com/#organization' },
    });
    graph.push(buildOrganizationNode());
  } else if (meta.schemaType) {
    graph.push({
      '@type': meta.schemaType,
      name: meta.title.split('–')[0].split('|')[0].trim(),
      description: meta.description,
      url: meta.canonical || BASE_URL,
      publisher: { '@id': 'https://timrio.com/#organization' },
    });
    graph.push(buildOrganizationNode());
  }

  if (meta.parentCategory && meta.parentUrl && meta.canonical) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.parentCategory,
          item: meta.parentUrl,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: meta.title.split('–')[0].split('|')[0].trim(),
          item: meta.canonical,
        },
      ],
    });
  }

  const jsonLd = graph.length > 0 ? { '@context': 'https://schema.org', '@graph': graph } : null;

  return {
    meta,
    robots,
    jsonLd,
    jsonLdString: jsonLd ? JSON.stringify(jsonLd) : '',
  };
}

/**
 * Dynamically updates document head tags and structured data in the browser.
 */
export function applySEO(pageKey, overrides = {}) {
  if (typeof document === 'undefined') return;
  const { meta, robots, jsonLdString } = buildPageSEOData(pageKey, overrides);

  if (meta.title) {
    document.title = meta.title;
  }

  const setMetaTag = (selector, attrName, attrValue, content) => {
    let el = document.querySelector(selector);
    if (!el && content) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    if (el && content !== undefined) {
      el.setAttribute('content', content);
    }
  };

  setMetaTag('meta[name="title"]', 'name', 'title', meta.title);
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
  if (meta.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  }
  setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

  const pageUrl = meta.canonical || (typeof window !== 'undefined' ? window.location.href : BASE_URL);
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', pageUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${BASE_URL}/og-image.jpg`);
  setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
  setMetaTag('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.title || 'Invio Invoice');
  setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'image/jpeg');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Invio');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', pageUrl);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${BASE_URL}/og-image.jpg`);
  setMetaTag('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.title || 'Invio Invoice');
  setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@timriocorp');

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (meta.canonical) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', meta.canonical);
  } else if (canonicalEl && meta.noindex) {
    canonicalEl.remove();
  }

  let scriptEl = document.getElementById('dynamic-jsonld');
  if (jsonLdString) {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = jsonLdString;
  } else if (scriptEl) {
    scriptEl.remove();
  }
}
