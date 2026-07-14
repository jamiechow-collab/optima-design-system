import React, { useEffect, useId, useRef, useState } from 'react';
import './Toggletip.css';

export type ToggletipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type ToggletipVariant = 'primary' | 'secondary';

export interface ToggletipProps {
  /** The element that opens the toggletip on click — must be a real interactive
      element (e.g. a button) so Enter/Space activation works natively */
  children: React.ReactElement;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Action button label — omit to hide the button */
  actionLabel?: React.ReactNode;
  onAction?: () => void;
  /** Which side of the trigger the popover opens on (default 'bottom') */
  placement?: ToggletipPlacement;
  /** primary (dark, default) or secondary (light) */
  variant?: ToggletipVariant;
  className?: string;
  disabled?: boolean;
}

export const Toggletip = ({
  children,
  title,
  description,
  actionLabel,
  onAction,
  placement = 'bottom',
  variant = 'primary',
  className,
  disabled = false,
}: ToggletipProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const generatedId = useId();

  const close = () => setOpen(false);

  // Dismiss on any click outside the trigger or the open popover.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const handleWrapperKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      close();
      // Return focus to the trigger, which is always the wrapper's first child.
      (wrapperRef.current?.firstElementChild as HTMLElement | null)?.focus();
    }
  };

  const trigger = React.cloneElement(children, {
    'aria-expanded': open,
    'aria-describedby': open ? generatedId : undefined,
    onClick: (e: React.MouseEvent) => {
      children.props.onClick?.(e);
      if (disabled) return;
      setOpen((o) => !o);
    },
  });

  const handleAction = () => {
    onAction?.();
    close();
  };

  const bubbleClasses = [
    'ds-toggletip',
    `ds-toggletip--${placement}`,
    `ds-toggletip--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={wrapperRef} className="ds-toggletip__wrapper" onKeyDown={handleWrapperKeyDown}>
      {trigger}
      {open && (
        <span id={generatedId} className={bubbleClasses}>
          <span className="ds-toggletip__content">
            <span className="ds-toggletip__title">{title}</span>
            <span className="ds-toggletip__description">{description}</span>
          </span>
          {actionLabel && (
            <button type="button" className="ds-toggletip__action" onClick={handleAction}>
              {actionLabel}
            </button>
          )}
        </span>
      )}
    </span>
  );
};
