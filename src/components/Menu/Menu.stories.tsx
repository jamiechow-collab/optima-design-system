import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu, MenuItem, MenuDivider, MenuItemProps } from './Menu';
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

const sharedArgTypes = {
  state: stateArgType,
  label: { control: 'text' as const },
  showLeadingIcon: { control: 'boolean' as const, name: 'leading icon' },
  showTrailingIcon: { control: 'boolean' as const, name: 'trailing icon' },
  showShortcut: { control: 'boolean' as const, name: 'shortcut' },
  checked: { control: 'boolean' as const },
};

const renderPlayground = ({
  state,
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
//  a single-item control set doesn't map cleanly; shown as fixed examples.
// ─────────────────────────────────────────────────────────────────────────────

export const WithDividers: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Item 1" />
      <MenuItem label="Item 2" />
      <MenuDivider />
      <MenuItem label="Item 3" />
      <MenuItem label="Item 4" />
      <MenuDivider />
      <MenuItem label="Item 5" />
    </Menu>
  ),
};

export const WithAlertItem: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Duplicate" />
      <MenuItem label="Rename" />
      <MenuDivider />
      <MenuItem label="Delete" alert />
    </Menu>
  ),
};

export const Sizes: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <Menu>
        <MenuItem size="sm" label="Small" />
        <MenuItem size="sm" label="Menu item" />
      </Menu>
      <Menu>
        <MenuItem size="md" label="Medium" />
        <MenuItem size="md" label="Menu item" />
      </Menu>
      <Menu>
        <MenuItem size="lg" label="Large" />
        <MenuItem size="lg" label="Menu item" />
      </Menu>
    </div>
  ),
};
