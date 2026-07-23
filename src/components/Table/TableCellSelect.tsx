import React, { useEffect, useRef, useState } from 'react';
import { Menu, MenuItem } from '../Menu/Menu';
import { DropdownOption } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';
import './TableCellSelect.css';

export type TableCellSelectSize = 'sm' | 'md';

export interface TableCellSelectProps {
  /** sm = 32px field height (default) · md = 44px — matches the cell's own
      sm/md row height (40px/48px) */
  size?: TableCellSelectSize;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
  className?: string;
}

/** An inline "click to edit" dropdown, meant to be used as a column's
    `render` output together with `overflowVisible` — implements the
    Table-grid-cell "Editable" state from the Figma spec. Reads as plain
    text (matching every other cell) until clicked — only then does it turn
    into the bordered combo-box field with its menu open, reverting back to
    plain text as soon as a value is picked or the edit is dismissed. */
export const TableCellSelect = ({
  size = 'sm',
  placeholder = 'Select',
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
  className,
}: TableCellSelectProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const valueClasses = ['ds-table-cell-select__value', !selected ? 'is-placeholder' : '']
    .filter(Boolean)
    .join(' ');

  if (!open) {
    return (
      <button
        type="button"
        className={['ds-table-cell-select__trigger', className].filter(Boolean).join(' ')}
        aria-haspopup="menu"
        aria-expanded={false}
        aria-label={ariaLabel ?? placeholder}
        onClick={() => setOpen(true)}
      >
        <span className={valueClasses}>{selected ? selected.label : placeholder}</span>
      </button>
    );
  }

  const classes = ['ds-table-cell-select', `ds-table-cell-select--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={rootRef} className={classes}>
      <button
        type="button"
        className="ds-table-cell-select__field is-open"
        aria-haspopup="menu"
        aria-expanded
        aria-label={ariaLabel ?? placeholder}
        onClick={() => setOpen(false)}
      >
        <span className={valueClasses}>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron-up" size="sm" />
      </button>
      <Menu ref={menuRef} className="ds-table-cell-select__menu">
        {options.map((option) => (
          <MenuItem
            key={option.value}
            label={option.label}
            checked={option.value === value}
            disabled={option.disabled}
            onClick={() => handleSelect(option)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !option.disabled) {
                e.preventDefault();
                handleSelect(option);
              }
            }}
          />
        ))}
      </Menu>
    </div>
  );
};
