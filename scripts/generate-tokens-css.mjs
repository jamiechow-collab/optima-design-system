// ─────────────────────────────────────────────────────────────────────────────
//  Generates src/tokens/tokens.css — CSS custom properties mirroring the
//  design tokens in src/tokens/*.js. Run via `npm run tokens` (also wired as
//  a pre-hook on start/build/storybook so it can never go stale).
//
//  Naming mirrors the token vocabulary already used throughout component CSS
//  comments, e.g. `/* core-bg/secondary-hover */` -> --color-core-bg-secondary-hover,
//  `/* radius/md */` -> --radius-md, `/* spacing/sm */` -> --spacing-sm.
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import spacing from '../src/tokens/spacing.js';
import radius from '../src/tokens/radius.js';
import shadow from '../src/tokens/shadow.js';
import colors from '../src/tokens/colors.js';
import { fontFamily, fontWeight, fontSize } from '../src/tokens/typography.js';
import grid from '../src/tokens/grid.js';

const toKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const lines = [];
const push = (name, value) => lines.push(`  --${name}: ${value};`);

// ── Spacing ─────────────────────────────────────────────────────────────────
lines.push('  /* Spacing — src/tokens/spacing.js */');
Object.entries(spacing).forEach(([key, px]) => push(`spacing-${key}`, `${px}px`));

// ── Radius ──────────────────────────────────────────────────────────────────
lines.push('');
lines.push('  /* Border radius — src/tokens/radius.js */');
Object.entries(radius).forEach(([key, px]) => push(`radius-${toKebab(key)}`, `${px}px`));

// ── Shadow ──────────────────────────────────────────────────────────────────
lines.push('');
lines.push('  /* Shadow — src/tokens/shadow.js */');
Object.entries(shadow).forEach(([key, value]) => push(`shadow-${key}`, value));

// ── Typography ──────────────────────────────────────────────────────────────
lines.push('');
lines.push('  /* Typography — src/tokens/typography.js (line-heights reuse --spacing-*) */');
push('font-family', fontFamily);
Object.entries(fontWeight).forEach(([key, value]) => push(`font-weight-${key}`, value));
Object.entries(fontSize).forEach(([key, value]) => push(`font-size-${toKebab(key)}`, `${value}px`));

// ── Colour ──────────────────────────────────────────────────────────────────
// `background.core.*` / `background.beige.*` map to `core-bg-*` / `beige-bg-*`
// (not `background-core-*`) to match the existing CSS comment vocabulary.
lines.push('');
lines.push('  /* Colour — src/tokens/colors.js */');
Object.entries(colors.brand).forEach(([key, hex]) => push(`color-brand-${toKebab(key)}`, hex));
Object.entries(colors.text).forEach(([key, hex]) => push(`color-text-${toKebab(key)}`, hex));
Object.entries(colors.border).forEach(([key, hex]) => push(`color-border-${toKebab(key)}`, hex));
Object.entries(colors.background.core).forEach(([key, hex]) => push(`color-core-bg-${toKebab(key)}`, hex));
Object.entries(colors.background.beige).forEach(([key, hex]) => push(`color-beige-bg-${toKebab(key)}`, hex));
Object.entries(colors.alert).forEach(([variant, group]) => {
  Object.entries(group).forEach(([key, hex]) => {
    // The base tone is named e.g. "alert/negative" in CSS comments, not
    // "alert/negative-color" — drop the "-color" suffix for that one key.
    const suffix = key === 'color' ? '' : `-${toKebab(key)}`;
    push(`color-alert-${variant}${suffix}`, hex);
  });
});

// ── Layout grid ─────────────────────────────────────────────────────────────
// Informational — not currently consumed by component CSS (page/layout level).
lines.push('');
lines.push('  /* Layout grid — src/tokens/grid.js */');
Object.entries(grid).forEach(([breakpoint, values]) => {
  Object.entries(values).forEach(([key, value]) => {
    const unit = key === 'columns' ? '' : 'px';
    push(`grid-${toKebab(breakpoint)}-${toKebab(key)}`, `${value}${unit}`);
  });
});

const css = `/* ─────────────────────────────────────────────────────────────────────────
   AUTO-GENERATED — do not edit directly.
   Run \`npm run tokens\` (scripts/generate-tokens-css.mjs) to regenerate this
   file from src/tokens/*.js after changing a token value there.
   ───────────────────────────────────────────────────────────────────────── */

:root {
${lines.join('\n')}
}
`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'tokens', 'tokens.css');
writeFileSync(outPath, css);

const count = lines.filter((line) => line.trim().startsWith('--')).length;
console.log(`Wrote ${count} custom properties to ${path.relative(process.cwd(), outPath)}`);
