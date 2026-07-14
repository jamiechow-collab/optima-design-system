import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { InlineMenuButton } from './MenuButton';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';

const meta: Meta = {
  title: 'Components/Menu/Menu Button/Inline Button',
  parameters: { layout: 'padded' },
};

export default meta;

interface PlaygroundArgs {
  label: string;
  disabled: boolean;
  showLeadingIcon: boolean;
  showBadge: boolean;
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
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
    showBadge: { control: 'boolean', name: 'badge' },
  },
  args: {
    label: 'Button label',
    disabled: false,
    showLeadingIcon: false,
    showBadge: false,
  },
  render: ({ label, disabled, showLeadingIcon, showBadge }) => (
    <InlineMenuButton
      label={label}
      disabled={disabled}
      leadingIcon={showLeadingIcon ? <Icon name="placeholder" size="sm" /> : undefined}
      badge={showBadge ? 3 : undefined}
    >
      <SampleMenu />
    </InlineMenuButton>
  ),
};
