const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [], favorites: [] }).write();

app
  .prepare()
  .then(() => {
    const server = express().use(bodyParser.json()).use(cookieParser());

    const handleFavorites = (req, res) => {
      const productId = req.body.id;
      if (findFavoriteById(productId)) {
        removeFavorite(productId);
        res.status(200).send(`Favorite with id ${productId} deleted.`);
      } else {
        const properties = {
          ...req.body,
        };
        postFavorite(properties);
        res.status(201).send(properties);
      }
    };

    // Define custom API routes and their handlers
    // server.get('/', (req, res) => {
    //   res.send('Hello serveur!');
    //  });

    server.get('/api/favorites', (req, res) => {
      const data = db.get('favorites').value();
      return res.json(data);
    });

    const getFavorites = () => db.get('favorites').value();

    const findFavoriteById = (productId) =>
      getFavorites().find((favorite) => favorite.id === productId);

    const postFavorite = (properties) =>
      db.get('favorites').push(properties).write();

    const removeFavorite = (productId) =>
      db.get('favorites').remove({ id: productId }).write();

    server.post('/api/favorites', handleFavorites);

    server.delete('/api/favorites', handleFavorites);

    //Let Next.js handle the rest, as we assume these are frontend routes
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });

    //OR  server.get('*', handle);
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
