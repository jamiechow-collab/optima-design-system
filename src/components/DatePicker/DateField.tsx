import React, { useEffect, useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { isSameDay, parseDate } from './dateUtils';
import './DateField.css';

const pad2 = (n: number) => String(n).padStart(2, '0');

const digitsOnly = (value: string) => value.replace(/\D/g, '');

export interface DateFieldProps {
  /** Text shown above the field */
  label?: React.ReactNode;
  value: Date | null;
  onChange: (value: Date | null) => void;
  /** Tips on filling the field, shown under it */
  helperText?: React.ReactNode;
  /** Off by default — this variant is for dates typed from memory, no popover */
  showCalendarIcon?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const DateField = ({
  label,
  value,
  onChange,
  helperText,
  showCalendarIcon = false,
  disabled = false,
  readOnly = false,
  className,
  ...rest
}: DateFieldProps) => {
  const [day, setDay] = useState(value ? pad2(value.getDate()) : '');
  const [month, setMonth] = useState(value ? pad2(value.getMonth() + 1) : '');
  const [year, setYear] = useState(value ? String(value.getFullYear()) : '');
  const [focusedSegment, setFocusedSegment] = useState<'day' | 'month' | 'year' | null>(null);
  const generatedId = useId();

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Resync from an externally-changed value (e.g. parent reset) — but only
  // when it actually differs from what the segments currently represent, so
  // we don't clobber in-progress typing.
  useEffect(() => {
    const currentlyValid = day.length === 2 && month.length === 2 && year.length === 4;
    const currentDate = currentlyValid ? parseDate(`${day}/${month}/${year}`) : null;
    if (isSameDay(currentDate, value)) return;
    if (value) {
      setDay(pad2(value.getDate()));
      setMonth(pad2(value.getMonth() + 1));
      setYear(String(value.getFullYear()));
    } else if (currentlyValid) {
      setDay('');
      setMonth('');
      setYear('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const commit = (nextDay: string, nextMonth: string, nextYear: string) => {
    if (nextDay.length === 2 && nextMonth.length === 2 && nextYear.length === 4) {
      const parsed = parseDate(`${nextDay}/${nextMonth}/${nextYear}`);
      onChange(parsed);
    } else if (!nextDay && !nextMonth && !nextYear) {
      onChange(null);
    }
  };

  const handleSegment =
    (setter: (v: string) => void, maxLen: number, next?: React.RefObject<HTMLInputElement>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = digitsOnly(e.target.value).slice(0, maxLen);
      setter(digits);
      const values = { day, month, year };
      if (setter === setDay) values.day = digits;
      else if (setter === setMonth) values.month = digits;
      else values.year = digits;
      commit(values.day, values.month, values.year);
      if (digits.length === maxLen) next?.current?.focus();
    };

  const handleKeyDown =
    (current: string, prev?: React.RefObject<HTMLInputElement>, next?: React.RefObject<HTMLInputElement>) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && current === '' && prev?.current) {
        e.preventDefault();
        prev.current.focus();
        prev.current.select();
      } else if (e.key === 'ArrowLeft' && prev?.current) {
        e.preventDefault();
        prev.current.focus();
        prev.current.select();
      } else if (e.key === 'ArrowRight' && next?.current) {
        e.preventDefault();
        next.current.focus();
        next.current.select();
      }
    };

  const classes = [
    'ds-datefield',
    disabled ? 'is-disabled' : '',
    readOnly ? 'is-readonly' : '',
    focusedSegment ? 'is-focused' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label className="ds-datefield__label" htmlFor={generatedId}>
          {label}
        </label>
      )}
      <div
        className="ds-datefield__field"
        onMouseDown={(e) => {
          if (disabled || readOnly) return;
          const target = e.target as HTMLElement;
          if (!target.closest('input')) {
            e.preventDefault();
            dayRef.current?.focus();
            dayRef.current?.select();
          }
        }}
      >
        <div className="ds-datefield__segments">
          <input
            ref={dayRef}
            id={generatedId}
            className={['ds-datefield__segment', focusedSegment === 'day' ? 'is-active' : ''].join(' ')}
            inputMode="numeric"
            placeholder="DD"
            value={day}
            maxLength={2}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleSegment(setDay, 2, monthRef)}
            onKeyDown={handleKeyDown(day, undefined, monthRef)}
            onFocus={(e) => {
              setFocusedSegment('day');
              e.target.select();
            }}
            onBlur={() => setFocusedSegment(null)}
            aria-label="Day"
            {...rest}
          />
          <span className="ds-datefield__separator">/</span>
          <input
            ref={monthRef}
            className={['ds-datefield__segment', focusedSegment === 'month' ? 'is-active' : ''].join(' ')}
            inputMode="numeric"
            placeholder="MM"
            value={month}
            maxLength={2}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleSegment(setMonth, 2, yearRef)}
            onKeyDown={handleKeyDown(month, dayRef, yearRef)}
            onFocus={(e) => {
              setFocusedSegment('month');
              e.target.select();
            }}
            onBlur={() => setFocusedSegment(null)}
            aria-label="Month"
          />
          <span className="ds-datefield__separator">/</span>
          <input
            ref={yearRef}
            className={['ds-datefield__segment ds-datefield__segment--year', focusedSegment === 'year' ? 'is-active' : ''].join(
              ' '
            )}
            inputMode="numeric"
            placeholder="YYYY"
            value={year}
            maxLength={4}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleSegment(setYear, 4)}
            onKeyDown={handleKeyDown(year, monthRef, undefined)}
            onFocus={(e) => {
              setFocusedSegment('year');
              e.target.select();
            }}
            onBlur={() => setFocusedSegment(null)}
            aria-label="Year"
          />
        </div>
        {showCalendarIcon && (
          <span className="ds-datefield__icon">
            <Icon name="calender" size="sm" />
          </span>
        )}
      </div>
      {helperText && <p className="ds-datefield__helper">{helperText}</p>}
    </div>
  );
};
