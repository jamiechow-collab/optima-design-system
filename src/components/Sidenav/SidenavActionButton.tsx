import React from 'react';
import './SidenavActionButton.css';

export interface SidenavActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon shown in the 40×40 square — pass an <Icon /> (defaults to its 20px "md" size) */
  icon: React.ReactNode;
  /** Required since the button shows no visible label */
  'aria-label': string;
}

export const SidenavActionButton = ({
  icon,
  className,
  ...rest
}: SidenavActionButtonProps) => {
  const classes = ['ds-sidenav-action', className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} {...rest}>
      {icon}
    </button>
  );
};
