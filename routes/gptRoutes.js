const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const { getGptResponse } = require("../controllers/gptController");

const router = express.Router();

router.post("/find-Summary", getGptResponse);
