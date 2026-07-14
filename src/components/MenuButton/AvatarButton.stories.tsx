import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AvatarMenuButton } from './MenuButton';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';
import { AvatarSize } from '../Avatar/Avatar';

const meta: Meta = {
  title: 'Components/Menu/Menu Button/Avatar Button',
  parameters: { layout: 'padded' },
};

export default meta;

interface PlaygroundArgs {
  size: AvatarSize;
  initials: string;
  disabled: boolean;
}

const SampleMenu = () => (
  <Menu>
    <MenuItem label="Profile" />
    <MenuItem label="Settings" />
    <MenuDivider />
    <MenuItem label="Log out" alert />
  </Menu>
);

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    initials: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    initials: 'JC',
    disabled: false,
  },
  render: ({ size, initials, disabled }) => (
    <AvatarMenuButton size={size} initials={initials} alt="Jamie Chow" disabled={disabled}>
      <SampleMenu />
    </AvatarMenuButton>
  ),
};

export const Sizes: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <AvatarMenuButton size="sm" initials="JC" alt="Jamie Chow">
        <SampleMenu />
      </AvatarMenuButton>
      <AvatarMenuButton size="md" initials="JC" alt="Jamie Chow">
        <SampleMenu />
      </AvatarMenuButton>
      <AvatarMenuButton size="lg" initials="JC" alt="Jamie Chow">
        <SampleMenu />
      </AvatarMenuButton>
    </div>
  ),
};
