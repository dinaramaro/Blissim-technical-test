import {
  withStyles,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { debounce } from '../utilities/helpers';

const useStyles = (theme) => ({
  offset: theme.mixins.toolbar,
  topBar: {
    height: '50px',
    minHeight: '30px',
    width: '100%',
    backgroundColor: theme.palette.info.light,
    transition: 'top 0.6s',
  },
  h2: {
    fontWeight: 'bold',
    color: theme.palette.primary.light,
    letterSpacing: -2,
    fontSize: 20,
    margin: 'auto',
  },
});

const TopBarBanner = (props) => {
  const { classes } = props;

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    // find current scroll position
    const currentScrollPos = window.pageYOffset;
    // set state based on location info (explained in more detail below)
    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10,
    );
    // set state to new scroll position
    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <Toolbar
      className={classes.topBar}
      position="fixed"
      style={{ top: visible ? '0' : '-60px' }}
    >
      <Typography variant="h2" className={classes.h2}>
        PROFITEZ DE -50% SUR TOUT LE SITE AVEC LE CODE PROMO "SUPERSHOP10"
      </Typography>
    </Toolbar>
  );
};

export default withStyles(useStyles)(TopBarBanner);
