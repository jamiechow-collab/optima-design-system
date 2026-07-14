import React, { useState } from 'react';
import { DatePicker, DatePickerValue } from './DatePicker';
import { DateField } from './DateField';
import { Calendar, CalendarValue } from './Calendar';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for DatePicker.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  gap: 32,
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

export const AnatomyExample = () => {
  const Demo = () => {
    const [value, setValue] = useState<CalendarValue>(new Date(2027, 7, 3));
    return <Calendar mode="single" value={value} onChange={setValue} />;
  };
  return (
    <div style={{ ...card, width: 'fit-content' }}>
      <Demo />
    </div>
  );
};

const TypesDemo = () => {
  const [dob, setDob] = useState<Date | null>(null);
  const [single, setSingle] = useState<DatePickerValue>(null);
  const [range, setRange] = useState<DatePickerValue>([null, null]);
  return (
    <>
      <div style={example}>
        <span style={exampleLabel}>Date Field — typed only</span>
        <div style={{ width: 320 }}>
          <DateField value={dob} onChange={setDob} label="Date of birth" />
        </div>
      </div>
      <div style={example}>
        <span style={exampleLabel}>Date Picker — single date</span>
        <div style={{ width: 320 }}>
          <DatePicker mode="single" value={single} onChange={setSingle} label="Field title" />
        </div>
      </div>
      <div style={example}>
        <span style={exampleLabel}>Date Picker — range</span>
        <div style={{ width: 320 }}>
          <DatePicker mode="range" value={range} onChange={setRange} label="Field title" />
        </div>
      </div>
    </>
  );
};

export const TypesExample = () => (
  <div style={card}>
    <TypesDemo />
  </div>
);

const STATES: { name: string; cls?: string; disabled?: boolean }[] = [
  { name: 'Default' },
  { name: 'Hover', cls: 'is-hover' },
  { name: 'Active', cls: 'is-active' },
  { name: 'Focused', cls: 'is-focused' },
  { name: 'Disabled', disabled: true },
];

export const StatesExample = () => (
  <div style={{ ...card, gap: 48 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={exampleLabel}>Date Field</span>
      {STATES.map((state) => (
        <div key={state.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0 }}>{state.name}</span>
          <div style={{ width: 280 }}>
            <DateField
              value={state.disabled ? new Date(2027, 7, 18) : null}
              onChange={() => {}}
              disabled={state.disabled}
              className={state.cls}
            />
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={exampleLabel}>Date Picker</span>
      {STATES.map((state) => (
        <div key={state.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ ...exampleLabel, width: 70, flexShrink: 0 }}>{state.name}</span>
          <div style={{ width: 280 }}>
            <DatePicker
              mode="single"
              value={state.disabled ? new Date(2027, 7, 18) : null}
              onChange={() => {}}
              disabled={state.disabled}
              className={state.cls}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
