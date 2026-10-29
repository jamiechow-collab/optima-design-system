// Shared constants for data-visualisation charts. Values come from the Figma
// DataVis file (axes / bars frames) and reference existing tokens where one exists.
import { datavisCategorical } from '../../tokens/datavis-colors';

export const chartTheme = {
  axisLine: 'var(--color-divider-secondary, #d1d1d1)', // primary axis line
  gridLine: 'var(--color-divider-tertiary, #ede9e3)', // grid lines sit back in the background
  tickLabel: {
    fill: 'var(--color-text-secondary, #474747)',
    fontSize: 12, // Caption/regular
    lineHeight: 16,
    fontWeight: 400,
  },
  axisTitle: { fill: 'var(--color-text-secondary, #474747)', fontSize: 12, fontWeight: 500 },
  barRadius: 8, // radius/md
  surface: 'var(--color-beige-bg-primary, #f9f8f6)',
};

// Pick categorical colours in the curated order for a group — neighbouring
// entries are the most distinguishable, so series N takes the Nth colour.
export const seriesColours = (count, group = 'group2', state = 'default') =>
  datavisCategorical[group].slice(0, count).map((c) => c[state]);

// Cycles through a group's colours in order. state: default | hover | selected | dismissed.
export const seriesColour = (index, group = 'group2', state = 'default') => {
  const list = datavisCategorical[group];
  return list[index % list.length][state];
};

// "Nice" linear scale: maps a value domain to a pixel range. Enough for the
// reference charts without pulling in d3.
export const linearScale = (domain, range) => {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  return (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
};

export const niceTicks = (max, count = 5) => {
  const rough = max / count;
  const mag = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => s >= rough);
  const top = Math.ceil(max / step) * step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
};

// Chart-design additions (axes / legend / tooltip / container) — from Figma DataVis.
export const chartText = {
  fontFamily: 'var(--font-family, Inter, sans-serif)',
  label: 'var(--color-text-disabled, #6e6e6e)', // axis + legend labels
  value: 'var(--color-text-placeholder, #545454)', // tooltip data
  primary: 'var(--color-text-primary, #222)',
};
export const chartDeselected = 'var(--color-core-bg-primary-disabled, #d1d1d1)';

// Hover rule for every chart: the hovered item keeps its default colour (no
// 'hover' colour shift) and all other items switch to 'dismissed'.
export const hoverColourState = (hoveredIndex, index) =>
  hoveredIndex === null || hoveredIndex === undefined || hoveredIndex === index ? 'default' : 'dismissed';

// Readable text colour on a fill: white on dark fills, primary text on light ones. Takes a #rrggbb or #rrggbbaa hex;
// a translucent fill (e.g. a dismissed colour) is judged as it looks over the white card surface.
export const onColour = (hex) => {
  const n = parseInt(hex.slice(1, 7), 16);
  const a = hex.length >= 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  const ch = (v) => 255 * (1 - a) + v * a;
  const lum = 0.299 * ch(n >> 16) + 0.587 * ch((n >> 8) & 255) + 0.114 * ch(n & 255);
  return lum < 140 ? 'var(--color-text-invert, #fff)' : chartText.primary;
};
