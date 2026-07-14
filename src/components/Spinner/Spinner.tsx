import React from 'react';
import './Spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SpinnerVariant = 'primary' | 'secondary';

const SIZE_MAP: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 20,
  md: 28,
  lg: 36,
  xl: 40,
  '2xl': 48,
};

export interface SpinnerProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'width' | 'height'> {
  /** xs 16 · sm 20 · md 28 · lg 36 · xl 40 · 2xl 48 (default xs) */
  size?: SpinnerSize;
  /** primary (dark) is for light backgrounds; secondary (white) is for dark/coloured
      backgrounds, e.g. inside a primary or disruptive Button */
  variant?: SpinnerVariant;
  /** Accessible label. Omit for a purely decorative spinner (default: aria-hidden) */
  title?: string;
}

export const Spinner = ({
  size = 'xs',
  variant = 'primary',
  title,
  className,
  ...rest
}: SpinnerProps) => {
  const px = SIZE_MAP[size];
  const classes = ['ds-spinner', `ds-spinner--${variant}`, className].filter(Boolean).join(' ');

  return (
    <svg
      className={classes}
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14.5 8A6.5 6.5 0 0 0 8 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
