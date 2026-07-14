import React from 'react';
import { ToggletipVariant } from './Toggletip';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Toggletip.mdx — replicate the Figma spec cards.
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

const indicationLabel: React.CSSProperties = {
  color: '#AB48E4',
  fontSize: 12,
  lineHeight: '16px',
  whiteSpace: 'nowrap',
};

const indicationLine: React.CSSProperties = {
  width: 24,
  height: 1,
  background: '#AB48E4',
  flexShrink: 0,
};

export const AnatomyExample = () => (
  <div style={{ ...card, justifyContent: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={indicationLabel}>Info icon trigger</span>
        <span style={indicationLine} />
        <Icon name="info-with-circle" />
      </div>
      <div style={{ position: 'relative', display: 'flex' }}>
        <span className="ds-toggletip ds-toggletip--primary" style={{ position: 'static' }}>
          <span className="ds-toggletip__content">
            <span className="ds-toggletip__title">Rich Tooltips Title</span>
            <span className="ds-toggletip__description">
              More explanation or description about the the tips or information for the tooltips
            </span>
          </span>
          <button type="button" className="ds-toggletip__action">
            Action
          </button>
        </span>
        <div
          style={{
            position: 'absolute',
            left: '100%',
            top: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={indicationLine} />
          <span style={indicationLabel}>Toggletips</span>
        </div>
      </div>
    </div>
  </div>
);

export const VariantsExample = () => (
  <div style={card}>
    {(['primary', 'secondary'] as ToggletipVariant[]).map((variant) => (
      <span key={variant} className={`ds-toggletip ds-toggletip--${variant}`} style={{ position: 'static' }}>
        <span className="ds-toggletip__content">
          <span className="ds-toggletip__title">Rich Tooltips Title</span>
          <span className="ds-toggletip__description">
            More explanation or description about the the tips or information for the tooltips
          </span>
        </span>
        <button type="button" className="ds-toggletip__action">
          Action
        </button>
      </span>
    ))}
  </div>
);

const StaticToggletip = () => (
  <span className="ds-toggletip ds-toggletip--primary" style={{ position: 'static' }}>
    <span className="ds-toggletip__content">
      <span className="ds-toggletip__title">Rich Tooltips Title</span>
      <span className="ds-toggletip__description">
        More explanation or description about the the tips or information for the tooltips
      </span>
    </span>
    <button type="button" className="ds-toggletip__action">
      Action
    </button>
  </span>
);

const placementLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 600,
  color: '#050505',
};

const PlacementRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
    <span style={placementLabel}>{label}</span>
    {children}
  </div>
);

export const PlacementsExample = () => (
  <div style={{ ...card, gap: 64, padding: 40 }}>
    <PlacementRow label="Appear below">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Icon name="info-with-circle" />
        <StaticToggletip />
      </div>
    </PlacementRow>
    <PlacementRow label="Appear above">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <StaticToggletip />
        <Icon name="info-with-circle" />
      </div>
    </PlacementRow>
    <PlacementRow label="Appear on right">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="info-with-circle" />
        <StaticToggletip />
      </div>
    </PlacementRow>
    <PlacementRow label="Appear on left">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StaticToggletip />
        <Icon name="info-with-circle" />
      </div>
    </PlacementRow>
  </div>
);
