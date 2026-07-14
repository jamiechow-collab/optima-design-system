import React from 'react';
import { Badge } from '../Badge/Badge';
import './ToggleButton.css';

export type ToggleButtonSize = 'sm' | 'md' | 'lg';

export interface ToggleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** sm 40px (default) · md 44px · lg 48px */
  size?: ToggleButtonSize;
  /** Whether the filter/toggle is currently on */
  active?: boolean;
  /** Leading icon — use an outlined glyph when inactive, a filled one (or heavier weight) when active */
  icon?: React.ReactNode;
  /** Optional count, e.g. how many filters are applied */
  badge?: React.ReactNode;
  /** Trailing icon, e.g. a chevron when used as a menu trigger */
  trailingIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const ToggleButton = ({
  size = 'sm',
  active = false,
  icon,
  badge,
  trailingIcon,
  children,
  className,
  disabled,
  ...rest
}: ToggleButtonProps) => {
  const classes = ['ds-toggle-button', `ds-toggle-button--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} aria-pressed={active} disabled={disabled} {...rest}>
      {icon && (
        <span className="ds-toggle-button__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ds-toggle-button__label">{children}</span>
      {badge != null && (
        <Badge size="sm" className="ds-toggle-button__badge">
          {badge}
        </Badge>
      )}
      {trailingIcon && (
        <span className="ds-toggle-button__icon ds-toggle-button__icon--trailing" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};
