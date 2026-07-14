import React from 'react';
import { ToggleButton } from './ToggleButton';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for ToggleButton.mdx — replicate the guideline cards.
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
    <ToggleButton>Button label</ToggleButton>
  </div>
);

export const VariantsExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Inactive</span>
      <ToggleButton>Button label</ToggleButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Active</span>
      <ToggleButton active>Button label</ToggleButton>
    </div>
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>With label only</span>
      <ToggleButton>Button label</ToggleButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With leading icon</span>
      <ToggleButton icon={<Icon name="placeholder" />}>Button label</ToggleButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With badge</span>
      <ToggleButton badge={99}>Button label</ToggleButton>
    </div>
  </div>
);

export const SizesExample = () => (
  <div style={{ ...card, alignItems: 'center' }}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <ToggleButton size="sm">Button label</ToggleButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <ToggleButton size="md">Button label</ToggleButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Large</span>
      <ToggleButton size="lg">Button label</ToggleButton>
    </div>
  </div>
);
