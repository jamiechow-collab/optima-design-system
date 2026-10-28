import React, { useId, useRef, useState } from 'react';
import { ChartAxes } from '../ChartAxes';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';
import { straightPath, curvePath } from '../LineChart/LineChart';
import { AreaFills, AreaEdges, stackTotals } from '../AreaChart/AreaLayers';

const MARKER_R = 3.5; // 8px marker incl. 1px stroke
const BAR_MAX = 32; // bar thickness cap (same as the bar chart)
const COLUMN_PAD = 8; // spacing/sm around a bar
const GUIDE = 'var(--color-border-layout-hover, #a1a1a1)'; // dotted hover line

// Colours: bars / areas use group 1 (tide) when single and group 2 when stacked; lines use acorn over a
// single bar / area, and charcoal over a stack (whose layers use the group 2 colours). Exported for legends.
export const comboLayerColour = (index, stacked, state = 'default') => datavisVar(index, stacked ? 'group2' : 'group1', state);
export const comboLineColour = (stacked, state = 'default') => datavisVar(stacked ? 1 : 2, 'group1', state);

/**
 * Combo chart: one or more lines drawn over bars or areas on a single set of axes.
 * categories: x labels.
 * lines: [{ name, values }] — the first line is solid, any further line is dotted.
 * series: [{ name, values }] — the bars / areas under the lines. Without `stacked` only the first
 *   series is drawn (one bar or one area per category); with `stacked` every series is a layer,
 *   the first series on top (the same order as the stacked bar chart).
 * lines[].axis: 'right' plots a line on the second y axis (see rightAxis), whose labels sit on the right.
 * type: 'bar' | 'area'. curve: 'straight' | 'curve' (the lines, and the edges of an area).
 * Hover lists every value at the hovered x in the shared ChartTooltip: the lines first, then the bars / areas.
 */
export const ComboChart = ({
  categories,
  lines,
  series,
  hiddenLines = [], // indices of lines to leave out
  hiddenSeries = [], // indices of bars / areas to leave out; the rest keep their colours
  type = 'bar',
  stacked = false,
  curve = 'straight',
  width: widthProp,
  height: heightProp,
  max = 100,
  tickStep = 20,
  formatValue = (v) => String(v),
  showTooltip = true,
  layerColours, // override the bar / area colours: one { group, index } per series (a datavis colour)
  highlighted = null, // { kind: 'line' | 'series', index } to highlight as if hovered (e.g. from a legend): index is the line / series index; everything else is dismissed
  yTitle, // left axis title
  yTitleRight, // right axis title (with rightAxis)
  rightAxis, // { max, format? } second y axis for lines with axis: 'right'; it has the same number of ticks as the left one
}) => {
  const wrapRef = useRef(null);
  const uid = useId().replace(/:/g, '');
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 540, h: 320 });
  const [hover, setHover] = useState(null); // category index
  const [pointer, setPointer] = useState(null);

  const layerIdx = (stacked ? series.map((_, i) => i) : [0]).filter((i) => !hiddenSeries.includes(i)); // visible → original index
  const layers = layerIdx.map((i) => series[i]);
  const layerColour = (si, state = 'default') => {
    const o = layerColours && layerColours[layerIdx[si]];
    return o ? datavisVar(o.index, o.group, state) : comboLayerColour(layerIdx[si], stacked, state);
  };
  const lineColour = (state = 'default') => comboLineColour(stacked, state);
  // while a legend item is highlighted (and the pointer is off the chart) everything else switches to its dismissed colour
  const highlighting = highlighted !== null && hover === null;
  const layerState = (si) => (highlighting && !(highlighted.kind === 'series' && highlighted.index === layerIdx[si]) ? 'dismissed' : 'default');
  const lineState = (l) => (highlighting && !(highlighted.kind === 'line' && highlighted.index === l.li) ? 'dismissed' : 'default');
  const shownLines = lines.map((l, li) => ({ ...l, li })).filter((l) => !hiddenLines.includes(l.li)); // li keeps the solid / dotted style

  // stack: layers[0] on top, the last layer at the baseline (below[si][ci] .. topOf(si, ci) is layer si)
  const { below, topOf } = stackTotals(layers, categories, stacked);

  const domainMax = Math.max(max, ...shownLines.filter((l) => !(rightAxis && l.axis === 'right')).flatMap((l) => l.values), ...layers.flatMap((_, si) => categories.map((__, ci) => topOf(si, ci))));
  const top = Math.ceil(domainMax / tickStep) * tickStep;
  const yTicks = Array.from({ length: top / tickStep + 1 }, (_, i) => ({ value: i * tickStep, label: formatValue(i * tickStep) }));

  // the right axis shares the left axis' ticks, so a value maps through the ratio of the two maxima
  const rightMax = rightAxis ? rightAxis.max : top;
  const yLabelRight = rightAxis && yTicks.map((t, i) => ({ value: t.value, label: (rightAxis.format || formatValue)((rightMax * i) / (yTicks.length - 1)) }));

  const tooltipProps = () => ({
    header: categories[hover],
    headerValue: 'Data',
    items: [
      ...shownLines.map((l) => ({ label: l.name, value: formatValue(l.values[hover]), colour: lineColour(), shape: l.li === 0 ? 'line' : 'dotted' })),
      ...layers.map((s, si) => ({ label: s.name, value: formatValue(s.values[hover]), colour: layerColour(si), shape: 'filled' })),
    ],
  });

  const draw = ({ x, y: yLeft, plot, bandWidth }) => {
    const y = yLeft;
    const yFor = (l) => (rightAxis && l.axis === 'right' ? (v) => yLeft((v * top) / rightMax) : yLeft);
    const path = curve === 'curve' ? curvePath : straightPath;
    const thick = Math.min(bandWidth - COLUMN_PAD * 2, BAR_MAX);
    const area = { series: layers, categories, stacked, curve, x, y, colourOf: layerColour };
    const w = hover !== null ? 2 : 1.5; // lines thicken while hovering

    const marker = (cx, cy, active, colour) => (
      <>
        {active && <circle cx={cx} cy={cy} r={7} fill={colour} opacity={0.25} />}
        <circle cx={cx} cy={cy} r={MARKER_R} fill={active ? colour : "var(--color-core-bg-secondary, #fff)"} stroke={active ? "var(--color-core-bg-secondary, #fff)" : colour} strokeWidth={1} />
      </>
    );

    return (
      <>
        {type === 'area' && layers.length > 0 && <AreaFills {...area} gradientId={uid} dimmed={(si) => layerState(si) === 'dismissed'} />}
        {type === 'bar' &&
          layers.map((_, si) =>
            categories.map((__, ci) => {
              const lo = below[si][ci];
              const hi = topOf(si, ci);
              return <rect key={`bar${si}-${ci}`} x={x(ci) - thick / 2} y={y(hi)} width={thick} height={Math.max(y(lo) - y(hi), 0)} fill={layerColour(si, layerState(si))} />;
            })
          )}
        {hover !== null && (
          <line x1={Math.round(x(hover)) + 0.5} x2={Math.round(x(hover)) + 0.5} y1={plot.top} y2={plot.bottom} stroke={GUIDE} strokeWidth={1} strokeDasharray="1 2" />
        )}
        {type === 'area' && layers.length > 0 && <AreaEdges {...area} hoverIndex={hover} focused={(si) => layerState(si) === 'default'} />}
        {/* lines sit above the bars / areas; their markers are always shown */}
        {shownLines.map((l) => (
          <g key={l.name}>
            <path
              d={path(l.values.map((v, i) => [x(i), yFor(l)(v)]))}
              fill="none"
              stroke={lineColour(lineState(l))}
              strokeWidth={w}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={l.li === 0 ? undefined : '0.1 3.5'}
            />
            {l.values.map((v, i) => <g key={i}>{marker(x(i), yFor(l)(v), hover === i, lineColour(lineState(l)))}</g>)}
          </g>
        ))}
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
              setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
              if (hover !== ci) setHover(ci);
            }}
            onMouseLeave={() => { setHover(null); setPointer(null); }}
          />
        ))}
      </>
    );
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <ChartAxes width={width} height={height} yTicks={yTicks} yDomain={[0, top]} categories={categories} yAxis={rightAxis ? 'both' : 'left'} yLabelRight={yLabelRight} yTitle={yTitle} yTitleRight={yTitleRight} role="img" aria-label="Combo chart">
        {draw}
      </ChartAxes>
      {showTooltip && hover !== null && pointer && (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip {...tooltipProps()} />
        </CursorTooltip>
      )}
    </div>
  );
};

export default ComboChart;
