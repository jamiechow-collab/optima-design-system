import React from 'react';
import { Button, ButtonSize, ButtonVariant } from './Button';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Button.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 32,
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
  width: 'fit-content',
  flexWrap: 'wrap',
};

const label: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
};

const labelled = (node: React.ReactNode, text: string) => (
  <div key={text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    {node}
    <span style={label}>{text}</span>
  </div>
);

const VARIANTS: { variant: ButtonVariant; name: string }[] = [
  { variant: 'primary', name: 'Primary' },
  { variant: 'secondary', name: 'Secondary' },
  { variant: 'tertiary', name: 'Tertiary' },
  { variant: 'ghost', name: 'Ghost' },
  { variant: 'text', name: 'Text' },
  { variant: 'disruptive', name: 'Disruptive' },
];

export const VariantsExample = () => (
  <div style={card}>
    {VARIANTS.map(({ variant, name }) =>
      labelled(<Button variant={variant}>Button label</Button>, name)
    )}
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    {labelled(<Button>Button label</Button>, 'With label only')}
    {labelled(<Button leadingIcon={<Icon name="placeholder" />}>Button label</Button>, 'With leading icon')}
    {labelled(<Button trailingIcon={<Icon name="placeholder" />}>Button label</Button>, 'With trailing icon')}
    {labelled(
      <Button iconOnly aria-label="Action">
        <Icon name="placeholder" />
      </Button>,
      'Icon only'
    )}
  </div>
);

const SIZES: { size: ButtonSize; name: string }[] = [
  { size: 'sm', name: 'Small' },
  { size: 'md', name: 'Medium' },
  { size: 'lg', name: 'Large' },
];

export const SizesExample = () => (
  <div style={card}>
    {SIZES.map(({ size, name }) => labelled(<Button size={size}>Button label</Button>, name))}
  </div>
);

const STATES = [
  { cls: '', name: 'Default' },
  { cls: 'is-hover', name: 'Hover' },
  { cls: 'is-pressed', name: 'Pressed' },
  { cls: 'is-focused', name: 'Focused' },
  { cls: 'disabled', name: 'Disabled' },
];

export const StatesExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {VARIANTS.map(({ variant, name }) => (
      <div key={variant} style={{ ...card, gap: 24, width: 'auto' }}>
        <span style={{ ...label, width: 90, flexShrink: 0 }}>{name}</span>
        {STATES.map(({ cls, name: stateName }) => {
          if (variant === 'disruptive' && stateName === 'Disabled') return null;
          return labelled(
            <Button variant={variant} className={cls} disabled={stateName === 'Disabled'}>
              Button label
            </Button>,
            stateName
          );
        })}
      </div>
    ))}
  </div>
);

const emphasisCard: React.CSSProperties = {
  display: 'inline-flex',
  gap: 12,
  padding: 24,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

export const EmphasisExample = () => (
  <div style={{ display: 'flex', gap: 48 }}>
    <div>
      <div style={{ ...label, color: '#519E42', marginBottom: 8 }}>Do</div>
      <div style={emphasisCard}>
        <Button variant="secondary">Button label</Button>
        <Button variant="primary">Button label</Button>
      </div>
    </div>
    <div>
      <div style={{ ...label, color: '#CF3321', marginBottom: 8 }}>Don't</div>
      <div style={emphasisCard}>
        <Button variant="primary">Button label</Button>
        <Button variant="primary">Button label</Button>
      </div>
    </div>
  </div>
);
