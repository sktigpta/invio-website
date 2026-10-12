import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';
import { useDownloadModal } from '../context/DownloadModalContext';

export function InstallationGuidePage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('docs-installation');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="Installation &amp; Setup Guide"
      subtitle="Invio Desktop Software • Step-by-Step Installation Instructions • Published by Timrio"
    >
      <p>
        Follow this guide to download, install, verify, and configure Invio on your computer. Setup takes less than 3 minutes.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        1. Installing on Windows (Windows 10 &amp; 11)
      </h2>
      <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
        <li>
          Download the latest Windows installer (<code>Invio-Setup-1.0.2.exe</code>) via{' '}
          <button
            type="button"
            onClick={() => openDownloadModal('windows')}
            className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
          >
            direct download
          </button>
          .
        </li>
        <li>Open your Downloads folder and double-click the setup executable.</li>
        <li>
          <strong>Windows SmartScreen notice:</strong> Because Invio is an independently distributed executable, Windows Defender SmartScreen may display a prompt stating <em>&ldquo;Windows protected your PC&rdquo;</em>.
          <blockquote className="border-l-2 border-slate-300 pl-3 py-1 my-1.5 text-xs text-slate-600 bg-slate-50 italic">
            <strong>Action:</strong> Click <strong>&ldquo;More info&rdquo;</strong> (underlined text in the dialog) and then click <strong>&ldquo;Run anyway&rdquo;</strong>.
          </blockquote>
        </li>
        <li>The installer will copy application files, place a shortcut on your Desktop, and launch Invio automatically.</li>
      </ol>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        2. Installing on macOS (Apple Silicon M1–M4 &amp; Intel)
      </h2>
      <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
        <li>
          Download the macOS disk image (<code>Invio-1.0.2.dmg</code>) via{' '}
          <button
            type="button"
            onClick={() => openDownloadModal('mac')}
            className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
          >
            direct download
          </button>
          .
        </li>
        <li>Double-click the downloaded <code>.dmg</code> file to mount it.</li>
        <li>Drag the Invio application icon into your <strong>Applications</strong> folder shortcut.</li>
        <li>Eject the disk image and launch Invio from Applications or Spotlight (Cmd + Space).</li>
        <li>
          If macOS displays a notice stating the application was downloaded from the internet, click <strong>&ldquo;Open&rdquo;</strong> to approve.
        </li>
      </ol>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        3. Installing on Linux (Ubuntu, Debian, Fedora, Arch)
      </h2>
      <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-700 leading-relaxed my-2">
        <li>
          Download the Linux package via{' '}
          <button
            type="button"
            onClick={() => openDownloadModal('linux')}
            className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
          >
            direct download
          </button>
          .
        </li>
        <li>
          <strong>AppImage:</strong> Open your terminal, mark the file as executable, and run:
          <pre className="bg-slate-900 text-slate-100 rounded p-2.5 text-[11px] font-mono overflow-x-auto my-1.5">
            chmod +x Invio-1.0.2.AppImage && ./Invio-1.0.2.AppImage
          </pre>
        </li>
        <li>
          <strong>Debian / Ubuntu:</strong> Install via terminal:
          <pre className="bg-slate-900 text-slate-100 rounded p-2.5 text-[11px] font-mono overflow-x-auto my-1.5">
            sudo dpkg -i Invio-1.0.2.deb
          </pre>
        </li>
      </ol>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        4. First-Run Setup &amp; Configuration
      </h2>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
        <li><strong>Business Profile:</strong> Open Settings &gt; Business Profile. Enter your Store Name, Address, GSTIN / Tax ID, Phone Number, and upload your Store Logo.</li>
        <li><strong>Payment Details:</strong> Enter your Bank Account details and UPI ID (VPA). Your UPI ID automatically generates scannable payment QR codes on all printed receipts.</li>
        <li><strong>Printer Format:</strong> Under Settings &gt; Printing, select between <strong>A4 Full Page</strong>, <strong>A5 Compact</strong>, or <strong>58mm/80mm Thermal Receipt</strong>.</li>
        <li><strong>Products &amp; Inventory:</strong> Navigate to Products &gt; Add Item to populate your catalogue, or use the Import CSV button to load your entire inventory at once.</li>
      </ul>
    </A4DocLayout>
  );
}

export default InstallationGuidePage;
