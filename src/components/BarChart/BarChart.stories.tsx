import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Data Visualisation/Bar Chart',
  component: BarChart,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {},
};
