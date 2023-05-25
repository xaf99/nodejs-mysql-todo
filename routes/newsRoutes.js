const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const { newsApi } = require("../controllers/newsController");

const router = express.Router();

router.get("/getNews", validateToken, newsApi);

module.exports = router;
