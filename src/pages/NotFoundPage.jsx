import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySEO } from '../utils/seoHelper';
import { PageContainer } from '../components/PageContainer';
import { useDownloadModal } from '../context/DownloadModalContext';

export function NotFoundPage() {
  const { openDownloadModal } = useDownloadModal();

  useEffect(() => {
    applySEO('404');
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer
      badge="Error 404"
      title="Page Not Found"
      subtitle="The page you are looking for may have been moved, renamed, or is temporarily unavailable."
      className="text-center"
    >
      <div className="py-8">
        <p className="text-5xl font-black text-[#7C3AED] mb-4">404</p>
        <p className="text-xs text-slate-600 mb-6 max-w-sm mx-auto">
          Use the quick links below to navigate back to the main areas of the Invio desktop website.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            Return to Home
          </Link>
          <button
            type="button"
            onClick={() => openDownloadModal()}
            className="h-9 px-5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            Download Desktop App
          </button>
          <Link
            to="/tools"
            className="h-9 px-5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-full flex items-center justify-center transition-colors"
          >
            Free Finance Tools
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}

export default NotFoundPage;
