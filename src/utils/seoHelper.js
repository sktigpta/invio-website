/**
 * Dynamic SEO & Structured Data Registry for Invio Website
 * Manages route-specific metadata: title, description, canonical, OG, Twitter, and JSON-LD structured data.
 */

import { FAQ_ITEMS } from '../data/faqData';

export const BASE_URL = 'https://invio.timrio.com';

export const PAGE_METADATA = {
  home: {
    title: 'Invio – Free Invoice Generator App & Offline Billing Software | Timrio',
    description: 'Invio is a free offline invoice generator app & desktop billing software for Windows and Mac. Create GST invoices, print thermal receipts with UPI QR codes, scan barcodes, and keep records in 100% private local SQLite.',
    canonical: `${BASE_URL}/`,
    keywords: 'Invio, invoice generator app, free invoice software, free invoice generator, offline invoice software, GST billing software, desktop invoice app, Windows invoice app, Mac invoice maker, retail billing software, store billing app, UPI QR invoice generator, Timrio',
    schemaType: 'SoftwareApplication',
  },
  product: {
    title: 'Invio Desktop Invoicing App – Free Billing & GST Software for PC & Mac',
    description: 'Invio desktop invoice generator app: Fast retail checkout, thermal receipts, automated GST calculations, barcode scanner support, and private local SQLite storage with zero cloud dependencies.',
    canonical: `${BASE_URL}/features`,
    keywords: 'Invio product, offline invoice software, desktop billing app, retail POS software, GST invoice software, Timrio Invio, invoice maker for Mac, free invoice app for Windows',
    schemaType: 'SoftwareApplication',
  },
  features: {
    title: 'Features – Free Offline Invoice Generator App & GST Billing Software | Invio',
    description: 'Discover all Invio features: 100% offline desktop billing, automated GST tax calculations, thermal receipt printing with dynamic UPI QR codes, barcode scanner integration, and private local SQLite storage.',
    canonical: `${BASE_URL}/features`,
    keywords: 'Invio features, invoice generator app, free invoice software, offline billing software, GST invoice software, thermal receipt printing, barcode billing software, desktop invoice app, retail POS software',
    schemaType: 'SoftwareApplication',
  },
  pricing: {
    title: 'Pricing – Free Core, Plus POS & Pro Enterprise Plans | Invio',
    description: 'Transparent pricing for Invio: Free Core forever for offline desktop billing, Plus plan for thermal receipts and UPI QR, and Pro Enterprise for multi-user cashier roles and audit analytics.',
    canonical: `${BASE_URL}/pricing`,
    keywords: 'Invio pricing, free billing software, desktop invoice price, Invio Plus license, Invio Pro plan, enterprise invoice software, retail POS plans',
    schemaType: 'WebPage',
  },
  checkout: {
    title: 'Checkout & Subscription – Upgrade to Invio Plus | Invio',
    description: 'Upgrade to Invio Plus for advanced thermal receipt printing, dynamic UPI QR codes, and multi-user retail checkout.',
    canonical: `${BASE_URL}/checkout`,
    keywords: 'Invio checkout, Invio Plus subscription, billing software upgrade, secure checkout',
    schemaType: 'WebPage',
  },
  download: {
    title: 'Download Invio – Free Invoice Software & Generator App for Windows & Mac',
    description: 'Download Invio v1.0.2 for Windows 10/11 and macOS. Free offline desktop invoice generator app with local SQLite data storage, instant thermal printing, and zero cloud lock-in.',
    canonical: `${BASE_URL}/download`,
    keywords: 'Download Invio, Invio Windows download, Invio Mac download, desktop invoicing installer, download billing software',
    schemaType: 'SoftwareApplication',
  },
  changelog: {
    title: 'Changelog & Release Notes – Version History | Invio',
    description: 'Documenting all improvements, bug fixes, and feature releases for Invio desktop application on Windows and macOS.',
    canonical: `${BASE_URL}/changelog`,
    keywords: 'Invio changelog, release notes, version history, Invio updates, desktop app releases',
    schemaType: 'WebPage',
  },
  'system-requirements': {
    title: 'System Requirements – Windows & macOS Compatibility | Invio',
    description: 'Verify system requirements for Invio: Supported Windows and macOS versions, minimum RAM, processor architecture (Apple Silicon M-series, Intel, x64), and disk space.',
    canonical: `${BASE_URL}/docs/system`,
    keywords: 'Invio system requirements, minimum requirements, Windows 10 compatibility, macOS Apple Silicon compatibility, disk space',
    schemaType: 'WebPage',
  },
  docs: {
    title: 'Documentation Hub & Guides – Invio Desktop Invoicing | Timrio',
    description: 'Official documentation for Invio: Setup instructions, system requirements, ESC/POS thermal printing configuration, database backups, and security architecture.',
    canonical: `${BASE_URL}/docs`,
    keywords: 'Invio documentation, Invio docs, setup guide, system requirements, thermal printing guide, offline invoice database',
    schemaType: 'TechArticle',
  },
  'docs-download': {
    title: 'How to Download Invio – Official Desktop Packages | Timrio',
    description: 'Download Invio v1.0.2 for Windows, macOS Apple Silicon & Intel, and Linux with SHA-256 integrity verification.',
    canonical: `${BASE_URL}/docs/download`,
    keywords: 'download Invio desktop, Invio installer, verify SHA-256 Invio, Windows exe, macOS dmg',
    schemaType: 'TechArticle',
  },
  'docs-system': {
    title: 'System & Printer Requirements – Invio Docs | Timrio',
    description: 'Hardware, operating system (Windows, macOS, Linux), and thermal receipt printer specifications for Invio desktop invoicing.',
    canonical: `${BASE_URL}/docs/system`,
    keywords: 'Invio system requirements, minimum specs, thermal printer compatibility, ESC/POS, Windows 10, macOS Sequoia',
    schemaType: 'TechArticle',
  },
  'docs-installation': {
    title: 'Installation Guide & Setup Instructions – Invio Docs | Timrio',
    description: 'Step-by-step installation instructions for Invio on Windows and macOS, including security confirmation handling, first run walkthrough, and troubleshooting.',
    canonical: `${BASE_URL}/docs/installation`,
    keywords: 'Invio installation guide, install Invio Mac, install Invio Windows, installation walkthrough, desktop app setup',
    schemaType: 'TechArticle',
  },
  'docs-quickstart': {
    title: 'Quickstart & First Invoice Setup – Invio Docs | Timrio',
    description: 'Learn how to configure business profiles, UPI QR codes, catalogue items, and print your first retail invoice in 60 seconds.',
    canonical: `${BASE_URL}/docs/quickstart`,
    keywords: 'Invio quickstart, first invoice setup, UPI QR billing, store profile setup, retail billing',
    schemaType: 'TechArticle',
  },
  'docs-printing': {
    title: 'Thermal & A4 Receipt Printing Guide – Invio Docs | Timrio',
    description: 'Configure 58mm and 80mm ESC/POS thermal receipt printers, silent printing, automatic paper cutting, and A4 GST invoices.',
    canonical: `${BASE_URL}/docs/printing`,
    keywords: 'thermal receipt printing, ESC/POS configuration, 58mm printer, 80mm printer, silent print Invio',
    schemaType: 'TechArticle',
  },
  'docs-thermal-printer': {
    title: 'Thermal Receipt Printer Setup Guide – Invio Docs | Timrio',
    description: 'Complete setup guide for 58mm and 80mm ESC/POS thermal printers: USB, Ethernet LAN, silent printing, auto-cutting, and UPI QR codes.',
    canonical: `${BASE_URL}/docs/thermal-printer`,
    keywords: 'thermal printer setup, ESC/POS, 58mm receipt, 80mm POS receipt, silent print, cash drawer kick',
    schemaType: 'TechArticle',
  },
  'docs-email': {
    title: 'Email & SMTP Outbox Configuration – Invio Docs | Timrio',
    description: 'Connect Google Gmail via one-click OAuth or custom SMTP (ports 587/465, App Passwords) for automated PDF invoice delivery.',
    canonical: `${BASE_URL}/docs/email`,
    keywords: 'Invio email setup, SMTP configuration, Gmail OAuth, invoice email, app password, email outbox',
    schemaType: 'TechArticle',
  },
  'docs-whatsapp': {
    title: 'How to Share Invoices on WhatsApp – Invio Docs | Timrio',
    description: 'Learn how to send invoices and bills to customers on WhatsApp for free directly from Invio desktop billing software.',
    canonical: `${BASE_URL}/docs/whatsapp`,
    keywords: 'WhatsApp invoice sharing, send bill WhatsApp, WhatsApp billing, free invoice sharing',
    schemaType: 'TechArticle',
  },
  'docs-pos-display': {
    title: 'Customer POS Display Screen Setup – Invio Docs | Timrio',
    description: 'Setup a second customer-facing monitor at your checkout counter to show live items, bill total, and UPI payment QR code.',
    canonical: `${BASE_URL}/docs/pos-display`,
    keywords: 'customer POS display, dual screen billing, counter screen, customer monitor POS, scan to pay screen',
    schemaType: 'TechArticle',
  },
  'docs-backups': {
    title: 'Offline Data Storage & Backup Management – Invio Docs | Timrio',
    description: 'Learn about local SQLite database file locations, single-click backup exports, and migrating Invio to a new computer.',
    canonical: `${BASE_URL}/docs/backups`,
    keywords: 'Invio database location, SQLite backup, export backup Invio, restore store data',
    schemaType: 'TechArticle',
  },
  'docs-security': {
    title: 'Security & Privacy Architecture – Invio Docs | Timrio',
    description: 'Overview of Invio zero-cloud privacy, Electron safeStorage credential encryption, and contextIsolation architecture.',
    canonical: `${BASE_URL}/docs/security`,
    keywords: 'Invio security, offline privacy, zero cloud sync, safeStorage encryption',
    schemaType: 'TechArticle',
  },
  'docs-troubleshooting': {
    title: 'Troubleshooting & Support Guide – Invio Docs | Timrio',
    description: 'Troubleshooting guide for Invio: Printer connection issues, multi-terminal LAN billing mode, antivirus exclusions, and support contact.',
    canonical: `${BASE_URL}/docs/troubleshooting`,
    keywords: 'Invio troubleshooting, printer not printing, LAN billing mode, antivirus false positive, Invio support',
    schemaType: 'TechArticle',
  },
  support: {
    title: 'Support & Help Center – Customer Assistance | Invio',
    description: 'Get help with Invio desktop invoicing app: Troubleshooting common issues, thermal printer setup, database backups, and direct contact with the Timrio support team.',
    canonical: `${BASE_URL}/support`,
    keywords: 'Invio support, help center, billing software assistance, contact support, troubleshooting',
    schemaType: 'ContactPage',
  },
  faq: {
    title: 'Frequently Asked Questions – Invio Desktop Invoicing | Timrio',
    description: 'Answers to common questions about Invio: 100% offline database privacy, thermal printer compatibility, GST calculations, UPI QR codes, and update policies.',
    canonical: `${BASE_URL}/faq`,
    keywords: 'Invio FAQ, billing software FAQ, offline invoice questions, thermal printer setup FAQ',
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
    title: 'Security Architecture & Vulnerability Reporting | Invio',
    description: 'Invio security model: Electron context isolation, safe OS keychain credential storage, zero unauthorized network calls, and responsible vulnerability disclosure process.',
    canonical: `${BASE_URL}/security`,
    keywords: 'Invio security, vulnerability disclosure, Electron security, safe storage, privacy first',
    schemaType: 'WebPage',
  },
  contact: {
    title: 'Contact Us – Support & Business Identity | Timrio',
    description: 'Contact the team behind Invio. Email support, report issues, and verify Timrio business identity.',
    canonical: `${BASE_URL}/contact`,
    keywords: 'Contact Invio, Timrio contact, support email, developer contact',
    schemaType: 'ContactPage',
  },
  tools: {
    title: 'Free Financial, Tax & Payroll Calculators Suite | Invio',
    description: 'Suite of 100% free online business tools: India GST calculator, FY 25-26 Income Tax calculator, UK and UAE VAT calculators, Payslip generator, HRA exemption, and Gratuity calculators.',
    canonical: `${BASE_URL}/tools`,
    keywords: 'Invio free tools, GST calculator, income tax calculator, UK VAT calculator, payslip generator, HRA exemption calculator, gratuity calculator',
    schemaType: 'WebPage',
  },
  'gst-calculator': {
    title: 'Free GST Calculator Online India – CGST, SGST & IGST | Invio',
    description: 'Calculate intra-state CGST & SGST splits, inter-state IGST, and reverse GST inclusive extractions across 0%, 5%, 12%, 18%, 28%, and 40% slabs.',
    canonical: `${BASE_URL}/tools/gst-calculator`,
    schemaType: 'WebApplication',
  },
  'income-tax-india': {
    title: 'Income Tax Calculator India FY 2025-26 (New vs Old Regime) | Invio',
    description: 'Calculate income tax liability comparing New Tax Regime (with ₹75,000 standard deduction) vs Old Tax Regime with instant tax slab and rebate comparison.',
    canonical: `${BASE_URL}/tools/income-tax-india`,
    schemaType: 'WebApplication',
  },
  'vat-uk': {
    title: 'UK VAT Calculator (HMRC Standard 20% & Reduced 5%) | Invio',
    description: 'Calculate HMRC standard 20%, reduced 5%, and zero-rated VAT or reverse extract net prices from gross totals.',
    canonical: `${BASE_URL}/tools/vat-uk`,
    schemaType: 'WebApplication',
  },
  'vat-uae': {
    title: 'UAE VAT Calculator (FTA 5%) – Online Tax Calculator | Invio',
    description: 'Calculate 5% UAE Federal Tax Authority VAT or reverse calculate net amounts from inclusive invoice totals.',
    canonical: `${BASE_URL}/tools/vat-uae`,
    schemaType: 'WebApplication',
  },
  'payslip-generator': {
    title: 'Free Payslip Generator – Monthly Employee Pay Slip Maker | Invio',
    description: 'Generate, customize, and print formal monthly employee salary pay slips for free with earnings, deductions, and net salary calculations.',
    canonical: `${BASE_URL}/tools/payslip-generator`,
    schemaType: 'WebApplication',
  },
  'paycheck-calc': {
    title: 'Take-Home Paycheck Calculator – Gross to Net Pay | Invio',
    description: 'Calculate net take-home salary after taxes, withholdings, and pre-tax deductions.',
    canonical: `${BASE_URL}/tools/paycheck-calc`,
    schemaType: 'WebApplication',
  },
  'hra-exemption': {
    title: 'HRA Exemption Calculator (Section 10(13A)) – Income Tax | Invio',
    description: 'Calculate tax-exempt House Rent Allowance under Section 10(13A) of the Income Tax Act for metro and non-metro cities.',
    canonical: `${BASE_URL}/tools/hra-exemption`,
    schemaType: 'WebApplication',
  },
  'gratuity-calc': {
    title: 'Gratuity Calculator India – Payment of Gratuity Act 1972 | Invio',
    description: 'Calculate statutory employee gratuity payout using the 15/26 formula under the Payment of Gratuity Act 1972.',
    canonical: `${BASE_URL}/tools/gratuity-calc`,
    schemaType: 'WebApplication',
  },
  'project-estimate': {
    title: 'Project Cost Estimator – Hourly Billing & Contingency | Invio',
    description: 'Estimate project costs, labor hours, direct costs, and contingency risk buffers for client proposals.',
    canonical: `${BASE_URL}/tools/project-estimate`,
    schemaType: 'WebApplication',
  },
  '404': {
    title: '404 - Page Not Found | Invio',
    description: 'The requested page does not exist on Invio website.',
    canonical: null,
    noindex: true,
  },
};

/**
 * Dynamically updates document head tags and structured data
 */
export function applySEO(pageKey, overrides = {}) {
  const meta = { ...(PAGE_METADATA[pageKey] || PAGE_METADATA.home), ...overrides };

  // 1. Document Title
  if (meta.title) {
    document.title = meta.title;
  }

  const setMetaTag = (selector, attrName, attrValue, content) => {
    if (typeof document === 'undefined') return;
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

  // 2. Standard Search Meta
  setMetaTag('meta[name="title"]', 'name', 'title', meta.title);
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);
  if (meta.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', meta.keywords);
  }

  // Robots directive
  if (meta.noindex) {
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
  } else {
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // 3. Open Graph
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', meta.canonical || (typeof window !== 'undefined' ? window.location.href : ''));
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${BASE_URL}/og-image.jpg`);

  // 4. Twitter Card
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', meta.canonical || (typeof window !== 'undefined' ? window.location.href : ''));
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', `${BASE_URL}/og-image.jpg`);

  // 5. Canonical Link
  if (typeof document !== 'undefined') {
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
  }

  // 6. JSON-LD Structured Data
  if (typeof document !== 'undefined' && meta.schemaType) {
    let scriptEl = document.getElementById('dynamic-jsonld');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'dynamic-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    let jsonLd;

    if (meta.schemaType === 'SoftwareApplication') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Invio',
        operatingSystem: 'Windows 10, Windows 11, macOS 11.0+, Linux 64-bit',
        applicationCategory: 'BusinessApplication',
        softwareVersion: '1.0.2',
        description: meta.description,
        url: meta.canonical || BASE_URL,
        downloadUrl: `${BASE_URL}/download`,
        image: `${BASE_URL}/og-image.jpg`,
        featureList: [
          '100% Offline SQLite Database Storage',
          'Automated GST Intra-state (CGST+SGST) & Inter-state (IGST) Tax Splits',
          'ESC/POS Thermal Receipt Printing (58mm and 80mm roll widths)',
          'Dynamic Offline UPI Payment QR Codes on Paper Slips',
          'Hardware USB & Bluetooth Barcode Scanner Integration',
          'Real-time Inventory & Stock Tracking with Alerts',
          'Customer Directory and Purchase Credit Ledgers',
          'Secondary Customer POS Display Monitor Support'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock'
        },
        author: {
          '@type': 'Organization',
          name: 'Timrio',
          url: 'https://timrio.com/'
        }
      };
    } else if (meta.schemaType === 'FAQPage') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
    } else {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': meta.schemaType,
        name: meta.title.split('–')[0].split('|')[0].trim(),
        description: meta.description,
        url: meta.canonical || BASE_URL,
        publisher: {
          '@type': 'Organization',
          name: 'Timrio',
          url: 'https://timrio.com/',
        },
      };
    }

    scriptEl.textContent = JSON.stringify(jsonLd);
  }
}
