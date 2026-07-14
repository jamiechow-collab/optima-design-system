import React from 'react';
import { Tooltip, TooltipPlacement } from './Tooltip';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Tooltip.mdx — replicate the Figma spec cards.
//  These render the tooltip bubble markup directly (always visible) rather
//  than through hover/focus, purely for documentation purposes.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#f4f4f4',
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

export const AnatomyExample = () => (
  <div style={{ ...card, alignItems: 'center' }}>
    <Icon name="info-with-circle" />
    <span className="ds-tooltip ds-tooltip--primary ds-tooltip--label" style={{ position: 'static' }}>
      <span className="ds-tooltip__label">Brief description of a term</span>
    </span>
  </div>
);

export const TypesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Label only</span>
      <span className="ds-tooltip ds-tooltip--primary ds-tooltip--label" style={{ position: 'static' }}>
        <span className="ds-tooltip__label">Label</span>
      </span>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With title</span>
      <span className="ds-tooltip ds-tooltip--primary ds-tooltip--rich" style={{ position: 'static' }}>
        <span className="ds-tooltip__title">Title</span>
        <span className="ds-tooltip__description">Description</span>
      </span>
    </div>
  </div>
);

export const VariantsExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Primary</span>
      <span className="ds-tooltip ds-tooltip--primary ds-tooltip--label" style={{ position: 'static' }}>
        <span className="ds-tooltip__label">Label</span>
      </span>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Secondary</span>
      <span className="ds-tooltip ds-tooltip--secondary ds-tooltip--label" style={{ position: 'static' }}>
        <span className="ds-tooltip__label">Label</span>
      </span>
    </div>
  </div>
);

export const PlacementsExample = () => (
  <div style={{ ...card, gap: 64, padding: 64 }}>
    {(['top', 'bottom', 'left', 'right'] as TooltipPlacement[]).map((placement) => (
      <Tooltip key={placement} label={placement} placement={placement}>
        <Button variant="secondary" iconOnly aria-label={placement}>
          <Icon name="download" />
        </Button>
      </Tooltip>
    ))}
  </div>
);

export const AlignmentExample = () => (
  <div style={{ ...card, gap: 64, padding: 64 }}>
    {(['start', 'center', 'end'] as const).map((align) => (
      <Tooltip key={align} label="Button description" placement="bottom" align={align}>
        <Button variant="secondary" iconOnly aria-label={align}>
          <Icon name="download" />
        </Button>
      </Tooltip>
    ))}
  </div>
);

export const MaxWidthExample = () => (
  <div style={{ ...card, flexDirection: 'column', gap: 40 }}>
    <span className="ds-tooltip ds-tooltip--primary ds-tooltip--label" style={{ position: 'static' }}>
      <span className="ds-tooltip__label">
        If the description goes really long, it should be wrapped in its max. width of 200px
      </span>
    </span>
    <span className="ds-tooltip ds-tooltip--primary ds-tooltip--rich" style={{ position: 'static' }}>
      <span className="ds-tooltip__title">Title</span>
      <span className="ds-tooltip__description">
        If the description goes really long, it should be wrapped in its max. width of 200px
      </span>
    </span>
  </div>
);
