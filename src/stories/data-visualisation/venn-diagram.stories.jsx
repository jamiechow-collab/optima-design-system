import React from 'react';
import { VennDiagram, intersectionKey } from '../../components/DataVis/VennDiagram';
import { Page, Heading, Sub, Body, Card, Grid, LiveDemo } from './chartDocs';

const meta = {
  title: 'Data Visualisation/Chart types/Venn diagram',
  parameters: { layout: 'padded' },
};

export default meta;

// Each value is the size of one zone: "A" is only in set A, "AB" is in A and B, "ABC" is in all three.
// Zones are shown as a share of the total, so these add up to 100%.
const overlapping = { A: 25, B: 23, C: 21, AB: 12, AC: 9, BC: 7, ABC: 3 };
const separate = { A: 40, B: 25, C: 35, AB: 0, AC: 0, BC: 0, ABC: 0 }; // no overlaps: the circles are drawn apart

// Six channels to compare three at a time. In a product the sizes come from the backend; here they are counted from made-up
// audiences (people 0-999) just to get a consistent set of numbers. Search and Podcast never overlap.
const channels = [
  { id: 'search', name: 'Search' },
  { id: 'social', name: 'Social' },
  { id: 'email', name: 'Email' },
  { id: 'display', name: 'Display' },
  { id: 'video', name: 'Video' },
  { id: 'podcast', name: 'Podcast' },
];
const audience = {
  search: (p) => p % 2 === 0,
  social: (p) => p % 3 === 0,
  email: (p) => p % 5 === 0 || p % 7 === 0,
  display: (p) => p % 4 < 2,
  video: (p) => p % 11 < 4,
  podcast: (p) => p >= 850 && p % 2 === 1,
};
const sizes = {};
const combos = (from, size) => (size === 0 ? [[]] : from.flatMap((c, i) => combos(from.slice(i + 1), size - 1).map((rest) => [c, ...rest])));
[1, 2, 3].forEach((size) =>
  combos(channels.map((c) => c.id), size).forEach((ids) => {
    let count = 0;
    for (let p = 0; p < 1000; p++) if (ids.every((id) => audience[id](p))) count += 1;
    sizes[intersectionKey(ids, channels)] = count;
  })
);

const Fixed = ({ caption, ...props }) => (
  <Card caption={caption}><VennDiagram width={405} height={280} maxScale={1} {...props} /></Card>
);

const DocsOverview = () => (
  <Page>
    <Heading>Venn Diagram</Heading>
    <Body>
      Venn Diagram is a graphical representation that uses overlapping shapes&mdash;most commonly circles&mdash;to show the logical
      relationships, similarities, and differences between two or more sets of items, data, or concepts.
    </Body>

    <Sub>Type</Sub>
    <Grid>
      <Fixed caption="Venn Diagram - with percentage" data={overlapping} />
      <Fixed caption="Venn Diagram - without percentage" data={overlapping} showPercentage={false} />
      <Fixed caption="Venn Diagram - when there is no overlapping" data={separate} />
    </Grid>

    <Sub>Comparing channels</Sub>
    <Body>
      A product usually has more channels than the diagram can show, so users pick up to three to compare. The picker is the legend:
      click a channel to select or deselect it (at least one stays selected), and picking a fourth replaces the oldest pick in the same
      circle position. Percentages are shares of everyone in the compared channels, so they add up to 100%.
    </Body>
    <Body>
      The component needs no user lists. It takes the channels and the <b>intersection sizes</b>: how many people are in each channel, in
      each pair, and in each trio. From the sizes of the three picked channels it works out how many people are in each exclusive zone
      (inclusion&ndash;exclusion; the maths is the exported zonesFromIntersections function, so a product can reuse it).
    </Body>
    <pre style={{ background: 'var(--color-core-bg-secondary, #fff)', borderRadius: 8, padding: 16, fontSize: 12, lineHeight: '18px', maxWidth: 760, overflow: 'auto', margin: '0 0 16px' }}>{`channels = [{ id: 'search', name: 'Search' }, { id: 'social', name: 'Social' }, ...]

// inclusive sizes; the key is the channel ids in channels order, joined with "+"
sizes = {
  search: 500, social: 334, email: 314,                    // everyone in the channel
  'search+social': 167, 'search+email': 157,               // everyone in both
  'search+social+email': 53,                               // everyone in all three
  ...
}

<VennDiagram channels={channels} sizes={sizes} showLegend onSelectionChange={(ids) => ...} />`}</pre>
    <Grid>
      <Card caption="Three channels compared">
        <VennDiagram width={405} height={280} maxScale={1} channels={channels} sizes={sizes} defaultSelected={['search', 'social', 'email']} />
      </Card>
      <Card caption="Two channels compared (drawn to match, not in Figma yet)">
        <VennDiagram width={405} height={280} maxScale={1} channels={channels} sizes={sizes} defaultSelected={['search', 'social']} />
      </Card>
      <Card caption="One channel (drawn to match, not in Figma yet)">
        <VennDiagram width={405} height={280} maxScale={1} channels={channels} sizes={sizes} defaultSelected={['display']} />
      </Card>
      <Card caption="Channels that never overlap (Search and Podcast)">
        <VennDiagram width={405} height={280} maxScale={1} channels={channels} sizes={sizes} defaultSelected={['search', 'podcast']} />
      </Card>
    </Grid>
  </Page>
);

export const DocsPage = { name: 'Docs', render: () => <DocsOverview /> };

export const Venn = {
  name: 'Venn diagram',
  args: { showLegend: true, showPercentage: true },
  argTypes: {
    showPercentage: { control: 'boolean', name: 'Show percentage', description: 'Each zone’s share inside the zone (hidden on zones too small to fit it)' },
    showLegend: { control: 'boolean', name: 'Show legend', description: 'Lists every channel; click to select or deselect (1 to 3 at a time, a fourth replaces the oldest)' },
  },
  render: ({ showPercentage, showLegend }) => (
    <Page>
      <Heading>Venn diagram</Heading>
      <Body>
        Hover a zone to see its share. The part of a circle with no overlap also shows the total for the whole set; an overlap shows just
        its own share. The other zones switch to their dismissed colours. With the legend on, pick the channels to compare: click one to
        select or deselect it, and a fourth pick replaces the oldest. Search and Podcast never overlap, so they are drawn apart.
      </Body>
      <LiveDemo min={260}>
        <VennDiagram channels={channels} sizes={sizes} showLegend={showLegend} showPercentage={showPercentage} onSelectionChange={() => {}} />
      </LiveDemo>
    </Page>
  ),
};
