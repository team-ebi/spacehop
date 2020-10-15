const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

// Get all data
router.get("/", async (req, res) => {
  // something here
});

module.exports = router;
