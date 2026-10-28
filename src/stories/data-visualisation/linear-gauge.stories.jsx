import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Linear gauge', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Linear gauge</Heading>
    <Body>
      A linear gauge compares one value with a target. The tick marks the target. Below it the bar is warning (orange); at or above it,
      positive (green). It is 60 × 20.
    </Body>
    <Row>
      <Item caption="Below average"><LinearGauge value={30} target={50} /></Item>
      <Item caption="Above average"><LinearGauge value={70} target={50} /></Item>
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const LinearGaugeStory = {
  name: 'Linear gauge',
  args: { value: 30, target: 50, max: 100 },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    target: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: false },
  },
  render: (args) => (<Page><Heading>Linear gauge</Heading><LinearGauge {...args} /></Page>),
};
