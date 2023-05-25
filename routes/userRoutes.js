const express = require("express");
const router = express.Router();
const db = require("../config/dbConnection");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUser, registerUser } = require("../controllers/userController");

router.post("/register", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);

module.exports = router;
