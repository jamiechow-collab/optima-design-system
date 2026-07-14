import React from 'react';
import './Badge.css';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'info' | 'message' | 'positive' | 'negative' | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** info (default) · message · positive · negative · warning */
  variant?: BadgeVariant;
  /** sm 20px · md 24px · lg 28px tall */
  size?: BadgeSize;
  /** Optional trailing icon (e.g. dot, close, arrow) — 12px */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'info',
  size = 'sm',
  icon,
  children,
  className,
  ...rest
}: BadgeProps) => {
  const classes = [
    'ds-badge',
    `ds-badge--${variant}`,
    `ds-badge--${size}`,
    icon ? 'ds-badge--with-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      <span className="ds-badge__content">
        <span className="ds-badge__label">{children}</span>
        {icon && <span className="ds-badge__icon">{icon}</span>}
      </span>
    </span>
  );
};
