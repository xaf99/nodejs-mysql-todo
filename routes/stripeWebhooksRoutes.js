const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const { webHooks } = require("../controllers/stripeWebhooksController");

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), webHooks);

module.exports = router;
