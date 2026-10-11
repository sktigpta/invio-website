import { useEffect } from 'react';
import { useDownloadModal } from '../context/DownloadModalContext';
import { DownloadCard } from './DownloadCard';

export function DownloadModal() {
  const { isOpen, platform, closeDownloadModal } = useDownloadModal();

  // Trap focus & handle ESC key & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDownloadModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeDownloadModal]);

  if (!isOpen || !platform) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeDownloadModal();
      }}
    >
      <div onMouseDown={(e) => e.stopPropagation()}>
        <DownloadCard
          initialPlatform={platform}
          autoTrigger={true}
          isModal={true}
          onClose={closeDownloadModal}
        />
      </div>
    </div>
  );
}

export default DownloadModal;
