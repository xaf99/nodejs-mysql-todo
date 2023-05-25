const express = require("express");
const router = express.Router();
const db = require("../config/dbConnection");
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(422).json({
      message: "Please provide the token",
    });
  }
  const theToken = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(theToken, process.env.ACCESS_TOKEN_SECRET);
  db.query(
    "SELECT * FROM users where id=?",
    decoded.id,
    function (error, results, fields) {
      if (error) throw error;
      req.user = results[0];
      next();
    }
  );
};

module.exports = { validateToken };
