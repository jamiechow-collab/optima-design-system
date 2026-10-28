import React, { useLayoutEffect, useRef, useState } from 'react';

const CURSOR_GAP = 12;

/**
 * Positions a tooltip next to the cursor inside a `position: relative` chart wrapper.
 * pointer: { x, y } relative to the wrapper; bounds: { width, height } of the chart.
 * Right of the cursor and vertically centred on it by default; moves to the left of the cursor
 * when there is not enough room on the right.
 */
export const CursorTooltip = ({ pointer, bounds, children }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 }); // measured: the tooltip hugs its content
  useLayoutEffect(() => {
    if (ref.current) setSize({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
  }, [children]);
  const { w, h } = size;
  const fitsRight = pointer.x + CURSOR_GAP + w <= bounds.width;
  const fitsLeft = pointer.x - CURSOR_GAP - w >= 0;
  const rawLeft = fitsRight || !fitsLeft ? pointer.x + CURSOR_GAP : pointer.x - CURSOR_GAP - w;
  const left = Math.min(Math.max(rawLeft, 0), Math.max(bounds.width - w, 0));
  const top = Math.min(Math.max(pointer.y - h / 2, 0), Math.max(bounds.height - h, 0));
  return (
    <div ref={ref} style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, left, top, visibility: h ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
};

export default CursorTooltip;
