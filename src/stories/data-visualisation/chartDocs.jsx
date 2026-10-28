// Page chrome shared by the Data Visualisation chart-type stories.
import React, { useState } from 'react';
import { ChartLegend } from '../../components/DataVis/ChartLegend';
import { datavisVar } from '../../components/DataVis/BarChart';
import { fontFamily } from '../../tokens/typography';

export const Page = ({ children }) => (
  <div style={{ padding: 32, background: 'var(--color-beige-bg-primary, #f9f8f6)', fontFamily, color: 'var(--color-text-primary, #222)' }}>
    {children}
  </div>
);
export const Heading = ({ children }) => (
  <h2 style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, margin: '0 0 16px' }}>{children}</h2>
);
export const Sub = ({ children }) => (
  <h3 style={{ fontSize: 20, lineHeight: '28px', fontWeight: 600, margin: '32px 0 12px' }}>{children}</h3>
);
export const Body = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, maxWidth: 760, margin: '0 0 12px' }}>{children}</p>
);
export const Caption = ({ children }) => (
  <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--color-text-secondary, #474747)', marginTop: 8 }}>{children}</div>
);
export const Card = ({ children, caption }) => (
  <div>
    <div style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, padding: 16, display: 'inline-block' }}>{children}</div>
    {caption && <Caption>{caption}</Caption>}
  </div>
);
export const Grid = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>{children}</div>
);

export const MIN = 250; // smallest the live demo box can be dragged to
const DEMO_H = 320;

// Fluid demo: fills the box (which follows the page width); drag the corner to resize width and height.
// `legend` (optional) sits under the chart inside the box.
export const LiveDemo = ({ children, legend, min = MIN }) => (
  <div style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, padding: 16 }}>
    <div style={{ resize: 'both', overflow: 'hidden', width: '100%', maxWidth: '100%', height: DEMO_H, minWidth: min, minHeight: min, padding: '0 16px 4px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg, 16px)' }}>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
      {legend && <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>{legend}</div>}
    </div>
    <Caption>Live demo: resize the browser window, or drag the bottom-right corner of this box (min. {min}px wide and tall)</Caption>
  </div>
);

/**
 * LiveDemo for a multi-series chart. With `showLegend`, a selectable legend sits under the chart and
 * clicking an item hides / shows that series (the last visible one can't be hidden).
 * seriesNames: legend labels in series order; group: datavis colour group; shape: legend swatch shape.
 * children: (hiddenSeries, highlighted) => chart element; highlighted is the legend item being hovered (or null).
 */
export const LegendDemo = ({ showLegend, seriesNames, group = 'group2', shape = 'filled', children }) => {
  const [hidden, setHidden] = useState([]);
  const [highlighted, setHighlighted] = useState(null); // legend item under the pointer
  const toggle = (i) =>
    setHidden((h) => {
      if (h.includes(i)) return h.filter((x) => x !== i);
      return seriesNames.length - h.length > 1 ? [...h, i] : h;
    });
  const items = seriesNames.map((label, i) => ({ label, colour: datavisVar(i, group, 'default'), shape, deselected: hidden.includes(i) }));
  return (
    <LiveDemo legend={showLegend ? <ChartLegend items={items} onToggle={toggle} onItemHover={setHighlighted} /> : null}>
      {children(showLegend ? hidden : [], showLegend && highlighted !== null && !hidden.includes(highlighted) ? highlighted : null)}
    </LiveDemo>
  );
};
