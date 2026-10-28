import React, { useState } from 'react';
import { ComboChart } from '../../components/DataVis/ComboChart';
import { comboLayerColour, comboLineColour } from '../../components/DataVis/ComboChart/ComboChart';
import { ChartLegend } from '../../components/DataVis/ChartLegend';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Combo',
  parameters: { layout: 'padded' },
};

export default meta;

const seven = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];
const five = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E'];

// lines: the first line is solid, a second one is dotted
const barLines = [{ name: 'Line 1', values: [18, 25, 21, 32, 39, 58, 69] }];
const barLines2 = [...barLines, { name: 'Line 2', values: [53, 75, 49, 72, 64, 90, 80] }];
const simpleBar = [{ name: 'Bar', values: [44, 34, 16, 53, 33, 63, 24] }];

// stacked: series order = colour order and top-to-bottom order (first series on top)
const stackLines = [{ name: 'Line 1', values: [18, 22, 40, 49, 69] }];
const stackLines2 = [...stackLines, { name: 'Line 2', values: [53, 75, 72, 64, 90] }];
const stackedBar = [
  { name: 'Series 1', values: [7, 28, 45, 30, 10] },
  { name: 'Series 2', values: [9, 24, 15, 53, 21] },
  { name: 'Series 3', values: [34, 8, 33, 10, 7] },
];

const areaLines = [{ name: 'Line 1', values: [18, 55, 64, 60, 50, 55, 54] }];
const areaLines2 = [...areaLines, { name: 'Line 2', values: [28, 74, 82, 70, 51, 39, 35] }];
const simpleArea = [{ name: 'Area', values: [18, 28, 31, 34, 47, 63, 69] }];
const stackedArea = [
  { name: 'Series 1', values: [13, 16, 30, 50, 47, 40, 32] },
  { name: 'Series 2', values: [26, 25, 24, 22, 20, 20, 24] },
  { name: 'Series 3', values: [10, 5, 4, 6, 11, 15, 15] },
];

const examples = (secondLine) => [
  { key: 'bar', title: 'Line + simple bar', caption: 'Line + simple bar', categories: seven, lines: secondLine ? barLines2 : barLines, series: simpleBar, type: 'bar', curve: 'straight' },
  { key: 'stackedBar', title: 'Line + stacked bar', caption: 'Line + stacked bar', categories: five, lines: secondLine ? stackLines2 : stackLines, series: stackedBar, type: 'bar', stacked: true, curve: 'straight' },
  { key: 'area', title: 'Line + area', caption: 'Line + area', categories: seven, lines: secondLine ? areaLines2 : areaLines, series: simpleArea, type: 'area', curve: 'curve' },
  { key: 'stackedArea', title: 'Line + stacked area', caption: 'Line + stacked area', categories: seven, lines: secondLine ? areaLines2 : areaLines, series: stackedArea, type: 'area', stacked: true, curve: 'curve' },
];

const DocsOverview = () => (
  <Page>
    <Heading>Combo charts</Heading>
    <Body>
      Combo Charts provide a versatile visualization tool that combines different types of graphs into a single integrated display,
      allowing for a multifaceted analysis of datasets. This type of chart is particularly useful for presenting complementary or
      contrasting data types simultaneously, such as combining bar graphs with line graphs. The Combo Chart enables users to visually
      compare different measures and track their relationships, making it ideal for highlighting trends, variances, and performance
      metrics across various data dimensions. Its ability to overlay multiple chart types on a single grid enhances the clarity and
      depth of data interpretation, supporting better-informed decision-making processes in business and research contexts.
    </Body>
    {examples(false).map(({ key, title, caption, ...props }) => (
      <React.Fragment key={key}>
        <Sub>{title}</Sub>
        <Grid>
          <Card caption={caption + ' - default'}><ComboChart width={540} height={320} {...props} /></Card>
        </Grid>
      </React.Fragment>
    ))}
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

// Live demo with an optional selectable legend: lines first, then the bars / areas. Clicking an item
// hides / shows it (the last visible item can't be hidden).
const ComboDemo = ({ showLegend, lines, series, stacked, ...props }) => {
  const layerCount = stacked ? series.length : 1;
  const [hidden, setHidden] = useState([]); // legend item indices: lines first, then layers
  const [hl, setHl] = useState(null); // legend item under the pointer
  const total = lines.length + layerCount;
  const toggle = (i) =>
    setHidden((h) => {
      if (h.includes(i)) return h.filter((x) => x !== i);
      return total - h.length > 1 ? [...h, i] : h;
    });
  const items = [
    ...lines.map((l, li) => ({ label: l.name, colour: comboLineColour(stacked), shape: li === 0 ? 'line' : 'dotted' })),
    ...series.slice(0, layerCount).map((x, si) => ({ label: x.name, colour: comboLayerColour(si, stacked), shape: 'filled' })),
  ].map((item, i) => ({ ...item, deselected: showLegend && hidden.includes(i) }));
  const off = showLegend ? hidden : [];
  return (
    <LiveDemo legend={showLegend ? <ChartLegend items={items} onToggle={toggle} onItemHover={setHl} /> : null}>
      <ComboChart
        {...props}
        stacked={stacked}
        lines={lines}
        series={series}
        highlighted={!showLegend || hl === null || hidden.includes(hl) ? null : hl < lines.length ? { kind: 'line', index: hl } : { kind: 'series', index: hl - lines.length }}
        hiddenLines={off.filter((i) => i < lines.length)}
        hiddenSeries={off.filter((i) => i >= lines.length).map((i) => i - lines.length)}
      />
    </LiveDemo>
  );
};

export const Combo = {
  name: 'Combo charts',
  args: { secondLine: false, showLegend: false },
  argTypes: {
    secondLine: { control: 'boolean', name: 'Second line (dotted)', description: 'Adds a second line to each chart; a second line is drawn dotted' },
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Selectable legend: click an item to hide or show that line, bar or area' },
  },
  render: ({ secondLine, showLegend }) => (
    <Page>
      <Heading>Combo charts</Heading>
      <Body>
        Hover to see every value at that point: the lines are listed first, then the bars or areas. Use the Controls to add a second,
        dotted line, and to show a selectable legend that hides or shows each line, bar or area.
      </Body>
      {examples(secondLine).map(({ key, title, caption, ...props }) => (
        <React.Fragment key={key}>
          <Sub>{title}</Sub>
          <ComboDemo showLegend={showLegend} {...props} />
        </React.Fragment>
      ))}
    </Page>
  ),
};
