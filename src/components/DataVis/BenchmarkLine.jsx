import React from 'react';
import { chartText } from './chartTheme';
import { measure } from './ChartAxes';
import { Icon } from '../Icon/Icon';

const textBase = { fontFamily: chartText.fontFamily, fontSize: 12 };
// A surface-coloured halo keeps the text readable where it crosses bars or gridlines.
const halo = { stroke: 'var(--color-core-bg-secondary, #fff)', strokeWidth: 3, strokeLinejoin: 'round', paintOrder: 'stroke' };
const valueStyle = { ...textBase, fontWeight: 500, fill: chartText.primary, ...halo }; // Caption/medium
const labelStyle = { ...textBase, fontWeight: 400, fill: chartText.label, ...halo }; // Caption/regular
const ICON = 12; // Core icon, size xs
const ICON_GAP = 2; // spacing/xxs between icon and label

/**
 * Reference line across a chart plot area (Figma "Benchmark-line"), drawn in SVG so it can sit
 * inside <ChartAxes> children.
 *
 * Horizontal (value on the y-axis): `y` is the line's pixel y, `x1`–`x2` its extent.
 *   orientation 'right' → label above the line, aligned to the right end
 *               'left'  → label above the line, aligned to the left start
 * Vertical (value on the x-axis): `x` is the line's pixel x, `y1`–`y2` its extent.
 *   orientation 'top'    → label at the top, right of the line
 *               'bottom' → label at the bottom, right of the line
 * Optional: `value` (e.g. "100K") shown above the label, `label` (e.g. "Benchmark"), and `icon`
 * (an Icon name, e.g. "arrow-top-right") shown before the label.
 */
export const BenchmarkLine = ({ type = 'horizontal', orientation, x, y, x1, x2, y1, y2, value, label, icon }) => {
  const line = { stroke: 'var(--color-divider-primary, #474747)', strokeWidth: 1, shapeRendering: 'crispEdges' };
  const hasLabel = label !== undefined && label !== '';
  const iconW = icon ? ICON + ICON_GAP : 0;

  if (type === 'vertical') {
    const side = orientation === 'bottom' ? 'bottom' : 'top';
    const px = Math.round(x) + 0.5;
    const tx = px + 9;
    // two text rows of 16px with 2px between them, 8px clear of the line end; without a value the
    // label takes the row nearest the line end
    const rowA = side === 'bottom' ? y2 - 8 - 18 : y1 + 8; // upper row
    const rowB = side === 'bottom' ? y2 - 8 : y1 + 8 + 18; // lower row
    const labelY = value !== undefined ? rowB : side === 'bottom' ? rowB : rowA;
    return (
      <g>
        <line x1={px} x2={px} y1={y1} y2={y2} {...line} />
        {value !== undefined && <text x={tx} y={rowA} dominantBaseline="central" style={valueStyle}>{value}</text>}
        {hasLabel && (
          <>
            {icon && <Icon name={icon} size="xs" x={tx} y={labelY - ICON / 2} color={chartText.label} />}
            <text x={tx + iconW} y={labelY} dominantBaseline="central" style={labelStyle}>{label}</text>
          </>
        )}
      </g>
    );
  }

  const py = Math.round(y) + 0.5;
  const right = orientation !== 'left';
  const labelY = py - 8 - 8;
  const valueY = py - 8 - 18 - 8;
  const labelW = hasLabel ? measure(label) : 0;
  const blockW = labelW + iconW;
  const startX = right ? x2 - blockW : x1;
  return (
    <g>
      <line x1={x1} x2={x2} y1={py} y2={py} {...line} />
      {value !== undefined && (
        <text x={right ? x2 : x1} y={valueY} textAnchor={right ? 'end' : 'start'} dominantBaseline="central" style={valueStyle}>{value}</text>
      )}
      {hasLabel && (
        <>
          {icon && <Icon name={icon} size="xs" x={startX} y={labelY - ICON / 2} color={chartText.label} />}
          <text x={startX + iconW} y={labelY} dominantBaseline="central" style={labelStyle}>{label}</text>
        </>
      )}
    </g>
  );
};

export default BenchmarkLine;
