import React from 'react';
import './SidenavNavItem.css';

export interface SidenavNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Icon shown in the 40×40 box — pass an <Icon /> (defaults to its 20px "md" size) */
  icon: React.ReactNode;
  /** Caption shown under the icon */
  label: string;
  /** Highlights the item as the current page */
  active?: boolean;
}

export const SidenavNavItem = ({
  icon,
  label,
  active = false,
  className,
  ...rest
}: SidenavNavItemProps) => {
  const classes = ['ds-sidenav-nav-item', active ? 'is-active' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} aria-current={active ? 'page' : undefined} {...rest}>
      <span className="ds-sidenav-nav-item__icon">{icon}</span>
      <span className="ds-sidenav-nav-item__label">{label}</span>
    </a>
  );
};
