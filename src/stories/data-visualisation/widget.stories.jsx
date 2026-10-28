import React, { useRef, useState } from 'react';
import { Widget } from '../../components/DataVis/Widget';
import { Page, Heading, Sub, Body } from './chartDocs';
import { mainChartBlock, donutBlock, keyFiguresBlock, DataTable, CHART_SAMPLES } from './widgetSamples';

export default {
  title: 'Data Visualisation/Widget',
  parameters: { layout: 'padded' },
};

const TITLE = 'Widget title with long title will display as such';
const TABS = [{ label: 'avg.' }, { label: 'Dates' }, { label: 'Months' }];
const DESCRIPTION = 'Description of the widget can be used to give users more context on how';

const Standard = (props) => (
  <Widget type="standard" title={TITLE} table={<DataTable />} legend={mainChartBlock.legend} {...props}>
    {mainChartBlock.content}
  </Widget>
);

const Advanced = (props) => (
  <Widget type="advanced" title={TITLE} priority1={mainChartBlock} priority2={donutBlock} priority3={keyFiguresBlock} table={<DataTable />} {...props} />
);

// Drag the bottom-right corner to resize; the widget responds to its own width, so this shows each size without resizing the browser.
// The box uses its own drag handle rather than CSS `resize`, which needs overflow: hidden and would cut off the widget's menus.
const MIN_BOX = 280;
const DragDemo = ({ children, caption }) => {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: null, height: 420 }); // width null = fill the page
  const startDrag = (e) => {
    e.preventDefault();
    const start = { x: e.clientX, y: e.clientY, w: boxRef.current.getBoundingClientRect().width, h: size.height };
    const move = (ev) => setSize({ width: Math.max(MIN_BOX, start.w + ev.clientX - start.x), height: Math.max(MIN_BOX, start.h + ev.clientY - start.y) });
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div style={{ background: 'var(--color-beige-bg-primary, #f9f8f6)', borderRadius: 8, padding: 16 }}>
      <div ref={boxRef} style={{ position: 'relative', width: size.width ?? '100%', maxWidth: size.width ? 'none' : '100%', height: size.height, paddingBottom: 0 }}>
        {React.cloneElement(children, { height: '100%' })}
        <div
          onPointerDown={startDrag}
          role="separator"
          aria-label="Drag to resize the widget"
          style={{ position: 'absolute', right: -12, bottom: -12, width: 16, height: 16, cursor: 'nwse-resize', touchAction: 'none' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M14 6 L6 14 M14 10 L10 14" stroke="#6e6e6e" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <Body>{caption}</Body>
    </div>
  );
};

// Guideline image from public/widget, shown at its natural size and shrunk to fit the docs pane.
const Figure = ({ src, alt }) => (
  <img src={`/widget/${src}`} alt={alt} style={{ display: 'block', maxWidth: '100%', height: 'auto', margin: '8px 0 16px' }} />
);

const VariantsDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '8px 0 16px' }}>
    <div style={{ width: 724, maxWidth: '100%' }}><Advanced /></div>
    <div style={{ width: 724, maxWidth: '100%' }}><Advanced contentLayout="vertical" /></div>
  </div>
);

const Docs = () => (
  <Page>
    <Heading>Widget</Heading>
    <Body>
      Widget is a container for various charts that visualise and compare system data. It also provides different navigation
      elements for users to read different data, and a set of actions users can take further on from the widget.
    </Body>

    <Sub>Anatomy</Sub>
    <Figure src="anatomy.png" alt="Anatomy of the widget: title with optional chevron, description, tabs, icon buttons group, chart and legend" />
    <ol style={{ margin: '0 0 12px', paddingLeft: 21, fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <li><b>Title (optional chevron)</b><br />Use the chevron when users can view a <u><b>different</b></u> set of data, but relevant to the same topic that should sit within the same widget.</li>
      <li><b>Tab (optional)</b><br />Use tabs only when we allow users to view the <u><b>same</b></u> set of data but in a different presentation.</li>
      <li><b>Datavis card description (optional)</b><br />Use the description only when more context helps users understand what the Datavis is presenting. If there is more information, place it in the dropdown under the Info icon to avoid overwhelming users.</li>
      <li><b>Icon buttons group</b><br />By default there are four icons: AI, List view, Info, More. See below on this guideline to understand what each of these actions does.</li>
      <li><b>Graph</b><br />Any graph that is provided in this Data vis design system.</li>
      <li><b>Legend</b></li>
    </ol>
    <Body>
      Spacing: 16px padding on all sides of the widget · 8px between the description and the tabs · 16px between the header and the content ·
      16px between the priority blocks of an Advanced widget.
    </Body>

    <Sub>Types</Sub>
    <Body>There are two types of Datavis card:</Body>
    <ol style={{ margin: '0 0 8px', paddingLeft: 21, fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)' }}>
      <li>Standard</li>
      <li>Advanced</li>
    </ol>
    <Body>
      The difference between the two types is that for Standard, the graph content stays the same when resizing. For Advanced, there is
      different content which has priority order: when the widget sizes up, more content is shown. Each has a default and a hover state,
      and both share the empty state.
    </Body>
    <Figure src="types.png" alt="Standard and Advanced widgets at long, middle and short widths" />
    <Body>
      Advanced priorities: priority 1 is always shown and takes the width that is left. Priority 2 joins it from 504px, and priority 3
      from 649px; priority 3 sits on the left.
    </Body>

    <Body>
      A long label in a block wraps onto more lines and the block hugs its height; the other blocks stay at the top of the content
      area and are not stretched.
    </Body>

    <Sub>Variants</Sub>
    <Body>For advanced widget, we provide two different layouts:</Body>
    <ol style={{ margin: '0 0 8px', paddingLeft: 21, fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <li>Horizontal layout</li>
      <li>Vertical layout</li>
    </ol>
    <VariantsDemo />

    <Sub>Behaviour</Sub>
    <Body>
      Control (tabs) and description can be used to give users more context and ways to view the data. However, be mindful of when to
      show both. On a smaller widget, the description should not be shown if there is not enough space, but the description should be
      included in the Info icon button.
    </Body>
    <Figure src="behaviour.png" alt="Datavis with most information, and short widgets showing either the tabs or the description" />
    <Body>
      Be mindful when working with a small widget. Choose to only show the tab control if there are both a description and tabs; the
      description can sit within the Info item of the menu.
    </Body>
    <Figure src="collapse.png" alt="The icon buttons group collapsed into a dropdown menu on a short widget" />
    <Body>
      Collapse the icon buttons group into a dropdown menu when widget space is not enough. Narrower than 356px the group becomes a
      single button, and its dropdown holds Ask Audrey, Table view, Info and More.
    </Body>

    <Sub>Changing the chart</Sub>
    <Body>
      The content is a slot, so any chart in the library can go in it. A block is the chart plus its legend. Give the legend as a list of
      items and the widget draws it, lays it out under the chart with 16px between, and keeps track of what the user hides. The chart
      function receives <code>hidden</code>, the indices of the hidden items in legend order, to pass on to the chart. To change the
      chart on request, replace the chart and its legend items; nothing else changes. Try each chart in the Swap the chart story.
    </Body>
    <pre style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, padding: 16, fontSize: 12, lineHeight: '18px', overflowX: 'auto', margin: '0 0 16px' }}>{`<Widget
  title="Reach by channel"
  legend={[
    { label: 'Channel 1', colour: datavisVar(0, 'group2', 'default'), shape: 'line' },
    { label: 'Channel 2', colour: datavisVar(1, 'group2', 'default'), shape: 'line' },
  ]}
>
  {({ hidden }) => <LineChart categories={categories} series={series} hiddenSeries={hidden} />}
</Widget>

// Advanced: one block per priority
<Widget
  type="advanced"
  priority1={{ content: ({ hidden }) => <ComboChart … />, legend: [ … ] }}
  priority2={{ content: ({ hidden }) => <DonutChart … />, legend: [ … ], centered: true }}
  priority3={<KeyFigures />}
/>`}</pre>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

const controls = {
  title: { control: 'text' },
  showChevron: { control: 'boolean', name: 'Title chevron', description: 'Optional chevron 4px after the title, for switching to a different set of data on the same topic' },
  description: { control: 'boolean', name: 'Description' },
  tabs: { control: 'boolean', name: 'Tabs' },
  empty: { control: 'boolean', name: 'Empty state' },
  hover: { control: 'boolean', name: 'Hover state' },
  contentLayout: { control: 'inline-radio', options: ['horizontal', 'vertical'], name: 'Content layout', description: 'Advanced only: blocks side by side, or priority 3 as a row across the top' },
  showGrid: { control: 'boolean', name: 'Layout guide', description: 'Draws the column grid (12 columns, 10 at sm) over the widget' },
};

const Live = ({ Component, args, intro }) => {
  const [tab, setTab] = useState(0);
  const { description, tabs, showChevron, ...rest } = args;
  return (
    <Page>
      <Heading>{args.heading}</Heading>
      <Body>{intro}</Body>
      <DragDemo caption="Drag the bottom-right corner to resize the widget">
        <Component
        {...rest}
        heading={undefined}
        showChevron={showChevron}
        onTitleClick={showChevron ? () => {} : undefined}
        description={description ? 'A short description of what this chart shows.' : undefined}
        tabs={tabs ? TABS : undefined}
        activeTab={tab}
        onTabChange={setTab}
        />
      </DragDemo>
    </Page>
  );
};

export const StandardWidget = {
  name: 'Standard widget',
  args: { heading: 'Standard widget', title: TITLE, showChevron: false, description: false, tabs: false, empty: false, hover: false, showGrid: false },
  argTypes: controls,
  render: (args) => <Live Component={Standard} args={args} intro="One chart in the content area. Use the controls to try the optional parts and the states." />,
};

export const AdvancedWidget = {
  name: 'Advanced widget',
  args: { heading: 'Advanced widget', title: TITLE, showChevron: false, description: false, tabs: false, empty: false, hover: false, showGrid: false, contentLayout: 'horizontal' },
  argTypes: controls,
  render: (args) => <Live Component={Advanced} args={args} intro="Three priority slots that show progressively. Drag the corner of the box to resize it." />,
};

export const SwapChart = {
  name: 'Swap the chart',
  args: { heading: 'Swap the chart', chart: 'Combo (bar + lines)', title: TITLE, showChevron: false, description: false, tabs: false, empty: false, hover: false, showGrid: false },
  argTypes: { ...controls, chart: { control: 'select', options: Object.keys(CHART_SAMPLES), name: 'Chart' } },
  render: (args) => {
    const sample = CHART_SAMPLES[args.chart];
    // key: a new chart starts with every legend item showing
    const Swapped = (props) => (
      <Widget key={args.chart} type="standard" table={<DataTable />} legend={sample.legend} {...props}>
        {sample.content}
      </Widget>
    );
    return <Live Component={Swapped} args={args} intro="Pick a chart in the controls. Only the chart and its legend items change; the widget stays the same. Click a legend item to hide or show it." />;
  },
};
