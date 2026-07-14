import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Breadcrumbs, BreadcrumbSize } from './Breadcrumbs';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'centered' },
  argTypes: {
    items: { table: { disable: true } },
  },
};

export default meta;

const PAGES = ['Home', 'Category', 'Subcategory', 'Product type', 'Product name'];

interface PlaygroundArgs {
  size: BreadcrumbSize;
  numberOfPages: number;
  showLeadingIcon: boolean;
}

const renderTrail = ({ size, numberOfPages, showLeadingIcon }: PlaygroundArgs) => (
  <Breadcrumbs
    size={size}
    items={PAGES.slice(0, numberOfPages).map((label, index) => ({
      label,
      href: '#',
      icon: showLeadingIcon ? <Icon name="placeholder" /> : undefined,
    }))}
  />
);

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: 'sm 14/20 · md 16/24' },
    numberOfPages: { control: { type: 'range', min: 2, max: 5, step: 1 }, name: 'number of pages' },
    showLeadingIcon: { control: 'boolean', name: 'leading icon' },
  },
  args: {
    size: 'sm',
    numberOfPages: 3,
    showLeadingIcon: false,
  },
  render: renderTrail,
};

export const WithLeadingIcon: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: 'sm 14/20 · md 16/24' },
    numberOfPages: { control: { type: 'range', min: 2, max: 5, step: 1 }, name: 'number of pages' },
    showLeadingIcon: { table: { disable: true } },
  },
  args: {
    size: 'sm',
    numberOfPages: 3,
    showLeadingIcon: true,
  },
  render: renderTrail,
};
