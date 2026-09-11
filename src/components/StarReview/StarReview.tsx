import React from 'react';
import './StarReview.css';

const Star = () => (
  <svg viewBox="0 0 12 12" className="ds-starreview__star" aria-hidden="true">
    <path d="M0 4.58553H12L2.29312 12L6.00486 0L9.7166 12L0 4.58553Z" fill="currentColor" />
  </svg>
);

export type StarReviewRating = 1 | 2 | 3 | 4 | 5;

export interface StarReviewProps {
  /** Rating from 1 to 5 — renders that many stars */
  rating?: StarReviewRating;
  /** Accessible label — defaults to "{rating} out of 5 stars" */
  'aria-label'?: string;
  className?: string;
}

export const StarReview = ({ rating = 5, className, 'aria-label': ariaLabel }: StarReviewProps) => {
  const classes = ['ds-starreview', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="img" aria-label={ariaLabel ?? `${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, index) => (
        <Star key={index} />
      ))}
    </div>
  );
};

StarReview.displayName = 'StarReview';
