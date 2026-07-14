import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Sliders',
  component: Slider,
  parameters: { layout: 'centered' },
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showLabels: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;

interface PlaygroundArgs {
  min: number;
  max: number;
  step: number;
  showLabels: boolean;
  disabled: boolean;
  initialLow: number;
  initialHigh: number;
}

const Interactive = ({ initialLow, initialHigh, ...args }: PlaygroundArgs) => {
  const [value, setValue] = useState<[number, number]>([initialLow, initialHigh]);
  return (
    <div style={{ width: 334 }}>
      <Slider {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    initialLow: { control: 'number', name: 'initial low value' },
    initialHigh: { control: 'number', name: 'initial high value' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showLabels: false,
    disabled: false,
    initialLow: 25,
    initialHigh: 75,
  },
  render: Interactive,
};

export const WithLabels: StoryObj<PlaygroundArgs> = {
  argTypes: {
    initialLow: { control: 'number', name: 'initial low value' },
    initialHigh: { control: 'number', name: 'initial high value' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    showLabels: true,
    disabled: false,
    initialLow: 25,
    initialHigh: 75,
  },
  render: Interactive,
};

export const Disabled: StoryObj<PlaygroundArgs> = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    showLabels: true,
    disabled: true,
    initialLow: 25,
    initialHigh: 75,
  },
  render: Interactive,
};
