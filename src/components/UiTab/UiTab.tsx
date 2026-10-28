import React from 'react';
import './UiTab.css';

export interface UiTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Marks this tab as the currently selected one */
  active?: boolean;
  /** Icon shown before the label (16px) */
  icon?: React.ReactNode;
}

export const UiTab = React.forwardRef<HTMLButtonElement, UiTabProps>(
  ({ active = false, icon, className, children, ...rest }, ref) => {
    const classes = ['ds-ui-tab', active ? 'is-active' : '', className].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        className={classes}
        {...rest}
      >
        {icon && <span className="ds-ui-tab__icon">{icon}</span>}
        <span className="ds-ui-tab__label">{children}</span>
      </button>
    );
  }
);

UiTab.displayName = 'UiTab';
