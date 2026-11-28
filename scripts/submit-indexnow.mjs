import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const SITEMAP_PATH = path.join(ROOT_DIR, 'public', 'sitemap.xml');

const HOST = 'invio.timrio.com';
const KEY = '80e7feda1f8d45cab7046a15d9000d33';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf8');
const urlList = [...sitemapXml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urlList.length === 0) {
  console.error('[indexnow] No URLs found in public/sitemap.xml');
  process.exit(1);
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

console.log(`[indexnow] Submitting ${urlList.length} URLs for ${HOST}...`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
});

const body = await res.text().catch(() => '');
console.log(`[indexnow] Response: HTTP ${res.status} ${res.statusText}${body ? ` - ${body}` : ''}`);

if (!res.ok) {
  process.exit(1);
}
