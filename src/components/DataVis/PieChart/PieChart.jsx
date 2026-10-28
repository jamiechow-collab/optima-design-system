import React from 'react';
import { DonutChart } from '../DonutChart';

/**
 * Pie chart: the Donut chart with a full ring (no hole) and no centre total, so it shares the donut's
 * slices, percentages, data labels, hover and tooltip. See DonutChart for the props.
 */
export const PieChart = (props) => (
  <DonutChart ring={0.5} pad={0.26} showTotal={false} showMetricLabel={false} ariaLabel="Pie chart" {...props} />
);

export default PieChart;
