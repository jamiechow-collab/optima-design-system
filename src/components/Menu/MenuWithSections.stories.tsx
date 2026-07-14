import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu, MenuItem, MenuDivider, MenuSectionTitle } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu/Menu with Sections',
  component: Menu,
  parameters: { layout: 'padded' },
  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuSectionTitle>File</MenuSectionTitle>
      <MenuItem label="New" shortcut="⌘N" />
      <MenuItem label="Open" shortcut="⌘O" />
      <MenuDivider />
      <MenuSectionTitle>Edit</MenuSectionTitle>
      <MenuItem label="Cut" shortcut="⌘X" />
      <MenuItem label="Copy" shortcut="⌘C" />
      <MenuItem label="Paste" shortcut="⌘V" />
    </Menu>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <Menu>
        <MenuSectionTitle size="sm">Section title</MenuSectionTitle>
        <MenuItem size="sm" label="Item A" />
        <MenuItem size="sm" label="Item B" />
      </Menu>
      <Menu>
        <MenuSectionTitle size="md">Section title</MenuSectionTitle>
        <MenuItem size="md" label="Item A" />
        <MenuItem size="md" label="Item B" />
      </Menu>
      <Menu>
        <MenuSectionTitle size="lg">Section title</MenuSectionTitle>
        <MenuItem size="lg" label="Item A" />
        <MenuItem size="lg" label="Item B" />
      </Menu>
    </div>
  ),
};
