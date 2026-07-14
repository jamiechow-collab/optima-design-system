import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TabList, TabListVariant } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof TabList> = {
  title: 'Components/Tabs',
  component: TabList,
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
  variant: TabListVariant;
}

const Interactive = ({ variant }: PlaygroundArgs) => {
  const [active, setActive] = useState('overview');
  return (
    <div style={{ width: variant === 'vertical' ? 200 : 500 }}>
      <TabList variant={variant} aria-label="Example sections">
        {TABS.map((tab) => (
          <Tab key={tab.value} active={active === tab.value} onClick={() => setActive(tab.value)}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      {TABS.map((tab) => (
        <TabPanel key={tab.value} active={active === tab.value} style={{ padding: 16 }}>
          {tab.label} content
        </TabPanel>
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
        <TabList variant="vertical" aria-label="Example sections">
          <Tab
            active={active === 'overview'}
            icon={<Icon name="placeholder" size="sm" />}
            onClick={() => setActive('overview')}
          >
            Overview
          </Tab>
          <Tab
            active={active === 'notification'}
            icon={<Icon name="placeholder" size="sm" />}
            onClick={() => setActive('notification')}
          >
            Notification
          </Tab>
          <Tab
            active={active === 'analytics'}
            icon={<Icon name="placeholder" size="sm" />}
            badge="3"
            onClick={() => setActive('analytics')}
          >
            Analytics
          </Tab>
          <Tab
            active={active === 'customers'}
            icon={<Icon name="placeholder" size="sm" />}
            badge="New"
            onClick={() => setActive('customers')}
          >
            Customers
          </Tab>
        </TabList>
      </div>
    );
  },
};
