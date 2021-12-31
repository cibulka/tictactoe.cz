const COLORS = require('tailwindcss/colors');

// CSS
COLORS.current = 'currentColor';
// MUI
COLORS.secondary = COLORS.yellow[500];
COLORS.info = COLORS.violet[500];
COLORS.success = COLORS.teal[500];
COLORS.error = COLORS.red[600];
COLORS.warning = COLORS.orange[500];
// Custom
COLORS.text = COLORS.gray[800];
COLORS.textDark = COLORS.gray[300];

const FONT_SANS = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const SCREENS = {
  sm: { min: '640px' },
  smMax: { max: '640px' },
  md: { min: '768px' },
  mdMax: { max: '767px' },
  lg: { min: '1024px' },
  xl: { min: '1280px' },
  '2xl': { min: '1536px' },
  touch: { raw: '(hover: none)' },
  landscape: { raw: '(orientation:landscape)' },
  portrait: { raw: '(orientation:portrait)' },
  hSm: { raw: '(min-height: 568px)' },
  hSmMax: { raw: '(max-height: 568px)' },
};

const FONT_SERIF = ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'];
const FONT_MONO = [
  'ui-monospace',
  'SFMono-Regular',
  'Menlo',
  'Monaco',
  'Consolas',
  '"Liberation Mono"',
  '"Courier New"',
  'monospace',
];

module.exports = { COLORS, FONT_SANS, FONT_SERIF, FONT_MONO, SCREENS };
