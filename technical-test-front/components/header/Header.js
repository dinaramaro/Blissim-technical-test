import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Container,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Link from 'next/link';
import Interstitial from '../Interstitial';
import { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../state/global-context';

const drawerWidth = 240;

const useStyles = (theme) => (
  theme.direction === 'rtl' ? { anchor: 'right' } : { anchor: 'left' },
  {
    toolbar: {
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerContainer: {
      overflow: 'auto',
      paddingTop: 110,
    },
    drawerPaper: {
      width: drawerWidth,
      overflow: 'hidden',
    },
    cartIcon: {
      color: theme.palette.light,
    },
    list: {
      width: '100%',
      maxWidth: 240,
    },
    filterTitle: {
      backgroundColor: theme.palette.primary,
      color: theme.palette.info.main,
      letterSpacing: 6,
      fontWeight: 'bold',
      paddingLeft: 20,
    },
    filterCategory: {
      letterSpacing: 6,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingTop: 60,
    },
    filterListItem: {
      fontSize: 16,
      letterSpacing: 2,
      paddingLeft: 30,
    },
    nested: {
      paddingLeft: theme.spacing(5),
      fontSize: 14,
    },
    pointerEvents: {
      pointerEvents: 'none',
      backgroundColor: 'transparent',
    },
  }
);

const Header = (props) => {
  const { classes, window } = props;
  const context = useContext(GlobalContext);

  /*useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        // console.log(maxScroll)
        if (currentScrollPos > 0 && currentScrollPos < maxScroll) {
          setOpacity(0);
          // console.log(currentScrollPos)
        } else {
          setOpacity(1);
        }
      };
    }
  }, []);*/

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    context.pushObject('open_interstitial', true);
  };

  const drawer = (
    <Grid container spacing={2} className={classes.drawerContainer}>
      <Grid item xs={12} md={12}>
        <Typography variant="h1" className={classes.filterTitle}>
          PROMOTIONS
        </Typography>
        <Typography variant="h1" className={classes.filterTitle}>
          NOS BEST SELLERS
        </Typography>
        <Typography variant="h1" className={classes.filterCategory}>
          Catégories
        </Typography>
        <div className={classes.filterListContainer}>
          <List className={classes.list}>
            <ListItem
              button
              onClick={handleClick}
              style={{ backgroundColor: 'transparent' }}
            >
              <ListItemText
                primary="Manteaux"
                classes={{ primary: classes.filterListItem }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Typography component="h3" variant="h3" color="textPrimary">
                  <ListItem>
                    <ListItemText
                      primary="Vestes"
                      classes={{ primary: classes.nested }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Trench"
                      classes={{ primary: classes.nested }}
                    />
                  </ListItem>
                </Typography>
              </List>
            </Collapse>
            <ListItem>
              <ListItemText
                primary="Maroquinerie"
                classes={{ primary: classes.filterListItem }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Collection Homme"
                classes={{ primary: classes.filterListItem }}
              />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <header>
        <AppBar position="fixed" elevation={0} className={classes.appBar}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Link href="/" passHref>
                <a>
                  <Typography variant="h1" className={classes.title}>
                    SuperShop
                  </Typography>
                </a>
              </Link>
              <IconButton onClick={toggleDrawer(!context.open_interstitial)}>
                <ShoppingBasketIcon className={classes.cartIcon} />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden lgUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={classes.anchor}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              container={container}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              open
            >
              <Toolbar />
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </header>
      <Interstitial />
    </>
  );
};

export default withStyles(useStyles)(Header);
