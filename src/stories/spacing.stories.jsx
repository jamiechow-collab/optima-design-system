import React from 'react';
import spacing from '../tokens/spacing';
import { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Spacing',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

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

const col = { name: 200, px: 160, rem: 160, bar: 300 };
const cell = (w) => ({ width: w, flexShrink: 0, fontSize: 14, color: '#374151' });

export const AllSpacing = () => (
  <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh', fontFamily }}>
    <div style={headerRow}>
      <div style={cell(col.name)}>Name</div>
      <div style={cell(col.px)}>Pixel</div>
      <div style={cell(col.rem)}>Rem</div>
      <div style={cell(col.bar)} />
    </div>
    <div style={{ background: '#fff', borderRadius: 20, overflow: 'hidden' }}>
      {Object.entries(spacing).map(([name, px], i, arr) => (
        <div key={name} style={{ ...row, borderBottom: i === arr.length - 1 ? 'none' : row.borderBottom }}>
          <div style={{ ...cell(col.name), fontWeight: 600, color: '#1F2937' }}>{name}</div>
          <div style={cell(col.px)}>{px}px</div>
          <div style={cell(col.rem)}>{px / 16}rem</div>
          <div style={cell(col.bar)}>
            <div style={{ width: px, height: 14, background: '#EFF3FF', borderRight: '2px solid #3758F9' }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
