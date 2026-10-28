import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button, ButtonVariant } from './Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Standard Buttons',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs 32 · sm 40 · md 44 · lg 48',
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
    variant: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─────────────────────────────────────────────────────────────────────────────
//  One playground page per variant — the variant is fixed per page; size,
//  label, icons, disabled and loading stay adjustable.
// ─────────────────────────────────────────────────────────────────────────────

interface PlaygroundArgs {
  variant: ButtonVariant;
  size: 'xs' | 'sm' | 'md' | 'lg';
  children: string;
  disabled: boolean;
  loading: boolean;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
}

const iconToggleArgTypes = {
  showLeadingIcon: { control: 'boolean' as const, name: 'leading icon' },
  showTrailingIcon: { control: 'boolean' as const, name: 'trailing icon' },
};

const playgroundArgs = (variant: ButtonVariant): PlaygroundArgs => ({
  variant,
  size: 'sm',
  children: 'Button label',
  disabled: false,
  loading: false,
  showLeadingIcon: false,
  showTrailingIcon: false,
});

const renderPlayground = ({
  showLeadingIcon,
  showTrailingIcon,
  children,
  ...args
}: PlaygroundArgs) => (
  <Button
    {...args}
    leadingIcon={showLeadingIcon ? <Icon name="placeholder" /> : undefined}
    trailingIcon={showTrailingIcon ? <Icon name="placeholder" /> : undefined}
  >
    {children}
  </Button>
);

export const Primary: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('primary'),
  render: renderPlayground,
};

export const Secondary: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('secondary'),
  render: renderPlayground,
};

export const Tertiary: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('tertiary'),
  render: renderPlayground,
};

export const Ghost: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('ghost'),
  render: renderPlayground,
};

export const Inline: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('inline'),
  render: renderPlayground,
};

export const Disruptive: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('disruptive'),
  render: renderPlayground,
};

export const IconOnly: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'inline'],
      description: 'Icon-only supports primary / secondary / tertiary / ghost / inline',
      table: { disable: false },
    },
    children: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  args: {
    variant: 'primary',
    size: 'sm',
    iconOnly: true,
    disabled: false,
    'aria-label': 'Action',
  },
  render: (args) => (
    <Button {...args}>
      <Icon name="placeholder" />
    </Button>
  ),
};
