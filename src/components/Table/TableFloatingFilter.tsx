import React, { useEffect, useRef, useState } from 'react';
import { Menu, MenuItem } from '../Menu/Menu';
import { DropdownOption } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';
import './TableFloatingFilter.css';

export type TableFloatingFilterSize = 'sm' | 'md';

export interface TableFloatingFilterProps {
  /** sm = 48px row height (default) · md = 56px */
  size?: TableFloatingFilterSize;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TableFloatingFilter = ({
  size = 'sm',
  placeholder = 'Filter',
  options,
  value,
  onChange,
  className,
}: TableFloatingFilterProps) => {
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

  const classes = ['ds-table-filter', `ds-table-filter--${size}`, className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      <div className="ds-table-filter__field-wrap">
        <button
          type="button"
          className={['ds-table-filter__field', open ? 'is-open' : ''].filter(Boolean).join(' ')}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={placeholder}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={['ds-table-filter__value', !selected ? 'is-placeholder' : ''].filter(Boolean).join(' ')}>
            {selected ? selected.label : placeholder}
          </span>
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />
        </button>
        {open && (
          <Menu ref={menuRef} className="ds-table-filter__menu">
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
        )}
      </div>
      <Icon name="filter" size="sm" className="ds-table-filter__icon" />
    </div>
  );
};
