/**
 * Shared keyboard interaction for custom `role="radiogroup"` controls.
 * Arrow keys move selection (with wrapping); Home/End jump to the ends.
 * Call from the radiogroup container's `onKeyDown`.
 */
export function onRadioGroupKeyDown(event, ids, activeId, onSelect) {
  const { key } = event;
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) return;
  event.preventDefault();
  const current = Math.max(0, ids.indexOf(activeId));
  let next = current;
  if (key === 'ArrowRight' || key === 'ArrowDown') next = (current + 1) % ids.length;
  else if (key === 'ArrowLeft' || key === 'ArrowUp') next = (current - 1 + ids.length) % ids.length;
  else if (key === 'Home') next = 0;
  else if (key === 'End') next = ids.length - 1;
  if (ids[next] !== activeId) onSelect(ids[next]);
}

/** Focus helper for radio buttons rendered inside a radiogroup. */
export function radioTabIndex(id, activeId) {
  return id === activeId ? 0 : -1;
}
