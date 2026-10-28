import React from 'react';
import { LineChart } from '../../components/DataVis/LineChart';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo, LegendDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Line',
  parameters: { layout: 'padded' },
};

export default meta;

const categories = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];

const single = [{ name: 'Series', values: [18, 25, 21, 33, 39, 58, 69] }];
// series order = colour order (earth, lagoon, plum, sapphire)
const straightMultiple = [
  { name: 'Channel 1', values: [18, 25, 22, 32, 38, 57, 66] },
  { name: 'Channel 2', values: [53, 75, 50, 72, 65, 90, 80] },
  { name: 'Channel 3', values: [15, 17, 25, 25, 30, 50, 47] },
  { name: 'Channel 4', values: [35, 38, 46, 50, 50, 72, 74] },
];
const curveSingle = [{ name: 'Series', values: [18, 28, 31, 34, 47, 63, 69] }];
const curveMultiple = [
  { name: 'Channel 1', values: [18, 28, 31, 34, 47, 63, 69] },
  { name: 'Channel 2', values: [53, 67, 69, 61, 55, 55, 56] },
  { name: 'Channel 3', values: [28, 74, 82, 70, 51, 39, 35] },
  { name: 'Channel 4', values: [23, 25, 31, 40, 54, 71, 75] },
];

const AXIS_TITLES = { yTitle: 'Y-axis title', xTitle: 'X-axis title' };
const Chart = (props) => <LineChart categories={categories} {...props} />;
const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><Chart width={540} height={320} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Line Chart</Heading>
    <Body>
      Line charts are graphical representations of data points connected by straight lines. They are commonly used to display
      trends or patterns over time or across different categories. In a line chart, the horizontal axis typically represents the
      independent variable, such as time or categories, while the vertical axis represents the dependent variable, such as
      numerical values or frequencies.
    </Body>
    <Body>
      Each data point is plotted as a marker, and the lines connecting them provide a visual representation of the progression or
      relationship between the data points. Line charts are particularly effective for illustrating trends, fluctuations, or
      correlations in data, making them valuable tools for data analysis, forecasting, and communication.
    </Body>
    <Body>
      They are widely used to visualise time-series data, track performance metrics, and communicate insights to stakeholders.
      Line charts offer a clear and concise way to convey complex information, enabling users to derive actionable insights from
      their data.
    </Body>

    <Sub>Straight line</Sub>
    <Grid>
      <Fixed caption="Line chart-straight (single)" series={single} />
      <Fixed caption="Line chart-straight (multiple)" series={straightMultiple} />
    </Grid>

    <Sub>Curve line</Sub>
    <Grid>
      <Fixed caption="Line chart-curve (single)" curve="curve" series={curveSingle} />
      <Fixed caption="Line chart-curve (multiple)" curve="curve" series={curveMultiple} />
    </Grid>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

const hoverArgs = {
  args: { hoverMode: 'column', showLegend: false, showAxisTitles: false },
  argTypes: {
    showAxisTitles: { control: 'boolean', name: 'Show axis titles', description: 'Y-axis and X-axis titles' },
    showLegend: { control: 'boolean', name: 'Show legend (multiple lines)', description: 'Selectable legend: click an item to hide or show that line' },
    hoverMode: {
      name: 'Hover (multiple lines)',
      control: 'inline-radio',
      options: ['column', 'point'],
      description: "'column' lists every line at the hovered x; 'point' shows only the data point under the cursor",
    },
  },
};

const ChartPage = ({ title, curve, singleSeries, multipleSeries, hoverMode, showLegend, showAxisTitles }) => (
  <Page>
    <Heading>{title}</Heading>
    <Body>Hover a point to see its value. With multiple lines, use the Controls to switch the hover between the whole column and a single data point, to show a selectable legend that hides or shows each line, and to show axis titles.</Body>
    <Sub>Single line</Sub>
    <LiveDemo><Chart curve={curve} series={singleSeries} {...(showAxisTitles ? AXIS_TITLES : {})} /></LiveDemo>
    <Sub>Multiple lines</Sub>
    <LegendDemo showLegend={showLegend} seriesNames={multipleSeries.map((x) => x.name)} shape="line">
      {(hiddenSeries, highlighted) => <Chart curve={curve} series={multipleSeries} hoverMode={hoverMode} hiddenSeries={hiddenSeries} highlightedSeries={highlighted} {...(showAxisTitles ? AXIS_TITLES : {})} />}
    </LegendDemo>
  </Page>
);

export const StraightLine = {
  name: 'Straight line chart',
  ...hoverArgs,
  render: ({ hoverMode, showLegend, showAxisTitles }) => (
    <ChartPage title="Straight line chart" curve="straight" singleSeries={single} multipleSeries={straightMultiple} hoverMode={hoverMode} showLegend={showLegend} showAxisTitles={showAxisTitles} />
  ),
};

export const CurveLine = {
  name: 'Curve line chart',
  ...hoverArgs,
  render: ({ hoverMode, showLegend, showAxisTitles }) => (
    <ChartPage title="Curve line chart" curve="curve" singleSeries={curveSingle} multipleSeries={curveMultiple} hoverMode={hoverMode} showLegend={showLegend} showAxisTitles={showAxisTitles} />
  ),
};
