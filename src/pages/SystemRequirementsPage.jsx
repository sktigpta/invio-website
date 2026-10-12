import { useEffect } from 'react';
import { applySEO } from '../utils/seoHelper';
import { A4DocLayout } from '../components/A4DocLayout';
import { useDownloadModal } from '../context/DownloadModalContext';

export function SystemRequirementsPage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('system-requirements');
    window.scrollTo(0, 0);
  }, []);

  return (
    <A4DocLayout
      title="System &amp; Hardware Requirements"
      subtitle="Invio Desktop Software • Compatibility Specifications • Published by Timrio"
    >
      <p>
        Review the minimum and recommended hardware and operating system specifications to ensure smooth, high-speed performance for offline billing, thermal receipt printing, and barcode scanning.
      </p>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        1. Operating System &amp; Hardware Specifications
      </h2>

      <div className="overflow-x-auto my-3 border border-slate-200 rounded">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Operating System</th>
              <th className="py-2 px-3">Supported Versions</th>
              <th className="py-2 px-3">Minimum RAM</th>
              <th className="py-2 px-3">Recommended</th>
              <th className="py-2 px-3">Disk Space</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Windows PC</td>
              <td className="py-2 px-3">Windows 10 (1809+) &amp; Windows 11 (64-bit)</td>
              <td className="py-2 px-3">2 GB</td>
              <td className="py-2 px-3">4 GB or higher</td>
              <td className="py-2 px-3">350 MB free</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Apple Mac</td>
              <td className="py-2 px-3">macOS 11 (Big Sur) through macOS 15 (Sequoia)</td>
              <td className="py-2 px-3">2 GB</td>
              <td className="py-2 px-3">4 GB unified memory</td>
              <td className="py-2 px-3">400 MB free</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Linux Desktop</td>
              <td className="py-2 px-3">Ubuntu 20.04+, Debian 11+, Fedora, Arch</td>
              <td className="py-2 px-3">2 GB</td>
              <td className="py-2 px-3">4 GB or higher</td>
              <td className="py-2 px-3">350 MB free</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        2. Thermal Receipt Printer Compatibility (ESC/POS)
      </h2>
      <p>
        Invio communicates directly with POS thermal receipt printers via native ESC/POS command sequences:
      </p>

      <div className="overflow-x-auto my-3 border border-slate-200 rounded">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Printer Type</th>
              <th className="py-2 px-3">Paper Width</th>
              <th className="py-2 px-3">Interface</th>
              <th className="py-2 px-3">Compatible Brands</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Thermal Receipt</td>
              <td className="py-2 px-3">58mm (2-inch, 384 dots)</td>
              <td className="py-2 px-3">USB, Ethernet LAN, COM</td>
              <td className="py-2 px-3">Epson, TVS, Citizen, NGX, Everycom, POS-58</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Wide Thermal POS</td>
              <td className="py-2 px-3">80mm (3-inch, 576 dots)</td>
              <td className="py-2 px-3">USB, Ethernet LAN, COM</td>
              <td className="py-2 px-3">Epson TM-T82, Star Micronics, TVS RP-3200, POS-80</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-medium text-slate-900">Office Desktop</td>
              <td className="py-2 px-3">A4 &amp; A5 Full Page</td>
              <td className="py-2 px-3">USB, Wi-Fi, System Spooler</td>
              <td className="py-2 px-3">Any Laser or Inkjet printer (HP, Canon, Brother, Epson)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        3. Barcode Scanners &amp; POS Peripherals
      </h2>
      <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700 leading-relaxed my-2">
        <li>
          <strong>Barcode Scanners:</strong> Compatible with all standard 1D and 2D handheld or hands-free barcode scanners configured in <strong>USB Keyboard Emulation (HID)</strong> mode. Works out-of-the-box with zero vendor drivers.
        </li>
        <li>
          <strong>Cash Drawers:</strong> Connects directly to the RJ11 / RJ12 cash drawer port on any supported thermal printer. Invio triggers drawer open pulses upon cash receipt finalization.
        </li>
        <li>
          <strong>Customer Display:</strong> Supports secondary customer-facing monitors connected via HDMI, DisplayPort, VGA, or USB-C configured in standard Extended Desktop mode.
        </li>
      </ul>

      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pt-4 pb-1">
        4. Downloads &amp; Platform Installers
      </h2>
      <p>
        Ready to test on your system? Download the standalone executable for your operating system:
      </p>
      <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
        <button
          type="button"
          onClick={() => openDownloadModal('windows')}
          className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
        >
          Download for Windows (.exe) →
        </button>
        <span className="text-slate-300">•</span>
        <button
          type="button"
          onClick={() => openDownloadModal('mac')}
          className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
        >
          Download for macOS (.dmg) →
        </button>
        <span className="text-slate-300">•</span>
        <button
          type="button"
          onClick={() => openDownloadModal('linux')}
          className="text-[#7C3AED] underline font-semibold hover:text-[#6D28D9] cursor-pointer"
        >
          Download for Linux (.AppImage) →
        </button>
      </div>
    </A4DocLayout>
  );
}

export default SystemRequirementsPage;
