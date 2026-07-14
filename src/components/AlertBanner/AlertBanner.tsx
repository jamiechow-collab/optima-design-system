import React from 'react';
import { Icon } from '../Icon/Icon';
import './AlertBanner.css';

export type AlertBannerType = 'default' | 'message' | 'positive' | 'negative' | 'warning';

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default · message · positive · negative · warning */
  type?: AlertBannerType;
  /** The banner message (title when a description is present) */
  children: React.ReactNode;
  /** Extra context about what happened and why — switches the title to Label/semibold */
  description?: React.ReactNode;
  /** Leading icon inside a circle ("Icon with background") — 24px, or 32px with a description */
  icon?: React.ReactNode;
  /** Action buttons, aligned horizontally to the right of the text (alert-coloured per type) */
  actions?: React.ReactNode;
  /** Called when the close icon button is clicked */
  onClose?: () => void;
}

export const AlertBanner = ({
  type = 'default',
  children,
  description,
  icon,
  actions,
  onClose,
  className,
  ...rest
}: AlertBannerProps) => {
  const classes = [
    'ds-alert-banner',
    `ds-alert-banner--${type}`,
    description || actions ? 'ds-alert-banner--stacked' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" {...rest}>
      {icon && (
        <span className="ds-alert-banner__icon-bubble" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="ds-alert-banner__body">
        <p className="ds-alert-banner__title">{children}</p>
        {description && <p className="ds-alert-banner__description">{description}</p>}
      </div>
      {actions && <div className="ds-alert-banner__actions">{actions}</div>}
      <button
        type="button"
        className="ds-alert-banner__close"
        aria-label="Dismiss"
        onClick={onClose}
      >
        <Icon name="close" size="sm" />
      </button>
    </div>
  );
};
