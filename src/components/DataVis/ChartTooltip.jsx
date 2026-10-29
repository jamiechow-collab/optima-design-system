import React from 'react';
import { chartText } from './chartTheme';
import { LegendSwatch } from './ChartLegend';

const row = { display: 'flex', alignItems: 'center', gap: 8, width: '100%', minWidth: 100 };
const labelCss = { flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, lineHeight: '16px', fontWeight: 500, color: chartText.primary };
const dataCss = { fontSize: 12, lineHeight: '16px', fontWeight: 400, color: chartText.value, textAlign: 'right', whiteSpace: 'nowrap' };
const ellipsis = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };

const Divider = () => (
  <div style={{ padding: '4px 0', width: '100%', boxSizing: 'border-box' }}>
    <div style={{ height: 1, background: 'var(--color-divider-tertiary, #ede9e3)' }} />
  </div>
);

export const TooltipItem = ({ label, value, colour, shape = 'line', swatch = true }) => (
  <div style={row}>
    <div style={labelCss}>
      {swatch && <LegendSwatch shape={shape} colour={colour} />}
      <span style={ellipsis}>{label}</span>
    </div>
    {value !== undefined && <span style={dataCss}>{value}</span>}
  </div>
);

/**
 * Hover tooltip for a chart: optional header (e.g. the date) + series items + optional total.
 * items: [{ label, value, colour, shape? }]
 * Hugs its content: each row is at least 100px wide (116px with the 8px padding), and the tooltip is at most 240px.
 */
export const ChartTooltip = ({ header, headerValue, items, total, totalValue, width, style }) => (
  <div
    role="tooltip"
    style={{
      width: width ?? 'max-content', minWidth: 116, maxWidth: 240, boxSizing: 'border-box', padding: 8, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start',
      background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 'var(--radius-md, 8px)',
      boxShadow: 'var(--shadow-lg, 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08))',
      fontFamily: chartText.fontFamily, ...style,
    }}
  >
    {header !== undefined && (
      <div style={{ width: '100%' }}>
        <TooltipItem label={header} value={headerValue} swatch={false} />
        <Divider />
      </div>
    )}
    {items.map((it, i) => <TooltipItem key={`${it.label}-${i}`} {...it} />)}
    {total !== undefined && (
      <div style={{ width: '100%' }}>
        <Divider />
        <TooltipItem label={total} value={totalValue} swatch={false} />
      </div>
    )}
  </div>
);

// Dotted vertical guide that follows the pointer (Figma "Hoverline")
export const Hoverline = ({ height = 329 }) => (
  <svg width={1} height={height} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
    <line x1={0.5} x2={0.5} y1={0} y2={height} stroke="var(--color-border-layout-hover, #a1a1a1)" strokeWidth={1} strokeDasharray="1 2" />
  </svg>
);

export { Datapoint } from './Datapoint';
