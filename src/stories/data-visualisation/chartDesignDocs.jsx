import React from 'react';
import { fontFamily } from '../../tokens/typography';

// Shared layout bits for the Chart design pages (mirrors color-datavis.stories.jsx).
export const Page = ({ children, maxWidth = 1000 }) => (
  <div style={{ padding: 32, background: '#fff', maxWidth, fontFamily, color: 'var(--color-text-primary, #222)' }}>
    {children}
  </div>
);

export const Heading = ({ children }) => (
  <h2 style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, margin: '0 0 16px' }}>{children}</h2>
);

export const Body = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, maxWidth: 621, margin: '0 0 8px' }}>{children}</p>
);

export const Section = ({ children }) => <div style={{ marginTop: 48 }}>{children}</div>;

// Beige canvas the chart pieces are shown on, with an optional caption underneath
export const Specimen = ({ children, caption, style }) => (
  <figure style={{ margin: 0 }}>
    <div style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, border: '1px solid var(--color-divider-tertiary, #ede9e3)', padding: 24, display: 'inline-block', ...style }}>
      {children}
    </div>
    {caption && <figcaption style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', marginTop: 8 }}>{caption}</figcaption>}
  </figure>
);

export const Row = ({ children, gap = 32 }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: 'flex-start', marginTop: 24 }}>{children}</div>
);

export const SubHeading = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 700, color: 'var(--color-text-secondary, #474747)', margin: '16px 0 8px' }}>{children}</p>
);

export const Bullets = ({ children }) => (
  <ul style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', maxWidth: 621, margin: '0 0 8px', paddingLeft: 21 }}>{children}</ul>
);
