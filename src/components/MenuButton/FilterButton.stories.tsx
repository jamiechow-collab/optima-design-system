import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FilterMenuButton } from './MenuButton';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { ToggleButtonSize } from '../ToggleButton/ToggleButton';

const meta: Meta = {
  title: 'Components/Menu/Menu Button/Filter Button',
  parameters: { layout: 'padded' },
};

export default meta;

interface PlaygroundArgs {
  size: ToggleButtonSize;
  label: string;
  active: boolean;
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

// Stateful wrapper so the "active" (filter-on) look can be toggled independently
// of the menu actually opening.
const Interactive = ({ size, label, active, disabled, showLeadingIcon, showBadge }: PlaygroundArgs) => {
  const [isActive, setIsActive] = useState(active);
  useEffect(() => setIsActive(active), [active]);
  return (
    <FilterMenuButton
      size={size}
      label={label}
      active={isActive}
      disabled={disabled}
      icon={showLeadingIcon ? <Icon name="funnel" /> : undefined}
      badge={showBadge ? 3 : undefined}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <SampleMenu />
    </FilterMenuButton>
  );
};

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
    showBadge: { control: 'boolean', name: 'badge' },
  },
  args: {
    size: 'sm',
    label: 'Button label',
    active: false,
    disabled: false,
    showLeadingIcon: false,
    showBadge: false,
  },
  render: Interactive,
};
