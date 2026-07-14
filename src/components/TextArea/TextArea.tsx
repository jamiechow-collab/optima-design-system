import React, { useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './TextArea.css';

const DraggerIcon = () => (
  <svg className="ds-textarea__dragger-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M11 1L1 11M11 5.5L5.5 11M11 10L10 11"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export type TextAreaValidation = 'default' | 'error' | 'success';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Text shown above the field */
  label?: React.ReactNode;
  /** Shows an info icon next to the label — pass `tooltip` for its accessible name */
  showTooltip?: boolean;
  /** Accessible name for the tooltip icon */
  tooltip?: string;
  /** Tips on filling the field — only shown while validation is 'default' */
  helperText?: React.ReactNode;
  /** Message shown under the field — only rendered when validation isn't 'default' */
  validationText?: React.ReactNode;
  /** default (always use) · error (for validation feedback) · success (use case TBD) */
  validation?: TextAreaValidation;
  /** Shows a live "n/maxLength" count next to the helper/validation text */
  showCounter?: boolean;
  /** Lets users drag-resize the field vertically (default true) */
  resizable?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      showTooltip = false,
      tooltip,
      helperText,
      validationText,
      validation = 'default',
      showCounter = false,
      resizable = true,
      className,
      disabled,
      readOnly,
      id,
      maxLength,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...rest
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const pointerDownRef = useRef(false);

    // Active = focused via a mouse/pointer press (border only). Focused = focused
    // via keyboard, e.g. Tab (border + ring) — see TextInput for why this can't
    // be derived from :focus-visible alone.
    const [interaction, setInteraction] = useState<'idle' | 'active' | 'focused'>('idle');
    const [length, setLength] = useState(() => (value ?? defaultValue ?? '').toString().length);

    const handleMouseDown: React.MouseEventHandler<HTMLTextAreaElement> = () => {
      if (disabled) return;
      pointerDownRef.current = true;
    };

    const handleFocus: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
      const isKeyboardFocus = !pointerDownRef.current;
      setInteraction(isKeyboardFocus ? 'focused' : 'active');
      // Matches the "select all on Tab focus" pattern shown in the Filled-focused
      // spec — keyboard focus into a filled field highlights its existing value.
      if (isKeyboardFocus && e.target.value) {
        e.target.select();
      }
      onFocus?.(e);
    };

    const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
      pointerDownRef.current = false;
      setInteraction('idle');
      onBlur?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      setLength(e.target.value.length);
      onChange?.(e);
    };

    const classes = [
      'ds-textarea',
      validation !== 'default' ? `ds-textarea--${validation}` : '',
      disabled ? 'is-disabled' : '',
      readOnly ? 'is-readonly' : '',
      interaction === 'active' ? 'is-active' : '',
      interaction === 'focused' ? 'is-focused' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      'ds-textarea__input',
      resizable ? '' : 'ds-textarea__input--no-resize',
    ]
      .filter(Boolean)
      .join(' ');

    const showValidationRow = validation !== 'default' && !!validationText;
    const showHelperRow = validation === 'default' && !!helperText;

    return (
      <div className={classes}>
        {label && (
          <div className="ds-textarea__label-row">
            <label className="ds-textarea__label" htmlFor={inputId}>
              {label}
            </label>
            {showTooltip && (
              <span className="ds-textarea__tooltip">
                <Icon name="info-with-circle" size="sm" title={tooltip} />
              </span>
            )}
          </div>
        )}
        <div className="ds-textarea__field">
          <textarea
            ref={(node) => {
              innerRef.current = node;
              if (typeof forwardedRef === 'function') forwardedRef(node);
              else if (forwardedRef) forwardedRef.current = node;
            }}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onMouseDown={handleMouseDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...rest}
          />
          {resizable && !disabled && (
            <span className="ds-textarea__dragger" aria-hidden="true">
              <DraggerIcon />
            </span>
          )}
        </div>
        {showValidationRow && (
          <div className="ds-textarea__message ds-textarea__message--validation">
            <p className="ds-textarea__validation">{validationText}</p>
            {showCounter && maxLength != null && (
              <span className="ds-textarea__counter">
                {length}/{maxLength}
              </span>
            )}
          </div>
        )}
        {showHelperRow && (
          <div className="ds-textarea__message">
            <p className="ds-textarea__helper">{helperText}</p>
            {showCounter && maxLength != null && (
              <span className="ds-textarea__counter">
                {length}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
