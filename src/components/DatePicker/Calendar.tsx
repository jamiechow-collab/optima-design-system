import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Menu, MenuItem } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  addYears,
  getCalendarMatrix,
  getISOWeekNumber,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
} from './dateUtils';
import './Calendar.css';

export type CalendarMode = 'single' | 'range';
export type CalendarValue = Date | null | [Date | null, Date | null];

export interface CalendarProps {
  /** single (default) — one date. range — a [start, end] tuple */
  mode?: CalendarMode;
  value: CalendarValue;
  onChange: (value: CalendarValue) => void;
  /** Shows the ISO week-number column on the left (default true) */
  showWeekNumbers?: boolean;
  /** Shows the Cancel/Apply footer row (default true) */
  showFooter?: boolean;
  onCancel?: () => void;
  onApply?: () => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const Calendar = ({
  mode = 'single',
  value,
  onChange,
  showWeekNumbers = true,
  showFooter = true,
  onCancel,
  onApply,
  minDate,
  maxDate,
  className,
}: CalendarProps) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [start, end] = mode === 'range' && Array.isArray(value) ? value : [null, null];
  const singleValue = mode === 'single' && !Array.isArray(value) ? value : null;

  const initialView = singleValue || start || today;
  const [viewDate, setViewDate] = useState(new Date(initialView.getFullYear(), initialView.getMonth(), 1));
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [focusedDate, setFocusedDate] = useState(singleValue || start || today);
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const gridHasFocusRef = useRef(false);
  const cellRefs = useRef(new Map<string, HTMLButtonElement>());
  const headerRef = useRef<HTMLDivElement>(null);

  const weeks = useMemo(() => getCalendarMatrix(viewDate), [viewDate]);

  useEffect(() => {
    if (!gridHasFocusRef.current) return;
    cellRefs.current.get(dateKey(focusedDate))?.focus();
  }, [focusedDate, viewDate]);

  useEffect(() => {
    if (!monthMenuOpen && !yearMenuOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setMonthMenuOpen(false);
        setYearMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [monthMenuOpen, yearMenuOpen]);

  const isDisabledDate = (date: Date) =>
    (!!minDate && isBefore(date, minDate)) || (!!maxDate && isAfter(date, maxDate));

  const goToMonth = (date: Date) => {
    if (!isSameMonth(date, viewDate)) setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const commitSelection = (date: Date) => {
    if (isDisabledDate(date)) return;
    if (mode === 'single') {
      onChange(date);
    } else if (!start || (start && end)) {
      onChange([date, null]);
    } else if (isBefore(date, start)) {
      onChange([date, start]);
    } else {
      onChange([start, date]);
    }
    setFocusedDate(date);
    goToMonth(date);
  };

  const moveFocus = (nextDate: Date) => {
    setFocusedDate(nextDate);
    goToMonth(nextDate);
  };

  const handleCellKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(addDays(focusedDate, -1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(addDays(focusedDate, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(addDays(focusedDate, -7));
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(addDays(focusedDate, 7));
        break;
      case 'Home':
        e.preventDefault();
        moveFocus(addDays(focusedDate, -focusedDate.getDay()));
        break;
      case 'End':
        e.preventDefault();
        moveFocus(addDays(focusedDate, 6 - focusedDate.getDay()));
        break;
      case 'PageUp':
        e.preventDefault();
        moveFocus(e.shiftKey ? addYears(focusedDate, -1) : addMonths(focusedDate, -1));
        break;
      case 'PageDown':
        e.preventDefault();
        moveFocus(e.shiftKey ? addYears(focusedDate, 1) : addMonths(focusedDate, 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commitSelection(focusedDate);
        break;
      default:
        break;
    }
  };

  const yearOptions = useMemo(() => {
    const base = viewDate.getFullYear();
    return Array.from({ length: 21 }, (_, i) => base - 10 + i);
  }, [viewDate]);

  const classes = ['ds-calendar', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-calendar__content">
        <div className="ds-calendar__header" ref={headerRef}>
          <Button
            variant="ghost"
            iconOnly
            size="sm"
            aria-label="Previous month"
            onClick={() => setViewDate(addMonths(viewDate, -1))}
          >
            <Icon name="chevron-left" size="sm" />
          </Button>
          <div className="ds-calendar__header-controls">
            <div className="ds-calendar__pill-wrapper">
              <button
                type="button"
                className="ds-calendar__pill"
                aria-haspopup="menu"
                aria-expanded={monthMenuOpen}
                onClick={() => setMonthMenuOpen((o) => !o)}
              >
                {MONTH_LABELS[viewDate.getMonth()]}
              </button>
              {monthMenuOpen && (
                <Menu className="ds-calendar__menu">
                  {MONTH_LABELS.map((label, index) => (
                    <MenuItem
                      key={label}
                      label={label}
                      checked={index === viewDate.getMonth()}
                      onClick={() => {
                        setViewDate(new Date(viewDate.getFullYear(), index, 1));
                        setMonthMenuOpen(false);
                      }}
                    />
                  ))}
                </Menu>
              )}
            </div>
            <div className="ds-calendar__pill-wrapper">
              <button
                type="button"
                className="ds-calendar__pill"
                aria-haspopup="menu"
                aria-expanded={yearMenuOpen}
                onClick={() => setYearMenuOpen((o) => !o)}
              >
                {viewDate.getFullYear()}
              </button>
              {yearMenuOpen && (
                <Menu className="ds-calendar__menu ds-calendar__menu--year">
                  {yearOptions.map((year) => (
                    <MenuItem
                      key={year}
                      label={String(year)}
                      checked={year === viewDate.getFullYear()}
                      onClick={() => {
                        setViewDate(new Date(year, viewDate.getMonth(), 1));
                        setYearMenuOpen(false);
                      }}
                    />
                  ))}
                </Menu>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            iconOnly
            size="sm"
            aria-label="Next month"
            onClick={() => setViewDate(addMonths(viewDate, 1))}
          >
            <Icon name="chevron-right" size="sm" />
          </Button>
        </div>

        <div className="ds-calendar__grid">
          {showWeekNumbers && (
            <div className="ds-calendar__week-numbers">
              <span className="ds-calendar__week-number-label">W</span>
              {weeks.map((week) => (
                <span key={dateKey(week[0].date)} className="ds-calendar__week-number">
                  {getISOWeekNumber(week[0].date)}
                </span>
              ))}
            </div>
          )}
          <div
            className="ds-calendar__dates"
            role="grid"
            onFocus={() => {
              gridHasFocusRef.current = true;
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) gridHasFocusRef.current = false;
            }}
          >
            <div className="ds-calendar__weekday-row" role="row">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="ds-calendar__weekday" role="columnheader">
                  {label}
                </span>
              ))}
            </div>
            {weeks.map((week) => (
              <div key={dateKey(week[0].date)} className="ds-calendar__week-row" role="row">
                {week.map(({ date, isOutsideMonth }) => {
                  const disabled = isDisabledDate(date);
                  const isToday = isSameDay(date, today);
                  const isSelectedSingle = mode === 'single' && isSameDay(date, singleValue);
                  const isRangeStart = mode === 'range' && isSameDay(date, start);
                  const isRangeEnd = mode === 'range' && isSameDay(date, end);
                  const rangePreviewEnd = end || hoveredDate;
                  const isInRange =
                    mode === 'range' &&
                    start &&
                    rangePreviewEnd &&
                    isAfter(date, start) &&
                    isBefore(date, rangePreviewEnd) &&
                    !isSameDay(date, start) &&
                    !isSameDay(date, rangePreviewEnd);

                  const cellClasses = [
                    'ds-calendar__day',
                    isOutsideMonth || disabled ? 'ds-calendar__day--muted' : '',
                    isSelectedSingle ? 'ds-calendar__day--active' : '',
                    isRangeStart ? 'ds-calendar__day--range-start' : '',
                    isRangeEnd ? 'ds-calendar__day--range-end' : '',
                    isInRange ? 'ds-calendar__day--range-middle' : '',
                    isToday ? 'ds-calendar__day--today' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <button
                      key={dateKey(date)}
                      ref={(node) => {
                        if (node) cellRefs.current.set(dateKey(date), node);
                        else cellRefs.current.delete(dateKey(date));
                      }}
                      type="button"
                      role="gridcell"
                      className={cellClasses}
                      disabled={disabled}
                      tabIndex={isSameDay(date, focusedDate) ? 0 : -1}
                      aria-current={isToday ? 'date' : undefined}
                      aria-selected={isSelectedSingle || isRangeStart || isRangeEnd}
                      onClick={() => commitSelection(date)}
                      onMouseEnter={() => mode === 'range' && setHoveredDate(date)}
                      onMouseLeave={() => mode === 'range' && setHoveredDate(null)}
                      onKeyDown={handleCellKeyDown}
                    >
                      <span className="ds-calendar__day-number">{date.getDate()}</span>
                      {isToday && <span className="ds-calendar__today-dot" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showFooter && (
        <div className="ds-calendar__footer">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
