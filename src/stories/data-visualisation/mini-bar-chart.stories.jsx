import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';
import { MiniProgressBar } from '../../components/DataVis/MiniCharts';

export default { title: 'Data Visualisation/Mini-charts/Bar chart', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Bar chart</Heading>
    <Body>
      A mini bar chart is a row of progress bars, each 6 px wide with a 5 px gap. A bar fills from the bottom; a bar with no value stays
      an empty track. Eight bars measure 83 × 32.
    </Body>
    <Sub>Progress bar</Sub>
    <Row>
      <Item caption="Empty"><MiniProgressBar value={null} /></Item>
      <Item caption="With progress"><MiniProgressBar value={0.6} /></Item>
    </Row>
    <Sub>Bar chart</Sub>
    <Row>
      <Item caption="With axes"><MiniBarChart data={BARS} /></Item>
      <Item caption="Without axes"><MiniBarChart data={BARS} showAxes={false} /></Item>
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const MiniBarChartStory = {
  name: 'Bar chart',
  args: { showAxes: true },
  argTypes: { showAxes: { control: 'boolean' } },
  render: (args) => (<Page><Heading>Bar chart</Heading><MiniBarChart data={BARS} {...args} /></Page>),
};
