/**
 * OS and Direct Download Utility for Invio
 * Handles in-browser direct downloads without redirecting to external GitHub pages.
 * Supports both local server binary streaming and direct GitHub release assets.
 */

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.1.6';

const ENV_API_URL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : '';

export const API_BASE_URL = ENV_API_URL
  || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? ''
    : 'https://api.invio.timrio.com');

export const MICROSOFT_STORE_URL = 'https://apps.microsoft.com/detail/9nd42tj7n976?hl=en-US&gl=IN';
export const MICROSOFT_STORE_ID = '9nd42tj7n976';

export const PLATFORM_DOWNLOADS = {
  mac: {
    id: 'mac',
    name: 'Mac',
    shortName: 'Mac',
    badge: 'Apple Silicon (M1/M2/M3/M4)',
    extension: '.dmg',
    filename: `Invio-${APP_VERSION}-mac-arm64.dmg`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=mac&arch=arm64`,
    archLabel: 'Apple Silicon',
    minRequirement: 'macOS 11.0 or later (Apple Silicon)',
    sizeEstimate: '119 MB',
    installInstruction: 'Open the downloaded Invio file and drag the Invio icon into your Applications folder. Open Invio to start billing.',
    securityTip: 'On first launch, if macOS asks for confirmation, simply click "Open" to start billing.',
  },
  macIntel: {
    id: 'macIntel',
    platformQuery: 'mac',
    name: 'Mac (Intel)',
    shortName: 'Mac (Intel)',
    badge: 'Intel Mac (x64)',
    extension: '.dmg',
    filename: `Invio-${APP_VERSION}-mac-x64.dmg`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=mac&arch=x64`,
    archLabel: 'Intel Mac',
    minRequirement: 'macOS 10.15 or later (Intel x64)',
    sizeEstimate: '124 MB',
    installInstruction: 'Open the downloaded Invio file and drag the Invio icon into your Applications folder. Open Invio to start billing.',
    securityTip: 'On first launch, if macOS asks for confirmation, simply click "Open" to start billing.',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    shortName: 'Windows',
    badge: 'Windows 10 / 11',
    extension: '.exe',
    filename: `Invio-${APP_VERSION}-win-x64.exe`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=windows`,
    microsoftStoreUrl: MICROSOFT_STORE_URL,
    archLabel: 'Windows 10 / 11',
    minRequirement: 'Windows 10 version 17763.0 or Windows 11',
    sizeEstimate: '99 MB',
    installInstruction: 'Install via Microsoft Store for 1-click installation, or run the Windows installer.',
    securityTip: 'Verified on the Microsoft Store with automatic updates.',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    shortName: 'Linux',
    badge: 'Ubuntu, Debian, Fedora & Linux',
    extension: '.AppImage',
    filename: `Invio-${APP_VERSION}-linux-x86_64.AppImage`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=linux`,
    archLabel: 'Linux 64-bit',
    minRequirement: 'Standard 64-bit Linux',
    sizeEstimate: '124 MB',
    installInstruction: 'Right-click the downloaded file > Properties > Permissions > Enable "Allow executing file as program", then double-click to launch.',
    securityTip: 'Works completely standalone without extra setup.',
  },
};

let cachedDetectedOS = null;

/**
 * Detect client operating system accurately (memoized for browser session)
 */
export function detectDeviceOS() {
  if (typeof window === 'undefined') {
    return PLATFORM_DOWNLOADS.mac;
  }
  if (cachedDetectedOS) {
    return cachedDetectedOS;
  }

  const userAgent = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();

  const isWindows = platform.includes('win') || userAgent.includes('windows') || userAgent.includes('win32') || userAgent.includes('win64');
  if (isWindows) return (cachedDetectedOS = PLATFORM_DOWNLOADS.windows);

  // iPadOS 13+ in desktop mode reports a "Macintosh" user agent. Detect touch-capable
  // iPads first so they get the mobile fallback instead of the Mac installer.
  const isIPad = userAgent.includes('ipad') || (userAgent.includes('macintosh') && navigator.maxTouchPoints > 1);
  if (isIPad || userAgent.includes('android') || userAgent.includes('iphone')) {
    return (cachedDetectedOS = { id: 'mobile', name: 'Mobile', shortName: 'Mobile', isMobileFallback: true, downloadEndpoint: '' });
  }

  const isMac = platform.startsWith('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os x');
  if (isMac) return (cachedDetectedOS = PLATFORM_DOWNLOADS.mac);

  const isLinux = (platform.includes('linux') || userAgent.includes('linux')) && !userAgent.includes('android');
  if (isLinux) return (cachedDetectedOS = PLATFORM_DOWNLOADS.linux);

  return (cachedDetectedOS = PLATFORM_DOWNLOADS.mac);
}

/**
 * Trigger direct file download through the backend API.
 * Uses window.location.assign so downloads are handled natively by the browser
 * without swallowing server errors inside a hidden iframe.
 */
export function triggerDirectDownload(platformMeta) {
  const target = platformMeta || PLATFORM_DOWNLOADS.mac;
  if (target.isMobileFallback || target.id === 'mobile') return null;
  const platformParam = target.platformQuery || target.id || 'mac';
  const targetUrl = target.downloadEndpoint || `${API_BASE_URL}/api/download?platform=${encodeURIComponent(platformParam)}`;
  try {
    window.location.assign(targetUrl);
  } catch {
    const a = document.createElement('a');
    a.href = targetUrl;
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  return targetUrl;
}

/**
 * Returns platform-specific rating & review link.
 * Windows points to the official Microsoft Store listing; macOS & Linux point to feedback.
 */
export function getPlatformRatingUrl(platformId) {
  const targetId = platformId || detectDeviceOS().id;

  if (targetId === 'windows') {
    return {
      name: 'Microsoft Store',
      url: MICROSOFT_STORE_URL,
      isStoreSubmitted: true,
      label: 'Rate on Microsoft Store ★',
    };
  }

  if (targetId === 'mac' || targetId === 'macIntel') {
    return {
      name: 'Mac App Store',
      url: 'https://invio.timrio.com/docs/troubleshooting?source=rate-mac',
      isStoreSubmitted: false,
      label: 'Share Feedback',
    };
  }

  if (targetId === 'linux') {
    return {
      name: 'Linux Software Center',
      url: 'https://invio.timrio.com/docs/troubleshooting?source=rate-linux',
      isStoreSubmitted: false,
      label: 'Share Feedback',
    };
  }

  return {
    name: 'Invio Community',
    url: 'https://invio.timrio.com/docs/troubleshooting?source=rate',
    isStoreSubmitted: false,
    label: 'Share Feedback',
  };
}
