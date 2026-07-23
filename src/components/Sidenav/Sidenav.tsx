import React from 'react';
import './Sidenav.css';

export interface SidenavProps extends React.HTMLAttributes<HTMLElement> {
  /** App logo, shown at the top */
  logo?: React.ReactNode;
  /** Primary action, e.g. a <SidenavActionButton /> for "create new" */
  actionButton?: React.ReactNode;
  /** Nav items — one or more <SidenavNavItem /> */
  children: React.ReactNode;
  /** Bottom slot, e.g. a settings or collapse-menu trigger */
  footer?: React.ReactNode;
  /** Accessible name for the <nav> landmark */
  'aria-label'?: string;
}

export const Sidenav = ({
  logo,
  actionButton,
  children,
  footer,
  className,
  'aria-label': ariaLabel = 'Main',
  ...rest
}: SidenavProps) => {
  const classes = ['ds-sidenav', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} aria-label={ariaLabel} {...rest}>
      {logo && <div className="ds-sidenav__logo">{logo}</div>}
      <div className="ds-sidenav__items">
        {actionButton && <div className="ds-sidenav__action">{actionButton}</div>}
        <div className="ds-sidenav__nav">{children}</div>
      </div>
      {footer && <div className="ds-sidenav__footer">{footer}</div>}
    </nav>
  );
};
