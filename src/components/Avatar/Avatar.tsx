import React from 'react';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'busy' | 'away';
export type AvatarGroupSize = 'xs' | 'sm' | 'md';

// ── StatusDot ─────────────────────────────────────────────────────────────────
// Dot sizes per avatar size: xs 6 · sm 8 · md 10 · lg 12 · xl 14 · 2xl 16

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: AvatarStatus;
  /** Matches the avatar size it decorates */
  size?: AvatarSize;
}

export const StatusDot = ({ status, size = 'md', className, ...rest }: StatusDotProps) => (
  <span
    className={['ds-status-dot', `ds-status-dot--${size}`, `ds-status-dot--${status}`, className]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  />
);

// ── Placeholder silhouette (the "Without image" type) ─────────────────────────

const PlaceholderPerson = () => (
  <svg
    className="ds-avatar__person"
    viewBox="0 0 36 33"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.9742 16.5C24.9305 16.5 31.1896 19.4811 35.5466 24.2344C31.5313 29.5575 25.1557 33 17.9742 33C10.7924 33 4.4153 29.558 0.4 24.2344C4.75707 19.4806 11.0175 16.5 17.9742 16.5Z"
      fill="#525252"
    />
    <path
      d="M25.3076 7.33333C25.3076 11.3834 22.0243 14.6667 17.9742 14.6667C13.9241 14.6667 10.6409 11.3834 10.6409 7.33333C10.6409 3.28325 13.9241 0 17.9742 0C22.0243 0 25.3076 3.28325 25.3076 7.33333Z"
      fill="#525252"
    />
  </svg>
);

// ── Avatar ────────────────────────────────────────────────────────────────────
// Sizes: xs 24 · sm 32 · md 44 · lg 48 · xl 56 · 2xl 64
// Types: with image (src) → with initials (initials) → without image (neither)

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo URL — "With image" type */
  src?: string;
  /** Accessible name for the person shown */
  alt?: string;
  /** Fallback initials — "With initials" type (shown when no src) */
  initials?: string;
  /** xs 24 · sm 32 · md 44 · lg 48 · xl 56 · 2xl 64 (default md) */
  size?: AvatarSize;
  /** Presence indicator dot at the bottom-right corner */
  status?: AvatarStatus;
  /** Dims the avatar to 60% opacity */
  disabled?: boolean;
  /** Shows the 4px focus ring (applied automatically on keyboard focus when tabIndex is set) */
  focused?: boolean;
}

export const Avatar = ({
  src,
  alt = '',
  initials,
  size = 'md',
  status,
  disabled = false,
  focused = false,
  className,
  ...rest
}: AvatarProps) => {
  const classes = [
    'ds-avatar',
    `ds-avatar--${size}`,
    disabled ? 'is-disabled' : '',
    focused ? 'is-focused' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role={alt ? 'img' : undefined} aria-label={alt || undefined} {...rest}>
      {src ? (
        <img className="ds-avatar__image" src={src} alt="" />
      ) : initials ? (
        <span className="ds-avatar__initials" aria-hidden="true">
          {initials}
        </span>
      ) : (
        <span className="ds-avatar__placeholder" aria-hidden="true">
          <PlaceholderPerson />
        </span>
      )}
      {status && <StatusDot status={status} size={size} />}
    </div>
  );
};

// ── AvatarGroup ───────────────────────────────────────────────────────────────
// Overlap per size: xs −4 · sm −8 · md −12 (Figma defines the group for xs/sm/md)

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** xs 24 · sm 32 · md 44 — applied to every child avatar */
  size?: AvatarGroupSize;
  /** Avatar elements to stack */
  children: React.ReactNode;
}

export const AvatarGroup = ({ size = 'md', children, className, ...rest }: AvatarGroupProps) => (
  <div
    className={['ds-avatar-group', `ds-avatar-group--${size}`, className].filter(Boolean).join(' ')}
    {...rest}
  >
    {React.Children.map(children, (child) =>
      React.isValidElement<AvatarProps>(child) ? React.cloneElement(child, { size }) : child
    )}
  </div>
);

// ── AvatarWithDetails ─────────────────────────────────────────────────────────
// Avatar + name/email column. Gap: xs/sm 8 · md/lg 12 · xl/2xl 16

export interface AvatarWithDetailsProps extends Omit<AvatarProps, 'children'> {
  name: string;
  email?: string;
}

export const AvatarWithDetails = ({
  name,
  email,
  size = 'md',
  className,
  src,
  alt,
  initials,
  status,
  disabled,
  focused,
  ...rest
}: AvatarWithDetailsProps) => (
  <div
    className={['ds-avatar-details', `ds-avatar-details--${size}`, className].filter(Boolean).join(' ')}
    {...rest}
  >
    <Avatar
      src={src}
      alt={alt}
      initials={initials}
      size={size}
      status={status}
      disabled={disabled}
      focused={focused}
    />
    <div className="ds-avatar-details__text">
      <span className="ds-avatar-details__name">{name}</span>
      {email && <span className="ds-avatar-details__email">{email}</span>}
    </div>
  </div>
);
