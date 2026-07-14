import React from 'react';
import './Sidebar.css';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** App logo, shown at the top */
  logo?: React.ReactNode;
  /** Primary action, e.g. a <SidebarActionButton /> for "create new" */
  actionButton?: React.ReactNode;
  /** Nav items — one or more <SidebarNavItem /> */
  children: React.ReactNode;
  /** Bottom slot, e.g. a settings or collapse-menu trigger */
  footer?: React.ReactNode;
  /** Accessible name for the <nav> landmark */
  'aria-label'?: string;
}

export const Sidebar = ({
  logo,
  actionButton,
  children,
  footer,
  className,
  'aria-label': ariaLabel = 'Main',
  ...rest
}: SidebarProps) => {
  const classes = ['ds-sidebar', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label={ariaLabel} {...rest}>
      {logo && <div className="ds-sidebar__logo">{logo}</div>}
      <div className="ds-sidebar__items">
        {actionButton && <div className="ds-sidebar__action">{actionButton}</div>}
        <div className="ds-sidebar__nav">{children}</div>
      </div>
      {footer && <div className="ds-sidebar__footer">{footer}</div>}
    </nav>
  );
};
