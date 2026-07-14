import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current page (default 1) */
  siblingCount?: number;
  /** Renders the compact "‹ Page X of Y ›" layout instead of numbered buttons */
  compact?: boolean;
  disabled?: boolean;
  className?: string;
}

type PageItem = number | 'dots';

const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

const getPageItems = (current: number, total: number, siblingCount: number): PageItem[] => {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < total - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...range(1, leftItemCount), 'dots', total];
  }
  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [1, 'dots', ...range(total - rightItemCount + 1, total)];
  }
  return [1, 'dots', ...range(leftSiblingIndex, rightSiblingIndex), 'dots', total];
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  compact = false,
  disabled = false,
  className,
}: PaginationProps) => {
  const classes = ['ds-pagination', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const goToPrevious = () => !disabled && !isFirstPage && onPageChange(currentPage - 1);
  const goToNext = () => !disabled && !isLastPage && onPageChange(currentPage + 1);

  if (compact) {
    return (
      <nav className={classes} aria-label="Pagination">
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="Previous page"
          disabled={disabled || isFirstPage}
          onClick={goToPrevious}
        >
          <Icon name="arrow-left" size="sm" />
        </Button>
        <span className="ds-pagination__label">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="sm"
          iconOnly
          aria-label="Next page"
          disabled={disabled || isLastPage}
          onClick={goToNext}
        >
          <Icon name="arrow-right" size="sm" />
        </Button>
      </nav>
    );
  }

  const items = getPageItems(currentPage, totalPages, siblingCount);

  return (
    <nav className={classes} aria-label="Pagination">
      <Button
        variant="secondary"
        size="sm"
        leadingIcon={<Icon name="arrow-left" size="sm" />}
        disabled={disabled || isFirstPage}
        onClick={goToPrevious}
      >
        Previous
      </Button>
      <ul className="ds-pagination__numbers">
        {items.map((item, index) =>
          item === 'dots' ? (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`dots-${index}`} className="ds-pagination__ellipsis" aria-hidden="true">
              ...
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={['ds-pagination__number', item === currentPage ? 'is-active' : ''].filter(Boolean).join(' ')}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Page ${item}`}
                disabled={disabled}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ul>
      <Button
        variant="secondary"
        size="sm"
        trailingIcon={<Icon name="arrow-right" size="sm" />}
        disabled={disabled || isLastPage}
        onClick={goToNext}
      >
        Next
      </Button>
    </nav>
  );
};
