import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ToggleButton, ToggleButtonSize } from './ToggleButton';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/Buttons/Toggle Buttons',
  component: ToggleButton,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    children: { control: 'text' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

interface PlaygroundArgs {
  size: ToggleButtonSize;
  children: string;
  active: boolean;
  disabled: boolean;
  showLeadingIcon: boolean;
  showBadge: boolean;
}

// Stateful wrapper so the toggle actually flips when clicked in the canvas.
const Interactive = ({ active, showLeadingIcon, showBadge, ...args }: PlaygroundArgs) => {
  const [isActive, setIsActive] = useState(active);
  useEffect(() => setIsActive(active), [active]);
  return (
    <ToggleButton
      {...args}
      active={isActive}
      onClick={() => setIsActive((prev) => !prev)}
      icon={showLeadingIcon ? <Icon name="placeholder" /> : undefined}
      badge={showBadge ? 99 : undefined}
    />
  );
};

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
    showBadge: { control: 'boolean', name: 'badge' },
  },
  args: {
    size: 'sm',
    children: 'Button label',
    active: false,
    disabled: false,
    showLeadingIcon: false,
    showBadge: false,
  },
  render: Interactive,
};

export const Active: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
    showBadge: { control: 'boolean', name: 'badge' },
  },
  args: {
    size: 'sm',
    children: 'Button label',
    active: true,
    disabled: false,
    showLeadingIcon: false,
    showBadge: false,
  },
  render: Interactive,
};
