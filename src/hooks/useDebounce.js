import { useState, useEffect } from 'react';

/**
 * Reusable hook to debounce any value (e.g. search queries, filter inputs)
 * by a specified delay in milliseconds.
 *
 * @param {any} value The value to debounce.
 * @param {number} delayMs Delay in milliseconds (default: 300ms).
 * @returns {any} The debounced value.
 */
export function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
