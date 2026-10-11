# Google Merchant Center Software Eligibility & Product Feed Policy

This document details Google Merchant Center policies regarding downloadable software products, free product listings, and the technical specification of the Invio product feed.

---

## 1. Product Summary & Distribution Model

- **Product Name:** Invio Desktop Invoicing Software
- **Brand / Publisher:** Timrio ([timrio.com](https://timrio.com))
- **Distribution Model:** Free downloadable desktop software
- **Platforms Supported:** Windows 10/11 (64-bit), macOS 11.0+ (Apple Silicon & Intel), Linux 64-bit
- **Target Audience:** Freelancers, small retail store owners, and independent professionals
- **Pricing:** Free ($0.00 USD) for the core offline application; optional Plus subscription for thermal printing and cloud backups
- **Data Architecture:** 100% offline local SQLite storage with zero telemetry and no cloud dependency

---

## 2. Google Merchant Center Software Policies & Eligibility Analysis

### 2.1 Shopping Ads vs. Free Product Listings

| Marketing Method | Eligibility Status | Policy Rationale |
| :--- | :--- | :--- |
| **Paid Shopping Ads** | **Ineligible** | Google Shopping Ads require products with a purchase price greater than zero (`price > 0.00`) and a checkout transaction flow. Submitting free software downloads for paid Shopping Ads is rejected under Google's *Missing Value / Free Product in Shopping Ads* policy. |
| **Free Product Listings** | **Eligible** (Subject to review) | Google Merchant Center's Free Listings program allows free products and software applications to appear across Google Search (Knowledge Panels, Shopping tab free listings) provided all software transparency policies are met. |

### 2.2 Downloadable Software & Unwanted Software Policy Compliance

Google enforces strict requirements on downloadable desktop executables under its [Unwanted Software Policy](https://support.google.com/adspolicy/answer/50423):

1. **Transparent Installation:** The download file must be a standard operating system installer (`.exe` on Windows, `.dmg` on macOS, `.AppImage` on Linux) with no bundled third-party adware, toolbars, or silent background installations.
2. **Clear System Requirements:** The landing page must clearly state hardware and operating system requirements prior to download.
3. **Transparent Pricing:** The pricing model must be stated upfront. If the core software is free, it must not require a credit card or hidden payment to install and use.
4. **Local Data Privacy:** Invio does not collect background telemetry or transmit user data without consent. All business databases (invoices, customers, inventory) remain local on the user's hard drive.
5. **Contact and Legal Information:** Direct contact information (`support@timrio.com`), Privacy Policy, and Terms of Use must be prominently accessible from the landing page.

### 2.3 Product Identifiers (`identifier_exists: no`)

- Google Merchant Center requires GTIN (UPC/EAN/ISBN) and MPN for mass-market retail goods.
- As proprietary desktop software distributed directly by Timrio, Invio does not have a universal barcode or GTIN.
- In accordance with Google's Product Data Specification, the feed explicitly specifies:
  ```tsv
  identifier_exists	no
  ```
  **Do not attempt to fabricate GTINs, barcodes, or fake MPNs**, as doing so triggers permanent Merchant Center account suspension for misrepresentation.

---

## 3. Product Feed Specification

- **Feed URL:** `https://invio.timrio.com/feeds/google-merchant.tsv`
- **Format:** Tab-Separated Values (TSV / Tab-Delimited text)
- **MIME Type:** `text/tab-separated-values; charset=utf-8`
- **Encoding:** UTF-8 without BOM

### Feed Attributes & Mapping

| Field Header | Invio Value | Google Specification Requirement |
| :--- | :--- | :--- |
| `id` | `invio-desktop-free` | Stable unique product identifier (max 50 chars) |
| `title` | `Invio Desktop Invoicing Software` | Accurate product name matching landing page (max 150 chars) |
| `description` | *(Plain text description)* | Plain text without promotional gimmicks or HTML (max 5000 chars) |
| `link` | `https://invio.timrio.com/product` | Exact canonical product landing page URL |
| `image_link` | `https://invio.timrio.com/screenshots/dashboard.png` | Fully qualified HTTPS URL to a real application screenshot (minimum 800×800 px) |
| `availability` | `in_stock` | Standard availability enumeration (`in_stock`) |
| `price` | `0.00 USD` | Numeric amount + ISO 4217 currency code |
| `brand` | `Timrio` | Verified publisher / brand name |
| `condition` | `new` | Required attribute (`new`) |
| `identifier_exists` | `no` | Explicit indicator that universal GTIN does not exist |
| `product_type` | `Software > Invoicing Software > Desktop Billing App` | Merchant-defined taxonomy string |
| `google_product_category` | `Software > Computer Software > Business & Productivity Software` | Google Taxonomy Category (ID: 314) |

---

## 4. Setup Instructions in Google Merchant Center

To connect this feed to Google Merchant Center:

1. **Sign In:** Go to [Google Merchant Center](https://merchants.google.com/) and sign in with the Timrio Google account.
2. **Claim & Verify Domain:** Ensure `https://invio.timrio.com` is verified and claimed via HTML tag, DNS record, or Google Analytics.
3. **Navigate to Feeds:** Click on **Products** → **Feeds** → **Add Primary Feed**.
4. **Target Country & Language:**
   - Country: Select primary target markets (e.g. United States, India, United Kingdom).
   - Language: English.
   - Destinations: **Free product listings** (uncheck Shopping Ads).
5. **Feed Setup Method:**
   - Choose **Scheduled Fetch**.
   - Feed Name: `Invio Product Feed`
   - File URL: `https://invio.timrio.com/feeds/google-merchant.tsv`
   - Fetch Frequency: Weekly or Monthly (Invio is desktop software with stable specifications).
6. **Fetch and Verify:** Click **Fetch Now** and check the **Processing** tab for diagnostics. All 12 columns should pass validation with 0 fatal errors.

---

## 5. Maintenance & Synchronization

- The feed is generated automatically during `npm run build` from the single source of truth in [`src/data/productMetadata.js`](./src/data/productMetadata.js).
- Any updates to product features, screenshots, system requirements, or pricing in `productMetadata.js` are reflected across the website, the JSON-LD structured data, and the TSV feed in a single atomic build.
- Feed integrity is verified by running:
  ```bash
  npm run validate:feed
  ```
