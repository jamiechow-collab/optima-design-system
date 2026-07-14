import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/Progress bar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    showTooltip: { control: 'boolean' },
    showLeadingLabel: { control: 'boolean' },
    showTrailingLabel: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

const renderStory = (args: React.ComponentProps<typeof ProgressBar>) => (
  <div style={{ width: 336 }}>
    <ProgressBar {...args} />
  </div>
);

export const Default: Story = {
  args: {
    label: 'Field title',
    value: 20,
    showTooltip: true,
    showLeadingLabel: false,
    showTrailingLabel: false,
  },
  render: renderStory,
};

export const WithLeadingLabel: Story = {
  args: {
    label: 'Field title',
    value: 20,
    showTooltip: true,
    showLeadingLabel: true,
    showTrailingLabel: false,
  },
  render: renderStory,
};

export const WithTrailingLabel: Story = {
  args: {
    label: 'Field title',
    value: 20,
    showTooltip: true,
    showLeadingLabel: false,
    showTrailingLabel: true,
  },
  render: renderStory,
};

export const NoLabel: Story = {
  args: {
    value: 20,
    'aria-label': 'Upload progress',
    showTooltip: false,
    showLeadingLabel: false,
    showTrailingLabel: false,
  },
  render: renderStory,
};
