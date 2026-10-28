import React from 'react';
import { datavisCategorical } from '../../tokens/datavis-colors';

const tide = (state) => `var(--color-datavis-tide-${state}, ${datavisCategorical.group1[0][state]})`;

/**
 * Marker for a point on a line / area chart (Figma "Datapoint").
 * state: default — 8px white dot with a coloured outline
 *        hover   — 14px dot with a 25% halo (shown while the cursor is on the point / ruler line)
 *        selected — 8px solid dot in the series' selected colour
 * Colours default to tide (group 1); pass the series colours to use another palette entry.
 */
export const Datapoint = ({
  state = 'default',
  colour = tide('default'),
  hoverColour = tide('hover'), // darker step used for the hover dot + halo
  selectedColour = tide('selected'),
  ...rest
}) => {
  if (state === 'hover') {
    return (
      <svg width={14} height={14} style={{ display: 'block' }} aria-hidden="true" {...rest}>
        <circle cx={7} cy={7} r={7} fill={hoverColour} opacity={0.25} />
        <circle cx={7} cy={7} r={3.5} fill={hoverColour} stroke="var(--color-core-bg-secondary, #fff)" />
      </svg>
    );
  }
  if (state === 'selected') {
    return (
      <svg width={8} height={8} style={{ display: 'block' }} aria-hidden="true" {...rest}>
        <circle cx={4} cy={4} r={3} fill={selectedColour} />
      </svg>
    );
  }
  return (
    <svg width={8} height={8} style={{ display: 'block' }} aria-hidden="true" {...rest}>
      <circle cx={4} cy={4} r={2.5} fill="var(--color-core-bg-secondary, #fff)" stroke={colour} />
    </svg>
  );
};

export default Datapoint;
