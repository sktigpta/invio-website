import { useRef } from 'react';

/**
 * Lightweight visibility hook.
 * Keeps sections visible immediately on initial render and during crawling/SSG
 * so search engines and fast snapshots never observe opacity-0 hidden content.
 */
export function useInView() {
  const ref = useRef(null);
  return { ref, inView: true };
}

export default useInView;
