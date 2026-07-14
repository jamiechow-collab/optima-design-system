import React from 'react';
import { Icon, IconName, IconSize } from './Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers shared by Icon.mdx and the gallery stories.
// ─────────────────────────────────────────────────────────────────────────────

export const IconGrid = ({ names, size = 'lg' }: { names: IconName[]; size?: IconSize }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
      gap: 12,
    }}
  >
    {names.map((name) => (
      <div
        key={name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          minHeight: 88,
          padding: '16px 8px',
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: 10,
          color: '#1F2937',
        }}
      >
        <Icon name={name} size={size} />
        <span style={{ fontSize: 11, color: '#6B7280', textAlign: 'center', wordBreak: 'break-word' }}>
          {name}
        </span>
      </div>
    ))}
  </div>
);

const SIZES: { label: string; size: IconSize }[] = [
  { label: 'xs - 12px', size: 'xs' },
  { label: 'sm - 16px', size: 'sm' },
  { label: 'md - 20px', size: 'md' },
  { label: 'lg - 24px', size: 'lg' },
];

export const SizeGuide = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {SIZES.map(({ label, size }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 72, fontSize: 12, color: '#899AB2' }}>{label}</span>
        <Icon name="placeholder" size={size} />
      </div>
    ))}
  </div>
);

const BACKGROUNDS = [
  { label: 'Default', bg: '#050505', color: '#fff' },
  { label: 'White background', bg: '#fff', color: '#050505', border: '1px solid #E5E7EB' },
  { label: 'Light background', bg: '#F9F8F6', color: '#050505' },
];

const SWATCH_SIZES = [24, 32, 44, 48, 56, 64];

export const BackgroundGuide = () => (
  <div style={{ overflowX: 'auto' }}>
    {BACKGROUNDS.map(({ label, bg, color, border }) => (
      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <span style={{ width: 130, flexShrink: 0, fontSize: 13, color: '#899AB2', textAlign: 'right' }}>
          {label}
        </span>
        {SWATCH_SIZES.map((size) => (
          <div
            key={size}
            style={{
              width: size,
              height: size,
              borderRadius: 100,
              background: bg,
              border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
              flexShrink: 0,
            }}
          >
            <Icon name="placeholder" size="md" style={{ width: size * 0.45, height: size * 0.45 }} />
          </div>
        ))}
      </div>
    ))}
  </div>
);
