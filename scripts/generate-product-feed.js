import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUCT_METADATA } from '../src/data/productMetadata.js';

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

const rowValues = [
  PRODUCT_METADATA.id,
  PRODUCT_METADATA.name,
  PRODUCT_METADATA.description,
  PRODUCT_METADATA.canonicalUrl,
  PRODUCT_METADATA.imageLink,
  PRODUCT_METADATA.availability,
  PRODUCT_METADATA.priceString,
  PRODUCT_METADATA.brand,
  PRODUCT_METADATA.condition,
  PRODUCT_METADATA.identifierExists,
  PRODUCT_METADATA.productType,
  PRODUCT_METADATA.googleProductCategory,
];

const headerLine = HEADERS.join('\t');
const dataLine = rowValues.map(sanitizeTsvValue).join('\t');
const tsvContent = `${headerLine}\n${dataLine}\n`;

fs.writeFileSync(feedFilePath, tsvContent, 'utf-8');

console.log(`[Google Merchant Feed] Generated successfully at: ${feedFilePath}`);
console.log(`[Google Merchant Feed] Entry ID: ${PRODUCT_METADATA.id}`);
console.log(`[Google Merchant Feed] Canonical Link: ${PRODUCT_METADATA.canonicalUrl}`);
console.log(`[Google Merchant Feed] Price: ${PRODUCT_METADATA.priceString}`);
