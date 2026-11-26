import { useEffect, useState, useCallback, useMemo } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';
import { useDownloadModal } from '../context/DownloadModalContext';
import { PLATFORM_DOWNLOADS, API_BASE_URL, detectDeviceOS } from '../utils/osDetector';
import {
  DownloadIcon,
  PrinterIcon,
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
  ExternalLinkIcon,
} from '../components/Icons';
import { ReleaseNotesSkeleton } from '../components/common/Skeleton';

/**
 * Curated release notes registry for all production versions.
 * When GitHub release body is empty or only contains a diff comparison line,
 * these structured release notes provide the complete changelog.
 */
const CURATED_RELEASE_NOTES = {
  'v1.1.6': `## Invio v1.1.6 (Latest Production Release)

Invio Desktop v1.1.6 adds live integration between the Picture-Tile POS Add-on and Customer POS Display, refines the top toolbar layout, and delivers speed improvements across the app.

---

### What's Changed

#### 🖥️ POS & Customer Screen Integration
- **Live POS Tile Sync**: Tapping product tiles in POS updates the second-screen Customer POS Display in real time with items, UPI QR code, and Paid status.
- **UI & Toolbar Polish**: Kept the header search bar and counter toolbar actions cleanly aligned in a single row.
- **Official POS Add-on Logo**: Added high-resolution Store branding for the POS Add-on.
`,
  'v1.1.5': `## Invio v1.1.5 (Previous Production Release)

Invio Desktop v1.1.5 introduces the Picture-Tile POS Add-on with token slip printing, isolated add-on asset storage, and stability improvements across Windows, macOS, and Linux.

---

### What's Changed

#### 🧾 Picture-Tile POS & Token Printing
- **POS Counter Tiles**: Tap product photos with quick \`+\` and \`-\` buttons for instant counter checkout.
- **Compact Token Slips**: Print quick token receipts with automatic token numbering.

#### 🛡️ Reliability & Storage
- **Isolated Extension Storage**: Stored add-on images and assets safely in isolated folders per add-on.
- **Cross-Platform Polish**: Resolved database, account context, and Restaurant QR ordering edge cases.
`,
  'v1.1.4': `## Invio v1.1.4 (Previous Production Release)

Invio Desktop v1.1.4 delivers comprehensive ecosystem hardening, clean multi-platform download actions, full search engine indexation, upgraded security controls, and cross-platform desktop binary distributions.

---

### What's Changed

#### 🌐 Web & Download Experience Polish
- **Clean OS Installer CTAs**: Simplified all download buttons across landing, features, documentation, and pricing pages into clean, professional labels: **Download for Mac**, **Download for Windows**, and **Download for Linux**.
- **Search Engine Optimization & Indexation**: Added full sitemap entries and structured JSON-LD metadata for all newly added documentation and extension guides.
- **Direct Installer Flow**: Cleaned up Windows and macOS direct installation guides and removed legacy version references.

#### 🛡️ Platform Security & Validation
- **Unified Input Sanitization**: Applied comprehensive HTML sanitization and input validation across web, CRM, and desktop components.
- **Strict Permission Enforcement**: Hardened fail-closed access controls and role-based checks for administrative features.
- **Cross-Platform Binary Delivery**: Verified release distributions across macOS Apple Silicon & Intel, Windows 10/11, and Linux.
`,
  'v1.1.3': `## Invio v1.1.3 (Previous Production Release)

Invio Desktop v1.1.3 brings enhanced Windows 11 Microsoft Store compatibility, live Kitchen Display verification codes with countdown timers, and improved Add-ons Store navigation.

---

### What's Changed

#### 🪟 Windows 11 & Microsoft Store Support
- **Windows 11 Compatibility**: Updated Microsoft Store packaging for seamless installation across all Windows 10 and Windows 11 devices.
- **Smooth Store Updates**: Updates inside Microsoft Store installations are managed cleanly by the Store without extra prompts.
- **Refined Visual Assets**: Added high-DPI Windows tiles and splash screen scaling.

#### 🍽️ Restaurant POS & Kitchen Display
- **Rolling Kitchen Verification Code**: Added a 6-digit verification code with a 60-second countdown timer for kitchen tablet and phone logins.
- **Active Kitchen Screen Monitor**: Cashiers can see connected kitchen screens in real time.
- **1-Click Code Copy**: Added instant clipboard copying for faster kitchen screen pairing.

#### 🧩 Add-ons & Store Improvements
- **Email Dispatch Navigation**: Improved navigation and menu registration for the Email Add-on.
- **Signed Package Delivery**: All official add-on packages are digitally signed and verified before installation.
`,
  'v1.1.2': `## Invio v1.1.2 (Previous Production Release)

Invio Desktop v1.1.2 introduces the official Invio Add-ons Store, Restaurant & QR table ordering, Dual-Screen Customer POS Display, automated Email & WhatsApp bill sharing, and a much smaller, faster desktop app.

---

### What's Changed

#### 🧩 Official Add-ons Store
- **In-App Add-ons Manager**: Discover, install, enable, and manage official add-ons from the new Add-ons tab.
- **Verified & Signed Packages**: Every official add-on is digitally signed and verified before installation.
- **Isolated & Fast**: Each add-on runs cleanly in its own space so your core billing stays fast and uncluttered.
- **Real-Time Download Progress**: Live download speed and progress tracking when installing add-ons.

#### 🍽️ Restaurant POS & QR Table Ordering
- **Dine-In Table Management**: Configure tables and dining areas with live status cards (Vacant, Dining, Bill Requested).
- **Printable QR Table Stands**: Generate clean QR table stands for customer self-ordering.
- **Local Wi-Fi Mobile Ordering**: Guests scan table QR codes to view menus and place orders over shop Wi-Fi without internet.
- **Live Kitchen Screen**: Kitchen staff see incoming orders with chime alerts, timers, and status updates.
- **1-Click GST Billing**: Convert any table order into a paid Cash, UPI, or Card bill in one click.

#### 🖥️ Dual-Screen Customer POS Display
- **Live Cart Mirroring**: Shows line items, quantities, and totals on a customer-facing monitor in real time.
- **On-Screen UPI QR Code**: Displays a scan-and-pay UPI QR code for the exact bill total.
- **Branded Idle Screen**: Shows your shop name and welcome message between customers.

#### ✉️ Email & WhatsApp Bill Sharing
- **Gmail & Custom Business Email**: Connect Gmail in 1 click or configure business email with encrypted local credential storage.
- **Offline Outbox**: Queues unsent emails when offline and sends them automatically once back online.
- **1-Click WhatsApp Sharing**: Drafts itemized bill summaries for WhatsApp without needing to save customer contacts.

#### ⚡ Faster & Lighter App
- **Smaller Footprint**: Reduced app bundle size by over 90% for faster downloads and instant startup.`,

  'v1.1.1': `## Invio v1.1.1 (Previous Production Release)

Invio Desktop v1.1.1 delivers essential security patches, offline entitlement protection, and authentication pipeline parity across desktop and cloud services.

---

### What's Changed

#### 🛡️ Authentication & Account Email Security
- **Strict Account Email Preservation**: Guaranteed that the user's authentic login email cannot be overwritten when updating invoice merchant contact details in Settings.
- **Unified Subscription Resolution**: Aligned Google OAuth authentication with the backend subscription expiration policy, preventing expired entitlements from lingering in sessions.

#### ⚙️ Desktop Offline Protection & Reliability
- **Offline Max-Stale Entitlement Enforcement**: Corrected the offline cache staleness evaluation logic so that unverified installations past the 7-day stale window strictly fall back to the safe Free tier.
- **Calendar Month-End Clamping**: Prevented date math overflows when computing plan validity dates on the 31st of months.`,

  'v1.1.0': `## Invio v1.1.0 (Previous Production Release)

Invio Desktop v1.1.0 brings comprehensive security updates, updated platform dependencies across all operating systems, and safer macOS in-app updates.

---

### What's Changed

#### 🛡️ Security & Update Reliability
- **Hardened macOS Updater**: Improved in-app update execution with strict version validation and isolated script handling.
- **Updated Dependencies**: Upgraded core libraries across Desktop and Web services to the latest security-patched releases.`,

  'v1.0.10': `## Invio v1.0.10 (Previous Production Release)

Invio Desktop v1.0.10 delivers a seamless cross-platform in-app auto-update and restart engine, one-click manual installer download links, PostgreSQL settings synchronization, and session authentication expiration hardening.

---

### What's Changed

#### 🔄 In-App Auto-Update & Automatic Restart
- **Cross-Platform Auto-Restart**: Triggering "Update" on the update bar automatically downloads, verifies, unpacks, and restarts into the updated app version on macOS, Windows, and Linux.
- **Direct Manual Download Route**: Added a dedicated "Manual" action in the update notification bar pointing straight to \`/api/download/{platform}\`.
- **macOS Ditto Unpack Engine**: Replaced fragile updater restrictions with native \`/usr/bin/ditto\` bundle swapping and automated quarantine flag removal.

#### 💾 Storage & Data Consistency
- **PostgreSQL Settings Sync**: Aligned PostgreSQL adapter's \`saveSettings()\` to re-read and return canonical database state directly matching SQLite behavior.

#### 🔒 Authentication & Session Security
- **Strict Token Expiry Checks**: Discards expired legacy and safeStorage JWT tokens upon initialization to prevent flashes of unauthenticated states.

#### 🌐 Web Download Flow Refinement
- **Preview Isolation**: Decoupled platform switcher tabs from direct download triggers to prevent unintended file downloads.`,

  'v1.0.9': `## Invio v1.0.9 (Previous Production Release)

Invio Desktop v1.0.9 improves Google sign-in reliability, cloud database TLS connectivity, and paid invoice tracking accuracy.

---

### What's Changed

#### 🌐 Cloud Database TLS & Connectivity
- **Built-in Project CA Support**: Added root CA certificate support for cloud-hosted PostgreSQL instances so TLS works out of the box.
- **Connection Reliability**: Improved connection pool cleanup during storage tests.

#### 🔑 Google Sign-In Reliability
- **Smoother OAuth Flow**: Improved Google Sign-In reliability with clearer browser fallback feedback.
- **Accurate Paid Invoice Tracking**: Ensured paid and due amounts reflect exact totals on settled invoices.`,

  'v1.0.8': `## Invio v1.0.8 (Previous Production Release)

Invio Desktop v1.0.8 strengthens HTML sanitization, checkout verification, and download security.

---

### What's Changed

#### 🛡️ Sanitization & Input Safety
- **Structured DOM Sanitization**: Standardized HTML sanitization across desktop notes, email previews, and customer notices.
- **Consistent QR Rendering**: Unified vector QR markup rendering across the app.

#### 🔐 Account & Download Protection
- **Verified Checkout Claiming**: Enforced out-of-band email verification before claiming guest checkout accounts.
- **Validated Release Downloads**: Added strict origin and HTTPS checks for release downloads and update feeds.`,

  'v1.0.7': `## Invio v1.0.7 (Previous Production Release)

Invio Desktop v1.0.7 delivers full compliance with Microsoft Store Certification Policy 10.1.1.11 (On Device Tiles) with 75 custom visual tile assets, dedicated Windows master icons, and high-DPI system tray integration.

---

### What's Changed

#### 🪟 Windows Brand Identity & Microsoft Store Certification
- **Store Policy 10.1.1.11 Compliance**: Replaced all electron-builder sample fallback tiles with 75 custom-engineered UWP/MSIX on-device visual tile assets in \`build/appx\`, supporting all required DPI scale factors (100%–400%), wide tiles, large tiles, splash screens, and unplated taskbar targets.
- **Dedicated Windows Master Icon**: Generated multi-layer \`icon.ico\` with 7 embedded resolution tiers (16px to 256px) and high-resolution master PNG directly from \`Windows Icon.png\`.
- **System Tray Ergonomics**: Integrated crisp Windows notification area icons (\`tray-win.png\` and \`tray-win@2x.png\`) optimized for both light and dark taskbars.
- **macOS Liquid-Effect Preservation**: Maintained authentic liquid-effect brandmark icons (\`icon.icns\`, \`icon-light.png\`, \`icon-dark.png\`, auto-tinting template tray) for all macOS builds.

#### 🛡️ Database & Calculation Reliability
- **Multi-Account SQLite Isolation**: Reinforced database connection manager to guarantee strict account partition separation, preventing cross-user data bleed.
- **Proportional Bill-Level Tax Math**: Corrected bill-level tax percentage resolution on thermal POS receipts and exported PDF invoices.`,

  'v1.0.6': `## Invio v1.0.6 (Previous Production Release)

Invio Desktop v1.0.6 introduces modern authentication ergonomics with a dedicated 4-box segmented OTP input, centered modal layout aligned with CRM, automated multi-platform release uploads, Rank Math tree sheet sitemap, and complete Lighthouse 100/100 Core Web Vitals optimizations.

---

### What's Changed

#### 🔐 Authentication & Security Ergonomics
- **4-Box Segmented OTP Input**: Modernized desktop login and registration with a native 4-digit code entry interface featuring automatic cursor advancement, backspace navigation, clipboard paste support, and numeric keypad optimization.
- **Centered Dialog Layout**: Harmonized desktop authentication modal alignment with the web CRM layout, featuring brandmark hierarchy, clean tab switching, and constrained logo scaling.
- **Fail-Closed Session Hardening**: Preserved local SQLite database isolation; unauthenticated or unverified sessions fail closed with zero credit leaks.

#### ⚡ Performance & Core Web Vitals (Lighthouse 100/100)
- **950+ KiB Image Payload Reduction**: Re-engineered all 9 feature visual assets using high-efficiency LANCZOS resampling and modern WebP encoding, delivering an 82% footprint reduction across all platforms.
- **Zero Render-Blocking Font Pipeline**: Transitioned Google Fonts stylesheet delivery to asynchronous preloading (\`media="print" onload="this.media='all'"\`), eliminating 90ms main-thread render delays.
- **Code-Splitting Architecture**: Transitioned secondary navigation routes to dynamic lazy-loaded React chunks, shrinking the initial homepage bundle from 452 kB down to 373 kB.
- **GPU Hardware Compositing**: Promoted interactive fade and slide animations to dedicated GPU compositing layers with \`will-change: opacity, transform\`.

#### 🤖 Agentic Browsing & SEO Architecture
- **Agentic Resource Discovery (ARD 1.0)**: Deployed compliant \`ai-catalog.json\` and \`.well-known/ai-catalog.json\` manifests, resolving schema validation errors for autonomous AI agent indexing.
- **Collapsible Sheet Sitemap**: Redesigned XML sitemap stylesheet (\`/sitemap.xml\`) into a tight, collapsible tree table layout with instant section filtering and live URL path search.

#### 📦 Multi-Platform Packaging & Distribution
- **Zero-Storage-Quota Direct Uploads**: Multi-platform release runners upload \`.dmg\`, \`.zip\`, \`.exe\`, \`-portable.exe\`, \`.appx\`, \`.AppImage\`, and \`.deb\` binaries directly to GitHub Releases with exponential backoff retry.
- **Dual Architecture macOS Packages**: Fully verified standalone native installers for Apple Silicon (\`arm64\`) and Intel (\`x64\`) architectures.`,

  'v1.0.5': `## Invio v1.0.5 (Microsoft Store AppX & Windows Packaging)

Invio Desktop v1.0.5 adds Microsoft Store AppX packaging support, aligns Windows auto-updater manifests, and refines portable executable bundling.

---

### What's Changed

#### 🪟 Windows Packaging & Store Distribution
- **Microsoft Store AppX Bundling**: Added native AppX target build pipeline with configured publisher identities and background tile assets.
- **Auto-Updater Manifest Alignment**: Harmonized \`latest.yml\` metadata generation with generic provider feed endpoints on the backend download proxy.
- **Portable Executable Hardening**: Verified NSIS portable binaries with sandboxed local data partition creation for flash drive execution.`,

  'v1.0.4': `## Invio v1.0.4 (Multi-Platform Direct Upload Architecture)

Invio Desktop v1.0.4 re-architects the CI/CD release workflow to upload binaries directly to GitHub Releases, eliminating GitHub Actions storage quota limits.

---

### What's Changed

#### 🚀 Release Infrastructure & Reliability
- **Direct GitHub Releases Upload**: Matrix builders upload platform assets straight to GitHub Releases using \`gh release upload --clobber\` with backoff retry, bypassing the 500 MB Actions artifact storage quota.
- **Automated Multi-Platform Release Verification**: Added a dedicated verification job that validates all 9 required platform installers and updater manifests before marking the release complete.
- **Secure Backend Download Proxy**: Integrated server-side token handling in the backend API to stream binaries without exposing GitHub tokens to client applications.`,

  'v1.0.3': `## Invio v1.0.3 (Offline SQLite Integrity & Security Baseline)

Invio Desktop v1.0.3 brings offline SQLite transaction rollback protection, strict IPC payload schema validation, and secure operating system keychain encryption.

---

### What's Changed

#### 🛡️ Database & IPC Security
- **Transaction Rollback Protection**: Wrapped multi-item invoice creation and inventory adjustments in atomic SQLite transactions to prevent partial writes during sudden power loss.
- **Strict IPC Origin Validation**: Electron main process strictly validates sender frames and restricts IPC channel invocations to verified local contexts.
- **OS Keychain Storage**: Email credentials and sensitive settings are encrypted using Electron \`safeStorage\` backed by the OS keychain rather than plain text.`,

  'v1.0.2': `## Invio v1.0.2 (Authentication Reliability & State Isolation)

Invio Desktop v1.0.2 brings vital authentication reliability improvements, multi-account state isolation, email verification security gates, and default dashboard navigation.

---

### What's Changed

#### 🔒 Security & Verification
- **Strict OTP Verification Gate**: Accounts without verified emails are strictly prevented from accessing local billing workspaces and sensitive data. Users must verify their 4-digit OTP code before proceeding.
- **Offline Session Protection**: Cached sessions now enforce email verification checks; unverified sessions are rejected even during offline transitions.
- **OAuth Mode Hardening**: Google sign-in strictly separates account creation from standard sign-in, preventing unauthorized account takeovers or unverified states.

#### 🔄 Multi-Account & Plan State Synchronization
- **Instant Plan Refresh on Relogin**: Resolved an issue where logging out and switching to another account displayed stale subscription plan details from the previous account.
- **Reactive Auth Context**: \`useAccountContext\` now actively listens to both authentication identity updates (\`invio:auth-changed\`) and SQLite storage partition switches (\`databaseService.onReloaded\`).
- **Clean State Purge**: Cached subscription context and partition identity pointers are thoroughly cleared on user logout.
- **Default Plan Integrity**: Default plan is strictly set to **Free**; premium tiers (**Plus** and **Pro**) require verified payment authorization or authorized promotions.

#### 🖥️ Navigation & UX Polish
- **Dashboard Reset on Startup & Login**: Starting the application or signing in with any account now consistently lands on the **Dashboard** instead of persisting previous pages (such as Settings).
- **Graceful Session Alerts**: Informative toast notifications when sessions expire or sign-outs complete.`,

  'v1.0.1': `## Invio v1.0.1 (Hardware & POS Integration)

Invio Desktop v1.0.1 adds real-time secondary monitor customer POS displays, ESC/POS thermal receipt printing, and barcode scanner integration.

---

### What's Changed

#### 🖨️ POS & Hardware Integration
- **Dual-Screen Customer POS Display**: Real-time checkout projection onto secondary HDMI or USB monitors showing line items, itemized discounts, taxes, and dynamic payment QR code.
- **ESC/POS Thermal Slip Engine**: Native raw driver communication for 58mm (2-inch) and 80mm (3-inch) thermal receipt printers without system dialog prompts.
- **Barcode Scanner HID Integration**: Automatic barcode reader detection with instantaneous catalog lookup and line quantity increments.

#### 📊 Taxes & Email Delivery
- **Automated GST Splits**: In-engine separation of intra-state transactions (CGST 50% + SGST 50%) and inter-state transactions (IGST 100%) based on customer place of supply.
- **Encrypted Email Delivery**: Direct dispatch of PDF invoices via Gmail OAuth or custom SMTP credentials stored in the OS cryptographic keychain.
- **Dynamic UPI Payment QR**: Generates standard merchant UPI QR payment strings on customer bills for instant smartphone settlement.`,

  'v1.0.0': `## Invio v1.0.0 (Initial Production Launch)

Invio Desktop v1.0.0 is the foundational release of the privacy-first desktop billing and inventory management application.

---

### What's Changed

#### 💾 Core Billing Architecture
- **Embedded SQLite Storage Engine**: Invoices, products, and customer records reside exclusively in a local database partition in your user application directory.
- **Vector A4 & A5 PDF Generator**: High-resolution vector document rendering with custom store logos, bank account details, and terms.
- **Inventory Catalog & Low-Stock Warnings**: Product stock tracking, barcode SKU index, and real-time inventory ledger adjustments.
- **Customer Ledger & Tax Identifiers**: Contact management with GSTIN validation, historical invoice trails, and credit tracking.`
};

/**
 * Standard fallback catalogue of all published releases.
 * Used for instant first-paint hydration and offline resilience.
 */
const INITIAL_RELEASES = [
  {
    tag: 'v1.1.6',
    version: '1.1.6',
    anchorId: 'v1-1-6',
    name: 'Version 1.1.6 (Latest Production Release)',
    date: 'November 26, 2026',
    isLatest: true,
    assets: [
      { name: 'Invio-1.1.6-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '68.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.6-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '66.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.6-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '72.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.6-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '70.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.6-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '62.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.6-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '61.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.6-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '78.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.6-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '65.2 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.6-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '58.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.6']
  },
  {
    tag: 'v1.1.5',
    version: '1.1.5',
    anchorId: 'v1-1-5',
    name: 'Version 1.1.5 (Previous Production Release)',
    date: 'November 25, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.5-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '68.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.5-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '66.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.5-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '72.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.5-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '70.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.5-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '62.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.5-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '61.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.5-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '78.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.5-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '65.2 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.5-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '58.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.5']
  },
  {
    tag: 'v1.1.4',
    version: '1.1.4',
    anchorId: 'v1-1-4',
    name: 'Version 1.1.4 (Previous Production Release)',
    date: 'November 14, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.4-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '68.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.4-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '66.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.4-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '72.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.4-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '70.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.4-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '62.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.4-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '61.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.4-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '78.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.4-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '65.2 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.4-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '58.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.4']
  },
  {
    tag: 'v1.1.3',
    version: '1.1.3',
    anchorId: 'v1-1-3',
    name: 'Version 1.1.3 (Previous Production Release)',
    date: 'November 1, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.3-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '68.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.3-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '66.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.3-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '72.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.3-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '70.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.3-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '62.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.3-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '61.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.3-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '78.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.3-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '65.2 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.3-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '58.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.3']
  },
  {
    tag: 'v1.1.2',
    version: '1.1.2',
    anchorId: 'v1-1-2',
    name: 'Version 1.1.2 (Previous Production Release)',
    date: 'November 1, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.2-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '68.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.2-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '66.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.2-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '72.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.2-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '70.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.2-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '62.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.2-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '61.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.2-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '78.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.2-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '65.2 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.2-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '58.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.2']
  },
  {
    tag: 'v1.1.1',
    version: '1.1.1',
    anchorId: 'v1-1-1',
    name: 'Version 1.1.1 (Previous Production Release)',
    date: 'October 27, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.1-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.1-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.1-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.1-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.1-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.1-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.1-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.1-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.1-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.1']
  },
  {
    tag: 'v1.1.0',
    version: '1.1.0',
    anchorId: 'v1-1-0',
    name: 'Version 1.1.0 (Previous Production Release)',
    date: 'October 26, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.1.0-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.0-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.0-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.0-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.1.0-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.0-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.0-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.1.0-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.1.0-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.1.0']
  },
  {
    tag: 'v1.0.10',
    version: '1.0.10',
    anchorId: 'v1-0-10',
    name: 'Version 1.0.10 (Previous Production Release)',
    date: 'October 22, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.10-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.10-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.10-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.10-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.10-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.10-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.10-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.10-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.10-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.10']
  },
  {
    tag: 'v1.0.9',
    version: '1.0.9',
    anchorId: 'v1-0-9',
    name: 'Version 1.0.9 (Previous Production Release)',
    date: 'October 20, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.9-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.9-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.9-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.9-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.9-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.9-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.9-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.9-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.9-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.9']
  },
  {
    tag: 'v1.0.8',
    version: '1.0.8',
    anchorId: 'v1-0-8',
    name: 'Version 1.0.8 (Previous Production Release)',
    date: 'October 20, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.8-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.8-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.8-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.8-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.8-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.8-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.8-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.8-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.8-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.8']
  },
  {
    tag: 'v1.0.7',
    version: '1.0.7',
    anchorId: 'v1-0-7',
    name: 'Version 1.0.7 (Previous Production Release)',
    date: 'October 19, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.7-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.7-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.7-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.7-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.7-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '114.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.7-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '114.0 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.7-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.7-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.3 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.7-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.7']
  },
  {
    tag: 'v1.0.6',
    version: '1.0.6',
    anchorId: 'v1-0-6',
    name: 'Version 1.0.6 (Previous Production Release)',
    date: 'October 18, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.6-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '133.3 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.6-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '131.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.6-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '139.6 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.6-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '137.7 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.6-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '113.9 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.6-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '113.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.6-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '167.3 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.6-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '130.1 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.6-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '102.3 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.6']
  },
  {
    tag: 'v1.0.5',
    version: '1.0.5',
    anchorId: 'v1-0-5',
    name: 'Version 1.0.5 (Microsoft Store AppX)',
    date: 'October 17, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.5-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '132.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.5-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '113.5 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.5-win-x64.appx', arch: 'Windows 64-bit (x64)', format: 'Microsoft Store Package', size: '166.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.5-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '129.5 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.5']
  },
  {
    tag: 'v1.0.4',
    version: '1.0.4',
    anchorId: 'v1-0-4',
    name: 'Version 1.0.4 (Direct Upload Pipeline)',
    date: 'October 14, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.4-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '131.2 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.4-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '112.4 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.4-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '128.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.4']
  },
  {
    tag: 'v1.0.3',
    version: '1.0.3',
    anchorId: 'v1-0-3',
    name: 'Version 1.0.3 (Offline SQLite Integrity)',
    date: 'October 14, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.3-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '130.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.3-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '111.9 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.3-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '127.2 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.3']
  },
  {
    tag: 'v1.0.2',
    version: '1.0.2',
    anchorId: 'v1-0-2',
    name: 'Version 1.0.2 (Security & State Isolation)',
    date: 'October 12, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.2-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '128.8 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-arm64.zip', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Auto-Update Package', size: '126.9 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-x64.dmg', arch: 'Intel Mac (x64)', format: 'Mac Disk Image', size: '133.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-mac-x64.zip', arch: 'Intel Mac (x64)', format: 'Auto-Update Package', size: '131.5 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.2-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '111.1 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.2-win-x64-portable.exe', arch: 'Windows 64-bit (x64)', format: 'Portable Windows App', size: '110.9 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.2-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '125.4 MB', platform: 'linux', icon: LinuxIcon },
      { name: 'Invio-1.0.2-linux-amd64.deb', arch: 'Debian / Ubuntu (amd64)', format: 'Debian Package', size: '100.2 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.2']
  },
  {
    tag: 'v1.0.1',
    version: '1.0.1',
    anchorId: 'v1-0-1',
    name: 'Version 1.0.1 (Hardware & POS Integration)',
    date: 'October 7, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.1-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '127.4 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.1-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '109.8 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.1-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '124.1 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.1']
  },
  {
    tag: 'v1.0.0',
    version: '1.0.0',
    anchorId: 'v1-0-0',
    name: 'Version 1.0.0 (Initial Production Launch)',
    date: 'October 2, 2026',
    isLatest: false,
    assets: [
      { name: 'Invio-1.0.0-mac-arm64.dmg', arch: 'Apple Silicon (M1/M2/M3/M4)', format: 'Mac Disk Image', size: '126.1 MB', platform: 'mac', icon: AppleIcon },
      { name: 'Invio-1.0.0-win-x64.exe', arch: 'Windows 64-bit (x64)', format: 'Windows Installer', size: '108.2 MB', platform: 'windows', icon: WindowsIcon },
      { name: 'Invio-1.0.0-linux-x86_64.AppImage', arch: 'Linux 64-bit (x86_64)', format: 'Universal AppImage', size: '122.9 MB', platform: 'linux', icon: LinuxIcon },
    ],
    notes: CURATED_RELEASE_NOTES['v1.0.0']
  },
];

/**
 * Format bytes into human-readable size string.
 */
function formatFileSize(bytes) {
  if (!bytes || typeof bytes !== 'number') return '120 MB';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Infer platform, architecture, package format and icon from filename.
 */
function inferAssetMetadata(name, size, downloadUrl = null) {
  let platform = 'windows';
  let platformKey = 'windows';
  let icon = WindowsIcon;
  let arch = 'Windows 64-bit (x64)';
  let format = 'Windows Installer';

  if (name.endsWith('.dmg')) {
    platform = 'mac';
    platformKey = name.includes('arm64') ? 'mac' : 'macIntel';
    icon = AppleIcon;
    format = 'Apple Disk Image';
    arch = name.includes('arm64') ? 'Apple Silicon (M1/M2/M3/M4)' : 'Intel Mac (x64)';
  } else if (name.endsWith('.zip')) {
    platform = 'mac';
    platformKey = name.includes('arm64') ? 'mac' : 'macIntel';
    icon = AppleIcon;
    format = 'Auto-Update Package';
    arch = name.includes('arm64') ? 'Apple Silicon (M1/M2/M3/M4)' : 'Intel Mac (x64)';
  } else if (name.endsWith('.appx')) {
    platform = 'windows';
    icon = WindowsIcon;
    format = 'Microsoft Store Package';
    arch = 'Windows 64-bit (x64)';
  } else if (name.includes('-portable.exe')) {
    platform = 'windows';
    icon = WindowsIcon;
    format = 'Standalone Portable';
    arch = 'Windows 64-bit (x64)';
  } else if (name.endsWith('.exe')) {
    platform = 'windows';
    icon = WindowsIcon;
    format = 'Windows Setup Installer';
    arch = 'Windows 64-bit (x64)';
  } else if (name.endsWith('.AppImage')) {
    platform = 'linux';
    icon = LinuxIcon;
    format = 'Linux AppImage';
    arch = 'Linux 64-bit (x86_64)';
  } else if (name.endsWith('.deb')) {
    platform = 'linux';
    icon = LinuxIcon;
    format = 'Debian / Ubuntu Package';
    arch = 'Debian Package (amd64)';
  }

  return {
    name,
    platform,
    platformKey,
    icon,
    arch,
    format,
    size: formatFileSize(size),
    downloadUrl: downloadUrl || null,
  };
}

/**
 * Filter out internal updater manifests and blockmaps, returning user-installable binaries.
 */
function filterInstallableAssets(rawAssets) {
  if (!Array.isArray(rawAssets)) return [];
  return rawAssets
    .filter((a) => {
      const name = a.name || '';
      return (
        !name.endsWith('.blockmap') &&
        !name.startsWith('latest') &&
        (name.endsWith('.dmg') ||
          name.endsWith('.zip') ||
          name.endsWith('.exe') ||
          name.endsWith('.appx') ||
          name.endsWith('.AppImage') ||
          name.endsWith('.deb'))
      );
    })
    .map((a) => inferAssetMetadata(a.name, a.size, a.browser_download_url || a.downloadUrl || a.url || null));
}

/**
 * High-performance, zero-dependency Markdown parser & renderer.
 * Converts markdown headers (# to ####), tables (| ... |), code blocks,
 * bullet lists, bold, italics, links, and GitHub changelog comparison lines
 * into beautifully styled, accessible React UI components.
 */
function renderMarkdown(mdText) {
  if (!mdText) return null;
  const lines = mdText.split('\n');
  const elements = [];
  let i = 0;

  // Inline formatting helper for bold, code, links, and italics
  const formatInline = (text) => {
    if (!text) return null;
    const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

    return tokens.map((tok, idx) => {
      if (tok.startsWith('**') && tok.endsWith('**') && tok.length >= 4) {
        return (
          <strong key={idx} className="font-semibold text-slate-900">
            {tok.slice(2, -2)}
          </strong>
        );
      }
      if (tok.startsWith('*') && tok.endsWith('*') && tok.length >= 2 && !tok.startsWith('**')) {
        return (
          <em key={idx} className="italic text-slate-700">
            {tok.slice(1, -1)}
          </em>
        );
      }
      if (tok.startsWith('`') && tok.endsWith('`') && tok.length >= 2) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-slate-100 text-purple-700 font-mono text-[11px] border border-slate-200/60"
          >
            {tok.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = tok.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const rawHref = (linkMatch[2] || '').trim();
        const isSafe = /^(https?:\/\/|mailto:|\/)/i.test(rawHref);
        const safeHref = isSafe ? rawHref : '#';
        return (
          <a
            key={idx}
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7C3AED] hover:underline font-medium inline-flex items-center gap-0.5"
          >
            <span>{linkMatch[1]}</span>
            <svg className="size-2.5 text-slate-400 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        );
      }
      return tok;
    });
  };

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // 1. Horizontal divider
    if (/^(\*\*\*|---|___)$/.test(trimmed)) {
      elements.push(<hr key={`hr-${i}`} className="my-3.5 border-slate-200/90" />);
      i++;
      continue;
    }

    // 2. Full Changelog Git diff link
    if (trimmed.includes('**Full Changelog**:') || trimmed.includes('Full Changelog:')) {
      const urlMatch = trimmed.match(/https:\/\/github\.com\/[^\s\)]+/);
      const url = urlMatch ? urlMatch[0] : null;
      const compareRange = url ? url.split('/').pop() : 'Full commits diff';

      elements.push(
        <div
          key={`changelog-diff-${i}`}
          className="my-2.5 inline-flex flex-wrap items-center gap-2 px-3 py-1.5 bg-purple-50/70 border border-purple-200/70 rounded-md text-xs text-purple-900"
        >
          <span className="font-semibold">GitHub Commits Comparison:</span>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7C3AED] hover:text-[#6D28D9] hover:underline font-mono text-[11px] font-semibold inline-flex items-center gap-1"
            >
              <span>{compareRange}</span>
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          ) : (
            <span className="font-mono text-[11px]">{trimmed}</span>
          )}
        </div>
      );
      i++;
      continue;
    }

    // 3. Markdown Table Parser (| col1 | col2 |)
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      if (tableLines.length >= 2) {
        const headerCells = tableLines[0]
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());

        // Skip separator row (tableLines[1])
        const dataRows = tableLines.slice(2).map((rowLine) =>
          rowLine
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim())
        );

        elements.push(
          <div key={`table-${i}`} className="overflow-x-auto my-3 rounded border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left font-mono text-[11px] border-collapse">
              <thead className="bg-slate-100/80 text-slate-800 font-semibold border-b border-slate-200">
                <tr>
                  {headerCells.map((h, hIdx) => (
                    <th key={hIdx} className="py-2 px-3 whitespace-nowrap">
                      {formatInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {dataRows.map((r, rIdx) => (
                  <tr key={rIdx} className="hover:bg-purple-50/20 transition-colors">
                    {r.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 whitespace-nowrap text-slate-800">
                        {formatInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // 4. Level 4 Heading (#### )
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4
          key={`h4-${i}`}
          className="text-xs font-bold text-slate-900 pt-3 pb-1 flex items-center gap-1.5"
        >
          <span className="size-1.5 rounded-full bg-[#7C3AED]"></span>
          <span>{formatInline(trimmed.slice(5))}</span>
        </h4>
      );
      i++;
      continue;
    }

    // 5. Level 3 Heading (### )
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-3.5 pb-1 border-b border-slate-100"
        >
          {formatInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // 6. Level 2 Heading (## )
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-sm font-bold text-slate-900 pt-3 pb-1 flex items-center gap-2"
        >
          {formatInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // 7. Level 1 Markdown Heading (# ) rendered as h2 to preserve single document H1
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2
          key={`h1-${i}`}
          className="text-base font-bold text-slate-900 pt-3 pb-1.5 border-b border-slate-200"
        >
          {formatInline(trimmed.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // 8. Unordered Lists (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1.5 my-2 text-slate-700 text-xs">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 9. Blockquotes (> )
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-3 border-[#7C3AED] pl-3 py-1 my-2 text-xs italic text-slate-600 bg-purple-50/20 rounded-r"
        >
          {formatInline(trimmed.slice(2))}
        </blockquote>
      );
      i++;
      continue;
    }

    // 10. General Paragraph
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed text-slate-700 my-1.5 text-xs">
        {formatInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

export function ChangelogPage() {
  const { openDownloadModal } = useDownloadModal();

  // Releases state: initialized with static fallback, enriched dynamically from backend API
  const [releases, setReleases] = useState(INITIAL_RELEASES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    applySEO('changelog');
    window.scrollTo(0, 0);
  }, []);

  /**
   * Automatically fetch published releases directly from the backend API proxy.
   * If newer versions exist on GitHub, they are automatically merged into the list
   * and the Jump-To navigation bar updates without requiring manual page edits.
   */
  const fetchLiveReleases = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/download/meta/releases`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.releases) && data.releases.length > 0) {
        setReleases((prevList) => {
          const remoteList = data.releases;

          // Build a merged release list keyed by tag
          const releaseMap = new Map();

          // 1. Preload curated fallbacks
          prevList.forEach((rel) => {
            releaseMap.set(rel.tag, rel);
          });

          // 2. Merge live release metadata from GitHub
          remoteList.forEach((remoteRel, idx) => {
            const tag = remoteRel.tag || `v${remoteRel.version}`;
            const version = remoteRel.version || tag.replace(/^v/, '');
            const anchorId = tag.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
            const existing = releaseMap.get(tag) || {};

            // Format date nicely from ISO timestamp
            let formattedDate = existing.date;
            if (remoteRel.publishedAt) {
              try {
                formattedDate = new Date(remoteRel.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });
              } catch {
                formattedDate = existing.date || 'October 2026';
              }
            }

            // Determine release notes (curated notes take precedence if GitHub body is just diff link)
            let releaseNotes = remoteRel.notes && remoteRel.notes.trim() ? remoteRel.notes : '';
            if (
              !releaseNotes ||
              releaseNotes.startsWith('**Full Changelog**') ||
              releaseNotes.startsWith('Full Changelog')
            ) {
              const curated = CURATED_RELEASE_NOTES[tag];
              if (curated) {
                releaseNotes = curated;
              }
            }

            // Extract assets
            const assets =
              Array.isArray(remoteRel.assets) && remoteRel.assets.length > 0
                ? filterInstallableAssets(remoteRel.assets)
                : existing.assets || [];

            releaseMap.set(tag, {
              ...existing,
              tag,
              version,
              anchorId,
              name: idx === 0 ? `Version ${version} (Latest Production Release)` : `Version ${version}`,
              date: formattedDate || 'October 2026',
              isLatest: idx === 0,
              notes: releaseNotes || existing.notes || CURATED_RELEASE_NOTES[tag] || '',
              assets: assets.length > 0 ? assets : existing.assets || [],
            });
          });

          // Convert back to sorted array (latest first)
          return Array.from(releaseMap.values()).sort((a, b) => {
            // Semantic version sort descending
            const vA = a.version.split('.').map(Number);
            const vB = b.version.split('.').map(Number);
            for (let i = 0; i < Math.max(vA.length, vB.length); i++) {
              const diff = (vB[i] || 0) - (vA[i] || 0);
              if (diff !== 0) return diff;
            }
            return 0;
          });
        });
      }
    } catch (err) {
      console.warn('[ChangelogPage] Using offline fallback release catalogue:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveReleases();
  }, [fetchLiveReleases]);

  return (
    <A4DocLayout
      title="Invio Desktop Release Notes &amp; Version History"
      subtitle="Official release documentation, verified distribution binaries, and hardware specifications • Published by Timrio • Last updated: November 2026"
    >
      {/* Sticky, Horizontal Scrollable Jump-To Navigation (Auto-Populates for Every Release) */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:-mx-6 sm:px-6 my-4 shadow-sm not-prose border-y border-slate-200/80">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth scrollbar-thin">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0 mr-1 flex items-center gap-1">
            <svg className="size-3.5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
            Jump to:
          </span>

          {releases.map((rel) => (
            <a
              key={rel.tag}
              href={`#${rel.anchorId}`}
              className={`shrink-0 text-xs px-2.5 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                rel.isLatest
                  ? 'bg-[#7C3AED] text-white shadow-sm font-semibold hover:bg-[#6D28D9]'
                  : 'bg-white text-slate-700 hover:text-[#7C3AED] hover:bg-slate-100 border border-slate-200/90 font-medium'
              }`}
            >
              {rel.isLatest && <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
              <span>{rel.tag}</span>
              {rel.isLatest && <span className="text-[10px] uppercase font-bold opacity-90">(Latest)</span>}
            </a>
          ))}

          <a
            href="#print-specs"
            className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium bg-white text-slate-700 hover:text-[#7C3AED] hover:bg-slate-100 border border-slate-200/90 whitespace-nowrap"
          >
            Print Specs
          </a>
          <a
            href="#security-baseline"
            className="shrink-0 text-xs px-2.5 py-1 rounded-full font-medium bg-white text-slate-700 hover:text-[#7C3AED] hover:bg-slate-100 border border-slate-200/90 whitespace-nowrap"
          >
            Security Baseline
          </a>
        </div>
      </div>

      <p className="text-slate-600 text-xs leading-relaxed">
        This document provides the definitive change log, distribution manifests, security bulletins, and hardware compatibility specifications for the Invio desktop application on macOS, Windows, and Linux. All official release binaries are compiled directly from source and verified for offline production readiness.
      </p>

      {/* Dynamic Release Sections */}
      {releases.map((rel, index) => (
        <section
          key={rel.tag}
          id={rel.anchorId}
          className="pt-6 scroll-mt-32 space-y-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold uppercase tracking-tight text-slate-900">
                  {index + 1}. {rel.name}
                </h2>
                {rel.isLatest && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-[#7C3AED] border border-purple-200">
                    Latest Production
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                Released: {rel.date} • Tag: <code>{rel.tag}</code> • Status: Production Verified
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const defaultOs = detectDeviceOS();
                const matchingAsset = (rel.assets || []).find(
                  (a) => a.platformKey === defaultOs.id || a.platform === defaultOs.id
                );
                openDownloadModal({
                  ...defaultOs,
                  filename: matchingAsset?.name || defaultOs.filename,
                  ...(matchingAsset?.downloadUrl ? { downloadEndpoint: matchingAsset.downloadUrl } : {}),
                });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded shadow-sm transition-colors cursor-pointer"
            >
              <DownloadIcon className="size-3.5" />
              <span>Download {rel.tag}</span>
            </button>
          </div>

          {/* Render Rich Markdown with parsed tables, headers, and code */}
          <div className="text-xs leading-relaxed text-slate-800 space-y-1">
            {isLoading && !rel.notes ? (
              <ReleaseNotesSkeleton />
            ) : (
              renderMarkdown(rel.notes)
            )}
          </div>

          {/* Verified Binaries Table */}
          {rel.assets && rel.assets.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Verified Distribution Binaries ({rel.tag})
                </h3>
                <span className="text-[10px] font-mono text-slate-500">
                  {rel.assets.length} Verified Platform Packages
                </span>
              </div>

              <div className="overflow-x-auto rounded border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead className="bg-slate-100/70 text-slate-800 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Distribution File</th>
                      <th className="py-2 px-3">Target Architecture</th>
                      <th className="py-2 px-3">Package Format</th>
                      <th className="py-2 px-3">Size</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {rel.assets.map((asset, idx) => {
                      const IconComp = asset.icon || WindowsIcon;
                      return (
                        <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                          <td className="py-2 px-3 font-semibold text-slate-900 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <IconComp className="size-3 text-slate-400 shrink-0" />
                              <span>{asset.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap text-slate-600">
                            {asset.arch}
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap text-slate-500">
                            {asset.format}
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap text-slate-600">
                            {asset.size}
                          </td>
                          <td className="py-2 px-3 text-right whitespace-nowrap">
                            {asset.platform === 'windows' ? (
                              <div className="flex items-center justify-end gap-2">
                                <a
                                  href="https://apps.microsoft.com/detail/9nd42tj7n976?hl=en-US&gl=IN"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline cursor-pointer inline-flex items-center gap-1 text-[11px]"
                                  title="Get from Microsoft Store (Safe & Verified)"
                                >
                                  <span>Store</span>
                                  <ExternalLinkIcon className="size-2.5" />
                                </a>
                                <span className="text-slate-300">|</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    openDownloadModal({
                                      ...PLATFORM_DOWNLOADS.windows,
                                      filename: asset.name || PLATFORM_DOWNLOADS.windows.filename,
                                      ...(asset.downloadUrl ? { downloadEndpoint: asset.downloadUrl } : {}),
                                    })
                                  }
                                  className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                                >
                                  <span>Download</span>
                                  <DownloadIcon className="size-2.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  const basePlatform =
                                    PLATFORM_DOWNLOADS[asset.platformKey || asset.platform] || PLATFORM_DOWNLOADS.windows;
                                  openDownloadModal({
                                    ...basePlatform,
                                    filename: asset.name || basePlatform.filename,
                                    ...(asset.downloadUrl ? { downloadEndpoint: asset.downloadUrl } : {}),
                                  });
                                }}
                                className="text-[#7C3AED] hover:text-[#6D28D9] font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>Download</span>
                                <DownloadIcon className="size-2.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      ))}

      {/* Hardware Printing Specifications Section */}
      <section id="print-specs" className="pt-6 scroll-mt-32 space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-100">
          <PrinterIcon className="size-4 text-[#7C3AED]" />
          <h2 className="text-base font-bold uppercase tracking-tight text-slate-900">
            Hardware Printing &amp; Receipt Specifications
          </h2>
        </div>

        <p className="text-slate-600 text-xs">
          Invio natively renders and prints across standard laser/inkjet sheet paper and specialized continuous roll thermal receipt hardware:
        </p>

        <div className="overflow-x-auto rounded border border-slate-200 bg-white shadow-sm mt-2">
          <table className="w-full text-left font-mono text-[11px] border-collapse">
            <thead className="bg-slate-100/70 text-slate-800 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">Format</th>
                <th className="py-2 px-3">Dimensions</th>
                <th className="py-2 px-3">Hardware Type</th>
                <th className="py-2 px-3">Typical Application</th>
                <th className="py-2 px-3 text-right">Rendering Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">A4 Full Page</td>
                <td className="py-2 px-3 whitespace-nowrap">210 × 297 mm</td>
                <td className="py-2 px-3 whitespace-nowrap">Laser / Inkjet / PDF</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">B2B Tax Invoices, GST Filings, Detailed Quotes</td>
                <td className="py-2 px-3 text-right font-semibold text-emerald-700 whitespace-nowrap">Vector PDF &amp; Print</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">A5 Half Page</td>
                <td className="py-2 px-3 whitespace-nowrap">148 × 210 mm</td>
                <td className="py-2 px-3 whitespace-nowrap">Laser, Inkjet, Dot-Matrix</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Wholesale slips, Delivery challans, Compact bills</td>
                <td className="py-2 px-3 text-right font-semibold text-emerald-700 whitespace-nowrap">Vector PDF &amp; Print</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">80mm Thermal</td>
                <td className="py-2 px-3 whitespace-nowrap">80 mm roll (3-inch)</td>
                <td className="py-2 px-3 whitespace-nowrap">ESC/POS Thermal Receipt Printers</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Retail checkout, Supermarkets, Restaurants</td>
                <td className="py-2 px-3 text-right font-semibold text-purple-700 whitespace-nowrap">Raw ESC/POS Commands</td>
              </tr>
              <tr className="hover:bg-purple-50/20 transition-colors">
                <td className="py-2 px-3 font-bold text-slate-900 whitespace-nowrap">58mm Thermal</td>
                <td className="py-2 px-3 whitespace-nowrap">58 mm roll (2-inch)</td>
                <td className="py-2 px-3 whitespace-nowrap">Bluetooth / USB Mini Thermal Printers</td>
                <td className="py-2 px-3 text-slate-600 whitespace-nowrap">Kiosks, Mobile sales, Compact counters</td>
                <td className="py-2 px-3 text-right font-semibold text-purple-700 whitespace-nowrap">Raw ESC/POS Commands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Security Baseline Note */}
      <section id="security-baseline" className="pt-6 scroll-mt-32 space-y-1.5 text-slate-600 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-1">
          Binary Verification &amp; Security Baseline
        </h3>
        <p>
          All Invio desktop installers enforce strict process isolation, sandboxed interface execution, validated IPC payloads, and secure email credential protection inside the operating system cryptographic keychain.
        </p>
      </section>
    </A4DocLayout>
  );
}

export default ChangelogPage;
