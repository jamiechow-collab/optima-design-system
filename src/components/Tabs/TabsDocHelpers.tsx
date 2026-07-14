import React, { useState } from 'react';
import { TabList, TabListVariant } from './TabList';
import { Tab } from './Tab';
import { Icon } from '../Icon/Icon';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Tabs.mdx — replicate the Figma spec cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

const TABS = [
  { value: 'overview', label: 'Overview' },
  { value: 'notification', label: 'Notification' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'customers', label: 'Customers' },
];

const ExampleTabs = ({
  variant,
  withIcons = false,
}: {
  variant: TabListVariant;
  withIcons?: boolean;
}) => {
  const [active, setActive] = useState('overview');
  return (
    <TabList variant={variant} aria-label="Example sections">
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          active={active === tab.value}
          icon={withIcons ? <Icon name="placeholder" size="sm" /> : undefined}
          onClick={() => setActive(tab.value)}
        >
          {tab.label}
        </Tab>
      ))}
    </TabList>
  );
};

export const AnatomyExample = () => (
  <div style={{ ...card, width: 'fit-content' }}>
    <ExampleTabs variant="underline" withIcons />
  </div>
);

export const HorizontalExample = () => (
  <div style={{ ...card, width: 500 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={exampleLabel}>Pill</span>
      <ExampleTabs variant="pill" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={exampleLabel}>Underline</span>
      <ExampleTabs variant="underline" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={exampleLabel}>Underline with icons</span>
      <ExampleTabs variant="underline" withIcons />
    </div>
  </div>
);

export const VerticalExample = () => (
  <div style={{ ...card, width: 220 }}>
    <ExampleTabs variant="vertical" />
  </div>
);

export const VerticalWithBadgesExample = () => {
  const [active, setActive] = useState('analytics');
  return (
    <div style={{ ...card, width: 220 }}>
      <TabList variant="vertical" aria-label="Example sections">
        <Tab
          active={active === 'overview'}
          icon={<Icon name="placeholder" size="sm" />}
          onClick={() => setActive('overview')}
        >
          Overview
        </Tab>
        <Tab
          active={active === 'notification'}
          icon={<Icon name="placeholder" size="sm" />}
          onClick={() => setActive('notification')}
        >
          Notification
        </Tab>
        <Tab
          active={active === 'analytics'}
          icon={<Icon name="placeholder" size="sm" />}
          badge="Badge"
          onClick={() => setActive('analytics')}
        >
          Analytics
        </Tab>
        <Tab
          active={active === 'customers'}
          icon={<Icon name="placeholder" size="sm" />}
          badge="Badge"
          onClick={() => setActive('customers')}
        >
          Customers
        </Tab>
      </TabList>
    </div>
  );
};
