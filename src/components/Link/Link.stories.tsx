import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Link, LinkVariant } from './Link';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Link> = {
  title: 'Components/Links',
  component: Link,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'sm 14/20 · md 16/24 · lg 16/24',
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    variant: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    href: { table: { disable: true } },
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  One playground page per variant
// ─────────────────────────────────────────────────────────────────────────────

interface PlaygroundArgs {
  variant: LinkVariant;
  size: 'sm' | 'md' | 'lg';
  children: string;
  disabled: boolean;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
}

const iconToggleArgTypes = {
  showLeadingIcon: { control: 'boolean' as const, name: 'leading icon' },
  showTrailingIcon: { control: 'boolean' as const, name: 'trailing icon' },
};

const playgroundArgs = (variant: LinkVariant): PlaygroundArgs => ({
  variant,
  size: 'sm',
  children: 'Link label',
  disabled: false,
  showLeadingIcon: false,
  showTrailingIcon: false,
});

const renderPlayground = ({
  showLeadingIcon,
  showTrailingIcon,
  children,
  ...args
}: PlaygroundArgs) => (
  <Link
    {...args}
    href="#"
    leadingIcon={showLeadingIcon ? <Icon name="placeholder" /> : undefined}
    trailingIcon={showTrailingIcon ? <Icon name="placeholder" /> : undefined}
  >
    {children}
  </Link>
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

export const Inline: StoryObj<PlaygroundArgs> = {
  argTypes: iconToggleArgTypes,
  args: playgroundArgs('inline'),
  render: renderPlayground,
};
