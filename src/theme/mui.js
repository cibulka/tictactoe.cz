const COLORS = require('tailwindcss/colors');
const CONFIG = require('./index');

const theme = (isDarkMode) => ({
  palette: {
    primary: {
      main: isDarkMode ? COLORS.gray[100] : COLORS.gray[600],
    },
    secondary: {
      main: COLORS.secondary,
    },
    info: {
      main: COLORS.info,
    },
    success: {
      main: COLORS.success,
    },
    error: {
      main: COLORS.error,
    },
    warning: {
      main: COLORS.warning,
    },
    background: isDarkMode ? COLORS.gray[600] : COLORS.gray[100],
    surface: {
      main: isDarkMode ? COLORS.gray[800] : COLORS.gray[300],
    },
  },
  typography: {
    fontFamily: CONFIG.FONT_SANS.join(','),
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: `rgba(0, 0, 0, ${isDarkMode ? '0.85' : '0.5'})`,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: 'inherit',
          lineHeight: 'inherit',
          minHeight: 'none',
          minWidth: 'none',
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLet: 0,
          textTransform: undefined,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        list: {
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: isDarkMode ? COLORS.gray[800] : COLORS.gray[200],
          backgroundImage: 'none',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          display: 'flex',
          fontSize: 'inherit',
          width: '100%', // TODO: How to remove the property?
          height: '100%', // TODO: How to remove the property?
        },
      },
    },
  },
  zIndex: {
    // drawer: 30, // Can app bar covers this?
  },
});

module.exports = theme;
