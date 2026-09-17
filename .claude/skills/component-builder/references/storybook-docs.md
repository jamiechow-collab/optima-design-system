# `.stories.tsx` and `.mdx` conventions

Canonical references: `src/components/Button/Button.stories.tsx` and `Button/Button.mdx` (plus
`Button/ButtonDocHelpers.tsx` for the custom-example pattern).

## Existing Storybook categories

`title` in each `.stories.tsx` controls where the component lands in the Storybook sidebar. These
are the top-level groups that exist today (re-check `grep -rn "title:" src/components
--include="*.stories.tsx"` before adding a new one — this list can drift):

- `Components/...` — the default bucket for standalone UI components. Sub-grouped where a family
  has multiple related pieces, e.g. `Components/Buttons/Standard Buttons`,
  `Components/Buttons/Toggle Buttons`, `Components/Menu/Basic Menu`,
  `Components/Menu/Menu Button/Filter Button`. Most new components belong under
  `Components/<Name>` or `Components/<Family>/<Name>` if it's clearly part of an existing family.
- `Data Visualisation/...` — charts and data-driven displays (`Bar Chart`, `Line Chart`,
  `Star Review`).
- `Pattern/...` — composite, multi-part patterns built from several base components (`Table`).
  Use this only when the thing being built is assembled from other components rather than being a
  primitive itself.
- `Tokens/...` — design-token documentation pages, not components (`Icons`).

Pick the narrowest existing group the new component actually belongs to. Only start a new
top-level group if the concept genuinely doesn't fit `Components`, `Data Visualisation`,
`Pattern`, or `Tokens` — that should be rare.

## `.stories.tsx`

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' }, // or 'padded'/'fullscreen' for larger components
  argTypes: {
    // Keep controls only for props that make sense to twiddle live; disable ones better shown
    // as separate story variants, e.g.: variant: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Primary: Story = {
  args: { /* ... */ },
};
```

- If the component has multiple visually distinct variants worth showing as their own docs page
  (like Button's Primary/Secondary/Tertiary/...), write a small `playgroundArgs(variant)` factory
  and a shared `render` function, one exported `Story` per variant — see `Button.stories.tsx`.
  For a simpler component, a single `Primary`/`Playground` story with full `argTypes` controls is
  enough; don't manufacture variant-per-page structure a component doesn't have.
- Where a demo needs an icon, use `<Icon name="placeholder" />` from `../Icon/Icon` — matches
  every existing story's convention for a generic stand-in icon.

## `.mdx`

```mdx
import { Meta, Title, Subtitle, Canvas, Controls, Unstyled } from '@storybook/addon-docs/blocks';
import * as ComponentNameStories from './ComponentName.stories';

<Meta of={ComponentNameStories} />

<Title>Component Name</Title>
<Subtitle>
  One sentence: what it is and the situation it's used in.
</Subtitle>

<Canvas of={ComponentNameStories.Primary} />
<Controls of={ComponentNameStories.Primary} />

## Overview

A short paragraph on what the component does.

**When to use** — ...
**When not to use** — ...

## Variants (only if the component has them)

<Unstyled>
  <VariantsExample />
</Unstyled>

Prose describing each variant and when to reach for it — one short paragraph per variant, bolded
name first, matching Button.mdx's "**Primary Button** — For the principal call to action..." style.

## Sizes / Types / States (only the sections that actually apply)

## Interactions

**Mouse** — how a pointer user triggers/uses it.
**Keyboard** — which keys operate it and what focus does (skip only if genuinely not
keyboard-interactive, e.g. a purely decorative chart).
```

- Section order mirrors `Button.mdx`: Overview → Variants/Types → Sizes → Emphasis-or-similar
  guidance if relevant → States → Interactions. Include only the sections that make sense for the
  component — a simple display component may just need Overview + States + Interactions.
- Any `<Unstyled><XExample /></Unstyled>` block referencing a custom multi-instance comparison
  view (e.g. all variants side by side) is sourced from a `ComponentNameDocHelpers.tsx` file in
  the same folder — write one only when a single story canvas can't show the comparison, following
  `ButtonDocHelpers.tsx`'s pattern of small named exported components (`VariantsExample`,
  `SizesExample`, etc.), each just rendering a handful of the real component side by side.
- Every `Overview` section states both when to use it and when *not* to, even briefly — this is
  what stops the component from getting misused as a substitute for something else in the system
  (e.g. Button.mdx explicitly says not to use buttons for navigation — use Link instead).
