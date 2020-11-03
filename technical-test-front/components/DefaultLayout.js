import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import theme from '../theme/theme';

const useStyles = (theme) => ({
  root: {
    minHeight: '100vh',
  },
});

const DefaultLayout = (props) => {
  const { classes } = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <main>{props.children}</main>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(useStyles)(DefaultLayout);
