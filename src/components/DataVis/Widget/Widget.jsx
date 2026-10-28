import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../Button/Button';
import { Icon } from '../../Icon/Icon';
import { IconMenuButton } from '../../MenuButton/MenuButton';
import { Menu, MenuItem } from '../../Menu/Menu';
import { Modal } from '../../Modal/Modal';
import { UiTab } from '../../UiTab/UiTab';
import { UiTabList } from '../../UiTab/UiTabList';
import { ChartLegend } from '../ChartLegend';
import { useSeriesVisibility } from '../useSeriesVisibility';
import './Widget.css';

// Sizes follow the widget's own width (so it responds inside any layout, and when dragged in the docs), starting at the Figma widths.
// How many priority slots show: xxs and xs 1 · sm 2 · md and lg 3. xxs is narrower than xs: the actions collapse into one menu.
export const WIDGET_SIZES = ['xxs', 'xs', 'sm', 'md', 'lg'];
export const WIDGET_MIN_WIDTH = { xs: 356, sm: 504, md: 649, lg: 988 };
const SLOTS_SHOWN = { xxs: 1, xs: 1, sm: 2, md: 3, lg: 3 };
// The content area sits on a column grid with 16px gutters (Figma layout guide on the Advanced widget): 12 columns, and 10 at sm.
// How many columns each priority takes: lg 2 / 2 / 8 · md 2 / 3 / 7 · sm 3 / 7. Priority 1 takes every column the others leave free.
// Vertical content layout (Figma "Content layout=Vertical"): priority 3 is a row of figures across the top, priority 2 and 1 sit side by side
// under it. Priorities 3 and 2 both join from sm; narrower than that only the standard graph (priority 1) is left. Priority 2 takes lg 4 · md 3 · sm 3 columns, priority 1 the rest.
export const WIDGET_GRID_VERTICAL = { xxs: {}, xs: {}, sm: { 2: 3 }, md: { 2: 3 }, lg: { 2: 4 } };
export const WIDGET_GRID = {
  xxs: { cols: 12, spans: {} },
  xs: { cols: 12, spans: {} },
  sm: { cols: 10, spans: { 2: 3 } },
  md: { cols: 12, spans: { 3: 2, 2: 3 } },
  lg: { cols: 12, spans: { 3: 2, 2: 2 } },
};

const sizeForWidth = (w) =>
  w >= WIDGET_MIN_WIDTH.lg ? 'lg' : w >= WIDGET_MIN_WIDTH.md ? 'md' : w >= WIDGET_MIN_WIDTH.sm ? 'sm' : w >= WIDGET_MIN_WIDTH.xs ? 'xs' : 'xxs';

// Measures the element; `override` pins a size instead.
const useWidgetSize = (ref, override) => {
  const [size, setSize] = useState('lg');
  useLayoutEffect(() => {
    if (override || !ref.current) return undefined;
    const el = ref.current;
    const update = () => setSize(sizeForWidth(el.getBoundingClientRect().width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [override, ref]);
  return override || size;
};

// One block of content: the chart over its legend. `content` is a chart element, or a function ({ hidden }) => chart that
// receives the legend items the user has hidden. `legend` is an array of items ({ label, colour, shape }) or { items, title }, which
// the widget draws as a clickable legend and keeps the hidden state for, or a ready-made element, which is drawn as it is.
const normalise = (block) =>
  block && typeof block === 'object' && !React.isValidElement(block) && ('content' in block || 'legend' in block)
    ? block
    : { content: block };

const legendConfig = (legend) => (Array.isArray(legend) ? { items: legend } : legend && !React.isValidElement(legend) ? legend : null);

const Block = ({ content, legend, centered = false, layout = 'horizontal', size, legendLeft = false }) => {
  const config = legendConfig(legend);
  const { hidden, toggle } = useSeriesVisibility(config ? config.items.length : 0);
  const [highlighted, setHighlighted] = useState(null); // legend item under the pointer / keyboard focus
  const chart = typeof content === 'function' ? content({ hidden, layout, size, highlighted: highlighted !== null && !hidden.includes(highlighted) ? highlighted : null }) : content;
  let legendNode = null;
  if (config) {
    legendNode = (
      <ChartLegend
        title={config.title}
        layout={legendLeft ? 'vertical-left' : undefined}
        fit={legendLeft}
        items={config.items.map((it, i) => ({ ...it, deselected: hidden.includes(i) }))}
        onToggle={toggle}
        onItemHover={setHighlighted}
      />
    );
  } else if (legend) legendNode = legend;
  return (
    <div className={`ds-widget__block ${legendLeft ? 'is-legend-left' : ''}`.trim()}>
      {legendLeft && legendNode && <div className="ds-widget__legend">{legendNode}</div>}
      <div className={`ds-widget__chart ${centered ? 'is-centered' : ''}`.trim()}>{chart}</div>
      {!legendLeft && legendNode && <div className="ds-widget__legend">{legendNode}</div>}
    </div>
  );
};

const Slot = ({ n, block, span, layout, size, legendLeft }) => (
  <div className={`ds-widget__slot ds-widget__slot--${n}`} style={span ? { gridColumn: `span ${span}` } : undefined}>
    <Block content={block.content} legend={block.legend} centered={block.centered} layout={layout} size={size} legendLeft={legendLeft} />
  </div>
);

const DefaultActions = ({ onAIClick, onListClick, onInfoClick, menu }) => (
  <>
    <Button variant="ghost" iconOnly aria-label="Insights" onClick={onAIClick}><Icon name="sparkle" size="sm" /></Button>
    <Button variant="ghost" iconOnly aria-label="View data table" aria-haspopup="dialog" onClick={onListClick}><Icon name="list-1" size="sm" /></Button>
    <Button variant="ghost" iconOnly aria-label="More information" onClick={onInfoClick}><Icon name="info-with-circle" size="sm" /></Button>
    <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label="More options" position="bottom-right">
      {menu || (
        <Menu>
          <MenuItem label="Export CSV" />
        </Menu>
      )}
    </IconMenuButton>
  </>
);

// Below the xs size the four buttons fold into the one "more" button.
const CollapsedActions = ({ onAIClick, onListClick, onInfoClick, menu, info }) => (
  <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label="Actions" position="bottom-right">
    <Menu>
      <MenuItem label="Ask Audrey" leadingIcon={<Icon name="sparkle" size="sm" />} onClick={onAIClick} />
      <MenuItem label="Table view" leadingIcon={<Icon name="list-1" size="sm" />} onClick={onListClick} />
      <MenuItem
        label="Info"
        leadingIcon={<Icon name="info-with-circle" size="sm" />}
        onClick={onInfoClick}
        hasSubmenu={!!info}
        submenu={info && <MenuItem label={info} />}
      />
      <MenuItem
        label="More"
        leadingIcon={<Icon name="more" size="sm" />}
        hasSubmenu
        submenu={menu || <MenuItem label="Export CSV" />}
      />
    </Menu>
  </IconMenuButton>
);

/**
 * Widget: a card around charts. Header (title + actions, with an optional description and tabs) over Content.
 * type: 'standard' (one chart, passed as `children`, with its `legend`) | 'advanced' (up to three blocks, passed as priority1 / priority2 / priority3).
 * A block is a chart element, or a function ({ hidden, highlighted, layout, size }) => chart (layout: 'horizontal' | 'vertical', size: the widget size), or { content, legend, centered? }. Give `legend` as an array of items
 *   ({ label, colour, shape }) and the widget draws a clickable legend and keeps what is hidden: the function receives `hidden`, the indices of
 *   the hidden items in legend order, and `highlighted`, the legend item being hovered (or null), to pass on to the chart as its highlight. centered: centres a fixed-size chart in its block.
 * Advanced shows its content progressively: priority 1 always, priority 2 from the sm width (504px), priority 3 from md (649px).
 * The blocks scale with the widget on a column grid (12 columns, 10 at sm; 16px gutters): lg 2 / 2 / 8, md 2 / 3 / 7, sm 3 / 7 columns for priority 3 / 2 / 1.
 * contentLayout (Advanced): 'horizontal' (default) puts the blocks side by side. 'vertical' puts priority 3 as a row across the top and
 *   priority 2 and 1 side by side under it (both from sm, so xs and xxs keep only priority 1; lg 4 · md 3 · sm 3 columns). At lg the legends sit beside their charts (vertical-left), below them at smaller sizes.
 * A label in a block can be long: it wraps and the block grows to fit, while the other blocks keep their place at the top. showGrid draws the column guide over the widget (docs).
 * The size follows the widget's own width, so it responds when its container is resized; `size` ('xxs' | 'xs' | 'sm' | 'md' | 'lg') pins it.
 * Narrower than xs (356px) the action buttons fold into one menu, and a description that sits beside tabs moves into that menu's Info item.
 * title: truncates with an ellipsis. The optional chevron is an inline icon-only button 4px after it, for a widget that can switch to a different set of data
 *   on the same topic: showChevron turns it on (it is also on whenever onTitleClick is given), and onTitleClick is called when it is pressed. description / tabs are optional.
 * tabs: [{ label, value? }], activeTab: the selected index, onTabChange(index).
 * actions: replaces the default buttons (AI, list, info, more); the default ones call onAIClick / onListClick / onInfoClick, `menu` fills the more menu.
 * table: the data table for this widget. With it, the list button opens it in a modal (onListClick is still called) whose main button, "Download as CSV", calls onDownloadCSV.
 * empty: shows the empty state in place of the content, for both types. hover: holds the hover border (docs).
 * height: px (or any CSS length), 376 in Figma. The width is fluid.
 */
export const Widget = ({
  type = 'standard',
  title,
  description,
  tabs,
  activeTab = 0,
  onTabChange,
  onTitleClick,
  showChevron,
  actions,
  onAIClick,
  onListClick,
  onInfoClick,
  menu,
  table,
  onDownloadCSV,
  children,
  legend,
  priority1,
  priority2,
  priority3,
  empty = false,
  emptyTitle = 'This chart has no data',
  emptyDescription = 'Try changing your report filters or settings to see data here.',
  size: sizeProp,
  contentLayout = 'horizontal',
  hover = false,
  showGrid = false,
  height = 376,
  className = '',
  ...rest
}) => {
  const ref = useRef(null);
  const size = useWidgetSize(ref, sizeProp);
  const collapsed = size === 'xxs';
  const [tableOpen, setTableOpen] = useState(false);
  const toggleTable = () => {
    if (onListClick) onListClick();
    if (table) setTableOpen(true);
  };
  const descriptionInMenu = collapsed && description && tabs && tabs.length > 0;
  const shown = SLOTS_SHOWN[size];
  const grid = WIDGET_GRID[size];
  const gridStyle = { gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))` };
  const vertical = type === 'advanced' && contentLayout === 'vertical';
  const present = vertical
    ? { 3: shown >= 2 && !!priority3, 2: shown >= 2 && !!priority2 }
    : { 3: shown >= 3 && !!priority3, 2: shown >= 2 && !!priority2 };
  const span2 = present[2] ? (vertical ? WIDGET_GRID_VERTICAL[size][2] : grid.spans[2]) || 0 : 0;
  const span3 = !vertical && present[3] ? grid.spans[3] || 0 : 0;
  const layout = vertical ? 'vertical' : 'horizontal';
  const legendLeft = vertical && size === 'lg'; // wide enough for the legend to sit beside the chart


  const content = empty ? (
    <div className="ds-widget__empty">
      <Icon name="empty-file" size="lg" className="ds-widget__empty-icon" />
      <div>
        <div>{emptyTitle}</div>
        <div>{emptyDescription}</div>
      </div>
    </div>
  ) : vertical ? (
    <>
      {present[3] && <Slot n={3} block={normalise(priority3)} layout={layout} size={size} />}
      <div className="ds-widget__bottom" style={gridStyle}>
        {present[2] && <Slot n={2} block={normalise(priority2)} span={span2} layout={layout} size={size} legendLeft={legendLeft} />}
        <Slot n={1} block={normalise(priority1)} span={grid.cols - span2} layout={layout} size={size} legendLeft={legendLeft} />
      </div>
    </>
  ) : type === 'advanced' ? (
    <>
      {present[3] && <Slot n={3} block={normalise(priority3)} span={span3} layout={layout} size={size} />}
      {present[2] && <Slot n={2} block={normalise(priority2)} span={span2} layout={layout} size={size} />}
      <Slot n={1} block={normalise(priority1)} span={grid.cols - span2 - span3} layout={layout} size={size} />
    </>
  ) : (
    <Slot n={1} block={{ content: children, legend }} span={grid.cols} size={size} />
  );

  return (
    <section
      ref={ref}
      className={`ds-widget ds-widget--${type} ds-widget--${size} ${hover ? 'is-hover' : ''} ${className}`.trim()}
      style={{ height }}
      data-size={size}
      {...rest}
    >
      <header className="ds-widget__header">
        <div className="ds-widget__top">
          <div className="ds-widget__title">
            <span className="ds-widget__title-text" title={typeof title === 'string' ? title : undefined}>{title}</span>
            {(showChevron ?? !!onTitleClick) && (
              <Button variant="inline" size="xs" iconOnly className="ds-widget__title-chevron" aria-label="Show other data" onClick={onTitleClick}>
                <Icon name="chevron-down" size="xs" />
              </Button>
            )}
          </div>
          <div className="ds-widget__actions">
            {actions || (collapsed
              ? <CollapsedActions onAIClick={onAIClick} onListClick={toggleTable} onInfoClick={onInfoClick} menu={menu} info={descriptionInMenu ? description : undefined} />
              : <DefaultActions onAIClick={onAIClick} onListClick={toggleTable} onInfoClick={onInfoClick} menu={menu} />)}
          </div>
        </div>
        {description && !descriptionInMenu && <div className="ds-widget__description">{description}</div>}
        {tabs && tabs.length > 0 && (
          <div className="ds-widget__control">
            <UiTabList aria-label={typeof title === 'string' ? `${title} views` : 'Views'}>
              {tabs.map((t, i) => (
                <UiTab key={t.value ?? `${t.label}-${i}`} active={i === activeTab} onClick={() => onTabChange && onTabChange(i)}>{t.label}</UiTab>
              ))}
            </UiTabList>
          </div>
        )}
      </header>
      <div className={`ds-widget__content ${vertical ? 'ds-widget__content--vertical' : ''}`.trim()} style={vertical ? undefined : gridStyle}>{content}</div>
      {showGrid && (
        <div className="ds-widget__grid" style={gridStyle} aria-hidden="true">
          {Array.from({ length: grid.cols }, (_, i) => <span key={i} />)}
        </div>
      )}
      {table && (
        <Modal
          open={tableOpen}
          onClose={() => setTableOpen(false)}
          title={title}
          width={720}
          className="ds-widget__table-modal"
          primaryAction={{ label: 'Download as CSV', onClick: onDownloadCSV }}
        >
          {table}
        </Modal>
      )}
    </section>
  );
};

export default Widget;
