import { API_BASE_URL } from '../utils/osDetector';
import { RELEASES_DATA } from '../data/releasesData';

/**
 * Service to fetch real release notes and release packages.
 * First queries backend /api/download/meta/latest (proxies GitHub Releases API with token),
 * then falls back to verified RELEASES_DATA.
 */
export async function fetchLatestReleaseNotes() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
  try {
    const res = await fetch(`${API_BASE_URL}/api/download/meta/latest`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.tag) {
        return {
          version: data.version || RELEASES_DATA[0].version,
          tag: data.tag || RELEASES_DATA[0].tag,
          name: data.name || RELEASES_DATA[0].name,
          notes: data.notes || '',
          htmlUrl: data.htmlUrl || RELEASES_DATA[0].githubUrl,
          publishedAt: data.publishedAt || RELEASES_DATA[0].publishedAt,
          package: data.package,
          isLiveApi: true,
        };
      }
    }
  } catch (err) {
    console.debug('[ReleaseService] Using bundled verified release metadata:', err);
  } finally {
    clearTimeout(timeoutId);
  }

  return {
    ...RELEASES_DATA[0],
    isLiveApi: false,
  };
}
