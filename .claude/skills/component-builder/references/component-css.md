# `.css` conventions

Canonical reference: `src/components/Button/Button.css`.

## Header comment

Every component CSS file opens with a divider-boxed comment noting which token files it draws
from and a one-line summary of its size/type scale, e.g.:

```css
/* ─────────────────────────────────────────────
   ComponentName — design tokens: src/tokens/colors.js, spacing.js
   Sizes: sm 32 · md 40 · lg 48
   ───────────────────────────────────────────── */
```

This isn't decoration — it's what lets the next person (human or Claude) know which token files
to check before touching this component's values, without re-deriving it from the CSS itself.

## Tokens, not literals

Every color, spacing, radius, shadow, and font value comes from a CSS custom property defined in
`src/tokens/tokens.css`, called with its real fallback value:

```css
background: var(--color-core-bg-primary, #050505);
padding: 0 var(--spacing-lg, 16px);
border-radius: var(--radius-md, 8px);
box-shadow: var(--shadow-focus, 0 0 0 4px rgba(0, 42, 168, 0.6));
```

The fallback isn't optional decoration — it must match the token's current real value (copy it
from `tokens.css`, don't approximate). A mismatched fallback is worse than no fallback because it
silently diverges from Figma if the CSS var ever fails to resolve.

Before writing a value, check whether a token for it already exists in `src/tokens/tokens.css`
(spacing, radius, shadow, colors, typography sections). If the exact value isn't there, look for
the closest existing step rather than inventing a new number — the token scales are intentionally
small and reused across every component. Only add a genuinely new token (see main SKILL.md,
"Adding a new token") when nothing close exists and the design genuinely calls for a new value.

One accepted exception: icon pixel sizes (16px/20px/24px) come from the `Icon` component's own
size scale, not the spacing scale, even where a number coincides with a spacing token — see
`Button.css`'s comment on this. Don't force an icon size onto a spacing token just because the
numbers match.

## Structure and naming

- Selectors mirror the `.tsx` file's class names exactly: `.ds-component-name`,
  `.ds-component-name--variant`, `.ds-component-name__part`.
- Group rules under section-divider comments per concern, in the order the component's states
  naturally occur — base styles, then size variants, then each visual variant in turn, then shared
  interactive states. `Button.css` groups by variant (`── Primary ──`, `── Secondary ──`, etc.),
  each block covering that variant's default/hover/pressed/focused/disabled together with the
  token values noted inline as a comment (e.g. `hover #383838 · pressed #050505`).
- State selectors follow the `:hover:not(:disabled)` / `.is-hover` dual pattern (CSS
  pseudo-class for real interaction, a class hook for Storybook/docs to force the state for
  screenshots) — see every `:hover:not(:disabled), .is-hover { ... }` pair in `Button.css`.
- Focus state is always `box-shadow: var(--shadow-focus, 0 0 0 4px rgba(0, 42, 168, 0.6));` on
  `:focus-visible` (plus the `.is-focused` hook), not a border or outline change, so it stays
  consistent across every focusable component.
- Disabled state always pairs a background/color change with `cursor: not-allowed;`.
