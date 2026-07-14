import React from 'react';
import { Spinner, SpinnerSize } from './Spinner';
import { Button } from '../Button/Button';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Spinner.mdx — replicate the Figma spec cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
  flexWrap: 'wrap',
};

const darkCard: React.CSSProperties = {
  ...card,
  background: '#050505',
};

const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const SizesExample = () => (
  <div style={card}>
    {SIZES.map((size) => (
      <Spinner key={size} size={size} variant="primary" />
    ))}
  </div>
);

export const TypesExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={card}>
      {SIZES.map((size) => (
        <Spinner key={size} size={size} variant="primary" />
      ))}
    </div>
    <div style={darkCard}>
      {SIZES.map((size) => (
        <Spinner key={size} size={size} variant="secondary" />
      ))}
    </div>
  </div>
);

export const InButtonExample = () => (
  <div style={card}>
    <Button variant="primary" loading>
      Loading...
    </Button>
    <Button variant="secondary" loading>
      Loading...
    </Button>
    <Button variant="tertiary" loading>
      Loading...
    </Button>
    <Button variant="ghost" loading>
      Loading...
    </Button>
    <Button variant="text" loading>
      Loading...
    </Button>
  </div>
);
