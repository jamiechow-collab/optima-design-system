import React from 'react';
import { TRACK, STATUS, unit } from './shared';

/**
 * Linear gauge: one value against a target on a 60 x 20 track (the bar itself is 8px high).
 * value / max: the filled part. target: where the tick sits, on the same scale (default: half of max).
 * Below the target the fill is warning (orange), at or above it positive (green), unless `status` forces one.
 */
export const LinearGauge = ({ value, max = 100, target = max / 2, status, width = 60 }) => {
  const fill = STATUS[status || (value >= target ? 'positive' : 'warning')];
  return (
    <svg width={width} height={20} role="img" aria-label={`${value} of ${max}, target ${target}`} style={{ display: 'block', flexShrink: 0 }}>
      <rect x={0} y={6} width={width} height={8} rx={4} fill={TRACK} />
      <rect x={0} y={6} width={Math.max(unit(value, 0, max) * width, 0)} height={8} rx={4} fill={fill} />
      <rect x={unit(target, 0, max) * width - 0.5} y={0} width={1} height={20} fill="var(--color-text-primary, #222)" />
    </svg>
  );
};

export default LinearGauge;
