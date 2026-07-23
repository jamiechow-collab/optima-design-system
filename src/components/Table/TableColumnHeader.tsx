import React from 'react';
import { Icon } from '../Icon/Icon';
import './TableColumnHeader.css';

export type TableColumnHeaderSize = 'sm' | 'md';
export type TableColumnHeaderAlign = 'left' | 'right';
export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumnHeaderProps {
  label: string;
  /** sm = 48px header height (default) · md = 56px */
  size?: TableColumnHeaderSize;
  align?: TableColumnHeaderAlign;
  /** Icon rendered before the label, e.g. a channel icon or flag */
  leadingIcon?: React.ReactNode;
  /** Shows the sort chevron and makes the whole header clickable */
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSortChange?: () => void;
  /** Shows the "more options" kebab control */
  showMenuControl?: boolean;
  onMenuClick?: () => void;
  /** Shows the drag handle on the trailing edge for column resize */
  resizable?: boolean;
  /** Fired on pointerdown over the resize handle — the parent Table owns the
      pointermove/pointerup listeners and the resulting column width. */
  onResizeStart?: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Fired on pointerdown anywhere over the header (except the resize handle
      and menu button) — the parent Table owns the long-press-to-drag timer
      and the resulting column order. */
  onHeaderPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
  /** Exposes the header's own DOM node so the parent Table can hit-test it
      against the pointer position while a column drag is in progress. */
  headerRef?: (el: HTMLDivElement | null) => void;
  className?: string;
}

export const TableColumnHeader = ({
  label,
  size = 'sm',
  align = 'left',
  leadingIcon,
  sortable = false,
  sortDirection = null,
  onSortChange,
  showMenuControl = false,
  onMenuClick,
  resizable = true,
  onResizeStart,
  onHeaderPointerDown,
  headerRef,
  className,
}: TableColumnHeaderProps) => {
  const hasControl = sortable || showMenuControl;
  const classes = [
    'ds-table-header',
    `ds-table-header--${size}`,
    `ds-table-header--${align}`,
    onHeaderPointerDown ? 'ds-table-header--reorderable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const innerClasses = ['ds-table-header__inner', hasControl ? 'ds-table-header__inner--has-control' : '']
    .filter(Boolean)
    .join(' ');

  const ariaSort = sortable
    ? sortDirection === 'asc'
      ? 'ascending'
      : sortDirection === 'desc'
        ? 'descending'
        : 'none'
    : undefined;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!sortable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSortChange?.();
    }
  };

  return (
    <div className={classes} role="columnheader" aria-sort={ariaSort} ref={headerRef} onPointerDown={onHeaderPointerDown}>
      <div
        className={innerClasses}
        role={sortable ? 'button' : undefined}
        tabIndex={sortable ? 0 : undefined}
        onClick={() => sortable && onSortChange?.()}
        onKeyDown={handleKeyDown}
      >
        <span className="ds-table-header__label-group">
          {leadingIcon && <span className="ds-table-header__leading-icon">{leadingIcon}</span>}
          <span className="ds-table-header__label">{label}</span>
        </span>
        {hasControl && (
          <span className="ds-table-header__control-group">
            {sortable && (
              <Icon
                name={sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'}
                size="sm"
                className={['ds-table-header__sort-icon', sortDirection ? 'is-active' : ''].filter(Boolean).join(' ')}
              />
            )}
            {showMenuControl && (
              <button
                type="button"
                className="ds-table-header__menu-button"
                aria-label={`${label} column options`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClick?.();
                }}
              >
                <Icon name="more-info" size="sm" />
              </button>
            )}
          </span>
        )}
      </div>
      {resizable && (
        <div
          className="ds-table-header__resize-handle"
          role="separator"
          aria-orientation="vertical"
          aria-label={`Resize ${label} column`}
          onPointerDown={(e) => {
            e.stopPropagation();
            onResizeStart?.(e);
          }}
        />
      )}
    </div>
  );
};
