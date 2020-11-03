import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useContext } from 'react';
import GlobalContext from '../../state/global-context';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
  },
  cardContent: {
    width: '100%',
    padding: 0,
  },
  thumbnailContainer: {
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  thumbnail: {
    width: 'auto',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '90px',
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: '250px',
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: '200px',
    },
  },
  name: {
    letterSpacing: 1,
    fontSize: 12,
    textAlign: 'center',
    paddingRight: 30,
    paddingLeft: 30,
  },
  price: {
    letterSpacing: 2,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
  cardActions: {
    width: '100%',
    justifyContent: 'center',
    padding: 0,
  },
});

const ProductCard = (props) => {
  const { classes, product, handleFavorites, favoritesList } = props;
  const context = useContext(GlobalContext);

  let isFavorite = false;
  for (let i = 0; i < favoritesList.length; i++) {
    if (favoritesList[i].id === product.id) {
      isFavorite = true;
      break;
    }
  }

  const handleAddToCart = (e, product) => {
    context.addProductToCart(
      product,
      context.pushObject('open_interstitial', true),
    );
  };

  const toggleFavorites = (e, product) => {
    console.log('toggleFavorite', product);
    handleFavorites(product);
  };

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <div className={classes.thumbnailContainer}>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.image}
            className={classes.thumbnail}
            title={product.title}
          />
        </div>
        <Typography gutterBottom component="h2" className={classes.name}>
          {product.title}
        </Typography>
        <Typography variant="body2" component="p" className={classes.price}>
          {product.desc}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.price}
        >
          {product.price} €
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          onClick={(e) => handleAddToCart(e, product)}
          style={{ backgroundColor: 'transparent' }}
        >
          <AddShoppingCartIcon color="secondary" />
        </IconButton>
        <IconButton
          onClick={(e) => toggleFavorites(e, product)}
          style={{ backgroundColor: 'transparent' }}
        >
          <FavoriteIcon color={isFavorite ? 'error' : 'secondary'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(useStyles)(ProductCard);
