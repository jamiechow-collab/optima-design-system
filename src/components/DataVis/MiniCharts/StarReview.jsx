import React from 'react';
import { TIDE, TRACK } from './shared';

// 5-point star in a 12 x 12 box
const STAR = 'M6 .6l1.6 3.4 3.7.5-2.7 2.6.7 3.7L6 9.1 2.7 10.8l.7-3.7L.7 4.5 4.4 4z';

/**
 * Star review: a rating out of five stars, 12px (Figma "xs", 68 x 12). Filled stars use Tide, the rest sit back in grey.
 * value: 0..max, rounded to whole stars. max: number of stars (default 5).
 */
export const StarReview = ({ value, max = 5 }) => {
  const filled = Math.min(Math.max(Math.round(value), 0), max);
  return (
    <span role="img" aria-label={`${filled} out of ${max} stars`} style={{ display: 'inline-flex', gap: 2, flexShrink: 0 }}>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width={12} height={12} viewBox="0 0 12 12" aria-hidden="true" style={{ display: 'block' }}>
          <path d={STAR} fill={i < filled ? TIDE : TRACK} />
        </svg>
      ))}
    </span>
  );
};

export default StarReview;
