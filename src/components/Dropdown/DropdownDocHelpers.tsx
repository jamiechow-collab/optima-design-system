import React, { useState } from 'react';
import { Dropdown, ComboBox, ComboBoxMultiSelect, DropdownOption } from './Dropdown';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Dropdown.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const OPTIONS: DropdownOption[] = [
  { value: 'a', label: 'Item A' },
  { value: 'b', label: 'Item B' },
  { value: 'c', label: 'Item C' },
  { value: 'e', label: 'Item E' },
  { value: 'f', label: 'Item F' },
];

const card: React.CSSProperties = {
  display: 'flex',
  gap: 32,
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

const AnatomyDemo = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ width: 360 }}>
      <Dropdown options={OPTIONS} value={value} onChange={setValue} />
    </div>
  );
};

export const AnatomyExample = () => (
  <div style={{ ...card, width: 'fit-content' }}>
    <AnatomyDemo />
  </div>
);

const TypesDemo = () => {
  const [basic, setBasic] = useState<string | undefined>(undefined);
  const [combo, setCombo] = useState<string | undefined>(undefined);
  const [multi, setMulti] = useState<string[]>(['a', 'b']);
  return (
    <>
      <div style={example}>
        <span style={exampleLabel}>Basic — single selection</span>
        <div style={{ width: 360 }}>
          <Dropdown options={OPTIONS} value={basic} onChange={setBasic} />
        </div>
      </div>
      <div style={example}>
        <span style={exampleLabel}>Combo Box — single selection</span>
        <div style={{ width: 384 }}>
          <ComboBox
            fieldTitle="Field title"
            options={OPTIONS}
            value={combo}
            onChange={setCombo}
            placeholder="Search…"
          />
        </div>
      </div>
      <div style={example}>
        <span style={exampleLabel}>Combo Box — multi-selection</span>
        <div style={{ width: 384 }}>
          <ComboBoxMultiSelect
            fieldTitle="Field title"
            options={OPTIONS}
            value={multi}
            onChange={setMulti}
            placeholder="Search…"
          />
        </div>
      </div>
    </>
  );
};

export const TypesExample = () => (
  <div style={card}>
    <TypesDemo />
  </div>
);

const STATES: { name: string; cls?: string; disabled?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', cls: 'is-hover' },
  { name: 'Active', cls: 'is-active' },
  { name: 'Focused', cls: 'is-focused' },
  { name: 'Disabled', disabled: true },
];

export const StatesExample = () => (
  <div style={{ ...card, gap: 48 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={exampleLabel}>Basic</span>
      {STATES.map((state) => (
        <div key={state.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0 }}>{state.name}</span>
          <div style={{ width: 280 }}>
            <Dropdown
              options={OPTIONS}
              value={state.disabled ? 'a' : undefined}
              onChange={() => {}}
              disabled={state.disabled}
              className={state.cls}
            />
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={exampleLabel}>Combo Box</span>
      {STATES.map((state) => (
        <div key={state.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0 }}>{state.name}</span>
          <div style={{ width: 280 }}>
            <ComboBox
              options={OPTIONS}
              value={state.disabled ? 'a' : undefined}
              onChange={() => {}}
              disabled={state.disabled}
              className={state.cls}
              placeholder="Search…"
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
