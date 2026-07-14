import React, { useEffect, useRef, useState } from 'react';
import { Calendar, CalendarMode, CalendarValue } from './Calendar';
import { Icon } from '../Icon/Icon';
import { formatDate } from './dateUtils';
import './DatePicker.css';

export type DatePickerMode = CalendarMode;
export type DatePickerValue = CalendarValue;

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

export const DatePicker = ({
  mode = 'single',
  value,
  onChange,
  label,
  placeholder,
  helperText,
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
      {open && (
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
