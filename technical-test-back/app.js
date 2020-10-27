const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ users: [], favorites: [] }).write();

const app = express().use(bodyParser.json()).use(cookieParser());

//app.get("/", (req, res) => {
//  res.send("Hello serveur!");
//});

app.get("/favorites", (req, res) => {
  const data = db.get("favorites").value();
  return res.json(data);
});

app.listen(8080, () => {
  console.log("Server listening on port 8080.");
});
