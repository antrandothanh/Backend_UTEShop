const express = require("express");
const sizeController = require("../controllers/sizeController");

const router = express.Router();

router.post("/sizes", sizeController.createSize);

module.exports = router;