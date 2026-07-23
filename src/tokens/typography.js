// ─────────────────────────────────────────────
//  Design Tokens — Typography
//  Sourced from Figma · Shared UI Design · Typography variables
//  Names mirror the Figma variable collections exactly
//  (Display/bold-1..3, Heading/*, Label/*, Body/*, Caption/*).
// ─────────────────────────────────────────────

// Family/family
export const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

// Weight/*
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Size/*
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

// Composed type styles. Line heights reference Figma Spacing tokens:
// Spacing/lg=16 · Spacing/xl=20 · Spacing/2xl=24 · Spacing/section-xs=32 · Spacing/section-sm=40
const style = (weight, size, lineHeight) => ({
  fontFamily,
  fontWeight: weight,
  fontSize: size,
  lineHeight,
  letterSpacing: 0,
});

const typography = {
  fontFamily,
  fontWeight,
  fontSize,

  display: {
    medium: style(fontWeight.medium, fontSize.lg, 24), // Display/medium
    'bold-1': style(fontWeight.bold, fontSize.lg, 24), // Display/bold-1
    'bold-2': style(fontWeight.bold, fontSize.xl, 32), // Display/bold-2
    'bold-3': style(fontWeight.bold, fontSize['2xl'], 40), // Display/bold-3
  },

  heading: {
    regular: style(fontWeight.regular, fontSize.md, 24),
    medium: style(fontWeight.medium, fontSize.md, 24),
    semibold: style(fontWeight.semibold, fontSize.md, 24),
    bold: style(fontWeight.bold, fontSize.md, 24),
  },

  label: {
    medium: style(fontWeight.medium, fontSize.sm, 20),
    semibold: style(fontWeight.semibold, fontSize.sm, 20),
    bold: style(fontWeight.bold, fontSize.sm, 20),
  },

  body: {
    light: style(fontWeight.light, fontSize.sm, 20),
    regular: style(fontWeight.regular, fontSize.sm, 20),
    medium: style(fontWeight.medium, fontSize.sm, 20),
    semibold: style(fontWeight.semibold, fontSize.sm, 20),
  },

  caption: {
    regular: style(fontWeight.regular, fontSize.xs, 16),
    medium: style(fontWeight.medium, fontSize.xs, 16),
  },
};

export default typography;
