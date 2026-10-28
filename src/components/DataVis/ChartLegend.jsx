import React from 'react';
import { chartText, chartDeselected } from './chartTheme';

const SIZE = 16;

// 16px swatch box: filled = 8px square, line = 12×2, dotted = three 2px squares (Figma "Swatch")
export const LegendSwatch = ({ shape = 'filled', colour, deselected = false }) => {
  const fill = deselected ? chartDeselected : colour;
  const box = { width: SIZE, height: SIZE, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexShrink: 0 };
  if (shape === 'line') return <span style={box}><span style={{ width: 12, height: 2, background: fill }} /></span>;
  if (shape === 'dotted')
    return (
      <span style={box}>
        {[0, 1, 2].map((i) => <span key={i} style={{ width: 2, height: 2, background: fill }} />)}
      </span>
    );
  return <span style={box}><span style={{ width: 8, height: 8, background: fill }} /></span>;
};

export const LegendItem = ({ label, colour, shape = 'filled', deselected = false, onClick, onHover }) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      onMouseEnter={onHover ? () => onHover(true) : undefined}
      onMouseLeave={onHover ? () => onHover(false) : undefined}
      onFocus={onHover ? () => onHover(true) : undefined}
      onBlur={onHover ? () => onHover(false) : undefined}
      aria-pressed={onClick ? !deselected : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 2, padding: 0, border: 0, background: 'none',
        cursor: onClick ? 'pointer' : 'default', fontFamily: chartText.fontFamily, fontSize: 12, lineHeight: '16px',
        fontWeight: 400, color: chartText.label, whiteSpace: 'nowrap',
        textDecoration: deselected ? 'line-through' : 'none',
      }}
    >
      <LegendSwatch shape={shape} colour={colour} deselected={deselected} />
      {label}
    </Tag>
  );
};

/**
 * Legend group. items: [{ label, colour, shape?, deselected? }].
 * onItemHover(i | null): called as the pointer or keyboard focus enters / leaves an item, so a chart can highlight that item's data.
 * fit: a vertical legend hugs its items instead of keeping the 153px Figma width (for a legend beside a chart in a widget).
 * `title` is the optional legend title above the items (e.g. the hovered date): centred for the horizontal layout, left-aligned for the vertical ones.
 * layout (Figma "Legend"): horizontal · vertical-right · vertical-left. Both vertical layouts are the same left-aligned list with no padding;
 * they differ only in which side of the chart the legend is placed. `vertical` is an alias of vertical-right.
 */
export const ChartLegend = ({ items, layout = 'horizontal', title, onToggle, onItemHover, align = 'center', fit = false }) => {
  const vertical = layout.startsWith('vertical');
  return (
    <div
      style={{
        display: 'inline-flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box',
        alignItems: vertical ? 'flex-start' : align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {title && (
        <div style={{ fontFamily: chartText.fontFamily, fontSize: 12, lineHeight: '16px', color: chartText.label, textAlign: vertical ? 'left' : 'center', alignSelf: 'stretch' }}>
          {title}
        </div>
      )}
      <div
        style={{
          display: 'flex', flexDirection: vertical ? 'column' : 'row', flexWrap: 'wrap',
          gap: vertical ? 8 : '8px 24px', justifyContent: 'center', alignItems: 'flex-start',
          minWidth: vertical && !fit ? 153 : undefined,
        }}
      >
        {items.map((it, i) => (
          <LegendItem key={`${it.label}-${i}`} {...it} onClick={onToggle ? () => onToggle(i) : undefined} onHover={onItemHover ? (on) => onItemHover(on ? i : null) : undefined} />
        ))}
      </div>
    </div>
  );
};
