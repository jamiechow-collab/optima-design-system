import React from 'react';
import { FilterableBarCard } from './chartDemo';
import { Page, Heading, Body, Section } from './chartDesignDocs';

export default {
  title: 'Data Visualisation/Chart design/Datavis container',
  parameters: { layout: 'padded' },
};

const Caption = ({ children }) => (
  <p style={{ fontSize: 14, lineHeight: '20px', fontWeight: 500, color: 'var(--color-text-secondary, #474747)', margin: '8px 0 0' }}>{children}</p>
);

export const Default = () => (
  <Page>
    <Heading>Datavis container</Heading>
    <Body>A card for various charts that visualise and compare system data.</Body>
    <Body>
      It has three parts: a header with the chart title and a button group, the chart itself, and the legend. The
      border darkens on hover to show the card is interactive.
    </Body>
    <Section>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div><FilterableBarCard /><Caption>Default</Caption></div>
        <div><FilterableBarCard hover /><Caption>Hover</Caption></div>
      </div>
    </Section>
  </Page>
);
