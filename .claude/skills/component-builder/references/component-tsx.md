# `.tsx` conventions

Canonical references in the repo: `src/components/Button/Button.tsx` (variant/size component with
composed sub-elements) and `src/components/Icon/Icon.tsx` (small, single-purpose component).

## Shape

```tsx
import React from 'react';
import './ComponentName.css';
// import anything reused, e.g.: import { Spinner } from '../Spinner/Spinner';

export type ComponentNameVariant = 'primary' | 'secondary'; // only if the component has variants
export type ComponentNameSize = 'sm' | 'md' | 'lg'; // only if the component has sizes

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** One-line explanation of what this prop controls and its default's rationale. */
  variant?: ComponentNameVariant;
  /** sm ... · md ... · lg ... — note which is default and why, mirroring Button's size prop doc */
  size?: ComponentNameSize;
}

export const ComponentName = ({
  variant = 'primary',
  size = 'sm',
  className,
  ...rest
}: ComponentNameProps) => {
  const classes = [
    'ds-component-name',
    `ds-component-name--${variant}`,
    `ds-component-name--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes} {...rest} />;
};
```

## Rules

- **Extend the right HTML attributes interface** for what the component actually renders —
  `ButtonHTMLAttributes<HTMLButtonElement>` for a button, `InputHTMLAttributes<HTMLInputElement>`
  for an input, `HTMLAttributes<HTMLDivElement>` for a generic container, etc. This is what lets
  consumers pass `onClick`, `aria-*`, `id`, and so on without the component re-declaring them.
- **Named export, not default.** `export const ComponentName = (...) => {...}`.
- **Every prop gets a `/** ... *\/` comment directly above it**, one to a few lines, explaining
  what it does and any non-obvious default or behavior (see `Button.tsx`'s `leadingIcon` /
  `iconOnly` / `loading` docs for the level of detail expected — e.g. note pixel sizes, which
  variants something applies to, what it replaces).
- **Variant/size types are exported**, not inlined, so stories and consumers can import them
  (`export type ButtonVariant = ...`).
- **className is built as an array run through `.filter(Boolean).join(' ')`**, always including
  the incoming `className` prop last so consumers can extend styling. Don't use template-literal
  concatenation or a classnames library — this repo doesn't have one as a dependency.
- **All class names are prefixed `ds-`**, kebab-case, in the BEM-ish shape
  `ds-<component>`, `ds-<component>--<modifier>`, `ds-<component>__<part>`. Match the folder/file
  name in kebab-case (e.g. `AlertBanner` → `ds-alert-banner`).
- **Import the sibling CSS file directly**: `import './ComponentName.css';` — there's no CSS
  modules or styled-components convention here, plain global classes scoped by the `ds-` prefix.
- **Reuse existing components for existing behavior.** A loading state renders `<Spinner />`
  (matching its variant to the surface it sits on, see `Button.tsx`'s `DARK_FILL_VARIANTS` for the
  pattern of picking a sub-component variant based on the parent's own variant). An icon slot
  takes `React.ReactNode` (so callers pass `<Icon name="..." />`) rather than a fixed icon name
  prop, unless the component's icon is truly fixed and internal.
- **Keep components controlled/stateless where the existing library does.** Check whether the
  closest sibling component manages its own state (e.g. `Toggle`, `Checkbox`) or expects the
  parent to (e.g. `Tabs` with an `activeIndex` + `onChange` prop) and follow that component's
  pattern rather than picking whichever is more convenient.
