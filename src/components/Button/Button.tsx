import React from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant — primary is the principal CTA, secondary pairs with it,
      ghost is lowest emphasis (toolbars, data lists). */
  variant?: ButtonVariant;
  /** sm pairs with 32px inputs, md with 40px inputs, lg is the most common size */
  size?: ButtonSize;
  /** Icon rendered before the label */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label */
  rightIcon?: React.ReactNode;
  /** Square button showing only an icon — omit children when true */
  iconOnly?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const classes = [
    'ds-button',
    `ds-button--${variant}`,
    `ds-button--${size}`,
    iconOnly ? 'ds-button--icon-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {leftIcon && <span className="ds-button__icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ds-button__icon">{rightIcon}</span>}
    </button>
  );
};
