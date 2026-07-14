import React from 'react';
import { ICONS, IconName } from './icons';
import './Icon.css';

export type { IconName };
export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'name'> {
  /** Which icon to render — see the AP Icons set in Figma */
  name: IconName;
  /** xs = 12px, sm = 16px, md = 20px (default), lg = 24px */
  size?: IconSize;
  /** Accessible label. Omit for purely decorative icons (default: aria-hidden) */
  title?: string;
}

export const Icon = ({ name, size = 'md', title, className, ...rest }: IconProps) => {
  const Glyph = ICONS[name];
  if (!Glyph) return null;

  const classes = ['ds-icon', className].filter(Boolean).join(' ');

  return (
    <Glyph
      size={SIZE_MAP[size]}
      className={classes}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    />
  );
};
