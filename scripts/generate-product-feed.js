import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCT_TIERS, SHARED_PRODUCT_SPECS } from '../src/data/productMetadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const feedsDir = path.join(rootDir, 'public', 'feeds');
const feedFilePath = path.join(feedsDir, 'google-merchant.tsv');

// Ensure output directory exists
if (!fs.existsSync(feedsDir)) {
  fs.mkdirSync(feedsDir, { recursive: true });
}

/**
 * Clean and escape string value for TSV format:
 * - Replaces newlines and carriage returns with spaces
 * - Replaces tab characters with spaces
 * - Strips any leading/trailing whitespace
 */
function sanitizeTsvValue(val) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/[\r\n]+/g, ' ')
    .replace(/\t+/g, ' ')
    .trim();
}

// Google Merchant Center Tab-Delimited (TSV) Header & Attributes
const HEADERS = [
  'id',
  'title',
  'description',
  'link',
  'image_link',
  'availability',
  'price',
  'brand',
  'condition',
  'identifier_exists',
  'product_type',
  'google_product_category',
];

const lines = [HEADERS.join('\t')];

for (const tier of PRODUCT_TIERS) {
  const rowValues = [
    tier.id,
    tier.name,
    tier.description,
    tier.canonicalUrl,
    SHARED_PRODUCT_SPECS.imageLink,
    tier.availability,
    tier.priceString,
    SHARED_PRODUCT_SPECS.brand,
    SHARED_PRODUCT_SPECS.condition,
    SHARED_PRODUCT_SPECS.identifierExists,
    SHARED_PRODUCT_SPECS.productType,
    SHARED_PRODUCT_SPECS.googleProductCategory,
  ];

  lines.push(rowValues.map(sanitizeTsvValue).join('\t'));
}

const tsvContent = lines.join('\n') + '\n';
fs.writeFileSync(feedFilePath, tsvContent, 'utf-8');

console.log(`[Google Merchant Feed] Generated multi-product feed successfully at: ${feedFilePath}`);
console.log(`[Google Merchant Feed] Total products included: ${PRODUCT_TIERS.length}`);
for (const tier of PRODUCT_TIERS) {
  console.log(`  - [${tier.id}] ${tier.name} -> ${tier.priceString} (${tier.canonicalUrl})`);
}
