// Shared colours for the mini-charts. Fills use the Tide datavis colour; empty tracks sit back in Charcoal.
import { datavisSequential } from '../../../tokens/datavis-colors';

export const TIDE = 'var(--color-datavis-tide-default, #015989)';
export const TRACK = `var(--color-datavis-charcoal-20, ${datavisSequential.charcoal[20]})`; // empty bar / ring / star
export const AXIS = 'var(--color-divider-secondary, #d1d1d1)';
export const STATUS = {
  positive: 'var(--color-alert-positive, #57B645)',
  warning: 'var(--color-alert-warning, #DD7F03)',
};
export const tide = (step) => `var(--color-datavis-tide-${step}, ${datavisSequential.tide[step]})`;

// Scales a value to 0..1 within [min, max].
export const unit = (v, min = 0, max = 1) => (max === min ? 0 : Math.min(Math.max((v - min) / (max - min), 0), 1));
