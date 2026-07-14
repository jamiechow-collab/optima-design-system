import React, { useEffect, useId, useRef } from 'react';
import './RadioButton.css';

export type RadioButtonSize = 'sm' | 'md';

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** sm 16px (default) · md 20px */
  size?: RadioButtonSize;
  /** Text shown next to the circle */
  label?: React.ReactNode;
}

const ARROW_KEYS = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      size = 'sm',
      label,
      className,
      disabled,
      id,
      name,
      checked,
      defaultChecked,
      onChange,
      onClick,
      onKeyDown,
      ...rest
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Tracks whether the radio was checked *before* the current interaction —
    // needed to tell "click on an already-selected radio" (deselect it) apart
    // from "click on an unselected radio" (browser already selected it by the
    // time our handler runs, since checkedness updates before `click` fires).
    const wasCheckedRef = useRef(!!(checked ?? defaultChecked));

    useEffect(() => {
      if (checked !== undefined) {
        wasCheckedRef.current = checked;
      }
    }, [checked]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      wasCheckedRef.current = e.target.checked;
      onChange?.(e);
    };

    const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
      onClick?.(e);
      if (disabled) return;
      if (wasCheckedRef.current) {
        // Unlike native radios, clicking an already-selected option deselects it.
        const input = e.currentTarget;
        input.checked = false;
        wasCheckedRef.current = false;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      onKeyDown?.(e);
      if (disabled || e.defaultPrevented) return;
      const input = e.currentTarget;

      if (e.key === 'Enter') {
        // Native radios only activate on Space — wire up Enter the same way,
        // routed through handleClick so the deselect toggle applies to it too.
        e.preventDefault();
        input.click();
        return;
      }

      if (name && ARROW_KEYS.includes(e.key)) {
        // Native radio groups select whatever arrow keys move focus to. Here,
        // focus should move freely without selecting — only Space/Enter select.
        e.preventDefault();
        const group = Array.from(document.getElementsByName(name)).filter(
          (el): el is HTMLInputElement =>
            el instanceof HTMLInputElement && el.type === 'radio' && !el.disabled
        );
        const index = group.indexOf(input);
        if (index === -1) return;
        const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
        const nextIndex = (index + (forward ? 1 : -1) + group.length) % group.length;
        group[nextIndex]?.focus();
      }
    };

    const classes = [
      'ds-radio',
      `ds-radio--${size}`,
      disabled ? 'is-disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes} htmlFor={inputId}>
        <span className="ds-radio__box">
          <input
            ref={forwardedRef}
            type="radio"
            id={inputId}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            className="ds-radio__input"
            disabled={disabled}
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...rest}
          />
          <span className="ds-radio__dot" />
        </span>
        {label && <span className="ds-radio__label">{label}</span>}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
