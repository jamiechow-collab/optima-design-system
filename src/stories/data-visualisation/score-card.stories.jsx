import React from 'react';
import { ScoreCard } from '../../components/DataVis/ScoreCard';
import { Page, Heading, Sub, Body } from './chartDocs';
import { Row, Item, miniChartFor } from './miniChartSamples';

export default { title: 'Data Visualisation/Score cards/Docs', parameters: { layout: 'padded' } };

const noop = () => {};

const Docs = () => (
  <Page>
    <Heading>Score cards</Heading>
    <Body>
      Score cards tell us how we are doing against our target. They give a bird’s-eye view of overall business performance and a holistic
      perspective to help investigate performance. Each card has a label, one headline value and, optionally, a mini-chart.
    </Body>

    <Sub>Label on top</Sub>
    <Row>
      <Item caption="Default score card (with mini-chart)"><ScoreCard label="Label" value="59,551k" miniChart={miniChartFor('bar')} /></Item>
      <Item caption="Default score card (without mini-chart)"><ScoreCard label="Label" value="59,551k" /></Item>
    </Row>

    <Sub>Label at the bottom</Sub>
    <Body>The label can sit at the bottom if that fits the reading flow better.</Body>
    <Row>
      <Item caption="Score card with bottom label"><ScoreCard labelPosition="bottom" label="Label" value="59,551k" miniChart={miniChartFor('bar')} /></Item>
    </Row>

    <Sub>Long labels</Sub>
    <Body>The title label is always visible by default. It truncates on hover to make room for the AI and info buttons.</Body>
    <Row>
      <Item caption="Default"><ScoreCard label="Cost per transaction" value="59,551k" miniChart={miniChartFor('bar')} /></Item>
    </Row>

    <Sub>Actions</Sub>
    <Body>
      Hovering or focusing a card reveals an AI button and an info button, both xs inline icon-only buttons. They appear when the
      <code> onAIClick </code> and <code> onInfoClick </code> callbacks are passed.
    </Body>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <Docs /> };

export const ScoreCardStory = {
  name: 'Score card',
  args: { label: 'Label', value: '59,551k', labelPosition: 'top', miniChart: 'bar', actions: true },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    labelPosition: { control: 'inline-radio', options: ['top', 'bottom'] },
    miniChart: { control: 'select', options: ['none', 'bar', 'sparkline', 'circular', 'linear', 'stars'], name: 'Mini-chart' },
    actions: { control: 'boolean', name: 'AI and info buttons', description: 'Pass onAIClick and onInfoClick, shown on hover' },
  },
  render: ({ label, value, labelPosition, miniChart, actions }) => (
    <Page>
      <Heading>Score card</Heading>
      <Body>Hover the card to see the border and the AI and info buttons.</Body>
      <ScoreCard
        label={label}
        value={value}
        labelPosition={labelPosition}
        miniChart={miniChart === 'none' ? null : miniChartFor(miniChart)}
        onAIClick={actions ? noop : undefined}
        onInfoClick={actions ? noop : undefined}
      />
    </Page>
  ),
};
