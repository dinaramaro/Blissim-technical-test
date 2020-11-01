import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import { Grid, withStyles } from '@material-ui/core';

const useStyles = (theme) => ({});

const db = {
  users: [],
  favorites: [
    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
      description:
        'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
      category: 'men clothing',
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    },
    {
      id: 5,
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    },
    {
      id: 123,
      title: "J'aime",
      price: 25,
      description: 'Un joli sac en cuir pour être élégante en ville!',
      category: 'women clothing',
    },
  ],
};

const ProductList = (props) => {
  const { classes, products, favorites } = props;

  useEffect(() => {
    fetch('http://localhost:3000/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavoritesList(data));
  }, []);

  const [favoritesList, setFavoritesList] = useState([db.favorites]);

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
