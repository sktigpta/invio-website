/**
 * SEO & Meta Tag Registry & Synchronizer
 * Dynamically updates document.title, meta tags (title, description, keywords, Open Graph, Twitter cards),
 * and canonical URL across all routes and tools.
 */

export const SEO_CONFIGS = {
  home: {
    title: 'Invio — Free Invoice Generator & GST Billing Software',
    description: 'Invio is a free offline invoice generator and billing software for retail shops and small businesses. Create GST invoices in seconds, print thermal receipts with UPI QR codes, scan barcodes, and track stock.',
    url: 'https://invio.timrio.com/',
    canonical: 'https://invio.timrio.com/',
    keywords: 'Invio, free invoice generator, invoice generator, free billing software, GST invoice generator, GST invoice maker, free invoicing software, offline invoice software, free receipt generator, thermal receipt printer software, barcode scanner billing, invoice maker for Mac, free invoice app for Windows, retail billing software, store billing app, UPI QR invoice generator, Timrio',
  },
  features: {
    title: 'Features — Offline Invoicing, Thermal POS & Stock Tracking | Invio',
    description: 'Explore Invio core features: GST billing with automated tax splits, 58mm/80mm thermal receipt printing with UPI QR codes, barcode scanner checkout, local SQLite data privacy, and a free forever core plan.',
    url: 'https://invio.timrio.com/#features',
    canonical: 'https://invio.timrio.com/',
    keywords: 'Invio features, invoice software features, thermal receipt printing, barcode scanner billing, offline SQLite billing, GST invoice maker',
  },
  comparison: {
    title: 'Invio vs Vyapar, myBillBook & Zoho — Offline Comparison | Invio',
    description: 'Compare Invio with Vyapar, myBillBook, and Zoho. See why Invio’s offline-first architecture is the best choice for small retail stores and freelancers.',
    url: 'https://invio.timrio.com/#comparison',
    canonical: 'https://invio.timrio.com/',
    keywords: 'Invio vs Vyapar, Invio vs myBillBook, Invio vs Zoho Invoice, free billing software alternative, offline billing comparison',
  },
  faq: {
    title: 'Frequently Asked Questions — Invoice & GST Billing Software | Invio',
    description: 'Answers to common questions about Invio: offline billing, thermal printer and barcode compatibility, UPI payment QR codes, and local database security.',
    url: 'https://invio.timrio.com/#faq',
    canonical: 'https://invio.timrio.com/',
    keywords: 'Invio FAQ, GST billing questions, thermal printer setup, UPI QR invoice generator questions',
  },
  privacy: {
    title: 'Privacy Policy — Invio (100% Offline Data Privacy)',
    description: 'Privacy Policy for Invio. Offline invoice generator and billing software. Zero telemetry, no data collection, private local SQLite storage.',
    url: 'https://invio.timrio.com/privacy',
    canonical: 'https://invio.timrio.com/privacy',
  },
  terms: {
    title: 'Terms of Service — Invio',
    description: 'Terms of Service for Invio. Offline invoice generator and billing software. License terms, plans, permitted use, and data ownership.',
    url: 'https://invio.timrio.com/terms',
    canonical: 'https://invio.timrio.com/terms',
  },
  subscription: {
    title: 'Pricing — Free vs Plus Plans | Invio',
    description: 'Invio plans: Free forever for core offline billing, Plus for thermal printing, email & WhatsApp dispatch, POS display and backups. Secure Razorpay checkout with UPI, cards and netbanking.',
    url: 'https://invio.timrio.com/subscription',
    canonical: 'https://invio.timrio.com/subscription',
    keywords: 'Invio pricing, Invio Plus subscription, billing software subscription India, buy Invio Plus, Invio plans',
  },
  docs: {
    title: 'Features & Settings Documentation — User Manual | Invio',
    description: 'Detailed documentation for Invio features and all 5 settings sections: Business Profile, Invoice & POS Display, Payments & Bank, Email Notifications, and SQLite / PostgreSQL Database Backups.',
    url: 'https://invio.timrio.com/docs',
    canonical: 'https://invio.timrio.com/docs',
    keywords: 'Invio docs, Invio documentation, GST billing settings, thermal receipt setup, UPI QR invoice configuration, SQLite backup billing software',
  },
  'docs-features': {
    title: 'Features Documentation — Offline GST Billing & POS | Invio',
    description: 'Explore full technical features of Invio: offline SQLite architecture, GST tax engine, thermal POS printing, secondary customer display, inventory tracking, and barcode scanner checkout.',
    url: 'https://invio.timrio.com/docs/features',
    canonical: 'https://invio.timrio.com/docs/features',
    keywords: 'Invio features docs, thermal POS billing guide, GST invoice generator features, customer screen setup',
  },
  'docs-settings': {
    title: 'Settings Reference Guide — Business, Printing & Database | Invio',
    description: 'Complete guide to all 5 Invio settings sections: Store identity, POS thermal format, UPI payment VPA, Google OAuth email, and Local SQLite backup export & restore.',
    url: 'https://invio.timrio.com/docs/settings',
    canonical: 'https://invio.timrio.com/docs/settings',
    keywords: 'Invio settings, invoice printer settings, POS display monitor setup, Google OAuth invoice email, SQLite database backup',
  },
  tools: {
    title: 'Free Financial, Tax & Payroll Calculators Suite | Invio',
    description: 'Access Invio suite of 100% free online business tools: India GST calculator, FY 25-26 Income Tax calculator, UK and UAE VAT calculators, Payslip generator, HRA exemption, and Gratuity calculators.',
    url: 'https://invio.timrio.com/tools',
    canonical: 'https://invio.timrio.com/tools',
    keywords: 'Invio tools, free finance tools, tax calculator, GST calculator, payslip maker, VAT calculator UK, UAE VAT calculator, HRA calculator, gratuity calculator',
  },
  'gst-calculator': {
    title: 'Free GST Calculator Online India — Intra (CGST+SGST) & Inter (IGST) | Invio',
    description: 'Free online GST calculator for India. Calculate intra-state CGST & SGST splits, inter-state IGST, and reverse GST inclusive MRP extractions across 0%, 3%, 5%, 12%, 18%, 28%, and 40% slabs.',
    url: 'https://invio.timrio.com/tools/gst-calculator',
    canonical: 'https://invio.timrio.com/tools/gst-calculator',
    keywords: 'GST calculator India, online GST calculator, CGST SGST calculator, IGST calculator, reverse GST calculator, GST slab calculator',
  },
  'income-tax-india': {
    title: 'Income Tax Calculator India FY 2025-26 (New vs Old Regime) | Invio',
    description: 'Calculate and compare income tax liability under New Tax Regime (with ₹75,000 standard deduction) vs Old Tax Regime for FY 2025-26 (AY 2026-27). Instant tax slabs, cess, and 87A rebate breakdown.',
    url: 'https://invio.timrio.com/tools/income-tax-india',
    canonical: 'https://invio.timrio.com/tools/income-tax-india',
    keywords: 'income tax calculator India, FY 2025-26 income tax, new tax regime vs old tax regime, standard deduction 75000, Section 87A rebate calculator',
  },
  'vat-uk': {
    title: 'UK VAT Calculator (HMRC Standard 20%, Reduced 5% & Reverse VAT) | Invio',
    description: 'Free UK HMRC VAT Calculator. Calculate standard 20%, reduced 5%, and zero-rated VAT amounts or reverse extract net prices from gross totals in seconds.',
    url: 'https://invio.timrio.com/tools/vat-uk',
    canonical: 'https://invio.timrio.com/tools/vat-uk',
    keywords: 'UK VAT calculator, HMRC VAT calculator, 20% VAT calculator, reverse VAT UK, VAT inclusive calculator',
  },
  'vat-uae': {
    title: 'UAE VAT Calculator (FTA 5%) — Free Online Tax Tool | Invio',
    description: 'Free UAE Federal Tax Authority (FTA) 5% VAT Calculator. Add 5% VAT to commercial invoices or reverse calculate net amounts from inclusive MRP totals.',
    url: 'https://invio.timrio.com/tools/vat-uae',
    canonical: 'https://invio.timrio.com/tools/vat-uae',
    keywords: 'UAE VAT calculator, FTA 5% VAT, Dubai VAT calculator, UAE tax calculation, reverse VAT UAE',
  },
  'payslip-generator': {
    title: 'Free Payslip Generator — Monthly Salary Pay Slip Maker & PDF | Invio',
    description: 'Generate, customize, and print formal monthly employee salary payslips for free. Calculate basic pay, HRA, allowances, EPF, professional tax, and net pay breakdown.',
    url: 'https://invio.timrio.com/tools/payslip-generator',
    canonical: 'https://invio.timrio.com/tools/payslip-generator',
    keywords: 'free payslip generator, salary slip maker, employee pay slip template, salary slip PDF, payroll slip generator',
  },
  'paycheck-calc': {
    title: 'Take-Home Paycheck Calculator — Gross to Net Salary Calculation | Invio',
    description: 'Calculate net take-home pay from gross annual CTC or monthly salary after income tax withholdings, social security / PF deductions, and health insurance.',
    url: 'https://invio.timrio.com/tools/paycheck-calc',
    canonical: 'https://invio.timrio.com/tools/paycheck-calc',
    keywords: 'take home paycheck calculator, gross to net salary, net pay calculator, salary in hand calculator',
  },
  'hra-exemption': {
    title: 'HRA Exemption Calculator (Section 10(13A)) — Tax Exemption Tool | Invio',
    description: 'Calculate tax-exempt House Rent Allowance (HRA) under Section 10(13A) of the Income Tax Act for metro (50%) and non-metro (40%) cities in India.',
    url: 'https://invio.timrio.com/tools/hra-exemption',
    canonical: 'https://invio.timrio.com/tools/hra-exemption',
    keywords: 'HRA exemption calculator, Section 10(13A) calculator, house rent allowance tax exemption, HRA calculation formula',
  },
  'gratuity-calc': {
    title: 'Gratuity Calculator India — Payment of Gratuity Act Formula | Invio',
    description: 'Calculate statutory employee gratuity payout under the Payment of Gratuity Act 1972 using the 15/26 formula for completed tenure of service.',
    url: 'https://invio.timrio.com/tools/gratuity-calc',
    canonical: 'https://invio.timrio.com/tools/gratuity-calc',
    keywords: 'gratuity calculator India, Payment of Gratuity Act formula, 15/26 gratuity formula, employee gratuity payout',
  },
  'project-estimate': {
    title: 'Project Cost & Freelance Quote Estimator — Budget & Billing | Invio',
    description: 'Estimate client project quotes, direct materials, labor hours, profit margin markups, and risk contingency buffers for freelance and business proposals.',
    url: 'https://invio.timrio.com/tools/project-estimate',
    canonical: 'https://invio.timrio.com/tools/project-estimate',
    keywords: 'project cost estimator, freelance quote calculator, client quote generator, hourly billing estimator, budget planner',
  },
  '404': {
    title: '404 - Page Not Found | Invio',
    description: 'The page or tool you are looking for does not exist on Invio.',
    url: 'https://invio.timrio.com/404',
    canonical: null,
  },
};

/**
 * Applies title, meta tags, Open Graph, Twitter, Canonical URL, and triggers Google Analytics page_view.
 * @param {string|object} pageKeyOrConfig - Predefined key in SEO_CONFIGS or custom SEO object
 * @param {object} [customOverrides] - Any property overrides
 */
export function applySEO(pageKeyOrConfig, customOverrides = {}) {
  const is404 = pageKeyOrConfig === '404' || (typeof pageKeyOrConfig === 'object' && pageKeyOrConfig?.title?.includes('404'));
  const baseConfig =
    typeof pageKeyOrConfig === 'string'
      ? SEO_CONFIGS[pageKeyOrConfig] || SEO_CONFIGS.home
      : pageKeyOrConfig || SEO_CONFIGS.home;

  const config = { ...baseConfig, ...customOverrides };

  // 1. Document Title
  if (config.title) {
    document.title = config.title;
  }

  // Safe helper to create or update meta tags
  const setMeta = (selector, attrName, attrValue, content) => {
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

  // 2. Standard Search Meta & Robots directive
  setMeta('meta[name="title"]', 'name', 'title', config.title);
  setMeta('meta[name="description"]', 'name', 'description', config.description);
  if (config.keywords) {
    setMeta('meta[name="keywords"]', 'name', 'keywords', config.keywords);
  }

  if (is404) {
    setMeta('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
  } else {
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // 3. Open Graph (Facebook, WhatsApp, LinkedIn)
  setMeta('meta[property="og:title"]', 'property', 'og:title', config.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMeta(
    'meta[property="og:url"]',
    'property',
    'og:url',
    config.url || config.canonical || (typeof window !== 'undefined' ? window.location.href : '')
  );

  // 4. Twitter Card Meta
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', config.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
  setMeta(
    'meta[name="twitter:url"]',
    'name',
    'twitter:url',
    config.url || config.canonical || (typeof window !== 'undefined' ? window.location.href : '')
  );

  // 5. Canonical Link Element
  const canonicalUrl = config.canonical;
  if (typeof document !== 'undefined') {
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalUrl);
    } else if (canonicalEl && is404) {
      canonicalEl.remove();
    }
  }

  // 6. Trigger Google Analytics page_view when gtag is configured
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_title: config.title,
        page_location: config.url || window.location.href,
      });
    } catch {
      // Analytics failures should never crash application rendering
    }
  }
}
