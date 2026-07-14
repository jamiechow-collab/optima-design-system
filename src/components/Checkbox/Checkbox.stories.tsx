import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Checkbox, CheckboxSize } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

interface PlaygroundArgs {
  size: CheckboxSize;
  label: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
}

// Stateful wrapper so the box actually toggles when clicked in the canvas,
// while still picking up the initial value from Storybook's controls.
const Interactive = ({ checked, ...args }: PlaygroundArgs) => {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => setIsChecked(checked), [checked]);
  return <Checkbox {...args} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />;
};

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    size: 'sm',
    label: 'Label',
    checked: true,
    indeterminate: false,
    disabled: false,
  },
  render: Interactive,
};

export const Indeterminate: StoryObj<PlaygroundArgs> = {
  argTypes: {
    checked: { table: { disable: true } },
  },
  args: {
    size: 'sm',
    label: 'Label',
    checked: false,
    indeterminate: true,
    disabled: false,
  },
  render: Interactive,
};
