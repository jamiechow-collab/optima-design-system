import React, { useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './Search.css';

export type SearchSize = 'sm' | 'md';

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Field height — sm (32px) or md (44px, default) */
  size?: SearchSize;
  /** Text shown above the field */
  label?: React.ReactNode;
  /** Shows an info icon next to the label — pass `tooltip` for its accessible name */
  showTooltip?: boolean;
  /** Accessible name for the tooltip icon */
  tooltip?: string;
  /** Tips on using the field, shown under it */
  helperText?: React.ReactNode;
  /** Fires after the clear button (or Esc) empties the field */
  onClear?: () => void;
  /** Accessible name for the clear button */
  clearLabel?: string;
}

// Sets the value through the native setter and dispatches an `input` event, so
// React's onChange fires the same way whether the field is controlled or not.
const setNativeValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      size = 'md',
      label,
      showTooltip = false,
      tooltip,
      helperText,
      placeholder = 'Search',
      onClear,
      clearLabel = 'Clear search',
      className,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      disabled,
      readOnly,
      id,
      ...rest
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const innerRef = useRef<HTMLInputElement | null>(null);
    const pointerDownRef = useRef(false);

    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState(String(defaultValue ?? ''));
    const currentValue = isControlled ? String(value) : innerValue;
    const filled = currentValue.length > 0;

    // Active = focused via a mouse/pointer press (border only). Focused = focused
    // via keyboard, e.g. Tab (border + ring). Browsers always show a text input's
    // caret regardless of input modality, so this distinction can't be made with
    // :focus-visible alone — it's tracked from whichever event preceded focus.
    const [interaction, setInteraction] = useState<'idle' | 'active' | 'focused'>('idle');

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };

    const handleFieldMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (disabled) return;
      pointerDownRef.current = true;
      const target = e.target as HTMLElement;
      const isInteractiveDescendant = target.closest('button');
      if (target !== innerRef.current && !isInteractiveDescendant) {
        // Clicking anywhere in the field container focuses the input, matching
        // "users press the field container to start typing".
        e.preventDefault();
        innerRef.current?.focus();
      }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
      setInteraction(pointerDownRef.current ? 'active' : 'focused');
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
      pointerDownRef.current = false;
      setInteraction('idle');
      onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const clear = () => {
      if (!innerRef.current || disabled || readOnly) return;
      setNativeValue(innerRef.current, '');
      innerRef.current.focus();
      onClear?.();
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      onKeyDown?.(e);
      if (e.key === 'Escape' && filled) {
        e.preventDefault();
        clear();
      }
    };

    const classes = [
      'ds-search',
      `ds-search--${size}`,
      disabled ? 'is-disabled' : '',
      readOnly ? 'is-readonly' : '',
      interaction === 'active' ? 'is-active' : '',
      interaction === 'focused' ? 'is-focused' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classes}>
        {label && (
          <div className="ds-search__label-row">
            <label className="ds-search__label" htmlFor={inputId}>
              {label}
            </label>
            {showTooltip && (
              <span className="ds-search__tooltip">
                <Icon name="info-with-circle" size="sm" title={tooltip} />
              </span>
            )}
          </div>
        )}
        <div className="ds-search__field" onMouseDown={handleFieldMouseDown}>
          <span className="ds-search__icon">
            <Icon name="search" size="sm" />
          </span>
          <input
            {...rest}
            ref={setRefs}
            id={inputId}
            type="search"
            className="ds-search__input"
            placeholder={placeholder}
            value={isControlled ? value : innerValue}
            disabled={disabled}
            readOnly={readOnly}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          {filled && (
            <button
              type="button"
              className="ds-search__clear"
              aria-label={clearLabel}
              disabled={disabled || readOnly}
              onClick={clear}
            >
              <Icon name="close" size="sm" />
            </button>
          )}
        </div>
        {helperText && <p className="ds-search__helper">{helperText}</p>}
      </div>
    );
  }
);

Search.displayName = 'Search';
