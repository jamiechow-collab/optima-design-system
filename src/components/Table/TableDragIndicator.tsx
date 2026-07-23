import React from 'react';
import './TableDragIndicator.css';

export interface TableDragIndicatorProps {
  /** The dragged column's label */
  label: string;
  /** Viewport coordinates to follow — same space as PointerEvent.clientX/Y */
  x: number;
  y: number;
}

/** Floating chip that tracks the cursor while a column header is being
    dragged to reorder — rendered through a portal so it's never clipped by
    the table's own scroll container (Figma "Behaviour - Re-order column"). */
export const TableDragIndicator = ({ label, x, y }: TableDragIndicatorProps) => (
  <div className="ds-table-drag-indicator" style={{ left: x, top: y }}>
    <span className="ds-table-drag-indicator__label">{label}</span>
  </div>
);
