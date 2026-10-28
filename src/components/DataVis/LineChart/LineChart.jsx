import React, { useRef, useState } from 'react';
import { ChartAxes } from '../ChartAxes';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';

const MARKER_R = 3.5; // 8px marker incl. 1px stroke
const COLLIDE_R = 8; // points closer than a marker diameter count as overlapping
const GUIDE = 'var(--color-border-layout-hover, #a1a1a1)'; // dotted hover line

// Straight segments through the points.
export const straightPath = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ');

// Smooth Catmull-Rom spline: passes through every point and rounds over peaks and dips. A peak can rise a
// little above its data point (and a dip fall below), which is what makes it round rather than flat-topped.
export const curvePath = (pts) => {
  const n = pts.length;
  if (n < 3) return straightPath(pts);
  const slope = (i) => {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, n - 1)];
    return (b[1] - a[1]) / (b[0] - a[0]);
  };
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const h = (x1 - x0) / 3;
    const c0 = y0 + slope(i) * h;
    const c1 = y1 - slope(i + 1) * h;
    d += ` C${x0 + h},${c0} ${x1 - h},${c1} ${x1},${y1}`;
  }
  return d;
};

/**
 * Hand-built SVG line chart on the shared ChartAxes, with hover shown in the shared ChartTooltip.
 * categories: x labels; series: [{ name, values: [..] }] — one entry for a single line.
 * curve: 'straight' | 'curve'. hoverMode (multiple lines): 'column' lists every line at the hovered
 * x; 'point' shows only the data point under the cursor.
 */
export const LineChart = ({
  categories,
  series: allSeries,
  hiddenSeries = [], // indices of lines to leave out; the rest keep their colours
  curve = 'straight',
  hoverMode = 'column',
  group: groupProp, // datavis colour group: group1 (Tide) for a single line, group2 for several
  width: widthProp,
  height: heightProp,
  yTitle, // optional axis titles (passed to ChartAxes)
  xTitle,
  max = 100,
  tickStep = 20,
  formatValue = (v) => String(v),
  showTooltip = true,
  hoveredIndex,
  onHoverChange,
  highlightedSeries = null, // original index of a line to highlight, as if hovered (e.g. from a legend); the others take their dismissed colours
}) => {
  const wrapRef = useRef(null);
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 540, h: 320 });
  const [localHover, setLocalHover] = useState(null); // { ci, sis } — sis: lines under the cursor (point mode)
  const [pointer, setPointer] = useState(null);
  const controlled = hoveredIndex !== undefined;
  const hover = controlled ? (hoveredIndex === null ? null : { ci: hoveredIndex, sis: null }) : localHover;
  const multiple = allSeries.length > 1;
  const colourIdx = allSeries.map((_, i) => i).filter((i) => !hiddenSeries.includes(i)); // visible → original index
  const series = colourIdx.map((i) => allSeries[i]);
  const group = groupProp || (multiple ? 'group2' : 'group1');
  const colourOf = (si, state = 'default') => datavisVar(colourIdx[si], group, state);
  const pointMode = multiple && hoverMode === 'point';

  const domainMax = Math.max(max, ...series.flatMap((s) => s.values));
  const top = Math.ceil(domainMax / tickStep) * tickStep;
  const yTicks = Array.from({ length: top / tickStep + 1 }, (_, i) => ({ value: i * tickStep, label: formatValue(i * tickStep) }));

  const update = (ci, sis) => {
    const next = ci === null ? null : { ci, sis };
    if (!controlled) setLocalHover(next);
    if (onHoverChange) onHoverChange(ci);
  };

  const tooltipProps = () => {
    const { ci, sis } = hover;
    if (!multiple) return { items: [{ label: categories[ci], value: formatValue(series[0].values[ci]), colour: colourOf(0), shape: 'line' }] };
    if (pointMode && sis && sis.length === 1) {
      const si = sis[0];
      return { items: [{ label: series[si].name, value: formatValue(series[si].values[ci]), colour: colourOf(si), shape: 'line' }] };
    }
    // column mode lists every line; point mode with overlapping points lists just those lines
    const listed = pointMode && sis ? sis : series.map((_, i) => i);
    return {
      header: categories[ci],
      headerValue: 'Data',
      items: listed.map((i) => ({ label: series[i].name, value: formatValue(series[i].values[ci]), colour: colourOf(i), shape: 'line' })),
    };
  };

  // In point mode only the line(s) under the cursor stay highlighted; a controlled hover highlights all.
  const highlighting = highlightedSeries !== null && !hover;
  const focused = (si) => (highlighting ? colourIdx[si] === highlightedSeries : !pointMode || !hover || !hover.sis || hover.sis.includes(si));

  const draw = ({ x, y, plot, bandWidth }) => {
    const path = curve === 'curve' ? curvePath : straightPath;
    return (
      <>
        {hover && (
          <line x1={Math.round(x(hover.ci)) + 0.5} x2={Math.round(x(hover.ci)) + 0.5} y1={plot.top} y2={plot.bottom} stroke={GUIDE} strokeWidth={1} strokeDasharray="1 2" />
        )}
        {/* point hover: the hovered line stays on top, the others switch to their dismissed colour */}
        {[...series.keys()].sort((a, b) => ((pointMode && hover) || highlighting ? (focused(a) ? 1 : 0) - (focused(b) ? 1 : 0) : 0)).map((si) => {
          const s = series[si];
          const line = colourOf(si, !focused(si) ? 'dismissed' : 'default');
          return (
            <g key={s.name}>
              <path d={path(s.values.map((v, i) => [x(i), y(v)]))} fill="none" stroke={line} strokeWidth={(hover || highlighting) && focused(si) ? 2 : 1.5} strokeLinejoin="round" />
              {s.values.map((v, i) => {
                const active = hover && hover.ci === i && focused(si);
                return (
                  <g key={i}>
                    {active && <circle cx={x(i)} cy={y(v)} r={7} fill={colourOf(si)} opacity={0.25} />}
                    <circle cx={x(i)} cy={y(v)} r={MARKER_R} fill={active ? colourOf(si) : "var(--color-core-bg-secondary, #fff)"} stroke={active ? "var(--color-core-bg-secondary, #fff)" : line} strokeWidth={1} />
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* hit areas: one per category column */}
        {categories.map((c, ci) => (
          <rect
            key={`hit${ci}`}
            x={plot.left + ci * bandWidth}
            y={plot.top}
            width={bandWidth}
            height={plot.bottom - plot.top}
            fill="transparent"
            onMouseMove={(e) => {
              const r = wrapRef.current.getBoundingClientRect();
              const px = e.clientX - r.left;
              const py = e.clientY - r.top;
              setPointer({ x: px, y: py });
              let sis = null;
              if (pointMode) {
                // 2D nearest point in this column, plus any lines whose point overlaps it
                const dist = series.map((s) => Math.hypot(x(ci) - px, y(s.values[ci]) - py));
                const nearest = dist.indexOf(Math.min(...dist));
                const ny = y(series[nearest].values[ci]);
                sis = series.map((_, i) => i).filter((i) => i === nearest || Math.abs(y(series[i].values[ci]) - ny) <= COLLIDE_R);
              }
              const key = sis ? sis.join() : '';
              if (!hover || hover.ci !== ci || (hover.sis ? hover.sis.join() : '') !== key) update(ci, sis);
            }}
            onMouseLeave={() => { update(null); setPointer(null); }}
          />
        ))}
      </>
    );
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <ChartAxes
        width={width}
        height={height}
        yTicks={yTicks}
        yDomain={[0, top]}
        categories={categories}
        yTitle={yTitle}
        xTitle={xTitle}
        role="img"
        aria-label="Line chart"
      >
        {draw}
      </ChartAxes>
      {showTooltip && hover && pointer && (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip {...tooltipProps()} />
        </CursorTooltip>
      )}
    </div>
  );
};

export default LineChart;
