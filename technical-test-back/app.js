const express = require("express");
const app = express();

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

app.get("/", (req, res) => {
  res.send("Hello serveur");
});

app.listen(8080, () => {
  console.log("Server listening on port 8080.");
});
