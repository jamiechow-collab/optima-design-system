import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RadioButton, RadioButtonSize } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Components/Radio Button',
  component: RadioButton,
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
  size: RadioButtonSize;
  label: string;
  checked: boolean;
  disabled: boolean;
}

// Stateful wrapper so the radio actually toggles when clicked in the canvas,
// while still picking up the initial value from Storybook's controls.
const Interactive = ({ checked, ...args }: PlaygroundArgs) => {
  const [isChecked, setIsChecked] = useState(checked);
  React.useEffect(() => setIsChecked(checked), [checked]);
  return (
    <RadioButton
      {...args}
      name="playground"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    size: 'sm',
    label: 'Label',
    checked: true,
    disabled: false,
  },
  render: Interactive,
};

export const Group: StoryObj<{ size: RadioButtonSize }> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    size: 'sm',
  },
  render: ({ size }) => {
    const [selected, setSelected] = useState<string | null>('a');
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name="group-example"
            size={size}
            label={option.label}
            checked={selected === option.value}
            onChange={(e) => setSelected(e.target.checked ? option.value : null)}
          />
        ))}
      </div>
    );
  },
};
