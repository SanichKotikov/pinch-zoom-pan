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

export const getWheelDelta = (event: WheelEvent): number => {
  const delta = event.deltaY;

  switch (event.deltaMode) {
    case WheelEvent.DOM_DELTA_LINE:
      return Math.abs(delta) >= 1
        ? delta / 100       // FF (wheel) WIN/MAC
        : delta / 100 * 2;  // FF (touch) WIN
    case WheelEvent.DOM_DELTA_PAGE:
      return Math.abs(delta) >= 1
        ? delta / 100       // Ch/FF (wheel) WIN
        : delta / 10;       // Ch/FF (touch) WIN
    default:
      // Big delta means that it's DOM_DELTA_PAGE (IE/EDGE)
      return Math.abs(delta) > 600 // TODO: check it
        ? delta / 10000
        : delta / 1000;
  }
};
