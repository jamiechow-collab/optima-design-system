import React from 'react';
import { datavisCategorical, datavisSequential, datavisStates } from '../../tokens/datavis-colors';
import { fontFamily } from '../../tokens/typography';

const meta = {
  title: 'Data Visualisation/Chart design/Color-datavis',
  parameters: { layout: 'padded' },
};

export default meta;

const STATE_LABELS = { default: 'Default', hover: 'Hover', selected: 'Selected', dismissed: 'Dismissed' };
const GROUP_LABELS = { group1: 'Group 1', group2: 'Group 2', group3: 'Group 3', group4: 'Group 4', group5: 'Group 5' };

const Page = ({ children }) => (
  <div style={{ padding: 32, background: '#fff', maxWidth: 1000, fontFamily, color: 'var(--color-text-primary, #222)' }}>
    {children}
  </div>
);

const Heading = ({ children }) => (
  <h2 style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, margin: '0 0 16px' }}>{children}</h2>
);

const Body = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, maxWidth: 621, margin: '0 0 8px' }}>{children}</p>
);

const cell = { height: 46, display: 'flex', alignItems: 'flex-end', padding: '0 8px 4px', boxSizing: 'border-box' };

// Light text on dark swatches, dark on light — keeps the hex readable.
const isDark = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 150;
};

// Label uses the Figma variable name, e.g. "bluebell/default" or "tide/950".
const Label = ({ text, hex }) => (
  <span style={{ fontSize: 12, color: isDark(hex) ? '#fff' : '#222' }}>{text}</span>
);

const Categorical = () => (
  <div style={{ margin: '32px 0 56px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
      {datavisStates.map((s) => <span key={s} style={{ textAlign: 'center' }}>{STATE_LABELS[s]}</span>)}
    </div>
    {Object.entries(datavisCategorical).map(([group, colours]) => (
      <div key={group} style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{GROUP_LABELS[group]}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {colours.map((c) =>
            datavisStates.map((s) => (
              <div key={`${c.name}-${s}`} style={{ ...cell, background: c[s] }} title={`--color-datavis-${c.name}-${s}`}>
                <Label text={`${c.name}/${s}`} hex={c[s]} />
              </div>
            ))
          )}
        </div>
      </div>
    ))}
  </div>
);

const Sequential = () => (
  <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
    {Object.entries(datavisSequential).map(([name, steps]) => (
      <div key={name} style={{ flex: 1, maxWidth: 220 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{name}</div>
        {Object.entries(steps).reverse().map(([step, hex]) => (
          <div key={step} style={{ ...cell, background: hex }} title={`--color-datavis-${name}-${step}`}>
            <Label text={`${name}/${step}`} hex={hex} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Docs = () => (
  <Page>
    <Heading>Color</Heading>
    <Body>
      The data visualization color palette is a curated subset of our design system UI colour palette,
      designed to maximize accessibility and visual harmony, and align with Audience Project’s visual identity.
    </Body>

    <div style={{ marginTop: 56 }}>
      <Heading>Categorical palettes</Heading>
      <Body>
        Categorical (or qualitative) palettes are best when you want to distinguish discrete categories of
        data that do not have an inherent correlation.
      </Body>
      <Body>
        The colors of this palette should be applied in sequence as described below. The sequence is carefully
        curated to maximize contrast between neighboring colors to help with visual differentiation.
      </Body>
    </div>
    <Categorical />

    <Heading>Sequential palettes</Heading>
    <Body>Monochromatic</Body>
    <Body>
      The monochromatic palettes are good for relationship charts and trend charts. In light themes, the darkest
      color denotes the largest values. In dark themes, the lightest color denotes the largest values.
    </Body>
    <Sequential />
  </Page>
);
