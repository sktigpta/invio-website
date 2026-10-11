import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { WindowsIcon, AppleIcon } from '../components/Icons';
import { useDownloadModal } from '../context/DownloadModalContext';

export function SystemRequirementsPage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('system-requirements');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Compatibility"
      title="Invio Desktop System Requirements"
      subtitle="Review the minimum and recommended hardware and operating system specifications to ensure smooth, high-speed performance."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        {/* Windows Card */}
        <div className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <WindowsIcon className="size-5 text-[#0078D7]" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Windows PC</h2>
          </div>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed mb-4">
            <p><strong>Operating System:</strong> Windows 10 (version 1809 or higher) or Windows 11 (64-bit).</p>
            <p><strong>Processor:</strong> 1.6 GHz Intel, AMD, or ARM64 processor (64-bit architecture).</p>
            <p><strong>Memory (RAM):</strong> 2 GB minimum (4 GB or more recommended for high-volume retail).</p>
            <p><strong>Disk Storage:</strong> 350 MB available disk space for application and local SQLite database.</p>
            <p><strong>Display Resolution:</strong> 1024 × 768 minimum (1920 × 1080 recommended).</p>
          </div>
          <button
            type="button"
            onClick={() => openDownloadModal('windows')}
            className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer"
          >
            Download for Windows (.exe) →
          </button>
        </div>

        {/* macOS Card */}
        <div className="p-5 rounded-squircle border border-slate-200/90 bg-white">
          <div className="flex items-center gap-2 mb-3">
            <AppleIcon className="size-5 text-slate-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Apple Mac</h2>
          </div>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed mb-4">
            <p><strong>Operating System:</strong> macOS 11.0 (Big Sur), macOS 12, 13, 14, or macOS 15 (Sequoia).</p>
            <p><strong>Processor:</strong> Apple Silicon (M1, M2, M3, M4) or Intel 64-bit processor.</p>
            <p><strong>Memory (RAM):</strong> 2 GB minimum (4 GB unified memory recommended).</p>
            <p><strong>Disk Storage:</strong> 400 MB available disk space for installation and invoice data.</p>
            <p><strong>Display Resolution:</strong> Any Retina or standard display.</p>
          </div>
          <button
            type="button"
            onClick={() => openDownloadModal('mac')}
            className="text-xs font-semibold text-[#7C3AED] hover:underline cursor-pointer"
          >
            Download for macOS (.dmg) →
          </button>
        </div>
      </div>

      {/* Hardware & Peripherals */}
      <section className="my-8 p-5 rounded-squircle border border-slate-200/90 bg-white">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">Hardware &amp; Peripheral Compatibility</h2>
        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong>Receipt Printers:</strong> Compatible with 58mm (2-inch) and 80mm (3-inch) ESC/POS thermal printers connected via USB, Network Ethernet, or Virtual COM. Works with Epson, TVS, Citizen, NGX, Everycom, and generic POS printers.
          </p>
          <p>
            <strong>Barcode Scanners:</strong> Compatible with standard 1D/2D laser and CCD barcode scanners operating in USB Keyboard Emulation (HID) mode. No proprietary drivers needed.
          </p>
          <p>
            <strong>Customer POS Display:</strong> Supports any secondary monitor connected via HDMI, DisplayPort, VGA, or USB-C configured in Extended Desktop mode.
          </p>
          <p>
            <strong>Offline Operation:</strong> Invio operates completely without internet connectivity. Internet access is only required when checking for software updates, authenticating email accounts via Google OAuth, or sending invoices via SMTP / WhatsApp.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}

export default SystemRequirementsPage;
