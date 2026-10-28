import React from 'react';
import { SankeyChart } from '../../components/DataVis/SankeyChart';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Sankey diagram',
  parameters: { layout: 'padded' },
};

export default meta;

// Where visitors come from, where they land and what they do. Values are made-up visits.
const journey = {
  nodes: [
    { id: 'search', name: 'Search' },
    { id: 'social', name: 'Social' },
    { id: 'email', name: 'Email' },
    { id: 'direct', name: 'Direct' },
    { id: 'home', name: 'Home' },
    { id: 'product', name: 'Product' },
    { id: 'pricing', name: 'Pricing' },
    { id: 'purchase', name: 'Purchase' },
    { id: 'signup', name: 'Sign-up' },
    { id: 'leave', name: 'Left site' },
  ],
  links: [
    { source: 'search', target: 'home', value: 420 },
    { source: 'search', target: 'product', value: 680 },
    { source: 'search', target: 'pricing', value: 160 },
    { source: 'social', target: 'home', value: 250 },
    { source: 'social', target: 'product', value: 320 },
    { source: 'email', target: 'product', value: 190 },
    { source: 'email', target: 'pricing', value: 210 },
    { source: 'direct', target: 'home', value: 340 },
    { source: 'direct', target: 'pricing', value: 120 },
    { source: 'home', target: 'signup', value: 180 },
    { source: 'home', target: 'leave', value: 830 },
    { source: 'product', target: 'purchase', value: 400 },
    { source: 'product', target: 'leave', value: 790 },
    { source: 'pricing', target: 'purchase', value: 210 },
    { source: 'pricing', target: 'signup', value: 150 },
    { source: 'pricing', target: 'leave', value: 130 },
  ],
};

const twoColumns = {
  nodes: [
    { id: 'north', name: 'North' },
    { id: 'south', name: 'South' },
    { id: 'west', name: 'West' },
    { id: 'retail', name: 'Retail' },
    { id: 'online', name: 'Online' },
  ],
  links: [
    { source: 'north', target: 'retail', value: 60 },
    { source: 'north', target: 'online', value: 25 },
    { source: 'south', target: 'retail', value: 35 },
    { source: 'south', target: 'online', value: 45 },
    { source: 'west', target: 'online', value: 55 },
  ],
};

const fourColumns = {
  nodes: [
    { id: 'a1', name: 'Ads' },
    { id: 'a2', name: 'Organic' },
    { id: 'b1', name: 'Visit' },
    { id: 'b2', name: 'Browse' },
    { id: 'c1', name: 'Add to basket' },
    { id: 'c2', name: 'Wishlist' },
    { id: 'd1', name: 'Bought' },
    { id: 'd2', name: 'Abandoned' },
  ],
  links: [
    { source: 'a1', target: 'b1', value: 500 },
    { source: 'a2', target: 'b1', value: 300 },
    { source: 'a2', target: 'b2', value: 400 },
    { source: 'b1', target: 'c1', value: 420 },
    { source: 'b1', target: 'c2', value: 150 },
    { source: 'b1', target: 'd2', value: 230 },
    { source: 'b2', target: 'c1', value: 180 },
    { source: 'b2', target: 'c2', value: 120 },
    { source: 'b2', target: 'd2', value: 100 },
    { source: 'c1', target: 'd1', value: 360 },
    { source: 'c1', target: 'd2', value: 240 },
    { source: 'c2', target: 'd1', value: 90 },
    { source: 'c2', target: 'd2', value: 180 },
  ],
};

const DATASETS = { 'Customer journey (3 columns)': journey, 'Regions to channels (2 columns)': twoColumns, 'Shopping funnel (4 columns)': fourColumns };

const Fixed = ({ caption, data, ...props }) => (
  <Card caption={caption}><SankeyChart width={540} height={320} nodes={data.nodes} links={data.links} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Sankey diagram</Heading>
    <Body>
      Sankey diagrams, also called alluvial diagrams, show how a quantity flows between stages. Nodes stand for the categories at each
      stage and the ribbons between them are as wide as the amount that flows from one to the other, so the biggest flows and the main
      routes are visible at a glance. They suit journeys, funnels and allocations, such as where visitors come from, where they land and
      what they do next.
    </Body>

    <Sub>Default</Sub>
    <Grid>
      <Fixed caption="Sankey diagram - default" data={journey} />
      <Fixed caption="Sankey diagram - with values" data={journey} showValues />
    </Grid>

    <Sub>Columns</Sub>
    <Grid>
      <Fixed caption="Sankey diagram - two columns" data={twoColumns} />
      <Fixed caption="Sankey diagram - four columns" data={fourColumns} />
    </Grid>

    <Sub>Behaviour</Sub>
    <Body>
      <b>Hover.</b> Hovering a node lights its flows: its ribbons switch from the dismissed to the default colour while every other
      ribbon stays dismissed. Hovering a single ribbon lights just that flow. The nodes always keep their default colour. The tooltip for a node lists where its flow goes (or where it comes from, for the last column); for a ribbon it shows the flow and its
      share of each node.
    </Body>
    <Body>
      <b>Labels.</b> Nodes are labelled directly rather than through a legend, following the IBM Carbon guidance to label data where
      there is room. The first column&rsquo;s labels sit on the left, the last column&rsquo;s on the right and the middle ones beside their
      node. Labels are Caption/regular in the primary text colour, and a value after a label is Caption/regular in the disabled text colour.
    </Body>
    <Body>
      <b>Colour.</b> Each node has a colour from the data visualisation palette and its ribbons take the colour of the node they leave,
      resting in the dismissed shade so the nodes lead. Nodes are ordered inside each column to keep crossing ribbons to a minimum.
    </Body>
    <Body>
      <b>Use with care.</b> A Sankey only shows the flow between neighbouring stages; it says nothing about nodes that are not directly
      linked. Keep the number of nodes small (around ten or fewer per column) so labels and ribbons stay readable.
    </Body>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

export const Sankey = {
  name: 'Sankey diagram',
  args: { dataset: 'Customer journey (3 columns)', showValues: false },
  argTypes: {
    dataset: { control: 'select', options: Object.keys(DATASETS), name: 'Data', description: 'Sample data with 2, 3 or 4 columns' },
    showValues: { control: 'boolean', name: 'Show values', description: 'Adds each node’s total to its label' },
  },
  render: ({ dataset, showValues }) => (
    <Page>
      <Heading>Sankey diagram</Heading>
      <Body>
        Hover a node to light its flows, or hover a ribbon to see one flow and its share of the nodes it joins. The lit ribbons take the
        default colour and the rest stay dismissed. Use the Controls to change the data and to add values to the labels.
      </Body>
      <LiveDemo min={260}>
        <SankeyChart nodes={DATASETS[dataset].nodes} links={DATASETS[dataset].links} showValues={showValues} />
      </LiveDemo>
    </Page>
  ),
};
