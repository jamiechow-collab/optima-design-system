import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Star review', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Star review</Heading>
    <Body>A star review shows a rating out of five. Filled stars use Tide and the rest sit back in grey. It comes in one size, 68 × 12.</Body>
    <Row>
      {[5, 4, 3, 2, 1].map((n) => <Item key={n} caption={`${n} star${n > 1 ? 's' : ''}`}><StarReview value={n} /></Item>)}
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const StarReviewStory = {
  name: 'Star review',
  args: { value: 4 },
  argTypes: { value: { control: { type: 'range', min: 0, max: 5, step: 1 } } },
  render: (args) => (<Page><Heading>Star review</Heading><StarReview {...args} /></Page>),
};
