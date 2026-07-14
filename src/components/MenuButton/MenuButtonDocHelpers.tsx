import React from 'react';
import { FilterMenuButton, InlineMenuButton, IconMenuButton, AvatarMenuButton } from './MenuButton';
import { Menu, MenuItem, MenuDivider } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for the Menu Button docs — replicate the guideline
//  cards. Every example is the real, clickable component.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
  flexWrap: 'wrap',
};

const example: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

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

export const VariantsExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Filter</span>
      <FilterMenuButton label="Button label">
        <SampleMenu />
      </FilterMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Inline</span>
      <InlineMenuButton label="Button label">
        <SampleMenu />
      </InlineMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Icon</span>
      <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label="More options">
        <SampleMenu />
      </IconMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Avatar</span>
      <AvatarMenuButton size="md" initials="JC" alt="Jamie Chow">
        <SampleMenu />
      </AvatarMenuButton>
    </div>
  </div>
);

export const PositionExample = () => (
  <div style={{ ...card, gap: 64 }}>
    <div style={example}>
      <span style={exampleLabel}>Bottom left (default)</span>
      <FilterMenuButton label="Button label" position="bottom-left">
        <SampleMenu />
      </FilterMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Bottom right</span>
      <FilterMenuButton label="Button label" position="bottom-right">
        <SampleMenu />
      </FilterMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Top left</span>
      <FilterMenuButton label="Button label" position="top-left">
        <SampleMenu />
      </FilterMenuButton>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Top right</span>
      <FilterMenuButton label="Button label" position="top-right">
        <SampleMenu />
      </FilterMenuButton>
    </div>
  </div>
);
