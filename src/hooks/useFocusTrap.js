import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(', ');

/**
 * Traps keyboard focus within a container element while the trap is active.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the container that should trap focus.
 * @param {boolean} isActive - Whether the focus trap is currently active.
 */
export function useFocusTrap(ref, isActive) {
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    // Save the element that had focus before the trap activates so we can
    // restore it when the trap is released.
    previousFocusRef.current = document.activeElement;

    // Move focus to the first focusable element inside the container.
    const getFocusable = () =>
      Array.from(ref.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []).filter(
        (el) => !el.closest('[aria-hidden="true"]')
      );

    const focusables = getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the element that was active before the trap.
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        try {
          previousFocusRef.current.focus();
        } catch {
          // Ignore if the element is no longer focusable (e.g. removed from DOM).
        }
      }
    };
  }, [isActive, ref]);
}

export default useFocusTrap;
