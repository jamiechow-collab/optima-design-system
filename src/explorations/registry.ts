import React from 'react';
import { ReportComparisonCanvas } from './ReportComparisonCanvas/ReportComparisonCanvas';
import { ReportOverviewPanels } from './ReportOverviewPanels/ReportOverviewPanels';

export interface ExplorationEntry {
  id: string;
  name: string;
  /** Which recorded Problem (see background.ts) this prototype targets. */
  problemId: string;
  /** "We believe [this direction] solves the problem because [assumption]." */
  assumption: string;
  /** Known gaps, faked data, or open questions — kept visible next to the prototype, not hidden in a doc. */
  notes?: string;
  component: React.ComponentType;
}

export const EXPLORATIONS: ExplorationEntry[] = [
  {
    id: 'report-comparison-canvas',
    name: 'Report Comparison Canvas',
    problemId: 'cross-dimension-comparison',
    assumption:
      "We believe a canvas where a report's modules can be added side-by-side as extra columns, " +
      'and where the detail panel and individual charts expand, collapse, and reflow in place, ' +
      "solves the problem because it mirrors Perplexity Finance's flexible columns and Google " +
      "Sheets' collapse-to-focus — patterns people already know for comparing many things at once.",
    notes:
      'All report names, numbers, and channel data are fabricated. There’s no full charting ' +
      'engine in the design system yet, so chart cards reuse the existing BarChart preview/' +
      'sparkline component rather than a real data-bound chart. The right-hand detail panel ' +
      'always reflects the first report column, even when comparing several. The "Compare" menu ' +
      'doesn’t auto-close after picking a report — click it again or click outside to close it.',
    component: ReportComparisonCanvas,
  },
  {
    id: 'report-overview-adaptive-panels',
    name: 'Report Overview — Adaptive Panels & AI',
    problemId: 'adaptive-flexible-views',
    assumption:
      'We believe a single report screen where supporting context (report/target/budget ' +
      "details, a specific chart's explanation, and an AI assistant) each live in their own " +
      'collapsible side panel that can be shown independently or together, with the main content ' +
      'reflowing to make room, solves the problem because it lets someone pull exactly the ' +
      "context they need into view without leaving the report or losing their place — inspired " +
      "by Perplexity Finance's flexible modules/columns and expandable data-vis, and Google " +
      "Sheets' expand/collapse-to-focus and responsive columns.",
    notes:
      'All report names, numbers, and channel data are fabricated. The Optima icon set has no ' +
      'sparkle/"AI" glyph yet, so the AI affordances use a small local SVG defined inside this ' +
      'file rather than inventing an IconName; Share also has no dedicated icon and borrows ' +
      '"arrow-top-right". The stat tile and the label/value "info section" card (used for ' +
      'Details/Target Group/Budget/Campaigns) aren\'t real design-system components — they\'re ' +
      'purpose-built locally for this prototype. Every score card\'s hover sparkle menu (composer ' +
      'plus "Explain to me"/"Compare with past performance") and the AI panel\'s own suggested-' +
      'prompt pills all route into the one shared, docked "Ask AI Audrey" panel and conversation — ' +
      'there\'s no per-card AI history. "Ask AI Audrey" is a scripted demo: any question gets the ' +
      'same one canned reply, not a real model. Overview, chart-details, and the supporting-info ' +
      'panel each scroll independently of one another. ' +
      'The Demographic and Devices tabs in the supporting-info panel are visual placeholders with ' +
      'no real content behind them — "See more" on Target Group and Campaigns is functional and ' +
      'expands the card to its full list (extra Target Group fields and the remaining campaigns ' +
      'are fabricated for this prototype). On a chart card, the "..." menu ' +
      'has two items sourced from Figma\'s dedicated menu-open screen — "Show details" (wired up) ' +
      'and "Export" (a no-op in this prototype). The AI Summary card\'s "Details" link opens the Ask ' +
      'AI Audrey panel — a reasonable inferred wiring, not something explicitly specified. The ' +
      'supporting-info panel\'s "Details" tab lists Client as "Premier Inn", which is copied ' +
      'faithfully from the source Figma screens even though it doesn\'t match this report\'s own ' +
      'client ("Lidl") shown in the report header — a data-consistency gap inherited from the ' +
      'source design, not fixed here.',
    component: ReportOverviewPanels,
  },
];
