import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { DownloadCard } from '../components/DownloadCard';

export function DownloadPage() {
  useEffect(() => {
    applySEO('download');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Official Desktop Release"
      title="Download Invio Desktop Application"
      subtitle="Invio is a 100% offline desktop billing and inventory management application for Windows, macOS, and Linux. Choose your operating system below to start downloading."
    >
      <div className="flex flex-col items-center justify-center my-8">
        <DownloadCard autoTrigger={true} className="w-full" />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs">
          <Link
            to="/changelog"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            ← View all releases &amp; checksums
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
            to="/system-requirements"
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            System requirements →
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default DownloadPage;
