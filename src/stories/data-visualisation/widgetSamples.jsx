import React from 'react';
import { ComboChart } from '../../components/DataVis/ComboChart';
import { comboLineColour } from '../../components/DataVis/ComboChart/ComboChart';
import { DonutChart } from '../../components/DataVis/DonutChart';
import { BarChart } from '../../components/DataVis/BarChart';
import { LineChart } from '../../components/DataVis/LineChart';
import { AreaChart } from '../../components/DataVis/AreaChart';
import { datavisVar } from '../../components/DataVis/BarChart/BarChart';
import { Table } from '../../components/Table/Table';
import typography from '../../tokens/typography';

const data2 = typography.data['regular-2']; // Sora 20/24

// Every sample below is a "block" for the Widget: { content, legend, ... }.
// content is a function ({ hidden }) => chart, where `hidden` lists the legend items the user has switched off (in legend order);
// legend is the list of items the widget turns into a clickable legend. Swapping the chart = swapping the block.

const CHARCOAL = datavisVar(1, 'group1', 'default'); // group-1 / charcoal-default

/** Bars + a solid line on the left axis, a dotted line on the right axis (the Figma frames' main chart). */
export const mainChartBlock = {
  content: ({ hidden, highlighted }) => (
    <ComboChart
      categories={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
      lines={[{ name: 'Total Reach', values: [19, 24, 20, 25] }, { name: 'Frequency', values: [3.2, 4.5, 3.4, 4.5], axis: 'right' }]}
      series={[{ name: 'Item', values: [24, 19, 9, 29] }]}
      hiddenLines={[0, 1].filter((i) => hidden.includes(i))}
      hiddenSeries={hidden.includes(2) ? [0] : []}
      layerColours={[{ group: 'group1', index: 1 }]}
      highlighted={highlighted === null ? null : highlighted === 2 ? { kind: 'series', index: 0 } : { kind: 'line', index: highlighted }}
      max={50}
      tickStep={10}
      formatValue={(v) => `${v}%`}
      rightAxis={{ max: 5, format: (v) => String(v) }}
      yTitle="Total Reach (%)"
      yTitleRight="Frequency"
    />
  ),
  legend: [
    { label: 'Total Reach', colour: comboLineColour(false), shape: 'line' },
    { label: 'Frequency', colour: comboLineColour(false), shape: 'dotted' },
    { label: 'Item', colour: CHARCOAL, shape: 'filled' },
  ],
};

const DONUT_SLICES = [
  { name: 'Label', value: 15 },
  { name: 'Label', value: 85, colourRef: { group: 'group1', index: 1 } },
];

/** Priority 2 of the Figma frames: a donut that fills its block, centred in it. */
export const donutBlock = {
  content: ({ hidden, highlighted }) => (
    <DonutChart
      data={DONUT_SLICES}
      hiddenSlices={hidden}
      highlightedSlice={highlighted}
      padding={0}
      showTooltip={false}
      total={`${DONUT_SLICES.filter((_, i) => !hidden.includes(i)).reduce((sum, d) => sum + d.value, 0)}K`}
    />
  ),
  legend: [
    { label: 'Label', colour: datavisVar(0, 'group2', 'default'), shape: 'filled' },
    { label: 'Label', colour: CHARCOAL, shape: 'filled' },
  ],
};

const FIGURES = [['Label', '10%'], ['Long label', '2.5'], ['Label', '3.4'], ['Longer label here', '20']];

const Figure = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
    <span style={{ fontSize: 14, lineHeight: '20px', color: 'var(--color-text-placeholder, #545454)', overflowWrap: 'break-word' }}>{label}</span>
    <span style={{ fontFamily: data2.fontFamily, fontWeight: data2.fontWeight, fontSize: data2.fontSize, lineHeight: `${data2.lineHeight}px`, color: 'var(--color-text-primary, #222)' }}>{value}</span>
  </div>
);

/** Priority 3: label + headline figure pairs. A column in the horizontal layout (a long label wraps and the column grows), a row across the top in the vertical one. */
export const keyFiguresBlock = {
  content: ({ layout }) => {
    if (layout !== 'vertical') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg, 16px)' }}>
          {[FIGURES[0], ['Longer label here', '2.5'], FIGURES[2]].map(([label, value], i) => <Figure key={i} label={label} value={value} />)}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 48px' }}>
        {FIGURES.map(([label, value], i) => <Figure key={i} label={label} value={value} />)}
      </div>
    );
  },
};

// ── Other chart types, for the "Swap the chart" story ────────────────────────
const AXIS_TITLES = { yTitle: 'Y-axis title', xTitle: 'X-axis title' }; // for the demo
const CATEGORIES = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];
const CHANNELS = [
  { name: 'Channel 1', values: [18, 25, 22, 32, 38, 57, 66] },
  { name: 'Channel 2', values: [53, 75, 50, 72, 65, 90, 80] },
  { name: 'Channel 3', values: [15, 17, 25, 25, 30, 50, 47] },
  { name: 'Channel 4', values: [35, 38, 46, 50, 50, 72, 74] },
];
const channelLegend = (shape) => CHANNELS.map((c, i) => ({ label: c.name, colour: datavisVar(i, 'group2', 'default'), shape }));
const BAR_VALUES = [32.5, 25.5, 11.4, 39.1, 25.1, 45.8, 18.5];
const PIE_SLICES = ['Direct', 'Search', 'Social', 'Email', 'Referral'].map((name, i) => ({ name, value: [34, 26, 18, 14, 8][i] }));

export const CHART_SAMPLES = {
  'Combo (bar + lines)': mainChartBlock,
  Bar: {
    content: ({ hidden, highlighted }) => (
      <BarChart
        data={CATEGORIES.map((label, i) => ({ label, value: BAR_VALUES[i], colourIndex: i })).filter((_, i) => !hidden.includes(i))}
        colourBy="category"
        highlightedSeries={highlighted}
        group="group2"
        max={60}
        tickStep={10}
        {...AXIS_TITLES}
      />
    ),
    legend: CATEGORIES.map((label, i) => ({ label, colour: datavisVar(i, 'group2', 'default'), shape: 'filled' })),
  },
  Line: {
    content: ({ hidden, highlighted }) => <LineChart categories={CATEGORIES} series={CHANNELS} hiddenSeries={hidden} highlightedSeries={highlighted} {...AXIS_TITLES} />,
    legend: channelLegend('line'),
  },
  Area: {
    content: ({ hidden, highlighted }) => <AreaChart categories={CATEGORIES} series={CHANNELS} hiddenSeries={hidden} highlightedSeries={highlighted} {...AXIS_TITLES} />,
    legend: channelLegend('filled'),
  },
  Donut: {
    content: ({ hidden, highlighted }) => <DonutChart data={PIE_SLICES} hiddenSlices={hidden} highlightedSlice={highlighted} showPercentage padding={32} />,
    legend: PIE_SLICES.map((d, i) => ({ label: d.name, colour: datavisVar(i, 'group2', 'default'), shape: 'filled' })),
  },
};

/** The data behind the sample chart, shown when the list button is clicked. */
const TABLE_ROWS = [
  { item: 'Item 1', reach: '19%', frequency: '3.2', value: '24%' },
  { item: 'Item 2', reach: '24%', frequency: '4.5', value: '19%' },
  { item: 'Item 3', reach: '20%', frequency: '3.4', value: '9%' },
  { item: 'Item 4', reach: '25%', frequency: '4.5', value: '29%' },
];
// `fill` stretches the table to the modal's content width; the widths are proportions.
const TABLE_COLUMNS = [
  { key: 'item', label: 'Item', width: 174, resizable: false },
  { key: 'reach', label: 'Total Reach (%)', align: 'right', width: 160, resizable: false },
  { key: 'frequency', label: 'Frequency', align: 'right', width: 160, resizable: false },
  { key: 'value', label: 'Item (%)', align: 'right', width: 160, resizable: false },
];
export const DataTable = () => <Table fill columns={TABLE_COLUMNS} rows={TABLE_ROWS} rowKey={(r) => r.item} />;
