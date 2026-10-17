import React from 'react';
import { BarChart, datavisVar } from '../../components/DataVis/BarChart';
import { fontFamily } from '../../tokens/typography';

const meta = {
  title: 'Data Visualisation/Chart types/Bar Chart',
  parameters: { layout: 'padded' },
};

export default meta;

const Page = ({ children }) => (
  <div style={{ padding: 32, background: 'var(--color-beige-bg-primary, #f9f8f6)', maxWidth: 1100, fontFamily, color: 'var(--color-text-primary, #222)' }}>
    {children}
  </div>
);
const Heading = ({ children }) => (
  <h2 style={{ fontSize: 32, lineHeight: '40px', fontWeight: 700, margin: '0 0 16px' }}>{children}</h2>
);
const Sub = ({ children }) => (
  <h3 style={{ fontSize: 20, lineHeight: '28px', fontWeight: 600, margin: '32px 0 12px' }}>{children}</h3>
);
const Body = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, maxWidth: 621, margin: '0 0 8px' }}>{children}</p>
);
const Caption = ({ children }) => (
  <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--color-text-secondary, #474747)', marginTop: 8 }}>{children}</div>
);
const Card = ({ children, caption }) => (
  <div>
    <div style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, padding: 16, display: 'inline-block' }}>{children}</div>
    {caption && <Caption>{caption}</Caption>}
  </div>
);
const Grid = ({ children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>{children}</div>
);

const simple = [
  { label: 'Item A', value: 48 }, { label: 'Item B', value: 38 }, { label: 'Item C', value: 18 },
  { label: 'Item D', value: 52 }, { label: 'Item E', value: 36 }, { label: 'Item F', value: 62 },
  { label: 'Item G', value: 28 },
];
const horizontalData = [
  { label: 'Item A', value: 72 }, { label: 'Item B', value: 48 }, { label: 'Item C', value: 85 },
  { label: 'Item D', value: 38 }, { label: 'Item E', value: 90 }, { label: 'Item F', value: 52 },
];
const grouped = [
  { label: 'Item A', values: [40, 62, 50] }, { label: 'Item B', values: [70, 72, 40] },
  { label: 'Item C', values: [62, 28, 20] }, { label: 'Item D', values: [48, 60, 35] },
  { label: 'Item E', values: [72, 52, 62] },
];
const stacked = [
  { label: 'Item A', values: [10, 22, 18] }, { label: 'Item B', values: [12, 28, 36] },
  { label: 'Item C', values: [30, 20, 28] }, { label: 'Item D', values: [18, 40, 22] },
  { label: 'Item E', values: [12, 12, 20] },
];
const seriesNames = [{ name: 'Bar 1' }, { name: 'Bar 2' }, { name: 'Bar 3' }];

const Variant = ({ caption, ...props }) => (
  <Card caption={caption}>
    <BarChart series={seriesNames} {...props} />
  </Card>
);

/* ---------- Docs ---------- */

const Section = ({ title, children }) => (
  <section style={{ marginTop: 40 }}>
    <h3 style={{ fontSize: 20, lineHeight: '28px', fontWeight: 600, margin: '0 0 16px' }}>{title}</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(512px, 1fr))', gap: 24 }}>{children}</div>
  </section>
);

const DocsOverview = () => (
  <Page>
    <Heading>Bar Chart</Heading>
    <Body>
      Bar Charts are a staple in data visualisation, useful for comparing quantities across different categories.
      This component library allows for the creation of simple, grouped, and stacked bar charts to suit various data presentation needs.
    </Body>

    <Section title="Vertical simple bar">
      <Variant caption="Vertical simple bars (without leading data)" data={simple} />
      <Variant caption="Vertical simple bars (with leading data)" data={simple} showValues />
      <Variant caption="Vertical grouped bars" data={grouped} variant="grouped" />
      <Variant caption="Vertical stacked bars" data={stacked} variant="stacked" />
    </Section>

    <Section title="Horizontal simple bar">
      <Variant caption="Horizontal simple bars (without leading data)" orientation="horizontal" data={horizontalData} width={420} />
      <Variant caption="Horizontal simple bars (with leading data)" orientation="horizontal" data={horizontalData} width={420} showValues />
    </Section>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

/* ---------- Chart pages (from Figma) ---------- */

const W = 700; // Figma frame width
const H = 320;
const label = (n) => Array.from({ length: n }, () => 'label');
const rows = (labels, values) => labels.map((l, i) => ({ label: l, value: values[i] }));
const cols = (valuesPerColumn, names) => valuesPerColumn.map((values, i) => ({ label: names[i], values }));
const items = (n) => Array.from({ length: n }, (_, i) => `Item ${String.fromCharCode(65 + i)}`);

const simpleValues = [50, 40, 20, 60, 40, 70, 30];
const groupedThree = [[40, 60, 50], [70, 50, 70], [60, 30, 40], [70, 50, 60], [80, 70, 80]];
const groupedSix = [
  [40, 60, 50, 90, 60, 79], [70, 50, 70, 60, 67, 77], [60, 30, 40, 67, 81, 73],
  [70, 50, 60, 80, 80, 75], [80, 70, 49, 43, 61, 77],
];
// series order = colour order (stone first); the stack draws the last series at the baseline
const stackedThree = [[7, 8, 35], [27, 25, 8], [42, 13, 35], [20, 50, 10], [10, 22, 8]];
const stackedSix = [
  [3, 3, 37, 3, 2, 2], [27, 6, 10, 6, 6, 5], [23, 12, 10, 23, 12, 10],
  [14, 16, 12, 13, 13, 12], [4, 22, 4, 4, 3, 3],
];
const barSeries = (n) => Array.from({ length: n }, (_, i) => ({ name: `Bar ${i + 1}` }));
const stackSeries = (n) => Array.from({ length: n }, (_, i) => ({ name: `Item ${i + 1}` }));

const ChartPage = ({ title, charts }) => (
  <Page>
    <Heading>{title}</Heading>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {charts.map(({ caption, ...props }) => (
        <Card key={caption} caption={caption}>
          <BarChart width={W} height={H} tickStep={10} {...props} />
        </Card>
      ))}
    </div>
  </Page>
);

export const VerticalSimple = {
  name: 'Vertical simple bar chart',
  render: () => (
    <ChartPage
      title="Vertical simple bar chart"
      charts={[
        { caption: 'Without leading data', data: rows(items(7), simpleValues) },
        { caption: 'With leading data', data: rows(items(7), simpleValues), showValues: true },
      ]}
    />
  ),
};

export const VerticalGrouped = {
  name: 'Vertical grouped bar chart',
  render: () => (
    <ChartPage
      title="Vertical grouped bar chart"
      charts={[
        { caption: 'Three bars on each column', variant: 'grouped', data: cols(groupedThree, items(5)), series: barSeries(3) },
        { caption: 'More bars on each column', variant: 'grouped', data: cols(groupedSix, items(5)), series: barSeries(6) },
      ]}
    />
  ),
};

export const VerticalStacked = {
  name: 'Vertical stacked bar chart',
  render: () => (
    <ChartPage
      title="Vertical stacked bar chart"
      charts={[
        { caption: 'Three items on each column', variant: 'stacked', data: cols(stackedThree, items(5)), series: stackSeries(3) },
        { caption: 'More items on each column', variant: 'stacked', data: cols(stackedSix, items(5)), series: stackSeries(6) },
      ]}
    />
  ),
};

export const HorizontalSimple = {
  name: 'Horizontal simple bar chart',
  render: () => (
    <ChartPage
      title="Horizontal simple bar chart"
      charts={[
        { caption: 'Without leading data', orientation: 'horizontal', data: rows(items(6), [53, 38, 61, 30, 69, 45]) },
        { caption: 'With leading data', orientation: 'horizontal', showValues: true, data: rows(items(6), [70, 50, 80, 40, 90, 60]) },
      ]}
    />
  ),
};
