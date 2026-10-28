import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Circular gauge', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Circular gauge</Heading>
    <Body>A circular gauge is a small donut that fills clockwise from the top. It comes in three sizes: large (48), medium (32) and small (20).</Body>
    <Row>
      <Item caption="Large"><CircularGauge value={30} size="lg" /></Item>
      <Item caption="Medium"><CircularGauge value={30} size="md" /></Item>
      <Item caption="Small"><CircularGauge value={30} size="sm" /></Item>
    </Row>
    <Sub>Status</Sub>
    <Row>
      <Item caption="Positive"><CircularGauge value={72.8} status="positive" /></Item>
      <Item caption="Warning"><CircularGauge value={72.8} status="warning" /></Item>
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const CircularGaugeStory = {
  name: 'Circular gauge',
  args: { value: 30, size: 'lg', status: 'positive' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: 'select', options: ['lg', 'md', 'sm'] },
    status: { control: 'select', options: ['positive', 'warning'] },
  },
  render: (args) => (<Page><Heading>Circular gauge</Heading><CircularGauge {...args} /></Page>),
};
