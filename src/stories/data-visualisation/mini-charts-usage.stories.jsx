import React from 'react';
import { Table } from '../../components/Table/Table';
import { ScoreCard } from '../../components/DataVis/ScoreCard';
import { Page, Heading, Sub, Body } from './chartDocs';
import { Row, miniChartFor } from './miniChartSamples';

export default { title: 'Data Visualisation/Mini-charts/Usage examples', parameters: { layout: 'padded' } };

const CARDS = [
  { type: 'bar', value: '59,551k' },
  { type: 'sparkline', value: '59,551k' },
  { type: 'circular', value: '72.8%' },
  { type: 'linear', value: '1.46x' },
  { type: 'stars', value: '80%' },
];

const ROWS = [
  { id: '1', name: 'Report 1', code: '00112233', ...CARDS[0] },
  { id: '2', name: 'Report 2', code: '00112233', ...CARDS[1] },
  { id: '3', name: 'Report 3', code: '00112233', ...CARDS[2] },
  { id: '4', name: 'Report 4', code: '00112233', ...CARDS[3] },
  { id: '5', name: 'Report 5', code: '00112233', ...CARDS[4] },
];

const COLUMNS = [
  { key: 'name', label: 'Name', width: 220, showMenuControl: true },
  { key: 'code', label: 'ID', width: 200, showMenuControl: true },
  {
    key: 'performance',
    label: 'Performance',
    width: 220,
    showMenuControl: true,
    render: (row) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
        <span>{row.value}</span>
        {miniChartFor(row.type)}
      </span>
    ),
  },
];

const Usage = () => (
  <Page>
    <Heading>Usage examples</Heading>
    <Body>
      Mini-charts sit next to the value they describe. In a score card the chart is beside the value; in a table cell it follows the value
      in the row.
    </Body>

    <Sub>Score cards</Sub>
    <Row>
      {CARDS.map((c) => <ScoreCard key={c.type} label="Label" value={c.value} miniChart={miniChartFor(c.type)} />)}
    </Row>

    <Sub>Table</Sub>
    <Table size="sm" columns={COLUMNS} rows={ROWS} rowKey={(r) => r.id} />
  </Page>
);

export const UsageExamples = { name: 'Usage examples', render: () => <Usage /> };
