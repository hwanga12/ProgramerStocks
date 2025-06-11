const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

router.get("/", stockController.getStockList);
router.get("/:id", stockController.getStockDetail);

module.exports = router;
