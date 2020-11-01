import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  withStyles,
  IconButton,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useContext } from 'react';
import GlobalContext from '../../state/global-context';
import { useState } from 'react';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    width: '100%',
  },
  thumbnailContainer: {
    padding: theme.spacing(2),
    textAlign: 'cetner',
  },
  thumbnail: {
    maxHeight: '170px',
    width: 'auto',
    margin: 'auto',
  },
  name: {
    fontSize: '1rem',
  },
});

const ProductCard = (props) => {
  const { classes, product, handleFavorites, favoritesList } = props;
  console.log('favoritesList', favoritesList);
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
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.thumbnailContainer}>
          <CardMedia
            component="img"
            alt={product.title}
            image={product.image}
            className={classes.thumbnail}
            title="Contemplative Reptile"
          />
        </div>
        <Typography gutterBottom component="h2" className={classes.name}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.desc}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={(e) => handleAddToCart(e, product)}>
          <ShoppingBasketIcon color="secondary" />
        </IconButton>
        <IconButton onClick={(e) => toggleFavorites(e, product)}>
          <FavoriteIcon color={isFavorite ? 'error' : 'secondary'} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(useStyles)(ProductCard);
