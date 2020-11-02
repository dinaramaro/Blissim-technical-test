import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#283149',
      light: '#dc004e',
    },
    secondary: {
      main: '#404b69',
      light: '#d32f2f',
    },
    error: {
      main: '#ffca28',
      light: '#115293',
    },
    info: {
      main: '#e57373',
      light: '#dc004e',
    },
    accent: '#00818a',
    light: '#dbedf3',
  },
  typography: {
    h1: {
      fontSize: 18,
      paddingTop: 5,
      paddingBottom: 5,
    },
    h2: {
      fontSize: 16,
    },
    h3: {
      fontSize: 14,
    },
    h4: {
      fontSize: 12,
    },
  },
  spacing: 8,
});

// Colors
// #283149
// #404b69
// #00818a
// #dbedf3

export default theme;
