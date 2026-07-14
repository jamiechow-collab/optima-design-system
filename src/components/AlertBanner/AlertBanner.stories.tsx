import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { AlertBanner, AlertBannerType } from './AlertBanner';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/Alert Banner',
  component: AlertBanner,
  parameters: { layout: 'padded' },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'message', 'positive', 'negative', 'warning'],
    },
    children: { control: 'text' },
    description: { control: 'text' },
    icon: { table: { disable: true } },
    actions: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof AlertBanner>;

// Playground — toggle icon / description / actions to compose any variant
interface PlaygroundArgs {
  type: AlertBannerType;
  children: string;
  description: string;
  showIcon: boolean;
  showActions: boolean;
}

export const Default: StoryObj<PlaygroundArgs> = {
  argTypes: {
    showIcon: { control: 'boolean', name: 'leading icon' },
    showActions: { control: 'boolean', name: 'action buttons' },
  },
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
    description: '',
    showIcon: false,
    showActions: false,
  },
  render: ({ type, children, description, showIcon, showActions }) => (
    <AlertBanner
      type={type}
      description={description || undefined}
      icon={showIcon ? <Icon name="placeholder" /> : undefined}
      actions={
        showActions ? (
          <>
            <Button variant="primary">Action</Button>
            <Button variant="secondary">Action</Button>
          </>
        ) : undefined
      }
    >
      {children}
    </AlertBanner>
  ),
};

const typeArg = {
  type: {
    control: 'select' as const,
    options: ['default', 'message', 'positive', 'negative', 'warning'],
  },
};

export const MessageOnly: Story = {
  argTypes: typeArg,
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
  },
};

export const WithLeadingIcon: Story = {
  argTypes: typeArg,
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
  },
  render: (args) => <AlertBanner {...args} icon={<Icon name="placeholder" />} />,
};

export const WithDescription: Story = {
  argTypes: typeArg,
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
    description: 'Message to notifying or informing users.',
  },
  render: (args) => <AlertBanner {...args} icon={<Icon name="placeholder" />} />,
};

export const WithActionButtons: Story = {
  argTypes: typeArg,
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
    description: 'Message to notifying or informing users.',
  },
  render: (args) => (
    <AlertBanner
      {...args}
      icon={<Icon name="placeholder" />}
      actions={
        <>
          <Button variant="primary">Action</Button>
          <Button variant="secondary">Action</Button>
        </>
      }
    />
  ),
};
