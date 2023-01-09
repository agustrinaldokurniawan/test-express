const express = require("express");
const router = express.Router();

// const Auth = require("../controllers/Auth");

router.post("/login", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

module.exports = router;
