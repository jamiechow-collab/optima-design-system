import React from 'react';
import { HeatmapChart } from '../../components/DataVis/HeatmapChart';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Heatmap',
  parameters: { layout: 'padded' },
};

export default meta;

// Made-up values for a rows x columns grid. They only depend on the position, so a grid is always the same.
const grid = (rows, cols) => ({
  yLabels: Array.from({ length: rows }, (_, r) => `Row ${r + 1}`),
  xLabels: Array.from({ length: cols }, (_, c) => `Col ${c + 1}`),
  values: Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (__, c) => 20 + ((r * 37 + c * 53 + r * c * 11) % 17) * 17)),
});

const SIZES = { '2 × 2': grid(2, 2), '3 × 2': grid(3, 2), '3 × 3': grid(3, 3), '4 × 4': grid(4, 4), '8 × 8': grid(8, 8), '10 × 10': grid(10, 10) };

const Fixed = ({ caption, size, height = 320, ...props }) => (
  <Card caption={caption}><HeatmapChart width={540} height={height} {...SIZES[size]} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Heatmap</Heading>
    <Body>
      Heatmap charts are graphical representations of data where values in a matrix are represented as colors. Typically, the data is
      arranged in a table format, with rows and columns representing different categories or variables. Each cell in the table is assigned
      a color based on its value, allowing patterns and trends to be easily visualized.
    </Body>
    <Body>
      Heatmaps are particularly useful for identifying areas of concentration, variation, or correlation within large datasets, as the
      intensity of color indicates the magnitude of the values. They are commonly used in fields such as data analysis, biology, finance,
      and web analytics to visualize complex data sets, detect outliers, and reveal underlying patterns that might not be apparent in
      traditional tabular data.
    </Body>
    <Body>
      Heatmap charts provide an intuitive and efficient way to explore and interpret multidimensional data, making them valuable tools for
      decision-making and data-driven insights.
    </Body>

    <Sub>Type</Sub>
    <Grid>
      <Fixed caption="2×2 heatmap" size="2 × 2" height={280} />
      <Fixed caption="3×2 heatmap" size="3 × 2" />
      <Fixed caption="3×3 heatmap" size="3 × 3" />
      <Fixed caption="4×4 heatmap" size="4 × 4" />
      <Fixed caption="8×8 heatmap" size="8 × 8" height={380} />
      <Fixed caption="10×10 heatmap" size="10 × 10" height={400} />
    </Grid>

    <Sub>Colour and legend</Sub>
    <Body>
      The colour of a cell depends on which of nine equal steps its value falls into, from the lightest step for the smallest values to the
      darkest for the biggest. The legend below the chart shows the nine steps and the value each one starts at. Cells show their value in a
      small white label so it stays readable on any colour; the labels are left out when the cells are too small to hold them.
    </Body>
    <Body>
      Hovering a cell darkens it by one step and shows its column and the column total, its row and the row total, and the value of the
      cell itself.
    </Body>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

export const Heatmap = {
  args: { size: '4 × 4', showValues: true },
  argTypes: {
    size: { control: 'select', options: Object.keys(SIZES), name: 'Grid size (rows × columns)' },
    showValues: { control: 'boolean', name: 'Show values', description: 'Each cell’s value in a small label (hidden when the cells are too small)' },
  },
  render: ({ size, showValues }) => (
    <Page>
      <Heading>Heatmap</Heading>
      <Body>
        Hover a cell to darken it and see its column and row totals and its own value. Use the Controls to change the grid size and to show
        or hide the values. The grid fills its box, so drag the box to resize it.
      </Body>
      <LiveDemo min={260}>
        <HeatmapChart {...SIZES[size]} showValues={showValues} />
      </LiveDemo>
    </Page>
  ),
};
