import React from 'react';
import './LineChart.css';

const POSITIVE_PATH =
  'M1.00001 25.0002L11 16.0959L21 23.5162L31 20.548L41 14.6118L51 11.6437L61 15.3538L71 13.1277L81 16.4669L91 20.3625L101 1.00021';
const NEGATIVE_PATH =
  'M1.00022 5.1125L10.0676 7.2282L20.1712 14.7507L30.2749 10.9307L40.3785 12.8701L50.4821 10.9307L60.5857 12.8701L70.6893 1.41002L80.793 10.2842L90.8966 5.1125L101 17.41';

export interface LineChartProps {
  /** Text shown beside the sparkline */
  label?: string;
  /** Positive (green, default) or negative (red) trend */
  negative?: boolean;
  /** Hide the label, showing only the sparkline */
  text?: boolean;
  className?: string;
}

export const LineChart = ({ label = 'Label', negative = false, text = true, className }: LineChartProps) => {
  const classes = ['ds-linechart', negative ? 'ds-linechart--negative' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <svg
        className="ds-linechart__sparkline"
        viewBox={negative ? '0 0 102 18.41' : '0 0 102 26.0002'}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={negative ? NEGATIVE_PATH : POSITIVE_PATH}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {text && <span className="ds-linechart__label">{label}</span>}
    </div>
  );
};

LineChart.displayName = 'LineChart';
