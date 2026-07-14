import React from 'react';
import { ProgressBar } from './ProgressBar';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for ProgressBar.mdx — replicate the Figma spec cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

const example: React.CSSProperties = {
  width: 336,
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

export const AnatomyExample = () => (
  <div style={card}>
    <div style={example}>
      <ProgressBar value={20} />
    </div>
    <div style={example}>
      <ProgressBar label="Field title" value={20} />
    </div>
    <div style={example}>
      <ProgressBar label="Field title" showTooltip value={20} />
    </div>
    <div style={example}>
      <ProgressBar label="Field title" showTooltip showLeadingLabel value={20} />
    </div>
    <div style={example}>
      <ProgressBar label="Field title" showTooltip showTrailingLabel value={20} />
    </div>
  </div>
);

const VALUES = [0, 20, 40, 60, 80, 100];

export const ValuesExample = () => (
  <div style={card}>
    {VALUES.map((value) => (
      <div key={value} style={{ display: 'flex', flexDirection: 'column', gap: 8, ...example }}>
        <span style={exampleLabel}>{value}%</span>
        <ProgressBar value={value} aria-label={`${value}% complete`} />
      </div>
    ))}
  </div>
);
