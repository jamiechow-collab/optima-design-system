import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu, MenuItem, MenuDivider, MenuItemProps, MenuItemSize } from './Menu';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu/Basic Menu',
  component: Menu,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  Shared playground — every story exposes the same controls (state, leading
//  icon, trailing icon, shortcut, checked) so any combination can be explored.
// ─────────────────────────────────────────────────────────────────────────────

type ItemState = 'default' | 'hover' | 'focused' | 'pressed' | 'disabled' | 'alert' | 'alertHover';

const stateToProps = (state: ItemState): Partial<MenuItemProps> => {
  switch (state) {
    case 'hover':
      return { forcedState: 'hover' };
    case 'focused':
      return { forcedState: 'focused' };
    case 'pressed':
      return { forcedState: 'pressed' };
    case 'disabled':
      return { disabled: true };
    case 'alert':
      return { alert: true };
    case 'alertHover':
      return { alert: true, forcedState: 'alert-hover' };
    default:
      return {};
  }
};

interface PlaygroundArgs {
  state: ItemState;
  size: MenuItemSize;
  label: string;
  title?: string;
  description?: string;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
  showShortcut: boolean;
  checked: boolean;
}

const stateArgType = {
  control: 'select' as const,
  options: ['default', 'hover', 'focused', 'pressed', 'disabled', 'alert', 'alertHover'],
};

const sizeArgType = {
  control: 'select' as const,
  options: ['sm', 'md', 'lg'],
};

const sharedArgTypes = {
  state: stateArgType,
  size: sizeArgType,
  label: { control: 'text' as const },
  showLeadingIcon: { control: 'boolean' as const, name: 'leading icon' },
  showTrailingIcon: { control: 'boolean' as const, name: 'trailing icon' },
  showShortcut: { control: 'boolean' as const, name: 'shortcut' },
  checked: { control: 'boolean' as const },
};

const renderPlayground = ({
  state,
  size,
  label,
  title,
  description,
  showLeadingIcon,
  showTrailingIcon,
  showShortcut,
  checked,
}: PlaygroundArgs) => (
  <Menu>
    <MenuItem
      size={size}
      label={label}
      title={title}
      description={description}
      checked={checked}
      leadingIcon={showLeadingIcon ? <Icon name="setting-cog" size="sm" /> : undefined}
      trailingIcon={showTrailingIcon ? <Icon name="arrow-top-right" size="sm" /> : undefined}
      shortcut={showShortcut ? '⌘K' : undefined}
      {...stateToProps(state)}
    />
  </Menu>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Types — one story per Menu Item type, all sharing the same controls
// ─────────────────────────────────────────────────────────────────────────────

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: sharedArgTypes,
  args: {
    state: 'default',
    size: 'sm',
    label: 'Menu item',
    showLeadingIcon: false,
    showTrailingIcon: false,
    showShortcut: false,
    checked: false,
  },
  render: renderPlayground,
};

export const WithTitle: StoryObj<PlaygroundArgs> = {
  argTypes: { ...sharedArgTypes, title: { control: 'text' } },
  args: {
    state: 'default',
    size: 'sm',
    title: 'Title',
    label: 'Label',
    showLeadingIcon: false,
    showTrailingIcon: false,
    showShortcut: false,
    checked: false,
  },
  render: renderPlayground,
};

export const WithDescription: StoryObj<PlaygroundArgs> = {
  argTypes: { ...sharedArgTypes, description: { control: 'text' } },
  args: {
    state: 'default',
    size: 'sm',
    label: 'Label',
    description: 'Description',
    showLeadingIcon: false,
    showTrailingIcon: false,
    showShortcut: false,
    checked: false,
  },
  render: renderPlayground,
};

// ─────────────────────────────────────────────────────────────────────────────
//  List-composition examples — illustrate patterns across several items, so
//  a single-item control set doesn't map cleanly; only `size` is exposed, so
//  the sizes previously shown in their own "Sizes" story can be explored here
//  on every variant instead.
// ─────────────────────────────────────────────────────────────────────────────

interface ListArgs {
  size: MenuItemSize;
}

export const WithDividers: StoryObj<ListArgs> = {
  argTypes: { size: sizeArgType },
  args: { size: 'sm' },
  render: ({ size }) => (
    <Menu>
      <MenuItem size={size} label="Item 1" />
      <MenuItem size={size} label="Item 2" />
      <MenuDivider />
      <MenuItem size={size} label="Item 3" />
      <MenuItem size={size} label="Item 4" />
      <MenuDivider />
      <MenuItem size={size} label="Item 5" />
    </Menu>
  ),
};

export const WithAlertItem: StoryObj<ListArgs> = {
  argTypes: { size: sizeArgType },
  args: { size: 'sm' },
  render: ({ size }) => (
    <Menu>
      <MenuItem size={size} label="Duplicate" />
      <MenuItem size={size} label="Rename" />
      <MenuDivider />
      <MenuItem size={size} label="Delete" alert />
    </Menu>
  ),
};
