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
    leadingIcon: { table: { disable: true } },
  },
};

export default meta;

interface PlaygroundArgs {
  variant: BadgeVariant;
  size: BadgeSize;
  children: string;
  showLeadingIcon: boolean;
  showIcon: boolean;
}

// Badge.css forces the icon's rendered pixel size (12px sm/md, 16px lg) — this
// just keeps the Icon's own `size` prop honest about what's actually shown.
const iconSizeFor = (size: BadgeSize) => (size === 'lg' ? 'sm' : 'xs');

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
    showIcon: { control: 'boolean', name: 'icon' },
  },
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Badge',
    showLeadingIcon: false,
    showIcon: false,
  },
  render: ({ showLeadingIcon, showIcon, ...args }) => (
    <Badge
      {...args}
      leadingIcon={showLeadingIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
      icon={showIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
    />
  ),
};

export const WithLeadingIcon: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { table: { disable: true } },
    showIcon: { table: { disable: true } },
  },
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Badge',
    showLeadingIcon: true,
    showIcon: false,
  },
  render: ({ showLeadingIcon, showIcon, ...args }) => (
    <Badge
      {...args}
      leadingIcon={showLeadingIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
      icon={showIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
    />
  ),
};

export const WithIcon: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { table: { disable: true } },
    showIcon: { table: { disable: true } },
  },
  args: {
    variant: 'info',
    size: 'sm',
    children: 'Badge',
    showLeadingIcon: false,
    showIcon: true,
  },
  render: ({ showLeadingIcon, showIcon, ...args }) => (
    <Badge
      {...args}
      leadingIcon={showLeadingIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
      icon={showIcon ? <Icon name="dot" size={iconSizeFor(args.size)} /> : undefined}
    />
  ),
};
