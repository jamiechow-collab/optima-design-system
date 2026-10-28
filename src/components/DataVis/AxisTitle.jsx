import React from 'react';
import { chartTheme, chartText } from './chartTheme';

const style = {
  fontFamily: chartText.fontFamily,
  fontSize: chartTheme.tickLabel.fontSize, // Caption/regular
  fontWeight: 400,
  fill: chartText.label,
};

/**
 * Axis title (Figma "Axes title"), drawn in SVG. (cx, cy) is the centre of the 16px-high text box:
 * 'left' and 'right' both read bottom-to-top (rotated -90°, as in Figma), 'top' / 'bottom' are horizontal.
 * <ChartAxes yTitle / xTitle> places it 16px clear of the axis labels; use this directly for custom layouts.
 */
export const AxisTitle = ({ orientation = 'left', cx, cy, children }) => {
  const rotate = orientation === 'left' || orientation === 'right' ? -90 : 0;
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="central"
      transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}
      style={style}
    >
      {children}
    </text>
  );
};

export default AxisTitle;
