import React from 'react';
import './NavTab.css';

export interface NavTabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** Marks this tab as the currently selected one */
  active?: boolean;
  /** Icon shown before the label (20px) */
  icon?: React.ReactNode;
  /** Small pill shown after the label, e.g. an unread count */
  badge?: React.ReactNode;
}

export const NavTab = React.forwardRef<HTMLButtonElement, NavTabProps>(
  ({ active = false, icon, badge, disabled, className, children, ...rest }, ref) => {
    const classes = ['ds-nav-tab', active ? 'is-active' : '', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {icon && <span className="ds-nav-tab__icon">{icon}</span>}
        <span className="ds-nav-tab__label">{children}</span>
        {badge && <span className="ds-nav-tab__badge">{badge}</span>}
      </button>
    );
  }
);

NavTab.displayName = 'NavTab';
