import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { NavTabList, NavTabListVariant } from './NavTabList';
import { NavTab } from './NavTab';
import { NavTabPanel } from './NavTabPanel';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof NavTabList> = {
  title: 'Components/Tabs/Nav-tab',
  component: NavTabList,
  parameters: { layout: 'centered' },
};

export default meta;

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'notification', label: 'Notification' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'customers', label: 'Customers' },
];

interface PlaygroundArgs {
  variant: NavTabListVariant;
}

const Interactive = ({ variant }: PlaygroundArgs) => {
  const [active, setActive] = useState('overview');
  return (
    <div style={{ width: variant === 'vertical' ? 200 : 500 }}>
      <NavTabList variant={variant} aria-label="Example sections">
        {TABS.map((tab) => (
          <NavTab key={tab.value} active={active === tab.value} onClick={() => setActive(tab.value)}>
            {tab.label}
          </NavTab>
        ))}
      </NavTabList>
      {TABS.map((tab) => (
        <NavTabPanel key={tab.value} active={active === tab.value} style={{ padding: 16 }}>
          {tab.label} content
        </NavTabPanel>
      ))}
    </div>
  );
};

type Story = StoryObj<PlaygroundArgs>;

export const Pill: Story = {
  args: { variant: 'pill' },
  argTypes: { variant: { table: { disable: true } } },
  render: Interactive,
};

export const Underline: Story = {
  args: { variant: 'underline' },
  argTypes: { variant: { table: { disable: true } } },
  render: Interactive,
};

export const Vertical: Story = {
  args: { variant: 'vertical' },
  argTypes: { variant: { table: { disable: true } } },
  render: Interactive,
};

export const WithIconsAndBadges: Story = {
  argTypes: { variant: { table: { disable: true } } },
  render: () => {
    const [active, setActive] = useState('analytics');
    return (
      <div style={{ width: 240 }}>
        <NavTabList variant="vertical" aria-label="Example sections">
          <NavTab
            active={active === 'overview'}
            icon={<Icon name="placeholder" size="sm" />}
            onClick={() => setActive('overview')}
          >
            Overview
          </NavTab>
          <NavTab
            active={active === 'notification'}
            icon={<Icon name="placeholder" size="sm" />}
            onClick={() => setActive('notification')}
          >
            Notification
          </NavTab>
          <NavTab
            active={active === 'analytics'}
            icon={<Icon name="placeholder" size="sm" />}
            badge="3"
            onClick={() => setActive('analytics')}
          >
            Analytics
          </NavTab>
          <NavTab
            active={active === 'customers'}
            icon={<Icon name="placeholder" size="sm" />}
            badge="New"
            onClick={() => setActive('customers')}
          >
            Customers
          </NavTab>
        </NavTabList>
      </div>
    );
  },
};
