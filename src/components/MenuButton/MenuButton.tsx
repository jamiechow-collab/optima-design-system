import React, { useEffect, useRef, useState } from 'react';
import { ToggleButton, ToggleButtonProps } from '../ToggleButton/ToggleButton';
import { Button } from '../Button/Button';
import { Avatar, AvatarProps } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Icon } from '../Icon/Icon';
import './MenuButton.css';

export type MenuButtonPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export interface MenuButtonRenderProps {
  open: boolean;
  toggle: () => void;
}

export interface MenuButtonProps {
  /** Renders the trigger element — receives the open state and a toggle handler */
  renderTrigger: (props: MenuButtonRenderProps) => React.ReactNode;
  /** The menu shown when open — typically a <Menu> */
  children: React.ReactNode;
  /** Where the menu opens relative to the trigger. Default: below, aligned left */
  position?: MenuButtonPosition;
  disabled?: boolean;
  className?: string;
}

/**
 * Low-level trigger + popover wrapper shared by every Menu Button type.
 * Handles open/close state, outside-click, and Escape — the specific
 * trigger visuals (Filter/Inline/Icon/Avatar) are built on top of this.
 */
export const MenuButton = ({
  renderTrigger,
  children,
  position = 'bottom-left',
  disabled = false,
  className,
}: MenuButtonProps) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={['ds-menu-button', className].filter(Boolean).join(' ')}>
      {renderTrigger({ open, toggle })}
      {open && (
        <div className={`ds-menu-button__popover ds-menu-button__popover--${position}`}>{children}</div>
      )}
    </div>
  );
};

// ── Filter Button ─────────────────────────────────────────────────────────────
// Same behaviour as Button, but shows whether the filter is currently active —
// our existing ToggleButton, wired up as a menu trigger with an always-visible
// trailing chevron. It also looks "active" (primary colour) while the menu is
// open, on top of any filter-applied active state the consumer sets.

export interface FilterMenuButtonProps
  extends Omit<ToggleButtonProps, 'onClick' | 'children' | 'trailingIcon'> {
  /** The trigger's own label (ToggleButton normally takes this as children) */
  label: React.ReactNode;
  position?: MenuButtonPosition;
  /** The menu shown when open */
  children: React.ReactNode;
}

export const FilterMenuButton = ({
  label,
  position,
  children,
  active = false,
  ...toggleProps
}: FilterMenuButtonProps) => (
  <MenuButton
    position={position}
    disabled={toggleProps.disabled}
    renderTrigger={({ open, toggle }) => (
      <ToggleButton
        {...toggleProps}
        active={active || open}
        trailingIcon={<Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />}
        onClick={toggle}
      >
        {label}
      </ToggleButton>
    )}
  >
    {children}
  </MenuButton>
);

// ── Inline Button ─────────────────────────────────────────────────────────────
// A minimal text trigger — the chevron flips to point up while the menu is open.

export interface InlineMenuButtonProps {
  label: React.ReactNode;
  leadingIcon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  position?: MenuButtonPosition;
  children: React.ReactNode;
}

export const InlineMenuButton = ({
  label,
  leadingIcon,
  badge,
  disabled = false,
  position,
  children,
}: InlineMenuButtonProps) => (
  <MenuButton
    position={position}
    disabled={disabled}
    renderTrigger={({ open, toggle }) => (
      <button
        type="button"
        className={['ds-menu-button-inline', open ? 'is-open' : ''].filter(Boolean).join(' ')}
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {leadingIcon && <span className="ds-menu-button-inline__icon">{leadingIcon}</span>}
        <span className="ds-menu-button-inline__label">{label}</span>
        {badge != null && <Badge size="sm">{badge}</Badge>}
        <span className="ds-menu-button-inline__chevron">
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size="sm" />
        </span>
      </button>
    )}
  >
    {children}
  </MenuButton>
);

// ── Icon Button ────────────────────────────────────────────────────────────────
// A plain icon-only Button (ghost variant) used as a trigger.

export interface IconMenuButtonProps {
  icon: React.ReactNode;
  'aria-label': string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  position?: MenuButtonPosition;
  children: React.ReactNode;
}

export const IconMenuButton = ({
  icon,
  size = 'sm',
  disabled = false,
  position,
  children,
  ...rest
}: IconMenuButtonProps) => (
  <MenuButton
    position={position}
    disabled={disabled}
    renderTrigger={({ open, toggle }) => (
      <Button
        variant="ghost"
        iconOnly
        size={size}
        disabled={disabled}
        onClick={toggle}
        className={open ? 'is-hover' : undefined}
        {...rest}
      >
        {icon}
      </Button>
    )}
  >
    {children}
  </MenuButton>
);

// ── Avatar Button ──────────────────────────────────────────────────────────────
// An Avatar used as a trigger, wrapped in a reset button for real focus/click behaviour.

export interface AvatarMenuButtonProps extends Omit<AvatarProps, 'onClick'> {
  disabled?: boolean;
  position?: MenuButtonPosition;
  children: React.ReactNode;
}

export const AvatarMenuButton = ({ disabled = false, position, children, ...avatarProps }: AvatarMenuButtonProps) => (
  <MenuButton
    position={position}
    disabled={disabled}
    renderTrigger={({ toggle }) => (
      <button
        type="button"
        className="ds-menu-button-avatar"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="menu"
      >
        <Avatar disabled={disabled} {...avatarProps} />
      </button>
    )}
  >
    {children}
  </MenuButton>
);
