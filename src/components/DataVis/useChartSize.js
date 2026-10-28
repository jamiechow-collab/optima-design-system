import { useLayoutEffect, useState } from 'react';

/**
 * Size of a chart. Pass `width` / `height` in px to fix them; leave either out and it follows
 * the wrapper element (`ref`) — so the wrapper needs a width, and a set height if height is fluid.
 */
export const useChartSize = (ref, widthProp, heightProp, fallback = { w: 480, h: 280 }) => {
  const [measured, setMeasured] = useState(fallback);
  const fluid = widthProp === undefined || heightProp === undefined;
  useLayoutEffect(() => {
    if (!fluid || !ref.current) return undefined;
    const el = ref.current;
    const update = () => setMeasured({ w: el.clientWidth || fallback.w, h: el.clientHeight || fallback.h });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fluid, ref]);
  return {
    width: widthProp !== undefined ? widthProp : measured.w,
    height: heightProp !== undefined ? heightProp : measured.h,
  };
};

export default useChartSize;
