import type { Preview } from '@storybook/react-webpack5'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Tokens',
          'Components', [
            'Button', [
              'Primary', 'Secondary', 'Ghost', 'Small', 'Large',
              'With Left Icon', 'With Right Icon', 'Icon Only', 'Disabled',
              'All Variants', 'Usage', 'Formatting', 'Behaviour',
            ],
            'Menu', [
              'Default', 'With Leading Icons', 'With Shortcuts',
              'With Checkmarks', 'With Submenus', 'With Dividers', 'With Alert Item',
              'All Variants', 'Usage', 'Formatting', 'Behaviour',
            ],
          ],
        ],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;