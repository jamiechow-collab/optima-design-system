import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Toggletip, ToggletipPlacement, ToggletipVariant } from './Toggletip';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Toggletip> = {
  title: 'Components/Toggletips',
  parameters: { layout: 'centered' },
};

export default meta;

interface DefaultArgs {
  placement: ToggletipPlacement;
  variant: ToggletipVariant;
  title: string;
  description: string;
  actionLabel: string;
}

export const Default: StoryObj<DefaultArgs> = {
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    variant: { control: 'select', options: ['primary', 'secondary'] },
    title: { control: 'text' },
    description: { control: 'text' },
    actionLabel: { control: 'text' },
  },
  args: {
    placement: 'bottom',
    variant: 'primary',
    title: 'Rich Tooltips Title',
    description: 'More explanation or description about the the tips or information for the tooltips',
    actionLabel: 'Action',
  },
  render: ({ placement, variant, title, description, actionLabel }) => (
    <div style={{ padding: 120 }}>
      <Toggletip
        placement={placement}
        variant={variant}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={() => {}}
      >
        <button
          type="button"
          aria-label="More info"
          style={{
            display: 'inline-flex',
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            color: '#050505',
          }}
        >
          <Icon name="info-with-circle" />
        </button>
      </Toggletip>
    </div>
  ),
};

export const Placements: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 160px)',
        gap: 120,
        padding: 120,
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as ToggletipPlacement[]).map((placement) => (
        <Toggletip
          key={placement}
          placement={placement}
          title="Rich Tooltips Title"
          description="More explanation or description about the the tips or information for the tooltips"
          actionLabel="Action"
          onAction={() => {}}
        >
          <button
            type="button"
            aria-label={`Info — ${placement}`}
            style={{
              display: 'inline-flex',
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              color: '#050505',
            }}
          >
            <Icon name="info-with-circle" />
          </button>
        </Toggletip>
      ))}
    </div>
  ),
};

export const Variants: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 120, padding: 120 }}>
      {(['primary', 'secondary'] as ToggletipVariant[]).map((variant) => (
        <Toggletip
          key={variant}
          variant={variant}
          placement="bottom"
          title="Rich Tooltips Title"
          description="More explanation or description about the the tips or information for the tooltips"
          actionLabel="Action"
          onAction={() => {}}
        >
          <button
            type="button"
            aria-label={`Info — ${variant}`}
            style={{
              display: 'inline-flex',
              border: 'none',
              background: 'transparent',
              padding: 0,
              cursor: 'pointer',
              color: '#050505',
            }}
          >
            <Icon name="info-with-circle" />
          </button>
        </Toggletip>
      ))}
    </div>
  ),
};

export const WithoutAction: StoryObj = {
  render: () => (
    <div style={{ padding: 120 }}>
      <Toggletip
        placement="bottom"
        title="Rich Tooltips Title"
        description="More explanation or description about the the tips or information for the tooltips"
      >
        <button
          type="button"
          aria-label="More info"
          style={{
            display: 'inline-flex',
            border: 'none',
            background: 'transparent',
            padding: 0,
            cursor: 'pointer',
            color: '#050505',
          }}
        >
          <Icon name="info-with-circle" />
        </button>
      </Toggletip>
    </div>
  ),
};
