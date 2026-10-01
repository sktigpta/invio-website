/**
 * OS and Direct Download Utility for Invio
 * Handles in-browser direct downloads without redirecting to external GitHub pages.
 * Supports both local server binary streaming and direct GitHub release assets.
 */

export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

const ENV_API_URL = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : '';

export const API_BASE_URL = ENV_API_URL
  || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://api.invio.timrio.com');

export const PLATFORM_DOWNLOADS = {
  mac: {
    id: 'mac',
    name: 'macOS',
    shortName: 'Mac',
    badge: 'Apple Mac (All Models)',
    extension: '.dmg',
    filename: `Invio-${APP_VERSION}-mac-arm64.dmg`,
    downloadEndpoint: `${API_BASE_URL}/api/download?platform=mac`,
    archLabel: 'Mac Installer (.dmg)',
    minRequirement: 'macOS 11.0 or later',
    sizeEstimate: '119 MB',
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
    archLabel: 'Windows Setup (.exe)',
    minRequirement: 'Windows 10 or Windows 11',
    sizeEstimate: '99 MB',
    installInstruction: `Double-click the downloaded setup file (Invio-${APP_VERSION}-win-x64.exe) and follow the quick 1-step installer`,
    securityTip: 'If Windows shows "Windows protected your PC", click "More info" and then click "Run anyway".',
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
 * Opens the backend download URL in a new tab (cross-origin <a download> is
 * ignored by browsers, so a plain anchor with target=_blank is used instead).
 */
export function triggerDirectDownload(platformMeta) {
  const target = platformMeta || PLATFORM_DOWNLOADS.mac;
  if (target.isMobileFallback || target.id === 'mobile') return null;
  const targetUrl = target.downloadEndpoint || `${API_BASE_URL}/api/download?platform=${encodeURIComponent(target.id || 'mac')}`;

  try {
    // Silent background iframe download trigger - keeps the user seamlessly on the Invio webpage
    let iframe = document.getElementById('invio-silent-downloader');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'invio-silent-downloader';
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.style.border = 'none';
      iframe.setAttribute('aria-hidden', 'true');
      document.body.appendChild(iframe);
    }
    iframe.src = targetUrl;
  } catch {
    try {
      const a = document.createElement('a');
      a.href = targetUrl;
      a.setAttribute('download', target.filename || 'Invio-installer');
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      window.location.assign(targetUrl);
    }
  }
  return targetUrl;
}
