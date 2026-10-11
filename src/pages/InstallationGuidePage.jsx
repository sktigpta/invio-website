import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { WindowsIcon, AppleIcon } from '../components/Icons';

export function InstallationGuidePage() {
  useEffect(() => {
    applySEO('docs-installation');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Documentation"
      title="Invio Installation &amp; Setup Guide"
      subtitle="Follow this guide to download, install, verify, and configure Invio on your computer. Setup takes less than 3 minutes."
    >
      <div className="space-y-5 my-8">
        {/* Windows Section */}
        <section className="p-5 rounded-2xl border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <WindowsIcon className="size-5 text-[#0078D7]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Installing on Windows (10 &amp; 11)</h2>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-decimal pl-4">
            <li>
              Download the latest Windows installer (<code>Invio-Setup-1.0.2.exe</code>) from our <Link to="/download" className="text-[#8646F4] underline">Download page</Link>.
            </li>
            <li>
              Open your Downloads folder and double-click the setup file.
            </li>
            <li>
              <strong>Windows SmartScreen notice:</strong> Because Invio is an independently distributed executable, SmartScreen may display a prompt saying &ldquo;Windows protected your PC&rdquo;. Click <strong>&ldquo;More info&rdquo;</strong> (underlined text) and then click <strong>&ldquo;Run anyway&rdquo;</strong>.
            </li>
            <li>
              The installer will copy the application files, place a shortcut on your Desktop, and launch Invio automatically.
            </li>
          </ol>
        </section>

        {/* macOS Section */}
        <section className="p-5 rounded-2xl border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <AppleIcon className="size-5 text-slate-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Installing on macOS (Apple Silicon &amp; Intel)</h2>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-decimal pl-4">
            <li>
              Download the macOS disk image (<code>Invio-1.0.2.dmg</code>) from our <Link to="/download" className="text-[#8646F4] underline">Download page</Link>.
            </li>
            <li>
              Double-click the downloaded <code>.dmg</code> file to mount it.
            </li>
            <li>
              Drag the Invio application icon into your <strong>Applications</strong> folder shortcut inside the window.
            </li>
            <li>
              <strong>First Launch &amp; Gatekeeper:</strong> Launch Invio from Applications or Spotlight. If macOS prompts &ldquo;Invio is an app downloaded from the internet. Are you sure you want to open it?&rdquo;, click <strong>&ldquo;Open&rdquo;</strong>.
            </li>
          </ol>
        </section>

        {/* First-Run Configuration */}
        <section className="p-5 rounded-2xl border border-slate-200/90 bg-white">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">3. First-Run Setup &amp; Configuration</h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>Business Profile:</strong> Open Settings &gt; Business Profile. Enter your Store Name, Address, GSTIN / Tax ID, Phone Number, and upload your Store Logo.
            </p>
            <p>
              <strong>Payment Details:</strong> Enter your Bank Account Number, IFSC code, and UPI ID (VPA). Your UPI ID will automatically generate scannable payment QR codes on all printed receipts.
            </p>
            <p>
              <strong>Printer Format:</strong> Under Settings &gt; Printing, select between <strong>A4 Full Page</strong>, <strong>A5 Compact</strong>, or <strong>58mm/80mm Thermal Receipt</strong>.
            </p>
            <p>
              <strong>Products &amp; Inventory:</strong> Navigate to Products &gt; Add Item to populate your catalogue, or use the Import CSV button to load your entire inventory at once.
            </p>
          </div>
        </section>

        {/* Database Storage Location */}
        <section className="p-5 rounded-2xl border border-slate-200/90 bg-white">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Database Storage Location</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            Invio stores your local SQLite database entirely on your local machine:
          </p>
          <div className="space-y-1.5 text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p><strong>Windows:</strong> %APPDATA%\invio\invio.sqlite</p>
            <p><strong>macOS:</strong> ~/Library/Application Support/invio/invio.sqlite</p>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link to="/system-requirements" className="font-semibold text-[#8646F4] hover:underline">
          ← Check system requirements
        </Link>
        <Link to="/download" className="font-semibold text-[#8646F4] hover:underline">
          Go to download page →
        </Link>
      </div>
    </PageContainer>
  );
}

export default InstallationGuidePage;
