import React from 'react';
import { TextInput, TextInputValidation } from './TextInput';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for TextInput.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 24,
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

export const AnatomyExample = () => (
  <div style={{ ...card, width: 'fit-content' }}>
    <TextInput
      label="Field title"
      showTooltip
      placeholder="placeholder text"
      helperText="Give tips on filling the field"
      leadingIcon={<Icon name="placeholder" size="sm" />}
      trailingIcon={<Icon name="show-eye" size="sm" />}
      onChange={() => {}}
    />
  </div>
);

export const ApplicationsExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Leading icon</span>
      <TextInput
        label="Field title"
        placeholder="placeholder text"
        leadingIcon={<Icon name="placeholder" size="sm" />}
        onChange={() => {}}
      />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Trailing icon</span>
      <TextInput
        label="Password"
        type="password"
        placeholder="placeholder text"
        trailingIcon={<Icon name="show-eye" size="sm" />}
        onChange={() => {}}
      />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Leading prefix</span>
      <TextInput
        label="Field title"
        showTooltip
        placeholder="placeholder text"
        leadingPrefix="£"
        onChange={() => {}}
      />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Trailing prefix</span>
      <TextInput
        label="Field title"
        showTooltip
        placeholder="placeholder text"
        trailingPrefix="%"
        onChange={() => {}}
      />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Leading + trailing prefix</span>
      <TextInput
        label="Field title"
        showTooltip
        placeholder="placeholder text"
        leadingPrefix="£"
        trailingPrefix="%"
        onChange={() => {}}
      />
    </div>
  </div>
);

const TYPES: { validation: TextInputValidation; name: string }[] = [
  { validation: 'default', name: 'Default' },
  { validation: 'error', name: 'Error validation' },
  { validation: 'success', name: 'Success validation' },
];

export const TypesExample = () => (
  <div style={card}>
    {TYPES.map(({ validation, name }) => (
      <div key={validation} style={example}>
        <span style={exampleLabel}>{name}</span>
        <TextInput
          label="Field title"
          showTooltip
          placeholder="placeholder text"
          validation={validation}
          validationText={validation !== 'default' ? 'Validation text' : undefined}
          onChange={() => {}}
        />
      </div>
    ))}
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

const StateGroup = ({
  validation,
  filled,
}: {
  validation: TextInputValidation;
  filled: boolean;
}) => {
  const rows = filled ? FILLED_STATES : STATES;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ ...exampleLabel, color: '#858585' }}>{filled ? 'Filled' : 'Empty'}</span>
      {rows.map((row) => (
        <div key={row.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0, paddingTop: 12 }}>
            {row.name}
          </span>
          <div style={{ width: 240 }}>
            <TextInput
              placeholder="placeholder text"
              value={filled && !row.disabled ? 'Filled text' : undefined}
              className={row.cls}
              disabled={row.disabled}
              readOnly={row.readOnly}
              validation={validation}
              validationText={validation !== 'default' ? 'Validation text' : undefined}
              onChange={() => {}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatesExample = () => (
  <div style={{ ...card, gap: 48, alignItems: 'flex-start' }}>
    {TYPES.map(({ validation, name }) => (
      <div key={validation} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span style={exampleLabel}>{name}</span>
        <div style={{ display: 'flex', gap: 32 }}>
          <StateGroup validation={validation} filled={false} />
          <StateGroup validation={validation} filled={true} />
        </div>
      </div>
    ))}
  </div>
);
