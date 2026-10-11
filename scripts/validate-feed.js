import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const feedFilePath = path.join(rootDir, 'public', 'feeds', 'google-merchant.tsv');

console.log('[Validator] Validating Google Merchant Center TSV feed...');

if (!fs.existsSync(feedFilePath)) {
  console.error(`[Validator Error] Feed file not found at: ${feedFilePath}`);
  process.exit(1);
}

const rawContent = fs.readFileSync(feedFilePath, 'utf-8');
const lines = rawContent.split(/\r?\n/).filter((line) => line.trim().length > 0);

if (lines.length < 2) {
  console.error(`[Validator Error] Feed must contain at least a header line and one product line. Found ${lines.length} lines.`);
  process.exit(1);
}

const headerColumns = lines[0].split('\t');
const requiredHeaders = [
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

for (const req of requiredHeaders) {
  if (!headerColumns.includes(req)) {
    console.error(`[Validator Error] Missing required header: "${req}"`);
    process.exit(1);
  }
}

const productRows = lines.slice(1);
console.log(`[Validator] Found ${productRows.length} product entries.`);

for (let i = 0; i < productRows.length; i++) {
  const rowCols = productRows[i].split('\t');
  if (rowCols.length !== headerColumns.length) {
    console.error(
      `[Validator Error] Row ${i + 1} has ${rowCols.length} columns, expected ${headerColumns.length}`
    );
    process.exit(1);
  }

  const row = {};
  headerColumns.forEach((col, idx) => {
    row[col] = rowCols[idx];
  });

  // 1. ID check
  if (!row.id || row.id.length < 1) {
    console.error(`[Validator Error] Row ${i + 1}: Missing product ID.`);
    process.exit(1);
  }

  // 2. Title check
  if (!row.title || row.title.length > 150) {
    console.error(`[Validator Error] Row ${i + 1}: Title invalid or exceeds 150 characters.`);
    process.exit(1);
  }

  // 3. Description check
  if (!row.description || row.description.length > 5000) {
    console.error(`[Validator Error] Row ${i + 1}: Description invalid or exceeds 5000 characters.`);
    process.exit(1);
  }

  // 4. Link check
  if (!row.link.startsWith('https://')) {
    console.error(`[Validator Error] Row ${i + 1}: Link must be a valid HTTPS URL. Got: ${row.link}`);
    process.exit(1);
  }

  // 5. Image link check
  if (!row.image_link.startsWith('https://')) {
    console.error(`[Validator Error] Row ${i + 1}: Image link must be a valid HTTPS URL. Got: ${row.image_link}`);
    process.exit(1);
  }

  // 6. Availability check
  const validAvailability = ['in_stock', 'out_of_stock', 'preorder', 'backorder'];
  if (!validAvailability.includes(row.availability)) {
    console.error(`[Validator Error] Row ${i + 1}: Invalid availability "${row.availability}".`);
    process.exit(1);
  }

  // 7. Price check (e.g. "0.00 USD")
  const priceRegex = /^\d+(\.\d{2})?\s+[A-Z]{3}$/;
  if (!priceRegex.test(row.price)) {
    console.error(`[Validator Error] Row ${i + 1}: Invalid price format "${row.price}". Expected format: "0.00 USD"`);
    process.exit(1);
  }

  // 8. Brand check
  if (!row.brand || row.brand.trim() === '') {
    console.error(`[Validator Error] Row ${i + 1}: Brand is required.`);
    process.exit(1);
  }

  // 9. Condition check
  const validConditions = ['new', 'refurbished', 'used'];
  if (!validConditions.includes(row.condition)) {
    console.error(`[Validator Error] Row ${i + 1}: Invalid condition "${row.condition}".`);
    process.exit(1);
  }

  // 10. Identifier exists check
  if (!['yes', 'no'].includes(row.identifier_exists.toLowerCase())) {
    console.error(`[Validator Error] Row ${i + 1}: identifier_exists must be 'yes' or 'no'. Got: ${row.identifier_exists}`);
    process.exit(1);
  }

  console.log(`[Validator] Entry "${row.id}" (${row.title}): OK`);
}

console.log('[Validator] ✓ Google Merchant Center TSV feed is 100% valid.');
