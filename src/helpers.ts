export const isTouch = (): boolean => (
  (typeof window !== 'undefined' && 'ontouchstart' in window) ||
  !!(typeof navigator !== 'undefined' && (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
);

export const getClientXY = (e: TouchEvent | MouseEvent) => {
  if (e instanceof MouseEvent) {
    return { X: e.clientX, Y: e.clientY };
  }
  const touch = e.touches[0];
  return { X: touch.clientX, Y: touch.clientY };
};

export const getMidXY = (e: TouchEvent) => ({
  mX: (e.touches[0].pageX + e.touches[1].pageX) / 2,
  mY: (e.touches[0].pageY + e.touches[1].pageY) / 2,
});

export const limitZoom = (z: number, min: number, max: number) =>
  Math.max(Math.min(z, max), min);

// return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
export const getTouchesRange = (e: TouchEvent): number => (
  Math.sqrt(
    Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2) +
    Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2)
  )
);
