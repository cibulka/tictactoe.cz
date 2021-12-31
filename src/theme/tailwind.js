const config = require('./index');

const tailwind = {
  darkMode: 'class', // or 'media',
  theme: {
    colors: config.COLORS,
    fontFamily: {
      sans: config.FONT_SANS,
      serif: config.FONT_SERIF,
      mono: config.FONT_MONO,
    },
    screens: config.SCREENS,
    extend: {
      fontSize: {
        xxs: '0.75em',
      },
      gridTemplateColumns: {
        '4/3': '4fr 3fr',
        '3/4': '3fr 4fr',
      },
      scale: {
        200: '2.0',
      },
      spacing: {
        '3/2': '150%',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/containers/**/*.tsx'],
};

module.exports = tailwind;
