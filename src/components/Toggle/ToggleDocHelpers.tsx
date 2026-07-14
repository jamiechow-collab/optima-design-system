import React from 'react';
import { Toggle } from './Toggle';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Toggle.mdx — replicate the guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 80,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
  flexWrap: 'wrap',
};

const example: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

export const OverviewExample = () => (
  <div style={{ ...card, gap: 0 }}>
    <Toggle size="md" label="Dark Mode" defaultChecked />
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Off</span>
      <Toggle size="md" label="Dark Mode" />
    </div>
    <div style={example}>
      <span style={exampleLabel}>On</span>
      <Toggle size="md" label="Dark Mode" defaultChecked />
    </div>
  </div>
);

export const SizesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <Toggle size="sm" label="Dark Mode" defaultChecked />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <Toggle size="md" label="Dark Mode" defaultChecked />
    </div>
  </div>
);

const STATE_ROWS: { name: string; cls?: string; disabled?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', cls: 'is-hover' },
  { name: 'Focused', cls: 'is-focused' },
  { name: 'Disabled', disabled: true },
];

export const StatesExample = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'max-content repeat(2, max-content)',
      columnGap: 48,
      rowGap: 24,
      alignItems: 'center',
      padding: 32,
      border: '1px solid #D1D1D1',
      borderRadius: 16,
      background: '#fff',
    }}
  >
    <span />
    {['Off', 'On'].map((col) => (
      <span key={col} style={{ ...exampleLabel, textAlign: 'center' }}>
        {col}
      </span>
    ))}
    {STATE_ROWS.map((row) => (
      <React.Fragment key={row.name}>
        <span style={exampleLabel}>{row.name}</span>
        <Toggle size="md" className={row.cls} disabled={row.disabled} />
        <Toggle size="md" className={row.cls} disabled={row.disabled} defaultChecked />
      </React.Fragment>
    ))}
  </div>
);
