import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';

const useStyles = (theme) => ({});

const ProductList = (props) => {
  const { classes, products, favorites } = props;

  const array = [];

  const [favoritesList, setFavoritesList] = useState(array);

  useEffect(() => {
    fetch('http://localhost:3000/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavoritesList(data));
  }, []);

  const handleFavorites = (product) => {
    let found = false;
    for (let i = 0; i < favoritesList.length; i++) {
      if (favoritesList[i].id === product.id) {
        found = true;
        break;
      }
    }
    if (found === false) {
      fetch('http://localhost:3000/api/favorites', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newList = [...favoritesList, data];
          setFavoritesList(newList);
        });
    } else {
      fetch('http://localhost:3000/api/favorites', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const newList = favoritesList
            .filter((l) => l.id !== data.id)
            .sort((a, b) => (a.id < b.id ? 1 : -1));
          setFavoritesList(newList);
        });
    }
  };

  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={6} md={4} key={index}>
          <ProductCard
            product={product}
            favorites={favorites}
            handleFavorites={handleFavorites}
            favoritesList={favoritesList}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(useStyles)(ProductList);
