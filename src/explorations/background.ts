// Shared, accumulating source of truth for every user problem this
// exploration app has ever tackled — and the real evidence behind it.
// Add a new Problem only when it's genuinely new; otherwise reuse an
// existing `id` so multiple prototypes can target the same problem.
// Evidence is real research — never invent an example or a quote here.

export interface Problem {
  id: string;
  statement: string;
}

export interface Evidence {
  problemId: string;
  type: 'example' | 'quote';
  text: string;
  /** Optional attribution, e.g. "Support ticket #4213". */
  source?: string;
}

export const PROBLEMS: Problem[] = [
  {
    id: 'cross-dimension-comparison',
    statement:
      "Users can't easily compare things that would make it meaningful — whether that's " +
      'comparing between channels, campaigns, markets, or targets.',
  },
  {
    id: 'adaptive-flexible-views',
    statement:
      'Users want to adjust, filter, or combine the views and channels already there, rather ' +
      'than being stuck with one fixed layout.',
  },
];

// No usability-session examples have been shared yet for either problem —
// left empty rather than inventing one. Add entries here (type: 'example')
// once real examples exist.
export const EVIDENCE: Evidence[] = [
  {
    problemId: 'cross-dimension-comparison',
    type: 'quote',
    text: 'We will usually need to compare multiple reports, from 2 to 20 reports and current process is laborious.',
  },
  {
    problemId: 'adaptive-flexible-views',
    type: 'quote',
    text:
      "The customisability of digital platforms and advertising is increasing, so we're getting " +
      'ever more questions and we have to work out how we can move the data around to answer.',
  },
];
