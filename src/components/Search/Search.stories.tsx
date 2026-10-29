import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Search, SearchSize } from './Search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    showTooltip: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;

interface PlaygroundArgs {
  size: SearchSize;
  label: string;
  placeholder: string;
  helperText: string;
  showTooltip: boolean;
  disabled: boolean;
  readOnly: boolean;
}

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    size: 'md',
    label: '',
    placeholder: 'Search',
    helperText: '',
    showTooltip: false,
    disabled: false,
    readOnly: false,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Search {...args} />
    </div>
  ),
};

export const Filled: StoryObj<PlaygroundArgs> = {
  args: { ...Default.args, size: 'md' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Search {...args} defaultValue="Filled text" />
    </div>
  ),
};

export const WithLabel: StoryObj<PlaygroundArgs> = {
  args: {
    ...Default.args,
    label: 'Field title',
    helperText: 'Give tips on filling the field',
    showTooltip: true,
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Search {...args} />
    </div>
  ),
};
