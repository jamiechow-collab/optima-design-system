import React from 'react';
import { GaugeChart } from '../../components/DataVis/GaugeChart';
import { Icon } from '../../components/Icon/Icon';
import { datavisCategorical } from '../../tokens/datavis-colors';
import { fontFamily } from '../../tokens/typography';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Gauge',
  parameters: { layout: 'padded' },
};

export default meta;

// Default size: an 80px outer radius (160 x 80), shrinking to fit a smaller container
const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><GaugeChart width={405} height={280} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Gauge chart</Heading>
    <Body>
      Gauge charts, also known as dial or speedometer charts, are visualizations used to represent a single value within a specific
      range, typically depicting it against a scale marked with different levels or categories. Resembling the dashboard of a vehicle,
      these charts feature a circular or semicircular layout, with an indicator pointing to the value being measured. The position of the
      indicator relative to the scale provides an immediate visual indication of whether the value falls within certain predefined
      ranges, such as low, medium, or high. Gauge charts are often employed in performance monitoring, goal tracking, and Key
      Performance Indicator (KPI) reporting, offering a quick and intuitive way to assess progress or status at a glance. However, they
      should be used judiciously, as they can sometimes oversimplify data and may not be suitable for displaying complex datasets.
    </Body>

    <Sub>Type</Sub>
    <Grid>
      <Fixed caption="Gauge chart - custom colour" value={30} />
      <Fixed caption="Gauge chart - message status" value={50} status="message" />
      <Fixed caption="Gauge chart - positive status" value={70} status="positive" />
      <Fixed caption="Gauge chart - negative status" value={20} status="negative" />
      <Fixed caption="Gauge chart - warning status" value={60} status="warning" />
    </Grid>

    <Sub>Variants</Sub>
    <Grid>
      <Fixed caption="Gauge chart - with label" value={30} />
      <Fixed caption="Gauge chart - with label (without icon)" value={30} icon={null} />
      <Fixed caption="Gauge chart - without label" value={30} showLabel={false} />
    </Grid>

    <Sub>Edge case</Sub>
    <div style={{ width: 405, height: 280, background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <GaugeChart width={160} height={36} radius={36} value={30} showValue={false} showLabel={false} />
      <span style={{ fontFamily, fontSize: 14, lineHeight: '20px', color: 'var(--color-text-primary, #222)' }}>Performance: 30%</span>
    </div>
    <Body>
      When using a small scale Gauge Chart, do not display the label. Use a legend or description text to give an explanation about the
      chart.
    </Body>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

// icons the label can show; any Icon can be passed as `icon`
const ICONS = {
  'Arrow up-right': 'arrow-top-right',
  'Arrow down-right': 'arrow-bottom-right',
  Checkmark: 'checkmark',
  Warning: 'warning',
  Info: 'info-with-circle',
  None: null,
};
const COLOURS = [...datavisCategorical.group1, ...datavisCategorical.group2].map((c) => c.name);
const colourVar = (name) => {
  const c = [...datavisCategorical.group1, ...datavisCategorical.group2].find((x) => x.name === name);
  return `var(--color-datavis-${name}-default, ${c.default})`;
};

export const Gauge = {
  name: 'Gauge chart',
  args: { value: 30, status: 'custom', colour: 'tide', showLabel: true, icon: 'Arrow up-right' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 }, name: 'Value (%)' },
    status: {
      control: 'inline-radio',
      options: ['custom', 'message', 'positive', 'negative', 'warning'],
      name: 'Colour type',
      description: "'custom' uses the custom colour below; the others use the notification colours",
    },
    colour: { control: 'select', options: COLOURS, name: 'Custom colour', description: 'Only used when the colour type is custom' },
    showLabel: { control: 'boolean', name: 'Show label', description: 'The metric label under the value' },
    icon: { control: 'select', options: Object.keys(ICONS), name: 'Label icon', description: 'Any icon can be passed to the `icon` prop; None hides it' },
  },
  render: ({ value, status, colour, showLabel, icon }) => (
    <Page>
      <Heading>Gauge chart</Heading>
      <Body>
        A gauge shows one value on a scale and has no hover state. Use the Controls to change the value, switch between a custom colour
        and the notification colours, show or hide the label, and choose the label icon.
      </Body>
      <LiveDemo min={120}>
        <GaugeChart
          value={value}
          status={status === 'custom' ? undefined : status}
          colour={colourVar(colour)}
          showLabel={showLabel}
          icon={ICONS[icon] ? <Icon name={ICONS[icon]} size="xs" /> : null}
        />
      </LiveDemo>
    </Page>
  ),
};
