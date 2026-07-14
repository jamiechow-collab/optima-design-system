import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Dropdown, ComboBox, ComboBoxMultiSelect, DropdownOption } from './Dropdown';

const OPTIONS: DropdownOption[] = [
  { value: 'a', label: 'Item A' },
  { value: 'b', label: 'Item B' },
  { value: 'c', label: 'Item C' },
  { value: 'd', label: 'Item D (disabled)', disabled: true },
  { value: 'e', label: 'Item E' },
  { value: 'f', label: 'Item F' },
];

const meta: Meta = {
  title: 'Components/Dropdown',
  parameters: { layout: 'centered' },
};

export default meta;

export const Basic: StoryObj = {
  render: () => {
    const BasicDemo = () => {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <div style={{ width: 360 }}>
          <Dropdown options={OPTIONS} value={value} onChange={setValue} />
        </div>
      );
    };
    return <BasicDemo />;
  },
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

export const ComboBoxSingleSelect: StoryObj = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string | undefined>(undefined);
      return (
        <div style={{ width: 384 }}>
          <ComboBox options={OPTIONS} value={value} onChange={setValue} placeholder="Search…" />
        </div>
      );
    };
    return <Demo />;
  },
};

export const ComboBoxSingleSelectDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 384 }}>
      <ComboBox options={OPTIONS} value="a" disabled onChange={() => {}} />
    </div>
  ),
};

export const ComboBoxMultiSelectStory: StoryObj = {
  name: 'Combo Box — Multi-select',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<string[]>(['a', 'b']);
      return (
        <div style={{ width: 384 }}>
          <ComboBoxMultiSelect
            options={OPTIONS}
            value={value}
            onChange={setValue}
            placeholder="Search…"
          />
        </div>
      );
    };
    return <Demo />;
  },
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
