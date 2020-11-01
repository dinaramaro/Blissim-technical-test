import {
  Grid,
  withStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

const useStyles = (theme) => ({
  h1: {
    margin: theme.spacing(5, 0),
  },
  filterTitle: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.light,
  },
  filterListItem: {
    paddingLeft: 0,
  },
});

const ProductCategories = (props) => {
  const { classes, products } = props;

  return (
    <Grid item xs={1} md={1}>
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
  );
};

export default withStyles(useStyles)(ProductCategories);
