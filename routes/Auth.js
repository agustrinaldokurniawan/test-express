const express = require("express");
const router = express.Router();

const Auth = require("../controllers/Auth");

router.post("/login", Auth.list);

module.exports = router;
