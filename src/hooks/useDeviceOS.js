import { useState, useEffect } from 'react';
import { detectDeviceOS, PLATFORM_DOWNLOADS } from '../utils/osDetector';

/**
 * SSR-safe hook returning a deterministic desktop platform for initial hydration
 * and updating to the visitor's detected OS after mount.
 */
export function useDeviceOS(defaultPlatform = PLATFORM_DOWNLOADS.mac) {
  const [deviceOS, setDeviceOS] = useState(defaultPlatform);

  useEffect(() => {
    setDeviceOS(detectDeviceOS());
  }, []);

  return deviceOS;
}

export default useDeviceOS;
