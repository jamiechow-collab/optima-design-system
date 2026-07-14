import React from 'react';
import './SidebarNavItem.css';

export interface SidebarNavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Icon shown in the 40×40 box — pass an <Icon /> (defaults to its 20px "md" size) */
  icon: React.ReactNode;
  /** Caption shown under the icon */
  label: string;
  /** Highlights the item as the current page */
  active?: boolean;
}

export const SidebarNavItem = ({
  icon,
  label,
  active = false,
  className,
  ...rest
}: SidebarNavItemProps) => {
  const classes = ['ds-sidebar-nav-item', active ? 'is-active' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classes} aria-current={active ? 'page' : undefined} {...rest}>
      <span className="ds-sidebar-nav-item__icon">{icon}</span>
      <span className="ds-sidebar-nav-item__label">{label}</span>
    </a>
  );
};
