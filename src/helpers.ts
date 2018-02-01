export const isTouch = (): boolean => (
  (typeof window !== 'undefined' && 'ontouchstart' in window) ||
  !!(typeof navigator !== 'undefined' && (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
);

export const getClientPos = (event: TouchEvent | MouseEvent) => {
  if (event instanceof MouseEvent) {
    return { X: event.clientX, Y: event.clientY };
  }
  const touch = event.touches[0];
  return { X: touch.clientX, Y: touch.clientY };
};

export const getTouchesRange = (event: TouchEvent): number => {
  const a = event.touches[0];
  const b = event.touches[1];
  const dx = b.clientX - a.clientX;
  const dy = b.clientY - a.clientY;
  return Math.sqrt(dx * dx + dy * dy);
  // Maybe someday...
  // return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
};
