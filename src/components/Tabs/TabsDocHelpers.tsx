import React, { useState } from 'react';
import { NavTabList } from '../NavTab/NavTabList';
import { NavTab } from '../NavTab/NavTab';
import { UiTabList } from '../UiTab/UiTabList';
import { UiTab } from '../UiTab/UiTab';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Tabs.mdx — the "Types" examples from the Figma guideline.
// ─────────────────────────────────────────────────────────────────────────────

const NAV_TABS = ['Overview', 'Notification', 'Analytics', 'Customers'];

const NavExample = ({ variant }: { variant: 'pill' | 'underline' }) => {
  const [active, setActive] = useState(0);
  return (
    <NavTabList variant={variant} aria-label="Example sections">
      {NAV_TABS.map((label, i) => (
        <NavTab key={label} active={active === i} onClick={() => setActive(i)}>
          {label}
        </NavTab>
      ))}
    </NavTabList>
  );
};

export const NavTabTypesExample = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1006 }}>
    <NavExample variant="underline" />
    <NavExample variant="pill" />
  </div>
);

export const UiTabTypeExample = () => {
  const [active, setActive] = useState(0);
  return (
    <UiTabList aria-label="Example views">
      {['Label', 'Label', 'Label'].map((label, i) => (
        <UiTab key={i} active={active === i} onClick={() => setActive(i)}>
          {label}
        </UiTab>
      ))}
    </UiTabList>
  );
};
