import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu, MenuItem } from './Menu';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu/Sub-Menu',
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
      <MenuItem label="New" />
      <MenuItem label="Open" />
      <MenuItem
        label="Share"
        submenu={
          <>
            <MenuItem label="Email" />
            <MenuItem label="Copy link" />
            <MenuItem label="Invite people" />
          </>
        }
      />
      <MenuItem label="Rename" />
    </Menu>
  ),
};

export const WithLeadingIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Settings" leadingIcon={<Icon name="setting-cog" size="sm" />} />
      <MenuItem
        label="Export"
        leadingIcon={<Icon name="download" size="sm" />}
        submenu={
          <>
            <MenuItem label="PDF" />
            <MenuItem label="CSV" />
            <MenuItem label="PNG" />
          </>
        }
      />
    </Menu>
  ),
};

export const SharedLabelRemoved: Story = {
  name: 'Shared Label Removed',
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem
        label="Export as..."
        submenu={
          <>
            {/* The recurring "Export as" term is dropped from each submenu label so it's quick to scan */}
            <MenuItem label="PDF" />
            <MenuItem label="CSV" />
            <MenuItem label="PNG" />
          </>
        }
      />
    </Menu>
  ),
};
