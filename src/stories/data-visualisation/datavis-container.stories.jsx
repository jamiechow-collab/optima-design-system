import React from 'react';
import { FilterableBarCard } from './chartDemo';
import { Page, Heading, Body, Section } from './chartDesignDocs';

export default {
  title: 'Data Visualisation/Chart design/Datavis container',
  parameters: { layout: 'padded' },
};

export const Default = () => (
  <Page>
    <Heading>Datavis container</Heading>
    <Body>A card for various charts that visualise and compare system data.</Body>
    <Body>
      It has three parts: a header with the chart title and a button group, the chart itself, and the legend. The
      border darkens on hover to show the card is interactive.
    </Body>
    <Section>
      <FilterableBarCard title="Chart title" />
    </Section>
  </Page>
);
