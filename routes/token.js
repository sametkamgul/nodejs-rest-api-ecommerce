const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { logging } = require("../middleware/logger");

const router = express.Router();

router.post("/", logging, async (req, res) => {
  try {
    const token = jwt.sign({}, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error?.message || "internal server error" });
  }
});

module.exports = router;
