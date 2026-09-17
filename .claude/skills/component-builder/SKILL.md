---
name: component-builder
description: Brainstorm and build new components, patterns, or variants for the Optima design system (React + TypeScript + Storybook) so the result matches every existing component's conventions instead of inventing new ones. Use this whenever the user wants to design, brainstorm, sketch out, prototype, or build a new UI component, chart, or pattern for this repo — even if they don't name a file format or say "skill" explicitly, e.g. "let's brainstorm a Chip component", "we need a stepper", "add a new Badge variant", "build me a component for X". Also use it when extending an existing component with a new variant/size/prop, or when writing a component's Storybook stories or MDX docs. Read this BEFORE proposing any variants, sizes, states, colors, or spacing for a new component, and before generating its .tsx/.css/.stories.tsx/.mdx files.
---

# Optima component builder

This design system has one consistent shape across ~30 components (`src/components/*`). The
value of this skill is refusing to freelance: every new component should look like it was built
by the same person who built `Button` and `Icon`, using the same tokens, the same file layout,
and the same documentation structure. Concepts that ignore the token scale or invent a new class
naming style don't fit here even if they look fine in isolation.

## Workflow

**1. Ground yourself before proposing anything.**

Read, in this order:
- `src/tokens/tokens.css` — the actual CSS custom properties available today (colors, spacing,
  radius, shadow, typography). This is auto-generated from `src/tokens/*.js`, so it's always
  current — treat it as the source of truth over any memory of past conversations.
- One or two existing components close to what's being proposed (e.g. brainstorming a form
  control → read `Checkbox` or `TextInput`; a data-viz idea → read `BarChart` or `LineChart`; a
  status/label idea → read `Badge`). Match their shape, not just their tokens.
- `src/components/Icon/icons.tsx` if the concept will need icons — see "Icons" below.

Don't skip this because the token names seem guessable. The scale is intentionally finite (e.g.
spacing only has specific steps like `--spacing-sm` (8px), `--spacing-lg` (16px) — there's no
14px step), and reusing skimmed values instead of real ones is exactly the kind of drift this
skill exists to prevent.

**2. Brainstorm inside the system, not next to it.**

When discussing concepts, tie every suggestion back to what's actually available: propose
variants/sizes the way `Button` has `primary/secondary/tertiary/ghost/text/disruptive` and
`sm/md/lg`, states the way it has default/hover/pressed/focused/disabled, and colors/spacing
pulled from the token files just read. If a concept needs something the token scale doesn't have
(a new color, a new spacing step), say so explicitly and treat adding that token as a deliberate,
separate step — see "Adding a new token" below — not something to quietly hardcode.

**3. When asked to build, generate the full file set.**

Every component lives at `src/components/<ComponentName>/` with (all in the same folder):
- `<ComponentName>.tsx`
- `<ComponentName>.css`
- `<ComponentName>.stories.tsx`
- `<ComponentName>.mdx`
- `<ComponentName>DocHelpers.tsx` — only if the docs need a custom side-by-side example (see
  `Button/ButtonDocHelpers.tsx` for the pattern); most simple components don't need this.

Read the relevant reference file for the conventions of each piece, then write it:
- [references/component-tsx.md](references/component-tsx.md) — props, typing, className pattern
- [references/component-css.md](references/component-css.md) — token usage, BEM-ish naming, state
  ordering
- [references/storybook-docs.md](references/storybook-docs.md) — `.stories.tsx` and `.mdx`
  conventions, including the existing category names so the new component's sidebar entry lands
  in the right group instead of creating a stray new one

Reuse existing components instead of rebuilding their behavior — e.g. a loading state reuses
`Spinner`, an icon slot reuses `Icon`, a dismiss control reuses whatever `AlertBanner` or `Toast`
already do for that.

**4. Icons.**

If the component needs an icon, check `src/components/Icon/icons.tsx` for a real name in
`BasicIconName` / `ChannelIconName` (brand logos) / `CountryIconName` (flags) — never invent one.
`'placeholder'` exists and is what the existing stories use as a generic demo icon.

**5. Adding a new token.**

If the concept genuinely needs a value the token scale doesn't have yet, add it to the relevant
`src/tokens/*.js` file (`colors.js`, `spacing.js`, `radius.js`, `shadow.js`, `typography.js`) —
matching the shape already used there — and tell the user to run:

```bash
npm run tokens
```

Never hand-edit `src/tokens/tokens.css` directly — its header says so, and it gets clobbered by
the next `npm run tokens` regardless.

**6. After building, tell the user how to look at it.**

```bash
npm run storybook
```

Storybook runs on `localhost:6006` (configured in `.claude/launch.json` as `storybook`) — prefer
`preview_start({name: "storybook"})` over a raw `npm` command if verifying the result visually in
the same session.

## Quick reference

- Class prefix: `ds-<component>`, `ds-<component>--<variant-or-size>`, `ds-<component>__<part>`
- Component + CSS + stories + mdx are siblings in one folder, PascalCase folder and file names
- Every color/spacing/radius/shadow/font value in CSS comes from a `var(--token, <fallback>)`
  where `<fallback>` matches the token's actual value — never a bare literal that happens to look
  close
- Storybook titles follow existing top-level groups (`Components/...`, `Data Visualisation/...`,
  `Pattern/...`, `Tokens/...`) — see references/storybook-docs.md for the full current list before
  inventing a new one
