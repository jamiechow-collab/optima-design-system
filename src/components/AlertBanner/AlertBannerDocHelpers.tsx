import React, { useLayoutEffect, useRef, useState } from 'react';
import { AlertBanner, AlertBannerType } from './AlertBanner';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for AlertBanner.mdx — replicate the guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 12,
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

const label: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  marginTop: 12,
};

const MESSAGE = 'Message to notifying or informing users.';

// ─────────────────────────────────────────────────────────────────────────────
//  Anatomy diagram — annotates a real AlertBanner with purple callouts,
//  measured off the actual rendered DOM so it always matches the component.
// ─────────────────────────────────────────────────────────────────────────────

const PURPLE = '#AB48E4';
const GAP = 4; // space between the line and the element it points to
const LINE_LEN = 28; // visible connector length
const LABEL_GAP = 6; // space between the line and the label text

type AnatomySide = 'top' | 'bottom' | 'left';

interface AnatomySpec {
  selector: string;
  label: React.ReactNode;
  side: AnatomySide;
  anchorFrac?: number; // for 'top'/'bottom': horizontal position along the element (0–1)
  targetFrac?: number; // for 'left': vertical position along the element (0–1)
  nowrap?: boolean;
  labelOffset?: number; // nudges just the label text horizontally, to avoid overlap with a neighbour
}

const ANATOMY: AnatomySpec[] = [
  { selector: '.ds-alert-banner__icon-bubble', label: 'Icon (with background)', side: 'left', targetFrac: 0.5 },
  { selector: '.ds-alert-banner', label: 'Container', side: 'left', targetFrac: 0.85 },
  { selector: '.ds-alert-banner__title', label: 'Title', side: 'top', anchorFrac: 0.1, nowrap: true },
  { selector: '.ds-alert-banner__description', label: 'Body (optional)', side: 'top', anchorFrac: 0.45 },
  { selector: '.ds-alert-banner__close', label: 'Close Icon Button', side: 'top', anchorFrac: 0.5, nowrap: true },
  {
    selector: '.ds-alert-banner__actions .ds-button--primary',
    label: (
      <>
        Primary Button
        <br />
        (optional)
      </>
    ),
    side: 'bottom',
    labelOffset: -36,
  },
  {
    selector: '.ds-alert-banner__actions .ds-button--secondary',
    label: (
      <>
        Secondary Button
        <br />
        (optional)
      </>
    ),
    side: 'bottom',
    labelOffset: 36,
  },
];

interface AnatomyPoint {
  spec: AnatomySpec;
  x: number;
  y: number;
}

export const AnatomyExample = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<AnatomyPoint[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const banner = bannerRef.current;
      if (!wrap || !banner) return;
      const wrapRect = wrap.getBoundingClientRect();
      const next = ANATOMY.map((spec) => {
        const el = banner.querySelector(spec.selector) as HTMLElement | null;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const left = r.left - wrapRect.left;
        const top = r.top - wrapRect.top;
        if (spec.side === 'left') {
          return { spec, x: left, y: top + r.height * (spec.targetFrac ?? 0.5) };
        }
        if (spec.side === 'bottom') {
          return { spec, x: left + r.width / 2, y: top + r.height };
        }
        return { spec, x: left + r.width * (spec.anchorFrac ?? 0.5), y: top };
      }).filter((p): p is AnatomyPoint => p !== null);
      setPoints(next);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        padding: '96px 72px 104px 208px',
        border: '1px solid #D1D1D1',
        borderRadius: 16,
        background: '#fff',
        overflowX: 'auto',
      }}
    >
      <div ref={bannerRef} style={{ flexShrink: 0 }}>
        <AlertBanner
          icon={<Icon name="placeholder" />}
          description={MESSAGE}
          actions={
            <>
              <Button variant="primary">Action</Button>
              <Button variant="secondary">Action</Button>
            </>
          }
        >
          {MESSAGE}
        </AlertBanner>
      </div>

      {points.map(({ spec, x, y }, i) => {
        const labelStyle: React.CSSProperties = {
          position: 'absolute',
          fontSize: 12,
          lineHeight: '16px',
          color: PURPLE,
          whiteSpace: spec.nowrap ? 'nowrap' : undefined,
        };
        const dotStyle: React.CSSProperties = {
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: PURPLE,
        };

        if (spec.side === 'top') {
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  ...labelStyle,
                  left: x,
                  top: y - GAP - LINE_LEN - LABEL_GAP,
                  transform: 'translate(-50%, -100%)',
                  textAlign: 'center',
                  width: spec.nowrap ? undefined : 130,
                }}
              >
                {spec.label}
              </span>
              <div
                style={{ position: 'absolute', left: x, top: y - GAP - LINE_LEN, width: 1, height: LINE_LEN, background: PURPLE }}
              />
              <span style={{ ...dotStyle, left: x - 2.5, top: y - GAP - 2.5 }} />
            </React.Fragment>
          );
        }

        if (spec.side === 'bottom') {
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  ...labelStyle,
                  left: x + (spec.labelOffset ?? 0),
                  top: y + GAP + LINE_LEN + LABEL_GAP,
                  transform: 'translate(-50%, 0)',
                  textAlign: 'center',
                  width: 130,
                }}
              >
                {spec.label}
              </span>
              <div style={{ position: 'absolute', left: x, top: y + GAP, width: 1, height: LINE_LEN, background: PURPLE }} />
              <span style={{ ...dotStyle, left: x - 2.5, top: y + GAP - 2.5 }} />
            </React.Fragment>
          );
        }

        // left
        return (
          <React.Fragment key={i}>
            <span
              style={{
                ...labelStyle,
                left: x - GAP - LINE_LEN - LABEL_GAP,
                top: y,
                transform: 'translate(-100%, -50%)',
                textAlign: 'right',
                width: 150,
                whiteSpace: 'nowrap',
              }}
            >
              {spec.label}
            </span>
            <div style={{ position: 'absolute', left: x - GAP - LINE_LEN, top: y, width: LINE_LEN, height: 1, background: PURPLE }} />
            <span style={{ ...dotStyle, left: x - GAP - 2.5, top: y - 2.5 }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const TYPES: { type: AlertBannerType; name: string }[] = [
  { type: 'default', name: 'Default' },
  { type: 'message', name: 'Message' },
  { type: 'positive', name: 'Positive' },
  { type: 'negative', name: 'Negative' },
  { type: 'warning', name: 'Warning' },
];

export const TypesExample = () => (
  <div style={card}>
    {TYPES.map(({ type, name }, i) => (
      <React.Fragment key={type}>
        <span style={{ ...label, marginTop: i === 0 ? 0 : 12 }}>{name}</span>
        <AlertBanner type={type}>{MESSAGE}</AlertBanner>
      </React.Fragment>
    ))}
  </div>
);

const COMPARISON: { aspect: string; toast: string; banner: string }[] = [
  {
    aspect: 'Duration',
    toast: 'Temporary; slides in and out automatically.',
    banner: 'Persistent; usually stays until dismissed.',
  },
  {
    aspect: 'Placement',
    toast: 'Usually floats in a specific corner (e.g., bottom-right) without blocking content.',
    banner: 'Spans the top or bottom of a specific section or page.',
  },
  {
    aspect: 'Trigger',
    toast: 'Result of a specific micro-action (e.g., clicking "Submit").',
    banner: 'Global or context-wide information (e.g., "System maintenance tomorrow").',
  },
  {
    aspect: 'Interaction',
    toast: 'Usually no interaction needed. But actions are optional (e.g. "Undo", "View").',
    banner: 'May offer buttons to take action (e.g., "Retry," "Learn More").',
  },
];

export const ComparisonTable = () => (
  <div style={{ ...card, gap: 0, padding: 32 }}>
    <div style={{ display: 'flex', gap: 48, width: '100%' }}>
      <div style={{ width: 110, flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: 16, lineHeight: '24px', fontWeight: 700, color: '#050505' }}>Toast</div>
      <div style={{ flex: 1, fontSize: 16, lineHeight: '24px', fontWeight: 700, color: '#050505' }}>Alert Banner</div>
    </div>
    {COMPARISON.map(({ aspect, toast, banner }) => (
      <div key={aspect} style={{ display: 'flex', gap: 48, width: '100%', marginTop: 32 }}>
        <div style={{ width: 110, flexShrink: 0, fontSize: 16, lineHeight: '24px', fontWeight: 700, color: '#050505' }}>
          {aspect}
        </div>
        <div style={{ flex: 1, fontSize: 16, lineHeight: '24px', fontWeight: 500, color: '#050505' }}>{toast}</div>
        <div style={{ flex: 1, fontSize: 16, lineHeight: '24px', fontWeight: 500, color: '#050505' }}>{banner}</div>
      </div>
    ))}
  </div>
);

export const VariantsExample = () => (
  <div style={card}>
    <span style={{ ...label, marginTop: 0 }}>Message only</span>
    <AlertBanner>{MESSAGE}</AlertBanner>

    <span style={label}>With leading icon (with background)</span>
    <AlertBanner icon={<Icon name="placeholder" />}>{MESSAGE}</AlertBanner>

    <span style={label}>
      With description. This provide users more context about what happened and why.
    </span>
    <AlertBanner icon={<Icon name="placeholder" />} description={MESSAGE}>
      {MESSAGE}
    </AlertBanner>

    <span style={label}>
      Actionable. If there are actions users can take, such as "Learn more" or "See details". We
      can includes actions button.
    </span>
    <AlertBanner
      icon={<Icon name="placeholder" />}
      description={MESSAGE}
      actions={
        <>
          <Button variant="primary">Action</Button>
          <Button variant="secondary">Action</Button>
        </>
      }
    >
      {MESSAGE}
    </AlertBanner>
  </div>
);
