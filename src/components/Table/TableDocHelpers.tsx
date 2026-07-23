import React, { useMemo, useState } from 'react';
import { Table, TableColumn } from './Table';
import { SortDirection } from './TableColumnHeader';
import { TableCellSelect } from './TableCellSelect';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Table.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
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
};

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

const ALL_ROWS: ReportRow[] = [
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
  sortColumn: string | undefined,
  sortDirection: SortDirection,
  onSortChange: (key: string) => void,
  filterValues: Record<string, string>,
  onFilterChange: (key: string, value: string) => void,
  size: 'sm' | 'md' = 'sm',
  countryValues: Record<string, string> = {},
  onCountryChange: (rowId: string, value: string) => void = () => {}
): TableColumn<ReportRow>[] => [
  {
    key: 'name',
    label: 'Report name',
    sortable: true,
    width: 260,
    showMenuControl: true,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 160,
    showMenuControl: true,
    filterOptions: STATUS_OPTIONS,
    filterPlaceholder: 'All statuses',
  },
  {
    key: 'owner',
    label: 'Owner',
    width: 160,
    showMenuControl: true,
  },
  {
    key: 'country',
    label: 'Country',
    width: 200,
    showMenuControl: true,
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
    showMenuControl: true,
    render: (row) => `$${row.value.toLocaleString()}`,
  },
  {
    key: 'updated',
    label: 'Last updated',
    width: 180,
    showMenuControl: true,
  },
];

const useSortedFilteredRows = () => {
  const [sortColumn, setSortColumn] = useState<string>();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

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

  const onFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const rows = useMemo(() => {
    let result = ALL_ROWS;
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

  return { rows, sortColumn, sortDirection, onSortChange, filterValues, onFilterChange };
};

export const DefaultTableDemo = () => {
  const { rows, sortColumn, sortDirection, onSortChange, filterValues, onFilterChange } =
    useSortedFilteredRows();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['6', '6a']);
  const [countryValues, setCountryValues] = useState<Record<string, string>>({});
  const onCountryChange = (rowId: string, value: string) =>
    setCountryValues((prev) => ({ ...prev, [rowId]: value }));
  const columns = buildColumns(
    sortColumn,
    sortDirection,
    onSortChange,
    filterValues,
    onFilterChange,
    'sm',
    countryValues,
    onCountryChange
  );

  return (
    <div style={{ ...card, width: 'fit-content' }}>
      <Table
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
        filterValues={filterValues}
        onFilterChange={onFilterChange}
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectedRowKeysChange={setSelectedRowKeys}
        expandable
        getChildRows={(row) => row.children}
        expandedRowKeys={expandedRowKeys}
        onExpandedRowKeysChange={setExpandedRowKeys}
        reorderableColumns
        pagination={{
          rangeStart: 1,
          rangeEnd: rows.length,
          total: 8618,
          currentPage,
          totalPages: 10,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  );
};

export const SizesExample = () => {
  const smState = useSortedFilteredRows();
  const mdState = useSortedFilteredRows();

  return (
    <div style={{ ...card, gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={exampleLabel}>Small</span>
        <Table
          size="sm"
          columns={buildColumns(
            smState.sortColumn,
            smState.sortDirection,
            smState.onSortChange,
            smState.filterValues,
            smState.onFilterChange
          )}
          rows={smState.rows.slice(0, 3)}
          rowKey={(row) => row.id}
          sortColumn={smState.sortColumn}
          sortDirection={smState.sortDirection}
          onSortChange={smState.onSortChange}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={exampleLabel}>Medium</span>
        <Table
          size="md"
          columns={buildColumns(
            mdState.sortColumn,
            mdState.sortDirection,
            mdState.onSortChange,
            mdState.filterValues,
            mdState.onFilterChange,
            'md'
          )}
          rows={mdState.rows.slice(0, 3)}
          rowKey={(row) => row.id}
          sortColumn={mdState.sortColumn}
          sortDirection={mdState.sortDirection}
          onSortChange={mdState.onSortChange}
        />
      </div>
    </div>
  );
};
