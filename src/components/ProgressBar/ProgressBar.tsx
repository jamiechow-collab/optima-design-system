import React from 'react';
import { Icon } from '../Icon/Icon';
import './ProgressBar.css';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text shown above the bar */
  label?: React.ReactNode;
  /** Shows an info icon next to the label — pass `tooltip` for its accessible name */
  showTooltip?: boolean;
  /** Accessible name for the tooltip icon */
  tooltip?: string;
  /** Completion percentage — clamped to 0–100 */
  value: number;
  /** Shows the "n%" label before the bar */
  showLeadingLabel?: boolean;
  /** Shows the "n%" label after the bar */
  showTrailingLabel?: boolean;
  /** Accessible name for the progress bar itself — falls back to `label` when it's a string */
  'aria-label'?: string;
}

export const ProgressBar = ({
  label,
  showTooltip = false,
  tooltip,
  value,
  showLeadingLabel = false,
  showTrailingLabel = false,
  className,
  'aria-label': ariaLabel,
  ...rest
}: ProgressBarProps) => {
  const clamped = Math.min(100, Math.max(0, value));
  const roundedValue = Math.round(clamped);

  const classes = ['ds-progressbar', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {label && (
        <div className="ds-progressbar__label-row">
          <span className="ds-progressbar__label">{label}</span>
          {showTooltip && (
            <span className="ds-progressbar__tooltip">
              <Icon name="info-with-circle" size="sm" title={tooltip} />
            </span>
          )}
        </div>
      )}
      <div className="ds-progressbar__row">
        {showLeadingLabel && <span className="ds-progressbar__value">{roundedValue}%</span>}
        <div
          className="ds-progressbar__track"
          role="progressbar"
          aria-valuenow={roundedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
        >
          <div className="ds-progressbar__fill" style={{ width: `${clamped}%` }} />
        </div>
        {showTrailingLabel && <span className="ds-progressbar__value">{roundedValue}%</span>}
      </div>
    </div>
  );
};
