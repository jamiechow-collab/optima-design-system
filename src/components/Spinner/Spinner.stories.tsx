import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinners',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 'xs',
    variant: 'primary',
  },
};

export const OnDarkBackground: Story = {
  args: {
    size: 'md',
    variant: 'secondary',
  },
  render: (args) => (
    <div style={{ background: '#050505', padding: 32, borderRadius: 8 }}>
      <Spinner {...args} />
    </div>
  ),
};
