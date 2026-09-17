import React from 'react';
import './BarChart.css';

// Matches the Figma "Bar Chart/Preview" reference dataset exactly.
const DEFAULT_DATA = [
  14, 7, 19, 24, 5, 8, 19, 21, 21, 19, 15, 13, 11, 15, 5, 12, 13, 9, 16, 12, 8, 11, 8,
];

export interface BarChartProps {
  /** Bar heights in px */
  data?: number[];
  className?: string;
}

export const BarChart = ({ data = DEFAULT_DATA, className }: BarChartProps) => {
  const classes = ['ds-barchart', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-barchart__bars">
        {data.map((height, index) => (
          <div key={index} className="ds-barchart__bar" style={{ height }} />
        ))}
      </div>
      <div className="ds-barchart__axis" />
    </div>
  );
};

BarChart.displayName = 'BarChart';
