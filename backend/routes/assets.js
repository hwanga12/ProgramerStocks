const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const authenticateToken = require("../middlewares/auth");

router.put("/me", authenticateToken, assetController.updateCash);
router.get("/me", authenticateToken, assetController.getMyAssets);

module.exports = router;
