import {
  withStyles,
  Drawer,
  Toolbar,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  h1: {
    margin: theme.spacing(5, 0),
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  filterTitle: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.primary,
  },
  filterListItem: {
    paddingLeft: 0,
  },
});

/*const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));*/

const ProductCategories = (props) => {
  const { classes, products } = props;

  return (
    <Drawer
      className={classes.drawer}
      xs={12}
      md={12}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      open={true}
      variant="permanent"
    >
      <Toolbar />
      <Grid container spacing={2} className={classes.drawerContainer}>
        <Grid item xs={12} md={12} className={classes.root}>
          <Typography variant="h6" className={classes.filterTitle}>
            Catégories
          </Typography>
          <div className={classes.filterListContainer}>
            <List>
              <ListItem className={classes.filterListItem}>
                <ListItemText primary="Maquillage" />
              </ListItem>
              <ListItem className={classes.filterListItem}>
                <ListItemText primary="Soins visage" />
              </ListItem>
              <ListItem className={classes.filterListItem}>
                <ListItemText primary="Parfums" />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default withStyles(useStyles)(ProductCategories);
