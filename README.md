# Optima design system

The component library and design guidelines, documented in Storybook.

## Getting started

```bash
npm install
npm run storybook
```

Storybook opens at http://localhost:6006.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run storybook` | Runs Storybook locally |
| `npm run build-storybook` | Builds the static Storybook to `storybook-static/` |
| `npm run tokens` | Regenerates `src/tokens/tokens.css` from the token files (runs automatically before the commands above) |
| `npm run chromatic` | Publishes to Chromatic for visual review |

## Structure

- `src/components/` — the components (and `DataVis/` for charts and widgets)
- `src/stories/` — documentation pages and chart stories
- `src/tokens/` — colour, typography and spacing tokens
- `.storybook/` — Storybook configuration and the sidebar order
- `public/` — static files Storybook serves
