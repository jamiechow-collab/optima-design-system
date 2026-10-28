import React from 'react';
import { tide, unit } from './shared';

const CELL = 8;
const GAP = 1;
const SHADES = [950, 600, 100, 20]; // darkest (biggest values) to lightest, four steps in Tide

/**
 * Mini cell: the unit of the mini heatmap, an 8 x 8 square in one of four Tide shades.
 * shade: 0 (darkest) .. 3 (lightest).
 */
export const MiniCell = ({ shade }) => (
  <svg width={CELL} height={CELL} aria-hidden="true" style={{ display: 'block' }}>
    <rect width={CELL} height={CELL} fill={tide(SHADES[shade])} />
  </svg>
);

/**
 * Mini heatmap: a grid of 8px cells with a 1px gap, coloured in four steps by value (Figma 30x10, 20x10, 10x5, 7x4).
 * values: rows of numbers; the range (domain, default the data's min and max) is split into four equal bins, and the
 * bigger the value the darker the cell. There are no labels, axes or hover state.
 */
export const MiniHeatmap = ({ values, domain }) => {
  const rows = values.length;
  const cols = values[0].length;
  const flat = values.flat();
  const [min, max] = domain || [Math.min(...flat), Math.max(...flat)];
  const width = cols * (CELL + GAP) - GAP;
  const height = rows * (CELL + GAP) - GAP;
  return (
    <svg width={width} height={height} role="img" aria-label={`Heatmap ${cols} by ${rows}`} style={{ display: 'block', flexShrink: 0 }}>
      {values.map((row, r) =>
        row.map((v, c) => {
          const bin = Math.min(Math.floor(unit(v, min, max) * 4), 3);
          return <rect key={`${r}-${c}`} x={c * (CELL + GAP)} y={r * (CELL + GAP)} width={CELL} height={CELL} fill={tide(SHADES[3 - bin])} />;
        })
      )}
    </svg>
  );
};

export default MiniHeatmap;
