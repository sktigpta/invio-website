import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { A4DocLayout } from '../components/A4DocLayout';
import { applySEO } from '../utils/seoHelper';
import { detectDeviceOS } from '../utils/osDetector';
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
        seoKey: 'docs-printing',
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
        seoKey: 'docs-quickstart',
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
        seoKey: 'docs-email',
      },
    ],
  },
  {
    id: 'data-backups',
    name: 'Backups & Safety',
    steps: [
      {
        id: 'backups',
        stepNumber: 11,
        title: 'Saving Backups of Your Data',
        shortDesc: 'Keep copies on a pen drive & move to new PC',
        seoKey: 'docs-backups',
      },
      {
        id: 'security',
        stepNumber: 12,
        title: 'Privacy & Offline Safety',
        shortDesc: 'Your shop data stays 100% on your computer',
        seoKey: 'docs-security',
      },
    ],
  },
  {
    id: 'help-support',
    name: 'Help & Questions',
    steps: [
      {
        id: 'troubleshooting',
        stepNumber: 13,
        title: 'Common Questions & Support',
        shortDesc: 'Quick fixes and direct email assistance',
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
                    <td className="py-2 px-3 font-medium text-slate-900">Windows (10 or 11)</td>
                    <td className="py-2 px-3">Setup file (.exe)</td>
                    <td className="py-2 px-3">
                      <button
                        type="button"
                        onClick={() => openDownloadModal('windows')}
                        className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
                      >
                        Download for Windows
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-slate-900">Apple Mac (MacBook / iMac)</td>
                    <td className="py-2 px-3">Disk image (.dmg)</td>
                    <td className="py-2 px-3">
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
                    <td className="py-2 px-3 font-medium text-slate-900">Linux PC</td>
                    <td className="py-2 px-3">AppImage / .deb</td>
                    <td className="py-2 px-3">
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
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
              <li>Open your computer&apos;s <strong>Downloads</strong> folder and double-click the file named <code>Invio-1.0.2-win-x64.exe</code>.</li>
              <li>
                <strong>If you see a blue screen saying &ldquo;Windows protected your PC&rdquo;:</strong>
                <div className="pl-3 py-1.5 my-1.5 text-xs text-slate-600 bg-slate-50 rounded">
                  Don&apos;t worry! This is normal for newly released desktop apps. Just click the underlined link that says <strong>&ldquo;More info&rdquo;</strong>, and then click the button that says <strong>&ldquo;Run anyway&rdquo;</strong>.
                </div>
              </li>
              <li>The setup will take about 15 seconds. An Invio icon will appear on your desktop, and the app will open ready to use.</li>
            </ol>

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
              For security, email providers like Google, Yahoo, and Zoho require an <strong>App Password</strong> (a special 16-letter code) instead of your regular email password when sending emails through software:
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
              Here are quick answers and solutions for the most common questions.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              1. My Receipt Printer Stopped Printing
            </h2>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
              <li>Check that the printer power cord is plugged in and the green power light is on.</li>
              <li>Unplug the USB cable from your computer, wait 5 seconds, and plug it back into the same USB slot.</li>
              <li>Open the printer paper compartment and check if the paper roll is empty.</li>
              <li>In Invio, go to <strong>Settings &gt; Invoice &amp; Printing</strong> and click <strong>Test Print</strong>.</li>
            </ol>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              2. Windows Antivirus Showed a Warning
            </h2>
            <p>
              Because Invio is an independently distributed offline software, Windows Defender may occasionally show a popup on first download. Invio contains zero spyware or adware. Simply click <strong>&ldquo;More info&rdquo;</strong> and then <strong>&ldquo;Run anyway&rdquo;</strong>.
            </p>

            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
              3. Need Personal Help from Our Team?
            </h2>
            <p>
              Our support team is happy to assist you:
            </p>
            <p className="font-mono text-xs pt-1">
              Email:{' '}
              <a href="mailto:support@timrio.com" className="text-[#7C3AED] underline font-semibold">
                support@timrio.com
              </a>
            </p>
            <p className="text-[11px] text-slate-500">
              Hours: Monday to Friday • Every message is answered within 24 hours.
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
