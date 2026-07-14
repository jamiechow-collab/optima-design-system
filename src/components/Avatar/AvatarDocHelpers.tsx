import React from 'react';
import { Avatar, AvatarSize } from './Avatar';
import portrait from './assets/portrait.png';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Avatar.mdx — replicate the Figma guideline cards.
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
};

const label: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
};

const labelled = (node: React.ReactNode, text: string) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
    {node}
    <span style={label}>{text}</span>
  </div>
);

export const TypesExample = () => (
  <div style={{ ...card, gap: 16 }}>
    <Avatar src={portrait} alt="With image" size="md" />
    <Avatar initials="TG" size="md" />
    <Avatar size="md" />
  </div>
);

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export const SizesExample = () => (
  <div style={{ ...card, gap: 53 }}>
    {SIZES.map((size) => (
      <Avatar key={size} src={portrait} alt={size} size={size} />
    ))}
  </div>
);

export const StatesExample = () => (
  <div style={{ ...card, gap: 53 }}>
    {labelled(<Avatar src={portrait} size="md" />, 'Default')}
    {labelled(<Avatar src={portrait} size="md" disabled />, 'Disabled')}
    {labelled(<Avatar src={portrait} size="md" focused />, 'Focused')}
  </div>
);

export const StatusExample = () => (
  <div style={{ ...card, gap: 30 }}>
    {labelled(<Avatar src={portrait} size="md" status="online" />, 'Online')}
    {labelled(<Avatar src={portrait} size="md" status="busy" />, 'Busy')}
    {labelled(<Avatar src={portrait} size="md" status="away" />, 'Away')}
  </div>
);
