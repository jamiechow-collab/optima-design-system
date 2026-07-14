import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Icon, IconName } from './Icon';
import { BASIC_ICONS, CHANNEL_ICONS, COUNTRY_ICONS, ICONS } from './icons';
import { IconGrid } from './IconDocHelpers';

const meta: Meta<typeof Icon> = {
  title: 'Tokens/Icons',
  component: Icon,
  parameters: { layout: 'padded' },
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(ICONS) as IconName[],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'xs = 12px, sm = 16px, md = 20px, lg = 24px',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: 'checkmark', size: 'md' },
};

// ─────────────────────────────────────────────────────────────────────────────
//  Icon galleries — one page per set, with a size control so you can switch
//  between xs/sm/md/lg and see every icon in the set re-render at that size.
// ─────────────────────────────────────────────────────────────────────────────

interface GalleryArgs {
  size: 'xs' | 'sm' | 'md' | 'lg';
}

const gallerySizeArgTypes = {
  size: {
    control: 'select' as const,
    options: ['xs', 'sm', 'md', 'lg'],
    description: 'xs = 12px, sm = 16px, md = 20px, lg = 24px',
  },
  name: { table: { disable: true } },
};

export const BasicIcons: StoryObj<GalleryArgs> = {
  args: { size: 'lg' },
  argTypes: gallerySizeArgTypes,
  parameters: { layout: 'fullscreen' },
  render: ({ size }) => (
    <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh' }}>
      <IconGrid names={Object.keys(BASIC_ICONS) as IconName[]} size={size} />
    </div>
  ),
};

export const ChannelIcons: StoryObj<GalleryArgs> = {
  args: { size: 'lg' },
  argTypes: gallerySizeArgTypes,
  parameters: { layout: 'fullscreen' },
  render: ({ size }) => (
    <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh' }}>
      <IconGrid names={Object.keys(CHANNEL_ICONS) as IconName[]} size={size} />
    </div>
  ),
};

export const CountryIcons: StoryObj<GalleryArgs> = {
  args: { size: 'lg' },
  argTypes: gallerySizeArgTypes,
  parameters: { layout: 'fullscreen' },
  render: ({ size }) => (
    <div style={{ padding: 32, background: '#f9fafb', minHeight: '100vh' }}>
      <IconGrid names={Object.keys(COUNTRY_ICONS) as IconName[]} size={size} />
    </div>
  ),
};
