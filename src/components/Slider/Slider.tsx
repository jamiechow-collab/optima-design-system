import React from 'react';
import './Slider.css';

const THUMB = 24;

/** Pixel-accurate offset matching where a native range input's thumb sits at
    `percent` — thumbs travel across (100% - thumb width), not the full track. */
const thumbOffsetExpr = (percent: number) => `(100% - ${THUMB}px) * ${percent / 100} + ${THUMB / 2}px`;

export interface SliderProps {
  /** Lower bound of the range (default 0) */
  min?: number;
  /** Upper bound of the range (default 100) */
  max?: number;
  /** Increment size (default 1) */
  step?: number;
  /** [low, high] — both handles' current values */
  value: [number, number];
  onChange: (value: [number, number]) => void;
  /** Shows the current value under each handle (default false) */
  showLabels?: boolean;
  /** How each handle's value is displayed — defaults to "n%" */
  formatLabel?: (value: number) => React.ReactNode;
  disabled?: boolean;
  className?: string;
  /** Accessible name for the lower-bound handle */
  minAriaLabel?: string;
  /** Accessible name for the upper-bound handle */
  maxAriaLabel?: string;
}

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  showLabels = false,
  formatLabel = (v) => `${Math.round(v)}%`,
  disabled = false,
  className,
  minAriaLabel = 'Minimum value',
  maxAriaLabel = 'Maximum value',
}: SliderProps) => {
  const [low, high] = value;
  const range = max - min;
  const lowPercent = range === 0 ? 0 : ((low - min) / range) * 100;
  const highPercent = range === 0 ? 0 : ((high - min) / range) * 100;

  const handleLowChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange([Math.min(Number(e.target.value), high), high]);
  };

  const handleHighChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange([low, Math.max(Number(e.target.value), low)]);
  };

  const classes = ['ds-slider', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-slider__track-area">
        <div className="ds-slider__track" />
        <div
          className="ds-slider__fill"
          style={{
            left: `calc(${thumbOffsetExpr(lowPercent)})`,
            right: `calc(100% - (${thumbOffsetExpr(highPercent)}))`,
          }}
        />
        <input
          type="range"
          className="ds-slider__input"
          min={min}
          max={max}
          step={step}
          value={low}
          disabled={disabled}
          onChange={handleLowChange}
          aria-label={minAriaLabel}
          style={{ zIndex: low >= high ? 2 : 1 }}
        />
        <input
          type="range"
          className="ds-slider__input"
          min={min}
          max={max}
          step={step}
          value={high}
          disabled={disabled}
          onChange={handleHighChange}
          aria-label={maxAriaLabel}
          style={{ zIndex: 2 }}
        />
      </div>
      {showLabels && (
        <div className="ds-slider__labels">
          <span
            className="ds-slider__label"
            style={{ left: `calc(${thumbOffsetExpr(lowPercent)})` }}
          >
            {formatLabel(low)}
          </span>
          <span
            className="ds-slider__label"
            style={{ left: `calc(${thumbOffsetExpr(highPercent)})` }}
          >
            {formatLabel(high)}
          </span>
        </div>
      )}
    </div>
  );
};
