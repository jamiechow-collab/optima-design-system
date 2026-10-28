import React from 'react';
import { AreaChart } from '../../components/DataVis/AreaChart';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo, LegendDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Area',
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
// stacked: each series is one layer, first series on top; the axis scales to the stack total
const straightStacked = [
  { name: 'Channel 1', values: [20, 11, 15, 5, 7, 6, 4] },
  { name: 'Channel 2', values: [14, 28, 17, 22, 28, 22, 5] },
  { name: 'Channel 3', values: [12, 11, 10, 12, 11, 12, 9] },
  { name: 'Channel 4', values: [2, 4, 2, 5, 5, 6, 16] },
  { name: 'Channel 5', values: [12, 14, 19, 19, 24, 38, 36] },
];
const curveStacked = [
  { name: 'Channel 1', values: [5, 3, 14, 33, 32, 25, 22] },
  { name: 'Channel 2', values: [8, 11, 14, 17, 17, 18, 18] },
  { name: 'Channel 3', values: [18, 21, 17, 10, 6, 5, 6] },
  { name: 'Channel 4', values: [8, 4, 7, 11, 11, 12, 11] },
  { name: 'Channel 5', values: [10, 6, 4, 6, 12, 15, 14] },
];

const Chart = (props) => <AreaChart categories={categories} {...props} />;
const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><Chart width={540} height={320} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Area Chart</Heading>
    <Body>
      Area Charts are a type of graph used to visualise quantitative data graphically. They are similar to line charts but emphasise
      the volume beneath the line by filling the area between the axis and the line with colour or a pattern. This filled area helps to
      highlight the magnitude of values over time, making Area Charts particularly useful for showing trends in data at a glance, such
      as volumes or demographic information over intervals.
    </Body>
    <Body>
      These charts are beneficial for comparing multiple datasets to see how volumes change over time relative to each other. For
      instance, they can effectively illustrate the growth of multiple product lines in a business or fluctuations in resource usage in
      different departments.
    </Body>
    <Body>
      In designing Area Charts, it's essential to maintain clear, uncluttered visuals, especially when dealing with multiple overlapping
      areas. Options such as stacking the areas (Stacked Area Charts) can provide different perspectives and insights into the data,
      depending on the specific requirements of the analysis.
    </Body>
    <Body>
      Area Charts offer an intuitive and visually impactful way to present cumulative data series, making complex information more
      accessible and easier to understand.
    </Body>

    <Sub>Straight - Standard</Sub>
    <Grid>
      <Fixed caption="Area chart-straight (single) - standard" series={single} />
      <Fixed caption="Area chart-straight (multiple) - standard" series={straightMultiple.slice(0, 3)} />
    </Grid>

    <Sub>Straight - Stacked</Sub>
    <Grid>
      <Fixed caption="Area chart-straight (multiple) - stacked" stacked series={straightStacked} />
    </Grid>

    <Sub>Curve - Standard</Sub>
    <Grid>
      <Fixed caption="Area chart-curve (single) - standard" curve="curve" series={curveSingle} />
      <Fixed caption="Area chart-curve (multiple) - standard" curve="curve" series={curveMultiple.slice(0, 3)} />
    </Grid>

    <Sub>Curve - Stacked</Sub>
    <Grid>
      <Fixed caption="Area chart-curve (multiple) - stacked" curve="curve" stacked series={curveStacked} />
    </Grid>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

const args = { showLegend: false };
const argTypes = {
  showLegend: { control: 'boolean', name: 'Show legend (multiple areas)', description: 'Selectable legend: click an item to hide or show that area' },
};

const ChartPage = ({ title, curve, singleSeries, multipleSeries, stackedSeries, showLegend }) => (
  <Page>
    <Heading>{title}</Heading>
    <Body>
      Hover to see values. In a standard chart with several areas, hovering picks the area nearest the cursor and the others switch to
      their dismissed colour; in a stacked chart the tooltip lists every layer at that point. Use the Controls to show a selectable legend
      that hides or shows each area.
    </Body>
    <Sub>Standard - single</Sub>
    <LiveDemo><Chart curve={curve} series={singleSeries} /></LiveDemo>
    <Sub>Standard - multiple</Sub>
    <LegendDemo showLegend={showLegend} seriesNames={multipleSeries.map((x) => x.name)} shape="filled">
      {(hiddenSeries, highlighted) => <Chart curve={curve} series={multipleSeries} hiddenSeries={hiddenSeries} highlightedSeries={highlighted} />}
    </LegendDemo>
    <Sub>Stacked</Sub>
    <LegendDemo showLegend={showLegend} seriesNames={stackedSeries.map((x) => x.name)} shape="filled">
      {(hiddenSeries, highlighted) => <Chart curve={curve} stacked series={stackedSeries} hiddenSeries={hiddenSeries} highlightedSeries={highlighted} />}
    </LegendDemo>
  </Page>
);

export const StraightArea = {
  name: 'Straight area chart',
  args,
  argTypes,
  render: ({ showLegend }) => (
    <ChartPage title="Straight area chart" curve="straight" singleSeries={single} multipleSeries={straightMultiple} stackedSeries={straightStacked} showLegend={showLegend} />
  ),
};

export const CurveArea = {
  name: 'Curve area chart',
  args,
  argTypes,
  render: ({ showLegend }) => (
    <ChartPage title="Curve area chart" curve="curve" singleSeries={curveSingle} multipleSeries={curveMultiple} stackedSeries={curveStacked} showLegend={showLegend} />
  ),
};
