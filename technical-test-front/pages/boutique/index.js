import DefaultLayout from '../../components/DefaultLayout';
import Header from '../../components/header/Header';
import Footer from '../../components/Footer/Footer';
import {
  withStyles,
  Container,
  Grid,
  Typography,
  Toolbar,
} from '@material-ui/core';
//import ProductCategories from '../../components/boutique/ProductCategories';
import ProductsList from '../../components/boutique/ProductsList';
import { productsDatas } from '../../products';
import Head from 'next/head';

const useStyles = (theme) => ({
  root: { marginBottom: theme.spacing(3), backgroundColor: '#ffffff' },
  toolbar: theme.mixins.toolbar,
  h1: {
    margin: theme.spacing(4, 0),
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  filterTitle: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.light,
  },
  filterListItem: {
    paddingLeft: 0,
  },
  productsListContainer: {
    justifyContent: 'flex-end',
  },
});

const Boutique = (props) => {
  const { classes, favoritesData } = props;
  return (
    <DefaultLayout>
      <Head>
        <title>SuperShop</title>
      </Head>
      <Container maxWidth="lg" className={classes.root}>
        <Grid item xs={12} md={12} className={classes.headerContainer}>
          <Header />
        </Grid>
        <Container container className={classes.titleContainer}>
          <Grid item>
            <div className={classes.toolbar} />
            <Typography variant="h1" className={classes.h1}>
              SuperShop
            </Typography>
          </Grid>
        </Container>

        <Container maxWidth="lg" className={classes.bodyContainer}>
          <Grid container className={classes.productsListContainer}>
            <Grid item xs={12} md={9} className={classes.productsListContainer}>
              <ProductsList products={productsDatas} />
            </Grid>
          </Grid>
        </Container>
        <Grid item xs={12} md={12} className={classes.headerContainer}>
          <Footer />
        </Grid>
      </Container>
    </DefaultLayout>
  );
};

export const getServerSideProps = async function () {
  const res = await fetch(`http://localhost:3000/api/favorites`);
  const favoritesData = await res.json();

  return { props: { favoritesData } };
};

export default withStyles(useStyles)(Boutique);
