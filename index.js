// index.js
const express = require("express");

const app = express();
const PORT = 4000;

const Database = require("./database");
const database = new Database();
database.connectMongodb();

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.use(require("./routes"));

// Export the Express API
module.exports = app;
