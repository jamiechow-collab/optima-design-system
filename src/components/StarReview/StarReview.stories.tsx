import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { StarReview } from './StarReview';

const meta: Meta<typeof StarReview> = {
  title: 'Data Visualisation/Star Review',
  component: StarReview,
  parameters: { layout: 'centered' },
  argTypes: {
    rating: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4, 5],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarReview>;

export const Default: Story = {
  args: {
    rating: 5,
  },
};
