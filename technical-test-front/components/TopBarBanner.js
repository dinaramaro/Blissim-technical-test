import {
  withStyles,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = (theme) => ({
  offset: theme.mixins.toolbar,
  topBar: {
    height: '50px',
    width: '100%',
    backgroundColor: 'grey',
    textAlign: 'center',
  },
  toolbar: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const TopBarBanner = (props) => {
  const { classes } = props;
  return (
    <Toolbar className={classes.topBar} position="fixed">
      test
    </Toolbar>
  );
};

export default withStyles(useStyles)(TopBarBanner);
