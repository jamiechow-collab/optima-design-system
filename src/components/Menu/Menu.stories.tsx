import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Menu, MenuItem, MenuDivider, CheckIcon, ChevronRightIcon } from './Menu';

// ── Story-only icons ──────────────────────────────────────────────────────────

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
    <path
      d="M7 1.5v1M7 11.5v1M12.5 7h-1M2.5 7h-1M10.95 3.05l-.7.7M3.75 10.25l-.7.7M10.95 10.95l-.7-.7M3.75 3.75l-.7-.7"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    children: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ─────────────────────────────────────────────────────────────────────────────
//  Individual stories
// ─────────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Menu item',
    showLeadingIcon: false,
    showShortcut: false,
  } as any,
  argTypes: {
    label:           { control: 'text',    name: 'Label',        description: 'Menu item label text' },
    showLeadingIcon: { control: 'boolean', name: 'Leading Icon', description: 'Toggle a leading icon' },
    showShortcut:    { control: 'boolean', name: 'Shortcut',     description: 'Toggle a keyboard shortcut (⌘K)' },
  } as any,
  render: (args: any) => {
    const { label = 'Menu item', showLeadingIcon, showShortcut } = args;
    return (
      <Menu>
        <MenuItem
          label={label}
          leadingIcon={showLeadingIcon ? <SettingsIcon /> : undefined}
          shortcut={showShortcut ? '⌘K' : undefined}
        />
      </Menu>
    );
  },
};

export const WithLeadingIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Settings"    leadingIcon={<SettingsIcon />} />
      <MenuItem label="Preferences" leadingIcon={<SettingsIcon />} />
      <MenuItem label="Integrations" leadingIcon={<SettingsIcon />} />
      <MenuDivider />
      <MenuItem label="Remove"      leadingIcon={<SettingsIcon />} alert />
    </Menu>
  ),
};

export const WithShortcuts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Cut"        shortcut="⌘X" />
      <MenuItem label="Copy"       shortcut="⌘C" />
      <MenuItem label="Paste"      shortcut="⌘V" />
      <MenuDivider />
      <MenuItem label="Select all" shortcut="⌘A" />
      <MenuItem label="Find"       shortcut="⌘F" disabled />
    </Menu>
  ),
};

export const WithCheckmarks: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="List view"    selectable checked />
      <MenuItem label="Board view"   selectable />
      <MenuItem label="Timeline"     selectable />
      <MenuItem label="Calendar"     selectable />
      <MenuItem label="Gallery"      selectable />
      <MenuDivider />
      <MenuItem label="Show sidebar" selectable />
      <MenuItem label="Show toolbar" selectable />
    </Menu>
  ),
};

export const WithSubmenus: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem
        label="New"
        submenu={
          <Menu>
            <MenuItem label="Document" />
            <MenuItem label="Spreadsheet" />
            <MenuItem label="Presentation" />
          </Menu>
        }
      />
      <MenuItem
        label="Open recent"
        submenu={
          <Menu>
            <MenuItem label="Project Alpha" />
            <MenuItem label="Project Beta" />
            <MenuItem label="Project Gamma" />
          </Menu>
        }
      />
      <MenuItem
        label="Share"
        submenu={
          <Menu>
            <MenuItem label="Email" />
            <MenuItem label="Copy link" shortcut="⌘⇧C" />
            <MenuItem label="Message" />
          </Menu>
        }
      />
      <MenuDivider />
      <MenuItem
        label="Export as"
        submenu={
          <Menu>
            <MenuItem label="PDF" />
            <MenuItem label="PNG" />
            <MenuItem label="SVG" />
          </Menu>
        }
      />
      <MenuItem label="Print" shortcut="⌘P" />
    </Menu>
  ),
};

export const WithDividers: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Cut"    shortcut="⌘X" />
      <MenuItem label="Copy"   shortcut="⌘C" />
      <MenuItem label="Paste"  shortcut="⌘V" />
      <MenuDivider />
      <MenuItem label="Rename" shortcut="F2" />
      <MenuItem label="Duplicate" />
      <MenuDivider />
      <MenuItem label="Delete" alert />
    </Menu>
  ),
};

export const WithAlertItem: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Menu>
      <MenuItem label="Rename"    />
      <MenuItem label="Duplicate" />
      <MenuItem label="Share"     hasSubmenu />
      <MenuDivider />
      <MenuItem label="Remove"    alert />
    </Menu>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  Shared doc-page styles (same pattern as Button)
// ─────────────────────────────────────────────────────────────────────────────

const docPage: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 14,
  color: '#111827',
  padding: '32px 32px 64px',
  background: '#f9fafb',
  minHeight: '100vh',
};

const section: React.CSSProperties = { marginBottom: 40 };

const divider: React.CSSProperties = {
  borderTop: '1px solid #E5E7EB',
  paddingTop: 16,
  marginBottom: 16,
};

const h1: React.CSSProperties = {
  fontSize: 28, fontWeight: 700, margin: '0 0 8px', color: '#111827', maxWidth: 600,
};

const h2: React.CSSProperties = {
  fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: '#111827',
};

const p: React.CSSProperties = {
  fontSize: 14, lineHeight: 1.6, color: '#374151', margin: '0 0 12px', maxWidth: 600,
};

const bold: React.CSSProperties = { fontWeight: 700 };

const li: React.CSSProperties = {
  fontSize: 14, lineHeight: 1.7, color: '#374151', marginLeft: 20,
};

// ─────────────────────────────────────────────────────────────────────────────
//  States grid helpers
// ─────────────────────────────────────────────────────────────────────────────

type MenuState = 'default' | 'hover' | 'focused' | 'pressed' | 'disabled' | 'alert' | 'alert-hover';

const STATES: { label: string; state: MenuState }[] = [
  { label: 'Default',     state: 'default'     },
  { label: 'Hover',       state: 'hover'        },
  { label: 'Focused',     state: 'focused'      },
  { label: 'Pressed',     state: 'pressed'      },
  { label: 'Disabled',    state: 'disabled'     },
  { label: 'Alert',       state: 'alert'        },
  { label: 'Alert hover', state: 'alert-hover'  },
];

const toForcedState = (s: MenuState) => {
  if (s === 'hover' || s === 'alert-hover') return 'hover'  as const;
  if (s === 'focused')                      return 'focused' as const;
  if (s === 'pressed')                      return 'pressed' as const;
  return undefined;
};

const isAlert    = (s: MenuState) => s === 'alert' || s === 'alert-hover';
const isDisabled = (s: MenuState) => s === 'disabled';
const isAlertRow = (s: MenuState) => s === 'alert' || s === 'alert-hover';

interface GridItemProps {
  state: MenuState;
  label?: string;
  leadingIcon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  hasSubmenu?: boolean;
}

const GridItem = ({ state, label = 'Label', leadingIcon, shortcut, checked, hasSubmenu }: GridItemProps) => (
  <ul
    role="menu"
    style={{
      listStyle: 'none', margin: 0, padding: 0,
      background: 'transparent', border: 'none', boxShadow: 'none', minWidth: 0,
    }}
  >
    <MenuItem
      label={label}
      leadingIcon={leadingIcon}
      shortcut={shortcut}
      checked={checked}
      hasSubmenu={hasSubmenu}
      disabled={isDisabled(state)}
      alert={isAlert(state)}
      forcedState={toForcedState(state)}
    />
  </ul>
);

// ─────────────────────────────────────────────────────────────────────────────
//  All Variants — full states × types grid
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_W  = 90;
const STATE_W    = 90;
const COL_LABEL  = 160;
const COL_ICON   = 170;
const COL_SHORT  = 160;
const COL_CHECK  = 160;
const COL_CHEV   = 155;
const COL_COMBO  = 195;

const COLUMNS = [
  { key: 'label',   label: 'Label only',                  w: COL_LABEL },
  { key: 'icon',    label: 'With leading icon',            w: COL_ICON  },
  { key: 'short',   label: 'With shortcut',                w: COL_SHORT },
  { key: 'check',   label: 'With checkmark',               w: COL_CHECK },
  { key: 'chev',    label: 'With chevron',                 w: COL_CHEV  },
  { key: 'combo',   label: 'With shortcut and checkmark',  w: COL_COMBO },
];

const cell = (w: number): React.CSSProperties => ({
  width: w, flexShrink: 0, display: 'flex', alignItems: 'center',
});

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: 32,
        background: '#f3f4f6',
        minHeight: '100vh',
        overflowX: 'auto',
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#111827' }}>
        Menu
      </h2>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>
        Menu items come in various types and states to communicate different actions and contexts.
      </p>

      {/* Column headers */}
      <div style={{ display: 'flex', marginBottom: 6, paddingLeft: VARIANT_W + STATE_W }}>
        {COLUMNS.map(({ label, w }) => (
          <div key={label} style={{ width: w, flexShrink: 0, fontSize: 12, color: '#6B7280' }}>
            {label}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div
        style={{
          background: '#fff', borderRadius: 10, border: '1px solid #E5E7EB',
          padding: '8px 0',
        }}
      >
        {STATES.map(({ label: stateLabel, state }) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            {/* Variant name (only on middle row) */}
            <div
              style={{
                width: VARIANT_W, flexShrink: 0, fontWeight: 700, fontSize: 13,
                color: '#374151', textAlign: 'center',
                visibility: state === 'focused' ? 'visible' : 'hidden',
              }}
            >
              Menu items
            </div>

            {/* State label */}
            <div style={{ width: STATE_W, flexShrink: 0, fontSize: 11, color: '#9CA3AF' }}>
              — {stateLabel}
            </div>

            {/* Label only */}
            <div style={cell(COL_LABEL)}>
              <GridItem state={state} />
            </div>

            {/* With leading icon */}
            <div style={cell(COL_ICON)}>
              <GridItem state={state} leadingIcon={<SettingsIcon />} />
            </div>

            {/* With shortcut — only for non-alert rows */}
            <div style={cell(COL_SHORT)}>
              {!isAlertRow(state) && <GridItem state={state} shortcut="⌘K" />}
            </div>

            {/* With checkmark — only for non-alert rows */}
            <div style={cell(COL_CHECK)}>
              {!isAlertRow(state) && <GridItem state={state} checked />}
            </div>

            {/* With chevron — only for non-alert rows */}
            <div style={cell(COL_CHEV)}>
              {!isAlertRow(state) && <GridItem state={state} hasSubmenu />}
            </div>

            {/* Shortcut + checkmark — only for non-alert rows */}
            <div style={cell(COL_COMBO)}>
              {!isAlertRow(state) && <GridItem state={state} checked shortcut="⌘K" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  Usage — design guideline tab
// ─────────────────────────────────────────────────────────────────────────────

export const Usage: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Usage</h1>
      <p style={p}>
        A menu is a list of interactive options that appears when users interact with an element or
        perform a specific action.
      </p>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Overview</h2></div>
        <p style={p}>
          A menu is a disclosure component that appears with a set of actions relevant to a specific
          control, interface area, data element, or application view. Typically, this context is
          determined by the user's current selection prior to invoking the menu. Menus can be opened
          from components such as menu buttons or through right-clicking.
        </p>
        <p style={p}>
          This guidance will help you understand how to format, structure, and use the menu
          component effectively.
        </p>

        {/* Overview demo — menu with submenu */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start', marginTop: 16 }}>
          <Menu>
            <MenuItem label="Item 1" />
            <MenuItem label="Item 2" />
            <MenuItem label="Item 3" hasSubmenu forcedState="focused" />
            <MenuItem label="Item 6" />
            <MenuItem label="Item 7" />
            <MenuDivider />
            <MenuItem label="Label" alert />
          </Menu>
          <Menu style={{ marginLeft: -1, marginTop: 36 * 2 }}>
            <MenuItem label="Item 3A" />
            <MenuItem label="Item 3B" />
            <MenuItem label="Item 3C" />
          </Menu>
        </div>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>When to use</h2></div>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Declutter interface</p>
        <p style={p}>
          In general, use menus to hide less frequently used or advanced options until users
          specifically need them. This keeps the interface clean and focused on essential elements.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Context menu</p>
        <p style={p}>
          Context menus are triggered by a right-click interaction. A context menu is a defined list
          of options in a menu that appears above all other content on a page and is related to the
          selected content or element it was triggered from.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Customisable actions</p>
        <p style={p}>
          Menus can speed up interactions for advanced users who are already familiar with the
          application. These users often rely on shortcuts and context-specific actions to work more
          efficiently.
        </p>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>When not to use</h2></div>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Form submission</p>
        <p style={p}>
          When submitting a form with a static list of options for users to choose from, or when
          filtering, use a dropdown instead of a menu.
        </p>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Anatomy</h2></div>

        {/* Annotated anatomy demo */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 24 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, color: '#9B59B6', marginBottom: 4 }}>Trigger</div>
            <Menu>
              <MenuItem label="Item 1" shortcut="⌘K" />
              <MenuItem label="Item 2" />
              <MenuItem label="Item 3" hasSubmenu />
              <MenuItem label="Item 6" />
              <MenuItem label="Item 7" leadingIcon={<SettingsIcon />} />
              <MenuDivider />
              <MenuItem label="Label" alert />
            </Menu>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#9B59B6', marginBottom: 4, marginLeft: 0 }}>&nbsp;</div>
            <Menu>
              <MenuItem label="Item 1" />
              <MenuItem label="Item 2" />
              <MenuItem label="Item 3" hasSubmenu checked />
              <MenuItem label="Item 7" />
              <MenuDivider />
              <MenuItem label="Label" alert />
            </Menu>
          </div>
        </div>

        <p style={{ ...p, ...bold, marginBottom: 2 }}>Trigger</p>
        <p style={p}>
          Elements that are triggered to display a list of available actions. These menu triggers
          can include a menu button, a combo button, and an overflow menu within menu buttons. Menus
          can also be opened when right-clicking on a page or specific element, like a column, or a row.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Menu item</p>
        <p style={p}>
          A menu item that can be activated to apply its action on certain elements. This item can
          be accompanied by a submenu indicator or keyboard shortcuts.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Divider</p>
        <p style={p}>A rule that indicates different sections within the menu.</p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Leading icon (optional)</p>
        <p style={p}>
          Always use text label only by default. ONLY use leading icon if it helps users to
          navigate; only use icons that users are familiar with.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Keyboard shortcut</p>
        <p style={p}>Certain action items may also have keyboard shortcuts.</p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Chevron</p>
        <p style={p}>An icon that indicates a submenu.</p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Menu dropdown</p>
        <p style={p}>
          A container that displays the open state and contains a list of menu items that can be
          selected.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Checkmark</p>
        <p style={p}>An item that can be selected. The selection can be single or multi-selected.</p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Submenu</p>
        <p style={p}>A nested level off of the primary level.</p>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  Formatting — design guideline tab
// ─────────────────────────────────────────────────────────────────────────────

const ExampleMenu = ({ checked }: { checked?: boolean }) => (
  <Menu>
    <MenuItem label="Label" checked={checked} />
    <MenuItem label="Label" />
    <MenuItem label="Label" />
    <MenuItem label="Label" />
    <MenuItem label="Label" />
    <MenuDivider />
    <MenuItem label="Label" />
    <MenuItem label="Label" />
  </Menu>
);

export const Formatting: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Formatting</h1>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Width</h2></div>
        <p style={p}>
          By default, the menu maintains a minimum width of 176px to prevent a narrow appearance.
        </p>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <ExampleMenu checked />
            <div style={{ fontSize: 12, color: '#9B59B6', marginTop: 6 }}>← 176px →</div>
          </div>
          <div>
            <ExampleMenu checked />
            <div style={{ fontSize: 12, color: '#9B59B6', marginTop: 6 }}>← 176px →</div>
          </div>
        </div>
        <p style={p}>
          If the menu item labels become longer, the menu button and combo button remain the same
          size, while the menu dropdown component can expand up to a maximum of 304px.
          Conversely, if the button labels become longer, the menu component should not appear
          narrower but should extend to match the width of the menu buttons.
        </p>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
          <div>
            <Menu>
              <MenuItem label="When menu item has long label" checked />
              <MenuItem label="Label" /><MenuItem label="Label" /><MenuItem label="Label" />
              <MenuDivider />
              <MenuItem label="Label" /><MenuItem label="Label" />
            </Menu>
          </div>
          <div>
            <Menu>
              <MenuItem label="When menu item label is too long th…" checked />
              <MenuItem label="Label" /><MenuItem label="Label" /><MenuItem label="Label" />
              <MenuDivider />
              <MenuItem label="Label" /><MenuItem label="Label" />
            </Menu>
          </div>
        </div>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Alignment</h2></div>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Default</p>
        <p style={p}>
          By default, combo button, menu button, or overflow button remains positioned at the top,
          to the left or right side of the menu when it is open, depending on the available space
          and layout.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Alternatives</p>
        <p style={p}>
          Alternatively, open menus can be positioned at the bottom, to the left or right of its
          associated menu button trigger, depending on the available space and layout.
        </p>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Content</h2></div>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Ordering and grouping</p>
        <p style={p}>
          To aid discoverability, arrange menu items in a meaningful sequence that aligns with the
          order of operations. To help users focus on the most relevant options, place the ones used
          most often at the top.
        </p>
        <p style={p}>
          When there is a significant amount of menu items, it's advisable to group them into
          sections, separated by divider lines.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Number of items within a menu</p>
        <p style={p}>
          Expansive lists of options in menus can overwhelm users. With context menu and overflow
          menu, keep the list length manageable by including no more than 12 items to help users
          scan through items easily without having to scroll. With menu buttons, keep the menu list
          smaller with under 5 items.
        </p>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Submenu</h2></div>
        <p style={p}>
          A submenu is a menu item with the chevron icon on the right, offering additional related
          commands. While submenus can help tidy up a context menu and make its options clearer,
          introducing multiple levels of submenus can make the user experience more complex and
          harder to navigate. Avoid multiple levels of nesting when it comes to submenus.
        </p>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Actions associated with a shared label</p>
        <p style={p}>
          When a term appears in more than two menu items in the same group, consider eliminating
          the recurring term in the submenu label to help people predict its content and scan easily.
        </p>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  Behaviour — design guideline tab
// ─────────────────────────────────────────────────────────────────────────────

export const Behaviour: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Behaviour</h1>

      <div style={section}>
        <div style={divider}><h2 style={h2}>States</h2></div>
        <p style={p}>
          Menu items have seven states: enabled, hover, focus, focus and hover, danger hover, danger
          hover and focus, and disabled.
        </p>

        <div style={{ marginBottom: 16 }}>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Default</p>
          <p style={p}>
            When an action in the list is live but a user is not directly interacting with it. This
            is commonly referred to as the default or normal state of the component.
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Hover</p>
          <p style={p}>
            When a user's mouse cursor is hovering over the menu item in menus or submenus.
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Focus</p>
          <p style={p}>
            When a user tabs to or clicks on a menu trigger. This will open up the menu list. The
            first item in the menu list has the focus state as default.
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Pressed</p>
          <p style={p}>
            When a user tabs to or clicks on a menu trigger. This will open up the menu list. The
            first item in the menu list has the focus state as default.
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Disabled</p>
          <p style={p}>
            When an action is not able to be performed at a certain time, but will be possible to be
            performed by that user, at another point in time. Actions that are permissions-based
            should be hidden if it is never possible for a user to perform that action.
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Alert</p>
          <p style={p}>
            When an action could have destructive effects on the user's data (for example, delete or
            remove).
          </p>
          <p style={{ ...p, ...bold, marginBottom: 2 }}>Alert hover</p>
          <p style={p}>
            When a user's mouse cursor is hovering over the menu item that is in Alert state.
          </p>
        </div>

        {/* States grid */}
        <div style={{ overflowX: 'auto' }}>
          {/* Column headers */}
          <div style={{ display: 'flex', marginBottom: 4, paddingLeft: STATE_W }}>
            {COLUMNS.map(({ label, w }) => (
              <div key={label} style={{ width: w, flexShrink: 0, fontSize: 11, color: '#6B7280' }}>
                {label}
              </div>
            ))}
          </div>

          {/* Data rows */}
          <div style={{ borderRadius: 8, border: '1px solid #E5E7EB', background: '#fff', padding: '4px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8, marginBottom: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#374151', width: 80, flexShrink: 0 }}>
                Menu items
              </div>
            </div>
            {STATES.map(({ label: stateLabel, state }) => (
              <div key={state} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: STATE_W, flexShrink: 0, fontSize: 11, color: '#9CA3AF', paddingLeft: 8 }}>
                  — {stateLabel}
                </div>
                <div style={cell(COL_LABEL)}><GridItem state={state} /></div>
                <div style={cell(COL_ICON)}><GridItem state={state} leadingIcon={<SettingsIcon />} /></div>
                <div style={cell(COL_SHORT)}>{!isAlertRow(state) && <GridItem state={state} shortcut="⌘K" />}</div>
                <div style={cell(COL_CHECK)}>{!isAlertRow(state) && <GridItem state={state} checked />}</div>
                <div style={cell(COL_CHEV)}>{!isAlertRow(state) && <GridItem state={state} hasSubmenu />}</div>
                <div style={cell(COL_COMBO)}>{!isAlertRow(state) && <GridItem state={state} checked shortcut="⌘K" />}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={section}>
        <div style={divider}><h2 style={h2}>Interactions</h2></div>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Mouse</p>
        <p style={p}>
          Once the menu opens by clicking on a menu button trigger or right-clicking on an area,
          users can:
        </p>
        <ul style={{ margin: '0 0 12px', padding: 0 }}>
          <li style={li}>Select or deselect an item by clicking on it</li>
          <li style={li}>Hover over the item with the caret icon to reveal additional options or actions from that item</li>
          <li style={li}>Click outside of the menu area to close it</li>
        </ul>
        <p style={{ ...p, ...bold, marginBottom: 2 }}>Keyboard</p>
        <p style={p}>
          Once the menu opens by pressing Return or Enter on the menu trigger, users can:
        </p>
        <ul style={{ margin: 0, padding: 0 }}>
          <li style={li}>Press Up and Down arrows to navigate between menu options</li>
          <li style={li}>Press Return or Enter or Right arrow on the item with the caret icon to reveal additional options</li>
          <li style={li}>Press Return or Enter on an item to select or deselect it</li>
          <li style={li}>Press Escape to close it</li>
        </ul>
      </div>
    </div>
  ),
};
