import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './TablePagination.css';

export interface TablePaginationProps {
  /** 1-based index of the first record shown on the current page */
  rangeStart: number;
  /** 1-based index of the last record shown on the current page */
  rangeEnd: number;
  /** Total number of records across all pages */
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

export const TablePagination = ({
  rangeStart,
  rangeEnd,
  total,
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  className,
}: TablePaginationProps) => {
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const classes = ['ds-table-pagination', className].filter(Boolean).join(' ');

  const go = (page: number) => {
    if (disabled || page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <nav className={classes} aria-label="Table pagination">
      <span className="ds-table-pagination__range">
        <strong>{rangeStart.toLocaleString()}</strong> to <strong>{rangeEnd.toLocaleString()}</strong> of{' '}
        <strong>{total.toLocaleString()}</strong>
      </span>
      <div className="ds-table-pagination__controls">
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="First page"
          disabled={disabled || isFirstPage}
          onClick={() => go(1)}
        >
          <Icon name="jump-to-front" size="sm" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="Previous page"
          disabled={disabled || isFirstPage}
          onClick={() => go(currentPage - 1)}
        >
          <Icon name="arrow-left" size="sm" />
        </Button>
        <span className="ds-table-pagination__label">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="Next page"
          disabled={disabled || isLastPage}
          onClick={() => go(currentPage + 1)}
        >
          <Icon name="arrow-right" size="sm" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="Last page"
          disabled={disabled || isLastPage}
          onClick={() => go(totalPages)}
        >
          <Icon name="jump-to-back" size="sm" />
        </Button>
      </div>
    </nav>
  );
};
