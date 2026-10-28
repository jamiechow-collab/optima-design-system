import React, { useId } from 'react';
import { TIDE, AXIS, unit } from './shared';

const PAD = 4; // room so the stroke is never clipped

/**
 * Sparkline: a tiny trend line (Figma 163 x 35).
 * data: numbers, oldest first. variant: 'line' | 'area-gradient' | 'area-filled'.
 * showAxes: a baseline and a left axis line, no labels. width / height in px.
 */
export const Sparkline = ({ data, variant = 'area-gradient', showAxes = true, width = 163, height = 35 }) => {
  const id = useId();
  const min = Math.min(...data);
  const max = Math.max(...data);
  const x0 = showAxes ? 1 : 0;
  const plotW = width - x0 - PAD;
  const plotH = height - PAD * 2 - (showAxes ? 1 : 0);
  const pts = data.map((v, i) => [x0 + (i / (data.length - 1)) * plotW, PAD + (1 - unit(v, min, max)) * plotH]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const base = height - (showAxes ? 1 : 0);
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${base} L${pts[0][0].toFixed(1)},${base} Z`;

  return (
    <svg width={width} height={height} role="img" aria-label="Sparkline" style={{ display: 'block', flexShrink: 0 }}>
      {variant === 'area-gradient' && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-datavis-tide-selected, #01659d)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--color-datavis-tide-selected, #01659d)" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {variant === 'area-gradient' && <path d={area} fill={`url(#${id})`} />}
      {variant === 'area-filled' && <path d={area} fill="var(--color-datavis-tide-dismissed, #01659d33)" />}
      {showAxes && (
        <>
          <line x1={0.5} x2={0.5} y1={0} y2={height} stroke={AXIS} />
          <line x1={0} x2={width} y1={height - 0.5} y2={height - 0.5} stroke={AXIS} />
        </>
      )}
      <path d={line} fill="none" stroke={TIDE} strokeWidth={1} strokeLinejoin="round" />
    </svg>
  );
};

export default Sparkline;
