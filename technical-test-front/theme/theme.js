import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#900C3E', //rose
      light: '#ffffff',
    },
    secondary: {
      main: '#212121', //gris foncé
      light: '#666666', // gris clair
    },
    error: {
      main: '#ffca28',
    },
    info: {
      main: '#000000', //noir
      light: '#17202a', //bleu foncé
    },
    accent: '#00818a',
    light: '#dbedf3',
  },
  typography: {
    h1: {
      fontSize: 20,
      paddingTop: 5,
      paddingBottom: 5,
      textTransform: 'uppercase',
      letterSpacing: 6,
      fontWeight: 'bolder',
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
