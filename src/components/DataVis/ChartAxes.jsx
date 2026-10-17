import React from 'react';
import { chartTheme, chartText, linearScale } from './chartTheme';

// Plot-area geometry from Figma "Axes": y labels sit in a 40px gutter (right-aligned,
// 12px clear of the axis line); x labels sit 12px below the axis line in a 28px gutter.
export const AXIS_GUTTER = 40;
export const AXIS_BOTTOM = 28;
const TICK = 4;

const labelStyle = {
  fontFamily: chartText.fontFamily,
  fontSize: chartTheme.tickLabel.fontSize,
  fontWeight: 400,
  fill: chartText.label,
};


// ── Responsive label helpers ─────────────────────────────────────────────────
// X labels fill the width of their column: they stay on one line when the whole label fits,
// otherwise they wrap (up to two rows). Y labels stay on one line: when the gutter is too
// narrow they are shortened to the first 7 and last 5 characters ("Current...loyed").
let measureCtx;
const measure = (text) => {
  if (typeof document !== 'undefined') {
    measureCtx = measureCtx || document.createElement('canvas').getContext('2d');
    if (measureCtx) {
      measureCtx.font = `400 ${chartTheme.tickLabel.fontSize}px Inter, -apple-system, 'Segoe UI', Roboto, sans-serif`;
      return measureCtx.measureText(String(text)).width;
    }
  }
  return String(text).length * 6.4;
};

export const truncateMiddle = (label) => {
  const t = String(label);
  return t.length > 15 ? `${t.slice(0, 7)}...${t.slice(-5)}` : t;
};

// Fits a y label into `available` px on one line (full label if it fits, shortened otherwise)
const fitYLabel = (label, available) => (measure(label) <= available ? String(label) : truncateMiddle(label));

// Splits an x label into at most two rows that fit `available` px; short labels stay on one row
const wrapXLabel = (label, available, maxRows = 2) => {
  const text = String(label);
  if (text.includes('\n')) return text.split('\n');
  if (measure(text) <= available) return [text];
  const words = text.split(' ');
  const rows = [];
  let row = '';
  words.forEach((w) => {
    const next = row ? `${row} ${w}` : w;
    if (row && measure(next) > available && rows.length < maxRows - 1) {
      rows.push(row);
      row = w;
    } else {
      row = next;
    }
  });
  rows.push(row);
  return rows;
};

/**
 * Cartesian axes with gridlines, optional tick marks and labels.
 * `orientation="horizontal"` puts `categories` on the y-axis and `xTicks` along the x-axis; children get
 * { x(value), y(i) = centre of category band i, bandHeight, plot }.
 * `children` is a render function receiving { x, y, plot } so a chart can draw in the plot area:
 *   x(i) → centre of category band i, bandWidth, y(value) → pixel y, plot → {left,right,top,bottom}.
 */
export const ChartAxes = ({
  width,
  height,
  yTicks,
  yDomain,
  categories = [],
  yAxis = 'left', // left | right | both | none
  xAxis = 'bottom', // bottom | top
  showGridlines = true,
  showXGridlines = false,
  showTicks = false,
  showYLabels = true,
  showXLabels = true,
  yLabelRight, // labels for the right axis (defaults to yTicks)
  leftGutter: leftGutterProp, // default: fits the longest y label, capped at 21% of the width
  bottomGutter: bottomGutterProp, // default: grows when x labels wrap to a second row
  orientation = 'vertical', // vertical | horizontal (categories on the y-axis, values along the x-axis)
  xTicks, // horizontal only: [{ value, label }]
  xDomain, // horizontal only: [min, max] (defaults to first/last xTick)
  children,
  ...rest
}) => {
  const horizontal = orientation === 'horizontal';
  const leftLabels = horizontal ? categories : yTicks.map((t) => t.label);
  const hasLeftAxis = horizontal || yAxis === 'left' || yAxis === 'both';
  const widest = (fn) => Math.max(...leftLabels.map((l) => measure(fn(l))), 0);
  // gutter fits the longest label, capped at 21% of the width — but never narrower than the shortened labels
  const leftGutter =
    leftGutterProp ??
    Math.ceil(Math.max(AXIS_GUTTER, Math.min(widest(String) + 13, Math.max(width * 0.21, widest(truncateMiddle) + 13))));
  const yAvailable = leftGutter - 13;
  const xColumnWidth = horizontal ? 0 : (width - (hasLeftAxis ? leftGutter : 0) - (yAxis === 'right' || yAxis === 'both' ? AXIS_GUTTER : 0)) / Math.max(categories.length, 1);
  const xAvailable = Math.max(xColumnWidth * 0.834 - 8, 24); // label box = column minus Figma's 9.4% / 7.3% insets and 4px padding
  const xRows = horizontal ? [] : categories.map((c) => wrapXLabel(c, xAvailable));
  const maxRows = Math.max(1, ...xRows.map((r) => r.length));
  const bottomGutter = bottomGutterProp ?? AXIS_BOTTOM + (maxRows - 1) * 16;
  if (orientation === 'horizontal') {
    const top = xAxis === 'top';
    const plot = {
      left: leftGutter,
      right: width - 8,
      top: top ? bottomGutter : 8,
      bottom: top ? height - 8 : height - bottomGutter,
    };
    const [v0, v1] = xDomain || [xTicks[0].value, xTicks[xTicks.length - 1].value];
    const x = linearScale([v0, v1], [plot.left, plot.right]);
    const bandHeight = (plot.bottom - plot.top) / Math.max(categories.length, 1);
    // categories read top → bottom; y(i) is the centre of band i
    const y = (i) => plot.top + bandHeight * (i + 0.5);
    const axisY = top ? plot.top : plot.bottom;
    const axisStroke = { stroke: chartTheme.axisLine, strokeWidth: 1, shapeRendering: 'crispEdges' };
    const gridStroke = { stroke: chartTheme.gridLine, strokeWidth: 1, shapeRendering: 'crispEdges' };
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" style={{ overflow: 'visible' }} {...rest}>
        {showGridlines &&
          xTicks.map((t) => {
            const px = Math.round(x(t.value)) + 0.5;
            if (px <= plot.left + 1) return null; // the y-axis line draws the baseline
            return <line key={`g${t.value}`} x1={px} x2={px} y1={plot.top} y2={plot.bottom} {...gridStroke} />;
          })}
        {showXGridlines &&
          categories.map((_, i) => (
            <line key={`gy${i}`} x1={plot.left} x2={plot.right} y1={Math.round(y(i)) + 0.5} y2={Math.round(y(i)) + 0.5} {...gridStroke} />
          ))}

        {children && children({ x, y, plot, bandHeight })}

        <line x1={plot.left} x2={plot.right} y1={axisY + 0.5} y2={axisY + 0.5} {...axisStroke} />
        <line x1={plot.left - 0.5} x2={plot.left - 0.5} y1={plot.top} y2={plot.bottom} {...axisStroke} />

        {showTicks &&
          xTicks.map((t) => (
            <line
              key={`tx${t.value}`}
              x1={Math.round(x(t.value)) + 0.5}
              x2={Math.round(x(t.value)) + 0.5}
              y1={top ? axisY - 4 : axisY + 1}
              y2={top ? axisY - 1 : axisY + 5}
              {...axisStroke}
            />
          ))}
        {showTicks &&
          categories.map((_, i) => (
            <line key={`ty${i}`} x1={plot.left - 5} x2={plot.left - 1} y1={Math.round(y(i)) + 0.5} y2={Math.round(y(i)) + 0.5} {...axisStroke} />
          ))}

        {showYLabels &&
          categories.map((c, i) => (
            <text key={`yl${i}`} x={leftGutter - 13} y={y(i)} textAnchor="end" dominantBaseline="central" style={labelStyle}>
              <title>{c}</title>
              {fitYLabel(c, yAvailable)}
            </text>
          ))}
        {showXLabels &&
          xTicks.map((t) => (
            <text key={`xl${t.value}`} x={x(t.value)} y={top ? axisY - 20 : axisY + 20} textAnchor="middle" dominantBaseline="central" style={labelStyle}>
              {t.label}
            </text>
          ))}
      </svg>
    );
  }
  const hasLeft = yAxis === 'left' || yAxis === 'both';
  const hasRight = yAxis === 'right' || yAxis === 'both';
  const top = xAxis === 'top';
  const plot = {
    left: hasLeft ? leftGutter : 0,
    right: width - (hasRight ? AXIS_GUTTER : 0),
    top: top ? bottomGutter : 8,
    bottom: top ? height - 8 : height - bottomGutter,
  };
  const [d0, d1] = yDomain || [yTicks[0].value, yTicks[yTicks.length - 1].value];
  const y = linearScale([d0, d1], [plot.bottom, plot.top]);
  const band = (plot.right - plot.left) / Math.max(categories.length, 1);
  const x = (i) => plot.left + band * (i + 0.5);
  const xAxisY = top ? plot.top : plot.bottom;
  const axisStroke = { stroke: chartTheme.axisLine, strokeWidth: 1, shapeRendering: 'crispEdges' };
  const gridStroke = { stroke: chartTheme.gridLine, strokeWidth: 1, shapeRendering: 'crispEdges' };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" style={{ overflow: "visible" }} {...rest}>
      {showGridlines &&
        yTicks.map((t) => {
          const py = Math.round(y(t.value)) + 0.5;
          // the baseline (and top axis) is drawn by the axis line itself
          if (Math.abs(py - (xAxisY + 0.5)) < 1) return null;
          return <line key={`g${t.value}`} x1={plot.left} x2={plot.right} y1={py} y2={py} {...gridStroke} />;
        })}
      {showXGridlines &&
        categories.map((_, i) => (
          <line key={`gx${i}`} x1={Math.round(x(i)) + 0.5} x2={Math.round(x(i)) + 0.5} y1={plot.top} y2={plot.bottom} {...gridStroke} />
        ))}

      {children && children({ x, y, plot, bandWidth: band })}

      {/* axis lines */}
      <line x1={plot.left} x2={plot.right} y1={xAxisY + 0.5} y2={xAxisY + 0.5} {...axisStroke} />
      {hasLeft && <line x1={plot.left - 0.5} x2={plot.left - 0.5} y1={plot.top} y2={plot.bottom} {...axisStroke} />}
      {hasRight && <line x1={plot.right + 0.5} x2={plot.right + 0.5} y1={plot.top} y2={plot.bottom} {...axisStroke} />}

      {/* ticks */}
      {showTicks &&
        yTicks.map((t) => (
          <g key={`t${t.value}`}>
            {hasLeft && <line x1={plot.left - TICK - 1} x2={plot.left - 1} y1={Math.round(y(t.value)) + 0.5} y2={Math.round(y(t.value)) + 0.5} {...axisStroke} />}
            {hasRight && <line x1={plot.right + 1} x2={plot.right + TICK + 1} y1={Math.round(y(t.value)) + 0.5} y2={Math.round(y(t.value)) + 0.5} {...axisStroke} />}
          </g>
        ))}
      {showTicks &&
        categories.map((_, i) => (
          <line
            key={`tx${i}`}
            x1={Math.round(x(i)) + 0.5}
            x2={Math.round(x(i)) + 0.5}
            y1={top ? xAxisY - TICK : xAxisY + 1}
            y2={top ? xAxisY - 1 : xAxisY + TICK + 1}
            {...axisStroke}
          />
        ))}

      {/* labels */}
      {showYLabels &&
        yTicks.map((t, i) => (
          <g key={`l${t.value}`}>
            {hasLeft && (
              <text x={leftGutter - 13} y={y(t.value)} textAnchor="end" dominantBaseline="central" style={labelStyle}>
                <title>{t.label}</title>
                {fitYLabel(t.label, yAvailable)}
              </text>
            )}
            {hasRight && (
              <text x={plot.right + 13} y={y(t.value)} textAnchor="start" dominantBaseline="central" style={labelStyle}>
                {(yLabelRight || yTicks)[i].label}
              </text>
            )}
          </g>
        ))}
      {showXLabels &&
        categories.map((c, i) => {
          const lines = xRows[i];
          const base = top ? xAxisY - 20 - (maxRows - 1) * 16 : xAxisY + 20;
          return (
            <text key={`xl${i}`} x={x(i)} textAnchor="middle" dominantBaseline="central" style={labelStyle}>
              <title>{String(c).replace('\n', ' ')}</title>
              {lines.map((ln, k) => (
                <tspan key={k} x={x(i)} y={base + k * 16}>{ln}</tspan>
              ))}
            </text>
          );
        })}
    </svg>
  );
};
