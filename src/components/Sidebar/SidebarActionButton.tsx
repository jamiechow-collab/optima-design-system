import React from 'react';
import './SidebarActionButton.css';

export interface SidebarActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon shown in the 40×40 square — pass an <Icon /> (defaults to its 20px "md" size) */
  icon: React.ReactNode;
  /** Required since the button shows no visible label */
  'aria-label': string;
}

export const SidebarActionButton = ({
  icon,
  className,
  ...rest
}: SidebarActionButtonProps) => {
  const classes = ['ds-sidebar-action', className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {icon}
    </button>
  );
};
