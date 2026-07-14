import React from 'react';
import './Tabs.css';

export interface TabProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  /** Marks this tab as the currently selected one */
  active?: boolean;
  /** Icon shown before the label (20px) */
  icon?: React.ReactNode;
  /** Small pill shown after the label, e.g. an unread count */
  badge?: React.ReactNode;
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ active = false, icon, badge, disabled, className, children, ...rest }, ref) => {
    const classes = ['ds-tab', active ? 'is-active' : '', className].filter(Boolean).join(' ');

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
        {icon && <span className="ds-tab__icon">{icon}</span>}
        <span className="ds-tab__label">{children}</span>
        {badge && <span className="ds-tab__badge">{badge}</span>}
      </button>
    );
  }
);

Tab.displayName = 'Tab';
