import React from 'react';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Breadcrumbs.mdx — replicate the guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const examplesCard: React.CSSProperties = {
  display: 'flex',
  gap: 80,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
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

export const TypesExample = () => (
  <div style={examplesCard}>
    <div style={example}>
      <span style={exampleLabel}>With label only</span>
      <Breadcrumb size="md" href="#">Label</Breadcrumb>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With leading icon</span>
      <Breadcrumb size="md" href="#" icon={<Icon name="placeholder" />}>Label</Breadcrumb>
    </div>
  </div>
);

export const SizesExample = () => (
  <div style={examplesCard}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <Breadcrumb size="sm" href="#">Label</Breadcrumb>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <Breadcrumb size="md" href="#">Label</Breadcrumb>
    </div>
  </div>
);

export const BehaviourExample = () => (
  <div style={{ ...examplesCard, gap: 0 }}>
    <Breadcrumbs
      size="sm"
      items={[
        { label: 'Page 1', href: '#' },
        { label: 'Page 2', href: '#' },
        { label: 'Page 3', href: '#' },
        { label: 'Page 4', href: '#' },
        { label: 'Current page' },
      ]}
    />
  </div>
);
