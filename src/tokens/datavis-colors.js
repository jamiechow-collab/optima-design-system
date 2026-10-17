// Data visualisation colours — only for charts, never for general UI.
// Source: Figma "Shared UI design DataVis" › Color-datavis / Guideline.
//
// Categorical palettes: five groups of colours, each with four states
// [default, hover, selected, dismissed]. Apply colours in array order within
// a group — the sequence is curated for contrast between neighbours.

const states = ['default', 'hover', 'selected', 'dismissed'];

const entry = (name, hexes) => ({
  name,
  ...Object.fromEntries(states.map((s, i) => [s, hexes[i]])),
});

const datavisCategorical = {
  group1: [
    entry('tide', ['#015989', '#015989', '#026aa1', '#3a92c1']),
    entry('charcoal', ['#3b3b3b', '#222222', '#4d4d4d', '#eeeeee']),
    entry('acorn', ['#816b50', '#65543e', '#977d5e', '#dbcfc1']),
  ],
  group2: [
    entry('stone', ['#83aab4', '#4c8e9e', '#b4cad0', '#e4eaec']),
    entry('lagoon', ['#00678a', '#002e3d', '#229ac2', '#8dbdcd']),
    entry('meadow', ['#b8a54c', '#7c7031', '#c2b266', '#d7d2bc']),
    entry('cedar', ['#7e5344', '#523023', '#a97766', '#bfa59b']),
    entry('clay', ['#d17d5c', '#ba5026', '#e1ad99', '#f0ddd5']),
    entry('iris', ['#8967ad', '#623c8b', '#af9ac6', '#d6cddf']),
    entry('olive', ['#868958', '#5e6232', '#a9ab82', '#c5c6b3']),
  ],
  group3: [
    entry('slate', ['#687b82', '#3e5760', '#93a0a5', '#e0e3e3']),
    entry('sapphire', ['#67a3a8', '#3d8085', '#99bfc2', '#eef4f5']),
    entry('earth', ['#937a34', '#614e1a', '#c0a354', '#ece4d0']),
    entry('driftwood', ['#a99c8e', '#917659', '#c9c2ba', '#f9f9f8']),
    entry('cherry', ['#973b3b', '#661e1e', '#be6060', '#f2e3e3']),
    entry('lavender', ['#bb9ee0', '#915ad8', '#e4d9f2', '#fbf9fd']),
    entry('lime', ['#becc00', '#778000', '#dae633', '#e0e1d4']),
  ],
  group4: [
    entry('bluebell', ['#7685d0', '#334cc7', '#b0b9e3', '#dfe7ef']),
    entry('sky', ['#9ab8ef', '#4e86ef', '#dce6f9', '#eef3fb']),
    entry('dune', ['#ccb371', '#bc9834', '#dfd1aa', '#f6f4eb']),
    entry('rose', ['#a06e6e', '#7f4343', '#bd9e9e', '#eee8e8']),
    entry('mulberry', ['#8b3776', '#5a1c4a', '#b856a0', '#e4ccde']),
    entry('orchid', ['#a766b2', '#853a92', '#c39bca', '#eae1eb']),
    entry('sage', ['#c0c397', '#aeb35b', '#dddec9', '#eeeee6']),
  ],
  group5: [
    entry('ocean', ['#004480', '#001b33', '#026dca', '#80bff6']),
    entry('hyacinth', ['#685cb2', '#40348d', '#9992c9', '#e5e3ee']),
    entry('honey', ['#ceb71c', '#93810b', '#e5d252', '#f4efd1']),
    entry('chestnut', ['#7b4609', '#371e01', '#c06e11', '#edc89c']),
    entry('beetroot', ['#860e40', '#44031e', '#c91861', '#ea9dbd']),
    entry('nightshade', ['#461976', '#20083a', '#6b29b3', '#d6c1ec']),
    entry('forest', ['#767b09', '#343701', '#b8c011', '#f2f6b0']),
  ],
};

// Sequential (monochromatic) palettes, darkest (950) to lightest (50).
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
  },
  tide: {
    950: '#001d2d',
    900: '#00273b',
    800: '#00304a',
    700: '#003552',
    600: '#003a59',
    500: '#004367',
    400: '#014d76',
    300: '#015989',
    200: '#026092',
    100: '#026aa1',
    50: '#0676b2',
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
    50: '#bba891',
  },
};

export { datavisCategorical, datavisSequential, states as datavisStates };
