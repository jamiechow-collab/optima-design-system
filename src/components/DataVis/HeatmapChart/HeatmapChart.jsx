import React, { useMemo, useRef, useState } from 'react';
import { chartTheme, chartText } from '../chartTheme';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisSequential } from '../../../tokens/datavis-colors';
import typography from '../../../tokens/typography';

const caption = typography.caption.regular; // Caption/regular: Inter 12/16, for the labels and cell values
const BINS = 9; // the legend and the colours have nine steps
const TOP = 8;
const RIGHT = 8;
const X_LABELS = 28; // room under the plot for the column labels
const LEGEND = 44; // gap + bar + tick labels
const CHAR = 6.4; // average label character width at 12px, to size the left margin
// legend tick text: compact thousands / millions, and only as many decimals as the step between ticks needs
const compact = (n, step) => {
  const d = step >= 10 ? 0 : step >= 1 ? 1 : 2;
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${+(n / 1e3).toFixed(1)}K`;
  return String(+n.toFixed(d));
};

/**
 * Hand-built SVG heatmap: a grid of cells coloured by value, with a nine-step legend.
 * xLabels: the columns; yLabels: the rows; values: yLabels.length rows of xLabels.length numbers.
 * Colour comes from a sequential palette (tide, charcoal or acorn): the value range (domain, default the data's min and
 * max) is split into nine equal bins and the bigger the value the darker the cell, as in the legend.
 * showValues: each cell's value in a small white label, which stays readable on any cell colour.
 * Hovering a cell darkens it one step (the darkest step stays as it is), gives it a 2px invert border (colour/border/invert)
 * and shadow-lg, and shows a tooltip: the column and
 * its total, the row and its total, and the cell's own value.
 */
export const HeatmapChart = ({
  xLabels,
  yLabels,
  values,
  domain,
  palette = 'tide',
  showValues = true,
  formatValue = (v) => v.toLocaleString(),
  width: widthProp,
  height: heightProp,
  showTooltip = true,
}) => {
  const wrapRef = useRef(null);
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 540, h: 320 });
  const [hover, setHover] = useState(null); // { r, c }
  const [pointer, setPointer] = useState(null);

  const flat = values.flat();
  const [min, max] = domain || [Math.min(...flat), Math.max(...flat)];
  const steps = useMemo(() => {
    // nine of the palette's twelve steps, evenly spread, darkest first (950 ... 20)
    const keys = Object.keys(datavisSequential[palette]).map(Number).sort((a, b) => b - a);
    return Array.from({ length: BINS }, (_, i) => keys[Math.round((i * (keys.length - 1)) / (BINS - 1))]);
  }, [palette]);
  const colour = (step) => `var(--color-datavis-${palette}-${step}, ${datavisSequential[palette][step]})`;
  const binOf = (v) => (max === min ? BINS - 1 : Math.min(Math.max(Math.floor(((v - min) / (max - min)) * BINS), 0), BINS - 1));
  const stepIndex = (v) => BINS - 1 - binOf(v); // 0 = darkest = biggest values

  const left = Math.min(Math.max(...yLabels.map((l) => l.length)) * CHAR + 16, width * 0.25);
  const plot = { x: left, y: TOP, w: width - left - RIGHT, h: Math.max(height - TOP - X_LABELS - LEGEND, 40) };
  const cw = plot.w / xLabels.length;
  const ch = plot.h / yLabels.length;
  const colTotal = (c) => values.reduce((s, row) => s + row[c], 0);
  const rowTotal = (r) => values[r].reduce((s, v) => s + v, 0);

  const text = { fontFamily: caption.fontFamily, fontWeight: caption.fontWeight, fontSize: caption.fontSize };
  const legendY = plot.y + plot.h + X_LABELS + 8;
  const seg = plot.w / BINS;
  const edgeValue = (i) => max - ((max - min) * i) / BINS; // darkest (biggest) on the left
  const crowded = seg < 40;

  const tooltipProps = () => {
    const { r, c } = hover;
    return {
      items: [
        { label: xLabels[c], value: formatValue(colTotal(c)), swatch: false },
        { label: yLabels[r], value: formatValue(rowTotal(r)), swatch: false },
        { label: 'Total', value: formatValue(values[r][c]), colour: colour(steps[stepIndex(values[r][c])]), shape: 'filled' },
      ],
    };
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <svg width={width} height={height} role="img" aria-label="Heatmap" style={{ display: 'block' }}>
        {values.map((row, r) =>
          row.map((v, c) => {
            const idx = stepIndex(v);
            const x = plot.x + c * cw;
            const y = plot.y + r * ch;
            return (
              <g key={`${r}-${c}`} onMouseMove={(e) => { const b = wrapRef.current.getBoundingClientRect(); setPointer({ x: e.clientX - b.left, y: e.clientY - b.top }); if (!hover || hover.r !== r || hover.c !== c) setHover({ r, c }); }} onMouseLeave={() => { setHover(null); setPointer(null); }}>
                <rect x={x} y={y} width={cw} height={ch} fill={colour(steps[idx])} stroke="var(--color-core-bg-secondary, #fff)" strokeWidth={1} />
                {showValues && cw >= 36 && ch >= 22 && (
                  <g pointerEvents="none">
                    <rect x={x + cw / 2 - (formatValue(v).length * 6.2 + 8) / 2} y={y + ch / 2 - 8} width={formatValue(v).length * 6.2 + 8} height={16} rx={2} fill="var(--color-core-bg-secondary, #fff)" />
                    <text x={x + cw / 2} y={y + ch / 2} textAnchor="middle" dominantBaseline="central" style={{ ...text, fill: chartText.primary }}>{formatValue(v)}</text>
                  </g>
                )}
              </g>
            );
          })
        )}
        {/* axes */}
        <line x1={plot.x} x2={plot.x} y1={plot.y} y2={plot.y + plot.h} stroke={chartTheme.axisLine} />
        <line x1={plot.x} x2={plot.x + plot.w} y1={plot.y + plot.h} y2={plot.y + plot.h} stroke={chartTheme.axisLine} />
        {yLabels.map((l, r) => (
          <text key={`y${r}`} x={plot.x - 8} y={plot.y + r * ch + ch / 2} textAnchor="end" dominantBaseline="central" style={{ ...text, fill: chartText.label }}>{l}</text>
        ))}
        {xLabels.map((l, c) => (
          <text key={`x${c}`} x={plot.x + c * cw + cw / 2} y={plot.y + plot.h + 16} textAnchor="middle" style={{ ...text, fill: chartText.label }}>{l}</text>
        ))}
        {/* legend: nine steps, biggest values (darkest) on the left */}
        {steps.map((s, i) => (
          <rect key={`g${i}`} x={plot.x + i * seg} y={legendY} width={seg} height={8} fill={colour(s)} />
        ))}
        {Array.from({ length: BINS + 1 }, (_, i) => (crowded && i % 2 === 1 ? null : (
          <g key={`t${i}`}>
            <line x1={plot.x + i * seg} x2={plot.x + i * seg} y1={legendY + 8} y2={legendY + 12} stroke={chartTheme.axisLine} />
            <text x={plot.x + i * seg} y={legendY + 26} textAnchor={i === 0 ? 'start' : i === BINS ? 'end' : 'middle'} style={{ ...text, fill: chartText.label }}>{compact(edgeValue(i), (max - min) / BINS)}</text>
          </g>
        )))}
      </svg>
      {hover && (() => {
        // the hovered cell is lifted above the grid: one step darker, a 2px invert border and shadow-lg
        const v = values[hover.r][hover.c];
        const idx = stepIndex(v);
        const label = formatValue(v);
        return (
          <div
            style={{
              position: 'absolute', left: plot.x + hover.c * cw, top: plot.y + hover.r * ch, width: cw, height: ch, boxSizing: 'border-box',
              background: colour(steps[idx > 0 ? idx - 1 : idx]), border: '2px solid var(--color-border-invert, #fff)', boxShadow: 'var(--shadow-lg, 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
            }}
          >
            {showValues && cw >= 36 && ch >= 22 && (
              <span style={{ ...text, background: 'var(--color-core-bg-secondary, #fff)', color: chartText.primary, borderRadius: 2, padding: '0 4px', lineHeight: '16px' }}>{label}</span>
            )}
          </div>
        );
      })()}
      {showTooltip && hover && pointer && (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip {...tooltipProps()} />
        </CursorTooltip>
      )}
    </div>
  );
};

export default HeatmapChart;
