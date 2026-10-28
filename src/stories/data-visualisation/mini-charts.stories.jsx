import React from 'react';
import { Page, Heading, Sub, Body } from './chartDocs';
import { SPARK, BARS, BARS_ALT, heat, Row, Item, Sparkline, StarReview, LinearGauge, CircularGauge, MiniBarChart, MiniHeatmap } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Docs', parameters: { layout: 'padded' } };

const Docs = () => (
  <Page>
    <Heading>Mini-charts</Heading>
    <Body>
      Mini-charts are compact visual tools used on dashboards to display trends, variations, or performance at a glance without cluttering
      the interface. They have no legend, tooltip or labels: the value they belong to is always written next to them, for example in a
      score card or a table cell.
    </Body>

    <Sub>Sparkline</Sub>
    <Row>
      <Item caption="Area with gradient (with axes)"><Sparkline data={SPARK} variant="area-gradient" /></Item>
      <Item caption="Area with gradient (without axes)"><Sparkline data={SPARK} variant="area-gradient" showAxes={false} /></Item>
    </Row>
    <div style={{ height: 16 }} />
    <Row>
      <Item caption="Area with filled (with axes)"><Sparkline data={SPARK} variant="area-filled" /></Item>
      <Item caption="Area with filled (without axes)"><Sparkline data={SPARK} variant="area-filled" showAxes={false} /></Item>
    </Row>
    <div style={{ height: 16 }} />
    <Row>
      <Item caption="Line (with axes)"><Sparkline data={SPARK} variant="line" /></Item>
      <Item caption="Line (without axes)"><Sparkline data={SPARK} variant="line" showAxes={false} /></Item>
    </Row>

    <Sub>Star review</Sub>
    <Row>
      <Item caption="5 stars"><StarReview value={5} /></Item>
      <Item caption="3 stars"><StarReview value={3} /></Item>
      <Item caption="1 star"><StarReview value={1} /></Item>
    </Row>

    <Sub>Linear gauge</Sub>
    <Row>
      <Item caption="Below average"><LinearGauge value={30} target={50} /></Item>
      <Item caption="Above average"><LinearGauge value={70} target={50} /></Item>
    </Row>

    <Sub>Circular gauge</Sub>
    <Row>
      <Item caption="Large"><CircularGauge value={30} size="lg" /></Item>
      <Item caption="Medium"><CircularGauge value={30} size="md" /></Item>
      <Item caption="Small"><CircularGauge value={30} size="sm" /></Item>
    </Row>

    <Sub>Bar chart</Sub>
    <Row>
      <Item caption="Bar chart (with axes)"><MiniBarChart data={BARS} /></Item>
      <Item caption="Bar chart (without axes)"><MiniBarChart data={BARS} showAxes={false} /></Item>
      <Item caption="Example of different dataset"><MiniBarChart data={BARS_ALT} /></Item>
    </Row>

    <Sub>Heatmap</Sub>
    <Row>
      <Item caption="30×10"><MiniHeatmap values={heat(10, 30)} /></Item>
      <Item caption="20×10"><MiniHeatmap values={heat(10, 20)} /></Item>
      <Item caption="10×5"><MiniHeatmap values={heat(5, 10)} /></Item>
      <Item caption="7×4"><MiniHeatmap values={heat(4, 7)} /></Item>
    </Row>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };
