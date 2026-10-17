import React from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { IconMenuButton } from '../MenuButton/MenuButton';
import { Menu, MenuItem } from '../Menu/Menu';
import { chartText } from './chartTheme';

const HeaderButtons = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button variant="ghost" iconOnly aria-label="Insights"><Icon name="sparkle" size="sm" /></Button>
    <Button variant="ghost" iconOnly aria-label="Download image"><Icon name="camera" size="sm" /></Button>
    <Button variant="ghost" iconOnly aria-label="Expand"><Icon name="expand" size="sm" /></Button>
    <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label="More options" position="bottom-right">
      <Menu>
        <MenuItem label="Export CSV" />
        <MenuItem label="View data table" />
      </Menu>
    </IconMenuButton>
  </div>
);

/**
 * Card around a chart: Header (title + button group) · Chart · Legend.
 * `hover` forces the hover border (Storybook only) — real hover is handled in CSS-in-state.
 */
export const ChartContainer = ({ title, chart, legend, width = 579, height = 407, hover = false }) => {
  const [hovered, setHovered] = React.useState(false);
  const on = hover || hovered;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width, height, boxSizing: 'border-box', padding: 16, display: 'flex', flexDirection: 'column', gap: 8,
        background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 'var(--radius-md, 8px)',
        border: `1px solid ${on ? 'var(--color-border-layout-hover, #a1a1a1)' : 'var(--color-border-layout, #d1d1d1)'}`,
        fontFamily: chartText.fontFamily,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: chartText.primary }}>{title}</span>
        <HeaderButtons />
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}>{chart}</div>
      <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>{legend}</div>
    </div>
  );
};
