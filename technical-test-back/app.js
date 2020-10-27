const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ users: [], favorites: [] }).write();

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

const app = express().use(bodyParser.json()).use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello serveur!");
});

app.get("/favorites", (req, res) => {
  const data = db.get("favorites").value();
  return res.json(data);
});

const getFavorites = () => db.get("favorites").value();

const findFavoriteById = (productId) =>
  getFavorites().find((favorite) => favorite.id === productId);

const postFavorite = (properties) =>
  db.get("favorites").push(properties).write();

const removeFavorite = (productId) =>
  db.get("favorites").remove({ id: productId }).write();

app.post("/favorites", handleFavorites);

app.delete("/favorites", handleFavorites);

app.listen(8080, () => {
  console.log("Server listening on port 8080.");
});
