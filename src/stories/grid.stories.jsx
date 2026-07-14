import React from 'react';
import grid from '../tokens/grid';
import { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Layout Grid',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  Figma "Layout grid / Guideline" replica (node 441:3117).
//  Structural geometry is scaled from real Figma px; text/indicator sizes stay
//  fixed for legibility. `edgeBadge` is the labelled gap between the collapsed
//  side-nav rail (80px) and the first/last column, as annotated in Figma.
//  Colours/typography below are sampled directly from the Figma node tree —
//  see src/tokens/colors.js for the same semantic tokens (core-bg/tertiary,
//  border/layout, beige-bg/primary, alert/message(-background), text/primary,
//  text/placeholder).
// ─────────────────────────────────────────────────────────────────────────────

const PREVIEW_W = 830;
const SCALE = PREVIEW_W / 1728;
const s = (v) => v * SCALE;

const NAV_RAIL_W = 80;

const SPECS = [
  { ...grid.desktopXl, title: 'Desktop', sub: '(1728 px)', width: 1728, height: 1310, edgeBadge: '20 px' },
  { ...grid.desktop, title: 'Desktop', sub: '(1440 px)', width: 1440, height: 1200, edgeBadge: '16 px' },
  { ...grid.tablet, title: 'Desktop', sub: '(1194 px)', width: 1194, height: 1200, edgeBadge: '16 px' },
  { ...grid.tabletPortrait, title: 'Desktop', sub: '(834px)', width: 834, height: 936, edgeBadge: '12 px' },
];

// Colours/typography sampled directly from the Figma node tree (node 441:3117).
const C = {
  fill: '#EBEBEB', // core-bg/tertiary — grid columns + side-nav rail background
  navIcon: '#F9F8F6', // beige-bg/primary — nav rail icon squares
  logo: '#050505', // text/primary
  canvasBg: '#FFFFFF', // core-bg/secondary
  canvasBorder: '#D1D1D1', // border/layout
  indicator: '#D1D1D1', // border/layout — dashed measurement brackets
  badgeBg: '#DCF0F7', // alert/message-background
  badgeText: '#3393BA', // alert/message
  textPrimary: '#050505', // text/primary
  textPlaceholder: '#858585', // text/placeholder — "(1728 px)" part of the heading
};

// I-beam measurement bracket: |———| with a dashed middle line
const IBeam = ({ left, width, top = 0 }) => (
  <div style={{ position: 'absolute', left, width, top, height: 10 }}>
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: C.indicator }} />
    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: C.indicator }} />
    <div style={{ position: 'absolute', left: 1, right: 1, top: 4, borderTop: `1px dashed ${C.indicator}` }} />
  </div>
);

// ⊔ bracket used under the edge-gap measurement
const UBracket = ({ left, width, top = 0 }) => (
  <div
    style={{
      position: 'absolute',
      left,
      width,
      top,
      height: 8,
      borderLeft: `1px solid ${C.canvasBorder}`,
      borderRight: `1px solid ${C.canvasBorder}`,
      borderBottom: `1px solid ${C.canvasBorder}`,
    }}
  />
);

// Collapsed side-nav rail: AudienceProject mark + icon squares
const SideNav = ({ height }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, width: s(NAV_RAIL_W), height, background: C.fill }}>
    <svg
      width={s(30)}
      height={s(31)}
      viewBox="0 0 30 31"
      fill="none"
      style={{ position: 'absolute', left: s(25), top: s(24) }}
    >
      <path d="M2 9L9 15.5L2 22" stroke={C.logo} strokeWidth="3.4" />
      <path d="M9 9L16 15.5L9 22" stroke={C.logo} strokeWidth="3.4" />
      <path d="M19 12H29" stroke={C.logo} strokeWidth="3.4" />
      <path d="M19 19H29" stroke={C.logo} strokeWidth="3.4" />
    </svg>
    {[0, 1, 2, 3].map((k) => (
      <div
        key={k}
        style={{
          position: 'absolute',
          left: s(20),
          top: s(95 + k * 72),
          width: s(40),
          height: s(40),
          borderRadius: s(8),
          background: C.navIcon,
        }}
      />
    ))}
  </div>
);

// Column-width label — Text xs/Regular 12/16, letter-spacing -0.2px, text/primary
const labelStyle = {
  position: 'absolute',
  fontSize: 12,
  lineHeight: '16px',
  fontWeight: 400,
  letterSpacing: '-0.2px',
  color: C.textPrimary,
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const BreakpointBlock = ({ spec }) => {
  const { title, sub, width, height, columns, columnWidth, gutter, margin, edgeBadge } = spec;
  const W = s(width);
  const H = s(height);
  const colX = (k) => margin + k * (columnWidth + gutter);
  const gutterX = (k) => margin + columnWidth + k * (columnWidth + gutter);
  // Column pitch shrinks with the breakpoint; drop the label size when labels
  // would otherwise collide (834px grid: ~30px pitch at preview scale).
  const labelFont = s(columnWidth + gutter) < 36 ? 9 : 12;

  return (
    <div style={{ marginBottom: 80 }}>
      {/* Title — Display/bold-3 32/40: "Desktop" text/primary + "(1728 px)" text/placeholder */}
      <div style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, color: C.textPrimary, marginBottom: 20 }}>
        {title} <span style={{ color: C.textPlaceholder }}>{sub}</span>
      </div>

      {/* Column head: px labels + I-beam brackets over each column */}
      <div style={{ position: 'relative', height: 32, width: W }}>
        {Array.from({ length: columns }).map((_, k) => (
          <React.Fragment key={k}>
            <div style={{ ...labelStyle, fontSize: labelFont, left: s(colX(k)), width: s(columnWidth), top: 0 }}>
              {columnWidth} px
            </div>
            <IBeam left={s(colX(k))} width={s(columnWidth)} top={20} />
          </React.Fragment>
        ))}
      </div>

      {/* Canvas: white panel (core-bg/secondary, border/layout, radius/2xl) with side-nav rail + columns */}
      <div
        style={{
          position: 'relative',
          width: W,
          height: H,
          marginTop: 8,
          background: C.canvasBg,
          border: `1px solid ${C.canvasBorder}`,
          borderRadius: s(32),
          overflow: 'hidden',
          boxSizing: 'content-box',
        }}
      >
        <SideNav height={H} />
        {Array.from({ length: columns }).map((_, k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: s(colX(k)),
              top: 0,
              width: s(columnWidth),
              height: H,
              background: C.fill,
            }}
          />
        ))}
      </div>

      {/* Gutter guide: I-beam over each gutter + bold px label (Text xs/Bold) */}
      <div style={{ position: 'relative', height: 34, width: W, marginTop: 8 }}>
        {Array.from({ length: columns - 1 }).map((_, k) => {
          const center = s(gutterX(k) + gutter / 2);
          return (
            <React.Fragment key={k}>
              <IBeam left={s(gutterX(k))} width={s(gutter)} top={0} />
              <div style={{ ...labelStyle, fontSize: labelFont, fontWeight: 700, left: center - 30, width: 60, top: 16 }}>
                {gutter} px
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Edge-gap measurement: ⊔ bracket + Badge (alert/message-background, alert/message text) at both canvas edges */}
      <div style={{ position: 'relative', height: 48, width: W, marginTop: 4 }}>
        <UBracket left={s(NAV_RAIL_W)} width={s(20)} top={0} />
        <UBracket left={s(width - 20)} width={s(20)} top={0} />
        {[s(NAV_RAIL_W + 10), s(width - 10)].map((center, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: center,
              top: 16,
              transform: 'translateX(-50%)',
              background: C.badgeBg,
              color: C.badgeText,
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '16px',
              letterSpacing: '-0.2px',
              padding: '6px 12px',
              border: '4px solid #fff',
              borderRadius: 8,
              whiteSpace: 'nowrap',
            }}
          >
            {edgeBadge}
          </div>
        ))}
      </div>
    </div>
  );
};

const Page = ({ children }) => (
  <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh', fontFamily }}>
    {children}
  </div>
);

export const AllBreakpoints = () => (
  <Page>
    <h1 style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, margin: '0 0 8px', color: C.textPrimary }}>
      Layout grid
    </h1>
    <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: C.textPrimary, margin: '0 0 48px', maxWidth: 660 }}>
      Below shows 4 different breakpoints and its grid layout when side navigation bar is collapsed
    </p>
    {SPECS.map((spec) => (
      <BreakpointBlock key={spec.width} spec={spec} />
    ))}
  </Page>
);
