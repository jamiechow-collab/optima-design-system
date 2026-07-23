import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Tooltip, TooltipAlign, TooltipPlacement, TooltipVariant } from './Tooltip';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltips',
  parameters: { layout: 'centered' },
};

export default meta;

interface LabelArgs {
  variant: TooltipVariant;
  placement: TooltipPlacement;
  align: TooltipAlign;
  label: string;
}

export const LabelOnly: StoryObj<LabelArgs> = {
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    placement: { control: 'select', options: ['auto', 'top', 'bottom', 'left', 'right'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    placement: 'top',
    align: 'center',
    label: 'Label',
  },
  render: ({ variant, placement, align, label }) => (
    <div style={{ padding: 80 }}>
      <Tooltip variant={variant} placement={placement} align={align} label={label}>
        <span tabIndex={0} style={{ display: 'inline-flex' }}>
          <Icon name="info-with-circle" />
        </span>
      </Tooltip>
    </div>
  ),
};

interface WithTitleArgs {
  variant: TooltipVariant;
  placement: TooltipPlacement;
}

export const WithTitle: StoryObj<WithTitleArgs> = {
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    placement: { control: 'select', options: ['auto', 'top', 'bottom', 'left', 'right'] },
  },
  args: {
    variant: 'primary',
    placement: 'bottom',
  },
  render: ({ variant, placement }) => (
    <div style={{ padding: 100 }}>
      <Tooltip
        variant={variant}
        placement={placement}
        title="Brief description of a term"
        description="More detail about what this means, long enough to show how it wraps within the 200px maximum width."
      >
        <Button variant="secondary" iconOnly aria-label="Download">
          <Icon name="download" />
        </Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: StoryObj = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 120px)',
        gap: 80,
        padding: 80,
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as TooltipPlacement[]).map((placement) => (
        <Tooltip key={placement} label={placement} placement={placement}>
          <Button variant="secondary" iconOnly aria-label={placement}>
            <Icon name="download" />
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
