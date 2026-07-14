// ─────────────────────────────────────────────
//  Design Tokens — Shadow
//  Sourced from Figma · Shared UI Design · shadow-* effect styles
//  Layer order and alpha values mirror the Figma effects exactly
//  (#101828 base · 0D=5% 0F=6% 1A=10% 08=3% 14=8% 2E=18%).
// ─────────────────────────────────────────────

const shadow = {
  xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  sm: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)',
  md: '0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
  lg: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
  xl: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
  // Focus - Default — the keyboard-focus ring used across every interactive
  // component (fields, buttons, menu items, day cells...). Colour is
  // navy-blue-800 (#002AA8) at 60% alpha.
  focus: '0 0 0 4px rgba(0, 42, 168, 0.6)',
};

export default shadow;
