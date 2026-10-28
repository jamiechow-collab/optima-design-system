import React from 'react';
import { BarChart } from '../../components/DataVis/BarChart';
import { Page, Heading, Sub, Body, Card, LiveDemo, LegendDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Bar',
  parameters: { layout: 'padded' },
};

export default meta;

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
    <BarChart series={seriesNames} width={480} height={280} {...props} />
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

const rows = (labels, values) => labels.map((l, i) => ({ label: l, value: values[i] }));
const cols = (valuesPerColumn, names) => valuesPerColumn.map((values, i) => ({ label: names[i], values }));
const items = (n) => Array.from({ length: n }, (_, i) => `Item ${String.fromCharCode(65 + i)}`);

const simpleValues = [50, 40, 20, 60, 40, 70, 30];
const groupedThree = [[40, 60, 50], [70, 50, 70], [60, 30, 40], [70, 50, 60], [80, 70, 80]];
const groupedSix = [
  [40, 60, 50, 90, 60, 79], [70, 50, 70, 60, 67, 77], [60, 30, 40, 67, 81, 73],
  [70, 50, 60, 80, 80, 75], [80, 70, 49, 43, 61, 77],
];
// series order = colour order (earth first); the stack draws the last series at the baseline
const stackedThree = [[7, 8, 35], [27, 25, 8], [42, 13, 35], [28, 52, 10], [10, 22, 8]];
const stackedSix = [
  [3, 3, 37, 3, 2, 2], [27, 6, 10, 6, 6, 5], [23, 12, 10, 23, 12, 10],
  [14, 16, 12, 13, 13, 12], [4, 22, 4, 4, 3, 3],
];
const barSeries = (n) => Array.from({ length: n }, (_, i) => ({ name: `Bar ${i + 1}` }));
const stackSeries = (n) => Array.from({ length: n }, (_, i) => ({ name: `Item ${i + 1}` }));

const SpecList = ({ title, lines }) => (
  <div style={{ margin: '0 0 8px' }}>
    <div style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>{title}</div>
    <ul style={{ fontSize: 14, lineHeight: '20px', margin: '4px 0 0', paddingLeft: 20 }}>
      {lines.map((l) => <li key={l}>{l}</li>)}
    </ul>
  </div>
);

// Fluid chart: fills the box, which follows the page width; the corner handle drags width and height.
const AXIS_TITLES = { yTitle: 'Y-axis title', xTitle: 'X-axis title' };
const axisTitlesArgType = { control: 'boolean', name: 'Show axis titles', description: 'Y-axis and X-axis titles' };

const ChartPage = ({ title, spec, sections, showValues, showLegend, benchmark, showAxisTitles }) => (
  <Page>
    <Heading>{title}</Heading>
    <SpecList title={spec.title} lines={spec.lines} />
    <Sub>Responsive demo</Sub>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sections.map(({ title: sectionTitle, props }) => (
        <section key={sectionTitle}>
          <h4 style={{ fontSize: 16, lineHeight: '24px', fontWeight: 600, margin: '0 0 8px' }}>{sectionTitle}</h4>
          {showLegend === undefined ? (
            <LiveDemo>
              <BarChart
                tickStep={10}
                {...props}
                {...(showValues !== undefined ? { showValues } : {})}
                {...(benchmark ? { benchmark } : {})}
                {...(showAxisTitles ? AXIS_TITLES : {})}
              />
            </LiveDemo>
          ) : (
            <LegendDemo showLegend={showLegend} seriesNames={props.series.map((x) => x.name)}>
              {(hiddenSeries, highlighted) => (
                <BarChart tickStep={10} {...props} hiddenSeries={hiddenSeries} highlightedSeries={highlighted} {...(showValues !== undefined ? { showValues } : {})} {...(benchmark ? { benchmark } : {})} {...(showAxisTitles ? AXIS_TITLES : {})} />
              )}
            </LegendDemo>
          )}
        </section>
      ))}
    </div>
  </Page>
);

const columnSpec = {
  title: 'Bar column',
  lines: ['Max. width: 32px', 'Left padding: 8px', 'Right padding: 8px'],
};

export const VerticalSimple = {
  name: 'Vertical simple bar chart',
  args: { showValues: false, showBenchmark: false, showAxisTitles: false },
  argTypes: {
    showAxisTitles: axisTitlesArgType,
    showValues: { control: 'boolean', name: 'Show data', description: 'Leading data on the bars' },
    showBenchmark: { control: 'boolean', name: 'Show benchmark', description: 'Reference line with its value and label' },
  },
  render: ({ showValues, showBenchmark, showAxisTitles }) => (
    <ChartPage
      title="Vertical simple bar chart"
      spec={{ ...columnSpec, lines: [...columnSpec.lines, 'Data, benchmark and axis titles can be toggled in Controls'] }}
      showValues={showValues}
      showAxisTitles={showAxisTitles}
      benchmark={showBenchmark ? { value: 40, label: 'Benchmark', valueText: '40%' } : undefined}
      sections={[{ title: 'Simple bars', props: { data: rows(items(7), simpleValues) } }]}
    />
  ),
};

export const VerticalGrouped = {
  name: 'Vertical grouped bar chart',
  args: { showValues: false, showLegend: false, showBenchmark: false, showAxisTitles: false },
  argTypes: {
    showAxisTitles: axisTitlesArgType,
    showValues: { control: 'boolean', name: 'Show data', description: 'Leading data on the bars' },
    showBenchmark: { control: 'boolean', name: 'Show benchmark', description: 'Reference line with its value and label' },
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Selectable legend: click an item to hide or show that series' },
  },
  render: ({ showValues, showLegend, showBenchmark, showAxisTitles }) => (
    <ChartPage
      title="Vertical grouped bar chart"
      showValues={showValues}
      showAxisTitles={showAxisTitles}
      showLegend={showLegend}
      benchmark={showBenchmark ? { value: 40, label: 'Benchmark', valueText: '40%' } : undefined}
      spec={{ title: 'Bar column', lines: ['Max. width: 80px', 'Left padding: 8px', 'Right padding: 8px', 'Individual bar: 1px left and right padding', 'Data (toggle in Controls): 4px above each bar', 'Legend, benchmark and axis titles can be toggled in Controls'] }}
      sections={[
        { title: 'Common use case', props: { variant: 'grouped', data: cols(groupedThree, items(5)), series: barSeries(3) } },
        { title: 'Edge case', props: { variant: 'grouped', data: cols(groupedSix, items(5)), series: barSeries(6) } },
      ]}
    />
  ),
};

export const VerticalStacked = {
  name: 'Vertical stacked bar chart',
  args: { showValues: false, showLegend: false, showAxisTitles: false },
  argTypes: {
    showAxisTitles: axisTitlesArgType,
    showValues: { control: 'boolean', name: 'Show data', description: 'Leading data on the bars' },
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Selectable legend: click an item to hide or show that series' },
  },
  render: ({ showValues, showLegend, showAxisTitles }) => (
    <ChartPage
      title="Vertical stacked bar chart"
      showValues={showValues}
      showAxisTitles={showAxisTitles}
      showLegend={showLegend}
      spec={{ ...columnSpec, lines: [...columnSpec.lines, 'Data (toggle in Controls): inside the bar, 4px from the top of each segment', 'Legend and axis titles can be toggled in Controls'] }}
      sections={[
        { title: 'Common use case', props: { variant: 'stacked', data: cols(stackedThree, items(5)), series: stackSeries(3) } },
        { title: 'Edge case', props: { variant: 'stacked', data: cols(stackedSix, items(5)), series: stackSeries(6) } },
      ]}
    />
  ),
};

export const HorizontalSimple = {
  name: 'Horizontal simple bar chart',
  args: { showValues: false, showBenchmark: false, showAxisTitles: false },
  argTypes: {
    showAxisTitles: axisTitlesArgType,
    showValues: { control: 'boolean', name: 'Show data', description: 'Leading data on the bars' },
    showBenchmark: { control: 'boolean', name: 'Show benchmark', description: 'Reference line with its value and label' },
  },
  render: ({ showValues, showBenchmark, showAxisTitles }) => (
    <ChartPage
      title="Horizontal simple bar chart"
      spec={{ title: 'Bar row', lines: ['Max. height: 32px', 'Top padding: 8px', 'Bottom padding: 8px', 'Data, benchmark and axis titles can be toggled in Controls'] }}
      showValues={showValues}
      showAxisTitles={showAxisTitles}
      benchmark={showBenchmark ? { value: 40, label: 'Benchmark', valueText: '40%' } : undefined}
      sections={[{ title: 'Simple bars', props: { orientation: 'horizontal', tickStep: 20, data: rows(items(6), [60, 43, 90, 30, 20, 60]) } }]}
    />
  ),
};
