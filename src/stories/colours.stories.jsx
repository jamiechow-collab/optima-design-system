import React from 'react';
import colors from '../tokens/colors';

export default {
  title: 'Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
};

const Swatch = ({ name, hex, isPrimary }) => {
  const swatchStyle = {
    width: 80,
    height: 80,
    borderRadius: 12,
    background: hex,
    border: '1px solid rgba(0,0,0,0.08)',
    position: 'relative',
    boxShadow: isPrimary ? '0 0 0 3px #fff, 0 0 0 5px ' + hex : 'none',
  };

  const badgeStyle = {
    position: 'absolute',
    top: -10,
    right: -10,
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 999,
    fontSize: 9,
    fontWeight: 700,
    padding: '2px 6px',
    color: '#374151',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  };

  const labelStyle = {
    textAlign: 'center',
    fontFamily: 'monospace',
  };

  const nameStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
  };

  const hexStyle = {
    fontSize: 11,
    color: '#6b7280',
  };

  return (
    <div style={wrapperStyle}>
      <div style={swatchStyle}>
        {isPrimary && <span style={badgeStyle}>Primary</span>}
      </div>
      <div style={labelStyle}>
        <div style={nameStyle}>{name}</div>
        <div style={hexStyle}>{hex}</div>
      </div>
    </div>
  );
};

const Palette = ({ title, scale, primaryShade }) => {
  const sectionStyle = {
    marginBottom: 48,
  };

  const headingStyle = {
    fontFamily: 'sans-serif',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 20,
    color: '#111827',
  };

  const rowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
  };

  return (
    <div style={sectionStyle}>
      <h2 style={headingStyle}>{title}</h2>
      <div style={rowStyle}>
        {Object.entries(scale).map(([shade, hex]) => (
          <Swatch
            key={shade}
            name={shade}
            hex={hex}
            isPrimary={shade === String(primaryShade)}
          />
        ))}
      </div>
    </div>
  );
};

export const AllColors = () => (
  <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh' }}>
    <Palette title="Brand" scale={colors.brand} primaryShade={500} />
    <Palette title="Gray" scale={colors.gray} primaryShade={500} />
    <Palette title="Red" scale={colors.red} primaryShade={500} />
  </div>
);

AllColors.storyName = 'All Colors';

export const Brand = () => (
  <div style={{ padding: 32 }}>
    <Palette title="Brand" scale={colors.brand} primaryShade={500} />
  </div>
);

export const Gray = () => (
  <div style={{ padding: 32 }}>
    <Palette title="Gray" scale={colors.gray} primaryShade={500} />
  </div>
);

export const Red = () => (
  <div style={{ padding: 32 }}>
    <Palette title="Red" scale={colors.red} primaryShade={500} />
  </div>
);
