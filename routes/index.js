const express = require("express");
const router = express.Router();

router
  .use("/auth", require("./Auth"))
  .use("/transaction", require("./Transaction"));

module.exports = router;
