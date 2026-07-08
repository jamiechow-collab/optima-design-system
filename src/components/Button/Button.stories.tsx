import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from './Button';

// ── Shared icon ────────────────────────────────────────────────────────────

const InfoIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="5.5" r="1" fill="currentColor" />
    <rect x="7.25" y="7.5" width="1.5" height="4" rx="0.75" fill="currentColor" />
  </svg>
);

// ── Story types ─────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual emphasis level',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button height — sm 32px, md 40px, lg 48px',
    },
    disabled: { control: 'boolean' },
    // hidden at meta level; stories opt-in individually
    iconOnly:   { table: { disable: true } },
    leftIcon:   { table: { disable: true } },
    rightIcon:  { table: { disable: true } },
    children:   { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ── Shared render helper for stories with icon toggles ──────────────────────
// `showLeftIcon` / `showRightIcon` are synthetic boolean args that Storybook
// exposes as toggles; the render function converts them to the actual ReactNode prop.

const withIconToggles = (args: any) => {
  const { showLeftIcon, showRightIcon, ...rest } = args;
  return (
    <Button
      {...rest}
      leftIcon={showLeftIcon  ? <InfoIcon /> : undefined}
      rightIcon={showRightIcon ? <InfoIcon /> : undefined}
    />
  );
};

const iconToggleArgTypes = {
  showLeftIcon:  { control: 'boolean', name: 'Left Icon',  description: 'Toggle a left icon' },
  showRightIcon: { control: 'boolean', name: 'Right Icon', description: 'Toggle a right icon' },
};

// ─────────────────────────────────────────────────────────────────────────────
//  Individual control-driven stories
// ─────────────────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button Text', showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', children: 'Button Text', showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md', children: 'Button Text', showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Button Text', showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Button Text', showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const WithLeftIcon: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button Text', showLeftIcon: true, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const WithRightIcon: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button Text', showLeftIcon: false, showRightIcon: true } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

export const IconOnly: Story = {
  args: { variant: 'primary', size: 'md', iconOnly: true, 'aria-label': 'Action' } as any,
  argTypes: {
    // hide controls that don't apply to an icon-only button
    children:     { table: { disable: true } },
    iconOnly:     { table: { disable: true } },
    showLeftIcon: { table: { disable: true } },
    showRightIcon:{ table: { disable: true } },
  },
  render: (args: any) => <Button {...args}><InfoIcon /></Button>,
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', children: 'Button Text', disabled: true, showLeftIcon: false, showRightIcon: false } as any,
  argTypes: iconToggleArgTypes,
  render: withIconToggles,
};

// ─────────────────────────────────────────────────────────────────────────────
//  Shared story styles
// ─────────────────────────────────────────────────────────────────────────────

const docPage: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSize: 14,
  color: '#111827',
  padding: '32px 32px 64px',
  background: '#f9fafb',
  minHeight: '100vh',
};

const section: React.CSSProperties = {
  marginBottom: 40,
};

const divider: React.CSSProperties = {
  borderTop: '1px solid #E5E7EB',
  paddingTop: 16,
  marginBottom: 16,
};

const h1: React.CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  margin: '0 0 8px',
  color: '#111827',
  maxWidth: 600,
};

const h2: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  margin: '0 0 4px',
  color: '#111827',
};

const p: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: '#374151',
  margin: '0 0 12px',
  maxWidth: 600,
};

const label: React.CSSProperties = {
  fontSize: 12,
  color: '#9B59B6',
  fontWeight: 500,
  marginBottom: 8,
};

const row: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  flexWrap: 'wrap' as const,
  marginTop: 8,
};

// ─────────────────────────────────────────────────────────────────────────────
//  Usage — design guideline tab 1
// ─────────────────────────────────────────────────────────────────────────────

export const Usage: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Usage</h1>
      <p style={p}>
        Buttons are used to initialize an action. Button labels express what action will occur when
        the user interacts with it.
      </p>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Overview</h2>
        </div>
        <p style={p}>
          Buttons are clickable elements that are used to trigger actions. They communicate calls to
          action to the user and allow users to interact with pages in a variety of ways. Button
          labels express what action will occur when the user interacts with it.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
          <Button variant="primary" size="lg">Button Text</Button>
        </div>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>When to use</h2>
        </div>
        <p style={p}>
          Use buttons to communicate actions users can take and to allow users to interact with the
          page. Each page should have only one primary button. Any remaining calls to action should
          be represented as lower emphasis buttons.
        </p>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>When not to use</h2>
        </div>
        <p style={p}>
          Do not use buttons as navigational elements. Instead, use{' '}
          <span style={{ color: '#3758F9', textDecoration: 'underline', cursor: 'pointer' }}>links</span> when the desired action is to take the
          user to a new page.
        </p>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Variant</h2>
        </div>
        <p style={{ ...p, fontWeight: 700 }}>Primary</p>
        <p style={p}>
          For the principal call to action on the page. Primary buttons should only appear once per
          screen (not including the application header, modal dialog, or side panel).
        </p>
        <p style={{ ...p, fontWeight: 700 }}>Secondary</p>
        <p style={p}>
          For secondary actions on each page. Secondary buttons can only be used in conjunction with
          a primary button. As part of a pair, the secondary button's function is to perform the
          negative action of the set, such as "Cancel" or "Back". Do not use a secondary button in
          isolation and do not use a secondary button for a positive action.
        </p>
        <p style={{ ...p, fontWeight: 700 }}>Ghost</p>
        <p style={p}>
          Lowest emphasis. Use for supplementary actions in toolbars, data lists, or dashboards
          where multiple actions are needed and visual weight must be minimised.
        </p>
        <div style={row}>
          <div>
            <div style={label}>Primary</div>
            <Button variant="primary">Button Text</Button>
          </div>
          <div>
            <div style={label}>Secondary</div>
            <Button variant="secondary">Button Text</Button>
          </div>
          <div>
            <div style={label}>Ghost</div>
            <Button variant="ghost">Button Text</Button>
          </div>
        </div>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Types</h2>
        </div>
        <div style={row}>
          <div>
            <div style={label}>Text only</div>
            <Button variant="primary">Button Text</Button>
          </div>
          <div>
            <div style={label}>With left icon</div>
            <Button variant="primary" leftIcon={<InfoIcon />}>Button Text</Button>
          </div>
          <div>
            <div style={label}>With right icon</div>
            <Button variant="primary" rightIcon={<InfoIcon />}>Button Text</Button>
          </div>
          <div>
            <div style={label}>Icon only</div>
            <Button variant="primary" iconOnly aria-label="Action"><InfoIcon /></Button>
          </div>
        </div>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Anatomy</h2>
        </div>
        <div style={row}>
          <div>
            <Button variant="primary" leftIcon={<InfoIcon />}>Button Text</Button>
            <div style={{ fontSize: 11, color: '#9B59B6', marginTop: 6 }}>
              <div>← Left icon (optional)</div>
              <div style={{ marginLeft: 32 }}>Label</div>
            </div>
            <div style={{ fontSize: 11, color: '#9B59B6' }}>Container</div>
          </div>
          <div style={{ marginLeft: 24 }}>
            <Button variant="primary" rightIcon={<InfoIcon />}>Button Text</Button>
            <div style={{ fontSize: 11, color: '#9B59B6', marginTop: 6 }}>
              Right icon (optional) →
            </div>
            <div style={{ fontSize: 11, color: '#9B59B6' }}>Container</div>
          </div>
          <div style={{ marginLeft: 24 }}>
            <Button variant="primary" iconOnly aria-label="Action"><InfoIcon /></Button>
            <div style={{ fontSize: 11, color: '#9B59B6', marginTop: 6 }}>Icon</div>
            <div style={{ fontSize: 11, color: '#9B59B6' }}>Container</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  Behaviour — design guideline tab 2
// ─────────────────────────────────────────────────────────────────────────────

type ForcedState = 'default' | 'hover' | 'pressed' | 'focused' | 'disabled';

const STATE_ROWS: { label: string; state: ForcedState }[] = [
  { label: 'Default',  state: 'default'  },
  { label: 'Hover',    state: 'hover'    },
  { label: 'Pressed',  state: 'pressed'  },
  { label: 'Focused',  state: 'focused'  },
  { label: 'Disabled', state: 'disabled' },
];

const stateClass = (state: ForcedState) => {
  if (state === 'hover')   return 'is-hover';
  if (state === 'pressed') return 'is-pressed';
  if (state === 'focused') return 'is-focused';
  return '';
};

interface StateGridProps {
  variant: 'primary' | 'secondary' | 'ghost';
}

const StateGrid = ({ variant }: StateGridProps) => {
  const STATE_W = 90;
  const COL_W   = 130;

  const cell: React.CSSProperties = {
    width: COL_W,
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '4px 0',
  };

  return (
    <div style={{ marginBottom: 40 }}>
      {/* Header: variant name + column labels */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ width: STATE_W, flexShrink: 0, fontWeight: 700, fontSize: 14 }}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </div>
        {(['Text only', 'With left icon', 'With right icon', 'Icon only'] as const).map((colLabel) => (
          <div key={colLabel} style={{ width: COL_W, flexShrink: 0, textAlign: 'center', fontSize: 12, color: '#6B7280' }}>
            {colLabel}
          </div>
        ))}
      </div>

      {STATE_ROWS.map(({ label, state }) => (
        <div key={state} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ width: STATE_W, flexShrink: 0, fontSize: 12, color: '#9CA3AF' }}>— {label}</div>

          <div style={cell}>
            <Button variant={variant} size="md" disabled={state === 'disabled'} className={stateClass(state)}>
              Button Text
            </Button>
          </div>

          <div style={cell}>
            <Button variant={variant} size="md" leftIcon={<InfoIcon />} disabled={state === 'disabled'} className={stateClass(state)}>
              Button Text
            </Button>
          </div>

          <div style={cell}>
            <Button variant={variant} size="md" rightIcon={<InfoIcon />} disabled={state === 'disabled'} className={stateClass(state)}>
              Button Text
            </Button>
          </div>

          <div style={cell}>
            <Button variant={variant} size="md" iconOnly disabled={state === 'disabled'} className={stateClass(state)} aria-label="Action">
              <InfoIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Formatting — design guideline tab 3
// ─────────────────────────────────────────────────────────────────────────────

export const Formatting: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Formatting</h1>

      {/* Sizes */}
      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Sizes</h2>
        </div>
        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Small (SM)</p>
        <p style={p}>Use when buttons are paired with 32px small sized input fields.</p>
        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Medium (MD)</p>
        <p style={p}>Use when buttons are paired with 40px medium sized input fields.</p>
        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Large (LG)</p>
        <p style={p}>This is the most common button size in software products. Pairs with 16px body copy.</p>
        <div style={row}>
          <div>
            <div style={label}>Small</div>
            <Button variant="primary" size="sm">Button Text</Button>
          </div>
          <div>
            <div style={label}>Medium</div>
            <Button variant="primary" size="md">Button Text</Button>
          </div>
          <div>
            <div style={label}>Large</div>
            <Button variant="primary" size="lg">Button Text</Button>
          </div>
        </div>
      </div>

      {/* Emphasis */}
      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Emphasis</h2>
        </div>
        <p style={p}>
          You don't necessarily need to use the buttons in the order that their labels imply.
          Although secondary buttons have less visual prominence because they are less saturated than
          their primary counterparts, they are still tonally heavy. If your layout requires multiple
          actions—as is the case with some toolbars, data lists and dashboards—low emphasis buttons
          (tertiary or ghost) may be a better choice.
        </p>
        <p style={p}>
          The most important thing is to establish a visual hierarchy between the buttons in your
          UI. Keep these best practices in mind.
        </p>

        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>A single, high-emphasis button</p>
        <p style={p}>
          As a general rule, a layout should contain a single high-emphasis button that makes it
          clear that other buttons have less importance in the hierarchy. This high-emphasis button
          commands the most attention.
        </p>

        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Multiple button emphasis</p>
        <p style={p}>
          A high-emphasis button can be accompanied by medium- and low-emphasis buttons that
          perform less important actions. Keep in mind that you should only group together calls to
          action that have a relationship to one another.
        </p>

        {/* Do */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ ...label, color: '#9B59B6' }}>Do</div>
          <div
            style={{
              border: '1.5px solid #E5E7EB',
              borderRadius: 8,
              padding: '20px 20px',
              display: 'inline-flex',
              gap: 12,
              background: '#fff',
            }}
          >
            <Button variant="secondary">Button Text</Button>
            <Button variant="primary">Button Text</Button>
          </div>
        </div>

        {/* Don't */}
        <div>
          <div style={{ ...label, color: '#9B59B6' }}>Don't</div>
          <div
            style={{
              border: '1.5px solid #E5E7EB',
              borderRadius: 8,
              padding: '20px 20px',
              display: 'inline-flex',
              gap: 12,
              background: '#fff',
            }}
          >
            <Button variant="primary">Button Text</Button>
            <Button variant="primary">Button Text</Button>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Behaviour: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div style={docPage}>
      <h1 style={h1}>Behaviour</h1>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>States</h2>
        </div>
        <p style={p}>
          Menu items have seven states: enabled, hover, focus, focus and hover, danger hover, danger
          hover and focus, and disabled.
        </p>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <StateGrid variant="primary" />
          <StateGrid variant="secondary" />
          <StateGrid variant="ghost" />
        </div>
      </div>

      <div style={section}>
        <div style={divider}>
          <h2 style={h2}>Interactions</h2>
        </div>
        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Mouse</p>
        <p style={p}>Users can trigger a button by clicking anywhere within the button container.</p>
        <p style={{ ...p, fontWeight: 700, marginBottom: 2 }}>Keyboard</p>
        <p style={p}>
          Users can trigger a button by pressing Enter or Space while the button has focus.
        </p>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  All Variants — full spec grid (matches the overview screenshot)
// ─────────────────────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => {
    // Column widths — variant(80) + state(90) + text(130) + leftIcon(150) + rightIcon(150) + iconOnly(80)
    const VARIANT_W = 80;
    const STATE_W   = 90;
    const COL_TEXT  = 130;
    const COL_ICON  = 150;
    const COL_ONLY  = 80;

    const cell = (w: number): React.CSSProperties => ({
      width: w,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 0',
    });

    return (
      <div
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: 32,
          background: '#f3f4f6',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#111827' }}>
          Buttons
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>
          Button comes in various styles, such as primary, secondary, outlined, and icon buttons,
          to indicate different functionalities.
        </p>

        {/* Column header row */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6, paddingLeft: VARIANT_W + STATE_W }}>
          {[
            { label: 'Text only',       w: COL_TEXT },
            { label: 'With left icon',  w: COL_ICON },
            { label: 'With right icon', w: COL_ICON },
            { label: 'Icon only',       w: COL_ONLY },
          ].map(({ label: colLabel, w }) => (
            <div key={colLabel} style={{ width: w, flexShrink: 0, textAlign: 'center', fontSize: 12, color: '#6B7280' }}>
              {colLabel}
            </div>
          ))}
        </div>

        {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
          <div
            key={variant}
            style={{
              display: 'flex',
              background: '#fff',
              borderRadius: 10,
              border: '1px solid #E5E7EB',
              marginBottom: 24,
              padding: '10px 0',
            }}
          >
            {/* Variant name — spans all state rows via flex alignment */}
            <div
              style={{
                width: VARIANT_W,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                color: '#374151',
              }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </div>

            {/* State rows */}
            <div style={{ flex: 1 }}>
              {STATE_ROWS.map(({ label: stateLabel, state }) => (
                <div key={state} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                  {/* State label */}
                  <div style={{ width: STATE_W, flexShrink: 0, fontSize: 11, color: '#9CA3AF' }}>
                    — {stateLabel}
                  </div>

                  <div style={cell(COL_TEXT)}>
                    <Button variant={variant} size="md" disabled={state === 'disabled'} className={stateClass(state)}>
                      Button Text
                    </Button>
                  </div>

                  <div style={cell(COL_ICON)}>
                    <Button variant={variant} size="md" leftIcon={<InfoIcon />} disabled={state === 'disabled'} className={stateClass(state)}>
                      Button Text
                    </Button>
                  </div>

                  <div style={cell(COL_ICON)}>
                    <Button variant={variant} size="md" rightIcon={<InfoIcon />} disabled={state === 'disabled'} className={stateClass(state)}>
                      Button Text
                    </Button>
                  </div>

                  <div style={cell(COL_ONLY)}>
                    <Button variant={variant} size="md" iconOnly disabled={state === 'disabled'} className={stateClass(state)} aria-label="Action">
                      <InfoIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
