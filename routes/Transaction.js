const express = require("express");
const router = express.Router();

const Transaction = require("../controllers/Transaction");

router
  .post("/makeOrder", Transaction.makeOrder)
  .post("/confirm-payment", Transaction.confirmPayment);
module.exports = router;
