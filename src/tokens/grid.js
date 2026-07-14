// ─────────────────────────────────────────────
//  Design Tokens — Layout Grid
//  Sourced from Figma · Shared UI Design · Layout grid
// ─────────────────────────────────────────────

// A 12-column grid, with column width / gutter / margin tuned per breakpoint.
const grid = {
  desktopXl: { minWidth: 1728, columns: 12, columnWidth: 112, gutter: 24, margin: 100 },
  desktop: { minWidth: 1440, columns: 12, columnWidth: 84, gutter: 29, margin: 96 },
  tablet: { minWidth: 1194, columns: 12, columnWidth: 72, gutter: 20, margin: 96 },
  tabletPortrait: { minWidth: 834, columns: 12, columnWidth: 48, gutter: 14, margin: 93 },
};

export default grid;
