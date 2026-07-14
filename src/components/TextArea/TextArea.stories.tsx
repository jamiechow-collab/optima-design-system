import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TextArea, TextAreaValidation } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Text Area',
  component: TextArea,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    validationText: { control: 'text' },
    validation: { control: 'select', options: ['default', 'error', 'success'] },
    showTooltip: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    maxLength: { control: 'number' },
    resizable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
};

export default meta;

interface PlaygroundArgs {
  label: string;
  placeholder: string;
  value: string;
  helperText: string;
  validationText: string;
  validation: TextAreaValidation;
  showTooltip: boolean;
  showCounter: boolean;
  maxLength: number;
  resizable: boolean;
  disabled: boolean;
  readOnly: boolean;
}

const renderPlayground = (args: PlaygroundArgs) => (
  <div style={{ width: 320 }}>
    <TextArea {...args} onChange={() => {}} />
  </div>
);

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: 'Hint text',
    validationText: '',
    validation: 'default',
    showTooltip: true,
    showCounter: true,
    maxLength: 100,
    resizable: true,
    disabled: false,
    readOnly: false,
  },
  render: renderPlayground,
};

export const ErrorValidation: StoryObj<PlaygroundArgs> = {
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: '',
    validationText: 'Validation text',
    validation: 'error',
    showTooltip: true,
    showCounter: true,
    maxLength: 100,
    resizable: true,
    disabled: false,
    readOnly: false,
  },
  render: renderPlayground,
};

export const SuccessValidation: StoryObj<PlaygroundArgs> = {
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: '',
    validationText: 'Validation text',
    validation: 'success',
    showTooltip: true,
    showCounter: true,
    maxLength: 100,
    resizable: true,
    disabled: false,
    readOnly: false,
  },
  render: renderPlayground,
};
