import React, { useState } from 'react';
import './ReportComparisonCanvas.css';

import { Sidenav } from '../../components/Sidenav/Sidenav';
import { SidenavNavItem } from '../../components/Sidenav/SidenavNavItem';
import { SidenavActionButton } from '../../components/Sidenav/SidenavActionButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { InlineMenuButton, IconMenuButton, MenuButton } from '../../components/MenuButton/MenuButton';
import { Menu, MenuItem, MenuDivider } from '../../components/Menu/Menu';
import { Avatar } from '../../components/Avatar/Avatar';
import { Button } from '../../components/Button/Button';
import { Badge, BadgeVariant } from '../../components/Badge/Badge';
import { Icon } from '../../components/Icon/Icon';
import { ChannelIconName, CountryIconName } from '../../components/Icon/icons';
import { Table, TableColumn } from '../../components/Table/Table';
import { SortDirection } from '../../components/Table/TableColumnHeader';
import { BarChart } from '../../components/BarChart/BarChart';
import { LineChart } from '../../components/LineChart/LineChart';
import { TabList } from '../../components/Tabs/TabList';
import { Tab } from '../../components/Tabs/Tab';
import { TabPanel } from '../../components/Tabs/TabPanel';

// ── Mock data ──────────────────────────────────────────────────────────────
// Every number below is fabricated for this prototype — see the exploration's
// mdx "Notes" section. Shape (fields, groupings) follows the Figma blueprint.

type Trend = 'up' | 'down';

interface StatTile {
  key: string;
  label: string;
  value: string;
  trend: Trend;
}

interface ChannelRow {
  id: string;
  name: string;
  icon: ChannelIconName;
  impTG: string;
  impTGTrend: Trend;
  reachTG: string;
  reachTGTrend: Trend;
  otp: string;
  otpTrend: Trend;
}

interface ChartCardData {
  id: string;
  title: string;
  data: number[];
}

interface ReportData {
  id: string;
  name: string;
  reportId: string;
  client: string;
  status: 'Running' | 'Draft' | 'Completed';
  lastUpdated: string;
  stats: StatTile[];
  channels: ChannelRow[];
  charts: ChartCardData[];
  details: { dateCreated: string; reportPeriod: string; cadence: string };
  demographic: { country: string; countryFlag: CountryIconName; age: string; gender: string; tgPopulation: string };
  devices: { label: string; value: string; percent: string }[];
  campaignsCount: number;
}

const STATUS_BADGE: Record<ReportData['status'], BadgeVariant> = {
  Running: 'positive',
  Draft: 'warning',
  Completed: 'info',
};

const MOCK_REPORTS: ReportData[] = [
  {
    id: 'lidl-xmas',
    name: 'Lidl_Xmas 26',
    reportId: '46006',
    client: 'Lidl',
    status: 'Running',
    lastUpdated: '3 mins ago',
    stats: [
      { key: 'imp-total', label: 'Impression (Total)', value: '59,551,887', trend: 'up' },
      { key: 'imp-tg', label: 'Impression (in TG)', value: '52,083,551', trend: 'up' },
      { key: 'reach-total', label: 'Reach (Total)', value: '18,394,429', trend: 'up' },
      { key: 'reach-tg', label: 'Reach (in TG)', value: '51% / 13,384,604', trend: 'up' },
      { key: 'otp', label: 'OTP', value: '72.8%', trend: 'up' },
      { key: 'hitrate', label: 'Hitrate', value: '1.46x', trend: 'down' },
      { key: 'freq-total', label: 'Frequency (Total)', value: '4', trend: 'up' },
      { key: 'freq-tg', label: 'Frequency (in TG)', value: '3.7', trend: 'down' },
    ],
    channels: [
      { id: 'meta', name: 'Meta', icon: 'meta-color', impTG: '18.2M', impTGTrend: 'up', reachTG: '6.1M', reachTGTrend: 'up', otp: '74%', otpTrend: 'up' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram-color', impTG: '11.4M', impTGTrend: 'down', reachTG: '4.4M', reachTGTrend: 'down', otp: '61%', otpTrend: 'down' },
      { id: 'netflix', name: 'Netflix', icon: 'netflix-color', impTG: '9.8M', impTGTrend: 'up', reachTG: '3.9M', reachTGTrend: 'up', otp: '68%', otpTrend: 'up' },
      { id: 'youtube', name: 'Youtube', icon: 'youtube-color', impTG: '7.3M', impTGTrend: 'down', reachTG: '2.6M', reachTGTrend: 'down', otp: '55%', otpTrend: 'down' },
      { id: 'amazon', name: 'Amazon', icon: 'amazon-color', impTG: '5.4M', impTGTrend: 'up', reachTG: '1.9M', reachTGTrend: 'up', otp: '63%', otpTrend: 'up' },
    ],
    charts: [
      { id: 'reach-overlap', title: 'Reach in TG overlap (%)', data: [14, 22, 19, 24, 18, 27, 21, 25, 19, 16] },
      { id: 'incremental-reach', title: 'Incremental Reach', data: [8, 12, 15, 13, 19, 22, 18, 24, 20, 17] },
      { id: 'incremental-reach-tg', title: 'Incremental Reach in TG (%)', data: [10, 9, 14, 16, 12, 18, 15, 20, 17, 13] },
      { id: 'reach-by-age', title: 'Total and Incremental Reach by age', data: [21, 18, 24, 19, 16, 22, 20, 15, 23, 19] },
    ],
    details: { dateCreated: '20 Dec ’25', reportPeriod: '20 Dec ’25 – 12 Jan ’26', cadence: 'Daily' },
    demographic: { country: 'Germany (DE)', countryFlag: 'de', age: '16-25', gender: 'Female', tgPopulation: '13% of DE population (4,459,633)' },
    devices: [
      { label: 'TV', value: '23,243,279', percent: '50.7%' },
      { label: 'Mobile', value: '14,101,629', percent: '30.7%' },
      { label: 'Tablet', value: '5,913,667', percent: '12.9%' },
      { label: 'Desktop', value: '2,593,553', percent: '5.7%' },
      { label: 'Other', value: '11,082', percent: '<0.1%' },
    ],
    campaignsCount: 10,
  },
  {
    id: 'tesco-spring',
    name: 'Tesco_Spring Sale',
    reportId: '46019',
    client: 'Tesco',
    status: 'Running',
    lastUpdated: '18 mins ago',
    stats: [
      { key: 'imp-total', label: 'Impression (Total)', value: '41,208,933', trend: 'up' },
      { key: 'imp-tg', label: 'Impression (in TG)', value: '35,660,204', trend: 'down' },
      { key: 'reach-total', label: 'Reach (Total)', value: '14,772,310', trend: 'up' },
      { key: 'reach-tg', label: 'Reach (in TG)', value: '46% / 9,201,880', trend: 'up' },
      { key: 'otp', label: 'OTP', value: '68.1%', trend: 'down' },
      { key: 'hitrate', label: 'Hitrate', value: '1.21x', trend: 'up' },
      { key: 'freq-total', label: 'Frequency (Total)', value: '3', trend: 'up' },
      { key: 'freq-tg', label: 'Frequency (in TG)', value: '2.9', trend: 'up' },
    ],
    channels: [
      { id: 'meta', name: 'Meta', icon: 'meta-color', impTG: '13.6M', impTGTrend: 'down', reachTG: '4.8M', reachTGTrend: 'down', otp: '58%', otpTrend: 'down' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram-color', impTG: '9.9M', impTGTrend: 'up', reachTG: '3.7M', reachTGTrend: 'up', otp: '64%', otpTrend: 'up' },
      { id: 'netflix', name: 'Netflix', icon: 'netflix-color', impTG: '6.2M', impTGTrend: 'up', reachTG: '2.4M', reachTGTrend: 'up', otp: '59%', otpTrend: 'up' },
      { id: 'youtube', name: 'Youtube', icon: 'youtube-color', impTG: '4.1M', impTGTrend: 'up', reachTG: '1.6M', reachTGTrend: 'down', otp: '52%', otpTrend: 'down' },
      { id: 'amazon', name: 'Amazon', icon: 'amazon-color', impTG: '1.9M', impTGTrend: 'down', reachTG: '0.7M', reachTGTrend: 'down', otp: '47%', otpTrend: 'down' },
    ],
    charts: [
      { id: 'reach-overlap', title: 'Reach in TG overlap (%)', data: [11, 16, 14, 19, 15, 21, 17, 20, 16, 12] },
      { id: 'incremental-reach', title: 'Incremental Reach', data: [6, 9, 11, 10, 14, 16, 13, 18, 15, 12] },
      { id: 'incremental-reach-tg', title: 'Incremental Reach in TG (%)', data: [8, 7, 11, 13, 9, 14, 12, 16, 13, 10] },
      { id: 'reach-by-age', title: 'Total and Incremental Reach by age', data: [16, 14, 19, 15, 12, 17, 16, 11, 18, 15] },
    ],
    details: { dateCreated: '2 Jan ’26', reportPeriod: '2 Jan ’26 – 16 Feb ’26', cadence: 'Weekly' },
    demographic: { country: 'United Kingdom (GB)', countryFlag: 'gb', age: '25-40', gender: 'All', tgPopulation: '21% of GB population (14,102,880)' },
    devices: [
      { label: 'TV', value: '16,981,220', percent: '47.6%' },
      { label: 'Mobile', value: '13,884,910', percent: '38.9%' },
      { label: 'Tablet', value: '3,204,118', percent: '9.0%' },
      { label: 'Desktop', value: '1,540,662', percent: '4.3%' },
      { label: 'Other', value: '7,023', percent: '<0.1%' },
    ],
    campaignsCount: 6,
  },
  {
    id: 'aldi-easter',
    name: 'Aldi_Easter Push',
    reportId: '46032',
    client: 'Aldi',
    status: 'Draft',
    lastUpdated: '2 hours ago',
    stats: [
      { key: 'imp-total', label: 'Impression (Total)', value: '22,914,006', trend: 'up' },
      { key: 'imp-tg', label: 'Impression (in TG)', value: '19,880,441', trend: 'up' },
      { key: 'reach-total', label: 'Reach (Total)', value: '8,552,190', trend: 'down' },
      { key: 'reach-tg', label: 'Reach (in TG)', value: '39% / 3,335,354', trend: 'down' },
      { key: 'otp', label: 'OTP', value: '61.4%', trend: 'up' },
      { key: 'hitrate', label: 'Hitrate', value: '1.05x', trend: 'up' },
      { key: 'freq-total', label: 'Frequency (Total)', value: '3', trend: 'down' },
      { key: 'freq-tg', label: 'Frequency (in TG)', value: '2.4', trend: 'down' },
    ],
    channels: [
      { id: 'meta', name: 'Meta', icon: 'meta-color', impTG: '7.9M', impTGTrend: 'up', reachTG: '2.6M', reachTGTrend: 'up', otp: '60%', otpTrend: 'up' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram-color', impTG: '5.6M', impTGTrend: 'up', reachTG: '2.0M', reachTGTrend: 'up', otp: '57%', otpTrend: 'down' },
      { id: 'netflix', name: 'Netflix', icon: 'netflix-color', impTG: '3.1M', impTGTrend: 'down', reachTG: '1.1M', reachTGTrend: 'down', otp: '49%', otpTrend: 'down' },
      { id: 'youtube', name: 'Youtube', icon: 'youtube-color', impTG: '2.2M', impTGTrend: 'up', reachTG: '0.8M', reachTGTrend: 'up', otp: '44%', otpTrend: 'up' },
      { id: 'amazon', name: 'Amazon', icon: 'amazon-color', impTG: '1.1M', impTGTrend: 'down', reachTG: '0.4M', reachTGTrend: 'down', otp: '38%', otpTrend: 'down' },
    ],
    charts: [
      { id: 'reach-overlap', title: 'Reach in TG overlap (%)', data: [7, 10, 9, 12, 10, 14, 11, 13, 10, 8] },
      { id: 'incremental-reach', title: 'Incremental Reach', data: [4, 6, 7, 6, 9, 10, 8, 11, 9, 7] },
      { id: 'incremental-reach-tg', title: 'Incremental Reach in TG (%)', data: [5, 4, 7, 8, 6, 9, 7, 10, 8, 6] },
      { id: 'reach-by-age', title: 'Total and Incremental Reach by age', data: [10, 9, 12, 10, 8, 11, 10, 7, 12, 10] },
    ],
    details: { dateCreated: '15 Feb ’26', reportPeriod: '20 Mar ’26 – 12 Apr ’26', cadence: 'Weekly' },
    demographic: { country: 'Ireland (IE)', countryFlag: 'ie', age: '18-35', gender: 'All', tgPopulation: '17% of IE population (869,410)' },
    devices: [
      { label: 'TV', value: '9,102,441', percent: '39.7%' },
      { label: 'Mobile', value: '10,880,120', percent: '47.5%' },
      { label: 'Tablet', value: '2,110,004', percent: '9.2%' },
      { label: 'Desktop', value: '780,441', percent: '3.4%' },
      { label: 'Other', value: '4,102', percent: '<0.1%' },
    ],
    campaignsCount: 3,
  },
  {
    id: 'sainsburys-bts',
    name: 'Sainsburys_Back to School',
    reportId: '46041',
    client: "Sainsbury's",
    status: 'Completed',
    lastUpdated: '1 day ago',
    stats: [
      { key: 'imp-total', label: 'Impression (Total)', value: '33,447,102', trend: 'down' },
      { key: 'imp-tg', label: 'Impression (in TG)', value: '28,910,884', trend: 'down' },
      { key: 'reach-total', label: 'Reach (Total)', value: '11,208,552', trend: 'up' },
      { key: 'reach-tg', label: 'Reach (in TG)', value: '44% / 7,442,110', trend: 'up' },
      { key: 'otp', label: 'OTP', value: '65.9%', trend: 'up' },
      { key: 'hitrate', label: 'Hitrate', value: '1.33x', trend: 'up' },
      { key: 'freq-total', label: 'Frequency (Total)', value: '4', trend: 'up' },
      { key: 'freq-tg', label: 'Frequency (in TG)', value: '3.1', trend: 'down' },
    ],
    channels: [
      { id: 'meta', name: 'Meta', icon: 'meta-color', impTG: '10.7M', impTGTrend: 'up', reachTG: '3.8M', reachTGTrend: 'up', otp: '66%', otpTrend: 'up' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram-color', impTG: '7.8M', impTGTrend: 'down', reachTG: '2.9M', reachTGTrend: 'down', otp: '59%', otpTrend: 'down' },
      { id: 'netflix', name: 'Netflix', icon: 'netflix-color', impTG: '4.9M', impTGTrend: 'up', reachTG: '1.8M', reachTGTrend: 'up', otp: '54%', otpTrend: 'up' },
      { id: 'youtube', name: 'Youtube', icon: 'youtube-color', impTG: '3.6M', impTGTrend: 'down', reachTG: '1.3M', reachTGTrend: 'down', otp: '48%', otpTrend: 'down' },
      { id: 'amazon', name: 'Amazon', icon: 'amazon-color', impTG: '1.9M', impTGTrend: 'up', reachTG: '0.7M', reachTGTrend: 'up', otp: '45%', otpTrend: 'up' },
    ],
    charts: [
      { id: 'reach-overlap', title: 'Reach in TG overlap (%)', data: [12, 15, 13, 18, 14, 20, 16, 19, 15, 11] },
      { id: 'incremental-reach', title: 'Incremental Reach', data: [7, 10, 12, 11, 15, 17, 14, 19, 16, 13] },
      { id: 'incremental-reach-tg', title: 'Incremental Reach in TG (%)', data: [9, 8, 12, 14, 10, 15, 13, 17, 14, 11] },
      { id: 'reach-by-age', title: 'Total and Incremental Reach by age', data: [17, 15, 20, 16, 13, 18, 17, 12, 19, 16] },
    ],
    details: { dateCreated: '3 Aug ’25', reportPeriod: '18 Aug ’25 – 8 Sep ’25', cadence: 'Daily' },
    demographic: { country: 'United Kingdom (GB)', countryFlag: 'gb', age: '30-45', gender: 'Female', tgPopulation: '19% of GB population (12,762,440)' },
    devices: [
      { label: 'TV', value: '12,004,552', percent: '35.9%' },
      { label: 'Mobile', value: '17,220,113', percent: '51.5%' },
      { label: 'Tablet', value: '3,110,884', percent: '9.3%' },
      { label: 'Desktop', value: '1,102,220', percent: '3.3%' },
      { label: 'Other', value: '9,333', percent: '<0.1%' },
    ],
    campaignsCount: 8,
  },
];

const NAV_ITEMS = [
  { key: 'home', label: 'Home', icon: 'home' as const },
  { key: 'campaigns', label: 'Campaigns', icon: 'trumpet' as const },
  { key: 'reports', label: 'Reports', icon: 'vertical-bar-card' as const },
  { key: 'items', label: 'Items', icon: 'grid-3' as const },
  { key: 'integrations', label: 'Integrations', icon: 'connect' as const },
];

const ORGS = ['Procter & Gamble', 'Lidl GB', 'Tesco UK', 'Unilever'];

const APLogo = () => (
  <svg width="24" height="25" viewBox="0 0 30 31" fill="none" aria-label="AudienceProject" role="img">
    <path
      d="M13.75 15.5L6.25 23H0L7.5 15.5L0 8H6.25L13.75 15.5ZM30 18V23H13.75V18H30ZM30 13H13.75V8H30V13Z"
      fill="currentColor"
    />
  </svg>
);

// ── Small building blocks ────────────────────────────────────────────────────

const TrendIcon = ({ trend }: { trend: Trend }) => (
  <span
    className="rcc-trend"
    style={{ color: trend === 'up' ? 'var(--color-alert-positive)' : 'var(--color-alert-negative)' }}
  >
    <Icon name={trend === 'up' ? 'chart-up' : 'chart-down'} size="xs" title={trend === 'up' ? 'Trending up' : 'Trending down'} />
  </span>
);

const StatTileView = ({ stat }: { stat: StatTile }) => (
  <div className="rcc-stat-tile">
    <span className="rcc-stat-tile__label">{stat.label}</span>
    <span className="rcc-stat-tile__value">{stat.value}</span>
    <LineChart negative={stat.trend === 'down'} text={false} className="rcc-stat-tile__spark" />
  </div>
);

interface ChartCardProps {
  chart: ChartCardData;
  onExpand: () => void;
}

const ChartCardView = ({ chart, onExpand }: ChartCardProps) => (
  <div className="rcc-chart-card">
    <div className="rcc-chart-card__header">
      <span className="rcc-chart-card__title">{chart.title}</span>
      <div className="rcc-chart-card__actions">
        <IconMenuButton icon={<Icon name="more" size="sm" />} aria-label={`More options for ${chart.title}`} size="sm">
          <Menu>
            <MenuItem label="Duplicate" leadingIcon={<Icon name="plus" size="sm" />} />
            <MenuItem label="Download image" leadingIcon={<Icon name="download" size="sm" />} />
            <MenuDivider />
            <MenuItem label="Remove from report" leadingIcon={<Icon name="close" size="sm" />} />
          </Menu>
        </IconMenuButton>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Expand ${chart.title}`}
          onClick={onExpand}
        >
          <Icon name="arrow-expand" size="sm" />
        </Button>
      </div>
    </div>
    <div className="rcc-chart-card__body">
      <BarChart data={chart.data} />
    </div>
  </div>
);

interface ExpandedChart {
  reportName: string;
  chart: ChartCardData;
}

interface ReportColumnProps {
  report: ReportData;
  canRemove: boolean;
  onRemove: () => void;
  onExpandChart: (chart: ChartCardData) => void;
}

const CHANNEL_COLUMNS: TableColumn<ChannelRow>[] = [
  {
    key: 'name',
    label: 'Channel',
    width: 150,
    render: (row) => (
      <span className="rcc-channel-cell">
        <Icon name={row.icon} size="sm" title={row.name} />
        {row.name}
      </span>
    ),
  },
  {
    key: 'impTG',
    label: 'Imp. in TG',
    align: 'right',
    sortable: true,
    width: 120,
    render: (row) => (
      <span className="rcc-metric-cell">
        {row.impTG}
        <TrendIcon trend={row.impTGTrend} />
      </span>
    ),
  },
  {
    key: 'reachTG',
    label: 'Reach in TG',
    align: 'right',
    sortable: true,
    width: 120,
    render: (row) => (
      <span className="rcc-metric-cell">
        {row.reachTG}
        <TrendIcon trend={row.reachTGTrend} />
      </span>
    ),
  },
  {
    key: 'otp',
    label: 'OTP',
    align: 'right',
    sortable: true,
    width: 100,
    render: (row) => (
      <span className="rcc-metric-cell">
        {row.otp}
        <TrendIcon trend={row.otpTrend} />
      </span>
    ),
  },
];

const sortChannels = (rows: ChannelRow[], column: string | undefined, direction: SortDirection): ChannelRow[] => {
  if (!column || !direction) return rows;
  const numeric = (row: ChannelRow) => parseFloat(String(row[column as keyof ChannelRow]).replace(/[^0-9.-]/g, ''));
  return [...rows].sort((a, b) => (direction === 'asc' ? numeric(a) - numeric(b) : numeric(b) - numeric(a)));
};

const ReportColumn = ({ report, canRemove, onRemove, onExpandChart }: ReportColumnProps) => {
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSortChange = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      setSortColumn(columnKey);
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortDirection('asc');
    } else {
      setSortColumn(undefined);
      setSortDirection(null);
    }
  };

  const rows = sortChannels(report.channels, sortColumn, sortDirection);

  return (
    <div className="rcc-column">
      <div className="rcc-column__header">
        <div>
          <h2 className="rcc-column__title">{report.name}</h2>
          <div className="rcc-column__meta">
            <span>ID:{report.reportId}</span>
            <span>&bull;</span>
            <span>{report.client}</span>
            <Badge variant={STATUS_BADGE[report.status]} size="sm">
              {report.status}
            </Badge>
          </div>
        </div>
        {canRemove && (
          <Button variant="ghost" size="sm" iconOnly aria-label={`Remove ${report.name} from comparison`} onClick={onRemove}>
            <Icon name="close" size="sm" />
          </Button>
        )}
      </div>

      <section className="rcc-column__section">
        <h3 className="rcc-column__section-title">Overall Performance</h3>
        <div className="rcc-stats">
          {report.stats.map((stat) => (
            <StatTileView key={stat.key} stat={stat} />
          ))}
        </div>
      </section>

      <section className="rcc-column__section">
        <h3 className="rcc-column__section-title">Insights</h3>
        <Table
          columns={CHANNEL_COLUMNS}
          rows={rows}
          rowKey={(row) => row.id}
          size="sm"
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      </section>

      <section className="rcc-column__section">
        <div className="rcc-charts">
          {report.charts.map((chart) => (
            <ChartCardView key={chart.id} chart={chart} onExpand={() => onExpandChart(chart)} />
          ))}
        </div>
      </section>
    </div>
  );
};

// ── Right rail ────────────────────────────────────────────────────────────────

type RailTab = 'details' | 'demographic' | 'devices';

interface RailProps {
  report: ReportData;
  expandedChart: ExpandedChart | null;
  onCloseExpandedChart: () => void;
}

const Rail = ({ report, expandedChart, onCloseExpandedChart }: RailProps) => {
  const [tab, setTab] = useState<RailTab>('details');

  if (expandedChart) {
    return (
      <div className="rcc-rail">
        <div className="rcc-rail__expanded-header">
          <div>
            <span className="rcc-rail__expanded-title">{expandedChart.chart.title}</span>
            <span className="rcc-rail__expanded-subtitle">{expandedChart.reportName}</span>
          </div>
          <Button variant="ghost" size="sm" iconOnly aria-label="Close expanded chart" onClick={onCloseExpandedChart}>
            <Icon name="close" size="sm" />
          </Button>
        </div>
        <div className="rcc-rail__expanded-body">
          <BarChart data={expandedChart.chart.data} />
        </div>
        <p className="rcc-rail__expanded-note">
          Full-size chart rendering is out of scope for this exploration &mdash; this reuses the same Bar Chart
          preview component, scaled up in place, to test the expand interaction itself.
        </p>
      </div>
    );
  }

  return (
    <div className="rcc-rail">
      <TabList variant="pill" aria-label="Report detail sections">
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

      <TabPanel active={tab === 'details'} className="rcc-rail__panel">
        <div className="rcc-rail__row">
          <span>Date Created</span>
          <span>{report.details.dateCreated}</span>
        </div>
        <div className="rcc-rail__row">
          <span>Report Period</span>
          <span>{report.details.reportPeriod}</span>
        </div>
        <div className="rcc-rail__row">
          <span>Recalculation Cadence</span>
          <span>{report.details.cadence}</span>
        </div>
        <div className="rcc-rail__row">
          <span>Client</span>
          <span>{report.client}</span>
        </div>
        <h4 className="rcc-rail__section-title">Campaigns ({report.campaignsCount})</h4>
        <p className="rcc-rail__hint">See the Campaigns section for the full list attached to this report.</p>
      </TabPanel>

      <TabPanel active={tab === 'demographic'} className="rcc-rail__panel">
        <div className="rcc-rail__row">
          <span>Country</span>
          <span className="rcc-rail__flag">
            <Icon name={report.demographic.countryFlag} size="sm" />
            {report.demographic.country}
          </span>
        </div>
        <div className="rcc-rail__row">
          <span>Age</span>
          <span>{report.demographic.age}</span>
        </div>
        <div className="rcc-rail__row">
          <span>Gender</span>
          <span>{report.demographic.gender}</span>
        </div>
        <div className="rcc-rail__row">
          <span>TG population</span>
          <span>{report.demographic.tgPopulation}</span>
        </div>
      </TabPanel>

      <TabPanel active={tab === 'devices'} className="rcc-rail__panel">
        {report.devices.map((device) => (
          <div className="rcc-rail__row" key={device.label}>
            <span>{device.label}</span>
            <span>
              {device.value} <span className="rcc-rail__muted">{device.percent}</span>
            </span>
          </div>
        ))}
      </TabPanel>
    </div>
  );
};

// ── Root component ───────────────────────────────────────────────────────────

export const ReportComparisonCanvas = () => {
  const [columnIds, setColumnIds] = useState<string[]>(['lidl-xmas']);
  const [railOpen, setRailOpen] = useState(true);
  const [expandedChart, setExpandedChart] = useState<ExpandedChart | null>(null);
  const [org, setOrg] = useState(ORGS[0]);

  const columns = columnIds
    .map((id) => MOCK_REPORTS.find((report) => report.id === id))
    .filter((report): report is ReportData => Boolean(report));
  const available = MOCK_REPORTS.filter((report) => !columnIds.includes(report.id));
  const primaryReport = columns[0];

  const addColumn = (id: string) => setColumnIds((prev) => [...prev, id]);
  const removeColumn = (id: string) => {
    setColumnIds((prev) => prev.filter((columnId) => columnId !== id));
    if (expandedChart) setExpandedChart(null);
  };

  return (
    <div className="rcc-app">
      <Sidenav logo={<APLogo />} actionButton={<SidenavActionButton aria-label="Create new" icon={<Icon name="plus" />} />}>
        {NAV_ITEMS.map((item) => (
          <SidenavNavItem key={item.key} href="#" icon={<Icon name={item.icon} />} label={item.label} active={item.key === 'reports'} />
        ))}
      </Sidenav>

      <div className="rcc-main">
        <header className="rcc-topbar">
          <Breadcrumbs
            size="sm"
            items={[
              { label: 'All Reports', href: '#' },
              { label: columns.length > 1 ? `Comparing ${columns.length} reports` : primaryReport?.name ?? 'Report' },
            ]}
          />
          <div className="rcc-topbar__right">
            <InlineMenuButton label={org}>
              <Menu>
                {ORGS.map((name) => (
                  <MenuItem key={name} label={name} checked={name === org} onClick={() => setOrg(name)} />
                ))}
              </Menu>
            </InlineMenuButton>
            <Avatar initials="JC" size="sm" />
          </div>
        </header>

        <div className="rcc-toolbar">
          <MenuButton
            renderTrigger={({ open, toggle }) => (
              <Button variant="secondary" size="sm" leadingIcon={<Icon name="plus" size="sm" />} onClick={toggle} aria-expanded={open}>
                Compare
              </Button>
            )}
          >
            <Menu>
              {available.length > 0 ? (
                available.map((report) => (
                  <MenuItem
                    key={report.id}
                    label={report.name}
                    description={`${report.client} • ${report.status}`}
                    onClick={() => addColumn(report.id)}
                  />
                ))
              ) : (
                <MenuItem label="All reports already added" disabled />
              )}
            </Menu>
          </MenuButton>

          <div className="rcc-toolbar__spacer" />

          <Button variant="tertiary" size="sm" leadingIcon={<Icon name="download" size="sm" />}>
            Export
          </Button>
          <Button variant="tertiary" size="sm">
            Share
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            aria-label={railOpen ? 'Collapse detail panel' : 'Expand detail panel'}
            onClick={() => setRailOpen((prev) => !prev)}
          >
            <Icon name={railOpen ? 'arrow-collapse' : 'arrow-expand'} size="sm" />
          </Button>
        </div>

        <div className="rcc-body">
          <div className="rcc-columns">
            {columns.map((report) => (
              <ReportColumn
                key={report.id}
                report={report}
                canRemove={columns.length > 1}
                onRemove={() => removeColumn(report.id)}
                onExpandChart={(chart) => setExpandedChart({ reportName: report.name, chart })}
              />
            ))}
          </div>

          {railOpen && primaryReport && (
            <Rail report={primaryReport} expandedChart={expandedChart} onCloseExpandedChart={() => setExpandedChart(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

ReportComparisonCanvas.displayName = 'ReportComparisonCanvas';
