import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TableColumnHeader, SortDirection } from './TableColumnHeader';
import { TableFloatingFilter } from './TableFloatingFilter';
import { TableCell } from './TableCell';
import { TableActions } from './TableActions';
import { TablePagination, TablePaginationProps } from './TablePagination';
import { TableDragIndicator } from './TableDragIndicator';
import { DropdownOption } from '../Dropdown/Dropdown';
import './Table.css';

export type TableSize = 'sm' | 'md';

export interface TableColumn<Row> {
  key: string;
  label: string;
  align?: 'left' | 'right';
  /** Icon rendered before the header label, e.g. a channel icon or flag */
  leadingIcon?: React.ReactNode;
  sortable?: boolean;
  /** Shows the header "more options" kebab control */
  showMenuControl?: boolean;
  onMenuClick?: () => void;
  /** Defaults to true — set false to lock a column's width */
  resizable?: boolean;
  /** Initial pixel width (default 160) */
  width?: number;
  minWidth?: number;
  /** Renders a floating filter dropdown beneath this column's header */
  filterOptions?: DropdownOption[];
  filterPlaceholder?: string;
  /** Nesting depth applied to every cell in this column, or a per-row function.
      For the first column, this is added to the row's own expansion depth. */
  indentLevel?: number | ((row: Row) => number);
  /** Set when `render` returns a custom slot that opens its own overlay
      (e.g. an inline editable dropdown) so it isn't clipped by the cell */
  overflowVisible?: boolean;
  /** Cell content — defaults to String(row[key]) */
  render?: (row: Row) => React.ReactNode;
}

export interface TableProps<Row> {
  columns: TableColumn<Row>[];
  /** Already sorted/filtered/paginated by the caller — this component is
      presentational and does not process data itself. */
  rows: Row[];
  rowKey: (row: Row) => string;
  /** sm = 40px rows (default) · md = 48px */
  size?: TableSize;
  /** Alternates row background colour */
  zebra?: boolean;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSortChange?: (columnKey: string) => void;
  filterValues?: Record<string, string>;
  onFilterChange?: (columnKey: string, value: string) => void;
  pagination?: Omit<TablePaginationProps, 'className'>;
  /** Shows a checkbox column; the header checkbox is 3-state
      (all / none / some selected) */
  selectable?: boolean;
  selectedRowKeys?: string[];
  onSelectedRowKeysChange?: (keys: string[]) => void;
  /** Shows an expand/collapse chevron leading the label of any row with
      children, inline in the first column — there's no dedicated actions
      column for it (unlike `selectable`'s checkbox column) */
  expandable?: boolean;
  /** Returns a row's nested rows, or undefined/empty if it has none */
  getChildRows?: (row: Row) => Row[] | undefined;
  expandedRowKeys?: string[];
  onExpandedRowKeysChange?: (keys: string[]) => void;
  /** Pins the leading columns (the selection checkbox column, if any, and
      the first data column) so they stay in view while the rest of the
      table scrolls horizontally underneath. A 2px indicator strip appears
      on the trailing edge of the pinned region once scrolled past it. */
  stickyFirstColumn?: boolean;
  /** Lets a user drag a column header to reorder columns — hold the header
      to start dragging (this is what distinguishes it from the click that
      triggers `sortable`), then drag over another header to swap places.
      Table owns the resulting column order internally, the same way it owns
      resize widths. */
  reorderableColumns?: boolean;
  /** Lets a user drag a row's grip handle to reorder it among its siblings
      (top-level rows, or the children of a common parent when `expandable`
      is also on — dragging never moves a row into a different parent's
      group). Unlike `reorderableColumns`, Table doesn't own the result: it
      only tracks the live drag preview, and calls `onRowOrderChange` once on
      drop so the caller can update its own `rows` — reordering actual data
      records should flow back to the caller the same way sort/select/expand
      already do. */
  reorderableRows?: boolean;
  /** Fired on drop with the dragged row's new sibling order (as row keys)
      and the parentKey of that sibling group (null for top-level). */
  onRowOrderChange?: (orderedKeys: string[], parentKey: string | null) => void;
  className?: string;
}

/** How long a header must be held before a drag starts — long enough that a
    normal click (e.g. to sort) never gets mistaken for the start of a drag. */
const LONG_PRESS_MS = 400;

interface FlatRow<Row> {
  row: Row;
  key: string;
  depth: number;
  hasChildren: boolean;
  /** The key of this row's immediate parent, or null at the top level —
      reorder targets are always scoped to rows sharing the same parentKey. */
  parentKey: string | null;
}

/** A row-reorder drag in progress: `orderedKeys` is the live preview order
    for the sibling group identified by `parentKey` (null = top level). */
interface RowDragPreview {
  parentKey: string | null;
  orderedKeys: string[];
  draggedKey: string;
}

/** Reorders one sibling group to match a live drag preview — a no-op unless
    `preview.parentKey` matches the group currently being flattened. */
const applyRowDragPreview = <Row,>(
  rows: Row[],
  rowKey: (row: Row) => string,
  parentKey: string | null,
  preview: RowDragPreview | null
): Row[] => {
  if (!preview || preview.parentKey !== parentKey) return rows;
  const byKey = new Map(rows.map((r) => [rowKey(r), r]));
  const ordered = preview.orderedKeys.map((k) => byKey.get(k)).filter((r): r is Row => !!r);
  const seen = new Set(ordered.map((r) => rowKey(r)));
  const extra = rows.filter((r) => !seen.has(rowKey(r)));
  return [...ordered, ...extra];
};

const flattenRows = <Row,>(
  rows: Row[],
  rowKey: (row: Row) => string,
  getChildRows: ((row: Row) => Row[] | undefined) | undefined,
  expandedRowKeys: string[],
  depth = 0,
  parentKey: string | null = null,
  dragPreview: RowDragPreview | null = null
): FlatRow<Row>[] => {
  const effectiveRows = applyRowDragPreview(rows, rowKey, parentKey, dragPreview);
  const result: FlatRow<Row>[] = [];
  for (const row of effectiveRows) {
    const key = rowKey(row);
    const children = getChildRows?.(row);
    const hasChildren = !!children && children.length > 0;
    result.push({ row, key, depth, hasChildren, parentKey });
    if (hasChildren && expandedRowKeys.includes(key)) {
      result.push(
        ...flattenRows(children!, rowKey, getChildRows, expandedRowKeys, depth + 1, key, dragPreview)
      );
    }
  }
  return result;
};

/** Every row's key, plus every descendant's key, anywhere in the tree —
    regardless of whether that row is currently expanded/visible. */
const collectAllKeys = <Row,>(
  rows: Row[],
  rowKey: (row: Row) => string,
  getChildRows: ((row: Row) => Row[] | undefined) | undefined
): string[] => {
  const result: string[] = [];
  for (const row of rows) {
    result.push(rowKey(row));
    const children = getChildRows?.(row);
    if (children?.length) result.push(...collectAllKeys(children, rowKey, getChildRows));
  }
  return result;
};

/** A row's own descendant keys only (not the row's own key). */
const collectDescendantKeys = <Row,>(
  row: Row,
  rowKey: (row: Row) => string,
  getChildRows: ((row: Row) => Row[] | undefined) | undefined
): string[] => {
  const children = getChildRows?.(row);
  if (!children?.length) return [];
  return children.flatMap((child) => [rowKey(child), ...collectDescendantKeys(child, rowKey, getChildRows)]);
};

/** Batch-select bookkeeping: after any direct toggle, walk the whole tree
    bottom-up so a parent's own key is present iff every one of its direct
    children is present — this is what makes "select parent -> selects all
    children" and "some children selected -> parent shows indeterminate"
    stay correct no matter which row was actually clicked. */
const normalizeSelection = <Row,>(
  rows: Row[],
  rowKey: (row: Row) => string,
  getChildRows: ((row: Row) => Row[] | undefined) | undefined,
  selected: Set<string>
): Set<string> => {
  const next = new Set(selected);
  const visit = (row: Row) => {
    const children = getChildRows?.(row);
    if (!children?.length) return;
    children.forEach(visit);
    const allChildrenSelected = children.every((child) => next.has(rowKey(child)));
    if (allChildrenSelected) next.add(rowKey(row));
    else next.delete(rowKey(row));
  };
  rows.forEach(visit);
  return next;
};

const DEFAULT_WIDTH = 160;

export function Table<Row>({
  columns,
  rows,
  rowKey,
  size = 'sm',
  zebra = false,
  sortColumn,
  sortDirection = null,
  onSortChange,
  filterValues = {},
  onFilterChange,
  pagination,
  selectable = false,
  selectedRowKeys = [],
  onSelectedRowKeysChange,
  expandable = false,
  getChildRows,
  expandedRowKeys = [],
  onExpandedRowKeysChange,
  stickyFirstColumn = false,
  reorderableColumns = false,
  reorderableRows = false,
  onRowOrderChange,
  className,
}: TableProps<Row>) {
  const [widths, setWidths] = useState<Record<string, number>>(() =>
    Object.fromEntries(columns.map((c) => [c.key, c.width ?? DEFAULT_WIDTH]))
  );
  const resizeState = useRef<{ key: string; startX: number; startWidth: number } | null>(null);
  const [isScrolledHorizontally, setIsScrolledHorizontally] = useState(false);

  // Column reorder — Table tracks the current order as internal state (like
  // resize widths) and re-derives the rendered column list from it on every
  // change, keeping any column not yet seen (added after the initial render)
  // appended in its original position.
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map((c) => c.key));
  const orderedColumns = useMemo(() => {
    const byKey = new Map(columns.map((c) => [c.key, c]));
    const ordered = columnOrder.map((key) => byKey.get(key)).filter((c): c is TableColumn<Row> => !!c);
    const seen = new Set(ordered.map((c) => c.key));
    const extra = columns.filter((c) => !seen.has(c.key));
    return [...ordered, ...extra];
  }, [columns, columnOrder]);
  const hasFilters = orderedColumns.some((c) => c.filterOptions);

  const headerElsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const longPressTimerRef = useRef<number | null>(null);
  // Set right after a drag ends, and consumed (then cleared) by the very next
  // sort click — some browsers still fire a click on pointerup even after a
  // drag moved the pointer, and that shouldn't also toggle sort.
  const justDraggedRef = useRef(false);
  const [dragChip, setDragChip] = useState<{ label: string; x: number; y: number } | null>(null);

  const setHeaderRef = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      if (el) headerElsRef.current.set(key, el);
      else headerElsRef.current.delete(key);
    },
    []
  );

  const findHeaderKeyAt = useCallback((clientX: number, clientY: number) => {
    for (const [key, el] of headerElsRef.current) {
      const rect = el.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        return key;
      }
    }
    return null;
  }, []);

  const handleHeaderPointerDown = useCallback(
    (key: string, label: string) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (!reorderableColumns || e.button !== 0) return;
      const pointerId = e.pointerId;
      let started = false;
      // A real drag gesture moves the pointer right away, well before the
      // long-press timer fires — track the latest position throughout the
      // hold instead of cancelling on movement, so the drag still starts
      // once the timer elapses, wherever the pointer has drifted to.
      let lastX = e.clientX;
      let lastY = e.clientY;

      const cleanup = () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        if (longPressTimerRef.current !== null) {
          window.clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
      };

      const handleMove = (moveEvent: PointerEvent) => {
        if (moveEvent.pointerId !== pointerId) return;
        lastX = moveEvent.clientX;
        lastY = moveEvent.clientY;
        if (!started) return;
        setDragChip((prev) => (prev ? { ...prev, x: lastX, y: lastY } : prev));
        const hoverKey = findHeaderKeyAt(lastX, lastY);
        if (hoverKey && hoverKey !== key) {
          setColumnOrder((prev) => {
            const from = prev.indexOf(key);
            const to = prev.indexOf(hoverKey);
            if (from === -1 || to === -1 || from === to) return prev;
            const next = [...prev];
            next.splice(from, 1);
            next.splice(to, 0, key);
            return next;
          });
        }
      };

      const handleUp = (upEvent: PointerEvent) => {
        if (upEvent.pointerId !== pointerId) return;
        if (started) justDraggedRef.current = true;
        cleanup();
        setDragChip(null);
      };

      longPressTimerRef.current = window.setTimeout(() => {
        started = true;
        setDragChip({ label, x: lastX, y: lastY });
      }, LONG_PRESS_MS);

      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [reorderableColumns, findHeaderKeyAt]
  );

  // Row reorder — unlike column order, Table doesn't own the result (rows
  // are the caller's data); this only tracks the live drag preview, reset
  // once the drag ends and the caller's own `rows` prop becomes the source
  // of truth again via onRowOrderChange.
  const [rowDragPreview, setRowDragPreview] = useState<RowDragPreview | null>(null);
  const rowElsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const setRowRef = useCallback(
    (key: string) => (el: HTMLDivElement | null) => {
      if (el) rowElsRef.current.set(key, el);
      else rowElsRef.current.delete(key);
    },
    []
  );

  const findRowKeyAt = useCallback((clientY: number, parentKey: string | null) => {
    for (const [key, el] of rowElsRef.current) {
      if ((el.dataset.rowParentKey ?? '') !== (parentKey ?? '')) continue;
      const rect = el.getBoundingClientRect();
      if (clientY >= rect.top && clientY <= rect.bottom) return key;
    }
    return null;
  }, []);

  // The grip icon is a dedicated handle (unlike the column header, which
  // doubles as the sort click target) — a real drag can start immediately
  // on pointerdown, no long-press disambiguation needed, same as resize.
  const handleRowDragHandlePointerDown = useCallback(
    (key: string, parentKey: string | null, siblingKeys: string[], label: string) =>
      (e: React.PointerEvent<HTMLButtonElement>) => {
        if (!reorderableRows || e.button !== 0) return;
        e.preventDefault();
        const pointerId = e.pointerId;
        let order = siblingKeys;

        setDragChip({ label, x: e.clientX, y: e.clientY });
        setRowDragPreview({ parentKey, orderedKeys: order, draggedKey: key });

        const handleMove = (moveEvent: PointerEvent) => {
          if (moveEvent.pointerId !== pointerId) return;
          setDragChip((prev) => (prev ? { ...prev, x: moveEvent.clientX, y: moveEvent.clientY } : prev));
          const hoverKey = findRowKeyAt(moveEvent.clientY, parentKey);
          if (hoverKey && hoverKey !== key) {
            const from = order.indexOf(key);
            const to = order.indexOf(hoverKey);
            if (from !== -1 && to !== -1 && from !== to) {
              const next = [...order];
              next.splice(from, 1);
              next.splice(to, 0, key);
              order = next;
              setRowDragPreview({ parentKey, orderedKeys: order, draggedKey: key });
            }
          }
        };

        const handleUp = (upEvent: PointerEvent) => {
          if (upEvent.pointerId !== pointerId) return;
          window.removeEventListener('pointermove', handleMove);
          window.removeEventListener('pointerup', handleUp);
          setRowDragPreview(null);
          setDragChip(null);
          onRowOrderChange?.(order, parentKey);
        };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
      },
    [reorderableRows, findRowKeyAt, onRowOrderChange]
  );

  const flatRows = useMemo(
    () =>
      expandable
        ? flattenRows(rows, rowKey, getChildRows, expandedRowKeys, 0, null, rowDragPreview)
        : applyRowDragPreview(rows, rowKey, null, rowDragPreview).map((row) => ({
            row,
            key: rowKey(row),
            depth: 0,
            hasChildren: false,
            parentKey: null,
          })),
    [rows, rowKey, expandable, getChildRows, expandedRowKeys, rowDragPreview]
  );

  // Precomputed once per flatRows change so each row's drag-handle handler
  // doesn't have to re-scan the whole flat list for its own siblings.
  const siblingKeysByParent = useMemo(() => {
    const map = new Map<string | null, string[]>();
    for (const fr of flatRows) {
      const arr = map.get(fr.parentKey);
      if (arr) arr.push(fr.key);
      else map.set(fr.parentKey, [fr.key]);
    }
    return map;
  }, [flatRows]);

  // The full dataset's keys, not just the currently-flattened/visible ones —
  // "select all" and the header's checked/indeterminate state shouldn't
  // depend on which rows happen to be expanded right now.
  const allKeys = useMemo(
    () => (expandable ? collectAllKeys(rows, rowKey, getChildRows) : rows.map(rowKey)),
    [rows, rowKey, expandable, getChildRows]
  );
  const selectedSet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys]);
  const selectedCount = allKeys.filter((k) => selectedSet.has(k)).length;
  const allSelected = allKeys.length > 0 && selectedCount === allKeys.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const handleHeaderCheckedChange = (checked: boolean) => {
    onSelectedRowKeysChange?.(checked ? allKeys : []);
  };

  const handleRowCheckedChange = (key: string, checked: boolean, row: Row) => {
    // Batch-select: toggling a row also toggles every one of its
    // descendants (if any) together with it.
    const subtreeKeys = expandable ? [key, ...collectDescendantKeys(row, rowKey, getChildRows)] : [key];
    const nextSet = new Set(selectedRowKeys);
    subtreeKeys.forEach((k) => (checked ? nextSet.add(k) : nextSet.delete(k)));
    const normalized = expandable ? normalizeSelection(rows, rowKey, getChildRows, nextSet) : nextSet;
    onSelectedRowKeysChange?.(Array.from(normalized));
  };

  const handleExpandToggle = (key: string) => {
    const next = expandedRowKeys.includes(key)
      ? expandedRowKeys.filter((k) => k !== key)
      : [...expandedRowKeys, key];
    onExpandedRowKeysChange?.(next);
  };

  const handleResizeStart = useCallback(
    (key: string, minWidth: number) => (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      resizeState.current = { key, startX: e.clientX, startWidth: widths[key] ?? DEFAULT_WIDTH };

      const handleMove = (moveEvent: PointerEvent) => {
        const current = resizeState.current;
        if (!current) return;
        const nextWidth = Math.max(minWidth, current.startWidth + (moveEvent.clientX - current.startX));
        setWidths((prev) => ({ ...prev, [current.key]: nextWidth }));
      };
      const handleUp = () => {
        resizeState.current = null;
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
      };
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
    },
    [widths]
  );

  const isStickyFirstColumn = stickyFirstColumn && columns.length > 0;
  const stickyLeft = {
    checkbox: 0,
    firstColumn: selectable ? 48 : 0,
  };

  const gridTemplateColumns = [
    selectable ? '48px' : null,
    ...orderedColumns.map((c) => `${widths[c.key] ?? DEFAULT_WIDTH}px`),
  ]
    .filter(Boolean)
    .join(' ');
  const classes = ['ds-table', `ds-table--${size}`, className].filter(Boolean).join(' ');

  // Wraps a leading element (the selection checkbox) in a sticky positioner
  // when stickyFirstColumn is on; otherwise renders it unchanged.
  const renderSticky = (key: string | undefined, node: React.ReactNode, left: number) =>
    isStickyFirstColumn ? (
      <div key={key} className="ds-table__sticky-cell" style={{ left }}>
        {node}
      </div>
    ) : (
      <React.Fragment key={key}>{node}</React.Fragment>
    );

  // The first data column's sticky cell additionally carries the indicator
  // strip overlaid on its own trailing edge (no dedicated grid track needed —
  // it's an absolutely-positioned overlay, so there's no gap in the layout
  // before it becomes visible).
  const renderFirstColumnWithIndicator = (key: string, node: React.ReactNode) =>
    isStickyFirstColumn ? (
      <div key={key} className="ds-table__sticky-cell" style={{ left: stickyLeft.firstColumn }}>
        {node}
        <span
          className={['ds-table__sticky-indicator', isScrolledHorizontally ? 'is-visible' : '']
            .filter(Boolean)
            .join(' ')}
          aria-hidden="true"
        />
      </div>
    ) : (
      <React.Fragment key={key}>{node}</React.Fragment>
    );

  return (
    <div className={classes}>
      <div className="ds-table__container">
        <div
          className="ds-table__scroll"
          onScroll={
            isStickyFirstColumn
              ? (e) => setIsScrolledHorizontally(e.currentTarget.scrollLeft > 0)
              : undefined
          }
        >
          <div className="ds-table__grid" role="grid" style={{ gridTemplateColumns }}>
            <div className="ds-table__row ds-table__row--header" role="row">
              {selectable &&
                renderSticky(
                  undefined,
                  <TableActions
                    type="header"
                    size={size}
                    showCheckbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={handleHeaderCheckedChange}
                    checkboxLabel="Select all rows"
                  />,
                  stickyLeft.checkbox
                )}
              {orderedColumns.map((column, index) => {
                // The last column has no column after it, so its trailing edge isn't a
                // boundary between two columns — the handle on the previous column
                // already covers resizing there.
                const isLastColumn = index === orderedColumns.length - 1;
                const header = (
                  <TableColumnHeader
                    label={column.label}
                    size={size}
                    align={column.align}
                    leadingIcon={column.leadingIcon}
                    sortable={column.sortable}
                    sortDirection={sortColumn === column.key ? sortDirection : null}
                    onSortChange={() => {
                      if (justDraggedRef.current) {
                        justDraggedRef.current = false;
                        return;
                      }
                      onSortChange?.(column.key);
                    }}
                    showMenuControl={column.showMenuControl}
                    onMenuClick={column.onMenuClick}
                    resizable={isLastColumn ? false : (column.resizable ?? true)}
                    onResizeStart={handleResizeStart(column.key, column.minWidth ?? 80)}
                    onHeaderPointerDown={
                      reorderableColumns ? handleHeaderPointerDown(column.key, column.label) : undefined
                    }
                    headerRef={reorderableColumns ? setHeaderRef(column.key) : undefined}
                  />
                );
                return index === 0 ? (
                  renderFirstColumnWithIndicator(column.key, header)
                ) : (
                  <React.Fragment key={column.key}>{header}</React.Fragment>
                );
              })}
            </div>
            {hasFilters && (
              <div className="ds-table__row ds-table__row--filter" role="row">
                {selectable && renderSticky(undefined, <div className="ds-table__filter-gap" />, stickyLeft.checkbox)}
                {orderedColumns.map((column, index) => {
                  const filterCell = column.filterOptions ? (
                    <TableFloatingFilter
                      size={size}
                      options={column.filterOptions}
                      placeholder={column.filterPlaceholder}
                      value={filterValues[column.key]}
                      onChange={(value) => onFilterChange?.(column.key, value)}
                    />
                  ) : (
                    <div className="ds-table__filter-gap" />
                  );
                  return index === 0 ? (
                    renderFirstColumnWithIndicator(column.key, filterCell)
                  ) : (
                    <React.Fragment key={column.key}>{filterCell}</React.Fragment>
                  );
                })}
              </div>
            )}
            {flatRows.map(({ row, key, depth, hasChildren, parentKey }, index) => {
              const isSelected = selectedSet.has(key);
              const isExpanded = expandedRowKeys.includes(key);
              // A parent row is indeterminate when some but not all of its
              // descendants are selected (and it isn't itself fully selected).
              const isIndeterminate =
                expandable &&
                hasChildren &&
                !isSelected &&
                collectDescendantKeys(row, rowKey, getChildRows).some((k) => selectedSet.has(k));
              const isDraggingThisRow = reorderableRows && rowDragPreview?.draggedKey === key;
              const rowLabel = String((row as Record<string, unknown>)[orderedColumns[0]?.key] ?? '');
              return (
                <div
                  key={key}
                  ref={reorderableRows ? setRowRef(key) : undefined}
                  data-row-parent-key={reorderableRows ? (parentKey ?? '') : undefined}
                  className={['ds-table__row', zebra && index % 2 === 1 ? 'is-odd' : '']
                    .filter(Boolean)
                    .join(' ')}
                  role="row"
                  aria-level={expandable ? depth + 1 : undefined}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                >
                  {selectable &&
                    renderSticky(
                      undefined,
                      <TableActions
                        type="cell"
                        size={size}
                        showCheckbox
                        checked={isSelected}
                        indeterminate={isIndeterminate}
                        onCheckedChange={(checked) => handleRowCheckedChange(key, checked, row)}
                        checkboxLabel="Select row"
                        selected={isSelected}
                      />,
                      stickyLeft.checkbox
                    )}
                  {orderedColumns.map((column, colIndex) => {
                    const baseIndent =
                      typeof column.indentLevel === 'function' ? column.indentLevel(row) : column.indentLevel;
                    const isFirstColumn = colIndex === 0;
                    // The expand chevron always leads the row's label inline in the
                    // first column, at every depth — there's no dedicated actions
                    // column for it, per the Figma spec. One blank spacer slot per
                    // ancestor depth precedes it (or the label, for a childless row).
                    const ownSlotIsChevron = isFirstColumn && expandable && hasChildren;
                    const ancestorDepth = isFirstColumn && expandable ? depth : 0;
                    const cell = (
                      <TableCell
                        size={size}
                        align={column.align}
                        indentLevel={(baseIndent ?? 0) + ancestorDepth}
                        expandToggle={
                          ownSlotIsChevron
                            ? { expanded: isExpanded, onToggle: () => handleExpandToggle(key) }
                            : undefined
                        }
                        dragHandle={
                          isFirstColumn && reorderableRows
                            ? {
                                onPointerDown: handleRowDragHandlePointerDown(
                                  key,
                                  parentKey,
                                  siblingKeysByParent.get(parentKey) ?? [key],
                                  rowLabel
                                ),
                                label: `Reorder ${rowLabel}`,
                              }
                            : undefined
                        }
                        selected={isSelected}
                        overflowVisible={column.overflowVisible}
                        className={
                          isDraggingThisRow
                            ? isFirstColumn
                              ? 'ds-table-cell--drag-focus'
                              : 'ds-table-cell--drag-disabled'
                            : undefined
                        }
                      >
                        {column.render
                          ? column.render(row)
                          : String((row as Record<string, unknown>)[column.key] ?? '')}
                      </TableCell>
                    );
                    return isFirstColumn ? (
                      renderFirstColumnWithIndicator(column.key, cell)
                    ) : (
                      <React.Fragment key={column.key}>{cell}</React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {pagination && <TablePagination className="ds-table__pagination" {...pagination} />}
      </div>
      {dragChip &&
        typeof document !== 'undefined' &&
        createPortal(<TableDragIndicator label={dragChip.label} x={dragChip.x} y={dragChip.y} />, document.body)}
    </div>
  );
}
