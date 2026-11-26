import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_DIR = path.join(ROOT_DIR, '.ssr-temp');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

const ROUTES = [
  { url: '/', outFile: 'index.html', seoKey: 'home' },
  { url: '/features', outFile: 'features.html', seoKey: 'features' },
  { url: '/pricing', outFile: 'pricing.html', seoKey: 'pricing' },
  { url: '/checkout', outFile: 'checkout.html', seoKey: 'checkout' },
  { url: '/download', outFile: 'download.html', seoKey: 'download' },
  { url: '/changelog', outFile: 'changelog.html', seoKey: 'changelog' },
  { url: '/free-invoice-software', outFile: 'free-invoice-software.html', seoKey: 'free-invoice-software' },
  { url: '/offline-billing-software', outFile: 'offline-billing-software.html', seoKey: 'offline-billing-software' },
  { url: '/gst-billing-software', outFile: 'gst-billing-software.html', seoKey: 'gst-billing-software' },
  { url: '/pos-billing-software', outFile: 'pos-billing-software.html', seoKey: 'pos-billing-software' },
  { url: '/faq', outFile: 'faq.html', seoKey: 'faq' },
  { url: '/contact', outFile: 'contact.html', seoKey: 'contact' },
  { url: '/report-bug', outFile: 'report-bug.html', seoKey: 'report-bug' },
  { url: '/privacy-policy', outFile: 'privacy-policy.html', seoKey: 'privacy' },
  { url: '/terms', outFile: 'terms.html', seoKey: 'terms' },
  { url: '/eula', outFile: 'eula.html', seoKey: 'eula' },
  { url: '/cookie-policy', outFile: 'cookie-policy.html', seoKey: 'cookie-policy' },
  { url: '/security', outFile: 'security.html', seoKey: 'security' },
  // Documentation Hub & Guides
  { url: '/docs', outFile: 'docs.html', seoKey: 'docs' },
  { url: '/docs/download', outFile: 'docs/download.html', seoKey: 'docs-download' },
  { url: '/docs/installation', outFile: 'docs/installation.html', seoKey: 'docs-installation' },
  { url: '/docs/system', outFile: 'docs/system.html', seoKey: 'docs-system' },
  { url: '/docs/thermal-printer', outFile: 'docs/thermal-printer.html', seoKey: 'docs-thermal-printer' },
  { url: '/docs/standard-printer', outFile: 'docs/standard-printer.html', seoKey: 'docs-standard-printer' },
  { url: '/docs/quickstart', outFile: 'docs/quickstart.html', seoKey: 'docs-quickstart' },
  { url: '/docs/barcode-hardware', outFile: 'docs/barcode-hardware.html', seoKey: 'docs-barcode-hardware' },
  { url: '/docs/pos-display', outFile: 'docs/pos-display.html', seoKey: 'docs-pos-display' },
  { url: '/docs/whatsapp', outFile: 'docs/whatsapp.html', seoKey: 'docs-whatsapp' },
  { url: '/docs/email-setup', outFile: 'docs/email-setup.html', seoKey: 'docs-email-setup' },
  { url: '/docs/extensions-guide', outFile: 'docs/extensions-guide.html', seoKey: 'docs-extensions-guide' },
  { url: '/docs/pos-extension', outFile: 'docs/pos-extension.html', seoKey: 'docs-pos-extension' },
  { url: '/docs/restaurant-extension', outFile: 'docs/restaurant-extension.html', seoKey: 'docs-restaurant-extension' },
  { url: '/docs/pos-display-extension', outFile: 'docs/pos-display-extension.html', seoKey: 'docs-pos-display-extension' },
  { url: '/docs/email-whatsapp-extensions', outFile: 'docs/email-whatsapp-extensions.html', seoKey: 'docs-email-whatsapp-extensions' },
  { url: '/docs/backups', outFile: 'docs/backups.html', seoKey: 'docs-backups' },
  { url: '/docs/security', outFile: 'docs/security.html', seoKey: 'docs-security' },
  { url: '/docs/troubleshooting', outFile: 'docs/troubleshooting.html', seoKey: 'docs-troubleshooting' },
  // Free Online Tools
  { url: '/tools', outFile: 'tools.html', seoKey: 'tools' },
  { url: '/tools/invoice-generator', outFile: 'tools/invoice-generator.html', seoKey: 'invoice-generator' },
  { url: '/tools/gst-calculator', outFile: 'tools/gst-calculator.html', seoKey: 'gst-calculator' },
  { url: '/tools/income-tax-india', outFile: 'tools/income-tax-india.html', seoKey: 'income-tax-india' },
  { url: '/tools/vat-uk', outFile: 'tools/vat-uk.html', seoKey: 'vat-uk' },
  { url: '/tools/vat-uae', outFile: 'tools/vat-uae.html', seoKey: 'vat-uae' },
  { url: '/tools/payslip-generator', outFile: 'tools/payslip-generator.html', seoKey: 'payslip-generator' },
  { url: '/tools/paycheck-calc', outFile: 'tools/paycheck-calc.html', seoKey: 'paycheck-calc' },
  { url: '/tools/hra-exemption', outFile: 'tools/hra-exemption.html', seoKey: 'hra-exemption' },
  { url: '/tools/gratuity-calc', outFile: 'tools/gratuity-calc.html', seoKey: 'gratuity-calc' },
  { url: '/tools/project-estimate', outFile: 'tools/project-estimate.html', seoKey: 'project-estimate' },
];

function escapeAttr(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaContent(html, selectorRegex, newContent) {
  return html.replace(selectorRegex, (_, prefix, suffix) => `${prefix}${escapeAttr(newContent)}${suffix}`);
}

function injectHeadAndRoot(template, appHtml, seo, routeUrl) {
  const { meta, robots, jsonLdString } = seo;
  const pageUrl = meta.canonical || 'https://invio.timrio.com/';
  let out = template;

  out = out.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeText(meta.title)}</title>`);
  out = replaceMetaContent(out, /(<meta\s+name="title"\s+content=")[^"]*(")/, meta.title);
  out = replaceMetaContent(out, /(<meta\s+name="description"\s+content=")[^"]*(")/, meta.description);
  if (meta.keywords) {
    out = replaceMetaContent(out, /(<meta\s+name="keywords"\s+content=")[^"]*(")/, meta.keywords);
  }
  out = replaceMetaContent(out, /(<meta\s+name="robots"\s+content=")[^"]*(")/, robots);

  if (meta.canonical) {
    out = replaceMetaContent(out, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, meta.canonical);
  } else {
    out = out.replace(/<link\s+rel="canonical"[^>]*>\s*/i, '');
  }

  if (routeUrl !== '/') {
    out = out.replace(/<!--\s*Preload Critical LCP Hero Image[^>]*-->\s*<link\s+rel="preload"\s+as="image"[^>]*>\s*/i, '');
  }

  out = replaceMetaContent(out, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, pageUrl);
  out = replaceMetaContent(out, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, meta.title);
  out = replaceMetaContent(out, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, meta.description);
  out = replaceMetaContent(out, /(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, meta.title);

  out = replaceMetaContent(out, /(<meta\s+name="twitter:url"\s+content=")[^"]*(")/, pageUrl);
  out = replaceMetaContent(out, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, meta.title);
  out = replaceMetaContent(out, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, meta.description);
  out = replaceMetaContent(out, /(<meta\s+name="twitter:image:alt"\s+content=")[^"]*(")/, meta.title);

  const safeJsonLd = jsonLdString ? jsonLdString.replace(/</g, '\\u003c') : '';
  out = out.replace(
    /<script\s+id="dynamic-jsonld"\s+type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => (safeJsonLd ? `<script id="dynamic-jsonld" type="application/ld+json">${safeJsonLd}</script>` : '')
  );

  out = out.replace(
    '<div id="root" class="min-h-screen flex flex-col"></div>',
    () => `<div id="root" data-ssr-path="${escapeAttr(routeUrl)}" class="min-h-screen flex flex-col">${appHtml}</div>`
  );

  return out;
}

async function run() {
  try {
    const serverEntryPath = path.join(SSR_DIR, 'entry-server.js');
    if (!existsSync(serverEntryPath)) {
      throw new Error(`Missing SSR bundle at ${serverEntryPath}`);
    }
    const { renderRoute } = await import(pathToFileURL(serverEntryPath).href);
    const template = readFileSync(TEMPLATE_PATH, 'utf8');

    for (const route of ROUTES) {
      const { html, seo } = renderRoute(route.url, route.seoKey);
      const fullHtml = injectHeadAndRoot(template, html, seo, route.url);
      const targetPath = path.join(DIST_DIR, route.outFile);
      mkdirSync(path.dirname(targetPath), { recursive: true });
      writeFileSync(targetPath, fullHtml, 'utf8');
    }

    console.log(`[prerender] Successfully pre-rendered ${ROUTES.length} static routes into dist/.`);
  } finally {
    if (existsSync(SSR_DIR)) {
      rmSync(SSR_DIR, { recursive: true, force: true });
    }
  }
}

run();
