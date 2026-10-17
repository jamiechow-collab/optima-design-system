import React from 'react';
import { chartText, chartDeselected } from './chartTheme';

const SIZE = 16;

// 16px swatch box: dot = 8px square, line = 12×2, dotted = three 2px squares (Figma "Swatch")
export const LegendSwatch = ({ shape = 'dot', colour, deselected = false }) => {
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

export const LegendItem = ({ label, colour, shape = 'dot', deselected = false, onClick }) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
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
 * `title` is the caption above (e.g. the hovered date).
 * layout (Figma "Registers"): horizontal · vertical-right (list left-aligned, 16px free on the right)
 * · vertical-left (list indented 16px). `vertical` is an alias of vertical-right.
 */
export const ChartLegend = ({ items, layout = 'horizontal', title, onToggle, align = 'center' }) => {
  const vertical = layout.startsWith('vertical');
  const indent = layout === 'vertical-left' ? 16 : 0;
  const trailing = vertical && layout !== 'vertical-left' ? 16 : 0;
  return (
    <div
      style={{
        display: 'inline-flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box',
        alignItems: vertical ? 'flex-start' : align === 'center' ? 'center' : 'flex-start',
        paddingLeft: indent, paddingRight: trailing,
      }}
    >
      {title && (
        <div style={{ fontFamily: chartText.fontFamily, fontSize: 12, lineHeight: '16px', color: chartText.label, textAlign: 'center', alignSelf: 'stretch' }}>
          {title}
        </div>
      )}
      <div
        style={{
          display: 'flex', flexDirection: vertical ? 'column' : 'row', flexWrap: 'wrap',
          gap: vertical ? 8 : '8px 24px', justifyContent: 'center', alignItems: 'flex-start',
          minWidth: vertical ? 153 : undefined,
        }}
      >
        {items.map((it, i) => (
          <LegendItem key={`${it.label}-${i}`} {...it} onClick={onToggle ? () => onToggle(i) : undefined} />
        ))}
      </div>
    </div>
  );
};
