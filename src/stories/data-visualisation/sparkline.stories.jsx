import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Sparkline', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Sparkline</Heading>
    <Body>A sparkline is a small trend line, 163 × 35. It has three types and an optional pair of axis lines.</Body>
    <Sub>Type</Sub>
    <Row>
      <Item caption="Line"><Sparkline data={SPARK} variant="line" /></Item>
      <Item caption="Area with gradient"><Sparkline data={SPARK} variant="area-gradient" /></Item>
      <Item caption="Area with filled"><Sparkline data={SPARK} variant="area-filled" /></Item>
    </Row>
    <Sub>Axes</Sub>
    <Body>The axes are plain lines, a baseline and a left edge, with no labels or ticks. Turn them off when the sparkline sits in a tight space.</Body>
    <Row>
      <Item caption="With axes"><Sparkline data={SPARK} /></Item>
      <Item caption="Without axes"><Sparkline data={SPARK} showAxes={false} /></Item>
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const SparklineStory = {
  name: 'Sparkline',
  args: { variant: 'area-gradient', showAxes: true, width: 163, height: 35 },
  argTypes: {
    variant: { control: 'select', options: ['line', 'area-gradient', 'area-filled'] },
    showAxes: { control: 'boolean' },
    width: { control: { type: 'number', min: 60, max: 400 } },
    height: { control: { type: 'number', min: 20, max: 100 } },
  },
  render: (args) => (<Page><Heading>Sparkline</Heading><Sparkline data={SPARK} {...args} /></Page>),
};
