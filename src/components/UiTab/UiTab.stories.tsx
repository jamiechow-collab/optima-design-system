import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { UiTabList } from './UiTabList';
import { UiTab } from './UiTab';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof UiTabList> = {
  title: 'Components/Tabs/Ui-tab',
  component: UiTabList,
  parameters: { layout: 'centered' },
  tags: ['!autodocs'],
};

export default meta;

const TABS = [
  { value: 'one', label: 'Label' },
  { value: 'two', label: 'Label' },
  { value: 'three', label: 'Label' },
];

const Interactive = ({ withIcons }: { withIcons?: boolean }) => {
  const [active, setActive] = useState('one');
  return (
    <UiTabList aria-label="Example views">
      {TABS.map((tab) => (
        <UiTab
          key={tab.value}
          active={active === tab.value}
          icon={withIcons ? <Icon name="placeholder" size="sm" /> : undefined}
          onClick={() => setActive(tab.value)}
        >
          {tab.label}
        </UiTab>
      ))}
    </UiTabList>
  );
};

type Story = StoryObj;

export const Default: Story = { render: () => <Interactive /> };

export const WithIcons: Story = { render: () => <Interactive withIcons /> };
