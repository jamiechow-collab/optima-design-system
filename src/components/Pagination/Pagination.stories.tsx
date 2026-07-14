import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Pagination } from './Pagination';

const meta: Meta = {
  title: 'Components/Pagination',
  parameters: { layout: 'centered' },
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(1);
      return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};

export const MiddlePage: StoryObj = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(5);
      return <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};

export const ManyPages: StoryObj = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(12);
      return <Pagination currentPage={page} totalPages={50} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};

export const Compact: StoryObj = {
  name: 'Compact (mobile)',
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(1);
      return <Pagination compact currentPage={page} totalPages={10} onPageChange={setPage} />;
    };
    return <Demo />;
  },
};

export const Disabled: StoryObj = {
  render: () => <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} disabled />,
};
