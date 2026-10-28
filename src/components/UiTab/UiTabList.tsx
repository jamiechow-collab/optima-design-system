import React from 'react';
import './UiTab.css';

export interface UiTabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the tablist, e.g. "Chart view" */
  'aria-label'?: string;
}

export const UiTabList = React.forwardRef<HTMLDivElement, UiTabListProps>(
  ({ className, children, onKeyDown, ...rest }, ref) => {
    const classes = ['ds-ui-tablist', className].filter(Boolean).join(' ');

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;

      const tabs = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
      );
      const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (currentIndex === -1) return;

      e.preventDefault();
      let nextIndex = currentIndex;
      if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') nextIndex = 0;
      else nextIndex = tabs.length - 1;

      // Automatic activation — moving focus also selects
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    };

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        className={classes}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

UiTabList.displayName = 'UiTabList';
