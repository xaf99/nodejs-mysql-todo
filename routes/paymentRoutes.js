const express = require("express");
const {
  checkoutSession,
  paymentCheck,
} = require("../controllers/paymentController");
const { validateToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/create-checkout-session", validateToken, checkoutSession);
router.get("/paymentCheck", validateToken, paymentCheck);

module.exports = router;
