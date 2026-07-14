import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'text' | 'disruptive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Primary is the principal CTA (one per page); secondary pairs with it for
      negative actions; tertiary/ghost are low emphasis; text is label-only;
      disruptive is for destructive actions. */
  variant?: ButtonVariant;
  /** sm 40 · md 44 · lg 48 — sm is the default and most commonly used */
  size?: ButtonSize;
  /** Icon before the label (16px at sm/md, 20px at lg) */
  leadingIcon?: React.ReactNode;
  /** Icon after the label */
  trailingIcon?: React.ReactNode;
  /** Square button showing only an icon — pass the icon as children.
      Supported for primary / secondary / tertiary / ghost. */
  iconOnly?: boolean;
  /** Replaces the leading icon with a spinner and blocks interaction */
  loading?: boolean;
}

// primary/disruptive have a dark/coloured fill, so their spinner needs the
// white "secondary" variant; every other button variant sits on a light
// surface and needs the dark "primary" variant.
const DARK_FILL_VARIANTS: ButtonVariant[] = ['primary', 'disruptive'];

export const Button = ({
  variant = 'primary',
  size = 'sm',
  leadingIcon,
  trailingIcon,
  iconOnly = false,
  loading = false,
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    iconOnly ? 'ds-button--icon-only' : '',
    loading ? 'is-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="ds-button__icon ds-button__icon--leading">
          <Spinner variant={DARK_FILL_VARIANTS.includes(variant) ? 'secondary' : 'primary'} />
        </span>
      ) : (
        leadingIcon &&
        !iconOnly && <span className="ds-button__icon ds-button__icon--leading">{leadingIcon}</span>
      )}
      {iconOnly ? (
        <span className="ds-button__icon">{children}</span>
      ) : (
        <span className="ds-button__label">{children}</span>
      )}
      {trailingIcon && !iconOnly && !loading && (
        <span className="ds-button__icon ds-button__icon--trailing">{trailingIcon}</span>
      )}
    </button>
  );
};
