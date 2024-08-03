const express = require("express");

const router = express.Router();

router.all("/", (req, res) => {
  res
    .status(404)
    .json({ error: "route is not found. please check the documentation" });
});

module.exports = router;
