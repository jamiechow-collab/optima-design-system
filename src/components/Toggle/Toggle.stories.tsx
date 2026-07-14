import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Toggle, ToggleSize } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

interface PlaygroundArgs {
  size: ToggleSize;
  label: string;
  checked: boolean;
  disabled: boolean;
}

// Stateful wrapper so the switch actually toggles when clicked in the canvas,
// while still picking up the initial value from Storybook's controls.
const Interactive = ({ checked, ...args }: PlaygroundArgs) => {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => setIsChecked(checked), [checked]);
  return <Toggle {...args} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />;
};

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    size: 'sm',
    label: 'Dark Mode',
    checked: true,
    disabled: false,
  },
  render: Interactive,
};

export const Sizes: StoryObj<PlaygroundArgs> = {
  argTypes: { size: { table: { disable: true } } },
  args: {
    label: 'Dark Mode',
    checked: true,
    disabled: false,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 32 }}>
      <Interactive {...args} size="sm" />
      <Interactive {...args} size="md" />
    </div>
  ),
};
