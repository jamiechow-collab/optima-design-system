import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Data Visualisation/Line Chart',
  component: LineChart,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    negative: { control: 'boolean' },
    text: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof LineChart>;

export const Default: Story = {
  args: {
    label: 'Label',
    negative: false,
    text: true,
  },
};

export const Negative: Story = {
  args: {
    label: 'Label',
    negative: true,
    text: true,
  },
};
