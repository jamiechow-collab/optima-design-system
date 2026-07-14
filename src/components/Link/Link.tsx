import React from 'react';
import './Link.css';

export type LinkVariant = 'primary' | 'secondary' | 'inline';
export type LinkSize = 'sm' | 'md' | 'lg';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** primary/secondary are standalone links (underline on hover);
      inline sits within body copy and is always underlined. */
  variant?: LinkVariant;
  /** sm 14/20 · md 16/24 · lg 16/24 — follow the content the link sits with */
  size?: LinkSize;
  /** Icon before the label (20px) */
  leadingIcon?: React.ReactNode;
  /** Icon after the label */
  trailingIcon?: React.ReactNode;
  /** Non-interactive greyed-out state */
  disabled?: boolean;
}

export const Link = ({
  variant = 'primary',
  size = 'sm',
  leadingIcon,
  trailingIcon,
  disabled = false,
  children,
  className,
  href,
  onClick,
  ...rest
}: LinkProps) => {
  const classes = [
    'ds-link',
    `ds-link--${variant}`,
    `ds-link--${size}`,
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={disabled ? undefined : href}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...rest}
    >
      {leadingIcon && <span className="ds-link__icon ds-link__icon--leading">{leadingIcon}</span>}
      <span className="ds-link__label">{children}</span>
      {trailingIcon && <span className="ds-link__icon ds-link__icon--trailing">{trailingIcon}</span>}
    </a>
  );
};
