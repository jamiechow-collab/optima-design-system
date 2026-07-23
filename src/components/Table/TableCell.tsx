import React from 'react';
import { Icon } from '../Icon/Icon';
import './TableCell.css';

export type TableCellSize = 'sm' | 'md';
export type TableCellAlign = 'left' | 'right';

/** Fixed-width blank spacer, or a clickable expand/collapse chevron —
    both occupy the same 24px + gap footprint so nested rows line up
    whether or not they have their own children. */
export interface TableCellExpandToggle {
  expanded: boolean;
  onToggle: () => void;
  label?: string;
}

/** Renders a drag handle (grip icon) leading every row's first cell, at any
    depth — unlike `expandToggle`, it isn't conditional on the row's own
    state, so it never needs a blank-spacer counterpart to keep alignment. */
export interface TableCellDragHandle {
  onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => void;
  label?: string;
}

export interface TableCellProps {
  /** sm = 40px row height (default) · md = 48px */
  size?: TableCellSize;
  /** Text alignment — left (default), or right for numeric columns */
  align?: TableCellAlign;
  /** Nesting depth for hierarchical rows (0 = no indent, default) — each
      level reserves a 24px slot, matching the expand chevron's own
      footprint (16px icon + 8px gap). The rendered spacer is 8px (one gap)
      narrower than the slot count since the cell's own flex `gap` already
      supplies the trailing 8px before the next element — confirmed against
      the Figma tier-indent specs: tier 1 = 16px, tier 2 = 40px, tier 3 = 64px */
  indentLevel?: number;
  /** Renders an inline expand/collapse chevron leading the cell's content,
      for any row (at any depth, including top-level) that itself has
      children — there's no dedicated actions column for it. */
  expandToggle?: TableCellExpandToggle;
  /** Renders the row-reorder grip icon, leading everything else in the
      cell (including the indent spacer) so it sits at a fixed position
      regardless of nesting depth. */
  dragHandle?: TableCellDragHandle;
  /** Icon rendered before the cell content, e.g. a channel icon or flag */
  icon?: React.ReactNode;
  /** Highlights the cell — applied to every cell in a selected row */
  selected?: boolean;
  /** Lets cell content (e.g. an inline editable dropdown's popover) render
      outside the cell's own bounds instead of being clipped. Plain text
      content doesn't need this — only opt in for a custom slot that opens
      its own overlay. */
  overflowVisible?: boolean;
  /** Cell content — plain text, or a custom slot (chart, badge, progress bar, star review) */
  children?: React.ReactNode;
  className?: string;
}

const INDENT_STEP = 24;
// .ds-table-cell's own flex `gap` (--spacing-sm) already supplies the 8px
// between the indent spacer and the next element, so the spacer itself is
// rendered 8px narrower than the full slot count.
const INDENT_GAP = 8;

export const TableCell = ({
  size = 'sm',
  align = 'left',
  indentLevel = 0,
  expandToggle,
  dragHandle,
  icon,
  selected = false,
  overflowVisible = false,
  children,
  className,
}: TableCellProps) => {
  const classes = [
    'ds-table-cell',
    `ds-table-cell--${size}`,
    `ds-table-cell--${align}`,
    selected ? 'is-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const contentClasses = [
    'ds-table-cell__content',
    overflowVisible ? 'ds-table-cell__content--overflow-visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="gridcell">
      {dragHandle && (
        <button
          type="button"
          className="ds-table-cell__drag-handle"
          aria-label={dragHandle.label ?? 'Reorder row'}
          onPointerDown={dragHandle.onPointerDown}
        >
          <Icon name="dragger" size="sm" />
        </button>
      )}
      {indentLevel > 0 && (
        <span
          className="ds-table-cell__indent"
          style={{ width: indentLevel * INDENT_STEP - INDENT_GAP }}
          aria-hidden="true"
        />
      )}
      {expandToggle && (
        <button
          type="button"
          className="ds-table-cell__expand-toggle"
          aria-label={expandToggle.label ?? (expandToggle.expanded ? 'Collapse row' : 'Expand row')}
          aria-expanded={expandToggle.expanded}
          onClick={expandToggle.onToggle}
        >
          <Icon name={expandToggle.expanded ? 'chevron-down' : 'chevron-right'} size="sm" />
        </button>
      )}
      {icon && <span className="ds-table-cell__icon">{icon}</span>}
      <span className={contentClasses}>{children}</span>
    </div>
  );
};
