import React from 'react';
import radius from '../tokens/radius';
import { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Border Radius',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const NAME_MAP = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

const headerRow = {
  display: 'flex',
  gap: 24,
  padding: '20px 32px',
  background: '#fff',
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 600,
  color: '#1F2937',
  marginBottom: 16,
};

const row = {
  display: 'flex',
  alignItems: 'center',
  gap: 24,
  padding: '20px 32px',
  borderBottom: '1px solid #E5E7EB',
};

const col = { name: 300, weight: 300, shape: 200 };
const cell = (w) => ({ width: w, flexShrink: 0, fontSize: 14, color: '#374151' });

export const AllBorderRadius = () => (
  <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh', fontFamily }}>
    <div style={headerRow}>
      <div style={cell(col.name)}>Name</div>
      <div style={{ ...cell(col.weight), textAlign: 'center' }}>Weight</div>
      <div style={cell(col.shape)} />
    </div>
    <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
      {Object.entries(radius).map(([key, px], i, arr) => (
        <div key={key} style={{ ...row, borderBottom: i === arr.length - 1 ? 'none' : row.borderBottom }}>
          <div style={{ ...cell(col.name), fontWeight: 600, color: '#1F2937' }}>{NAME_MAP[key]}</div>
          <div style={{ ...cell(col.weight), textAlign: 'center' }}>{px}px</div>
          <div style={{ ...cell(col.shape), display: 'flex', justifyContent: 'flex-end' }}>
            <div
              style={{
                width: 104,
                height: 74,
                background: '#EFF3FF',
                border: '2px solid #91AEFF',
                borderRadius: px,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
