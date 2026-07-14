import React from 'react';
import colors from '../tokens/colors';
import { fontFamily } from '../tokens/typography';

const meta = {
  title: 'Tokens/Colour',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  Page wrapper — sets the Figma type family (Inter) explicitly, since a plain
//  canvas story (unlike an MDX docs page) has no default font-family and would
//  otherwise fall back to the browser's serif default.
// ─────────────────────────────────────────────────────────────────────────────

const Page = ({ children }) => (
  <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh', maxWidth: 900, fontFamily }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Swatch — shows the colour, its semantic name + description, and the
//  primitive token it references (e.g. "black-900") instead of a raw hex.
// ─────────────────────────────────────────────────────────────────────────────

const Swatch = ({ name, hex, description, border, reference }) => {
  const swatchStyle = {
    width: 56,
    height: 56,
    borderRadius: 8,
    background: hex,
    border: border ? `1px solid ${border}` : '1px solid rgba(0,0,0,0.06)',
    flexShrink: 0,
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    width: '100%',
  };

  const nameStyle = {
    fontSize: 15,
    fontWeight: 600,
    color: '#1F2937',
  };

  const descStyle = {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  };

  const referenceStyle = {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#9CA3AF',
    marginLeft: 'auto',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={rowStyle}>
      <div style={swatchStyle} />
      <div>
        <div style={nameStyle}>{name}</div>
        {description && <div style={descStyle}>{description}</div>}
      </div>
      <div style={referenceStyle}>{reference}</div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Layout helpers — matches the Figma "Colour / Guideline" card layout:
//  a bold section title, then one or more bordered cards of swatches.
// ─────────────────────────────────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#111827' }}>{title}</h2>
    {children}
  </div>
);

const Card = ({ subtitle, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: 12,
      padding: 24,
      marginBottom: 16,
    }}
  >
    {subtitle && <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{subtitle}</div>}
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Section content — one function per Figma section, reused by both the
//  "All Colours" overview and each section's own sidebar page.
// ─────────────────────────────────────────────────────────────────────────────

const BrandColourSection = () => (
  <Section title="Brand colour">
    <Card>
      <Swatch name="primary-color" hex={colors.brand.primary} reference="black-900" description="Use to emphasise main ui components" />
      <Swatch name="secondary-color" hex={colors.brand.secondary} border={colors.brand.secondaryBorder} reference="beige-200" description="Use to support main ui components" />
      <Swatch name="highlight-color" hex={colors.brand.highlight} reference="orange-700" description="Use to highlight main ui components" />
    </Card>
  </Section>
);

const TextColourSection = () => (
  <Section title="Text colour">
    <p style={{ fontSize: 14, color: '#6B7280', marginTop: -8, marginBottom: 16 }}>Can also be used for icons</p>
    <Card>
      <Swatch name="primary-text-color" hex={colors.text.primary} reference="black-900" description="Use for default text color" />
      <Swatch name="secondary-text-color" hex={colors.text.secondary} reference="black-600" description="Use when you need text with lesser importance" />
      <Swatch name="text-color-on-invert" hex={colors.text.invert} border={colors.brand.secondaryBorder} reference="beige-20" description="Inverted text color on dark background" />
      <Swatch name="disabled-text-color" hex={colors.text.disabled} reference="black-300" description="Use as text in disabled components" />
      <Swatch name="placeholder-color" hex={colors.text.placeholder} reference="black-400" description="Use as tertiary text colour, e.g. placeholder text or menu section labels" />
      <Swatch name="link-color" hex={colors.text.highlight} reference="navy-blue-800" description="Use only for links" />
    </Card>
  </Section>
);

const CoreBackgroundSection = () => (
  <Section title="Core background">
    <Card subtitle="Primary">
      <Swatch name="primary-dark-background" hex={colors.background.core.primary} reference="black-900" description="Core background color" />
      <Swatch name="primary-background-hover" hex={colors.background.core.primaryHover} reference="black-700" description="Use as hover color on core background" />
      <Swatch name="primary-background-selected" hex={colors.background.core.primarySelected} border={colors.border.layout} reference="beige-20" description="Use to indicate selected state of core items" />
      <Swatch name="primary-background-selected-hover" hex={colors.background.core.primarySelectedHover} reference="black-700" description="Use to hover selected state of core items" />
      <Swatch name="primary-background-disabled" hex={colors.background.core.primaryDisabled} reference="black-50" description="Use to indicate core items is disabled" />
    </Card>
    <Card subtitle="Secondary">
      <Swatch name="secondary-background" hex={colors.background.core.secondary} border={colors.brand.secondaryBorder} reference="beige-20" description="Primary background color" />
      <Swatch name="secondary-background-hover" hex={colors.background.core.secondaryHover} reference="beige-50" description="Use as hover color on primary background" />
      <Swatch name="secondary-background-selected" hex={colors.background.core.secondarySelected} reference="beige-200" description="Use to indicate selected state of primary items" />
      <Swatch name="secondary-background-selected-hover" hex={colors.background.core.secondarySelectedHover} reference="black-700" description="Use to indicate selected state of primary items" />
      <Swatch name="secondary-background-disabled" hex={colors.background.core.secondaryDisabled} reference="black-50" description="Use to indicate primary items is disabled" />
    </Card>
    <Card subtitle="Tertiary">
      <Swatch name="tertiary-background" hex={colors.background.core.tertiary} reference="black-50" description="Primary background color" />
      <Swatch name="tertiary-background-hover" hex={colors.background.core.tertiaryHover} reference="black-100" description="Use as hover color on primary background" />
      <Swatch name="tertiary-background-selected" hex={colors.background.core.tertiarySelected} reference="black-700" description="Use to indicate selected state of primary items" />
      <Swatch name="tertiary-background-selected-hover" hex={colors.background.core.tertiarySelectedHover} reference="black-100" description="Use to indicate selected state of primary items" />
      <Swatch name="tertiary-background-disabled" hex={colors.background.core.tertiaryDisabled} reference="black-50" description="Use to indicate primary items is disabled" />
    </Card>
  </Section>
);

const BeigeBackgroundSection = () => (
  <Section title="Beige background">
    <Card subtitle="Primary">
      <Swatch name="primary-background" hex={colors.background.beige.primary} reference="beige-50" description="Tertiary background color" />
      <Swatch name="primary-background-hover" hex={colors.background.beige.primaryHover} reference="beige-200" description="Use as hover color on tertiary background" />
      <Swatch name="primary-background-selected" hex={colors.background.beige.primarySelected} reference="beige-400" description="Use to indicate selected state of tertiary items" />
      <Swatch name="primary-background-selected-hover" hex={colors.background.beige.primarySelectedHover} reference="beige-200" description="Use as hover color" />
    </Card>
    <Card subtitle="Secondary">
      <Swatch name="secondary-background" hex={colors.background.beige.secondary} reference="beige-200" description="Secondary background color" />
      <Swatch name="secondary-background-hover" hex={colors.background.beige.secondaryHover} reference="beige-300" description="Use as hover color on secondary background" />
      <Swatch name="secondary-background-selected" hex={colors.background.beige.secondarySelected} reference="beige-400" description="Use to indicate selected state of secondary items" />
      <Swatch name="secondary-background-selected-hover" hex={colors.background.beige.secondarySelectedHover} reference="beige-300" description="Use as hover color" />
    </Card>
  </Section>
);

const AlertSection = () => (
  <Section title="Alert">
    <Card subtitle="Message">
      <Swatch name="message-color" hex={colors.alert.message.color} reference="sea-blue-600" description="Use to indicate a neutral message" />
      <Swatch name="message-color-stressed" hex={colors.alert.message.stressed} reference="sea-blue-900" description="Use only as hover color on message color" />
      <Swatch name="message-color-selected" hex={colors.alert.message.selected} reference="sea-blue-50" description="Use only as selected indication for a neutral message colors" />
      <Swatch name="message-color-selected-hover" hex={colors.alert.message.selectedHover} reference="sea-blue-200" description="Use to indicate hover state on a message-color-selected item" />
      <Swatch name="message-color-background" hex={colors.alert.message.background} reference="sea-blue-20" description="Use for neutral message background" />
    </Card>
    <Card subtitle="Positive">
      <Swatch name="positive-color" hex={colors.alert.positive.color} reference="green-800" description="Use to indicate a positive action/state (success, completion, approval...)" />
      <Swatch name="positive-color-stressed" hex={colors.alert.positive.stressed} reference="green-950" description="Use only as hover color on positive color" />
      <Swatch name="positive-color-selected" hex={colors.alert.positive.selected} reference="green-50" description="Use only as selected indication for a positive colors" />
      <Swatch name="positive-color-selected-hover" hex={colors.alert.positive.selectedHover} reference="green-200" description="Use to indicate hover state on a positive-color-selected item" />
      <Swatch name="positive-color-background" hex={colors.alert.positive.background} reference="green-20" description="Use for positive background" />
    </Card>
    <Card subtitle="Negative">
      <Swatch name="negative-color" hex={colors.alert.negative.color} reference="red-800" description="Use to indicate a negative action/state (delete, error...)" />
      <Swatch name="negative-color-stressed" hex={colors.alert.negative.stressed} reference="red-950" description="Use only as hover color on negative color" />
      <Swatch name="negative-color-selected" hex={colors.alert.negative.selected} reference="red-50" description="Use as selected indication for negative colors" />
      <Swatch name="negative-color-selected-hover" hex={colors.alert.negative.selectedHover} reference="red-200" description="Use to indicate hover state on a negative-selected item" />
      <Swatch name="negative-color-background" hex={colors.alert.negative.background} reference="red-20" description="Use for negative background" />
    </Card>
    <Card subtitle="Warning">
      <Swatch name="warning-color" hex={colors.alert.warning.color} reference="amber-800" description="Use to indicate a warning action/state (severity, alert, caution...)" />
      <Swatch name="warning-color-stressed" hex={colors.alert.warning.stressed} reference="amber-950" description="Use only as hover color on warning color" />
      <Swatch name="warning-color-selected" hex={colors.alert.warning.selected} reference="amber-50" description="Use as selected indication for warning colors" />
      <Swatch name="warning-color-selected-hover" hex={colors.alert.warning.selectedHover} reference="amber-200" description="Use to indicate hover state on a warning-selected item" />
      <Swatch name="warning-color-background" hex={colors.alert.warning.background} reference="amber-20" description="Use for warning background" />
    </Card>
  </Section>
);

const BorderSection = () => (
  <Section title="Border">
    <Card>
      <Swatch name="ui-border-color-active" hex={colors.border.uiActive} reference="black-900" description="Border color for ui elements and components when active (Button, Input...)" />
      <Swatch name="ui-border-color-inactive" hex={colors.border.uiInactive} reference="black-300" description="Border color for ui elements and components when inactive (Button, Input...)" />
      <Swatch name="ui-border-hover-color" hex={colors.border.uiHover} reference="black-800" description="Use as hover color for ui border" />
      <Swatch name="ui-border-disabled" hex={colors.border.uiDisabled} reference="black-100" description="Use as disabled color for ui border" />
      <Swatch name="layout-border-color" hex={colors.border.layout} reference="border-layout" description="Border color for general layout and separators (Leftpane, Menu Divider...)" />
      <Swatch name="border-invert" hex={colors.border.invert} border={colors.brand.secondaryBorder} reference="beige-20" description="Border color for general layout and separators on inverted surfaces" />
    </Card>
  </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
//  Stories
// ─────────────────────────────────────────────────────────────────────────────

export const AllColours = () => (
  <Page>
    <BrandColourSection />
    <TextColourSection />
    <CoreBackgroundSection />
    <BeigeBackgroundSection />
    <AlertSection />
    <BorderSection />
  </Page>
);

export const BrandColour = () => (
  <Page>
    <BrandColourSection />
  </Page>
);

export const TextColour = () => (
  <Page>
    <TextColourSection />
  </Page>
);

export const CoreBackground = () => (
  <Page>
    <CoreBackgroundSection />
  </Page>
);

export const BeigeBackground = () => (
  <Page>
    <BeigeBackgroundSection />
  </Page>
);

export const Alert = () => (
  <Page>
    <AlertSection />
  </Page>
);
