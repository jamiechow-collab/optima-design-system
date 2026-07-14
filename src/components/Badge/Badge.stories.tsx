import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Badge, BadgeSize, BadgeVariant } from './Badge';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badges',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'message', 'positive', 'negative', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    children: { control: 'text' },
    icon: { table: { disable: true } },
  },
};

export default meta;

interface PlaygroundArgs {
  variant: BadgeVariant;
  size: BadgeSize;
  children: string;
  showIcon: boolean;
}

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showIcon: { control: 'boolean', name: 'icon' },
  },
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Badge',
    showIcon: false,
  },
  render: ({ showIcon, ...args }) => (
    <Badge {...args} icon={showIcon ? <Icon name="dot" size="xs" /> : undefined} />
  ),
};

export const WithIcon: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showIcon: { table: { disable: true } },
  },
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Badge',
    showIcon: true,
  },
  render: ({ showIcon, ...args }) => (
    <Badge {...args} icon={showIcon ? <Icon name="dot" size="xs" /> : undefined} />
  ),
};
