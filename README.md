# Optima design system

Optima is the design system for AudienceProject. This is its first version, designed for our products **Next** and **Elevate**, with a foundation that can serve more AudienceProject products over time.

It is not yet used for the marketing site. That needs to be tested when the need comes up.

Built with React 19, TypeScript, plain CSS driven by design tokens, and documented in Storybook 10. It includes 30+ components, patterns (Modal, Table), data visualisation (charts, mini charts, score cards, widgets) and the colour, typography, spacing, radius and shadow tokens.

## Status

**First draft, for experiment.** Developers are welcome to test it and break it, so we learn how production-ready it is.

Known gaps:

- Tests on all components
- Skeleton loading states
- Dark mode
- Patterns: list, card, banner, form, side panel

Coming next: interface designs that show how the components work together across different screens and flows.

## Where to see it

| What | Link |
| --- | --- |
| Storybook (live) | <!-- TODO: add URL once deployed --> |
| Figma · component library | [Shared UI Design components](https://www.figma.com/design/y0auStx1EYrfLFRnDMV8p0/Shared-UI-Design-components?node-id=0-1) |
| Figma · pattern library | [Shared UI Design patterns](https://www.figma.com/design/Vt2hMFh5DnyZVgwG7YV7ag/Shared-UI-Design-patterns?node-id=0-1) |
| Figma · data visualisation components | [Shared UI Design DataVis](https://www.figma.com/design/ZKh7ghSaAq85OHdcKGpP5F/Shared-UI-design%E2%80%A8DataVis?node-id=0-1) |

## Using it in a project

**To be decided with the developers.** How the system is consumed (copied from the repo, installed as a package, or added as a Git dependency) is still open, and there is no package entry point yet.

Whichever route is chosen, load `src/tokens/tokens.css` once at the root of your app (Storybook does this in `.storybook/preview.tsx`). Components then read their colours, type, spacing, radius and shadows from the CSS variables that file defines.

### Guidelines

No firm usage rules have been set yet. Two conventions already hold across the codebase:

- Components use tokens (`var(--color-…)`, `var(--spacing-…)`), not raw hex or pixel values.
- Components are configured through their props and variants rather than custom styles. Each component's props are documented in its Storybook page.

## Running it locally

Requires Node 22.

```bash
npm install
npm run storybook
```

Storybook opens at http://localhost:6006.

| Command | What it does |
| --- | --- |
| `npm run storybook` | Runs Storybook locally |
| `npm run build-storybook` | Builds the static Storybook to `storybook-static/` |
| `npm run tokens` | Regenerates `src/tokens/tokens.css` from the token files (runs automatically before the commands above) |
| `npm run chromatic` | Publishes to Chromatic for visual review |

## Project structure

- `src/components/`: the components, and `DataVis/` for charts and widgets
- `src/stories/`: documentation pages and chart stories
- `src/tokens/`: colour, typography, spacing, radius and shadow tokens
- `.storybook/`: Storybook configuration and the sidebar order
- `public/`: static files Storybook serves

Each component lives in its own folder:

```
Button/
  Button.tsx             the component
  Button.css             its styles, using tokens
  Button.stories.tsx     the Storybook stories
  Button.mdx             the documentation page
  ButtonDocHelpers.tsx   examples used by the documentation page
```

### Changing tokens

Edit the files in `src/tokens/*.js`, then run `npm run tokens`. Never edit `src/tokens/tokens.css` by hand: it is generated and will be overwritten.

## Accessibility

The target is WCAG 2.1 AA. Storybook's accessibility addon runs on every story, but it only catches static issues, so keyboard and screen-reader behaviour still needs manual checks.

## Contributing and ownership

<!-- TODO: all of the following are still to be decided -->

- Owner, and how to request or propose a component: TBD
- Review and release process: TBD
- Branch and commit conventions: TBD
- Browser support targets: TBD
