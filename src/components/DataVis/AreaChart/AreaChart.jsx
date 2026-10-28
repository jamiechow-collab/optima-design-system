import React, { useId, useRef, useState } from 'react';
import { ChartAxes } from '../ChartAxes';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';
import { AreaFills, AreaEdges, stackTotals } from './AreaLayers';

const COLLIDE_R = 8; // points closer than a marker diameter count as overlapping
const GUIDE = 'var(--color-border-layout-hover, #a1a1a1)'; // dotted hover line

/**
 * Hand-built SVG area chart on the shared ChartAxes, with hover shown in the shared ChartTooltip.
 * categories: x labels; series: [{ name, values: [..] }] — one entry for a single area.
 * curve: 'straight' | 'curve'.
 * stacked: false — every area runs from the axis and overlaps (fills fade to 0% towards the axis);
 *          hovering picks one area, the others switch to their dismissed colour.
 *          true — areas are stacked in series order (first series on top, like the stacked bar chart) with flat fills;
 *          hovering lists every layer at the hovered x.
 */
export const AreaChart = ({
  categories,
  series: allSeries,
  hiddenSeries = [], // indices of series to leave out; the rest keep their colours
  curve = 'straight',
  stacked = false,
  group: groupProp, // datavis colour group: group1 (Tide) for a single area, group2 for several
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
  highlightedSeries = null, // original index of a series to highlight, as if hovered (e.g. from a legend); the others take their dismissed colours
}) => {
  const wrapRef = useRef(null);
  const uid = useId().replace(/:/g, '');
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 540, h: 320 });
  const [localHover, setLocalHover] = useState(null); // { ci, sis } — sis: areas under the cursor (standard, multiple)
  const [pointer, setPointer] = useState(null);
  const controlled = hoveredIndex !== undefined;
  const hover = controlled ? (hoveredIndex === null ? null : { ci: hoveredIndex, sis: null }) : localHover;
  const multiple = allSeries.length > 1;
  const colourIdx = allSeries.map((_, i) => i).filter((i) => !hiddenSeries.includes(i)); // visible → original index
  const series = colourIdx.map((i) => allSeries[i]);
  const group = groupProp || (multiple ? 'group2' : 'group1');
  const colourOf = (si, state = 'default') => datavisVar(colourIdx[si], group, state);
  const pointMode = multiple && !stacked;

  const { topOf } = stackTotals(series, categories, stacked);

  const domainMax = Math.max(max, ...series.flatMap((_, si) => categories.map((__, ci) => topOf(si, ci))));
  const top = Math.ceil(domainMax / tickStep) * tickStep;
  const yTicks = Array.from({ length: top / tickStep + 1 }, (_, i) => ({ value: i * tickStep, label: formatValue(i * tickStep) }));

  // In point hover only the area(s) under the cursor stay highlighted; a controlled hover highlights all.
  const highlighting = highlightedSeries !== null && !hover;
  const focused = (si) => (highlighting ? colourIdx[si] === highlightedSeries : !pointMode || !hover || !hover.sis || hover.sis.includes(si));

  const update = (ci, sis) => {
    const next = ci === null ? null : { ci, sis };
    if (!controlled) setLocalHover(next);
    if (onHoverChange) onHoverChange(ci);
  };

  const tooltipProps = () => {
    const { ci, sis } = hover;
    const item = (i) => ({ label: series[i].name, value: formatValue(series[i].values[ci]), colour: colourOf(i), shape: 'filled' });
    let listed = series.map((_, i) => i); // stacked: top layer first, matching the stack
    if (!stacked && pointMode && sis) listed = sis;
    return { header: categories[ci], headerValue: 'Data', items: listed.map(item) };
  };

  const draw = ({ x, y, plot, bandWidth }) => {
    const order = [...series.keys()].sort((a, b) => ((pointMode && hover) || highlighting ? (focused(a) ? 1 : 0) - (focused(b) ? 1 : 0) : 0));
    const shared = { series, categories, stacked, curve, x, y, colourOf, order };

    return (
      <>
        {/* areas first so every line sits above every fill */}
        <AreaFills {...shared} gradientId={uid} dimmed={(si) => ((pointMode && hover) || highlighting) && !focused(si)} />
        {hover && (
          <line x1={Math.round(x(hover.ci)) + 0.5} x2={Math.round(x(hover.ci)) + 0.5} y1={plot.top} y2={plot.bottom} stroke={GUIDE} strokeWidth={1} strokeDasharray="1 2" />
        )}
        <AreaEdges {...shared} hoverIndex={hover ? hover.ci : null} focused={focused} />
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
                // 2D nearest point in this column, plus any areas whose point overlaps it
                const dist = series.map((_, si) => Math.hypot(x(ci) - px, y(topOf(si, ci)) - py));
                const nearest = dist.indexOf(Math.min(...dist));
                const ny = y(topOf(nearest, ci));
                sis = series.map((_, i) => i).filter((i) => i === nearest || Math.abs(y(topOf(i, ci)) - ny) <= COLLIDE_R);
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
        yTitle={yTitle}
        xTitle={xTitle}
        yDomain={[0, top]}
        categories={categories}
        role="img"
        aria-label={stacked ? 'Stacked area chart' : 'Area chart'}
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

export default AreaChart;
