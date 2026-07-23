import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown, ComboBox, ComboBoxMultiSelect, DropdownOption, DropdownSize } from './Dropdown';

const OPTIONS: DropdownOption[] = [
  { value: 'a', label: 'Item A' },
  { value: 'b', label: 'Item B' },
  { value: 'c', label: 'Item C' },
  { value: 'd', label: 'Item D (disabled)', disabled: true },
  { value: 'e', label: 'Item E' },
  { value: 'f', label: 'Item F' },
];

const VALUE_LABELS: Record<string, string> = {
  '': '— none —',
  ...Object.fromEntries(OPTIONS.map((o) => [o.value, o.label])),
};

const meta: Meta = {
  title: 'Components/Dropdown',
  parameters: { layout: 'centered' },
};

export default meta;

interface BasicPlaygroundArgs {
  size: DropdownSize;
  fieldTitle: string;
  label: string;
  value: string;
  helperText: string;
  disabled: boolean;
}

export const Basic: StoryObj<BasicPlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    fieldTitle: { control: 'text', name: 'Field title' },
    label: { control: 'text', name: 'placeholder' },
    value: { control: { type: 'select', labels: VALUE_LABELS }, options: ['', ...OPTIONS.map((o) => o.value)] },
    helperText: { control: 'text', name: 'helper text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    fieldTitle: '',
    label: 'Dropdown label',
    value: '',
    helperText: '',
    disabled: false,
  },
  render: ({ size, fieldTitle, label, value, helperText, disabled }) => (
    <div style={{ width: 360 }}>
      <Dropdown
        size={size}
        fieldTitle={fieldTitle || undefined}
        label={label}
        value={value || undefined}
        helperText={helperText || undefined}
        disabled={disabled}
        options={OPTIONS}
        onChange={() => {}}
      />
    </div>
  ),
};

export const BasicWithHelperText: StoryObj = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | undefined>('b');
      return (
        <div style={{ width: 360 }}>
          <Dropdown
            options={OPTIONS}
            value={value}
            onChange={setValue}
            helperText="Give tips on filling the field"
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const BasicDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 360 }}>
      <Dropdown options={OPTIONS} disabled onChange={() => {}} />
    </div>
  ),
};

interface ComboBoxPlaygroundArgs {
  size: DropdownSize;
  fieldTitle: string;
  placeholder: string;
  value: string;
  helperText: string;
  disabled: boolean;
}

export const ComboBoxSingleSelect: StoryObj<ComboBoxPlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    fieldTitle: { control: 'text', name: 'Field title' },
    placeholder: { control: 'text' },
    value: { control: { type: 'select', labels: VALUE_LABELS }, options: ['', ...OPTIONS.map((o) => o.value)] },
    helperText: { control: 'text', name: 'helper text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    fieldTitle: 'Field title',
    placeholder: 'Search…',
    value: '',
    helperText: '',
    disabled: false,
  },
  render: ({ size, fieldTitle, placeholder, value, helperText, disabled }) => (
    <div style={{ width: 384 }}>
      <ComboBox
        size={size}
        fieldTitle={fieldTitle}
        placeholder={placeholder}
        value={value || undefined}
        helperText={helperText || undefined}
        disabled={disabled}
        options={OPTIONS}
        onChange={() => {}}
      />
    </div>
  ),
};

export const ComboBoxSingleSelectDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 384 }}>
      <ComboBox options={OPTIONS} value="a" disabled onChange={() => {}} />
    </div>
  ),
};

interface ComboBoxMultiPlaygroundArgs {
  size: DropdownSize;
  fieldTitle: string;
  placeholder: string;
  value: string[];
  helperText: string;
  disabled: boolean;
}

export const ComboBoxMultiSelectStory: StoryObj<ComboBoxMultiPlaygroundArgs> = {
  name: 'Combo Box — Multi-select',
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    fieldTitle: { control: 'text', name: 'Field title' },
    placeholder: { control: 'text' },
    value: {
      control: { type: 'multi-select', labels: VALUE_LABELS },
      options: OPTIONS.map((o) => o.value),
    },
    helperText: { control: 'text', name: 'helper text' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    fieldTitle: 'Field title',
    placeholder: 'Search…',
    value: ['a', 'b'],
    helperText: '',
    disabled: false,
  },
  render: ({ size, fieldTitle, placeholder, value, helperText, disabled }) => (
    <div style={{ width: 384 }}>
      <ComboBoxMultiSelect
        size={size}
        fieldTitle={fieldTitle}
        placeholder={placeholder}
        value={value}
        helperText={helperText || undefined}
        disabled={disabled}
        options={OPTIONS}
        onChange={() => {}}
      />
    </div>
  ),
};

export const ComboBoxMultiSelectDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 384 }}>
      <ComboBoxMultiSelect options={OPTIONS} value={['a', 'b']} disabled onChange={() => {}} />
    </div>
  ),
};

export const AllTypes: StoryObj = {
  render: () => {
    const Demo = () => {
      const [basic, setBasic] = useState<string | undefined>(undefined);
      const [combo, setCombo] = useState<string | undefined>(undefined);
      const [multi, setMulti] = useState<string[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: 384 }}>
          <Dropdown options={OPTIONS} value={basic} onChange={setBasic} />
          <ComboBox options={OPTIONS} value={combo} onChange={setCombo} />
          <ComboBoxMultiSelect options={OPTIONS} value={multi} onChange={setMulti} />
        </div>
      );
    };
    return <Demo />;
  },
};

export const Sizes: StoryObj = {
  render: () => {
    const Demo = () => {
      const [basic, setBasic] = useState<string | undefined>(undefined);
      const [combo, setCombo] = useState<string | undefined>(undefined);
      const [multi, setMulti] = useState<string[]>(['a', 'b']);
      return (
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 384 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Small</span>
            <Dropdown size="sm" options={OPTIONS} value={basic} onChange={setBasic} />
            <ComboBox size="sm" options={OPTIONS} value={combo} onChange={setCombo} placeholder="Search…" />
            <ComboBoxMultiSelect
              size="sm"
              options={OPTIONS}
              value={multi}
              onChange={setMulti}
              placeholder="Search…"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 384 }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Medium</span>
            <Dropdown size="md" options={OPTIONS} value={basic} onChange={setBasic} />
            <ComboBox size="md" options={OPTIONS} value={combo} onChange={setCombo} placeholder="Search…" />
            <ComboBoxMultiSelect
              size="md"
              options={OPTIONS}
              value={multi}
              onChange={setMulti}
              placeholder="Search…"
            />
          </div>
        </div>
      );
    };
    return <Demo />;
  },
};
