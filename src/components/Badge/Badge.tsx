import React from 'react';
import './Badge.css';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'info' | 'message' | 'positive' | 'negative' | 'warning';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** info (default) · message · positive · negative · warning */
  variant?: BadgeVariant;
  /** sm 20px · md 24px · lg 28px tall */
  size?: BadgeSize;
  /** Optional leading icon (e.g. dot) — 12px on sm/md, 16px on lg */
  leadingIcon?: React.ReactNode;
  /** Optional trailing icon (e.g. dot, close, arrow) — 12px on sm/md, 16px on lg */
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Badge = ({
  variant = 'info',
  size = 'sm',
  leadingIcon,
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
        {leadingIcon && <span className="ds-badge__icon ds-badge__icon--leading">{leadingIcon}</span>}
        <span className="ds-badge__label">{children}</span>
        {icon && <span className="ds-badge__icon ds-badge__icon--trailing">{icon}</span>}
      </span>
    </span>
  );
};
