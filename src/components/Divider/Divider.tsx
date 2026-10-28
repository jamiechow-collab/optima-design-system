import React, { createContext, useContext } from 'react';
import './Divider.css';

/** Set by `Menu`, so a Divider inside a menu renders as a `<li role="separator">` (a valid child of the list). */
export const DividerListContext = createContext(false);

export type DividerColour = 'primary' | 'secondary' | 'tertiary';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** `horizontal` is a 1px line across the container, `vertical` a 1px line along its height */
  orientation?: 'horizontal' | 'vertical';
  /** Divider colour token: primary #474747, secondary #D1D1D1, tertiary #EDE9E3 (default) */
  colour?: DividerColour;
}

/** A 1px line that separates content. Used on its own, and between the items of a Menu. */
export const Divider = ({ orientation = 'horizontal', colour = 'tertiary', className, ...rest }: DividerProps) => {
  const inList = useContext(DividerListContext);
  const classes = ['ds-divider', `ds-divider--${orientation}`, `ds-divider--${colour}`, className].filter(Boolean).join(' ');
  const Tag = (inList ? 'li' : 'div') as React.ElementType;
  return <Tag role="separator" aria-orientation={orientation} className={classes} {...rest} />;
};

export default Divider;
