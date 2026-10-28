// Data visualisation colours — only for charts, never for general UI.
// Source: Figma "Shared UI design DataVis" › Color-datavis / Guideline.
//
// Categorical palettes: five groups of colours, each with four states
// [default, hover, selected, dismissed]. Apply colours in array order within
// a group — the sequence is curated for contrast between neighbours.

const states = ['default', 'hover', 'selected', 'dismissed'];
const DISMISSED_ALPHA = '33'; // 20% opacity

// Pass [default, hover, selected] hexes and their sequential-palette steps (e.g. tide 300).
// `dismissed` is the selected colour at 20% opacity (same step), so overlapping areas stay
// readable; `gradient-end` is the same colour at 0% — area/trend fills run top to bottom from
// `dismissed` to `gradient-end`.
const entry = (name, [def, hover, selected], [defStep, hoverStep, selectedStep]) => ({
  name,
  default: def,
  hover,
  selected,
  dismissed: `${selected}${DISMISSED_ALPHA}`,
  steps: { default: defStep, hover: hoverStep, selected: selectedStep, dismissed: `${selectedStep} (20%)` },
  'gradient-end': `${selected}00`,
});

const datavisCategorical = {
  group1: [
    entry('tide', ['#015989', '#013f60', '#01659d'], [500, 700, 300]),
    entry('charcoal', ['#3b3b3b', '#222222', '#4d4d4d'], [700, 900, 500]),
    entry('acorn', ['#8a7356', '#746148', '#a58d6e'], [400, 600, 200]),
  ],
  group2: [
    entry('earth', ['#9f8438', '#6e591f', '#c6ab63'], [500, 700, 300]),
    entry('lagoon', ['#00678a', '#004d66', '#0086b2'], [500, 700, 300]),
    entry('plum', ['#82235a', '#6c1d4b', '#99296a'], [500, 700, 300]),
    entry('sapphire', ['#599c99', '#477b79', '#7ab3b1'], [500, 700, 300]),
    entry('clay', ['#a35c38', '#895034', '#ba734f'], [500, 700, 300]),
    entry('violet', ['#6e55b9', '#5b43a3', '#816bc2'], [500, 700, 300]),
    entry('olive', ['#868958', '#5e6232', '#a9ab82'], [500, 700, 300]),
  ],
  group3: [
    entry('slate', ['#687b82', '#3e5760', '#93a0a5'], [500, 700, 300]),
    entry('mulberry', ['#8b3776', '#5a1c4a', '#b856a0'], [500, 700, 300]),
    entry('moss', ['#415f28', '#31481e', '#597740'], [500, 700, 300]),
    entry('driftwood', ['#a49079', '#7b5d3d', '#b4a99c'], [500, 700, 300]),
    entry('nightshade', ['#461976', '#371362', '#6b29b3'], [500, 700, 300]),
    entry('bluebell', ['#7685d0', '#334cc7', '#b0b9e3'], [500, 700, 300]),
    entry('raspberry', ['#a0375f', '#812c4d', '#bf4574'], [500, 700, 300]),
  ],
  group4: [
    entry('indigo', ['#4b3c9b', '#3c307d', '#604fbb'], [500, 700, 300]),
    entry('forest', ['#767b09', '#585c05', '#b8c011'], [500, 700, 300]),
    entry('walnut', ['#5f4600', '#523c00', '#805e00'], [500, 700, 300]),
    entry('rose', ['#a06e6e', '#7f4343', '#bd9e9e'], [500, 700, 300]),
    entry('cherry', ['#aa2626', '#661e1e', '#bb3e3e'], [500, 700, 300]),
    entry('orchid', ['#a766b2', '#853a92', '#c39bca'], [500, 700, 300]),
    entry('camellia', ['#eb5a96', '#e2186c', '#ed82ae'], [500, 700, 300]),
  ],
  group5: [
    entry('ocean', ['#004480', '#002e57', '#026dca'], [500, 700, 300]),
    entry('gold', ['#b98719', '#a27616', '#d3991d'], [500, 700, 300]),
    entry('chestnut', ['#8a550b', '#371e01', '#af6c0d'], [500, 700, 300]),
    entry('lavender', ['#915ad8', '#5b12ba', '#bb9ee0'], [500, 700, 300]),
    entry('beetroot', ['#860e40', '#530425', '#c91861'], [500, 700, 300]),
    entry('heather', ['#c36eaf', '#b7529f', '#ce88bd'], [500, 700, 300]),
    entry('cobalt', ['#216ecb', '#1b5ba7', '#66a0e6'], [500, 700, 300]),
  ],
};

// Sequential (monochromatic) palettes, darkest (950) to lightest.
const datavisSequential = {
  charcoal: {
    950: '#151313',
    900: '#222222',
    800: '#2e2e2e',
    700: '#3b3b3b',
    600: '#474747',
    500: '#4d4d4d',
    400: '#545454',
    300: '#6e6e6e',
    200: '#878787',
    100: '#a1a1a1',
    50: '#d1d1d1',
    20: '#dadada',
  },
  tide: {
    950: '#001d2d',
    900: '#00273b',
    800: '#013551',
    700: '#013f60',
    600: '#014c74',
    500: '#015989',
    400: '#015f93',
    300: '#01659d',
    200: '#016ca7',
    100: '#388ab6',
    50: '#7eabc3',
    20: '#c4d7e1',
  },
  acorn: {
    950: '#262017',
    900: '#362d21',
    800: '#4f4231',
    700: '#65543e',
    600: '#746148',
    500: '#816b50',
    400: '#8a7356',
    300: '#977d5e',
    200: '#a58d6e',
    100: '#af997e',
    50: '#bfaf9d',
    20: '#d4cdc5',
  },
};

export { datavisCategorical, datavisSequential, states as datavisStates };
