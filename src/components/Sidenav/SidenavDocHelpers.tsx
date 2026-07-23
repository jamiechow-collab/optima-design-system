import React from 'react';
import { Sidenav } from './Sidenav';
import { SidenavNavItem } from './SidenavNavItem';
import { SidenavActionButton } from './SidenavActionButton';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Sidenav.mdx — replicate the Figma spec cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
  flexWrap: 'wrap',
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const APLogo = () => (
  <svg width="30" height="31" viewBox="0 0 30 31" fill="none" aria-label="AudienceProject" role="img">
    <path
      d="M13.75 15.5L6.25 23H0L7.5 15.5L0 8H6.25L13.75 15.5ZM30 18V23H13.75V18H30ZM30 13H13.75V8H30V13Z"
      fill="#050505"
    />
  </svg>
);

export const AnatomyExample = () => (
  <div style={{ ...card, height: 640, padding: 0, overflow: 'hidden' }}>
    <Sidenav
      logo={<APLogo />}
      actionButton={
        <SidenavActionButton aria-label="Create new" icon={<Icon name="plus" />} />
      }
      footer={<MenuIcon />}
    >
      <SidenavNavItem href="#" icon={<Icon name="home" />} label="Home" active />
      <SidenavNavItem href="#" icon={<Icon name="trumpet" />} label="Campaigns" />
      <SidenavNavItem href="#" icon={<Icon name="vertical-bar-card" />} label="Reports" />
      <SidenavNavItem href="#" icon={<Icon name="grid-3" />} label="Items" />
      <SidenavNavItem href="#" icon={<Icon name="connect" />} label="Integration" />
    </Sidenav>
  </div>
);

const NAV_ITEM_STATES: { name: string; cls?: string; active?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', cls: 'is-hover' },
  { name: 'Active', active: true },
  { name: 'Focused', cls: 'is-focused' },
  { name: 'Active Focused', cls: 'is-focused', active: true },
];

export const NavItemStatesExample = () => (
  <div style={{ ...card, alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <SidenavActionButton aria-label="Create new" icon={<Icon name="plus" />} />
      <span style={exampleLabel}>Key</span>
    </div>
    {NAV_ITEM_STATES.map((state) => (
      <div
        key={state.name}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <SidenavNavItem
          href="#"
          icon={<Icon name="home" />}
          label="Label"
          active={state.active}
          className={state.cls}
        />
        <span style={exampleLabel}>{state.name}</span>
      </div>
    ))}
  </div>
);
