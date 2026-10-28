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
            'Divider',
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
            'Search',
            'Sidenav',
            'Sliders',
            'Spinners',
            'Stepper',
            'Tabs', [
              'Docs', 'Nav-tab', 'Ui-tab',
            ],
            'Toast', [
              'Message', 'With Details', 'With Timestamp',
            ],
            'Toggle',
            'Tooltips',
            'Toggletips',
          ],
          'Pattern', [
            'Modal', [
              'Docs', 'Default', 'Alert modal', 'Scrollable modal', 'Wizard modal',
            ],
            'Table', [
              'Default', 'Selectable', 'Expandable', 'Medium',
            ],
          ],
          'Data Visualisation', [
            'Chart design', [
              'Color-datavis', 'Chart Anatomy', 'Axes and label',
              'Tooltips', 'Legend',
            ],
            'Chart types', [
              'Bar', [
                'Docs', 'Vertical simple bar chart', 'Vertical grouped bar chart',
                'Vertical stacked bar chart', 'Horizontal simple bar chart',
              ],
              'Line', [
                'Docs', 'Straight line chart', 'Curve line chart',
              ],
              'Area', [
                'Docs', 'Straight area chart', 'Curve area chart',
              ],
              'Combo', [
                'Docs', 'Combo charts',
              ],
              'Donut', [
                'Docs', 'Donut chart',
              ],
              'Pie', [
                'Docs', 'Pie chart',
              ],
              'Gauge', [
                'Docs', 'Gauge chart',
              ],
              'Venn diagram', [
                'Docs', 'Venn diagram',
              ],
              'Sankey diagram', [
                'Docs', 'Sankey diagram',
              ],
              'Heatmap', [
                'Docs', 'Heatmap',
              ],
            ],
            'Mini-charts', [
              'Docs', 'Usage examples',
              'Sparkline', ['Docs', 'Sparkline'],
              'Star review', ['Docs', 'Star review'],
              'Linear gauge', ['Docs', 'Linear gauge'],
              'Circular gauge', ['Docs', 'Circular gauge'],
              'Bar chart', ['Docs', 'Bar chart'],
              'Heatmap', ['Docs', 'Heatmap'],
            ],
            'Score cards', [
              'Docs', 'Score card',
            ],
            'Widget', [
              'Docs', 'Standard widget', 'Advanced widget', 'Swap the chart',
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