import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Table, TableColumn } from './Table';
import { SortDirection } from './TableColumnHeader';
import { TableCellSelect } from './TableCellSelect';
import { Icon } from '../Icon/Icon';

interface TableStoryArgs {
  showLeadingIcon: boolean;
  showMenuControl: boolean;
  selectable: boolean;
  expandable: boolean;
  stickyFirstColumn: boolean;
  reorderableColumns: boolean;
}

const meta: Meta<TableStoryArgs> = {
  title: 'Pattern/Table',
  parameters: { layout: 'padded' },
  argTypes: {
    showLeadingIcon: {
      control: 'boolean',
      description: 'Show a leading icon in the "Report name" column header',
    },
    showMenuControl: {
      control: 'boolean',
      description: 'Show the header "more options" kebab menu control',
    },
    selectable: {
      control: 'boolean',
      description: 'Show the row selection checkbox column',
    },
    expandable: {
      control: 'boolean',
      description: '"Report 6" gets nested rows with an expand/collapse chevron, two levels deep',
    },
    stickyFirstColumn: {
      control: 'boolean',
      description: 'Pins the checkbox column (if any) and the first data column while the rest scrolls',
    },
    reorderableColumns: {
      control: 'boolean',
      description: 'Hold a column header, then drag it over another to swap their order',
    },
  },
  args: {
    showLeadingIcon: false,
    showMenuControl: true,
    selectable: true,
    expandable: true,
    stickyFirstColumn: false,
    reorderableColumns: true,
  },
};

export default meta;

interface ReportRow {
  id: string;
  name: string;
  status: string;
  owner: string;
  country: string;
  value: number;
  updated: string;
  children?: ReportRow[];
}

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
];

const ROWS: ReportRow[] = [
  { id: '1', name: 'Report 1 — Weekly performance', status: 'Active', owner: 'A. Chen', country: 'us', value: 12480, updated: '2 hours ago' },
  { id: '2', name: 'Report 2 — Channel breakdown', status: 'Active', owner: 'J. Smith', country: 'uk', value: 8340, updated: '5 hours ago' },
  { id: '3', name: 'Report 3 — Campaign summary', status: 'Draft', owner: 'A. Chen', country: 'us', value: 2110, updated: '1 day ago' },
  { id: '4', name: 'Report 4 — Regional overview', status: 'Active', owner: 'M. Patel', country: 'au', value: 19560, updated: '2 days ago' },
  { id: '5', name: 'Report 5 — Budget forecast', status: 'Archived', owner: 'J. Smith', country: 'ca', value: 640, updated: '1 week ago' },
  {
    id: '6',
    name: 'Report 6 — Audience insights',
    status: 'Active',
    owner: 'M. Patel',
    country: 'de',
    value: 30120,
    updated: '2 weeks ago',
    children: [
      {
        id: '6a',
        name: '6A — Desktop',
        status: 'Active',
        owner: 'M. Patel',
        country: 'de',
        value: 14200,
        updated: '2 weeks ago',
        children: [
          { id: '6a-1', name: '6A-1 — Chrome', status: 'Active', owner: 'M. Patel', country: 'de', value: 9800, updated: '2 weeks ago' },
          { id: '6a-2', name: '6A-2 — Safari', status: 'Active', owner: 'M. Patel', country: 'fr', value: 4400, updated: '2 weeks ago' },
        ],
      },
      { id: '6b', name: '6B — Mobile', status: 'Active', owner: 'M. Patel', country: 'de', value: 11400, updated: '2 weeks ago' },
      { id: '6c', name: '6C — Tablet', status: 'Active', owner: 'M. Patel', country: 'jp', value: 3020, updated: '2 weeks ago' },
      { id: '6d', name: '6D — Other', status: 'Active', owner: 'M. Patel', country: 'jp', value: 1500, updated: '2 weeks ago' },
    ],
  },
];

const buildColumns = (
  args: Pick<TableStoryArgs, 'showLeadingIcon' | 'showMenuControl'>,
  size: 'sm' | 'md',
  countryValues: Record<string, string>,
  onCountryChange: (rowId: string, value: string) => void,
  showFilters = true
): TableColumn<ReportRow>[] => [
  {
    key: 'name',
    label: 'Report name',
    sortable: true,
    width: 260,
    leadingIcon: args.showLeadingIcon ? <Icon name="checkmark" size="sm" /> : undefined,
    showMenuControl: args.showMenuControl,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 160,
    showMenuControl: args.showMenuControl,
    ...(showFilters ? { filterOptions: STATUS_OPTIONS, filterPlaceholder: 'All statuses' } : {}),
  },
  { key: 'owner', label: 'Owner', width: 160, showMenuControl: args.showMenuControl },
  {
    key: 'country',
    label: 'Country',
    width: 200,
    showMenuControl: args.showMenuControl,
    overflowVisible: true,
    render: (row) => (
      <TableCellSelect
        size={size}
        options={COUNTRY_OPTIONS}
        value={countryValues[row.id] ?? row.country}
        onChange={(value) => onCountryChange(row.id, value)}
        aria-label={`Country for ${row.name}`}
      />
    ),
  },
  {
    key: 'value',
    label: 'Value',
    align: 'right',
    sortable: true,
    width: 140,
    showMenuControl: args.showMenuControl,
    render: (row) => `$${row.value.toLocaleString()}`,
  },
  { key: 'updated', label: 'Last updated', width: 180, showMenuControl: args.showMenuControl },
];

const TableDemo = ({
  size = 'sm' as 'sm' | 'md',
  showLeadingIcon = false,
  showMenuControl = true,
  selectable = true,
  expandable = true,
  stickyFirstColumn = false,
  reorderableColumns = true,
  showFilters = true,
  initialSelectedRowKeys = [],
  initialExpandedRowKeys = ['6', '6a'],
}: Partial<TableStoryArgs> & {
  size?: 'sm' | 'md';
  showFilters?: boolean;
  initialSelectedRowKeys?: string[];
  initialExpandedRowKeys?: string[];
}) => {
  const [sortColumn, setSortColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>(initialSelectedRowKeys);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(initialExpandedRowKeys);
  const [countryValues, setCountryValues] = useState<Record<string, string>>({});
  const onCountryChange = (rowId: string, value: string) =>
    setCountryValues((prev) => ({ ...prev, [rowId]: value }));
  const columns = useMemo(
    () =>
      buildColumns({ showLeadingIcon, showMenuControl }, size, countryValues, onCountryChange, showFilters),
    [showLeadingIcon, showMenuControl, selectable, expandable, size, countryValues, showFilters]
  );

  const onSortChange = (key: string) => {
    if (sortColumn !== key) {
      setSortColumn(key);
      setSortDirection('asc');
    } else if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else {
      setSortColumn(undefined);
      setSortDirection(null);
    }
  };

  const rows = useMemo(() => {
    let result = ROWS;
    if (filterValues.status) {
      result = result.filter((row) => row.status.toLowerCase() === filterValues.status);
    }
    if (sortColumn && sortDirection) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortColumn as keyof ReportRow];
        const bValue = b[sortColumn as keyof ReportRow];
        const compared = typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue - bValue
          : String(aValue).localeCompare(String(bValue));
        return sortDirection === 'asc' ? compared : -compared;
      });
    }
    return result;
  }, [filterValues, sortColumn, sortDirection]);

  return (
    <Table
      size={size}
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSortChange={onSortChange}
      filterValues={filterValues}
      onFilterChange={(key, value) => setFilterValues((prev) => ({ ...prev, [key]: value }))}
      selectable={selectable}
      selectedRowKeys={selectedRowKeys}
      onSelectedRowKeysChange={setSelectedRowKeys}
      expandable={expandable}
      getChildRows={(row) => row.children}
      expandedRowKeys={expandedRowKeys}
      onExpandedRowKeysChange={setExpandedRowKeys}
      stickyFirstColumn={stickyFirstColumn}
      reorderableColumns={reorderableColumns}
      pagination={{
        rangeStart: 1,
        rangeEnd: rows.length,
        total: 8618,
        currentPage,
        totalPages: 10,
        onPageChange: setCurrentPage,
      }}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Reorder rows — a focused demo, kept separate from TableDemo. Row order is
//  the caller's own data, so (unlike reorderableColumns) Table doesn't own it:
//  onRowOrderChange reports the dragged row's new sibling order and the
//  reorder needs to be applied to a specific nesting level (its own
//  `parentKey`), letting the "Report 6" group demonstrate reordering nested
//  siblings too, not just the top level.
// ─────────────────────────────────────────────────────────────────────────────

const reorderByKeys = <T,>(items: T[], itemKey: (item: T) => string, orderedKeys: string[]): T[] => {
  const byKey = new Map(items.map((item) => [itemKey(item), item]));
  const ordered = orderedKeys.map((k) => byKey.get(k)).filter((item): item is T => !!item);
  const seen = new Set(ordered.map(itemKey));
  const extra = items.filter((item) => !seen.has(itemKey(item)));
  return [...ordered, ...extra];
};

const reorderRowTree = (
  rows: ReportRow[],
  parentKey: string | null,
  orderedKeys: string[]
): ReportRow[] => {
  if (parentKey === null) return reorderByKeys(rows, (row) => row.id, orderedKeys);
  return rows.map((row) => {
    if (row.id === parentKey) {
      return row.children ? { ...row, children: reorderByKeys(row.children, (r) => r.id, orderedKeys) } : row;
    }
    return row.children ? { ...row, children: reorderRowTree(row.children, parentKey, orderedKeys) } : row;
  });
};

const REORDER_ROWS_COLUMNS: TableColumn<ReportRow>[] = [
  { key: 'name', label: 'Name', width: 320 },
  { key: 'status', label: 'Status', width: 160 },
  { key: 'country', label: 'Country', width: 200 },
];

const ReorderRowsDemo = () => {
  const [rows, setRows] = useState<ReportRow[]>(ROWS);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['6']);

  return (
    <Table
      columns={REORDER_ROWS_COLUMNS}
      rows={rows}
      rowKey={(row) => row.id}
      expandable
      getChildRows={(row) => row.children}
      expandedRowKeys={expandedRowKeys}
      onExpandedRowKeysChange={setExpandedRowKeys}
      reorderableRows
      onRowOrderChange={(orderedKeys, parentKey) =>
        setRows((prev) => reorderRowTree(prev, parentKey, orderedKeys))
      }
    />
  );
};

export const Default: StoryObj<TableStoryArgs> = {
  render: (args) => <TableDemo size="sm" {...args} />,
};

export const Selectable: StoryObj<TableStoryArgs> = {
  args: { selectable: true, expandable: false },
  render: (args) => <TableDemo size="sm" {...args} />,
};

export const Expandable: StoryObj<TableStoryArgs> = {
  args: { selectable: false, expandable: true },
  render: (args) => <TableDemo size="sm" {...args} />,
};

export const MixedActions: StoryObj<TableStoryArgs> = {
  name: 'Mixed actions — default',
  args: { selectable: true, expandable: true },
  render: (args) => <TableDemo size="sm" {...args} />,
};

export const StickyFirstColumn: StoryObj<TableStoryArgs> = {
  name: 'Sticky column',
  args: { selectable: true, expandable: true, stickyFirstColumn: true },
  render: (args) => <TableDemo size="sm" {...args} showFilters={false} />,
};

export const ReorderRows: StoryObj<TableStoryArgs> = {
  name: 'Reorder rows',
  parameters: { controls: { disable: true } },
  render: () => <ReorderRowsDemo />,
};

export const Medium: StoryObj<TableStoryArgs> = {
  render: (args) => <TableDemo size="md" {...args} />,
};
