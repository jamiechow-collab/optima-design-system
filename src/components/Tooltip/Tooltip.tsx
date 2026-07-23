import React, { useId, useLayoutEffect, useRef, useState } from 'react';
import './Tooltip.css';

export type TooltipVariant = 'primary' | 'secondary';
export type TooltipPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  /** The element that triggers the tooltip on hover/focus — must accept a ref */
  children: React.ReactElement;
  /** primary (dark, default) or secondary (light) */
  variant?: TooltipVariant;
  /** Which side of the trigger the tooltip opens on — 'auto' (default) picks
      top/bottom based on available viewport space */
  placement?: TooltipPlacement;
  /** How the tooltip lines up against the trigger along the cross axis */
  align?: TooltipAlign;
  /** Single-line content — renders the "Label only" type */
  label?: React.ReactNode;
  /** Renders the "With title" type instead of `label` */
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  /** Suppresses showing the tooltip entirely */
  disabled?: boolean;
}

export const Tooltip = ({
  children,
  variant = 'primary',
  placement = 'auto',
  align = 'center',
  label,
  title,
  description,
  className,
  disabled = false,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [resolvedPlacement, setResolvedPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>(
    placement === 'auto' ? 'bottom' : placement
  );
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const generatedId = useId();
  const isRich = title != null || description != null;

  const show = () => {
    if (!disabled) setVisible(true);
  };
  const hide = () => setVisible(false);

  const handleKeyDown: React.KeyboardEventHandler<HTMLSpanElement> = (e) => {
    if (e.key === 'Escape') hide();
  };

  // Basic edge-detection for 'auto': flip top<->bottom if the tooltip would
  // otherwise overflow the viewport, per the guideline's "detect the edges
  // of the browser" behaviour. Left/right placements are always explicit.
  useLayoutEffect(() => {
    if (placement !== 'auto' || !visible || !bubbleRef.current) return;
    const rect = bubbleRef.current.getBoundingClientRect();
    if (rect.top < 0) setResolvedPlacement('bottom');
    else if (rect.bottom > window.innerHeight) setResolvedPlacement('top');
  }, [placement, visible]);

  const trigger = React.cloneElement(children, {
    'aria-describedby': visible ? generatedId : undefined,
  });

  const activePlacement = placement === 'auto' ? resolvedPlacement : placement;

  const bubbleClasses = [
    'ds-tooltip',
    `ds-tooltip--${variant}`,
    isRich ? 'ds-tooltip--rich' : 'ds-tooltip--label',
    `ds-tooltip--${activePlacement}`,
    `ds-tooltip--align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      ref={wrapperRef}
      className="ds-tooltip__wrapper"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
    >
      {trigger}
      {visible && (
        <span ref={bubbleRef} role="tooltip" id={generatedId} className={bubbleClasses}>
          {isRich ? (
            <>
              {title && <span className="ds-tooltip__title">{title}</span>}
              {description && <span className="ds-tooltip__description">{description}</span>}
            </>
          ) : (
            <span className="ds-tooltip__label">{label}</span>
          )}
        </span>
      )}
    </span>
  );
};
