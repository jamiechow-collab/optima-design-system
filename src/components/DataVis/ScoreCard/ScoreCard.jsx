import React from 'react';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import './ScoreCard.css';

/**
 * Score card: one headline number against a label, with an optional mini-chart, showing how we're doing against a target.
 * label / value: the title and the figure. miniChart: any mini-chart element, shown next to the value.
 * labelPosition: 'top' (label above the value, chart beside it) | 'bottom' (chart, value, then label).
 * onAIClick / onInfoClick: hovering (or focusing) the card reveals an AI and an info button, xs inline icon-only buttons;
 *   each shows only when its callback is given. The label is always visible and truncates when the buttons appear.
 * width: px to fix the width. By default the card is at least 160 (the Figma size) and grows to hold its mini-chart, keeping the 16px side padding.
 */
export const ScoreCard = ({ label, value, miniChart, labelPosition = 'top', onAIClick, onInfoClick, width, className = '' }) => {
  const bottom = labelPosition === 'bottom';
  const buttons = (onAIClick ? 1 : 0) + (onInfoClick ? 1 : 0);
  const actionsWidth = buttons ? buttons * 20 + (buttons - 1) * 4 + 8 : 0; // 20px buttons, 4px apart, 8px from the label
  const actions = (onAIClick || onInfoClick) && (
    <span className="ds-score-card__actions">
      {onAIClick && <Button variant="inline" size="xs" iconOnly aria-label="Ask AI about this score" onClick={onAIClick}><Icon name="sparkle" size="sm" /></Button>}
      {onInfoClick && <Button variant="inline" size="xs" iconOnly aria-label="More information" onClick={onInfoClick}><Icon name="info-with-circle" size="sm" /></Button>}
    </span>
  );
  return (
    <div className={`ds-score-card ${bottom ? 'ds-score-card--bottom' : ''} ${className}`.trim()} style={{ ...(width ? { width } : null), '--ds-score-actions': `${actionsWidth}px` }}>
      {bottom ? (
        <>
          <div className="ds-score-card__head">
            <span className="ds-score-card__chart">{miniChart}</span>
            {actions}
          </div>
          <span className="ds-score-card__value">{value}</span>
          <span className="ds-score-card__label" title={label}>{label}</span>
        </>
      ) : (
        <>
          <div className="ds-score-card__head">
            <span className="ds-score-card__label" title={label}>{label}</span>
            {actions}
          </div>
          <div className="ds-score-card__row">
            <span className="ds-score-card__value">{value}</span>
            {miniChart && <span className="ds-score-card__chart">{miniChart}</span>}
          </div>
        </>
      )}
    </div>
  );
};

export default ScoreCard;
