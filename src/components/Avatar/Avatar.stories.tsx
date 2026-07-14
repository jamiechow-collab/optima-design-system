import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Avatar, AvatarGroup, AvatarWithDetails } from './Avatar';

import portrait from './assets/portrait.png';
import member1 from './assets/member-1.png';
import member2 from './assets/member-2.png';
import member3 from './assets/member-3.png';
import member4 from './assets/member-4.png';
import member5 from './assets/member-5.png';
import member6 from './assets/member-6.png';
import member7 from './assets/member-7.png';
import member8 from './assets/member-8.png';

const MEMBERS = [member1, member2, member3, member4, member5, member6, member7, member8];

// Shared `status` control — 'default' (no dot) instead of a raw `undefined`
const statusArgType = {
  control: 'select' as const,
  options: ['default', 'online', 'busy', 'away'],
  mapping: { default: undefined, online: 'online', busy: 'busy', away: 'away' },
  description: 'Presence indicator — default shows no dot',
};

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'xs 24 · sm 32 · md 44 · lg 48 · xl 56 · 2xl 64',
    },
    status: statusArgType,
    disabled: { control: 'boolean' },
    focused: { control: 'boolean' },
    initials: { control: 'text' },
    src: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Playground — toggle the photo off (via initials/no props) to see the other types
export const Default: Story = {
  args: {
    src: portrait,
    alt: 'Kathryn Murphy',
    size: 'md',
    status: 'default' as never,
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'TG',
    size: 'md',
    status: 'default' as never,
  },
};

export const WithoutImage: Story = {
  args: {
    size: 'md',
    status: 'default' as never,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
//  Group — pick an individual member to preview disabled / focused in context
// ─────────────────────────────────────────────────────────────────────────────

const memberPick = (label: string) => ({
  control: 'select' as const,
  options: ['none', '1', '2', '3', '4', '5', '6', '7', '8'],
  description: label,
});

interface GroupArgs {
  size: 'xs' | 'sm' | 'md';
  disabledAvatar: string;
  focusedAvatar: string;
}

export const Group: StoryObj<GroupArgs> = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Group supports xs 24 · sm 32 · md 44',
    },
    disabledAvatar: memberPick('Which member renders disabled'),
    focusedAvatar: memberPick('Which member renders focused'),
    // inherited Avatar props that don't apply to the group demo
    status: { table: { disable: true } },
    disabled: { table: { disable: true } },
    focused: { table: { disable: true } },
    initials: { table: { disable: true } },
    src: { table: { disable: true } },
    alt: { table: { disable: true } },
  },
  args: { size: 'md', disabledAvatar: 'none', focusedAvatar: 'none' },
  render: ({ size, disabledAvatar, focusedAvatar }) => (
    <AvatarGroup size={size}>
      {MEMBERS.map((src, i) => (
        <Avatar
          key={i}
          src={src}
          disabled={disabledAvatar === String(i + 1)}
          focused={focusedAvatar === String(i + 1)}
        />
      ))}
    </AvatarGroup>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
//  With details — the avatar's status / disabled / focused states apply here too
// ─────────────────────────────────────────────────────────────────────────────

interface WithDetailsArgs {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'busy' | 'away';
  disabled: boolean;
  focused: boolean;
}

export const WithDetails: StoryObj<WithDetailsArgs> = {
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: statusArgType,
    disabled: { control: 'boolean' },
    focused: { control: 'boolean' },
    // inherited Avatar props not exposed in this demo
    initials: { table: { disable: true } },
    src: { table: { disable: true } },
    alt: { table: { disable: true } },
  },
  args: { size: 'lg', status: 'default' as never, disabled: false, focused: false },
  render: ({ size, status, disabled, focused }) => (
    <AvatarWithDetails
      size={size}
      src={portrait}
      alt="Kathryn Murphy"
      name="Kathryn Murphy"
      email="murphy.mitc@example.com"
      status={status}
      disabled={disabled}
      focused={focused}
    />
  ),
};
