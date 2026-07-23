import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Sidenav } from './Sidenav';
import { SidenavNavItem } from './SidenavNavItem';
import { SidenavActionButton } from './SidenavActionButton';
import { Icon } from '../Icon/Icon';

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

const meta: Meta<typeof Sidenav> = {
  title: 'Components/Sidenav',
  component: Sidenav,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Sidenav>;

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' as const },
  { key: 'campaigns', label: 'Campaigns', icon: 'trumpet' as const },
  { key: 'reports', label: 'Reports', icon: 'vertical-bar-card' as const },
  { key: 'items', label: 'Items', icon: 'grid-3' as const },
  { key: 'integration', label: 'Integration', icon: 'connect' as const },
];

const SidenavExample = () => {
  const [active, setActive] = useState('reports');
  return (
    <div style={{ height: '100vh' }}>
      <Sidenav
        logo={<APLogo />}
        actionButton={
          <SidenavActionButton
            aria-label="Create new"
            icon={<Icon name="plus" />}
            onClick={() => {}}
          />
        }
        footer={<MenuIcon />}
      >
        {NAV_ITEMS.map((item) => (
          <SidenavNavItem
            key={item.key}
            href="#"
            icon={<Icon name={item.icon} />}
            label={item.label}
            active={active === item.key}
            onClick={(e) => {
              e.preventDefault();
              setActive(item.key);
            }}
          />
        ))}
      </Sidenav>
    </div>
  );
};

export const Default: Story = {
  render: () => <SidenavExample />,
};

export const WithoutFooter: Story = {
  render: () => (
    <div style={{ height: '100vh' }}>
      <Sidenav
        logo={<APLogo />}
        actionButton={
          <SidenavActionButton aria-label="Create new" icon={<Icon name="plus" />} />
        }
      >
        {NAV_ITEMS.map((item) => (
          <SidenavNavItem
            key={item.key}
            href="#"
            icon={<Icon name={item.icon} />}
            label={item.label}
            active={item.key === 'home'}
          />
        ))}
      </Sidenav>
    </div>
  ),
};
