import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './TableActions.css';

export type TableActionsSize = 'sm' | 'md';
export type TableActionsType = 'header' | 'cell';

export interface TableActionsProps {
  type: TableActionsType;
  /** sm = 40px row height (default) · md = 48px — ignored for type="header",
      which always matches TableColumnHeader's own sm/md height */
  size?: TableActionsSize;
  showCheckbox?: boolean;
  checked?: boolean;
  /** Neither fully checked nor unchecked — for the header this means "some
      but not all rows selected"; for a parent row it means "some but not
      all of its children selected" */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxLabel?: string;
  /** Cell only — highlights the control to match the row's selected state */
  selected?: boolean;
  className?: string;
}

export const TableActions = ({
  type,
  size = 'sm',
  showCheckbox = true,
  checked = false,
  indeterminate = false,
  onCheckedChange,
  checkboxLabel = 'Select row',
  selected = false,
  className,
}: TableActionsProps) => {
  const classes = [
    'ds-table-actions',
    `ds-table-actions--${size}`,
    `ds-table-actions--${type}`,
    selected ? 'is-selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role={type === 'header' ? 'columnheader' : 'gridcell'}>
      {showCheckbox && (
        <Checkbox
          size={size === 'md' ? 'md' : 'sm'}
          checked={checked}
          indeterminate={indeterminate}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          aria-label={checkboxLabel}
        />
      )}
    </div>
  );
};
