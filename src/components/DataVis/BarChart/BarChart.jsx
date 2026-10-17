import React, { useLayoutEffect, useRef, useState } from 'react';
import { chartTheme, chartText, hoverColourState, linearScale, niceTicks } from '../chartTheme';
import { ChartAxes, AXIS_GUTTER, AXIS_BOTTOM } from '../ChartAxes';
import { ChartTooltip } from '../ChartTooltip';
import { datavisCategorical } from '../../../tokens/datavis-colors';

// Colour for a series in a curated group, as a CSS var with the hex as fallback.
export const datavisVar = (index, group = 'group2', state = 'default') => {
  const list = datavisCategorical[group];
  const c = list[index % list.length];
  return `var(--color-datavis-${c.name}-${state}, ${c[state]})`;
};

const BAR_MAX = 32; // bar thickness cap (Figma: max-w 32)
const COLUMN_PAD = 8; // spacing/sm around a simple/stacked bar
const GROUP_PAD = 4; // spacing/xs around a grouped cluster
const GROUP_MAX = 70; // grouped cluster width cap
const VALUE_GAP = 4; // spacing/xs between bar and its value
const PLOT_TOP = 8; // ChartAxes top inset
const H_GUTTER = 56; // room for horizontal category labels

const percent = (v) => `${v}%`;

const labelStyle = {
  fontFamily: chartText.fontFamily,
  fontSize: chartTheme.tickLabel.fontSize, // Caption/regular
  fontWeight: 400,
  fill: chartText.label,
};

const TIP_WIDTH = 176; // ChartTooltip rows are min 160px wide + 8px padding each side

const CURSOR_GAP = 12;

// Tooltip that follows the cursor (x/y relative to the chart): centred above it by
// default, dropping below the cursor when it would leave the top of the chart.
const CursorTooltip = ({ pointer, bounds, children }) => {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight);
  }, [children]);
  const above = pointer.y - CURSOR_GAP - h;
  const top = above >= 0 ? above : pointer.y + CURSOR_GAP;
  const left = Math.min(Math.max(pointer.x - TIP_WIDTH / 2, 0), Math.max(bounds.width - TIP_WIDTH, 0));
  return (
    <div ref={ref} style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10, left, top, width: TIP_WIDTH, visibility: h ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
};

/**
 * Hand-built SVG bar chart drawn on the shared ChartAxes (vertical or horizontal),
 * with hover shown in the shared ChartTooltip.
 * data: [{ label, value }] for simple, [{ label, values: [..] }] for grouped / stacked
 * series: [{ name }] — names for the grouped / stacked series
 */
export const BarChart = ({
  data,
  series = [],
  orientation = 'vertical',
  variant = 'simple',
  colourBy = 'series', // simple only: 'series' (one colour) | 'category' (each bar its own colour, d.colourIndex ?? index)
  group: groupProp, // datavis colour group; defaults to group1 for simple, group2 otherwise
  showValues = false,
  hoveredIndex,
  onHoverChange,
  width = 480,
  height = 280,
  max = 100,
  tickStep, // value-axis tick spacing; defaults to a 'nice' step
  formatValue = percent,
  showTooltip = true,
}) => {
  const [localHover, setLocalHover] = useState(null);
  const [pointer, setPointer] = useState(null); // cursor position relative to the chart
  const wrapRef = useRef(null);
  const controlled = hoveredIndex !== undefined;
  const hover = controlled ? hoveredIndex : localHover;
  const setHover = (i) => {
    if (!controlled) setLocalHover(i);
    if (onHoverChange) onHoverChange(i);
  };

  const horizontal = orientation === 'horizontal';
  const group = groupProp || (variant === 'simple' ? 'group1' : 'group2');
  const byCategory = variant === 'simple' && colourBy === 'category';
  // colour index for a bar: series index, or the category's own index when colouring by category
  const colourIndex = (ci, si) => (byCategory ? data[ci].colourIndex ?? ci : si);
  const stacked = variant === 'stacked';
  const grouped = variant === 'grouped';
  const n = data.length;
  const rowsOf = (d) => (variant === 'simple' ? [d.value] : d.values);
  const seriesCount = variant === 'simple' ? 1 : data[0].values.length;

  const domainMax = Math.max(
    max,
    ...(stacked ? data.map((d) => d.values.reduce((a, b) => a + b, 0)) : data.flatMap(rowsOf))
  );
  const ticks = tickStep
    ? Array.from({ length: Math.ceil(domainMax / tickStep) + 1 }, (_, i) => i * tickStep)
    : niceTicks(domainMax, 5);
  const top = ticks[ticks.length - 1];
  const yTicks = ticks.map((t) => ({ value: t, label: formatValue(t) }));

  const plot = horizontal
    ? { left: H_GUTTER, right: width - 8, top: PLOT_TOP, bottom: height - AXIS_BOTTOM }
    : { left: AXIS_GUTTER, right: width, top: PLOT_TOP, bottom: height - AXIS_BOTTOM };
  const plotW = plot.right - plot.left;
  const plotH = plot.bottom - plot.top;
  const vScale = linearScale([0, top], [0, horizontal ? plotW : plotH]);
  const band = (horizontal ? plotH : plotW) / n;

  // Rect for a bar in category ci, series si, from value v0 to v1.
  const rect = (ci, si, v0, v1) => {
    const cat0 = ci * band;
    let inner0;
    let thick;
    if (grouped) {
      const cluster = Math.min(band - GROUP_PAD * 2, GROUP_MAX);
      thick = cluster / seriesCount;
      inner0 = cat0 + (band - cluster) / 2 + si * thick + 1;
      thick -= 2; // 1px either side of each bar
    } else {
      thick = Math.min(band - COLUMN_PAD * 2, BAR_MAX);
      inner0 = cat0 + (band - thick) / 2;
    }
    const len = vScale(v1) - vScale(v0);
    if (horizontal) return { x: plot.left + vScale(v0), y: plot.top + inner0, w: len, h: thick };
    return { x: plot.left + inner0, y: plot.bottom - vScale(v1), w: thick, h: len };
  };

  const bars = [];
  data.forEach((d, ci) => {
    const vals = rowsOf(d);
    if (stacked) {
      // series 0 sits on top, the last series at the baseline (Figma stack order)
      let acc = 0;
      for (let si = vals.length - 1; si >= 0; si--) {
        bars.push({ ci, si, v: vals[si], ...rect(ci, si, acc, acc + vals[si]) });
        acc += vals[si];
      }
    } else {
      vals.forEach((v, si) => bars.push({ ci, si, v, ...rect(ci, si, 0, v) }));
    }
  });

  const tooltipFor = (ci) => {
    const d = data[ci];
    const b = bars.filter((x) => x.ci === ci);
    const dot = (i) => datavisVar(byCategory ? colourIndex(ci, 0) : i, group, 'default');
    const props = variant === 'simple'
      ? { items: [{ label: d.label, value: formatValue(d.value), colour: dot(0), shape: 'dot' }] }
      : {
          header: d.label,
          items: d.values.map((v, i) => ({ label: series[i]?.name ?? `Series ${i + 1}`, value: formatValue(v), colour: dot(i), shape: 'dot' })),
          ...(stacked ? { total: 'Total', totalValue: formatValue(d.values.reduce((a, c) => a + c, 0)) } : {}),
        };
    const tipWidth = TIP_WIDTH;
    const pos = horizontal
      ? { left: Math.max(...b.map((x) => x.x + x.w)) + (showValues ? 48 : 8), top: b[0].y + b[0].h / 2, transform: 'translateY(-50%)' }
      : { left: b[0].x + b[0].w / 2, top: Math.min(...b.map((x) => x.y)) - (showValues && variant === 'simple' ? 28 : 8), transform: 'translate(-50%, -100%)' };
    return { props, pos: { ...pos, width: tipWidth } };
  };

  const tip = showTooltip && hover !== null && hover !== undefined ? tooltipFor(hover) : null;

  const barShapes = (
    <>
      {bars.map((b) => (
        <rect
          key={`${b.ci}-${b.si}`}
          x={b.x}
          y={b.y}
          width={Math.max(b.w, 0)}
          height={Math.max(b.h, 0)}
          fill={datavisVar(colourIndex(b.ci, b.si), group, hoverColourState(hover, b.ci))}
        />
      ))}
      {/* values (simple variants only) */}
      {showValues && variant === 'simple' && bars.map((b) => (
        horizontal ? (
          <text key={`v${b.ci}`} x={b.x + b.w + VALUE_GAP} y={b.y + b.h / 2} dominantBaseline="central" style={labelStyle}>{formatValue(b.v)}</text>
        ) : (
          <text key={`v${b.ci}`} x={b.x + b.w / 2} y={b.y - VALUE_GAP - 8} textAnchor="middle" dominantBaseline="central" style={labelStyle}>{formatValue(b.v)}</text>
        )
      ))}
      {/* hit areas: one per category band */}
      {data.map((d, ci) => (
        <rect
          key={`hit${ci}`}
          x={horizontal ? plot.left : plot.left + ci * band}
          y={horizontal ? plot.top + ci * band : plot.top}
          width={horizontal ? plotW : band}
          height={horizontal ? band : plotH}
          fill="transparent"
          onMouseEnter={() => setHover(ci)}
          onMouseMove={(e) => {
            const r = wrapRef.current.getBoundingClientRect();
            setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onMouseLeave={() => { setHover(null); setPointer(null); }}
        />
      ))}
    </>
  );

  return (
    <div ref={wrapRef} style={{ position: 'relative', width, height }}>
      <ChartAxes
        {...(horizontal
          ? { orientation: 'horizontal', xTicks: yTicks, xDomain: [0, top], leftGutter: H_GUTTER }
          : { yTicks, yDomain: [0, top] })}
        width={width}
        height={height}
        categories={data.map((d) => d.label)}
        role="img"
        aria-label="Bar chart"
      >
        {() => barShapes}
      </ChartAxes>
      {tip && (pointer ? (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip width={TIP_WIDTH} {...tip.props} />
        </CursorTooltip>
      ) : (
        // no cursor (pinned hover state): anchor beside the hovered bar
        <div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 1, ...tip.pos }}>
          <ChartTooltip width={tip.pos.width} {...tip.props} />
        </div>
      ))}
    </div>
  );
};

export default BarChart;
