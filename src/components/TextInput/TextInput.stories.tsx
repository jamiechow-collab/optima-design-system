import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { TextInput, TextInputSize, TextInputValidation } from './TextInput';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input',
  component: TextInput,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    validationText: { control: 'text' },
    validation: { control: 'select', options: ['default', 'error', 'success'] },
    showTooltip: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    leadingPrefix: { table: { disable: true } },
    trailingPrefix: { table: { disable: true } },
  },
};

export default meta;

interface PlaygroundArgs {
  size: TextInputSize;
  label: string;
  placeholder: string;
  value: string;
  helperText: string;
  validationText: string;
  validation: TextInputValidation;
  showTooltip: boolean;
  disabled: boolean;
  readOnly: boolean;
  showLeadingIcon: boolean;
  showTrailingIcon: boolean;
  showLeadingPrefix: boolean;
  showTrailingPrefix: boolean;
}

const renderPlayground = ({
  showLeadingIcon,
  showTrailingIcon,
  showLeadingPrefix,
  showTrailingPrefix,
  ...args
}: PlaygroundArgs) => (
  <div style={{ width: 320 }}>
    <TextInput
      {...args}
      leadingIcon={showLeadingIcon ? <Icon name="placeholder" size="sm" /> : undefined}
      trailingIcon={showTrailingIcon ? <Icon name="placeholder" size="sm" /> : undefined}
      leadingPrefix={showLeadingPrefix ? '£' : undefined}
      trailingPrefix={showTrailingPrefix ? '%' : undefined}
      onChange={() => {}}
    />
  </div>
);

const adornmentArgTypes = {
  showLeadingIcon: { control: 'boolean' as const, name: 'leading icon' },
  showTrailingIcon: { control: 'boolean' as const, name: 'trailing icon' },
  showLeadingPrefix: { control: 'boolean' as const, name: 'leading prefix' },
  showTrailingPrefix: { control: 'boolean' as const, name: 'trailing prefix' },
};

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: adornmentArgTypes,
  args: {
    size: 'md',
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: 'Give tips on filling the field',
    validationText: '',
    validation: 'default',
    showTooltip: true,
    disabled: false,
    readOnly: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    showLeadingPrefix: false,
    showTrailingPrefix: false,
  },
  render: renderPlayground,
};

export const ErrorValidation: StoryObj<PlaygroundArgs> = {
  argTypes: adornmentArgTypes,
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: '',
    validationText: 'Validation text',
    validation: 'error',
    showTooltip: true,
    disabled: false,
    readOnly: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    showLeadingPrefix: false,
    showTrailingPrefix: false,
  },
  render: renderPlayground,
};

export const SuccessValidation: StoryObj<PlaygroundArgs> = {
  argTypes: adornmentArgTypes,
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: '',
    validationText: 'Validation text',
    validation: 'success',
    showTooltip: true,
    disabled: false,
    readOnly: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    showLeadingPrefix: false,
    showTrailingPrefix: false,
  },
  render: renderPlayground,
};

export const WithPrefixes: StoryObj<PlaygroundArgs> = {
  argTypes: adornmentArgTypes,
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: 'Give tips on filling the field',
    validationText: '',
    validation: 'default',
    showTooltip: true,
    disabled: false,
    readOnly: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    showLeadingPrefix: true,
    showTrailingPrefix: true,
  },
  render: renderPlayground,
};

export const Password: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showLeadingIcon: { table: { disable: true } },
    showTrailingIcon: { table: { disable: true } },
  },
  args: {
    label: 'Field title',
    placeholder: 'placeholder text',
    value: '',
    helperText: 'Give tips on filling the field',
    validationText: '',
    validation: 'default',
    showTooltip: true,
    disabled: false,
    readOnly: false,
  },
  render: ({ showLeadingIcon, showTrailingIcon, ...args }) => (
    <div style={{ width: 320 }}>
      <TextInput
        {...args}
        type="password"
        trailingIcon={<Icon name="show-eye" size="sm" />}
        onChange={() => {}}
      />
    </div>
  ),
};
