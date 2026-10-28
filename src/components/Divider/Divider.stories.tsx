import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    colour: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary'] },
  },
};

export default meta;

export const Default: StoryObj<typeof Divider> = {
  args: { orientation: 'horizontal', colour: 'tertiary' },
  render: ({ orientation, colour }) => (
    <div style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'row' : 'column', gap: 16, height: orientation === 'vertical' ? 80 : undefined, width: 320, fontSize: 14 }}>
      <span>Above</span>
      <Divider orientation={orientation} colour={colour} />
      <span>Below</span>
    </div>
  ),
};
