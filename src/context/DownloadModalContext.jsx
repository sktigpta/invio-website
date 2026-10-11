import { createContext, useContext, useState, useCallback } from 'react';
import { detectDeviceOS, PLATFORM_DOWNLOADS } from '../utils/osDetector';

const DownloadModalContext = createContext(null);

export function DownloadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState(() => detectDeviceOS());

  const openDownloadModal = useCallback((targetPlatform) => {
    if (targetPlatform && typeof targetPlatform === 'object') {
      setPlatform(targetPlatform);
    } else if (typeof targetPlatform === 'string' && PLATFORM_DOWNLOADS[targetPlatform]) {
      setPlatform(PLATFORM_DOWNLOADS[targetPlatform]);
    } else {
      setPlatform(detectDeviceOS());
    }
    setIsOpen(true);
  }, []);

  const closeDownloadModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <DownloadModalContext.Provider
      value={{
        isOpen,
        platform,
        setPlatform,
        openDownloadModal,
        closeDownloadModal,
      }}
    >
      {children}
    </DownloadModalContext.Provider>
  );
}

export function useDownloadModal() {
  const context = useContext(DownloadModalContext);
  if (!context) {
    throw new Error('useDownloadModal must be used within a DownloadModalProvider');
  }
  return context;
}
