import React from 'react';
import { Badge, BadgeVariant } from './Badge';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Badge.mdx — replicate the guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
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

const VARIANTS: { variant: BadgeVariant; name: string }[] = [
  { variant: 'info', name: 'Info (default)' },
  { variant: 'message', name: 'Message' },
  { variant: 'positive', name: 'Positive' },
  { variant: 'negative', name: 'Negative' },
  { variant: 'warning', name: 'Warning' },
];

export const TypesExample = () => (
  <div style={card}>
    {VARIANTS.map(({ variant, name }) => (
      <div key={variant} style={example}>
        <span style={exampleLabel}>{name}</span>
        <Badge variant={variant}>Badge</Badge>
      </div>
    ))}
  </div>
);

export const SizesExample = () => (
  <div style={{ ...card, gap: 32 }}>
    <div style={example}>
      <span style={exampleLabel}>sm — 12px icon</span>
      <Badge size="sm" leadingIcon={<Icon name="dot" size="xs" />} icon={<Icon name="dot" size="xs" />}>
        Badge
      </Badge>
    </div>
    <div style={example}>
      <span style={exampleLabel}>md — 12px icon</span>
      <Badge size="md" leadingIcon={<Icon name="dot" size="xs" />} icon={<Icon name="dot" size="xs" />}>
        Badge
      </Badge>
    </div>
    <div style={example}>
      <span style={exampleLabel}>lg — 16px icon</span>
      <Badge size="lg" leadingIcon={<Icon name="dot" size="sm" />} icon={<Icon name="dot" size="sm" />}>
        Badge
      </Badge>
    </div>
  </div>
);

export const VariantsExample = () => (
  <div style={{ ...card, flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
    <div style={example}>
      <span style={exampleLabel}>With label only</span>
      <Badge>Badge</Badge>
    </div>
    <div style={{ ...example, gap: 8 }}>
      <span style={exampleLabel}>With leading icon</span>
      <div style={{ display: 'flex', gap: 16 }}>
        <Badge leadingIcon={<Icon name="dot" size="xs" />}>Badge</Badge>
        <Badge leadingIcon={<Icon name="checkmark" size="xs" />}>Badge</Badge>
      </div>
    </div>
    <div style={{ ...example, gap: 8 }}>
      <span style={exampleLabel}>With trailing icon (common icons would be dots, close, arrows)</span>
      <div style={{ display: 'flex', gap: 16 }}>
        <Badge icon={<Icon name="dot" size="xs" />}>Badge</Badge>
        <Badge icon={<Icon name="close" size="xs" />}>Badge</Badge>
        <Badge icon={<Icon name="arrow-left" size="xs" />}>Badge</Badge>
        <Badge icon={<Icon name="arrow-top-right" size="xs" />}>Badge</Badge>
      </div>
    </div>
    <div style={{ ...example, gap: 8 }}>
      <span style={exampleLabel}>With leading + trailing icon</span>
      <div style={{ display: 'flex', gap: 16 }}>
        <Badge leadingIcon={<Icon name="dot" size="xs" />} icon={<Icon name="close" size="xs" />}>
          Badge
        </Badge>
      </div>
    </div>
  </div>
);
