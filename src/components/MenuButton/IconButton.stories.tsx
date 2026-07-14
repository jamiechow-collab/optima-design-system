import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { IconMenuButton } from './MenuButton';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';

const meta: Meta = {
  title: 'Components/Menu/Menu Button/Icon Button',
  parameters: { layout: 'padded' },
};

export default meta;

interface PlaygroundArgs {
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
}

const SampleMenu = () => (
  <Menu>
    <MenuItem label="Item A" />
    <MenuItem label="Item B" />
    <MenuItem label="Item C" />
    <MenuDivider />
    <MenuItem label="Item E" />
    <MenuItem label="Item F" />
  </Menu>
);

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    disabled: false,
  },
  render: ({ size, disabled }) => (
    <IconMenuButton icon={<Icon name="more" />} aria-label="More options" size={size} disabled={disabled}>
      <SampleMenu />
    </IconMenuButton>
  ),
};

export const Sizes: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <IconMenuButton icon={<Icon name="more" />} aria-label="More options" size="sm">
        <SampleMenu />
      </IconMenuButton>
      <IconMenuButton icon={<Icon name="more" />} aria-label="More options" size="md">
        <SampleMenu />
      </IconMenuButton>
      <IconMenuButton icon={<Icon name="more" />} aria-label="More options" size="lg">
        <SampleMenu />
      </IconMenuButton>
    </div>
  ),
};
