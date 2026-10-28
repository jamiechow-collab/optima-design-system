import React from 'react';
import { PieChart } from '../../components/DataVis/PieChart';
import { Page, Heading, Sub, Body, Card, Grid, LegendDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Pie',
  parameters: { layout: 'padded' },
};

export default meta;

// slices run clockwise from 12 o'clock in the group 2 colour order (earth, lagoon, plum, sapphire, clay)
const data = [
  { name: 'Channel 1', label: 'Legend', value: 200 },
  { name: 'Channel 2', label: 'Legend', value: 200 },
  { name: 'Channel 3', label: 'Legend', value: 150 },
  { name: 'Channel 4', label: 'Legend', value: 450 },
  { name: 'Channel 5', label: 'Legend', value: 250 },
];

const Chart = (props) => <PieChart data={data} {...props} />;
const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><Chart width={405} height={280} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Pie Chart</Heading>
    <Body>
      Pie Charts are a classic form of circular statistical visualization, where data is presented in a circular shape, divided into
      slices to represent different categories or proportions. Each slice's size corresponds to the proportion of the whole it
      represents, making it easy to compare relative values at a glance. Unlike donut charts, pie charts do not have a central hole and
      utilize the entire circle to display data. They are commonly used to illustrate the composition of a whole and highlight the
      distribution of various categories within it. Pie charts are favored for their simplicity and effectiveness in conveying
      information, making them a popular choice for presentations, reports, and visualizations across various fields such as business,
      finance, and academia.
    </Body>

    <Sub>Type</Sub>
    <Grid>
      <Fixed caption="Pie chart - without percentage" />
      <Fixed caption="Pie chart - with percentage" showPercentage />
    </Grid>

    <Sub>Variants</Sub>
    <Grid>
      <Fixed caption="Pie chart - default (with data and value label)" showLabels />
      <Fixed caption="Pie chart - default (with value label only)" showLabels showLabelValue={false} />
    </Grid>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

export const Pie = {
  name: 'Pie chart',
  args: { showLegend: false, showPercentage: false, showLabels: false, showLabelValue: true },
  argTypes: {
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Selectable legend: click an item to hide or show that slice' },
    showPercentage: { control: 'boolean', name: 'Show percentage', description: 'Share of the whole inside each slice (hidden on slices too thin to fit it)' },
    showLabels: { control: 'boolean', name: 'Show data label', description: 'Labels outside the pie, joined to their slice by a leader line' },
    showLabelValue: { control: 'boolean', name: 'Show data under data label', description: 'Adds each slice’s value above its label (needs the data label to be shown)' },
  },
  render: (args) => (
    <Page>
      <Heading>Pie chart</Heading>
      <Body>
        Hover a slice to see its share, value and rank; the other slices switch to their dismissed colour. Use the Controls to choose what
        is shown: the percentage inside each slice, and the data labels around the pie (with or without values).
      </Body>
      <LegendDemo showLegend={args.showLegend} seriesNames={data.map((d) => d.name)} shape="filled">
        {(hiddenSlices, highlighted) => <Chart {...args} padding={args.showLabels ? 40 : 24} hiddenSlices={hiddenSlices} highlightedSlice={highlighted} />}
      </LegendDemo>
    </Page>
  ),
};
