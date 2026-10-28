import React from 'react';
import { chartText } from '../chartTheme';
import { useChartSize } from '../useChartSize';
import { sector } from '../DonutChart/DonutChart';
import { Icon } from '../../Icon/Icon';
import typography from '../../../tokens/typography';

const THICKNESS = 0.34; // ring thickness as a share of the outer radius (Figma: ~30px on an 88px radius)
const data2 = typography.data['regular-2']; // Data/regular-2: Sora 20/24, for the value
const caption = typography.caption.regular; // Caption/regular: Inter 12/16, for the label

// Notification colours: the message / positive / negative / warning alert colours.
const STATUS = {
  message: 'var(--color-alert-message, #3393BA)',
  positive: 'var(--color-alert-positive)',
  negative: 'var(--color-alert-negative, #CF3321)',
  warning: 'var(--color-alert-warning, #DD7F03)',
};
const TRACK = 'var(--color-datavis-charcoal-50, #d1d1d1)'; // Charcoal/50

/**
 * Semi-circular gauge: one value on a 0..max scale, with the value and an optional metric label in the hollow.
 * value / max: the filled part of the arc. valueText: the text for the value (default: the percentage).
 * status: 'message' | 'positive' | 'negative' | 'warning' fills the arc with that notification colour;
 *   leave it out to use `colour` (any CSS colour, default Tide) as a custom colour.
 * showValue: the value in the hollow; turn it off (with showLabel) for a small gauge, where text doesn't fit.
 * showLabel: the metric label under the value. icon: node shown before the label — pass any Icon (or null for
 *   none); the default is the up-right arrow.
 * radius: fixed outer radius in px. Leave it out to fit the container (leaving `padding` px around the gauge), up
 *   to maxRadius.
 * A gauge has no hover state.
 */
export const GaugeChart = ({
  value,
  max = 100,
  valueText,
  status,
  colour = 'var(--color-datavis-tide-default, #015989)',
  showValue = true,
  showLabel = true,
  metricLabel = 'Metric label',
  icon = <Icon name="arrow-top-right" size="xs" />,
  radius: radiusProp,
  maxRadius = 80, // the gauge never grows past this, however large the container
  padding = 24,
  width: widthProp,
  height: heightProp,
}) => {
  const wrapRef = React.useRef(null);
  const { width, height } = useChartSize(wrapRef, widthProp, heightProp, { w: 405, h: 280 });
  const ro = radiusProp ?? Math.min(Math.max(Math.min((width - padding * 2) / 2, height - padding * 2), 24), maxRadius);
  const ri = ro * (1 - THICKNESS);
  const cx = width / 2;
  const baseline = height / 2 + ro / 2; // the semi-circle is centred vertically
  const frac = Math.min(Math.max(value / max, 0), 1);
  const fill = status ? STATUS[status] : colour;
  const text = valueText ?? `${Math.round(frac * 100)}%`;
  const start = Math.PI; // left end; the arc runs clockwise over the top to the right end

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: widthProp !== undefined ? widthProp : '100%', height: heightProp !== undefined ? heightProp : '100%' }}>
      <svg width={width} height={height} role="img" aria-label={showValue ? (showLabel ? `${text} ${metricLabel}` : text) : undefined} style={{ display: 'block' }}>
        <path d={sector(cx, baseline, ro, ri, start, start + Math.PI)} fill={TRACK} />
        {frac > 0 && <path d={sector(cx, baseline, ro, ri, start, start + Math.PI * frac)} fill={fill} />}
      </svg>
      {showValue && (
      <div
        style={{
          position: 'absolute', left: cx, bottom: height - baseline + (showLabel ? 0 : 10), transform: 'translateX(-50%)', pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, whiteSpace: 'nowrap', textAlign: 'center',
        }}
      >
        <span style={{ fontFamily: data2.fontFamily, fontWeight: data2.fontWeight, fontSize: data2.fontSize, lineHeight: `${data2.lineHeight}px`, color: chartText.primary }}>{text}</span>
        {showLabel && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontFamily: caption.fontFamily, fontWeight: caption.fontWeight, fontSize: caption.fontSize, lineHeight: `${caption.lineHeight}px`, color: chartText.label }}>
            {icon}
            {metricLabel}
          </span>
        )}
      </div>
      )}
    </div>
  );
};

export default GaugeChart;
