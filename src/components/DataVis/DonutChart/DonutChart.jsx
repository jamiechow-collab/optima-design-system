import React, { useRef, useState } from 'react';
import { chartText, onColour } from '../chartTheme';
import typography from '../../../tokens/typography';
import { ChartTooltip } from '../ChartTooltip';
import { CursorTooltip } from '../CursorTooltip';
import { useChartSize } from '../useChartSize';
import { datavisVar } from '../BarChart/BarChart';
import { datavisCategorical } from '../../../tokens/datavis-colors';

const RING = 0.175; // ring thickness as a share of the diameter (Figma: 21px on a 120px donut)
const LABEL_ROOM = 96; // each side, for the outside data labels
const LEADER = 14; // leader line length
const MIN_ARC = 28; // px of arc a slice needs to fit its percentage
const data2 = typography.data['regular-2']; // Data/regular-2: Sora 20/24, for the total
const bodyRegular = typography.body.regular; // Body/regular: Inter 400 14/20, for the percentages (Figma has Body/medium)

const compact = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${+(n / 1e3).toFixed(1)}K` : String(n));
export const point = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

// Annular sector between angles a0 and a1 (radians, clockwise from 12 o'clock).
export const sector = (cx, cy, ro, ri, a0, a1) => {
  const end = Math.min(a1, a0 + Math.PI * 2 - 0.0001);
  const large = end - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = point(cx, cy, ro, a0);
  const [x1, y1] = point(cx, cy, ro, end);
  const [x2, y2] = point(cx, cy, ri, end);
  const [x3, y3] = point(cx, cy, ri, a0);
  return `M${x0},${y0} A${ro},${ro} 0 ${large} 1 ${x1},${y1} L${x2},${y2} A${ri},${ri} 0 ${large} 0 ${x3},${y3} Z`;
};

/**
 * Hand-built SVG donut chart. Hovering a slice keeps it in its default colour and switches the
 * other slices to their dismissed colours; the tooltip shows the slice's share, value and rank.
 * data: [{ name, value, label?, colourRef? }] — name: tooltip title; label: the data label (defaults to name); colourRef: { group, index } to colour a slice from another datavis group.
 * hiddenSlices: indices of slices to leave out (e.g. from a legend); the rest keep their colours.
 * showPercentage: share inside each slice (hidden on slices too thin to fit it).
 * showTotal / showMetricLabel: centre text — the metric label sits under the total, so it needs showTotal.
 * showLabels: data labels outside the ring with leader lines; showLabelValue adds the value above the label.
 * ring: ring thickness as a share of the diameter (0.5 or more fills the hole: a pie chart); pad: share of the height
 * left empty above and below the chart; padding: the same in px, which takes precedence (for fluid containers). The Pie chart is this component with a full ring and no centre text.
 */
export const DonutChart = ({
  data: allData,
  hiddenSlices = [],
  highlightedSlice = null, // original index of a slice to highlight, as if hovered (e.g. from a legend); the others take their dismissed colours
  group = 'group2',
  showPercentage = false,
  showTotal = true,
  showMetricLabel = true,
  metricLabel = 'Metric label',
  total: totalProp, // text for the centre; defaults to the sum of the values
  showLabels = false,
  showLabelValue = true,
  formatValue = (v) => String(v),
  width: widthProp,
  height: heightProp,
  showTooltip = true,
  ring = RING,
  pad: padProp = 0.22,
  padding: paddingPx,
  ariaLabel = 'Donut chart',
}) => {
  const wrapRef = useRef(null);
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 405, h: 280 });
  const [hover, setHover] = useState(null);
  const [pointer, setPointer] = useState(null);

  const data = allData.map((d, orig) => ({ ...d, orig })).filter((d) => !hiddenSlices.includes(d.orig)); // orig keeps the colour
  const sum = data.reduce((s, d) => s + d.value, 0);
  const ranks = data.map((d) => 1 + data.filter((o) => o.value > d.value).length);
  const room = showLabels ? LABEL_ROOM : 0;
  const pad = paddingPx ?? Math.round(height * padProp); // breathing room above and below (Figma: ~156px donut in a 280px card)
  const diameter = Math.max(Math.min(height - pad * 2, width - room * 2), 80);
  const ro = diameter / 2;
  const ri = Math.max(ro - diameter * ring, 0);
  const cx = width / 2;
  const cy = height / 2;
  const ref = (d) => (d.colourRef ? [d.colourRef.index, d.colourRef.group] : [d.orig, group]); // colourRef: { group, index } picks a slice's colour
  const varOf = (d, state) => datavisVar(ref(d)[0], ref(d)[1], state);
  const focusIdx = hover !== null ? hover : highlightedSlice === null ? null : data.findIndex((d) => d.orig === highlightedSlice); // the slice drawn as hovered
  const isActive = (i) => focusIdx === null || focusIdx < 0 || focusIdx === i;
  const colour = (i) => varOf(data[i], isActive(i) ? 'default' : 'dismissed');

  let acc = 0;
  const slices = data.map((d, i) => {
    const share = d.value / sum;
    const a0 = -Math.PI / 2 + acc * Math.PI * 2;
    acc += share;
    const a1 = -Math.PI / 2 + acc * Math.PI * 2;
    return { ...d, i, share, a0, a1, mid: (a0 + a1) / 2 };
  });

  // outside labels: anchor each at the end of its leader line, then push apart so labels on a side don't overlap
  const labelH = showLabelValue ? 36 : 18;
  const placed = slices.map((s) => {
    const [x1, y1] = point(cx, cy, ro + 2, s.mid);
    const [x2, y2] = point(cx, cy, ro + 2 + LEADER, s.mid);
    return { ...s, x1, y1, x2, y2, right: x2 >= cx, ly: y2 };
  });
  if (showLabels) {
    ['left', 'right'].forEach((side) => {
      const col = placed.filter((p) => (side === 'right') === p.right).sort((a, b) => a.ly - b.ly);
      col.forEach((p, k) => { if (k > 0 && p.ly - col[k - 1].ly < labelH) p.ly = col[k - 1].ly + labelH; });
    });
  }

  const tip = hover === null ? null : slices[hover];
  const tooltipProps = tip && {
    items: [
      { label: tip.name, value: `${Math.round(tip.share * 100)}%`, colour: varOf(tip, 'default'), shape: 'filled' },
      { label: tip.label ?? tip.name, value: formatValue(tip.value), swatch: false },
      { label: 'Rank', value: String(ranks[tip.i]), swatch: false },
    ],
  };

  const text = { fontFamily: chartText.fontFamily };
  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <svg width={width} height={height} role="img" aria-label={ariaLabel} style={{ display: 'block' }}>
        {slices.map((s) => (
          <path
            key={s.i}
            d={sector(cx, cy, ro, ri, s.a0, s.a1)}
            fill={colour(s.i)}
            stroke="var(--color-core-bg-secondary, #fff)"
            strokeWidth={1}
            onMouseMove={(e) => {
              const r = wrapRef.current.getBoundingClientRect();
              setPointer({ x: e.clientX - r.left, y: e.clientY - r.top });
              if (hover !== s.i) setHover(s.i);
            }}
            onMouseLeave={() => { setHover(null); setPointer(null); }}
          />
        ))}
        {showPercentage &&
          slices.map((s) => {
            const rm = ri === 0 ? ro * 0.6 : (ro + ri) / 2; // pie: a little beyond half-way, where the slice is wider
            if ((s.a1 - s.a0) * rm < MIN_ARC) return null;
            const [x, y] = point(cx, cy, rm, s.mid);
            const [ci, cg] = ref(s);
            const list = datavisCategorical[cg];
            const fillHex = list[ci % list.length][isActive(s.i) ? 'default' : 'dismissed'];
            return (
              <text key={`p${s.i}`} x={x} y={y} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={{ ...text, fontSize: bodyRegular.fontSize, fontWeight: bodyRegular.fontWeight, fill: onColour(fillHex) }}>
                {Math.round(s.share * 100)}%
              </text>
            );
          })}
        {showLabels &&
          placed.map((p) => {
            const lead = varOf(p, isActive(p.i) ? 'default' : 'dismissed');
            const tx = p.right ? p.x2 + 4 : p.x2 - 4;
            const anchor = p.right ? 'start' : 'end';
            return (
              <g key={`l${p.i}`} pointerEvents="none">
                <polyline points={`${p.x1},${p.y1} ${p.x2},${p.y2} ${p.x2},${p.ly}`} fill="none" stroke={lead} strokeWidth={1} />
                {showLabelValue && (
                  <text x={tx} y={p.ly - 9} textAnchor={anchor} dominantBaseline="central" style={{ ...text, fontSize: 14, fontWeight: 500, fill: chartText.primary }}>{formatValue(p.value)}</text>
                )}
                <text x={tx} y={showLabelValue ? p.ly + 9 : p.ly} textAnchor={anchor} dominantBaseline="central" style={{ ...text, fontSize: 12, fill: chartText.label }}>{p.label ?? p.name}</text>
              </g>
            );
          })}
      </svg>
      {showTotal && (
        <div style={{ position: 'absolute', left: cx, top: cy, transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: 2, whiteSpace: 'nowrap' }}>
          <span style={{ fontFamily: data2.fontFamily, fontWeight: data2.fontWeight, fontSize: data2.fontSize, lineHeight: `${data2.lineHeight}px`, color: chartText.primary }}>{totalProp ?? compact(sum)}</span>
          {showMetricLabel && <span style={{ ...text, fontSize: 12, lineHeight: '16px', color: chartText.label }}>{metricLabel}</span>}
        </div>
      )}
      {showTooltip && tip && pointer && (
        <CursorTooltip pointer={pointer} bounds={{ width, height }}>
          <ChartTooltip {...tooltipProps} />
        </CursorTooltip>
      )}
    </div>
  );
};

export default DonutChart;
