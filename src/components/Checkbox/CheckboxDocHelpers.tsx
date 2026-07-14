import React from 'react';
import { Checkbox } from './Checkbox';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Checkbox.mdx — replicate the guideline cards.
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
    <Checkbox size="md" label="Items" defaultChecked />
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Deselected</span>
      <Checkbox size="md" label="Label" />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Selected</span>
      <Checkbox size="md" label="Label" defaultChecked />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Indeterminate</span>
      <Checkbox size="md" label="Label" indeterminate />
    </div>
  </div>
);

export const SizesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <Checkbox size="sm" label="Label" defaultChecked />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <Checkbox size="md" label="Label" defaultChecked />
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
      gridTemplateColumns: 'max-content repeat(3, max-content)',
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
    {['Deselected', 'Selected', 'Indeterminate'].map((col) => (
      <span key={col} style={{ ...exampleLabel, textAlign: 'center' }}>{col}</span>
    ))}
    {STATE_ROWS.map((row) => (
      <React.Fragment key={row.name}>
        <span style={exampleLabel}>{row.name}</span>
        <Checkbox size="md" className={row.cls} disabled={row.disabled} />
        <Checkbox size="md" className={row.cls} disabled={row.disabled} defaultChecked />
        <Checkbox size="md" className={row.cls} disabled={row.disabled} indeterminate />
      </React.Fragment>
    ))}
  </div>
);
