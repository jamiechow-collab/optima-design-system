import React, { useRef, useState, useEffect } from 'react';
import './Menu.css';

// ── Icons ─────────────────────────────────────────────────────────────────────

export const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── MenuDivider ───────────────────────────────────────────────────────────────

export const MenuDivider = () => (
  <li role="separator" className="ds-menu-divider" aria-hidden="true" />
);

// ── MenuItem ──────────────────────────────────────────────────────────────────

export interface MenuItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'role'> {
  label: string;
  leadingIcon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  hasSubmenu?: boolean;
  /** Actual submenu content — automatically shows chevron and opens on Space/Enter */
  submenu?: React.ReactNode;
  /** When true, Space/Enter toggles an internal checked state */
  selectable?: boolean;
  disabled?: boolean;
  alert?: boolean;
  forcedState?: 'hover' | 'focused' | 'pressed';
}

export const MenuItem = ({
  label,
  leadingIcon,
  shortcut,
  checked: checkedProp,
  hasSubmenu,
  submenu,
  selectable = false,
  disabled = false,
  alert = false,
  forcedState,
  className,
  onClick,
  onKeyDown: externalOnKeyDown,
  ...rest
}: MenuItemProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [internalChecked, setInternalChecked] = useState(checkedProp ?? false);
  const submenuRef = useRef<HTMLDivElement>(null);

  const isChecked = selectable ? internalChecked : checkedProp;
  const hasSubmenuContent = !!submenu || hasSubmenu;

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;
    if (submenu) {
      setSubmenuOpen(prev => !prev);
      return;
    }
    if (selectable) {
      setInternalChecked(prev => !prev);
    }
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (disabled) return;
      if (submenu) {
        setSubmenuOpen(prev => !prev);
        return;
      }
      if (selectable) {
        setInternalChecked(prev => !prev);
      }
    }
    externalOnKeyDown?.(e);
  };

  // Focus first item in submenu when it opens
  useEffect(() => {
    if (submenuOpen && submenuRef.current) {
      const firstItem = submenuRef.current.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      firstItem?.focus();
    }
  }, [submenuOpen]);

  const classes = [
    'ds-menu-item',
    alert ? 'ds-menu-item--alert' : '',
    disabled ? 'ds-menu-item--disabled' : '',
    forcedState ? `is-${forcedState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      role="menuitem"
      className={classes}
      aria-disabled={disabled}
      aria-haspopup={hasSubmenuContent ? 'menu' : undefined}
      aria-expanded={submenu ? submenuOpen : undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {leadingIcon && (
        <span className="ds-menu-item__leading-icon">{leadingIcon}</span>
      )}
      <span className="ds-menu-item__label">{label}</span>
      {(isChecked || shortcut || hasSubmenuContent) && (
        <span className="ds-menu-item__trailing">
          {isChecked && <CheckIcon />}
          {shortcut && (
            <span className="ds-menu-item__shortcut">{shortcut}</span>
          )}
          {hasSubmenuContent && <ChevronRightIcon />}
        </span>
      )}
      {submenu && submenuOpen && (
        <div ref={submenuRef} className="ds-menu-item__submenu">
          {submenu}
        </div>
      )}
    </li>
  );
};

// ── Menu ──────────────────────────────────────────────────────────────────────

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const Menu = ({ children, className, onKeyDown: externalOnKeyDown, ...rest }: MenuProps) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (!menuRef.current) return;

    const focused = document.activeElement as HTMLElement;
    // Only handle arrow keys when a direct menuitem of this menu is focused
    if (focused?.closest('[role="menu"]') !== menuRef.current) {
      externalOnKeyDown?.(e);
      return;
    }

    const items = Array.from(
      menuRef.current.querySelectorAll<HTMLLIElement>(
        ':scope > [role="menuitem"]:not([aria-disabled="true"])'
      )
    );
    const currentIndex = items.indexOf(focused as HTMLLIElement);
    if (currentIndex === -1) {
      externalOnKeyDown?.(e);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else {
      externalOnKeyDown?.(e);
    }
  };

  return (
    <ul
      role="menu"
      ref={menuRef}
      className={['ds-menu', className].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </ul>
  );
};
