import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCard } from '../components/DownloadCard';
import { APP_VERSION, MICROSOFT_STORE_URL, PLATFORM_DOWNLOADS } from '../utils/osDetector';

export function DownloadPage() {
  useEffect(() => {
    applySEO('download');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Official Desktop Release"
      title="Download Invio Free Invoice Software"
      subtitle={`Download Invio v${APP_VERSION} free for Windows, Mac, and Linux. Works 100% offline with unlimited bills, automatic GST tax math, barcode scanning, and safe local storage on your own computer.`}
    >
      <div className="flex flex-col items-center justify-center my-8">
        <DownloadCard autoTrigger={true} className="w-full" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
          <a
            href={MICROSOFT_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1"
          >
            <span>✓ Microsoft Store Listing</span>
          </a>
          <span className="text-slate-300">•</span>
          <Link
            to="/changelog"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            ← See all updates &amp; what&rsquo;s new
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to="/docs/installation"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            Installation &amp; setup guide →
          </Link>
          <span className="text-slate-300">•</span>
          <Link
            to="/docs/system"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            System requirements →
          </Link>
        </div>

        {/* Crawlable Platform Reference Matrix */}
        <section className="w-full max-w-3xl mt-12" aria-labelledby="supported-platforms-heading">
          <h2
            id="supported-platforms-heading"
            className="text-lg font-bold text-slate-900 text-center mb-4"
          >
            Supported Desktop Platforms (v{APP_VERSION})
          </h2>
          <div className="overflow-x-auto rounded-squircle border border-slate-200/90 bg-white shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                <tr>
                  <th className="py-3 px-4 font-bold">Platform</th>
                  <th className="py-3 px-4 font-bold">Requirement</th>
                  <th className="py-3 px-4 font-bold">Format</th>
                  <th className="py-3 px-4 font-bold">Installer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Windows 10 / 11</td>
                  <td className="py-3 px-4">{PLATFORM_DOWNLOADS.windows.minRequirement}</td>
                  <td className="py-3 px-4">Microsoft Store / .exe</td>
                  <td className="py-3 px-4">
                    <a
                      href={MICROSOFT_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C3AED] font-semibold hover:underline"
                    >
                      Microsoft Store
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Apple Mac (Apple Silicon)</td>
                  <td className="py-3 px-4">{PLATFORM_DOWNLOADS.mac.minRequirement}</td>
                  <td className="py-3 px-4">.dmg</td>
                  <td className="py-3 px-4">
                    <a href={PLATFORM_DOWNLOADS.mac.downloadEndpoint} className="text-[#7C3AED] font-semibold hover:underline">
                      Download .dmg
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Apple Mac (Intel)</td>
                  <td className="py-3 px-4">{PLATFORM_DOWNLOADS.macIntel.minRequirement}</td>
                  <td className="py-3 px-4">.dmg</td>
                  <td className="py-3 px-4">
                    <a href={PLATFORM_DOWNLOADS.macIntel.downloadEndpoint} className="text-[#7C3AED] font-semibold hover:underline">
                      Download Intel .dmg
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Linux (64-bit)</td>
                  <td className="py-3 px-4">{PLATFORM_DOWNLOADS.linux.minRequirement}</td>
                  <td className="py-3 px-4">.AppImage / .deb</td>
                  <td className="py-3 px-4">
                    <a href={PLATFORM_DOWNLOADS.linux.downloadEndpoint} className="text-[#7C3AED] font-semibold hover:underline">
                      Download AppImage
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

export default DownloadPage;
