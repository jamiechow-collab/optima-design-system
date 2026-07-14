import React from 'react';
import { Icon } from '../Icon/Icon';
import './Breadcrumbs.css';

export type BreadcrumbSize = 'sm' | 'md';

export interface BreadcrumbProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** sm 14/20 · md 16/24 */
  size?: BreadcrumbSize;
  /** Leading icon (16px) */
  icon?: React.ReactNode;
  /** The current page — renders as bold, non-interactive text instead of a link */
  current?: boolean;
  children: React.ReactNode;
}

export const Breadcrumb = ({
  size = 'sm',
  icon,
  current = false,
  children,
  className,
  href,
  onClick,
  ...rest
}: BreadcrumbProps) => {
  const classes = [
    'ds-breadcrumb',
    `ds-breadcrumb--${size}`,
    current ? 'ds-breadcrumb--current' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon && <span className="ds-breadcrumb__icon">{icon}</span>}
      <span className="ds-breadcrumb__label">{children}</span>
    </>
  );

  if (current) {
    return (
      <span className={classes} aria-current="page">
        {content}
      </span>
    );
  }

  return (
    <a className={classes} href={href} onClick={onClick} {...rest}>
      {content}
    </a>
  );
};

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** The trail, in order from root to the current page (the last item is rendered as current) */
  items: BreadcrumbItem[];
  /** sm 14/20 · md 16/24 */
  size?: BreadcrumbSize;
}

export const Breadcrumbs = ({ items, size = 'sm', className, ...rest }: BreadcrumbsProps) => {
  const classes = ['ds-breadcrumbs', className].filter(Boolean).join(' ');
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={classes} {...rest}>
      <ol className="ds-breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;
          return (
            <li key={index} className="ds-breadcrumbs__item">
              <Breadcrumb size={size} icon={item.icon} href={item.href} onClick={item.onClick} current={isCurrent}>
                {item.label}
              </Breadcrumb>
              {!isCurrent && (
                <Icon name="chevron-right" size="sm" className="ds-breadcrumbs__separator" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
