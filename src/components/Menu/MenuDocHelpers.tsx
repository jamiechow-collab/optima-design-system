import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuSectionTitle } from './Menu';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for the Menu / Sub-Menu / Menu with Sections docs —
//  replicate the guideline cards.
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

const SettingsIcon = () => <Icon name="setting-cog" size="sm" />;

// ── Overview — the "Brand colour" two-menu example ──────────────────────────

export const OverviewExample = () => (
  <div style={card}>
    <Menu>
      <MenuItem label="Item 1" />
      <MenuItem label="Item 2" />
      <MenuDivider />
      <MenuSectionTitle>Section title</MenuSectionTitle>
      <MenuItem label="Item 3" />
      <MenuItem label="Item 4" checked hasSubmenu />
      <MenuItem label="Item 5" />
      <MenuItem label="Item 6" checked shortcut="⌘K" />
    </Menu>
    <Menu>
      <MenuItem label="Item 7" />
      <MenuItem label="Item 8" />
      <MenuItem label="Item 9" />
      <MenuItem label="Item 10" />
    </Menu>
  </div>
);

// ── Types ────────────────────────────────────────────────────────────────────

export const TypesExample = () => (
  <div style={{ ...card, background: '#EBEBEB' }}>
    <div style={example}>
      <span style={exampleLabel}>Single line</span>
      <Menu>
        <MenuItem label="Label" />
      </Menu>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With title</span>
      <Menu>
        <MenuItem title="Title" label="Label" />
      </Menu>
    </div>
    <div style={example}>
      <span style={exampleLabel}>With description</span>
      <Menu>
        <MenuItem label="Label" description="Description" />
      </Menu>
    </div>
  </div>
);

// ── Sizes ────────────────────────────────────────────────────────────────────

export const SizesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <Menu>
        <MenuItem size="sm" label="Label" />
      </Menu>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <Menu>
        <MenuItem size="md" label="Label" />
      </Menu>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Large</span>
      <Menu>
        <MenuItem size="lg" label="Label" />
      </Menu>
    </div>
  </div>
);

// ── States ───────────────────────────────────────────────────────────────────

const STATE_ROWS: { name: string; forcedState?: 'hover' | 'focused' | 'pressed' | 'alert-hover'; disabled?: boolean; alert?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', forcedState: 'hover' },
  { name: 'Focused', forcedState: 'focused' },
  { name: 'Pressed', forcedState: 'pressed' },
  { name: 'Disabled', disabled: true },
  { name: 'Alert', alert: true },
  { name: 'Alert hover', alert: true, forcedState: 'alert-hover' },
];

export const StatesExample = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
      columnGap: 16,
      rowGap: 8,
      alignItems: 'center',
      padding: 32,
      border: '1px solid #D1D1D1',
      borderRadius: 16,
      background: '#fff',
      width: 'fit-content',
    }}
  >
    {STATE_ROWS.map((row) => (
      <React.Fragment key={row.name}>
        <span style={exampleLabel}>{row.name}</span>
        <Menu>
          <MenuItem
            label="Menu item"
            leadingIcon={<SettingsIcon />}
            forcedState={row.forcedState}
            disabled={row.disabled}
            alert={row.alert}
          />
        </Menu>
      </React.Fragment>
    ))}
  </div>
);

// ── Behaviour — long labels wrap onto a second line rather than truncating ──

export const BehaviourExample = () => (
  <div style={card}>
    <Menu>
      <MenuItem label="Long label will look like this" shortcut="⌘K" />
      <MenuItem label="Long label will look like this" />
      <MenuItem label="A very very Long label will look like this" />
    </Menu>
    <Menu>
      <MenuItem title="Title" label="Long label will look like this" />
      <MenuItem title="Title" label="Long label will look like this" />
      <MenuItem title="Title" label="When there are two lines, a very very very very very Long label will look like this" />
    </Menu>
  </div>
);

// ── Submenu ──────────────────────────────────────────────────────────────────

export const SubmenuExample = () => (
  <div style={card}>
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
  </div>
);

// ── Menu with sections ───────────────────────────────────────────────────────

export const SectionsExample = () => (
  <div style={card}>
    <Menu>
      <MenuItem label="Item A" shortcut="⌘K" />
      <MenuItem label="Item B" />
      <MenuItem label="Item C" hasSubmenu />
      <MenuDivider />
      <MenuItem label="Item E" />
      <MenuItem label="Item F" />
    </Menu>
    <Menu>
      <MenuSectionTitle>File</MenuSectionTitle>
      <MenuItem label="New" />
      <MenuItem label="Open" />
      <MenuDivider />
      <MenuSectionTitle>Edit</MenuSectionTitle>
      <MenuItem label="Cut" shortcut="⌘X" />
      <MenuItem label="Copy" shortcut="⌘C" />
      <MenuItem label="Paste" shortcut="⌘V" />
    </Menu>
  </div>
);

export const SectionSizesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>Small</span>
      <MenuSectionTitle size="sm">Section title</MenuSectionTitle>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Medium</span>
      <MenuSectionTitle size="md">Section title</MenuSectionTitle>
    </div>
    <div style={example}>
      <span style={exampleLabel}>Large</span>
      <MenuSectionTitle size="lg">Section title</MenuSectionTitle>
    </div>
  </div>
);
