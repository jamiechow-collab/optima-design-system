import React, { useState } from 'react';
import { Pagination } from './Pagination';

// ─────────────────────────────────────────────────────────────────────────────
//  Presentational helpers for Pagination.mdx — replicate the Figma guideline cards.
// ─────────────────────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  alignItems: 'flex-start',
  padding: 32,
  border: '1px solid #D1D1D1',
  borderRadius: 16,
  background: '#fff',
};

const example: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
};

const exampleLabel: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
  color: '#1E293B',
  whiteSpace: 'nowrap',
};

export const AnatomyExample = () => {
  const Demo = () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  };
  return (
    <div style={{ ...card, width: 'fit-content' }}>
      <Demo />
    </div>
  );
};

export const TypesExample = () => {
  const Demo = () => {
    const [desktopPage, setDesktopPage] = useState(1);
    const [compactPage, setCompactPage] = useState(1);
    return (
      <>
        <div style={example}>
          <span style={exampleLabel}>Desktop — numbered</span>
          <Pagination currentPage={desktopPage} totalPages={10} onPageChange={setDesktopPage} />
        </div>
        <div style={example}>
          <span style={exampleLabel}>Compact (mobile)</span>
          <Pagination compact currentPage={compactPage} totalPages={10} onPageChange={setCompactPage} />
        </div>
      </>
    );
  };
  return (
    <div style={card}>
      <Demo />
    </div>
  );
};

export const StatesExample = () => (
  <div style={card}>
    <div style={example}>
      <span style={exampleLabel}>First page (Previous disabled)</span>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Middle page</span>
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Last page (Next disabled)</span>
      <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
    </div>
    <div style={example}>
      <span style={exampleLabel}>Disabled</span>
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} disabled />
    </div>
  </div>
);
