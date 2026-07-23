import type { Preview } from '@storybook/react-webpack5'
import '../src/tokens/tokens.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Tokens', [
            'Layout Grid',
            'Typography',
            'Colour',
            'Icons',
            'Shadow',
            'Spacing',
            'Border Radius',
          ],
          'Components', [
            'Alert Banner', [
              'Default', 'Message Only', 'With Leading Icon', 'With Description', 'With Action Buttons',
            ],
            'Avatar', [
              'Default', 'With Initials', 'Without Image', 'Group', 'With Details',
            ],
            'Badges', [
              'Default', 'With Icon',
            ],
            'Breadcrumbs', [
              'Default', 'With Leading Icon',
            ],
            'Buttons', [
              'Standard Buttons', [
                'Primary', 'Secondary', 'Tertiary', 'Ghost', 'Text', 'Disruptive', 'Icon Only',
              ],
              'Toggle Buttons', [
                'Default', 'Active',
              ],
            ],
            'Checkbox', [
              'Default', 'Indeterminate',
            ],
            'Date Picker',
            'Dropdown',
            'Input',
            'Text Area',
            'Links', [
              'Primary', 'Secondary', 'Inline',
            ],
            'Menu', [
              'Basic Menu', [
                'Default', 'With Title', 'With Description',
                'With Dividers', 'With Alert Item', 'Sizes',
              ],
              'Sub-Menu', [
                'Default', 'With Leading Icon', 'Shared Label Removed',
              ],
              'Menu with Sections', [
                'Default', 'Sizes',
              ],
              'Menu Button', [
                'Filter Button', [
                  'Default',
                ],
                'Inline Button', [
                  'Default',
                ],
                'Icon Button', [
                  'Default', 'Sizes',
                ],
                'Avatar Button', [
                  'Default', 'Sizes',
                ],
              ],
            ],
            'Pagination',
            'Progress bar',
            'Radio Button',
            'Sidenav',
            'Sliders',
            'Spinners',
            'Tabs',
            'Toast', [
              'Message', 'With Details', 'With Timestamp',
            ],
            'Toggle',
            'Tooltips',
            'Toggletips',
          ],
          'Data Visualisation', [
            'Bar Chart',
            'Line Chart',
            'Star Review',
          ],
          'Pattern', [
            'Table', [
              'Default', 'Selectable', 'Expandable', 'Medium',
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