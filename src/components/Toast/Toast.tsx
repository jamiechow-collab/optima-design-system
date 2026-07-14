import React from 'react';
import { Icon, IconName } from '../Icon/Icon';
import './Toast.css';

export type ToastType = 'default' | 'positive' | 'negative' | 'warning';
export type ToastVariant = 'message' | 'details' | 'push';

const DEFAULT_ICON: Record<ToastType, IconName | null> = {
  default: null,
  positive: 'checkmark',
  negative: 'warning',
  warning: 'info-with-circle',
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default (dark) · positive · negative · warning — colour, only used by the "message" variant */
  type?: ToastType;
  /** message (single line, coloured) · details (white, icon + title + body + buttons) · push (white, icon + title + body + timestamp) */
  variant?: ToastVariant;
  /** Leading icon (20px) — message variant. positive/negative/warning fall back to a type icon */
  icon?: React.ReactNode;
  /** Icon inside the 44px avatar bubble — details/push variant */
  avatarIcon?: React.ReactNode;
  /** Title — details/push variant */
  title?: React.ReactNode;
  /** Message (message variant) or body copy (details/push variant) */
  children: React.ReactNode;
  /** Relative time text, e.g. "a few seconds ago" — push variant */
  timestamp?: React.ReactNode;
  /** Action button(s) — a single outlined button (message) or a button group (details) */
  actions?: React.ReactNode;
  /** Called when the close icon is clicked; omit to hide the close button */
  onClose?: () => void;
}

export const Toast = ({
  type = 'default',
  variant = 'message',
  icon,
  avatarIcon,
  title,
  children,
  timestamp,
  actions,
  onClose,
  className,
  ...rest
}: ToastProps) => {
  const isMessage = variant === 'message';
  const defaultIconName = DEFAULT_ICON[type];
  const resolvedIcon = icon ?? (defaultIconName ? <Icon name={defaultIconName} size="sm" /> : undefined);

  const classes = [
    'ds-toast',
    isMessage ? `ds-toast--${type}` : 'ds-toast--white',
    `ds-toast--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" {...rest}>
      {isMessage ? (
        <>
          {resolvedIcon && (
            <span className="ds-toast__icon" aria-hidden="true">
              {resolvedIcon}
            </span>
          )}
          <p className="ds-toast__message">{children}</p>
          {actions && <div className="ds-toast__actions ds-toast__actions--message">{actions}</div>}
        </>
      ) : (
        <>
          <span className="ds-toast__avatar" aria-hidden="true">
            {avatarIcon}
          </span>
          <div className="ds-toast__body">
            <div className="ds-toast__text">
              {title && <p className="ds-toast__title">{title}</p>}
              <div className="ds-toast__description">{children}</div>
            </div>
            {variant === 'details' && actions && <div className="ds-toast__actions">{actions}</div>}
            {variant === 'push' && timestamp && <p className="ds-toast__timestamp">{timestamp}</p>}
          </div>
        </>
      )}
      {onClose && (
        <button type="button" className="ds-toast__close" aria-label="Dismiss" onClick={onClose}>
          <Icon name="close" size="sm" />
        </button>
      )}
    </div>
  );
};
