import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DatePicker, DatePickerValue } from './DatePicker';
import { DateField } from './DateField';
import { Calendar, CalendarValue } from './Calendar';

const meta: Meta = {
  title: 'Components/Date Picker',
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  name: 'Date Picker — Single date',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<DatePickerValue>(null);
      return (
        <div style={{ width: 320 }}>
          <DatePicker mode="single" value={value} onChange={setValue} label="Field title" />
        </div>
      );
    };
    return <Demo />;
  },
};

export const DateRange: StoryObj = {
  name: 'Date Picker — Range',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<DatePickerValue>([null, null]);
      return (
        <div style={{ width: 320 }}>
          <DatePicker mode="range" value={value} onChange={setValue} label="Field title" />
        </div>
      );
    };
    return <Demo />;
  },
};

export const DatePickerDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 320 }}>
      <DatePicker mode="single" value={null} onChange={() => {}} label="Field title" disabled />
    </div>
  ),
};

export const DateFieldStory: StoryObj = {
  name: 'Date Field — typed only',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<Date | null>(null);
      return (
        <div style={{ width: 320 }}>
          <DateField
            value={value}
            onChange={setValue}
            label="Date of birth"
            helperText="Give tips on filling the field"
          />
        </div>
      );
    };
    return <Demo />;
  },
};

export const DateFieldDisabled: StoryObj = {
  render: () => (
    <div style={{ width: 320 }}>
      <DateField value={new Date(2027, 7, 18)} onChange={() => {}} label="Date of birth" disabled />
    </div>
  ),
};

export const CalendarSingle: StoryObj = {
  name: 'Calendar — Single select',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<CalendarValue>(null);
      return <Calendar mode="single" value={value} onChange={setValue} />;
    };
    return <Demo />;
  },
};

export const CalendarRange: StoryObj = {
  name: 'Calendar — Range select',
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<CalendarValue>([new Date(2027, 7, 18), new Date(2027, 7, 24)]);
      return <Calendar mode="range" value={value} onChange={setValue} />;
    };
    return <Demo />;
  },
};

export const CalendarNoFooter: StoryObj = {
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState<CalendarValue>(null);
      return <Calendar mode="single" value={value} onChange={setValue} showFooter={false} showWeekNumbers={false} />;
    };
    return <Demo />;
  },
};
