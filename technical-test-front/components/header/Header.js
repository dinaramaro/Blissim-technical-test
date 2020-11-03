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
import TopBarBanner from '../TopBarBanner';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Link from 'next/link';
import Interstitial from '../Interstitial';
import { useContext, useState } from 'react';
import GlobalContext from '../../state/global-context';

const drawerWidth = 240;

const useStyles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary.main,
  },
  toolbarset: theme.mixins.toolbar,
  toolbar: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
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
    color: theme.palette.primary.light,
  },
  list: {
    width: '100%',
    maxWidth: 240,
  },
  title: {
    color: theme.palette.info.main,
    letterSpacing: -3,
    paddingLeft: 20,
    fontSize: 22,
  },
  menuTitle: {
    paddingLeft: 20,
    paddingTop: 60,
  },
  categories: {
    fontSize: 16,
    letterSpacing: 2,
    paddingLeft: 30,
  },
  nested: {
    paddingLeft: theme.spacing(5),
    fontSize: 14,
  },
});

const Header = (props) => {
  const { classes, window } = props;
  const context = useContext(GlobalContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

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
        <Typography variant="h1" className={classes.title}>
          Promotions
        </Typography>
        <Typography variant="h1" className={classes.title}>
          Nos best sellers
        </Typography>
        <Typography variant="h1" className={classes.menuTitle}>
          Catégories
        </Typography>
        <div>
          <List className={classes.list}>
            <ListItem
              button
              onClick={handleClick}
              style={{ backgroundColor: 'transparent' }}
            >
              <ListItemText
                primary="Maroquinerie"
                classes={{ primary: classes.categories }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Typography component="h3" variant="h3" color="textPrimary">
                  <ListItem>
                    <ListItemText
                      primary="Ceintures"
                      classes={{ primary: classes.nested }}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Sacs"
                      classes={{ primary: classes.nested }}
                    />
                  </ListItem>
                </Typography>
              </List>
            </Collapse>
            <ListItem>
              <ListItemText
                primary="Bijoux"
                classes={{ primary: classes.categories }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Accessoires"
                classes={{ primary: classes.categories }}
              />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Grid>
  );

  //const container =
  //  window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <header>
        <AppBar position="fixed" elevation={0} className={classes.appBar}>
          <TopBarBanner className={classes.appBar} />
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
                  <Typography variant="h1">SuperShop</Typography>
                </a>
              </Link>
              <IconButton onClick={toggleDrawer(!context.open_interstitial)}>
                <ShoppingCartIcon className={classes.cartIcon} />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden lgUp implementation="css">
            <Drawer
              //             container={container}
              variant="temporary"
              anchor={classes.anchor}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              //              container={container}
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
        <div className={classes.toolbarset} />
      </header>
      <Interstitial />
    </>
  );
};

export default withStyles(useStyles)(Header);
