import React from 'react';
import { RadioButton } from './RadioButton';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for RadioButton.mdx — replicate the guideline cards.
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <RadioButton name="overview" size="md" label="Option A" defaultChecked />
      <RadioButton name="overview" size="md" label="Option B" />
      <RadioButton name="overview" size="md" label="Option C" />
    </div>
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Unselected</span>
      <RadioButton size="md" label="Label" />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Selected</span>
      <RadioButton size="md" label="Label" defaultChecked />
    </div>
  </div>
);

export const SizesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <RadioButton size="sm" label="Label" defaultChecked />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <RadioButton size="md" label="Label" defaultChecked />
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
    {['Unselected', 'Selected'].map((col) => (
      <span key={col} style={{ ...exampleLabel, textAlign: 'center' }}>
        {col}
      </span>
    ))}
    {STATE_ROWS.map((row) => (
      <React.Fragment key={row.name}>
        <span style={exampleLabel}>{row.name}</span>
        <RadioButton size="md" className={row.cls} disabled={row.disabled} />
        <RadioButton size="md" className={row.cls} disabled={row.disabled} defaultChecked />
      </React.Fragment>
    ))}
  </div>
);
