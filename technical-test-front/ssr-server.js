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
        const properties = {
          ...req.body,
        };
        removeFavorite(productId);
        res.status(200).send(properties);
      } else {
        const properties = {
          ...req.body,
        };
        postFavorite(properties);
        res.status(201).send(properties);
      }
    };

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

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
