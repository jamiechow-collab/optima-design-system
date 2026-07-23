import React from 'react';
import typography, { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Typography',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  Figma "Typography" guideline replica (node 448:1971).
//  One card per style group with a Font | Weight | Size | Line | Space table;
//  the Font cell renders the variant name in its own type style.
// ─────────────────────────────────────────────────────────────────────────────

const WEIGHT_NAMES = {
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
};

const rem = (px) => {
  const v = px / 16;
  return `${parseFloat(v.toFixed(4))}rem`;
};

const GROUPS = [
  {
    title: 'Display',
    variants: [
      { name: 'Medium', style: typography.display.medium },
      { name: 'Bold-1', style: typography.display['bold-1'] },
      { name: 'Bold-2', style: typography.display['bold-2'] },
      { name: 'Bold-3', style: typography.display['bold-3'] },
    ],
  },
  {
    title: 'Heading',
    variants: [
      { name: 'Regular', style: typography.heading.regular },
      { name: 'Medium', style: typography.heading.medium },
      { name: 'SemiBold', style: typography.heading.semibold },
      { name: 'Bold', style: typography.heading.bold },
    ],
  },
  {
    title: 'Label',
    variants: [
      { name: 'Medium', style: typography.label.medium },
      { name: 'SemiBold', style: typography.label.semibold },
      { name: 'Bold', style: typography.label.bold },
    ],
  },
  {
    title: 'Body',
    variants: [
      { name: 'Light', style: typography.body.light },
      { name: 'Regular', style: typography.body.regular },
      { name: 'Medium', style: typography.body.medium },
      { name: 'SemiBold', style: typography.body.semibold },
    ],
  },
  {
    title: 'Caption',
    variants: [
      { name: 'Regular', style: typography.caption.regular },
      { name: 'Medium', style: typography.caption.medium },
    ],
  },
];

const COLS = { font: 2.2, weight: 1, size: 1.3, line: 1.3, space: 1 };

const cell = (flex) => ({ flex, minWidth: 0 });

const headerLabel = {
  fontSize: 12,
  lineHeight: '16px',
  color: '#6B7280',
};

const valueText = {
  fontSize: 14,
  lineHeight: '20px',
  color: '#1F2937',
};

const Table = ({ group }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', margin: '0 0 16px', color: '#050505' }}>
      {group.title}
    </h2>
    <div style={{ background: '#F9F8F6', borderRadius: 16, overflow: 'hidden' }}>
      {/* Header row */}
      <div style={{ display: 'flex', gap: 24, padding: '20px 48px' }}>
        <div style={{ ...cell(COLS.font), ...headerLabel }}>Font</div>
        <div style={{ ...cell(COLS.weight), ...headerLabel }}>Weight</div>
        <div style={{ ...cell(COLS.size), ...headerLabel }}>Size</div>
        <div style={{ ...cell(COLS.line), ...headerLabel }}>Line</div>
        <div style={{ ...cell(COLS.space), ...headerLabel }}>Space</div>
      </div>

      {group.variants.map(({ name, style }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            padding: '24px 48px',
            borderTop: '1px solid #E5E7EB',
          }}
        >
          <div
            style={{
              ...cell(COLS.font),
              fontFamily: style.fontFamily,
              fontWeight: style.fontWeight,
              fontSize: style.fontSize,
              lineHeight: `${style.lineHeight}px`,
              letterSpacing: style.letterSpacing,
              color: '#1F2937',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </div>
          <div style={{ ...cell(COLS.weight), ...valueText }}>{WEIGHT_NAMES[style.fontWeight]}</div>
          <div style={{ ...cell(COLS.size), ...valueText }}>
            {style.fontSize}px / {rem(style.fontSize)}
          </div>
          <div style={{ ...cell(COLS.line), ...valueText }}>
            {style.lineHeight}px / {rem(style.lineHeight)}
          </div>
          <div style={{ ...cell(COLS.space), ...valueText }}>
            {style.letterSpacing}px / {style.letterSpacing}rem
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AllTypography = () => (
  <div style={{ padding: 32, background: '#fff', minHeight: '100vh', maxWidth: 980, fontFamily }}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 32px', color: '#111827' }}>
      Typography
    </h1>
    {GROUPS.map((group) => (
      <Table key={group.title} group={group} />
    ))}
  </div>
);
