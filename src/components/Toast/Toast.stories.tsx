import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Toast, ToastType } from './Toast';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { table: { disable: true } },
    icon: { table: { disable: true } },
    avatarIcon: { table: { disable: true } },
    title: { table: { disable: true } },
    timestamp: { table: { disable: true } },
    actions: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
};

export default meta;

// ─────────────────────────────────────────────────────────────────────────────
//  Message — single line, coloured by type
// ─────────────────────────────────────────────────────────────────────────────

interface MessageArgs {
  type: ToastType;
  children: string;
  showIcon: boolean;
  showAction: boolean;
  showClose: boolean;
}

export const Message: StoryObj<MessageArgs> = {
  argTypes: {
    type: { control: 'select', options: ['default', 'positive', 'negative', 'warning'] },
    children: { control: 'text' },
    showIcon: { control: 'boolean', name: 'leading icon' },
    showAction: { control: 'boolean', name: 'action button' },
    showClose: { control: 'boolean', name: 'close button' },
  },
  args: {
    type: 'default',
    children: 'Message to notifying or informing users.',
    showIcon: true,
    showAction: true,
    showClose: true,
  },
  render: ({ type, children, showIcon, showAction, showClose }) => (
    <Toast
      type={type}
      icon={showIcon && type === 'default' ? <Icon name="placeholder" size="sm" /> : undefined}
      actions={showAction ? <Button variant="secondary" size="sm">Action</Button> : undefined}
      onClose={showClose ? () => {} : undefined}
    >
      {children}
    </Toast>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  With Details
// ─────────────────────────────────────────────────────────────────────────────

export const WithDetails: StoryObj = {
  render: () => (
    <Toast
      variant="details"
      avatarIcon={<Icon name="reload" />}
      title="Title of notification"
      actions={
        <>
          <Button variant="primary" size="sm">Action</Button>
          <Button variant="secondary" size="sm">Action</Button>
        </>
      }
      onClose={() => {}}
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Nullam nec ligula at dolor aliquam mollis.</p>
    </Toast>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  With Timestamp (push notification)
// ─────────────────────────────────────────────────────────────────────────────

export const WithTimestamp: StoryObj = {
  render: () => (
    <Toast
      variant="push"
      avatarIcon={<Icon name="placeholder" />}
      title="Title of notification"
      timestamp="a few seconds ago"
      onClose={() => {}}
    >
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>Nullam nec ligula at dolor aliquam mollis.</p>
    </Toast>
  ),
};
