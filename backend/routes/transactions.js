const express = require("express");
const router = express.Router();
const {
  buyStock,
  sellStock,
  getMyTransactions,
} = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/auth");

router.post("/buy", authenticateToken, buyStock);
router.post("/sell", authenticateToken, sellStock);
router.get("/me", authenticateToken, getMyTransactions);

module.exports = router;
