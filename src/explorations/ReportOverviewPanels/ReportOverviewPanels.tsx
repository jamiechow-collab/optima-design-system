import React, { useState } from 'react';
import './ReportOverviewPanels.css';

import { Sidenav } from '../../components/Sidenav/Sidenav';
import { SidenavNavItem } from '../../components/Sidenav/SidenavNavItem';
import { SidenavActionButton } from '../../components/Sidenav/SidenavActionButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { IconMenuButton, InlineMenuButton, MenuButton } from '../../components/MenuButton/MenuButton';
import { Menu, MenuItem } from '../../components/Menu/Menu';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Badge } from '../../components/Badge/Badge';
import { Icon } from '../../components/Icon/Icon';
import { CountryIconName } from '../../components/Icon/icons';
import { Table, TableColumn } from '../../components/Table/Table';
import { BarChart } from '../../components/BarChart/BarChart';
import { TabList } from '../../components/Tabs/TabList';
import { Tab } from '../../components/Tabs/Tab';
import { TabPanel } from '../../components/Tabs/TabPanel';
import { TextInput } from '../../components/TextInput/TextInput';
import { ToggleButton } from '../../components/ToggleButton/ToggleButton';

// ── Mock data ────────────────────────────────────────────────────────────
// Every number/name below is fabricated for this prototype — see the
// exploration's registry "notes" for known gaps and inconsistencies inherited
// from the source Figma screens.

type Trend = 'up' | 'down';

interface StatTileData {
  key: string;
  label: string;
  value: string;
}

interface ChannelRow {
  id: string;
  name: string;
  /** Hex, not a token — the design system has no categorical/series palette;
      these are the exact per-channel colors from Figma's own legend. */
  dotColor: string;
  impTG: string;
  impTGTrend: Trend;
  reachTG: string;
  reachTGTrend: Trend;
  otp: string;
  otpTrend: Trend;
  hitrate: string;
  hitrateTrend: Trend;
  frequency: string;
  frequencyTrend: Trend;
}

interface ChartCardData {
  id: string;
  title: string;
  data: number[];
  description: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const STATS: StatTileData[] = [
  { key: 'imp-total', label: 'Impression (Total)', value: '59,551,887' },
  { key: 'imp-tg', label: 'Impression (in TG)', value: '52,083,551' },
  { key: 'reach-total', label: 'Reach (Total)', value: '18,394,429' },
  { key: 'reach-tg', label: 'Reach (in TG)', value: '51% / 13,384,604' },
  { key: 'otp', label: 'OTP', value: '72.8%' },
  { key: 'hitrate', label: 'Hitrate', value: '1.46x' },
  { key: 'freq-total', label: 'Frequency (Total)', value: '4' },
  { key: 'freq-tg', label: 'Frequency (in TG)', value: '3.7' },
];

const CHANNELS: ChannelRow[] = [
  {
    id: 'meta',
    name: 'Meta',
    dotColor: '#81a8b4',
    impTG: '18.2M',
    impTGTrend: 'up',
    reachTG: '6.1M',
    reachTGTrend: 'up',
    otp: '74%',
    otpTrend: 'up',
    hitrate: '1.52x',
    hitrateTrend: 'down',
    frequency: '4.1',
    frequencyTrend: 'up',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    dotColor: '#c9ab15',
    impTG: '11.4M',
    impTGTrend: 'down',
    reachTG: '4.4M',
    reachTGTrend: 'down',
    otp: '61%',
    otpTrend: 'down',
    hitrate: '1.38x',
    hitrateTrend: 'up',
    frequency: '3.6',
    frequencyTrend: 'down',
  },
  {
    id: 'netflix',
    name: 'Netflix',
    dotColor: '#824f4f',
    impTG: '9.8M',
    impTGTrend: 'up',
    reachTG: '3.9M',
    reachTGTrend: 'up',
    otp: '68%',
    otpTrend: 'up',
    hitrate: '1.29x',
    hitrateTrend: 'up',
    frequency: '3.9',
    frequencyTrend: 'down',
  },
  {
    id: 'youtube',
    name: 'Youtube',
    dotColor: '#d17e5d',
    impTG: '7.3M',
    impTGTrend: 'down',
    reachTG: '2.6M',
    reachTGTrend: 'down',
    otp: '55%',
    otpTrend: 'down',
    hitrate: '1.10x',
    hitrateTrend: 'down',
    frequency: '3.2',
    frequencyTrend: 'up',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    dotColor: '#8866ad',
    impTG: '5.4M',
    impTGTrend: 'up',
    reachTG: '1.9M',
    reachTGTrend: 'up',
    otp: '63%',
    otpTrend: 'up',
    hitrate: '1.44x',
    hitrateTrend: 'down',
    frequency: '4.4',
    frequencyTrend: 'up',
  },
];

const CHARTS: ChartCardData[] = [
  {
    id: 'reach-overlap',
    title: 'Reach in TG overlap (%)',
    data: [14, 20, 17, 23, 19, 26, 21, 24, 18, 15],
    description:
      "This shows how much of the campaign's reach in Germany 16-25 Female overlaps with " +
      "previous flights of Lidl_Xmas 26, broken out by day. A high overlap means the campaign " +
      'is reaching the same core audience repeatedly rather than expanding into new parts of the ' +
      'target group.',
  },
  {
    id: 'incremental-reach',
    title: 'Incremental Reach',
    data: [8, 12, 15, 13, 19, 24, 20, 27, 22, 18],
    description:
      'Incremental reach tracks how many additional people in the target group were reached each ' +
      "day beyond who'd already seen a Lidl_Xmas 26 ad. The steady climb through the second week " +
      'suggests the media mix is still finding new audience rather than plateauing.',
  },
  {
    id: 'incremental-reach-tg',
    title: 'Incremental Reach in TG (%)',
    data: [10, 9, 14, 17, 12, 19, 15, 21, 17, 13],
    description:
      'This expresses the same incremental-reach signal as a percentage of the total target group ' +
      "population, making it easier to compare against the campaign's overall reach ceiling of 51%.",
  },
  {
    id: 'reach-by-age',
    title: 'Total and Incremental Reach by age',
    data: [21, 18, 25, 20, 16, 23, 21, 15, 24, 19],
    description:
      'Reach is broken down by age band to show which cohorts are driving total delivery versus ' +
      'which are still being newly reached. The 16-20 band is closer to saturation than 21-25, ' +
      'which still has meaningful incremental reach left to capture.',
  },
];

const REPORT_DETAILS = {
  dateCreated: "20 Dec '25",
  reportPeriod: "20 Dec '25 - 12 Jan '26",
  cadence: 'Daily',
  // Kept exactly as shown on the source Figma screens, even though it
  // doesn't match the report's own client ("Lidl") — see registry notes.
  client: 'Premier Inn',
};

const TARGET_GROUP = {
  country: 'Germany (DE)',
  countryFlag: 'de' as CountryIconName,
  age: '16-25',
  gender: 'Female',
  tgPopulation: '13% of DE population (4,459,633)',
  language: 'German',
  interest: 'Grocery & Household',
  device: 'Mobile-first',
};

const BUDGET = '£2,000,000';

const CAMPAIGNS_COUNT = 10;
const CAMPAIGNS = [
  { name: 'Premier I...', period: "20 Dec '25 - 30 Jan '26" },
  { name: 'Premier I...', period: "15 Jan '26 - 5 Feb '26" },
  { name: 'Premier I...', period: "1 Feb '26 - 20 Feb '26" },
  { name: 'Premier I...', period: "21 Feb '26 - 10 Mar '26" },
  { name: 'Premier I...', period: "11 Mar '26 - 31 Mar '26" },
  { name: 'Premier I...', period: "1 Apr '26 - 15 Apr '26" },
  { name: 'Premier I...', period: "16 Apr '26 - 5 May '26" },
  { name: 'Premier I...', period: "6 May '26 - 25 May '26" },
  { name: 'Premier I...', period: "26 May '26 - 14 Jun '26" },
  { name: 'Premier I...', period: "15 Jun '26 - 30 Jun '26" },
];

const AI_SUMMARY_TEXT =
  'Lidl_Xmas 26 is pacing ahead of plan, with reach in the target group up 6 points week-over-' +
  "week and OTP holding above 70%. Meta and Netflix are driving most of the campaign's " +
  "incremental reach, while Amazon's frequency is creeping past the efficient range for this " +
  "budget. Against last year's Christmas flight, this run is reaching women 16-25 about 12% " +
  'more efficiently per pound spent.';

const CANNED_AI_REPLY =
  "Meta and Netflix are contributing the most incremental reach so far — Meta's frequency is " +
  "still efficient, but Amazon's is creeping above 4x for this audience, which is worth a budget " +
  'check before the next flight.';

interface OrgOption {
  value: string;
  label: string;
}

const ORG_OPTIONS: OrgOption[] = [
  { value: 'pg', label: 'Procter & Gamble' },
  { value: 'lidl', label: 'Lidl GB' },
  { value: 'tesco', label: 'Tesco UK' },
  { value: 'unilever', label: 'Unilever' },
];

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' as const },
  { key: 'campaigns', label: 'Campaigns', icon: 'trumpet' as const },
  { key: 'reports', label: 'Reports', icon: 'vertical-bar-card' as const },
  { key: 'items', label: 'Items', icon: 'grid-3' as const },
  { key: 'integrations', label: 'Integrations', icon: 'connect' as const },
];

const APLogo = () => (
  <svg width="24" height="25" viewBox="0 0 30 31" fill="none" aria-label="AudienceProject" role="img">
    <path
      d="M13.75 15.5L6.25 23H0L7.5 15.5L0 8H6.25L13.75 15.5ZM30 18V23H13.75V18H30ZM30 13H13.75V8H30V13Z"
      fill="currentColor"
    />
  </svg>
);

// A sparkle/"ask AI" glyph doesn't exist in the Optima icon set yet, so this
// prototype defines a small local SVG rather than inventing an IconName —
// see registry notes.
// Neither of these has a design-system Icon equivalent — reproduced
// directly from Figma's "Core/sparkle" and "Core/expand" exports so they
// match exactly rather than approximating with an existing glyph.
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path
      d="M8.33594 9.73438C8.53474 9.73447 8.73343 9.85835 8.83301 10.0322L9.45508 11.1523L10.5752 11.7744C10.7743 11.8739 10.874 12.0734 10.874 12.2725C10.8739 12.4714 10.7492 12.67 10.5752 12.7695L9.45508 13.3916L8.83301 14.5117C8.7335 14.7106 8.53488 14.8105 8.33594 14.8105C8.13688 14.8105 7.93742 14.6859 7.83789 14.5117L7.21582 13.3916L6.09668 12.7695C5.89771 12.67 5.79794 12.4714 5.79785 12.2725C5.79785 12.0734 5.9225 11.8739 6.09668 11.7744L7.24121 11.1523L7.83789 10.0322C7.93747 9.83334 8.13697 9.73438 8.33594 9.73438ZM8.13672 11.8496C8.087 11.9489 8.01238 12.0235 7.91309 12.0732L7.53906 12.2725L7.91309 12.4717C8.01238 12.5214 8.08703 12.5959 8.13672 12.6953L8.33594 13.0684L8.55957 12.6953C8.60926 12.5959 8.68391 12.5214 8.7832 12.4717L9.13184 12.2725L8.75879 12.0732C8.65943 12.0236 8.58492 11.9489 8.53516 11.8496L8.33594 11.4756L8.13672 11.8496ZM4.52832 1C4.72738 1 4.92684 1.12464 5.02637 1.29883L6.34473 3.71191L8.75879 5.03125C8.9578 5.1308 9.05762 5.33025 9.05762 5.5293C9.05744 5.72818 8.93278 5.92688 8.75879 6.02637L6.34473 7.3457L5.02637 9.75879C4.92684 9.95786 4.72738 10.0576 4.52832 10.0576C4.32937 10.0575 4.13072 9.93288 4.03125 9.75879L2.71191 7.3457L0.298828 6.02637C0.0999092 5.9269 0.000142964 5.72822 0 5.5293C0 5.33023 0.124649 5.13079 0.298828 5.03125L2.71191 3.71191L4.03125 1.29883C4.13072 1.09987 4.32937 1.00011 4.52832 1ZM3.6582 4.40918C3.60844 4.50872 3.53312 4.58304 3.43359 4.63281L1.79199 5.5293L3.43359 6.4248C3.53312 6.47457 3.60844 6.5489 3.6582 6.64844L4.55371 8.29102L5.44922 6.64844C5.52374 6.57391 5.59833 6.47464 5.67285 6.4248L7.31543 5.5293L5.67285 4.63281C5.57354 4.58305 5.49891 4.50856 5.44922 4.40918L4.55371 2.7666L3.6582 4.40918ZM12.5908 1.02441C12.7897 1.0245 12.9884 1.14923 13.0879 1.32324L13.71 2.44336L14.8301 3.06543C15.0041 3.16493 15.1288 3.36359 15.1289 3.5625C15.1289 3.76157 15.0043 3.96101 14.8301 4.06055L13.71 4.68262L13.0879 5.80273C12.9883 6.00146 12.7897 6.10052 12.5908 6.10059C12.3918 6.10059 12.1923 5.97683 12.0928 5.80273L11.4707 4.68262L10.3516 4.06055C10.1525 3.96101 10.0527 3.76157 10.0527 3.5625C10.0529 3.36355 10.1775 3.16491 10.3516 3.06543L11.4707 2.44336L12.0928 1.32324C12.1923 1.12417 12.3918 1.02441 12.5908 1.02441ZM12.3916 3.13965C12.3419 3.23915 12.2674 3.31449 12.168 3.36426L11.7939 3.5625L12.168 3.76172C12.2674 3.81149 12.3419 3.88686 12.3916 3.98633L12.5908 4.35938L12.79 3.98633C12.8398 3.88679 12.9141 3.81149 13.0137 3.76172L13.3867 3.5625L13.0137 3.36426C12.9141 3.31449 12.8398 3.23918 12.79 3.13965L12.5908 2.7666L12.3916 3.13965Z"
      fill="currentColor"
    />
  </svg>
);

const ExpandIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path
      d="M6.70605 8.30762C6.87965 8.13403 7.14965 8.13403 7.32324 8.30762C7.49678 8.48121 7.49682 8.75123 7.32324 8.9248L3.46582 12.7822H5.5293C5.76066 12.7822 5.95394 12.9747 5.9541 13.2061C5.9541 13.4375 5.78028 13.6504 5.54883 13.6504H2.4248C2.19335 13.6504 2 13.457 2 13.2256V10.2744C2.00012 10.0431 2.19342 9.85059 2.4248 9.85059C2.65598 9.85085 2.84852 10.0432 2.84863 10.2744V12.165L6.70605 8.30762ZM13.0713 2C13.3027 2.00002 13.4951 2.19336 13.4951 2.4248V5.37598C13.4949 5.60729 13.3026 5.79979 13.0713 5.7998C12.8399 5.7998 12.6467 5.60729 12.6465 5.37598V3.46582L8.78906 7.32324C8.69275 7.40029 8.57748 7.45883 8.46191 7.45898C8.34619 7.45898 8.23047 7.41968 8.15332 7.32324C7.97973 7.14965 7.97973 6.87964 8.15332 6.70605L12.0107 2.84863H9.94629C9.71502 2.84845 9.52254 2.65609 9.52246 2.4248C9.52246 2.19346 9.71498 2.00018 9.94629 2H13.0713Z"
      fill="currentColor"
    />
  </svg>
);

// ── Small building blocks ───────────────────────────────────────────────────

// The design system's arrow-top-right/arrow-bottom-right icons are bare
// glyphs — Figma's trend indicator is a filled circular badge (the alert
// background token) with the arrow inside it, so it's reproduced directly
// here rather than layering a background behind the existing icon.
const TrendBadge = ({ trend }: { trend: Trend }) => {
  const isUp = trend === 'up';
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className="rop-trend"
      role="img"
      aria-label={isUp ? 'Trending up' : 'Trending down'}
    >
      <circle
        cx="6"
        cy="6"
        r="6"
        fill={isUp ? 'var(--color-alert-positive-background, #e5f3e2)' : 'var(--color-alert-negative-background, #fcefed)'}
      />
      {isUp ? (
        <path
          d="M3.35478 9C3.26121 9 3.16764 8.96891 3.10526 8.89119C2.96491 8.75129 2.96491 8.53368 3.10526 8.39378L7.83041 3.68394H4.05653C3.8694 3.68394 3.71345 3.5285 3.71345 3.34197C3.71345 3.15544 3.8694 3 4.05653 3H8.65692C8.84405 3 9 3.15544 9 3.34197V7.95855C9 8.14508 8.84405 8.30052 8.65692 8.30052C8.46978 8.30052 8.31384 8.14508 8.31384 7.95855V4.21244L3.60429 8.90674C3.54191 8.96891 3.44834 9 3.35478 9Z"
          fill="var(--color-alert-positive, #448537)"
        />
      ) : (
        <path
          d="M3.35478 3C3.26121 3 3.16764 3.03109 3.10526 3.10881C2.96491 3.24871 2.96491 3.46632 3.10526 3.60622L7.83041 8.31606H4.05653C3.8694 8.31606 3.71345 8.4715 3.71345 8.65803C3.71345 8.84456 3.8694 9 4.05653 9H8.65692C8.84405 9 9 8.84456 9 8.65803V4.04145C9 3.85492 8.84405 3.69948 8.65692 3.69948C8.46978 3.69948 8.31384 3.85492 8.31384 4.04145V7.78756L3.60429 3.09326C3.54191 3.03109 3.44834 3 3.35478 3Z"
          fill="var(--color-alert-negative, #cf3321)"
        />
      )}
    </svg>
  );
};

interface StatTileProps {
  stat: StatTileData;
  /** Opens the docked Ask AI Audrey panel with this question, seeded with a
      canned reply — choosing a suggested action or submitting free text
      here routes into the same shared AI panel as the header button. */
  onAskAI: (question: string) => void;
}

const StatTileView = ({ stat, onAskAI }: StatTileProps) => {
  const [draft, setDraft] = useState('');
  // MenuButton has no external close hook — remounting it (via a changing
  // key) after choosing an action is a light way to close the popover.
  const [menuKey, setMenuKey] = useState(0);

  const ask = (question: string) => {
    onAskAI(question);
    setDraft('');
    setMenuKey((key) => key + 1);
  };

  return (
    <div className="rop-stat-tile">
      <div className="rop-stat-tile__top">
        <span className="rop-stat-tile__label">{stat.label}</span>
        {/* A 20px icon trigger — smaller than any icon-only Button size in
            the design system (sm is 40px) — reproduced locally to match
            the source design's hover affordance on a small score card. */}
        <MenuButton
          key={menuKey}
          position="bottom-left"
          renderTrigger={({ open, toggle }) => (
            <button
              type="button"
              className={['rop-stat-ai-btn', open ? 'is-open' : ''].filter(Boolean).join(' ')}
              aria-label={`Ask AI about ${stat.label}`}
              onClick={toggle}
            >
              <SparkleIcon />
            </button>
          )}
        >
          <div className="rop-stat-ai-menu">
            <form
              className="rop-stat-ai-menu__composer"
              onSubmit={(event) => {
                event.preventDefault();
                if (draft.trim()) ask(draft);
              }}
            >
              <TextInput
                size="sm"
                placeholder="Ask AI Audrey..."
                aria-label={`Ask AI about ${stat.label}`}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="rop-stat-ai-menu__input"
              />
              <button type="submit" className="rop-stat-ai-menu__send" aria-label="Send question">
                <Icon name="arrow-top-right" size="sm" />
              </button>
            </form>
            <Menu>
              <MenuItem label="Explain to me" onClick={() => ask(`Explain ${stat.label} to me`)} />
              <MenuItem
                label="Compare with past performance"
                onClick={() => ask(`Compare ${stat.label} with past performance`)}
              />
            </Menu>
          </div>
        </MenuButton>
      </div>
      <span className="rop-stat-tile__value">{stat.value}</span>
    </div>
  );
};

interface InfoSectionRow {
  label: React.ReactNode;
  value: React.ReactNode;
}

interface InfoSectionProps {
  title?: string;
  rows: InfoSectionRow[];
  /** Rows to show before "See more" — omit to always show every row. */
  collapsedCount?: number;
}

// A small label/value list card, used for every group in the supporting-info
// panel (Details, Target Group, Budget, Campaigns). Not a real design-system
// component yet — purpose-built for this prototype, see registry notes.
const InfoSection = ({ title, rows, collapsedCount }: InfoSectionProps) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = collapsedCount != null && rows.length > collapsedCount;
  const visibleRows = expanded || !hasMore ? rows : rows.slice(0, collapsedCount);

  return (
    <div className="rop-info-section">
      {title && <h4 className="rop-info-section__title">{title}</h4>}
      <div className="rop-info-section__card">
        {visibleRows.map((row, index) => (
          <div className="rop-info-section__row" key={index}>
            <span>{row.label}</span>
            <span>{row.value}</span>
          </div>
        ))}
        {hasMore && !expanded && (
          <Button
            variant="text"
            size="sm"
            className="rop-info-section__see-more"
            onClick={() => setExpanded(true)}
          >
            See more
          </Button>
        )}
      </div>
    </div>
  );
};

const CHANNEL_COLUMNS: TableColumn<ChannelRow>[] = [
  {
    key: 'name',
    label: 'Channel',
    width: 130,
    render: (row) => (
      <span className="rop-channel-cell">
        <span className="rop-channel-dot" style={{ background: row.dotColor }} aria-hidden="true" />
        {row.name}
      </span>
    ),
  },
  {
    key: 'impTG',
    label: 'Imp. in TG',
    align: 'right',
    width: 110,
    render: (row) => (
      <span className="rop-metric-cell">
        {row.impTG}
        <TrendBadge trend={row.impTGTrend} />
      </span>
    ),
  },
  {
    key: 'reachTG',
    label: 'Reach in TG',
    align: 'right',
    width: 110,
    render: (row) => (
      <span className="rop-metric-cell">
        {row.reachTG}
        <TrendBadge trend={row.reachTGTrend} />
      </span>
    ),
  },
  {
    key: 'otp',
    label: 'OTP',
    align: 'right',
    width: 90,
    render: (row) => (
      <span className="rop-metric-cell">
        {row.otp}
        <TrendBadge trend={row.otpTrend} />
      </span>
    ),
  },
  {
    key: 'hitrate',
    label: 'Hitrate',
    align: 'right',
    width: 90,
    render: (row) => (
      <span className="rop-metric-cell">
        {row.hitrate}
        <TrendBadge trend={row.hitrateTrend} />
      </span>
    ),
  },
  {
    key: 'frequency',
    label: 'Frequency',
    align: 'right',
    width: 100,
    render: (row) => (
      <span className="rop-metric-cell">
        {row.frequency}
        <TrendBadge trend={row.frequencyTrend} />
      </span>
    ),
  },
];

// ── Chart card ───────────────────────────────────────────────────────────

interface ChartCardProps {
  chart: ChartCardData;
  onShowDetails: (chart: ChartCardData) => void;
}

const ChartCardView = ({ chart, onShowDetails }: ChartCardProps) => {
  // The shared MenuButton doesn't expose a way to close itself from the
  // outside — remounting it (via a changing key) after "Show Details" is a
  // light way to make the menu close on selection, per the interaction spec,
  // without touching the shared component.
  const [menuKey, setMenuKey] = useState(0);

  return (
    <div className="rop-chart-card">
      <div className="rop-chart-card__header">
        <span className="rop-chart-card__title">{chart.title}</span>
        <div className="rop-chart-card__actions">
          <Button variant="ghost" size="sm" iconOnly aria-label={`Ask AI about ${chart.title}`}>
            <SparkleIcon className="rop-sparkle--muted" />
          </Button>
          <Button variant="ghost" size="sm" iconOnly aria-label={`Expand ${chart.title}`}>
            <ExpandIcon />
          </Button>
          <IconMenuButton
            key={menuKey}
            icon={<Icon name="more" size="sm" />}
            aria-label={`More options for ${chart.title}`}
            size="sm"
          >
            <Menu>
              <MenuItem
                label="Show details"
                leadingIcon={<Icon name="info-with-circle" size="sm" />}
                onClick={() => {
                  onShowDetails(chart);
                  setMenuKey((key) => key + 1);
                }}
              />
              <MenuItem label="Export" leadingIcon={<Icon name="download" size="sm" />} />
            </Menu>
          </IconMenuButton>
        </div>
      </div>
      <div className="rop-chart-card__body">
        <BarChart data={chart.data} />
      </div>
    </div>
  );
};

// ── Side panels ──────────────────────────────────────────────────────────

type InfoTab = 'details' | 'demographic' | 'devices';

const InfoPanel = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState<InfoTab>('details');

  return (
    <aside className="rop-panel rop-panel--info">
      <div className="rop-panel__header">
        <span className="rop-panel__title">Info</span>
        <Button variant="ghost" size="sm" iconOnly aria-label="Hide supporting info panel" onClick={onClose}>
          <Icon name="close" size="sm" />
        </Button>
      </div>
      <div className="rop-panel--info__body">
      <TabList variant="underline" aria-label="Report detail sections">
        <Tab active={tab === 'details'} onClick={() => setTab('details')}>
          Details
        </Tab>
        <Tab active={tab === 'demographic'} onClick={() => setTab('demographic')}>
          Demographic
        </Tab>
        <Tab active={tab === 'devices'} onClick={() => setTab('devices')}>
          Devices
        </Tab>
      </TabList>

      <TabPanel active={tab === 'details'} className="rop-panel__body">
        <InfoSection
          title="Details"
          rows={[
            { label: 'Date Created', value: REPORT_DETAILS.dateCreated },
            { label: 'Report Period', value: REPORT_DETAILS.reportPeriod },
            { label: 'Recalculation Cadence', value: REPORT_DETAILS.cadence },
            { label: 'Client', value: REPORT_DETAILS.client },
          ]}
        />
        <InfoSection
          title="Target Group"
          rows={[
            {
              label: 'Country',
              value: (
                <span className="rop-flag">
                  <Icon name={TARGET_GROUP.countryFlag} size="sm" />
                  {TARGET_GROUP.country}
                </span>
              ),
            },
            { label: 'Age', value: TARGET_GROUP.age },
            { label: 'Gender', value: TARGET_GROUP.gender },
            { label: 'TG population', value: TARGET_GROUP.tgPopulation },
            { label: 'Language', value: TARGET_GROUP.language },
            { label: 'Interest', value: TARGET_GROUP.interest },
            { label: 'Device', value: TARGET_GROUP.device },
          ]}
          collapsedCount={4}
        />
        <InfoSection title="Budget" rows={[{ label: 'Budget', value: BUDGET }]} />
        <InfoSection
          title={`Campaigns (${CAMPAIGNS_COUNT})`}
          rows={CAMPAIGNS.map((campaign) => ({ label: campaign.name, value: campaign.period }))}
          collapsedCount={3}
        />
      </TabPanel>

      <TabPanel active={tab === 'demographic'} className="rop-panel__body">
        <p className="rop-panel__placeholder">Demographic breakdowns aren't wired up in this prototype yet.</p>
      </TabPanel>

      <TabPanel active={tab === 'devices'} className="rop-panel__body">
        <p className="rop-panel__placeholder">Device breakdowns aren't wired up in this prototype yet.</p>
      </TabPanel>
      </div>
    </aside>
  );
};

const SUGGESTED_PROMPTS = ["What's the cost of target accuracy", 'Best performing channel', 'Is my OTP good'];

interface AiPanelProps {
  messages: ChatMessage[];
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onQuickPrompt: (question: string) => void;
  onClose: () => void;
}

const AiPanel = ({ messages, draft, onDraftChange, onSubmit, onQuickPrompt, onClose }: AiPanelProps) => (
  <aside className="rop-panel rop-panel--ai">
    <div className="rop-panel--ai__card">
      <div className="rop-panel__header">
        <span className="rop-panel__title">AI Summary</span>
        <Button variant="ghost" size="sm" iconOnly aria-label="Close Ask AI Audrey panel" onClick={onClose}>
          <Icon name="close" size="sm" />
        </Button>
      </div>
      <div className="rop-ai-chat">
        {messages.map((message) => (
          <div key={message.id} className={`rop-ai-message rop-ai-message--${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="rop-ai-footer">
        <div className="rop-ai-suggestions">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <ToggleButton key={prompt} size="sm" onClick={() => onQuickPrompt(prompt)}>
              {prompt}
            </ToggleButton>
          ))}
        </div>
        <form className="rop-ai-composer" onSubmit={onSubmit}>
          <TextInput
            size="sm"
            placeholder="Ask AI Audrey..."
            aria-label="Ask AI Audrey"
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                onSubmit(event);
              }
            }}
            className="rop-ai-composer__input"
          />
          <Button type="submit" variant="primary" size="sm" iconOnly aria-label="Send question">
            <Icon name="arrow-top-right" size="sm" />
          </Button>
        </form>
      </div>
    </div>
  </aside>
);

interface ChartDetailsPanelProps {
  chart: ChartCardData;
  onClose: () => void;
}

const ChartDetailsPanel = ({ chart, onClose }: ChartDetailsPanelProps) => (
  <aside className="rop-panel rop-panel--chart-details">
    <div className="rop-panel__header">
      <span className="rop-panel__title">{chart.title} Details</span>
      <Button variant="ghost" size="sm" iconOnly aria-label="Close chart details" onClick={onClose}>
        <Icon name="close" size="sm" />
      </Button>
    </div>
    <p className="rop-panel__description">{chart.description}</p>
    {/* Same chart-card treatment as the main Data Vis grid — just labeled
        "Graph" generically, since the panel header already names the chart. */}
    <div className="rop-chart-card">
      <div className="rop-chart-card__header">
        <span className="rop-chart-card__title">Graph</span>
        <div className="rop-chart-card__actions">
          <Button variant="ghost" size="sm" iconOnly aria-label={`Ask AI about ${chart.title}`}>
            <SparkleIcon className="rop-sparkle--muted" />
          </Button>
          <Button variant="ghost" size="sm" iconOnly aria-label={`Expand ${chart.title}`}>
            <ExpandIcon />
          </Button>
          <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label={`More options for ${chart.title}`} size="sm">
            <Menu>
              <MenuItem label="Export" leadingIcon={<Icon name="download" size="sm" />} />
            </Menu>
          </IconMenuButton>
        </div>
      </div>
      <div className="rop-chart-card__body">
        <BarChart data={chart.data} />
      </div>
    </div>
    <InfoSection
      rows={[
        { label: 'Date Created', value: REPORT_DETAILS.dateCreated },
        { label: 'Report Period', value: REPORT_DETAILS.reportPeriod },
        { label: 'Recalculation Cadence', value: REPORT_DETAILS.cadence },
        { label: 'Client', value: REPORT_DETAILS.client },
      ]}
    />
  </aside>
);

// ── Root component ──────────────────────────────────────────────────────

export const ReportOverviewPanels = () => {
  const [org, setOrg] = useState(ORG_OPTIONS[0].value);
  const [infoOpen, setInfoOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [chartDetails, setChartDetails] = useState<ChartCardData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 'seed', role: 'assistant', text: AI_SUMMARY_TEXT }]);
  const [draft, setDraft] = useState('');

  const panelCount = [chartDetails !== null, infoOpen, aiOpen].filter(Boolean).length;

  // Shared by the header composer, the suggested-prompt pills, and every
  // score card's own quick-ask menu — all of them land in the same docked
  // Ask AI Audrey panel rather than each keeping a separate conversation.
  const askAI = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setAiOpen(true);
    setMessages((prev) => [
      ...prev,
      { id: `u-${prev.length}`, role: 'user', text: trimmed },
      { id: `a-${prev.length + 1}`, role: 'assistant', text: CANNED_AI_REPLY },
    ]);
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    askAI(draft);
    setDraft('');
  };

  return (
    <div className="rop-app">
      <Sidenav logo={<APLogo />} actionButton={<SidenavActionButton aria-label="Create new" icon={<Icon name="plus" />} />}>
        {NAV_ITEMS.map((item) => (
          <SidenavNavItem key={item.key} href="#" icon={<Icon name={item.icon} />} label={item.label} active={item.key === 'reports'} />
        ))}
      </Sidenav>

      <div className="rop-main">
        <header className="rop-topbar">
          <div className="rop-topbar__left">
            <span className="rop-wordmark">Next</span>
            <Badge variant="info" size="sm">
              3.0
            </Badge>
            <Breadcrumbs size="sm" items={[{ label: 'All Reports', href: '#' }, { label: 'Lidl_Xmas 26' }]} />
          </div>
          <div className="rop-topbar__right">
            <InlineMenuButton label={ORG_OPTIONS.find((option) => option.value === org)?.label ?? ''} position="bottom-right">
              <Menu>
                {ORG_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    label={option.label}
                    checked={option.value === org}
                    onClick={() => setOrg(option.value)}
                  />
                ))}
              </Menu>
            </InlineMenuButton>
            <button type="button" className="rop-topbar__icon-btn" aria-label="Open chat">
              <Icon name="chat" size="md" />
            </button>
            <Avatar initials="JC" size="sm" />
          </div>
        </header>

        <section className="rop-report-header">
          <div>
            <h1 className="rop-report-header__title">Lidl_Xmas 26</h1>
            <div className="rop-report-header__meta">
              <span>ID:46006</span>
              <span>&bull;</span>
              <span>Lidl</span>
              <Badge variant="positive" size="sm">
                Running
              </Badge>
              <span className="rop-report-header__updated">Last Updated: 3 mins ago</span>
            </div>
          </div>
          <div className="rop-report-header__actions">
            <Button variant="secondary" size="sm" iconOnly aria-label="Download report">
              <Icon name="download" size="sm" />
            </Button>
            <Button variant="secondary" size="sm" iconOnly aria-label="Share report">
              <Icon name="arrow-top-right" size="sm" />
            </Button>
            <Button variant="secondary" size="sm" iconOnly aria-label="Edit report">
              <Icon name="pen" size="sm" />
            </Button>
            <Button
              variant={infoOpen ? 'primary' : 'secondary'}
              size="sm"
              iconOnly
              aria-pressed={infoOpen}
              aria-label={infoOpen ? 'Hide supporting info panel' : 'Show supporting info panel'}
              onClick={() => setInfoOpen((open) => !open)}
            >
              <Icon name="layout-2" size="sm" />
            </Button>
            <Button
              variant={aiOpen ? 'primary' : 'secondary'}
              size="sm"
              className="rop-ai-pill"
              leadingIcon={<SparkleIcon className="rop-sparkle" />}
              aria-pressed={aiOpen}
              onClick={() => setAiOpen((open) => !open)}
            >
              Ask AI Audrey
            </Button>
          </div>
        </section>

        <div className="rop-body">
          <div className="rop-overview-scroll">
            <div className="rop-content" data-panel-count={panelCount}>
            <section className="rop-overview-row">
              <div className="rop-stats-col">
                <h3 className="rop-section-title">Overall Performance</h3>
                <div className="rop-stats-grid">
                  {STATS.map((stat) => (
                    <StatTileView key={stat.key} stat={stat} onAskAI={askAI} />
                  ))}
                </div>
              </div>
              <div className="rop-ai-summary">
                <div className="rop-ai-summary__header">
                  <span className="rop-ai-summary__title">AI Summary</span>
                  <Button variant="text" size="sm" onClick={() => setAiOpen(true)}>
                    Details
                  </Button>
                </div>
                <div className="rop-ai-summary__card">
                  <p className="rop-ai-summary__body">{AI_SUMMARY_TEXT}</p>
                </div>
              </div>
            </section>

            <section className="rop-section">
              <h3 className="rop-section-title">Insights</h3>
              <div className="rop-table-wrap">
                <Table
                  columns={CHANNEL_COLUMNS}
                  rows={CHANNELS}
                  rowKey={(row) => row.id}
                  size="sm"
                  className="rop-insights-table"
                />
              </div>
            </section>

            <section className="rop-charts-grid">
              {CHARTS.map((chart) => (
                <ChartCardView key={chart.id} chart={chart} onShowDetails={setChartDetails} />
              ))}
            </section>
            </div>
          </div>

          {chartDetails && <ChartDetailsPanel chart={chartDetails} onClose={() => setChartDetails(null)} />}

          {infoOpen && <InfoPanel onClose={() => setInfoOpen(false)} />}

          {aiOpen && (
            <AiPanel
              messages={messages}
              draft={draft}
              onDraftChange={setDraft}
              onSubmit={handleSend}
              onQuickPrompt={askAI}
              onClose={() => setAiOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ReportOverviewPanels.displayName = 'ReportOverviewPanels';
