import React from 'react';

export interface NavTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Only rendered content when true — pass whether this panel's tab is active */
  active: boolean;
}

export const NavTabPanel = ({ active, children, ...rest }: NavTabPanelProps) => {
  if (!active) return null;

  return (
    <div role="tabpanel" tabIndex={0} {...rest}>
      {children}
    </div>
  );
};
