import React from 'react';
import './Tabs.css';

export type TabListVariant = 'pill' | 'underline' | 'vertical';

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** pill (default) is a bordered box of boxed tabs; underline is a bottom-border
      style; vertical stacks tabs in a column, each its own box when selected */
  variant?: TabListVariant;
  /** Accessible name for the tablist, e.g. "Account settings sections" */
  'aria-label'?: string;
}

export const TabList = React.forwardRef<HTMLDivElement, TabListProps>(
  ({ variant = 'pill', className, children, onKeyDown, ...rest }, forwardedRef) => {
    const classes = ['ds-tablist', `ds-tablist--${variant}`, className].filter(Boolean).join(' ');

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;

      const isVertical = variant === 'vertical';
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (![nextKey, prevKey, 'Home', 'End'].includes(e.key)) return;

      const tabs = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
      );
      if (tabs.length === 0) return;
      const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (currentIndex === -1) return;

      e.preventDefault();
      let nextIndex = currentIndex;
      if (e.key === nextKey) nextIndex = (currentIndex + 1) % tabs.length;
      else if (e.key === prevKey) nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIndex = 0;
      else if (e.key === 'End') nextIndex = tabs.length - 1;

      // Tabs follow the "automatic activation" pattern — moving focus also
      // selects, so the tab click handler fires as the new tab is focused.
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    };

    return (
      <div
        ref={forwardedRef}
        role="tablist"
        aria-orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
        className={classes}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';
