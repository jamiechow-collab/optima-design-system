import React from 'react';
import { TIDE, TRACK, AXIS, unit } from './shared';

const BAR_W = 6; // each bar: a 6px slot with a 4px track and fill inside it
const GAP = 5;
const BAR_H = 30;

/**
 * Progress bar: the unit of the mini bar chart, a slim vertical bar (Figma 6 x 30) filled from the bottom.
 * value: 0..1, or null / undefined for an empty bar.
 */
export const MiniProgressBar = ({ value }) => (
  <svg width={BAR_W} height={BAR_H} role="img" aria-label={value == null ? 'Empty' : `${Math.round(value * 100)}%`} style={{ display: 'block' }}>
    <rect x={1} y={0} width={4} height={BAR_H} rx={2} fill={TRACK} />
    {value != null && <rect x={1} y={BAR_H - Math.max(unit(value) * BAR_H, 4)} width={4} height={Math.max(unit(value) * BAR_H, 4)} rx={2} fill={TIDE} />}
  </svg>
);

/**
 * Mini bar chart: a row of progress bars (Figma 83 x 32 for eight bars). Each bar is a track with the value filled
 * from the bottom; a null value leaves the track empty. data: numbers (or null) on a 0..max scale.
 * showAxes: a baseline under the bars.
 * width: scales the whole chart to that width in px (default: its natural size). Score cards use ~49px.
 */
export const MiniBarChart = ({ data, max = Math.max(...data.filter((v) => v != null)), showAxes = true, width: widthProp }) => {
  const width = data.length * BAR_W + (data.length - 1) * GAP;
  const height = BAR_H + (showAxes ? 2 : 0);
  const scale = widthProp ? widthProp / width : 1;
  return (
    <svg width={width * scale} height={height * scale} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart" style={{ display: 'block', flexShrink: 0 }}>
      {data.map((v, i) => {
        const h = v == null ? 0 : Math.max(unit(v, 0, max) * BAR_H, 4);
        const x = i * (BAR_W + GAP) + 1;
        return (
          <g key={i}>
            <rect x={x} y={0} width={4} height={BAR_H} rx={2} fill={TRACK} />
            {v != null && <rect x={x} y={BAR_H - h} width={4} height={h} rx={2} fill={TIDE} />}
          </g>
        );
      })}
      {showAxes && <line x1={0} x2={width} y1={BAR_H + 1.5} y2={BAR_H + 1.5} stroke={AXIS} />}
    </svg>
  );
};

export default MiniBarChart;
