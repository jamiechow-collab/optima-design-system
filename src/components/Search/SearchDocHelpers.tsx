import React from 'react';
import { Search } from './Search';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Search.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 40,
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
  width: 320,
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

export const OverviewExample = () => (
  <div style={{ ...card, width: 'fit-content' }}>
    <div style={{ width: 320 }}>
      <Search size="sm" placeholder="placeholder text" />
    </div>
  </div>
);

export const SizeExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <Search size="sm" placeholder="placeholder text" />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <Search size="md" placeholder="placeholder text" />
    </div>
  </div>
);

const STATES: { name: string; cls?: string; disabled?: boolean; readOnly?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', cls: 'is-hover' },
  { name: 'Active', cls: 'is-active' },
  { name: 'Focused', cls: 'is-focused' },
  { name: 'Disabled', disabled: true },
];

const FILLED_STATES = [...STATES, { name: 'Read only', readOnly: true }];

const StateGroup = ({ filled }: { filled: boolean }) => {
  const rows = filled ? FILLED_STATES : STATES;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ ...exampleLabel, color: '#858585' }}>{filled ? 'Filled' : 'Empty'}</span>
      {rows.map((row) => (
        <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0 }}>{row.name}</span>
          <div style={{ width: 280 }}>
            <Search
              placeholder="placeholder text"
              defaultValue={filled ? 'Filled text' : undefined}
              className={row.cls}
              disabled={row.disabled}
              readOnly={row.readOnly}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatesExample = () => (
  <div style={{ ...card, gap: 48 }}>
    <StateGroup filled={false} />
    <StateGroup filled />
  </div>
);
