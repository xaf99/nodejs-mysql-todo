const express = require("express");
const {
  loginUser,
  registerUser,
  updateUser,
} = require("../controllers/userController");
const { checkoutSession, retrieveSession } = require("../utils/stripe");
const { validateToken } = require("../middleware/validateTokenHandler");
const { newsApi } = require("../controllers/newsController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateUser", validateToken, updateUser);

router.post("/create-checkout-session", checkoutSession);
router.post("/retrieve-checkout-session", retrieveSession);
router.post("/news-api", newsApi);

module.exports = router;
