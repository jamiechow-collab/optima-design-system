import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, CalendarMode, CalendarValue } from './Calendar';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { Divider } from '../Divider/Divider';
import { addDays, addMonths, formatDate, isSameDay, shiftMonths, startOfDay } from './dateUtils';
import './DatePicker.css';

export type DatePickerMode = CalendarMode;
export type DatePickerValue = CalendarValue;

export interface DatePreset {
  key: string;
  label: string;
  /** The [start, end] range the pre-set selects, given today's date */
  range: (today: Date) => [Date, Date];
}

/** One year (default), last 6 months, last 3 months, last 30 days */
export const DEFAULT_PRESETS: DatePreset[] = [
  { key: 'one-year', label: 'One year', range: (t) => [shiftMonths(t, -12), t] },
  { key: '6-months', label: 'Last 6 months', range: (t) => [shiftMonths(t, -6), t] },
  { key: '3-months', label: 'Last 3 months', range: (t) => [shiftMonths(t, -3), t] },
  { key: '30-days', label: 'Last 30 days', range: (t) => [addDays(t, -29), t] },
];

export interface DatePickerProps {
  /** single (default) — one date. range — a [start, end] tuple */
  mode?: DatePickerMode;
  value: DatePickerValue;
  onChange: (value: DatePickerValue) => void;
  /** Text shown above the field */
  label?: React.ReactNode;
  placeholder?: string;
  /** Tips on filling the field, shown under it */
  helperText?: React.ReactNode;
  /** Range mode only: a column of pre-set buttons beside two side-by-side calendars. The first pre-set (one year) is selected by default; picking a date in the calendar deselects it. Pass `true` for the default pre-sets, or your own list */
  presets?: boolean | DatePreset[];
  showWeekNumbers?: boolean;
  /** Shows the Cancel/Apply footer in the calendar popover (default true) */
  showFooter?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

const formatValue = (mode: DatePickerMode, value: DatePickerValue, placeholder?: string) => {
  if (mode === 'range') {
    const [start, end] = Array.isArray(value) ? value : [null, null];
    if (start && end) return `${formatDate(start)} – ${formatDate(end)}`;
    if (start) return `${formatDate(start)} – …`;
    return placeholder ?? 'Select date range';
  }
  const single = !Array.isArray(value) ? value : null;
  return single ? formatDate(single) : placeholder ?? 'Select date';
};

/** Two calendars side by side that share one range: the start's month on the left, the end's month on the right. */
const PresetCalendars = ({
  value,
  today,
  onChange,
  showWeekNumbers,
  minDate,
  maxDate,
}: {
  value: DatePickerValue;
  today: Date;
  onChange: (value: CalendarValue) => void;
  showWeekNumbers: boolean;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [start, end] = Array.isArray(value) ? value : [null, null];
  const left = new Date((start || today).getFullYear(), (start || today).getMonth(), 1);
  let right = new Date((end || start || today).getFullYear(), (end || start || today).getMonth(), 1);
  if (right.getTime() <= left.getTime()) right = addMonths(left, 1);
  const common = { mode: 'range' as const, value, onChange, showWeekNumbers, showFooter: false, minDate, maxDate };
  return (
    <div className="ds-datepicker-presets__calendars">
      <Calendar {...common} defaultMonth={left} className="ds-calendar--bare" />
      <Calendar {...common} defaultMonth={right} className="ds-calendar--bare" />
    </div>
  );
};

export const DatePicker = ({
  mode = 'single',
  value,
  onChange,
  label,
  placeholder,
  helperText,
  presets: presetsProp = false,
  showWeekNumbers = true,
  showFooter = true,
  minDate,
  maxDate,
  disabled = false,
  className,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openValueRef = useRef<DatePickerValue>(value);
  // Guards against the trigger's onFocus handler re-opening the popover when
  // we programmatically refocus it right after closing (e.g. after a
  // selection or Escape) — a real user focus event should open it, a
  // refocus-after-close shouldn't.
  const skipNextFocusOpenRef = useRef(false);

  const presets = presetsProp === true ? DEFAULT_PRESETS : presetsProp || null;
  const usePresets = mode === 'range' && !!presets && presets.length > 0;
  const today = useMemo(() => startOfDay(new Date()), []);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  // Bumped when a pre-set is picked so the calendars jump to the new range
  const [presetNonce, setPresetNonce] = useState(0);

  const sameRange = (a: DatePickerValue, b: [Date, Date]) =>
    Array.isArray(a) && isSameDay(a[0], b[0]) && isSameDay(a[1], b[1]);

  // Pre-set variant: one year is selected by default
  useEffect(() => {
    if (!usePresets || !presets) return;
    const match = presets.find((p) => sameRange(value, p.range(today)));
    if (match) {
      setActivePreset(match.key);
    } else if (!(Array.isArray(value) && value[0])) {
      onChange(presets[0].range(today));
      setActivePreset(presets[0].key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choosePreset = (preset: DatePreset) => {
    onChange(preset.range(today));
    setActivePreset(preset.key);
    setPresetNonce((n) => n + 1);
  };

  const close = () => setOpen(false);

  const refocusTrigger = () => {
    skipNextFocusOpenRef.current = true;
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        refocusTrigger();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const openPopover = () => {
    if (disabled) return;
    openValueRef.current = value;
    setOpen(true);
  };

  const handleTriggerFocus = () => {
    if (skipNextFocusOpenRef.current) {
      skipNextFocusOpenRef.current = false;
      return;
    }
    openPopover();
  };

  const handleCalendarChange = (next: CalendarValue) => {
    onChange(next);
    if (usePresets) {
      setActivePreset(null); // picking a date deselects the pre-set
      return;
    }
    if (mode === 'single') {
      close();
      refocusTrigger();
    } else if (Array.isArray(next) && next[0] && next[1]) {
      close();
      refocusTrigger();
    }
  };

  const handleCancel = () => {
    onChange(openValueRef.current);
    if (usePresets && presets) setActivePreset(presets.find((pr) => sameRange(openValueRef.current, pr.range(today)))?.key ?? null);
    close();
    refocusTrigger();
  };

  const handleApply = () => {
    close();
    refocusTrigger();
  };

  const isEmpty = mode === 'range' ? !(Array.isArray(value) && value[0]) : !value;

  const classes = ['ds-datepicker', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      {label && <label className="ds-datepicker__label">{label}</label>}
      <button
        ref={triggerRef}
        type="button"
        className={['ds-datepicker__field', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openPopover}
        onFocus={handleTriggerFocus}
      >
        <span className={['ds-datepicker__value', isEmpty ? 'is-placeholder' : ''].filter(Boolean).join(' ')}>
          {formatValue(mode, value, placeholder)}
        </span>
        <span className="ds-datepicker__icon">
          <Icon name="calender" size="sm" />
        </span>
      </button>
      {open && usePresets && presets && (
        <div className="ds-datepicker__popover ds-datepicker__popover--presets">
          <div className="ds-datepicker-presets__content">
            <div className="ds-datepicker-presets__list">
              {presets.map((preset) => (
                <Button
                  key={preset.key}
                  variant={activePreset === preset.key ? 'primary' : 'ghost'}
                  size="xs"
                  aria-pressed={activePreset === preset.key}
                  onClick={() => choosePreset(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            <Divider orientation="vertical" />
            <PresetCalendars
              key={presetNonce}
              value={value}
              today={today}
              onChange={handleCalendarChange}
              showWeekNumbers={showWeekNumbers}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <div className="ds-datepicker-presets__footer">
            <Button variant="secondary" size="xs" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" size="xs" onClick={handleApply}>Apply</Button>
          </div>
        </div>
      )}
      {open && !usePresets && (
        <div className="ds-datepicker__popover">
          <Calendar
            mode={mode}
            value={value}
            onChange={handleCalendarChange}
            showWeekNumbers={showWeekNumbers}
            showFooter={showFooter}
            onCancel={handleCancel}
            onApply={handleApply}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
      {helperText && <p className="ds-datepicker__helper">{helperText}</p>}
    </div>
  );
};
