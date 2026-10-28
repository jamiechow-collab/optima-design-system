import { useState } from 'react';

/**
 * Which legend items are hidden. `toggle(i)` hides or shows item i; the last visible item can't be hidden,
 * so a chart is never left empty. `hidden` is the list of hidden indices, in legend order.
 */
export const useSeriesVisibility = (count) => {
  const [hidden, setHidden] = useState([]);
  const toggle = (i) =>
    setHidden((h) => {
      if (h.includes(i)) return h.filter((x) => x !== i);
      return count - h.length > 1 ? [...h, i] : h;
    });
  return { hidden, toggle };
};

export default useSeriesVisibility;
