import React from 'react';
import { Slider } from './Slider';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Slider.mdx — replicate the Figma spec cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

const row: React.CSSProperties = {
  width: 334,
};

export const AnatomyExample = () => (
  <div style={card}>
    <div style={row}>
      <Slider value={[25, 75]} showLabels onChange={() => {}} />
    </div>
  </div>
);

const VALUE_PAIRS: [number, number][] = [
  [0, 0],
  [0, 25],
  [0, 50],
  [0, 75],
  [0, 100],
  [25, 50],
  [25, 75],
  [25, 100],
  [50, 75],
  [50, 100],
  [75, 100],
];

export const ValuesExample = () => (
  <div style={card}>
    {VALUE_PAIRS.map(([low, high]) => (
      <div key={`${low}-${high}`} style={row}>
        <Slider value={[low, high]} showLabels onChange={() => {}} />
      </div>
    ))}
  </div>
);

export const StatesExample = () => (
  <div style={{ ...card, gap: 32 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: '#1E293B' }}>Default</span>
      <div style={row}>
        <Slider value={[25, 75]} showLabels onChange={() => {}} />
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: '#1E293B' }}>Disabled</span>
      <div style={row}>
        <Slider value={[25, 75]} showLabels disabled onChange={() => {}} />
      </div>
    </div>
  </div>
);
