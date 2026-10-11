import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { WindowsIcon, AppleIcon, LinuxIcon } from '../components/Icons';
import { useDownloadModal } from '../context/DownloadModalContext';

export function InstallationGuidePage() {
  const { openDownloadModal } = useDownloadModal();

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
        <section className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <WindowsIcon className="size-5 text-[#0078D7]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. Installing on Windows (10 &amp; 11)</h2>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-decimal pl-4">
            <li>
              Download the latest Windows installer (<code>Invio-Setup-1.0.2.exe</code>) via <button type="button" onClick={() => openDownloadModal('windows')} className="text-[#7C3AED] underline font-medium cursor-pointer">direct download</button>.
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
        <section className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <AppleIcon className="size-5 text-slate-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. Installing on macOS (Apple Silicon &amp; Intel)</h2>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-decimal pl-4">
            <li>
              Download the macOS disk image (<code>Invio-1.0.2.dmg</code>) via <button type="button" onClick={() => openDownloadModal('mac')} className="text-[#7C3AED] underline font-medium cursor-pointer">direct download</button>.
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

        {/* Linux Section */}
        <section className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <LinuxIcon className="size-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. Installing on Linux (Ubuntu, Debian, Fedora, Arch)</h2>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed list-decimal pl-4">
            <li>
              Download the Linux package (<button type="button" onClick={() => openDownloadModal('linux')} className="text-[#7C3AED] underline font-medium cursor-pointer">AppImage or .deb</button>).
            </li>
            <li>
              <strong>AppImage:</strong> Open terminal, make it executable with <code>chmod +x Invio-*.AppImage</code>, and double-click to run.
            </li>
            <li>
              <strong>Debian / Ubuntu:</strong> Install via terminal using <code>sudo dpkg -i Invio-*.deb</code> or right-click and open with Software Install.
            </li>
          </ol>
        </section>

        {/* First-Run Configuration */}
        <section className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">4. First-Run Setup &amp; Configuration</h2>
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
        <section className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. Database Storage Location</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            Invio stores your local SQLite database entirely on your local machine:
          </p>
          <div className="space-y-1.5 text-xs font-mono text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p><strong>Windows:</strong> %APPDATA%\invio\invio.sqlite</p>
            <p><strong>macOS:</strong> ~/Library/Application Support/invio/invio.sqlite</p>
            <p><strong>Linux:</strong> ~/.config/invio/invio.sqlite</p>
          </div>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link to="/system-requirements" className="font-semibold text-[#7C3AED] hover:underline">
          ← Check system requirements
        </Link>
        <button
          type="button"
          onClick={() => openDownloadModal()}
          className="font-semibold text-[#7C3AED] hover:underline cursor-pointer"
        >
          Download desktop application →
        </button>
      </div>
    </PageContainer>
  );
}

export default InstallationGuidePage;
