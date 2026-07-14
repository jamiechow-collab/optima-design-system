import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Sidebar } from './Sidebar';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarActionButton } from './SidebarActionButton';
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

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' as const },
  { key: 'campaign', label: 'Campaign', icon: 'trumpet' as const },
  { key: 'report', label: 'Report', icon: 'vertical-bar-card' as const },
  { key: 'integration', label: 'Integration', icon: 'connect' as const },
];

const SidebarExample = () => {
  const [active, setActive] = useState('report');
  return (
    <div style={{ height: '100vh' }}>
      <Sidebar
        logo={<APLogo />}
        actionButton={
          <SidebarActionButton
            aria-label="Create new"
            icon={<Icon name="plus" />}
            onClick={() => {}}
          />
        }
        footer={<MenuIcon />}
      >
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
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
      </Sidebar>
    </div>
  );
};

export const Default: Story = {
  render: () => <SidebarExample />,
};

export const WithoutFooter: Story = {
  render: () => (
    <div style={{ height: '100vh' }}>
      <Sidebar
        logo={<APLogo />}
        actionButton={
          <SidebarActionButton aria-label="Create new" icon={<Icon name="plus" />} />
        }
      >
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.key}
            href="#"
            icon={<Icon name={item.icon} />}
            label={item.label}
            active={item.key === 'home'}
          />
        ))}
      </Sidebar>
    </div>
  ),
};
