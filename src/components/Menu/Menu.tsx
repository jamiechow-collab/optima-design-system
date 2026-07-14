import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './Menu.css';

// ── MenuDivider ─────────────────────────────────────────────────────────────

export const MenuDivider = () => <li role="separator" className="ds-menu-divider" aria-hidden="true" />;

// ── MenuSectionTitle ──────────────────────────────────────────────────────────

export type MenuSectionTitleSize = 'sm' | 'md' | 'lg';

export interface MenuSectionTitleProps {
  size?: MenuSectionTitleSize;
  children: React.ReactNode;
}

export const MenuSectionTitle = ({ size = 'sm', children }: MenuSectionTitleProps) => (
  <li role="presentation" className={`ds-menu-section-title ds-menu-section-title--${size}`}>
    {children}
  </li>
);

// ── MenuItem ──────────────────────────────────────────────────────────────────

export type MenuItemSize = 'sm' | 'md' | 'lg';

export interface MenuItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'> {
  /** Single-line label. Combine with `title` or `description` for a two-line item */
  label: React.ReactNode;
  /** Small caption shown above the label */
  title?: React.ReactNode;
  /** Small caption shown below the label */
  description?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  /** Decorative icon on the right, independent of the checkmark/chevron (e.g. an external-link glyph) */
  trailingIcon?: React.ReactNode;
  shortcut?: string;
  checked?: boolean;
  /** Shows the chevron without needing real submenu content */
  hasSubmenu?: boolean;
  /** Submenu content — automatically shows the chevron and opens on click/hover/Enter/→ */
  submenu?: React.ReactNode;
  /** When true, Space/Enter toggles an internal checked state */
  selectable?: boolean;
  disabled?: boolean;
  /** Destructive item (e.g. "Delete") */
  alert?: boolean;
  size?: MenuItemSize;
  /** Storybook-only: force a visual state without real interaction */
  forcedState?: 'hover' | 'focused' | 'pressed' | 'alert-hover';
}

export const MenuItem = ({
  label,
  title,
  description,
  leadingIcon,
  trailingIcon,
  shortcut,
  checked: checkedProp,
  hasSubmenu,
  submenu,
  selectable = false,
  disabled = false,
  alert = false,
  size = 'sm',
  forcedState,
  className,
  onClick,
  onKeyDown: externalOnKeyDown,
  onMouseEnter: externalOnMouseEnter,
  ...rest
}: MenuItemProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [internalChecked, setInternalChecked] = useState(checkedProp ?? false);
  const itemRef = useRef<HTMLLIElement>(null);
  const submenuRef = useRef<HTMLUListElement>(null);

  const isChecked = selectable ? internalChecked : checkedProp;
  const hasSubmenuContent = !!submenu || hasSubmenu;

  const openSubmenu = () => !disabled && submenu && setSubmenuOpen(true);
  const closeSubmenu = () => setSubmenuOpen(false);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (disabled) return;
    if (submenu) {
      setSubmenuOpen((prev) => !prev);
      return;
    }
    if (selectable) setInternalChecked((prev) => !prev);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (disabled) return;
    if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === e.target) {
      e.preventDefault();
      if (submenu) {
        setSubmenuOpen((prev) => !prev);
      } else if (selectable) {
        setInternalChecked((prev) => !prev);
      }
    } else if (e.key === 'ArrowRight' && submenu) {
      e.preventDefault();
      openSubmenu();
    } else if (e.key === 'ArrowLeft' && submenuOpen) {
      e.preventDefault();
      closeSubmenu();
      itemRef.current?.focus();
    } else if (e.key === 'Escape' && submenuOpen) {
      e.preventDefault();
      closeSubmenu();
      itemRef.current?.focus();
    }
    externalOnKeyDown?.(e);
  };

  // Focus the first item in the submenu when it opens
  useEffect(() => {
    if (submenuOpen && submenuRef.current) {
      const firstItem = submenuRef.current.querySelector<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      firstItem?.focus();
    }
  }, [submenuOpen]);

  // Close the submenu on outside click
  useEffect(() => {
    if (!submenuOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (!itemRef.current?.contains(e.target as Node)) closeSubmenu();
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [submenuOpen]);

  const hasTwoLines = !!title || !!description;

  const classes = [
    'ds-menu-item',
    `ds-menu-item--${size}`,
    hasTwoLines ? 'ds-menu-item--two-line' : '',
    alert ? 'ds-menu-item--alert' : '',
    disabled ? 'ds-menu-item--disabled' : '',
    forcedState ? `is-${forcedState}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li
      ref={itemRef}
      role="menuitem"
      className={classes}
      aria-disabled={disabled}
      aria-haspopup={hasSubmenuContent ? 'menu' : undefined}
      aria-expanded={submenu ? submenuOpen : undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={(e) => {
        if (submenu) openSubmenu();
        externalOnMouseEnter?.(e);
      }}
      {...rest}
    >
      <span className="ds-menu-item__text">
        {leadingIcon && <span className="ds-menu-item__leading-icon">{leadingIcon}</span>}
        {hasTwoLines ? (
          <span className="ds-menu-item__text-content">
            {title && <span className="ds-menu-item__caption">{title}</span>}
            <span className="ds-menu-item__label">{label}</span>
            {description && <span className="ds-menu-item__caption">{description}</span>}
          </span>
        ) : (
          <span className="ds-menu-item__label">{label}</span>
        )}
      </span>
      {(isChecked || trailingIcon || shortcut || hasSubmenuContent) && (
        <span className="ds-menu-item__right">
          {isChecked && (
            <span className="ds-menu-item__checkmark">
              <Icon name="checkmark" size="sm" />
            </span>
          )}
          {trailingIcon && <span className="ds-menu-item__trailing-icon">{trailingIcon}</span>}
          {shortcut && <span className="ds-menu-item__shortcut">{shortcut}</span>}
          {hasSubmenuContent && (
            <span className="ds-menu-item__chevron">
              <Icon name="chevron-right" size="sm" />
            </span>
          )}
        </span>
      )}
      {submenu && submenuOpen && (
        <Menu ref={submenuRef} className="ds-menu-item__submenu">
          {submenu}
        </Menu>
      )}
    </li>
  );
};

// ── Menu ──────────────────────────────────────────────────────────────────────

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  ({ children, className, onKeyDown: externalOnKeyDown, ...rest }, forwardedRef) => {
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
        ref={(node) => {
          menuRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={['ds-menu', className].filter(Boolean).join(' ')}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </ul>
    );
  }
);

Menu.displayName = 'Menu';
