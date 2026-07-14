import React from 'react';
import { Link, LinkVariant } from './Link';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Link.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 80,
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
    <span style={label}>{text}</span>
    {node}
  </div>
);

const VARIANTS: { variant: LinkVariant; name: string }[] = [
  { variant: 'primary', name: 'Primary' },
  { variant: 'secondary', name: 'Secondary' },
  { variant: 'inline', name: 'Inline' },
];

export const VariantsExample = () => (
  <div style={card}>
    {VARIANTS.map(({ variant, name }) =>
      labelled(
        <Link variant={variant} href="#">
          Link label
        </Link>,
        name
      )
    )}
  </div>
);

export const SizesExample = () => (
  <div style={card}>
    {labelled(<Link href="#" size="sm">Link label</Link>, 'Small')}
    {labelled(<Link href="#" size="md">Link label</Link>, 'Medium')}
    {labelled(<Link href="#" size="lg">Link label</Link>, 'Large')}
  </div>
);

const STATES = [
  { cls: '', name: 'Default' },
  { cls: 'is-hover', name: 'Hover' },
  { cls: 'is-pressed', name: 'Pressed' },
  { cls: 'is-focused', name: 'Focused' },
  { cls: 'is-disabled-demo', name: 'Disabled' },
];

export const StatesExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {VARIANTS.map(({ variant, name }) => (
      <div key={variant} style={{ ...card, gap: 48, alignItems: 'center' }}>
        <span style={{ ...label, width: 90, flexShrink: 0 }}>{name}</span>
        {STATES.map(({ cls, name: stateName }) =>
          labelled(
            <Link
              variant={variant}
              href="#"
              className={cls === 'is-disabled-demo' ? undefined : cls}
              disabled={stateName === 'Disabled'}
            >
              Link label
            </Link>,
            stateName
          )
        )}
      </div>
    ))}
  </div>
);
