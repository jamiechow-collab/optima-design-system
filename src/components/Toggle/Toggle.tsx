import React, { useId } from 'react';
import './Toggle.css';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** sm 36×20 (default) · md 44×24 */
  size?: ToggleSize;
  /** Text shown next to the switch */
  label?: React.ReactNode;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ size = 'sm', label, className, disabled, id, ...rest }, forwardedRef) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const classes = [
      'ds-toggle',
      `ds-toggle--${size}`,
      disabled ? 'is-disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes} htmlFor={inputId}>
        <span className="ds-toggle__box">
          <input
            ref={forwardedRef}
            type="checkbox"
            role="switch"
            id={inputId}
            className="ds-toggle__input"
            disabled={disabled}
            {...rest}
          />
          <span className="ds-toggle__thumb" />
        </span>
        {label && <span className="ds-toggle__label">{label}</span>}
      </label>
    );
  }
);

Toggle.displayName = 'Toggle';
