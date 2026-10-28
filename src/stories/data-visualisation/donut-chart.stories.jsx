import React from 'react';
import { DonutChart } from '../../components/DataVis/DonutChart';
import { Page, Heading, Sub, Body, Card, Grid, LegendDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Donut',
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

const Chart = (props) => <DonutChart data={data} total="1,250" {...props} />;
const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><Chart width={405} height={280} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Donut chart</Heading>
    <Body>
      Donut charts are a type of circular statistical graphic, similar to pie charts, but with a central hole. They display data in a
      ring shape, where the arc length of each slice corresponds to the proportion of the whole it represents. The central area of the
      chart remains empty, allowing for additional information or annotations. Donut charts are often used to illustrate the breakdown
      of a whole into its constituent parts, making it easy to compare the relative sizes of different categories at a glance. They are
      popular for displaying data sets with a small number of categories and are commonly employed in business presentations, financial
      reports, and dashboards for their simplicity and visual appeal.
    </Body>

    <Sub>Types</Sub>
    <Grid>
      <Fixed caption="Donut chart - without percentage" />
      <Fixed caption="Donut chart - with percentage" showPercentage />
    </Grid>

    <Sub>Variants</Sub>
    <Grid>
      <Fixed caption="Donut chart - default (with total value and metric label)" />
      <Fixed caption="Donut chart - default (with total value only)" showMetricLabel={false} />
      <Fixed caption="Donut chart - default (with data and value label)" showLabels />
      <Fixed caption="Donut chart - default (with value label only)" showLabels showLabelValue={false} showMetricLabel={false} />
    </Grid>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

export const Donut = {
  name: 'Donut chart',
  args: { showLegend: false, showPercentage: false, showTotal: true, showMetricLabel: true, showLabels: false, showLabelValue: true },
  argTypes: {
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Selectable legend: click an item to hide or show that slice' },
    showPercentage: { control: 'boolean', name: 'Show percentage', description: 'Share of the whole inside each slice (hidden on slices too thin to fit it)' },
    showTotal: { control: 'boolean', name: 'Show total number', description: 'Total in the centre of the donut' },
    showMetricLabel: { control: 'boolean', name: 'Show metric label', description: 'Label under the total (needs the total to be shown)' },
    showLabels: { control: 'boolean', name: 'Show data label', description: 'Labels outside the ring, joined to their slice by a leader line' },
    showLabelValue: { control: 'boolean', name: 'Show data under data label', description: 'Adds each slice’s value above its label (needs the data label to be shown)' },
  },
  render: (args) => (
    <Page>
      <Heading>Donut chart</Heading>
      <Body>
        Hover a slice to see its share, value and rank; the other slices switch to their dismissed colour. Use the Controls to choose what
        is shown: the percentage, the total and metric label in the centre, and the data labels around the ring (with or without values).
      </Body>
      <LegendDemo showLegend={args.showLegend} seriesNames={data.map((d) => d.name)} shape="filled">
        {(hiddenSlices, highlighted) => (
          <Chart {...args} padding={args.showLabels ? 40 : 24} hiddenSlices={hiddenSlices} highlightedSlice={highlighted} total={data.filter((_, i) => !hiddenSlices.includes(i)).reduce((sum, d) => sum + d.value, 0).toLocaleString()} />
        )}
      </LegendDemo>
    </Page>
  ),
};
