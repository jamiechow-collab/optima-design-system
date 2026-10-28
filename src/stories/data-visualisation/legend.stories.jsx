import React, { useEffect, useState } from 'react';
import { FilterableBarCard, ITEM_NAMES as NAMES } from './chartDemo';
import { Page, Heading, Body } from './chartDesignDocs';

const meta = {
  title: 'Data Visualisation/Chart design/Legend',
  parameters: { layout: 'padded' },
};

export default meta;

export const Docs = () => (
  <Page maxWidth={1300}>
    <Heading>Legend</Heading>
    <Body>
      Chart legends are auto-generated, allow filtering, can be displayed in various locations and in a custom order
      and have custom items added.
    </Body>
    <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap', marginTop: 32 }}>
      <FilterableBarCard />
      <FilterableBarCard initialOff={[3]} />
    </div>
  </Page>
);

const Playground = (args) => {
  const fromArgs = () => NAMES.map((_, i) => i).filter((i) => !args[`show${String.fromCharCode(65 + i)}`]);
  const [off, setOff] = useState(fromArgs);
  // controls drive the selection; clicking a legend item also toggles it
  useEffect(() => { setOff(fromArgs()); }, [args.showA, args.showB, args.showC, args.showD, args.showE, args.showF, args.showG]); // eslint-disable-line react-hooks/exhaustive-deps
  const toggle = (i) => setOff((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
  return <FilterableBarCard off={off} onToggle={toggle} showLegendTitle={args.showLegendTitle} />;
};

export const PlaygroundStory = {
  name: 'Playground',
  parameters: { layout: 'padded' },
  args: { showLegendTitle: true, ...Object.fromEntries(NAMES.map((_, i) => [`show${String.fromCharCode(65 + i)}`, true])) },
  argTypes: {
    showLegendTitle: { control: 'boolean', name: 'Legend title', description: 'Optional caption above the legend items (e.g. the hovered date)' },
    ...Object.fromEntries(
    NAMES.map((n, i) => [`show${String.fromCharCode(65 + i)}`, { control: 'boolean', name: `${n} (legend on)`, description: 'Off removes the bar and its x-axis column; the legend item shows as deselected' }])
    ),
  },
  render: (args) => <Playground {...args} />,
};
