import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, ButtonProps } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Stepper } from '../Stepper/Stepper';
import './Modal.css';

export interface ModalAction extends Omit<ButtonProps, 'children' | 'variant'> {
  label: string;
}

export interface ModalProps {
  /** Shows the modal. Ignored when `inline` */
  open?: boolean;
  /** Called by the close button, the Escape key and a click on the backdrop */
  onClose?: () => void;
  title: React.ReactNode;
  /** Line under the title — can hold an icon or a link */
  subtitle?: React.ReactNode;
  /** The content slot */
  children?: React.ReactNode;
  /** Principal action, the dark button at the right of the footer */
  primaryAction?: ModalAction;
  /** Optional low-emphasis action beside it */
  secondaryAction?: ModalAction;
  /** Panel size: sm 460px, md 540px */
  size?: 'sm' | 'md';
  /** Panel width in px, overrides `size` */
  width?: number;
  /** Alert modal: closes only with its buttons, not with Escape or a click outside. Use for sensitive or important messages, and for forms that need data from the user */
  alertModal?: boolean;
  /** Wizard modal: shows a stepper in the footer, between the secondary (Back) and primary (Next) actions */
  wizard?: { count: number; current: number };
  /** Fixed height of the content slot in px; the content scrolls when it is taller */
  contentHeight?: number;
  /** Removes the side padding of the content slot, for content that runs edge to edge */
  flush?: boolean;
  /** Draws the panel in the page flow, without the backdrop — for docs */
  inline?: boolean;
  /** Close on a click on the backdrop (default true) */
  closeOnBackdrop?: boolean;
  className?: string;
}

const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

export const Modal = ({
  open = false,
  onClose,
  title,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
  size = 'md',
  width,
  alertModal = false,
  wizard,
  contentHeight,
  flush = false,
  inline = false,
  closeOnBackdrop = true,
  className,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const visible = inline || open;

  // Focus moves into the dialog on open and back to the trigger on close; Tab stays inside; the page behind doesn't scroll.
  useEffect(() => {
    if (!visible || inline) return undefined;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      trigger?.focus?.();
    };
  }, [visible, inline]);

  // The footer gets a top border while the content is taller than its slot
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return undefined;
    const check = () => setScrolls(el.scrollHeight > el.clientHeight + 1);
    check();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  });

  if (!visible) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (inline) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (!alertModal) onClose?.();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const panel = (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={inline ? undefined : true}
      aria-labelledby={titleId}
      tabIndex={-1}
      className={['ds-modal', inline ? 'ds-modal--inline' : '', className].filter(Boolean).join(' ')}
      style={{ width: width ?? (size === 'sm' ? 460 : 540) }}
      onKeyDown={onKeyDown}
    >
      <div className="ds-modal__header">
        <div className="ds-modal__title-row">
          <h2 id={titleId} className="ds-modal__title">{title}</h2>
          {onClose && (
            <Button variant="ghost" size="sm" iconOnly className="ds-modal__close" aria-label="Close" onClick={onClose}>
              <Icon name="close" size="sm" />
            </Button>
          )}
        </div>
        {subtitle && <p className="ds-modal__subtitle">{subtitle}</p>}
      </div>
      <div
        ref={contentRef}
        className={`ds-modal__content ${flush ? 'ds-modal__content--flush' : ''}`.trim()}
        style={contentHeight ? { height: contentHeight, flex: 'none' } : undefined}
      >
        {children}
      </div>
      {(primaryAction || secondaryAction || wizard) && (
        <div className={['ds-modal__footer', scrolls ? 'has-border' : '', wizard ? 'ds-modal__footer--wizard' : ''].filter(Boolean).join(' ')}>
          {wizard && <Stepper count={wizard.count} current={wizard.current} className="ds-modal__stepper" />}
          {secondaryAction && <Button variant="ghost" size="sm" {...secondaryAction}>{secondaryAction.label}</Button>}
          {primaryAction && <Button variant="primary" size="sm" {...primaryAction}>{primaryAction.label}</Button>}
        </div>
      )}
    </div>
  );

  if (inline) return panel;
  return createPortal(
    <div
      className="ds-modal-overlay"
      onMouseDown={(e) => {
        if (closeOnBackdrop && !alertModal && e.target === e.currentTarget) onClose?.();
      }}
    >
      {panel}
    </div>,
    document.body
  );
};

export default Modal;
