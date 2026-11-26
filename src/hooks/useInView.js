import { useState, useEffect, useRef } from 'react';

/**
 * Lightweight IntersectionObserver hook for scroll-triggered reveal animations.
 * Respects prefers-reduced-motion and triggers once by default.
 */
export function useInView({ threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
    return !('IntersectionObserver' in window);
  });

  useEffect(() => {
    if (inView && once) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, inView]);

  return { ref, inView };
}

export default useInView;
