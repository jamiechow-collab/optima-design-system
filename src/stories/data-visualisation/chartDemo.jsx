import React, { useState } from 'react';
import { ChartContainer } from '../../components/DataVis/ChartContainer';
import { ChartLegend } from '../../components/DataVis/ChartLegend';
import { BarChart } from '../../components/DataVis/BarChart';
import { seriesColour } from '../../components/DataVis/chartTheme';

export const ITEM_NAMES = ['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F', 'Item G'];
const VALUES = [32.5, 25.5, 11.4, 39.1, 25.1, 45.8, 18.5];

/**
 * Datavis card with the shared BarChart + ChartLegend. `off` lists deselected item indexes:
 * they stay in the legend (struck through) while their bar and x-axis column are removed.
 * Remaining bars keep their original colour (colourIndex).
 */
export const FilterableBarCard = ({ off: offProp, onToggle: onToggleProp, initialOff = [], hover = false, title = 'Reach in TG overlap (%)' }) => {
  // controlled when `off` + `onToggle` are passed, otherwise keeps its own selection (initialOff)
  const [local, setLocal] = useState(initialOff);
  const off = offProp ?? local;
  const onToggle = onToggleProp ?? ((i) => setLocal((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i])));
  const data = ITEM_NAMES.map((label, i) => ({ label, value: VALUES[i], colourIndex: i })).filter((_, i) => !off.includes(i));
  return (
    <ChartContainer
      title={title}
      hover={hover}
      chart={<BarChart data={data} colourBy="category" group="group2" width={540} height={279} max={60} tickStep={10} />}
      legend={
        <ChartLegend
          title="Date will be displayed here"
          items={ITEM_NAMES.map((label, i) => ({ label, colour: seriesColour(i, 'group2'), deselected: off.includes(i) }))}
          onToggle={onToggle}
        />
      }
    />
  );
};
