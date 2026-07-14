import React, { useLayoutEffect, useRef, useState } from 'react';
import { Toast } from './Toast';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Toast.mdx — replicate the guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 24,
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
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

const MESSAGE = 'Message to notifying or informing users.';

export const OverviewExample = () => (
  <div style={{ ...card, alignItems: 'stretch' }}>
    <Toast>{MESSAGE}</Toast>
  </div>
);

export const VariantsExample = () => (
  <div style={{ ...card, alignItems: 'stretch' }}>
    <div style={example}>
      <span style={exampleLabel}>Message</span>
      <Toast>{MESSAGE}</Toast>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With details</span>
      <Toast
        variant="details"
        avatarIcon={<Icon name="reload" />}
        title="Title of notification"
        actions={
          <>
            <Button variant="primary" size="sm">Action</Button>
            <Button variant="secondary" size="sm">Action</Button>
          </>
        }
        onClose={() => {}}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Nullam nec ligula at dolor aliquam mollis.</p>
      </Toast>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With timestamp</span>
      <Toast
        variant="push"
        avatarIcon={<Icon name="placeholder" />}
        title="Title of notification"
        timestamp="a few seconds ago"
        onClose={() => {}}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Nullam nec ligula at dolor aliquam mollis.</p>
      </Toast>
    </div>
  </div>
);

export const TypesExample = () => (
  <div style={{ ...card, alignItems: 'stretch' }}>
    <div style={example}>
      <span style={exampleLabel}>For info message or confirmation (default)</span>
      <Toast type="default" onClose={() => {}}>{MESSAGE}</Toast>
    </div>
    <div style={example}>
      <span style={exampleLabel}>For positive message</span>
      <Toast type="positive" onClose={() => {}}>{MESSAGE}</Toast>
    </div>
    <div style={example}>
      <span style={exampleLabel}>For error message</span>
      <Toast type="negative" onClose={() => {}}>{MESSAGE}</Toast>
    </div>
    <div style={example}>
      <span style={exampleLabel}>For warning message</span>
      <Toast type="warning" onClose={() => {}}>{MESSAGE}</Toast>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Anatomy diagram — annotates a real Toast with purple callouts, measured
//  off the actual rendered DOM so it always matches the component.
// ─────────────────────────────────────────────────────────────────────────────

const PURPLE = '#AB48E4';
const GAP = 4;
const LINE_LEN = 28;
const LABEL_GAP = 6;

type AnatomySide = 'top' | 'bottom';

interface AnatomySpec {
  selector: string;
  label: string;
  side: AnatomySide;
  anchorFrac?: number;
}

const ANATOMY: AnatomySpec[] = [
  { selector: '.ds-toast__icon', label: 'Leading icon (optional)', side: 'top' },
  { selector: '.ds-toast__message', label: 'Message', side: 'bottom', anchorFrac: 0.2 },
  { selector: '.ds-toast__actions--message', label: 'Action button (optional)', side: 'top' },
  { selector: '.ds-toast__close', label: 'Close button (optional)', side: 'bottom' },
];

interface AnatomyPoint {
  spec: AnatomySpec;
  x: number;
  y: number;
}

export const AnatomyExample = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<AnatomyPoint[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const toast = toastRef.current;
      if (!wrap || !toast) return;
      const wrapRect = wrap.getBoundingClientRect();
      const next = ANATOMY.map((spec) => {
        const el = toast.querySelector(spec.selector) as HTMLElement | null;
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const left = r.left - wrapRect.left;
        const top = r.top - wrapRect.top;
        if (spec.side === 'bottom') {
          return { spec, x: left + r.width * (spec.anchorFrac ?? 0.5), y: top + r.height };
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
        padding: '64px 24px 72px 24px',
        border: '1px solid #D1D1D1',
        borderRadius: 16,
        background: '#fff',
        overflowX: 'auto',
        width: '100%',
      }}
    >
      <div ref={toastRef} style={{ flexShrink: 0 }}>
        <Toast
          icon={<Icon name="placeholder" size="sm" />}
          actions={<Button variant="secondary" size="sm">Action</Button>}
          onClose={() => {}}
        >
          {MESSAGE}
        </Toast>
      </div>

      {points.map(({ spec, x, y }, i) => {
        const labelStyle: React.CSSProperties = {
          position: 'absolute',
          fontSize: 12,
          lineHeight: '16px',
          color: PURPLE,
          whiteSpace: 'nowrap',
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
                }}
              >
                {spec.label}
              </span>
              <div style={{ position: 'absolute', left: x, top: y - GAP - LINE_LEN, width: 1, height: LINE_LEN, background: PURPLE }} />
              <span style={{ ...dotStyle, left: x - 2.5, top: y - GAP - 2.5 }} />
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={i}>
            <span
              style={{
                ...labelStyle,
                left: x,
                top: y + GAP + LINE_LEN + LABEL_GAP,
                transform: 'translate(-50%, 0)',
              }}
            >
              {spec.label}
            </span>
            <div style={{ position: 'absolute', left: x, top: y + GAP, width: 1, height: LINE_LEN, background: PURPLE }} />
            <span style={{ ...dotStyle, left: x - 2.5, top: y + GAP - 2.5 }} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
