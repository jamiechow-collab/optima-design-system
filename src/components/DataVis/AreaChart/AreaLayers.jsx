import React from 'react';
import { straightPath, curvePath } from '../LineChart/LineChart';

// Shared by the Area chart and the Combo chart, so an area looks and behaves the same in both.

const MARKER_R = 3.5; // 8px marker incl. 1px stroke

/**
 * Stack totals. stacked: the first series is the top layer and the last sits on the axis (the same order as
 * the stacked bar chart); otherwise every series runs from the axis. below[si][ci]: total of the layers under
 * layer si at category ci. topOf(si, ci): where layer si ends.
 */
export const stackTotals = (series, categories, stacked) => {
  const below = series.map((_, si) => categories.map((__, ci) => (stacked ? series.slice(si + 1).reduce((sum, s) => sum + s.values[ci], 0) : 0)));
  return { below, topOf: (si, ci) => below[si][ci] + series[si].values[ci] };
};

const geometry = ({ series, categories, stacked, curve, x, y }) => {
  const path = curve === 'curve' ? curvePath : straightPath;
  const { below, topOf } = stackTotals(series, categories, stacked);
  const base = y(0);
  const upper = (si) => categories.map((_, i) => [x(i), y(topOf(si, i))]);
  const onStack = (si) => stacked && si < series.length - 1; // the bottom layer sits on the axis
  const lower = (si) => categories.map((_, i) => [x(i), onStack(si) ? y(below[si][i]) : base]);
  // closed area: along the top edge, then back along the lower edge (the axis, or the layer below)
  const areaPath = (si) => {
    const back = lower(si).reverse();
    const rest = onStack(si) ? ` ${path(back).replace(/^M[^CL]*/, '')}` : ` L${back[back.length - 1][0]},${back[back.length - 1][1]}`;
    return `${path(upper(si))} L${back[0][0]},${back[0][1]}${rest} Z`;
  };
  return { path, upper, areaPath, topOf };
};

/**
 * Area fills. Standard: each area fades from its dismissed colour at the top to 0% at the axis; stacked: flat
 * dismissed colour. colourOf(si, state) gives the layer's datavis colour; dimmed(si) fades an area's gradient
 * (standard charts while another area is hovered); order: the draw order (default: series order).
 */
export const AreaFills = ({ series, categories, stacked, curve, x, y, colourOf, gradientId, dimmed = () => false, dimmedOpacity = 0.4, order }) => {
  const { areaPath } = geometry({ series, categories, stacked, curve, x, y });
  const ids = (si) => `${gradientId}-${si}`;
  return (
    <>
      <defs>
        {!stacked &&
          series.map((_, si) => {
            const o = dimmed(si) ? dimmedOpacity : 1;
            return (
              <linearGradient key={si} id={ids(si)} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={colourOf(si, 'dismissed')} stopOpacity={o} />
                <stop offset="1" stopColor={colourOf(si, 'gradient-end')} stopOpacity={o} />
              </linearGradient>
            );
          })}
      </defs>
      {(order || series.map((_, si) => si)).map((si) => (
        <path key={`area${si}`} d={areaPath(si)} fill={stacked ? colourOf(si, 'dismissed') : `url(#${ids(si)})`} stroke="none" />
      ))}
    </>
  );
};

/**
 * Area edges, drawn above the fills. Only the hovered data point gets a marker: one filled marker with a halo
 * per area (standard) or one hollow marker per layer (stacked). focused(si) is false for an area that is not
 * the one under the cursor (it switches to its dismissed colour and has no marker). hoverIndex: category
 * index, or null / undefined when nothing is hovered.
 */
export const AreaEdges = ({ series, categories, stacked, curve, x, y, colourOf, hoverIndex = null, focused = () => true, order }) => {
  const { path, upper, topOf } = geometry({ series, categories, stacked, curve, x, y });
  const hovering = hoverIndex !== null && hoverIndex !== undefined;
  return (
    <>
      {(order || series.map((_, si) => si)).map((si) => {
        const line = colourOf(si, focused(si) ? 'default' : 'dismissed');
        const cx = hovering ? x(hoverIndex) : 0;
        const cy = hovering ? y(topOf(si, hoverIndex)) : 0;
        return (
          <g key={`edge${si}`}>
            <path d={path(upper(si))} fill="none" stroke={line} strokeWidth={hovering && focused(si) ? 2 : 1.5} strokeLinejoin="round" />
            {hovering && focused(si) && (
              <g>
                {!stacked && <circle cx={cx} cy={cy} r={7} fill={colourOf(si)} opacity={0.25} />}
                <circle cx={cx} cy={cy} r={MARKER_R} fill={stacked ? "var(--color-core-bg-secondary, #fff)" : colourOf(si)} stroke={stacked ? line : "var(--color-core-bg-secondary, #fff)"} strokeWidth={1} />
              </g>
            )}
          </g>
        );
      })}
    </>
  );
};
