import React from 'react';
import { ChartTooltip, Hoverline } from '../../components/DataVis/ChartTooltip';
import { Datapoint } from '../../components/DataVis/Datapoint';
import { datavisCategorical } from '../../tokens/datavis-colors';
import { Page, Heading, Body } from './chartDesignDocs';

const meta = {
  title: 'Data Visualisation/Chart design/Tooltips',
  parameters: { layout: 'padded' },
};

export default meta;

const g1 = datavisCategorical.group1;
const SWATCHES = { Filled: 'filled', 'Solid line': 'line', 'Dotted line': 'dotted' };

const sampleItems = (shape) => [
  { label: 'Label', value: 'Data', colour: g1[0].default, shape },
  { label: 'Label', value: 'Data', colour: g1[1].default, shape },
  { label: 'Label', value: 'Data', colour: g1[2].default, shape },
];

// Figma's own example mixes mark types: solid, dotted, solid
const figmaItems = [
  { label: 'Label', value: 'Data', colour: g1[0].default, shape: 'line' },
  { label: 'Label', value: 'Data', colour: g1[1].default, shape: 'dotted' },
  { label: 'Label', value: 'Data', colour: g1[2].default, shape: 'line' },
];

// Rulerline + data point + tooltip, as shown when hovering a chart
const Hovering = ({ items = figmaItems, showHeader = true, showFooter = true, height = 249, labels }) => (
  <div style={{ position: 'relative', height, width: 260 }}>
    <div style={{ position: 'absolute', left: 8, top: 0 }}><Hoverline height={height} /></div>
    <div style={{ position: 'absolute', left: 1, top: height / 2 - 7 }}><Datapoint state="hover" /></div>
    <div style={{ position: 'absolute', left: 26, top: 40 }}>
      <ChartTooltip
        header={showHeader ? 'Header' : undefined}
        headerValue="Data"
        items={items}
        total={showFooter ? 'Total' : undefined}
        totalValue="Data"
      />
    </div>
    {labels}
  </div>
);

const ann = '#ab48e4'; // annotation colour used only for the labelled anatomy diagram, as in Figma
const Note = ({ children, style }) => (
  <span style={{ position: 'absolute', fontSize: 12, lineHeight: '16px', color: ann, whiteSpace: 'nowrap', ...style }}>{children}</span>
);
// Leader line: 1px line from x1 to x2 at y, with a dot at the end next to the element
const Leader = ({ x1, x2, y, dot = 'start' }) => {
  const left = Math.min(x1, x2);
  const dotAt = dot === 'start' ? x1 : x2;
  return (
    <>
      <span style={{ position: 'absolute', left, top: y, width: Math.abs(x2 - x1), height: 1, background: ann }} />
      <span style={{ position: 'absolute', left: dotAt - 2.5, top: y - 2, width: 5, height: 5, borderRadius: '50%', background: ann }} />
    </>
  );
};
// Bracket: vertical line with short ticks pointing at the element (towards `tickTo`)
const Bracket = ({ x, y1, y2, tickTo }) => {
  const left = Math.min(x, tickTo);
  return (
    <span style={{ position: 'absolute', left, top: y1, width: Math.abs(tickTo - x), height: y2 - y1, boxSizing: 'border-box', borderTop: `1px solid ${ann}`, borderBottom: `1px solid ${ann}`, [tickTo > x ? 'borderLeft' : 'borderRight']: `1px solid ${ann}` }} />
  );
};
const Cursor = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" style={{ display: 'block' }} aria-hidden="true">
    <path d="M7 4v14l3.6-3.4 2.6 5.4 2.2-1-2.6-5.3H17z" fill="#111" stroke="#fff" strokeWidth={1.2} strokeLinejoin="round" />
  </svg>
);

// Figma "Anatomy 1": ruler line, data point and tooltip with callouts (495×249)
const Anatomy = () => (
  <div style={{ position: 'relative', width: 495 + 20, height: 249 }}>
    <div style={{ position: 'absolute', left: 172, top: 0 }}><Hoverline height={249} /></div>
    <div style={{ position: 'absolute', left: 166, top: 133 }}><Datapoint state="hover" /></div>
    <div style={{ position: 'absolute', left: 191, top: 75 }}>
      <ChartTooltip header="Header" headerValue="Data" items={figmaItems} total="Total" totalValue="Data" />
    </div>
    <div style={{ position: 'absolute', left: 167, top: 138 }}><Cursor /></div>

    <Note style={{ left: 0, top: 18, width: 133, textAlign: 'right' }}>Rulerline</Note>
    <Leader x1={173} x2={139} y={26} dot="start" />
    <Note style={{ left: 62, top: 132, width: 64, textAlign: 'right' }}>Data point</Note>
    <Leader x1={166} x2={132} y={140} dot="start" />
    <Bracket x={414} y1={75} y2={225} tickTo={375} />
    <Leader x1={414} x2={448} y={151} dot="start" />
    <Note style={{ left: 456, top: 143 }}>Tooltip</Note>
  </div>
);

// Figma "Anatomy 2": header, tooltips item, divider and footer (417×150, +17px headroom)
const AnatomyParts = () => (
  <div style={{ position: 'relative', width: 417 + 20, height: 190 }}>
    <div style={{ position: 'absolute', left: 116, top: 17 }}>
      <ChartTooltip header="Header" headerValue="Data" items={figmaItems} total="Total" totalValue="Data" />
    </div>
    {/* Header: bracket on the right of the header block */}
    <Bracket x={330} y1={17} y2={48} tickTo={292} />
    <Leader x1={330} x2={364} y={33} dot="start" />
    <Note style={{ left: 375, top: 25 }}>Header</Note>
    {/* Divider */}
    <Leader x1={287} x2={321} y={136} dot="start" />
    <Note style={{ left: 328, top: 127 }}>Divider</Note>
    {/* Tooltips item: first item row */}
    <Bracket x={104} y1={60} y2={78} tickTo={116} />
    <Leader x1={104} x2={70} y={68} dot="start" />
    <Note style={{ left: 0, top: 60, width: 64, textAlign: 'right' }}>Tooltips item</Note>
    {/* Footer */}
    <Bracket x={104} y1={142} y2={161} tickTo={116} />
    <Leader x1={104} x2={70} y={150} dot="start" />
    <Note style={{ left: 0, top: 142, width: 64, textAlign: 'right' }}>Footer</Note>
  </div>
);

export const Docs = () => (
  <Page>
    <Heading>Tooltips</Heading>
    <Body>Tooltips provide contextual information when users hover over chart elements.</Body>
    <Body>
      When tooltip.ShowRulerTooltip is set to true, the tooltip will display ruler lines and values continuously as
      the user moves their cursor across the chart, making it easier to read precise values and compare data points
      across different series.
    </Body>
    <div style={{ marginTop: 32, background: 'var(--color-beige-bg-primary, #f9f8f6)', borderRadius: 8, padding: 24, display: 'inline-block' }}>
      <Hovering height={220} />
    </div>

    <div style={{ marginTop: 48 }}>
      <Heading>Anatomy</Heading>
      <div style={{ background: 'var(--color-beige-bg-primary, #f9f8f6)', borderRadius: 8, padding: 24, display: 'inline-block' }}>
        <Anatomy />
        <div style={{ marginTop: 48 }}><AnatomyParts /></div>
      </div>
    </div>

    <div style={{ marginTop: 48 }}>
      <Heading>Datapoint</Heading>
      <Body>
        A datapoint marks a value on a line or area chart. It is shown solid when selected and gains a halo while it is
        hovered. Colours follow the series.
      </Body>
      <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
        {[['Default', 'default'], ['Hover', 'hover'], ['Selected', 'selected']].map(([label, state]) => (
          <figure key={state} style={{ margin: 0 }}>
            <div style={{ background: 'var(--color-beige-bg-primary, #f9f8f6)', borderRadius: 8, width: 96, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Datapoint state={state} />
            </div>
            <figcaption style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', marginTop: 8 }}>{label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </Page>
);

export const Playground = {
  parameters: { layout: 'padded' },
  args: { swatch: 'Solid line', showHeader: true, showFooter: true },
  argTypes: {
    swatch: { control: 'inline-radio', options: Object.keys(SWATCHES), description: 'Mark shown beside each series' },
    showHeader: { control: 'boolean', description: 'Header row with the hovered date or category' },
    showFooter: { control: 'boolean', description: 'Footer row with the total' },
  },
  render: ({ swatch, showHeader, showFooter }) => (
    <div style={{ background: 'var(--color-beige-bg-primary, #f9f8f6)', borderRadius: 8, padding: 24, display: 'inline-block' }}>
      <Hovering items={sampleItems(SWATCHES[swatch])} showHeader={showHeader} showFooter={showFooter} height={200} />
    </div>
  ),
};
