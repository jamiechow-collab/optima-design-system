import React from 'react';
import { chartText } from './chartTheme';
import { LegendSwatch } from './ChartLegend';

const row = { display: 'flex', alignItems: 'center', gap: 8, width: '100%', minWidth: 160 };
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
 */
export const ChartTooltip = ({ header, headerValue, items, total, totalValue, width = 176, style }) => (
  <div
    role="tooltip"
    style={{
      width, boxSizing: 'border-box', padding: 8, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start',
      background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 'var(--radius-sm, 4px)',
      boxShadow: '-4px 4px 16px 4px rgba(34,34,34,0.08), 4px 4px 6px -2px rgba(16,24,40,0.03)',
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

// Hovered data point: dark dot with a 25% halo (Figma "Datapoint / Hover")
export const Datapoint = ({ colour = 'var(--color-datavis-lagoon-hover, #004367)' }) => (
  <svg width={14} height={14} style={{ display: 'block' }} aria-hidden="true">
    <circle cx={7} cy={7} r={7} fill={colour} opacity={0.25} />
    <circle cx={7} cy={7} r={3.5} fill={colour} stroke="#fff" />
  </svg>
);
