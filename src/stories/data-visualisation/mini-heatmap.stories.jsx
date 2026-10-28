import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';
import { MiniCell } from '../../components/DataVis/MiniCharts';

export default { title: 'Data Visualisation/Mini-charts/Heatmap', parameters: { layout: 'padded' } };

const SIZES = { '30 × 10': heat(10, 30), '20 × 10': heat(10, 20), '10 × 5': heat(5, 10), '7 × 4': heat(4, 7) };

const Docs = () => (
  <Page>
    <Heading>Heatmap</Heading>
    <Body>
      A mini heatmap is a grid of 8 px cells with a 1 px gap. The range of values is split into four equal bins and the bigger the value,
      the darker the cell. There are no labels, axes or hover state.
    </Body>
    <Sub>Mini cell</Sub>
    <Row>
      {[0, 1, 2, 3].map((s) => <Item key={s} caption={['Darkest', 'Dark', 'Light', 'Lightest'][s]}><MiniCell shade={s} /></Item>)}
    </Row>
    <Sub>Heatmap</Sub>
    <Row>
      {Object.entries(SIZES).map(([k, v]) => <Item key={k} caption={k.replace(' × ', '×')}><MiniHeatmap values={v} /></Item>)}
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const MiniHeatmapStory = {
  name: 'Heatmap',
  args: { size: '20 × 10' },
  argTypes: { size: { control: 'select', options: Object.keys(SIZES), name: 'Grid size (columns × rows)' } },
  render: ({ size }) => (<Page><Heading>Heatmap</Heading><MiniHeatmap values={SIZES[size]} /></Page>),
};
