const express = require("express");

const router = express.Router();

const comments = {};

router.post("/events", (req, res) => {
  const { type, data } = req.body;
});

module.exports = router;
