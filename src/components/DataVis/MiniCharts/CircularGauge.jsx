import React from 'react';
import { TRACK, STATUS, unit } from './shared';
import { sector } from '../DonutChart/DonutChart';

const SIZES = { lg: 48, md: 32, sm: 20 }; // Figma sizes in px

/**
 * Circular gauge: a small donut showing one value on a 0..max scale, filling clockwise from the top.
 * size: 'lg' (48) | 'md' (32) | 'sm' (20). status: 'positive' (green) | 'warning' (orange).
 */
export const CircularGauge = ({ value, max = 100, size = 'lg', status = 'positive' }) => {
  const d = SIZES[size];
  const ro = d / 2;
  const ri = ro * 0.5;
  const frac = unit(value, 0, max);
  const top = -Math.PI / 2;
  return (
    <svg width={d} height={d} role="img" aria-label={`${Math.round(frac * 100)}%`} style={{ display: 'block', flexShrink: 0 }}>
      <path d={sector(ro, ro, ro, ri, top, top + Math.PI * 2)} fill={TRACK} fillRule="evenodd" />
      {frac > 0 && <path d={sector(ro, ro, ro, ri, top, top + Math.PI * 2 * frac)} fill={STATUS[status]} />}
    </svg>
  );
};

export default CircularGauge;
