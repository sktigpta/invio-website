/**
 * OS and Direct Download Utility for Invio
 * Handles in-browser direct downloads without redirecting to external GitHub pages.
 * Supports both local server binary streaming and direct GitHub release assets.
 */

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.1.0';

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
    name: 'macOS (Apple Silicon)',
    shortName: 'Mac (M1/M2/M3)',
    badge: 'Apple Silicon (M1/M2/M3/M4)',
    extension: '.dmg',
    filename: `Invio-${APP_VERSION}-mac-arm64.dmg`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=mac&arch=arm64`,
    archLabel: 'Apple Silicon (.dmg)',
    minRequirement: 'macOS 11.0 or later (Apple Silicon)',
    sizeEstimate: '119 MB',
    installInstruction: 'Open the downloaded Invio file (.dmg) and drag the Invio icon into your Applications folder. Open Invio to start billing.',
    securityTip: 'On first launch, if macOS asks for confirmation, simply click "Open" to start billing.',
  },
  macIntel: {
    id: 'macIntel',
    platformQuery: 'mac',
    name: 'macOS (Intel)',
    shortName: 'Mac (Intel)',
    badge: 'Intel Mac (x64)',
    extension: '.dmg',
    filename: `Invio-${APP_VERSION}-mac-x64.dmg`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=mac&arch=x64`,
    archLabel: 'Intel Mac (.dmg)',
    minRequirement: 'macOS 10.15 or later (Intel x64)',
    sizeEstimate: '124 MB',
    installInstruction: 'Open the downloaded Invio file (.dmg) and drag the Invio icon into your Applications folder. Open Invio to start billing.',
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
    archLabel: 'Windows 10 / 11 (64-bit)',
    minRequirement: 'Windows 10 version 17763.0 or Windows 11',
    sizeEstimate: '99 MB',
    installInstruction: 'Install via Microsoft Store for verified, 1-click installation without firewall or SmartScreen alerts, or run the standalone installer.',
    securityTip: 'Installing from the Microsoft Store bypasses Windows Defender SmartScreen and firewall risk alerts.',
  },
  linux: {
    id: 'linux',
    name: 'Linux',
    shortName: 'Linux',
    badge: 'Ubuntu, Debian, Fedora & Linux',
    extension: '.AppImage',
    filename: `Invio-${APP_VERSION}-linux-x64.AppImage`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=linux`,
    archLabel: 'Linux Package (.AppImage)',
    minRequirement: 'Standard 64-bit Linux',
    sizeEstimate: '124 MB',
    installInstruction: 'Right-click the downloaded AppImage file > Properties > Permissions > Enable "Allow executing file as program", then double-click to launch.',
    securityTip: 'Works completely standalone without extra setup.',
  },
};

/**
 * Detect client operating system accurately
 */
export function detectDeviceOS() {
  if (typeof window === 'undefined') {
    return PLATFORM_DOWNLOADS.mac;
  }

  const userAgent = (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase();
  const platform = (navigator.platform || '').toLowerCase();

  const isWindows = platform.includes('win') || userAgent.includes('windows') || userAgent.includes('win32') || userAgent.includes('win64');
  if (isWindows) return PLATFORM_DOWNLOADS.windows;

  // iPadOS 13+ in desktop mode reports a "Macintosh" user agent. Detect touch-capable
  // iPads first so they get the mobile fallback instead of the Mac installer.
  const isIPad = userAgent.includes('ipad') || (userAgent.includes('macintosh') && navigator.maxTouchPoints > 1);
  if (isIPad || userAgent.includes('android') || userAgent.includes('iphone')) {
    return { id: 'mobile', name: 'Mobile', shortName: 'Mobile', isMobileFallback: true, downloadEndpoint: '' };
  }

  const isMac = platform.startsWith('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os x');
  if (isMac) return PLATFORM_DOWNLOADS.mac;

  const isLinux = (platform.includes('linux') || userAgent.includes('linux')) && !userAgent.includes('android');
  if (isLinux) return PLATFORM_DOWNLOADS.linux;

  return PLATFORM_DOWNLOADS.mac;
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
 * If using Windows: redirects to official Microsoft Store listing.
 * macOS & Linux: structured with TODO for when submitted to their respective app stores.
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
    // TODO: Mac App Store rating once published (e.g. macappstore://apps.apple.com/app/id... or web URL)
    return {
      name: 'Mac App Store',
      url: 'https://invio.timrio.com/docs/troubleshooting?source=rate-mac',
      isStoreSubmitted: false,
      label: 'Share Feedback',
    };
  }

  if (targetId === 'linux') {
    // TODO: Linux Flathub / Snap store rating once published
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
