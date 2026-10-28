import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
  argTypes: {
    count: { control: { type: 'number', min: 2, max: 8 } },
    current: { control: { type: 'number', min: 0, max: 7 }, description: 'Zero-based' },
  },
};

export default meta;

export const Default: StoryObj<typeof Stepper> = {
  args: { count: 3, current: 0 },
  render: (args) => <Stepper {...args} />,
};
