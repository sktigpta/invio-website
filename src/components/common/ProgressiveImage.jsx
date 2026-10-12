import { useState, useEffect, useRef } from 'react';

/**
 * ProgressiveImageLoader - Service class that manages preloading and caching
 * of high-resolution image assets to serve 360p low-quality first and
 * seamlessly upgrade to high-quality without layout shifts or content flashes.
 */
export class ProgressiveImageLoader {
  static loadedCache = new Set();
  static pendingPreloads = new Map();

  /**
   * Checks whether a high-resolution image URL is already cached by the browser session.
   */
  static isLoaded(url) {
    return Boolean(url && this.loadedCache.has(url));
  }

  /**
   * Preloads a high-resolution image in the background.
   * Returns a promise that resolves when the image is fully downloaded and decoded.
   */
  static preload(url) {
    if (!url) return Promise.resolve(url);
    if (this.loadedCache.has(url)) return Promise.resolve(url);

    if (this.pendingPreloads.has(url)) {
      return this.pendingPreloads.get(url);
    }

    const promise = new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      if (img.decode) {
        img
          .decode()
          .then(() => {
            this.loadedCache.add(url);
            resolve(url);
          })
          .catch(() => {
            img.onload = () => {
              this.loadedCache.add(url);
              resolve(url);
            };
            img.onerror = () => resolve(url);
          });
      } else {
        img.onload = () => {
          this.loadedCache.add(url);
          resolve(url);
        };
        img.onerror = () => resolve(url);
      }
    }).finally(() => {
      this.pendingPreloads.delete(url);
    });

    this.pendingPreloads.set(url, promise);
    return promise;
  }
}

/**
 * ProgressiveImage Component
 *
 * Renders a 360p lightweight WebP image first for instant LCP (Largest Contentful Paint),
 * reserves explicit aspect-ratio layout to eliminate CLS (Cumulative Layout Shift = 0),
 * and seamlessly upgrades to high-quality full resolution once downloaded.
 */
export function ProgressiveImage({
  srcLow,
  srcHigh,
  alt = '',
  width,
  height,
  aspectRatio,
  className = '',
  imgClassName = '',
  style = {},
  priority = false,
  sizes,
  onHighLoaded,
  ...restProps
}) {
  const isInitiallyCached = ProgressiveImageLoader.isLoaded(srcHigh);
  const [currentSrc, setCurrentSrc] = useState(isInitiallyCached ? srcHigh : (srcLow || srcHigh));
  const [isHighLoaded, setIsHighLoaded] = useState(isInitiallyCached);
  const isMountedRef = useRef(true);

  // Derive aspect-ratio string to prevent CLS
  const computedAspectRatio = aspectRatio || (width && height ? `${width} / ${height}` : undefined);

  useEffect(() => {
    isMountedRef.current = true;

    if (!srcHigh || isInitiallyCached) {
      setIsHighLoaded(true);
      return;
    }

    ProgressiveImageLoader.preload(srcHigh).then((loadedUrl) => {
      if (isMountedRef.current && loadedUrl) {
        setCurrentSrc(loadedUrl);
        setIsHighLoaded(true);
        if (onHighLoaded) onHighLoaded();
      }
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [srcHigh, isInitiallyCached, onHighLoaded]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        ...(computedAspectRatio ? { aspectRatio: computedAspectRatio } : {}),
        ...style,
      }}
    >
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`w-full h-full transition-all duration-500 ease-out ${
          isHighLoaded ? 'filter-none opacity-100 scale-100' : 'filter blur-[1.5px] opacity-95 scale-[1.01]'
        } ${imgClassName}`}
        style={{
          ...(computedAspectRatio ? { aspectRatio: computedAspectRatio } : {}),
        }}
        {...restProps}
      />
    </div>
  );
}

export default ProgressiveImage;
