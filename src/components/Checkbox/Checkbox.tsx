import React, { useEffect, useId, useRef } from 'react';
import { Icon } from '../Icon/Icon';
import './Checkbox.css';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** sm 16px (default) · md 20px */
  size?: CheckboxSize;
  /** Neither fully checked nor unchecked — shows a dash instead of a tick */
  indeterminate?: boolean;
  /** Text shown next to the box */
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = 'sm', indeterminate = false, label, className, disabled, id, ...rest }, forwardedRef) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const inputId = id || generatedId;

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const classes = [
      'ds-checkbox',
      `ds-checkbox--${size}`,
      disabled ? 'is-disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={classes} htmlFor={inputId}>
        <span className="ds-checkbox__box">
          <input
            ref={(node) => {
              innerRef.current = node;
              if (typeof forwardedRef === 'function') forwardedRef(node);
              else if (forwardedRef) forwardedRef.current = node;
            }}
            type="checkbox"
            id={inputId}
            className="ds-checkbox__input"
            disabled={disabled}
            {...rest}
          />
          <span className="ds-checkbox__icon">
            <Icon name={indeterminate ? 'minus' : 'checkmark'} size="xs" />
          </span>
        </span>
        {label && <span className="ds-checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
