import React, { useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './TextInput.css';

export type TextInputValidation = 'default' | 'error' | 'success';
export type TextInputSize = 'sm' | 'md';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Field height — sm (32px) or md (44px, default) */
  size?: TextInputSize;
  /** Text shown above the field */
  label?: React.ReactNode;
  /** Shows an info icon next to the label — pass `tooltip` for its accessible name */
  showTooltip?: boolean;
  /** Accessible name for the tooltip icon */
  tooltip?: string;
  /** Icon shown before the input text */
  leadingIcon?: React.ReactNode;
  /** Icon shown after the input text */
  trailingIcon?: React.ReactNode;
  /** Chip glued to the start of the input value, e.g. "£" */
  leadingPrefix?: React.ReactNode;
  /** Chip glued to the end of the field, e.g. "%" */
  trailingPrefix?: React.ReactNode;
  /** Tips on filling the field, shown under it */
  helperText?: React.ReactNode;
  /** Message shown under the field — only rendered when validation isn't 'default' */
  validationText?: React.ReactNode;
  /** default (always use) · error (for validation feedback) · success (use case TBD) */
  validation?: TextInputValidation;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size = 'md',
      label,
      showTooltip = false,
      tooltip,
      leadingIcon,
      trailingIcon,
      leadingPrefix,
      trailingPrefix,
      helperText,
      validationText,
      validation = 'default',
      className,
      disabled,
      readOnly,
      id,
      onFocus,
      onBlur,
      ...rest
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const innerRef = useRef<HTMLInputElement>(null);
    const pointerDownRef = useRef(false);

    // Active = focused via a mouse/pointer press (border only). Focused = focused
    // via keyboard, e.g. Tab (border + ring). Browsers always show a text input's
    // caret regardless of input modality, so this distinction can't be made with
    // :focus-visible alone — it's tracked from whichever event preceded focus.
    const [interaction, setInteraction] = useState<'idle' | 'active' | 'focused'>('idle');

    const handleFieldMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (disabled) return;
      pointerDownRef.current = true;
      const target = e.target as HTMLElement;
      const isInteractiveDescendant = target.closest('button, [role="button"], a[href]');
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

    const classes = [
      'ds-textinput',
      `ds-textinput--${size}`,
      validation !== 'default' ? `ds-textinput--${validation}` : '',
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
          <div className="ds-textinput__label-row">
            <label className="ds-textinput__label" htmlFor={inputId}>
              {label}
            </label>
            {showTooltip && (
              <span className="ds-textinput__tooltip">
                <Icon name="info-with-circle" size="sm" title={tooltip} />
              </span>
            )}
          </div>
        )}
        <div className="ds-textinput__field" onMouseDown={handleFieldMouseDown}>
          <div className="ds-textinput__content">
            {leadingIcon && (
              <span className="ds-textinput__icon ds-textinput__icon--leading">{leadingIcon}</span>
            )}
            <div className="ds-textinput__value">
              {leadingPrefix && <span className="ds-textinput__prefix">{leadingPrefix}</span>}
              <input
                ref={(node) => {
                  innerRef.current = node;
                  if (typeof forwardedRef === 'function') forwardedRef(node);
                  else if (forwardedRef) forwardedRef.current = node;
                }}
                id={inputId}
                type="text"
                className="ds-textinput__input"
                disabled={disabled}
                readOnly={readOnly}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...rest}
              />
            </div>
          </div>
          {trailingPrefix && <span className="ds-textinput__prefix">{trailingPrefix}</span>}
          {trailingIcon && (
            <span className="ds-textinput__icon ds-textinput__icon--trailing">{trailingIcon}</span>
          )}
        </div>
        {helperText && <p className="ds-textinput__helper">{helperText}</p>}
        {validation !== 'default' && validationText && (
          <p className="ds-textinput__validation">{validationText}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
