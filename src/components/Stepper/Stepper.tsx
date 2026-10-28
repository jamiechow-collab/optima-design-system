import React from 'react';
import './Stepper.css';

export interface StepperProps {
  /** Number of steps */
  count: number;
  /** Zero-based index of the current step */
  current: number;
  className?: string;
}

/** Row of dots showing progress through a multi-step flow (Figma "Stepper", Shared UI Design patterns). */
export const Stepper = ({ count, current, className }: StepperProps) => (
  <div
    role="img"
    aria-label={`Step ${current + 1} of ${count}`}
    className={['ds-stepper', className].filter(Boolean).join(' ')}
  >
    {Array.from({ length: count }, (_, i) => (
      <span key={i} className={`ds-stepper__dot ${i === current ? 'is-selected' : ''}`.trim()} />
    ))}
  </div>
);

export default Stepper;
