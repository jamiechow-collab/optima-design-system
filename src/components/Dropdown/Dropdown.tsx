import React, { useEffect, useId, useRef, useState } from 'react';
import { Menu, MenuItem } from '../Menu/Menu';
import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';
import './Dropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const focusFirstMenuItem = (menu: HTMLUListElement | null) => {
  const first = menu?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
  first?.focus();
};

// ── Dropdown — Basic, single-select, not typeable ───────────────────────────

export interface DropdownProps {
  /** Placeholder shown when nothing is selected */
  label?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Dropdown = ({
  label = 'Dropdown label',
  options,
  value,
  onChange,
  helperText,
  disabled = false,
  className,
  ...rest
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    focusFirstMenuItem(menuRef.current);
    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        buttonRef.current?.focus();
      }
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
    close();
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !open) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const classes = ['ds-dropdown', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      <button
        ref={buttonRef}
        type="button"
        className={['ds-dropdown__field', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleButtonKeyDown}
        {...rest}
      >
        <span className={['ds-dropdown__value', !selected ? 'is-placeholder' : ''].filter(Boolean).join(' ')}>
          {selected ? selected.label : label}
        </span>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />
      </button>
      {open && (
        <Menu ref={menuRef} className="ds-dropdown__menu">
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
      {helperText && <p className="ds-dropdown__helper">{helperText}</p>}
    </div>
  );
};

// ── ComboBox — single-select, typeable, dismiss icon ────────────────────────

export interface ComboBoxProps {
  fieldTitle?: React.ReactNode;
  placeholder?: string;
  options: DropdownOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ComboBox = ({
  fieldTitle = 'Field title',
  placeholder,
  options,
  value,
  onChange,
  helperText,
  disabled = false,
  className,
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();

  const selected = options.find((o) => o.value === value);
  const displayValue = editing ? query : selected?.label ?? '';
  const filtered =
    editing && query
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options;

  const close = () => {
    setOpen(false);
    setEditing(false);
    setQuery('');
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;
    onChange(option.value);
    close();
    inputRef.current?.focus();
  };

  const handleClear = () => {
    onChange(undefined);
    close();
    inputRef.current?.focus();
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditing(true);
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.select();
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      focusFirstMenuItem(menuRef.current);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    }
  };

  const classes = ['ds-combobox', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      {fieldTitle && (
        <label className="ds-combobox__label" htmlFor={generatedId}>
          {fieldTitle}
        </label>
      )}
      <div
        className={['ds-combobox__field', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        onMouseDown={(e) => {
          if (disabled) return;
          if (e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        <div className="ds-combobox__content">
          <input
            ref={inputRef}
            id={generatedId}
            type="text"
            className="ds-combobox__input"
            placeholder={placeholder}
            value={displayValue}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        {selected && !disabled && (
          <button
            type="button"
            className="ds-combobox__clear"
            aria-label="Clear selection"
            onClick={handleClear}
          >
            <Icon name="close" size="sm" />
          </button>
        )}
        <button
          type="button"
          className="ds-combobox__chevron"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((o) => !o);
            inputRef.current?.focus();
          }}
        >
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />
        </button>
      </div>
      {open && (
        <Menu ref={menuRef} className="ds-combobox__menu">
          {filtered.length === 0 ? (
            <li className="ds-combobox__empty" role="presentation">
              No matches
            </li>
          ) : (
            filtered.map((option) => (
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
            ))
          )}
        </Menu>
      )}
      {helperText && <p className="ds-combobox__helper">{helperText}</p>}
    </div>
  );
};

// ── ComboBoxMultiSelect — multi-select, typeable, badges ────────────────────

export interface ComboBoxMultiSelectProps {
  fieldTitle?: React.ReactNode;
  placeholder?: string;
  options: DropdownOption[];
  value: string[];
  onChange: (value: string[]) => void;
  helperText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const ComboBoxMultiSelect = ({
  fieldTitle = 'Field title',
  placeholder,
  options,
  value,
  onChange,
  helperText,
  disabled = false,
  className,
}: ComboBoxMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();

  const selected = options.filter((o) => value.includes(o.value));
  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const toggleValue = (option: DropdownOption) => {
    if (option.disabled) return;
    if (value.includes(option.value)) {
      onChange(value.filter((v) => v !== option.value));
    } else {
      onChange([...value, option.value]);
    }
    setQuery('');
    inputRef.current?.focus();
  };

  const removeValue = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
    inputRef.current?.focus();
  };

  const handleClearAll = () => {
    onChange([]);
    setQuery('');
    close();
    inputRef.current?.focus();
  };

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      focusFirstMenuItem(menuRef.current);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault();
      close();
    } else if (e.key === 'Backspace' && query === '' && selected.length > 0) {
      // Backspacing on an empty field removes the last selected tag
      removeValue(selected[selected.length - 1].value);
    }
  };

  const classes = ['ds-combobox', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={classes}>
      {fieldTitle && (
        <label className="ds-combobox__label" htmlFor={generatedId}>
          {fieldTitle}
        </label>
      )}
      <div
        className={['ds-combobox__field', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        onMouseDown={(e) => {
          if (disabled) return;
          if (e.target !== inputRef.current) {
            e.preventDefault();
            inputRef.current?.focus();
          }
        }}
      >
        <div className="ds-combobox__content">
          {selected.map((option) => (
            <Badge
              key={option.value}
              variant="message"
              size="sm"
              icon={
                !disabled && (
                  <button
                    type="button"
                    className="ds-combobox__tag-remove"
                    aria-label={`Remove ${option.label}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(option.value);
                    }}
                  >
                    <Icon name="close" size="xs" />
                  </button>
                )
              }
            >
              {option.label}
            </Badge>
          ))}
          <input
            ref={inputRef}
            id={generatedId}
            type="text"
            className="ds-combobox__input"
            placeholder={selected.length === 0 ? placeholder : undefined}
            value={query}
            disabled={disabled}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        {selected.length > 0 && !disabled && (
          <button
            type="button"
            className="ds-combobox__clear"
            aria-label="Clear all selections"
            onClick={handleClearAll}
          >
            <Icon name="close" size="sm" />
          </button>
        )}
        <button
          type="button"
          className="ds-combobox__chevron"
          tabIndex={-1}
          aria-hidden="true"
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            setOpen((o) => !o);
            inputRef.current?.focus();
          }}
        >
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />
        </button>
      </div>
      {open && (
        <Menu ref={menuRef} className="ds-combobox__menu">
          {filtered.length === 0 ? (
            <li className="ds-combobox__empty" role="presentation">
              No matches
            </li>
          ) : (
            filtered.map((option) => (
              <MenuItem
                key={option.value}
                label={option.label}
                checked={value.includes(option.value)}
                disabled={option.disabled}
                onClick={() => toggleValue(option)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !option.disabled) {
                    e.preventDefault();
                    toggleValue(option);
                  }
                }}
              />
            ))
          )}
        </Menu>
      )}
      {helperText && <p className="ds-combobox__helper">{helperText}</p>}
    </div>
  );
};
