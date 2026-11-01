import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { A4DocLayout } from '../components/A4DocLayout';
import { applySEO } from '../utils/seoHelper';
import { detectDeviceOS, MICROSOFT_STORE_URL } from '../utils/osDetector';
import { useDownloadModal } from '../context/DownloadModalContext';
import { SearchIcon, ChevronDownIcon } from '../components/tools/ToolIcons';

export const DOC_CATEGORIES = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    steps: [
      {
        id: 'download',
        stepNumber: 1,
        title: 'How to Download',
        shortDesc: 'Download the app for your computer',
        seoKey: 'docs-download',
      },
      {
        id: 'installation',
        stepNumber: 2,
        title: 'How to Install',
        shortDesc: 'Step-by-step setup on Windows & Mac',
        seoKey: 'docs-installation',
      },
      {
        id: 'system',
        stepNumber: 3,
        title: 'Computer Requirements',
        shortDesc: 'Works on regular laptops & computers',
        seoKey: 'docs-system',
      },
    ],
  },
  {
    id: 'printers-receipts',
    name: 'Printers & Receipts',
    steps: [
      {
        id: 'thermal-printer',
        stepNumber: 4,
        title: 'Thermal Receipt Printer',
        shortDesc: 'Setup 2-inch & 3-inch shop bill printers',
        seoKey: 'docs-thermal-printer',
      },
      {
        id: 'standard-printer',
        stepNumber: 5,
        title: 'A4 & A5 Office Printers',
        shortDesc: 'Print full-page GST bills on regular printers',
        seoKey: 'docs-standard-printer',
      },
    ],
  },
  {
    id: 'counter-hardware',
    name: 'Counter & Hardware',
    steps: [
      {
        id: 'quickstart',
        stepNumber: 6,
        title: 'Making Your First Bill',
        shortDesc: 'Add shop details, products & print in 30s',
        seoKey: 'docs-quickstart',
      },
      {
        id: 'barcode-hardware',
        stepNumber: 7,
        title: 'Barcode Scanners & Cash Drawers',
        shortDesc: 'Point-and-scan barcodes & cash drawer open',
        seoKey: 'docs-barcode-hardware',
      },
      {
        id: 'pos-display',
        stepNumber: 8,
        title: 'Customer Display Screen',
        shortDesc: 'Show live bill & UPI QR on second monitor',
        seoKey: 'docs-pos-display',
      },
    ],
  },
  {
    id: 'customer-messaging',
    name: 'Sending Bills to Customers',
    steps: [
      {
        id: 'whatsapp',
        stepNumber: 9,
        title: 'Sharing Bills on WhatsApp',
        shortDesc: 'Send instant bill summaries to customer WhatsApp',
        seoKey: 'docs-whatsapp',
      },
      {
        id: 'email-setup',
        stepNumber: 10,
        title: 'Emailing Invoices to Customers',
        shortDesc: 'Connect Gmail or business email with PDF attached',
        seoKey: 'docs-email-setup',
      },
    ],
  },
  {
    id: 'extensions-platform',
    name: 'Extensions & Store Add-Ons',
    steps: [
      {
        id: 'extensions-guide',
        stepNumber: 11,
        title: 'Extension Manager & Store',
        shortDesc: 'Discover, 1-click install & manage verified add-ons',
        seoKey: 'docs-extensions-guide',
      },
      {
        id: 'restaurant-extension',
        stepNumber: 12,
        title: 'Restaurant POS & QR Menus',
        shortDesc: 'Table ordering, live KDS kitchen display & auto-billing',
        seoKey: 'docs-restaurant-extension',
      },
      {
        id: 'pos-display-extension',
        stepNumber: 13,
        title: 'Dual-Screen POS Customer Display',
        shortDesc: 'Customer-facing live cart, UPI QR & store branding',
        seoKey: 'docs-pos-display-extension',
      },
      {
        id: 'email-whatsapp-extensions',
        stepNumber: 14,
        title: 'Automated Email & WhatsApp Invoicing',
        shortDesc: 'Dispatch PDF invoices, offline retry outbox & WhatsApp',
        seoKey: 'docs-email-whatsapp-extensions',
      },
    ],
  },
  {
    id: 'data-backups',
    name: 'Backups & Safety',
    steps: [
      {
        id: 'backups',
        stepNumber: 15,
        title: 'Saving Backups of Your Data',
        shortDesc: 'Keep copies on a pen drive & move to new PC',
        seoKey: 'docs-backups',
      },
      {
        id: 'security',
        stepNumber: 16,
        title: 'Privacy & Offline Safety',
        shortDesc: 'Your shop data stays 100% on your computer',
        seoKey: 'docs-security',
      },
    ],
  },
  {
    id: 'help-support',
    name: 'Support & Help Center',
    steps: [
      {
        id: 'troubleshooting',
        stepNumber: 17,
        title: 'Support Center & Troubleshooting',
        shortDesc: 'Direct support, database recovery & hardware fixes',
        seoKey: 'docs-troubleshooting',
      },
    ],
  },
];

export const ALL_DOC_STEPS = DOC_CATEGORIES.flatMap((c) => c.steps);

export function DocsPage() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { openDownloadModal } = useDownloadModal();
  const activeOS = detectDeviceOS();

  // Normalize aliases
  const normalizedDocId = useMemo(() => {
    if (!docId) return 'download';
    if (docId === 'system-requirements') return 'system';
    if (docId === 'printer' || docId === 'thermal' || docId === 'printing') return 'thermal-printer';
    if (docId === 'email' || docId === 'smtp') return 'email-setup';
    if (docId === 'notifications') return 'whatsapp';
    if (docId === 'display' || docId === 'screen') return 'pos-display';
    if (docId === 'extensions' || docId === 'marketplace' || docId === 'plugins') return 'extensions-guide';
    if (docId === 'restaurant' || docId === 'kds' || docId === 'dining' || docId === 'qr-menu') return 'restaurant-extension';
    if (docId === 'second-screen' || docId === 'customer-screen') return 'pos-display-extension';
    if (docId === 'dispatch' || docId === 'email-automation') return 'email-whatsapp-extensions';
    if (docId === 'faq' || docId === 'support') return 'troubleshooting';
    if (ALL_DOC_STEPS.some((s) => s.id === docId)) return docId;
    return 'download';
  }, [docId]);

  const [selectedDocId, setSelectedDocId] = useState(normalizedDocId);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(() => ({
    'getting-started': true,
    'printers-receipts': true,
    'counter-hardware': true,
    'customer-messaging': true,
    'extensions-platform': true,
    'data-backups': true,
    'help-support': true,
  }));

  useEffect(() => {
    if (normalizedDocId !== selectedDocId) {
      setSelectedDocId(normalizedDocId);
    }
  }, [normalizedDocId]);

  // Ensure active category is expanded
  useEffect(() => {
    const parentCategory = DOC_CATEGORIES.find((cat) =>
      cat.steps.some((s) => s.id === selectedDocId)
    );
    if (parentCategory) {
      setOpenCategories((prev) => ({
        ...prev,
        [parentCategory.id]: true,
      }));
    }
  }, [selectedDocId]);

  const toggleCategory = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const activeDoc = useMemo(() => {
    return ALL_DOC_STEPS.find((s) => s.id === selectedDocId) || ALL_DOC_STEPS[0];
  }, [selectedDocId]);

  const currentIndex = ALL_DOC_STEPS.findIndex((s) => s.id === activeDoc.id);
  const prevDoc = currentIndex > 0 ? ALL_DOC_STEPS[currentIndex - 1] : null;
  const nextDoc = currentIndex < ALL_DOC_STEPS.length - 1 ? ALL_DOC_STEPS[currentIndex + 1] : null;

  useEffect(() => {
    applySEO(activeDoc.seoKey || 'docs');
    const rightPane = document.getElementById('docs-content-pane');
    if (rightPane) {
      rightPane.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [activeDoc]);

  const handleSelectDoc = (id) => {
    setSelectedDocId(id);
    setMobileMenuOpen(false);
    navigate(`/docs/${id}`);
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return DOC_CATEGORIES;
    const q = searchQuery.toLowerCase();
    return DOC_CATEGORIES.map((cat) => ({
      ...cat,
      steps: cat.steps.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.steps.length > 0);
  }, [searchQuery]);

  const renderDocContent = () => {
    switch (activeDoc.id) {
      case 'download':
        return (
          <>
            <p>
              Invio is a desktop software that you install once onto your shop computer or laptop. It works completely offline without needing internet.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Download for Your Computer
            </h2>
            <p>
              Click the button for the computer you use at your store:
            </p>

            <div className="overflow-x-auto my-3">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-900 font-semibold">
                  <tr>
                    <th className="py-2 px-3">Your Computer</th>
                    <th className="py-2 px-3">File Type</th>
                    <th className="py-2 px-3">Download Link</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-900">
                      <div>Windows (10 or 11)</div>
                      <span className="text-[10px] text-emerald-600 font-semibold block">Official Microsoft Store release</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div>Microsoft Store (Recommended)</div>
                      <div className="text-[10px] text-slate-400">or Standalone Setup (.exe)</div>
                    </td>
                    <td className="py-2.5 px-3 space-y-1">
                      <div>
                        <a
                          href={MICROSOFT_STORE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Get from Microsoft Store</span>
                          <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => openDownloadModal('windows')}
                          className="text-slate-500 hover:text-slate-800 text-[11px] underline cursor-pointer"
                        >
                          Download Standalone .exe
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-900">Apple Mac (MacBook / iMac)</td>
                    <td className="py-2.5 px-3">Disk image (.dmg)</td>
                    <td className="py-2.5 px-3">
                      <button
                        type="button"
                        onClick={() => openDownloadModal('mac')}
                        className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
                      >
                        Download for Mac
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium text-slate-900">Linux PC</td>
                    <td className="py-2.5 px-3">AppImage / .deb</td>
                    <td className="py-2.5 px-3">
                      <button
                        type="button"
                        onClick={() => openDownloadModal('linux')}
                        className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
                      >
                        Download for Linux
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Do I Need Internet to Use Invio?
            </h2>
            <p>
              No. You only need internet once to download the installer. Once installed on your computer, Invio runs 100% offline. You can create bills, scan products, print thermal receipts, and view daily sales reports even if your internet is completely disconnected.
            </p>
          </>
        );

      case 'installation':
        return (
          <>
            <p>
              Installing Invio takes less than 2 minutes. Follow these simple steps for your computer.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Installing on Windows
            </h2>
            <div className="space-y-3 my-2 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-purple-50/70 border border-purple-200/90 rounded-lg">
                <strong className="text-slate-900 block font-semibold mb-1">
                  Option A (Recommended): Install via Microsoft Store
                </strong>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li>Open the official <a href={MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] font-semibold underline">Invio Microsoft Store Listing</a>.</li>
                  <li>Click <strong>&ldquo;Get in Store app&rdquo;</strong> (or <strong>&ldquo;Install&rdquo;</strong>).</li>
                  <li>Windows automatically installs Invio with official Microsoft Store certification. <strong>Zero SmartScreen warnings or firewall risk alerts</strong> will appear.</li>
                  <li>Invio launches immediately and works 100% offline with your private local SQLite database.</li>
                </ol>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-lg">
                <strong className="text-slate-900 block font-semibold mb-1">
                  Option B: Standalone Setup (.exe) Installer
                </strong>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li>Open your <strong>Downloads</strong> folder and double-click the file named <code>Invio-win-x64.exe</code>.</li>
                  <li>
                    <strong>If you see &ldquo;Windows protected your PC&rdquo; (SmartScreen):</strong>
                    <div className="pl-3 py-1 my-1 text-xs text-slate-600 bg-white border border-slate-200 rounded">
                      This is normal for direct .exe downloads from the web. Click <strong>&ldquo;More info&rdquo;</strong> and then click <strong>&ldquo;Run anyway&rdquo;</strong>.
                    </div>
                  </li>
                  <li>The setup will take about 15 seconds. An Invio icon will appear on your desktop, and the app will open ready to use.</li>
                </ol>
              </div>
            </div>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Installing on Apple Mac
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>Open your <strong>Downloads</strong> folder and double-click the file named <code>Invio-1.0.2.dmg</code>.</li>
              <li>A window will open. Drag the purple <strong>Invio</strong> icon into your <strong>Applications</strong> folder.</li>
              <li>Open your Applications folder (or press Cmd + Space and type Invio) and click on Invio to open.</li>
              <li>If your Mac asks &ldquo;Invio was downloaded from the internet. Are you sure you want to open it?&rdquo;, simply click <strong>Open</strong>.</li>
            </ol>
          </>
        );

      case 'system':
        return (
          <>
            <p>
              Invio is lightweight and designed to run smoothly on everyday shop laptops, desktop computers, and billing terminals.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. What Computer Do I Need?
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Windows PC or Laptop:</strong> Any computer running Windows 10 or Windows 11.</li>
              <li><strong>Apple Mac:</strong> Any MacBook, Mac mini, or iMac from the past 10 years.</li>
              <li><strong>Memory (RAM):</strong> 2 GB or 4 GB RAM is plenty. You do not need an expensive or powerful computer.</li>
              <li><strong>Storage Space:</strong> Takes less than 400 MB of space on your hard drive.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Shop Hardware Compatibility
            </h2>
            <p>
              Invio connects with the standard hardware used in Indian and international retail stores:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Thermal Receipt Printers:</strong> Works with both 2-inch (58mm) and 3-inch (80mm) bill printers from brands like TVS, Epson, Everycom, NGX, Citizen, and generic USB printers.</li>
              <li><strong>Barcode Scanners:</strong> Any regular handheld or desktop barcode scanner (just plug into USB).</li>
              <li><strong>Cash Drawers:</strong> Connects to the back of your receipt printer and pops open automatically on Cash sales.</li>
              <li><strong>Second Screen for Customers:</strong> Any extra computer monitor or TV connected with an HDMI or VGA cable.</li>
            </ul>
          </>
        );

      case 'thermal-printer':
        return (
          <>
            <p>
              A thermal receipt printer is the small printer used in supermarkets, medical stores, restaurants, and retail shops. It does not use ink or toner ribbons; it prints using heat onto special roll paper.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. How to Connect Your Printer to Your Computer
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>Plug the power cord into the wall socket and turn on the printer switch.</li>
              <li>Connect the USB cable from the back of the printer into any USB port on your laptop or computer.</li>
              <li>Insert the driver CD that came in the printer box (or download the basic driver from the manufacturer&apos;s website like TVS, Epson, or POS-80) and run the installer.</li>
              <li>Open Invio and go to <strong>Settings &gt; Invoice &amp; Printing</strong>. You will see your printer listed in the dropdown.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Choosing Your Receipt Size (2-inch vs 3-inch)
            </h2>
            <p>
              Look at your printer roll or the label on your printer:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>
                <strong>2-inch Thermal (58mm):</strong> The narrow roll used in grocery stores, cafes, and small shops. In Invio, select <strong>2&rdquo; Thermal (58mm)</strong>.
              </li>
              <li>
                <strong>3-inch Thermal (80mm):</strong> The wider roll used in large retail stores and restaurants. It displays item names, quantity, price, tax breakdown, and a clear UPI payment QR code side-by-side. In Invio, select <strong>3&rdquo; Thermal (80mm)</strong>.
              </li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Turning on Auto-Print (No Extra Clicking)
            </h2>
            <p>
              Normally, a computer opens a popup asking you to confirm printing every time. In a busy shop, you want the bill to print instantly the moment you save it:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Go to <strong>Settings &gt; Invoice &amp; Printing</strong>.</li>
              <li>Turn ON the switch called <strong>Silent Printing (Auto-Print)</strong>.</li>
              <li>Select your receipt printer from the dropdown.</li>
              <li>Now, whenever you finish a bill and hit <strong>Enter</strong> or <strong>Save</strong>, the bill prints immediately in less than 1 second.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. Putting Your Shop Name and UPI QR on the Bill
            </h2>
            <p>
              Under <strong>Settings &gt; Business Profile</strong> and <strong>Settings &gt; Invoice</strong>, you can configure:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Shop Name &amp; Phone:</strong> Printed boldly at the very top of the receipt.</li>
              <li><strong>Shop Logo:</strong> Prints your shop&apos;s logo at the top.</li>
              <li><strong>Dynamic UPI QR Code:</strong> Prints a QR code on the receipt with the exact bill total so customers can pay directly with PhonePe, Google Pay, or Paytm.</li>
              <li><strong>Footer Message:</strong> A polite note at the bottom (e.g. <em>&ldquo;Thank you for shopping with us! Goods once sold cannot be returned.&rdquo;</em>).</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              5. Quick Fix: Why is My Printer Spitting Blank Paper?
            </h2>
            <p>
              Thermal paper only has heat-sensitive coating on <strong>one side</strong>. If your printer feeds paper but nothing shows up, open the printer lid, take the paper roll out, flip it upside down so the paper feeds from the other side, and close the lid. It will start printing clearly.
            </p>
          </>
        );

      case 'standard-printer':
        return (
          <>
            <p>
              If your business issues formal full-page A4 bills (for wholesale, distributors, corporate clients, or delivery challans), you can use any regular office laser or inkjet printer.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. How to Switch to A4 Bills
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Open Invio and go to <strong>Settings &gt; Invoice &amp; Printing</strong>.</li>
              <li>Under Paper Size, select <strong>Standard A4</strong>.</li>
              <li>All invoices will now be formatted as standard full-page A4 sheets with two copies (Original for Buyer, Duplicate for Seller).</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. What Shows on the Full-Page A4 Bill?
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Your shop or company name, full address, GSTIN, and contact details.</li>
              <li>Customer name, billing address, phone number, and GSTIN (if a B2B business).</li>
              <li>Complete item table with HSN codes, quantity, price, discount, CGST, SGST, IGST, and total.</li>
              <li>Bank account details (Account number, IFSC code, Branch) so clients can pay via NEFT/RTGS.</li>
              <li>Signatory block where you can sign or stamp the invoice.</li>
            </ul>
          </>
        );

      case 'quickstart':
        return (
          <>
            <p>
              Here is how to set up your shop and make your first bill in less than 2 minutes.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Step 1: Put Your Shop Details
            </h2>
            <p>
              Go to <strong>Settings &gt; Business Profile</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Enter your <strong>Store Name</strong> (e.g. <em>Sharma General Store</em>).</li>
              <li>Enter your <strong>Address</strong> and <strong>Phone Number</strong>.</li>
              <li>If you have a GST number, enter it in the <strong>GSTIN</strong> field. If not, leave it blank.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Step 2: Add Your UPI ID (Scan &amp; Pay QR)
            </h2>
            <p>
              Under <strong>Settings &gt; Payments &amp; Bank</strong>, type your UPI ID (like <code>yourstore@upi</code> or your Google Pay / PhonePe merchant ID).
            </p>
            <p>
              Invio will automatically generate a payment QR code on every receipt with the exact bill amount so customers can scan and pay without typing.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Step 3: Add Your Products
            </h2>
            <p>
              Click <strong>Products &gt; Add Item</strong> on the left menu. Enter the product name, barcode (optional), selling price, and tax rate. You can also click <strong>Import CSV</strong> if you already have a product list in an Excel file.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Step 4: Making a Sale
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Press the <strong>F2</strong> key on your keyboard or click <strong>New Sale</strong>.</li>
              <li>Scan the product with your barcode scanner or start typing the product name.</li>
              <li>Choose how the customer is paying: <strong>Cash</strong>, <strong>UPI</strong>, or <strong>Card</strong>.</li>
              <li>Hit <strong>Enter</strong> or click <strong>Print</strong>. Your receipt prints immediately!</li>
            </ol>
          </>
        );

      case 'barcode-hardware':
        return (
          <>
            <p>
              Using a barcode scanner and an automated cash drawer speeds up your billing counter and prevents typing mistakes.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. How to Connect a Barcode Scanner
            </h2>
            <p>
              You do not need any special software or drivers to use a barcode scanner:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Plug your scanner&apos;s USB cable into any USB slot on your computer.</li>
              <li>Your computer will make a chime sound. The scanner is ready immediately.</li>
              <li>Open Invio&apos;s <strong>New Sale</strong> screen. Point the red laser at any product barcode and pull the trigger.</li>
              <li>The item will appear in your billing cart instantly.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. How to Connect an Automatic Cash Drawer
            </h2>
            <p>
              Cash drawers do not plug directly into your laptop. Instead, they plug into the back of your receipt printer:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Take the telephone-style cable (RJ11/RJ12 cable) that comes with the cash drawer.</li>
              <li>Plug one end into the bottom of the cash drawer, and the other end into the small port with a drawer icon on the back of your thermal receipt printer.</li>
              <li>That&apos;s it! Whenever you finish a bill with <strong>Cash</strong>, Invio sends an electronic pulse to the printer, and the cash drawer will pop open automatically.</li>
            </ol>
          </>
        );

      case 'pos-display':
        return (
          <>
            <p>
              A Customer Display is a second screen placed on your billing counter facing the customer. It builds customer trust and lets customers pay quickly by scanning a large UPI QR code.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. What Does the Customer Screen Show?
            </h2>
            <p>
              While you are billing on your laptop, the customer sees:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Your shop name and welcoming logo.</li>
              <li>Each product as you scan it, including quantity and price.</li>
              <li>Discounts applied and the total amount due.</li>
              <li>A large, easy-to-scan <strong>UPI QR Code</strong> so the customer can scan with Google Pay, PhonePe, or Paytm while you are packaging the items.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. How to Set Up the Second Screen
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>Take any second monitor (or even a small TV) and plug its HDMI or VGA cable into your computer.</li>
              <li>On your Windows computer, press <strong>Windows Key + P</strong> and choose <strong>Extend</strong>. This turns the second screen into an extra display.</li>
              <li>Open Invio and go to <strong>Settings &gt; Customer Display</strong>.</li>
              <li>Click on the monitor number for the second screen.</li>
              <li>Invio will immediately launch the customer-facing screen on that monitor. You can continue billing normally on your own laptop screen!</li>
            </ol>
          </>
        );

      case 'whatsapp':
        return (
          <>
            <p>
              Many customers prefer receiving their bills on WhatsApp instead of paper receipts. Invio lets you send bills on WhatsApp completely free with no third-party subscription charges.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. How to Send a Bill on WhatsApp
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>While creating a bill or viewing any saved invoice in Invio, enter the customer&apos;s phone number.</li>
              <li>Click the green <strong>WhatsApp</strong> button on the invoice.</li>
              <li>Invio automatically opens WhatsApp (either WhatsApp Web in your browser or your WhatsApp Desktop app).</li>
              <li>A complete message is already pre-typed for you with your shop name, invoice number, items list, total amount, and your UPI payment details.</li>
              <li>Simply press <strong>Send</strong> in WhatsApp. Done!</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Is There Any Fee or Monthly Charge for WhatsApp?
            </h2>
            <p>
              No! Unlike other billing software that charges per SMS or per WhatsApp message through third-party APIs, Invio opens WhatsApp directly from your own computer. You can send unlimited bills without paying any messaging fees.
            </p>
          </>
        );

      case 'email-setup':
        return (
          <>
            <p>
              You can send invoices directly to your customers&apos; email inbox with a professional PDF bill attached.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Option A: One-Click Gmail Connection (Easiest &amp; Recommended)
            </h2>
            <p>
              If you have a Gmail or Google Workspace address, this takes 30 seconds:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Open Invio and go to <strong>Settings &gt; Notifications</strong>.</li>
              <li>Click the button that says <strong>Connect with Google</strong>.</li>
              <li>A window will open in your browser asking you to sign in to your Google account and grant permission for Invio to send invoice emails.</li>
              <li>Click <strong>Allow</strong>. The screen will turn green and say <strong>Connected</strong>. You are all set!</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              Option B: Using Your Email with an App Password
            </h2>
            <p>
              For security, email providers like Google, Microsoft, and Yahoo require an <strong>App Password</strong> (a special 16-letter code) instead of your regular email password when sending emails through software:
            </p>

            <p className="font-semibold text-slate-900 pt-1">
              How to create your Google App Password:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>
                Click this direct link to open Google&apos;s security page:{' '}
                <a
                  href="https://myaccount.google.com/apppasswords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7C3AED] underline font-bold"
                >
                  https://myaccount.google.com/apppasswords
                </a>
              </li>
              <li>Sign in to your Google account if asked. (Note: Make sure 2-Step Verification is turned on in your Google account).</li>
              <li>In the box that says &ldquo;App name&rdquo;, type <strong>Invio</strong> and click <strong>Create</strong>.</li>
              <li>Google will show a yellow box with a 16-letter password (e.g. <code>abcd efgh ijkl mnop</code>). Copy this password.</li>
              <li>In Invio under <strong>Settings &gt; Notifications</strong>, select <strong>Custom SMTP</strong>. Enter your email and paste this 16-letter password into the <strong>Password</strong> field.</li>
              <li>Click <strong>Test Connection</strong>. You will receive a test email confirming it works!</li>
            </ol>
          </>
        );

      case 'extensions-guide':
        return (
          <>
            <p>
              The Invio Extension Platform brings modular power to your billing counter. Rather than bloating the core app, specialized capabilities (like restaurant table ordering, dual-screen customer displays, and automated messaging) are packaged as lightweight, cryptographically verified extensions.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Opening the Extension Manager
            </h2>
            <p>
              In Invio Desktop, click the <strong>🧩 Extensions</strong> icon located on the left-hand navigation sidebar. You will see two primary views:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Store Catalog:</strong> Browse official, certified extensions available from the Timrio Extension Registry.</li>
              <li><strong>Installed Extensions:</strong> View, toggle on/off, and configure settings for extensions currently stored on your computer.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. 1-Click Installation &amp; Cryptographic Verification
            </h2>
            <p>
              Installing an extension is instant and safe:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Click <strong>&ldquo;Install&rdquo;</strong> on any extension card in the Store view.</li>
              <li>Invio streams the lightweight package with real-time download progress and speed metrics.</li>
              <li>Before any code is extracted, Invio verifies the SHA-256 integrity hash and confirms the author&apos;s Ed25519 digital signature (<code>timrio-ext-prod-2026</code>). Any tampered or unsigned package is rejected automatically.</li>
              <li>The package is extracted into your local extensions sandbox.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Enabling, Disabling &amp; Modular Styles
            </h2>
            <p>
              Each extension has an independent toggle switch:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>When you toggle an extension <strong>Enabled</strong>, its dedicated stylesheet is dynamically mounted and its navigation buttons appear in Invio.</li>
              <li>When you toggle an extension <strong>Disabled</strong>, its stylesheet and hooks are cleanly unmounted from memory without requiring an app restart.</li>
              <li>You can uninstall extensions at any time to free up disk space.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. 100% Offline-First Architecture
            </h2>
            <p>
              Installed extensions operate 100% locally from your computer&apos;s disk and communicate directly with your local SQLite database. Even if your store loses internet connection completely, your enabled extensions continue running without interruption.
            </p>
          </>
        );

      case 'restaurant-extension':
        return (
          <>
            <p>
              The Restaurant &amp; QR Ordering extension transforms Invio into a full restaurant Point-of-Sale (POS) with table management, touchless diner QR ordering over local Wi-Fi, and a live Kitchen Display System (KDS).
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Setting Up Tables &amp; Dining Areas
            </h2>
            <p>
              Once installed and enabled from the Extensions store, open the <strong>Restaurant POS</strong> section:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Navigate to <strong>Restaurant POS &gt; Settings</strong>.</li>
              <li>Set your total table count (e.g. 1 to 30 tables) and configure dining areas such as <em>Main Hall</em>, <em>AC Dining</em>, or <em>Outdoor Patio</em>.</li>
              <li>Each table displays real-time occupancy status: <strong>Vacant</strong> (green), <strong>Occupied / Dining</strong> (amber), or <strong>Bill Requested</strong> (blue).</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Dine-In QR Stand &amp; Mobile Wi-Fi Ordering
            </h2>
            <p>
              Eliminate paper menu printing and order miscommunications:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Click <strong>&ldquo;Export Table QR Stand&rdquo;</strong> to print high-resolution SVG acrylic standee inserts for your dining tables.</li>
              <li>Guests scan the QR code using any smartphone camera—no app download or customer registration required.</li>
              <li>The customer browses your visual menu, selects portion sizes, adds notes (e.g., <em>&ldquo;medium spicy&rdquo;</em>), and places the order directly over your local Wi-Fi.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Live Kitchen Display System (KDS)
            </h2>
            <p>
              Keep your kitchen cooks coordinated without yelling across the counter:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Open the <strong>Kitchen Display</strong> view on a kitchen tablet or monitor.</li>
              <li>New customer orders pop up instantly with an audible chime, displaying table number, item list, and special cooking notes.</li>
              <li>Live preparation timers track elapsed cooking time. Chefs tap to transition orders: <strong>Queued &rarr; Cooking &rarr; Ready to Serve</strong>.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. 1-Click Bill Settlement &amp; GST Invoicing
            </h2>
            <p>
              When guests ask for their bill, tap their table card on your Invio counter screen and click <strong>&ldquo;Convert to GST Bill&rdquo;</strong>. All ordered items, quantities, and GST rates are instantly transferred into the Invio billing checkout. Accept Cash, Card, or UPI, print your 3-inch thermal receipt, and the table resets to Vacant automatically!
            </p>
          </>
        );

      case 'pos-display-extension':
        return (
          <>
            <p>
              The Dual-Screen POS Customer Display extension connects a customer-facing monitor to your billing counter. It builds shopper confidence with a live cart mirror and speeds up checkout with dynamic on-screen UPI QR codes.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Connecting Your Second Monitor
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Plug any secondary monitor or small TV into your billing laptop or PC using HDMI or VGA.</li>
              <li>On Windows, press <strong>Windows Key + P</strong> and choose <strong>&ldquo;Extend&rdquo;</strong>. On Mac, go to <em>System Settings &gt; Displays</em> and select <em>&ldquo;Extended Display&rdquo;</em>.</li>
              <li>In Invio, go to <strong>Extensions &gt; Dual-Screen POS Display</strong>. Select the second display number and click <strong>&ldquo;Launch Customer Display&rdquo;</strong>.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Real-Time Cart Mirroring (&lt;16ms Latency)
            </h2>
            <p>
              As the cashier scans items with a barcode scanner or types products into Invio, the customer display mirrors the shopping cart in real time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Clear item names, quantities, and individual prices.</li>
              <li>Applied discounts, tax breakdowns, and final payable total.</li>
              <li>Zero cashier latency—updates happen instantaneously over local IPC.</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Dynamic On-Screen UPI QR Code
            </h2>
            <p>
              When you advance to the payment step, the customer screen renders a high-contrast UPI QR code encoded with your store VPA and the exact bill amount. Customers can scan immediately using Google Pay, PhonePe, Paytm, or BHIM while you bag their merchandise.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. Custom Store Branding &amp; Welcome Wallpaper
            </h2>
            <p>
              When no cart is actively being scanned, the screen displays your shop logo, store contact details, and custom promotional banners or seasonal greetings.
            </p>
          </>
        );

      case 'email-whatsapp-extensions':
        return (
          <>
            <p>
              The Automated Email &amp; WhatsApp Invoicing extensions streamline customer receipt delivery. Send professional GST tax invoice PDFs directly to customer email inboxes and share instant bill summaries on WhatsApp with zero manual typing.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Connecting Your Email Account
            </h2>
            <p>
              Open <strong>Extensions &gt; Email Dispatch</strong> to configure your sender details:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Gmail OAuth (Recommended):</strong> Click <em>&ldquo;Sign in with Google&rdquo;</em> for 1-click authorized connection without managing app passwords.</li>
              <li><strong>Custom SMTP:</strong> Enter your custom business email server (Zoho, Outlook, or cPanel SMTP). Passwords are encrypted inside the OS hardware keychain (Windows Credential Manager / macOS Keychain).</li>
            </ul>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Automatic &amp; Manual PDF Invoice Emailing
            </h2>
            <p>
              Choose your preferred dispatch workflow:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li><strong>Auto-Send on Checkout:</strong> Check <em>&ldquo;Auto-send email when billing&rdquo;</em>. Whenever you enter a customer email at checkout, Invio attaches the rendered PDF invoice and sends it automatically upon bill completion.</li>
              <li><strong>Manual Send:</strong> From <strong>Invoices History</strong>, click the <em>&ldquo;Email&rdquo;</em> button on any invoice to deliver a copy anytime.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Resilient Offline Outbox Queue
            </h2>
            <p>
              If your store internet drops, invoices are never lost. Invio automatically queues outgoing messages in a secure, local offline outbox. As soon as your internet connectivity returns, queued emails are dispatched in the background with automatic retry backoff.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. 1-Click WhatsApp Invoicing
            </h2>
            <p>
              To send invoices via WhatsApp:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Click the <strong>WhatsApp</strong> button on any completed invoice.</li>
              <li>Invio automatically formats a polite message with your store name, invoice number, itemized summary, total paid, and balance due.</li>
              <li>Opens directly into WhatsApp Web or the WhatsApp Desktop application without needing to save the customer&apos;s phone number to your contact list.</li>
            </ul>
          </>
        );

      case 'backups':
        return (
          <>
            <p>
              All your invoices, customers, and inventory data are stored safely on your own computer. Here is how to keep safe copies so you never lose your data.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. How to Save a Backup to a Pen Drive
            </h2>
            <p>
              We recommend saving a backup once a week onto a USB pen drive:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Plug your USB pen drive into your laptop.</li>
              <li>In Invio, go to <strong>Settings &gt; Database &amp; Backup</strong>.</li>
              <li>Click the button that says <strong>Export Backup</strong>.</li>
              <li>Choose your pen drive folder and click <strong>Save</strong>.</li>
              <li>Invio will save a single file (like <code>invio_backup_2026.invio</code>). Your entire store history is safe!</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Moving Your Store to a New Laptop
            </h2>
            <p>
              If you buy a new computer for your store:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Install Invio on the new computer.</li>
              <li>Plug your pen drive into the new computer.</li>
              <li>Open Invio, go to <strong>Settings &gt; Database &amp; Backup</strong>, and click <strong>Import Backup</strong>.</li>
              <li>Select your backup file from the pen drive. All your products, customers, and previous bills will appear on the new laptop in seconds!</li>
            </ol>
          </>
        );

      case 'security':
        return (
          <>
            <p>
              Unlike cloud billing software that uploads your customer phone numbers and sales data to external servers, Invio is built privacy-first.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Who Can See My Store Data?
            </h2>
            <p>
              Only you! Your sales figures, product profit margins, customer phone numbers, and invoice history are stored inside your computer&apos;s hard drive. Timrio does not copy, track, inspect, or sell your customer list or sales records.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Safe Credential Protection
            </h2>
            <p>
              If you connect your email to send invoice PDFs, your email password or token is locked inside Windows Credential Manager or Apple Mac Keychain using bank-grade hardware encryption. It is never stored in plain text.
            </p>
          </>
        );

      case 'troubleshooting':
      default:
        return (
          <>
            <p>
              Here are direct solutions and answers for setup, hardware connectivity, database management, and support requests.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. Direct Technical Support Channel
            </h2>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 my-2">
              <p className="text-xs text-slate-700 leading-relaxed mb-2">
                Need personalized help setting up Invio, connecting hardware, or migrating data? Reach our engineering team directly:
              </p>
              <p className="font-mono text-xs">
                Email:{' '}
                <a href="mailto:support@timrio.com" className="text-[#7C3AED] underline font-semibold">
                  support@timrio.com
                </a>
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Hours: Monday – Friday, 9:00 AM – 6:00 PM IST • Response within 24 business hours.
              </p>
            </div>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Backing Up or Transferring Your Invoice Database
            </h2>
            <p>
              In Invio, open <strong>Settings &gt; Database</strong> and click <strong>&ldquo;Export SQLite Backup&rdquo;</strong>. Save the file to an external USB flash drive or backup folder. To restore on a new computer, install Invio, open <strong>Settings &gt; Database</strong>, and select <strong>&ldquo;Import Backup&rdquo;</strong>. Your complete billing history is restored instantly.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Thermal Receipt Printer Stops or Prints Misaligned Lines
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Ensure the printer power cord is plugged in and the green power LED is lit.</li>
              <li>Unplug the USB cable from your computer, wait 5 seconds, and plug it back into the same port.</li>
              <li>Confirm your paper roll width in <strong>Settings &gt; Invoice &amp; Printing</strong> (58mm vs 80mm).</li>
              <li>Open the printer paper compartment and ensure the paper roll is inserted thermal-side up.</li>
              <li>Click <strong>Test Print</strong> in Invio settings to verify communication with the printer.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              4. Windows Antivirus / SmartScreen Warning on Install
            </h2>
            <p>
              To completely bypass Windows Defender SmartScreen and firewall risk alerts, install Invio directly from the <a href={MICROSOFT_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] underline font-semibold">official Microsoft Store</a>. Because it is digitally certified by Microsoft, Windows trusts it automatically.
            </p>
            <p className="mt-2">
              If you downloaded the standalone <code>.exe</code> installer, Windows Defender may show a &ldquo;Windows protected your PC&rdquo; banner because the file was downloaded directly from the web. Invio is completely secure, runs 100% offline, and contains zero tracking or telemetry. Simply click <strong>&ldquo;More info&rdquo;</strong> and then click <strong>&ldquo;Run anyway&rdquo;</strong>.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              5. Email Dispatch Authorization Error
            </h2>
            <p>
              When connecting Gmail, ensure your Google account permits desktop application authorization. Alternatively, when configuring custom SMTP, generate an App Password from your email provider account settings and enter it into <strong>Settings &gt; Email</strong>.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              6. Running Multiple Counters in the Same Store
            </h2>
            <p>
              While Invio uses embedded SQLite by default for single-counter setups, it includes an optional multi-terminal PostgreSQL database mode under <strong>Settings &gt; Advanced Database</strong>. You can host PostgreSQL on your main counter PC and connect secondary counter terminals over your shop local Wi-Fi or LAN.
            </p>
          </>
        );
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] mt-16 bg-white flex overflow-hidden print:mt-0 print:h-auto print:overflow-visible print:block">
      {/* Mobile Selector Header (< 1024px) */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between no-print print:hidden">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Doc:</span>
          <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">{activeDoc.title}</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="docs-navigation"
          className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{mobileMenuOpen ? 'Close Menu' : `Guides (${ALL_DOC_STEPS.length})`}</span>
          <ChevronDownIcon className={`size-3 text-slate-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Left Fixed Sidebar (Dropdown Menus & Submenus) */}
      <aside
        id="docs-navigation"
        className={`w-full lg:w-64 xl:w-72 lg:h-full border-r border-slate-200 bg-white flex flex-col shrink-0 z-20 transition-all duration-200 no-print print:hidden ${
          mobileMenuOpen ? 'fixed inset-x-0 top-[112px] bottom-0 h-[calc(100dvh-112px)] w-full bg-white block' : 'hidden lg:flex'
        }`}
      >
        {/* Search Header */}
        <div className="h-12 px-3 bg-white border-b border-slate-100 shrink-0 flex items-center">
          <label htmlFor="docs-search-input" className="sr-only">Search Documentation</label>
          <div className="flex items-center gap-2 w-full">
            <SearchIcon className="size-3.5 text-slate-400 shrink-0 pointer-events-none" />
            <input
              id="docs-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full bg-transparent text-xs font-medium text-slate-900 placeholder:text-slate-400 border-0 outline-none ring-0 focus:outline-none focus:ring-0 p-0 shadow-none"
            />
          </div>
        </div>

        {/* Documentation Tree */}
        <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1.5">
          {filteredCategories.length === 0 && (
            <p role="status" className="text-xs text-slate-400 text-center px-4 py-8">
              No guides found for “{searchQuery.trim()}”.
            </p>
          )}

          {filteredCategories.map((category) => {
            const isOpen = searchQuery.trim() ? true : !!openCategories[category.id];

            return (
              <div key={category.id} className="select-none">
                {/* Menu Header Button with Dropdown Chevron */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-950 transition-colors cursor-pointer group"
                >
                  <span className="truncate">{category.name}</span>
                  <ChevronDownIcon
                    className={`size-3 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>

                {/* Submenu List */}
                {isOpen && (
                  <div className="ml-3 pl-1 flex flex-col gap-0.5 mt-0.5 mb-1.5">
                    {category.steps.map((step) => {
                      const isSelected = selectedDocId === step.id;

                      return (
                        <button
                          key={step.id}
                          type="button"
                          onClick={() => handleSelectDoc(step.id)}
                          aria-current={isSelected ? 'page' : undefined}
                          className={`w-full text-left px-2 py-1.5 transition-colors flex items-center gap-1.5 text-xs cursor-pointer ${
                            isSelected
                              ? 'text-[#7C3AED] font-semibold'
                              : 'text-slate-600 hover:text-slate-950 font-normal'
                          }`}
                        >
                          <span
                            className={`font-mono text-[10px] w-3 shrink-0 ${
                              isSelected ? 'text-[#7C3AED] font-bold' : 'text-slate-400'
                            }`}
                          >
                            {step.stepNumber}.
                          </span>
                          <span className="truncate">{step.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium text-[11px]">Invio Offline App</span>
            <button
              type="button"
              onClick={() => openDownloadModal(activeOS)}
              className="text-[#7C3AED] hover:underline font-semibold text-[11px] cursor-pointer"
            >
              Download →
            </button>
          </div>
        </div>
      </aside>

      {/* Right Workspace Area (Clean Markdown Document View, No Card Background, No Dividers) */}
      <main
        id="docs-content-pane"
        className="flex-1 h-full overflow-y-auto bg-white pt-12 lg:pt-0 print:pt-0 print:overflow-visible print:block print:w-full print:h-auto"
      >
        <div className="max-w-[780px] w-full mx-auto px-4 sm:px-6 pt-6 pb-12 sm:pt-8 sm:pb-16">
          <A4DocLayout
            title={activeDoc.title}
            subtitle={`Invio Documentation • Simple Store Owner Guide • Published by Timrio`}
          >
            {renderDocContent()}
          </A4DocLayout>

          {/* Step Progression (Start-to-End Footer without dividers) */}
          <div className="mt-10 pt-4 flex items-center justify-between text-xs gap-3">
            {prevDoc ? (
              <button
                type="button"
                onClick={() => handleSelectDoc(prevDoc.id)}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-[#7C3AED] font-medium transition-colors cursor-pointer"
              >
                ← Previous: {prevDoc.title}
              </button>
            ) : (
              <div />
            )}

            {nextDoc ? (
              <button
                type="button"
                onClick={() => handleSelectDoc(nextDoc.id)}
                className="inline-flex items-center gap-1 text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors cursor-pointer ml-auto"
              >
                Next: {nextDoc.title} →
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DocsPage;
