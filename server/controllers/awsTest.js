const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

// test for aws => country is sample table in rds
router.get("/", async(req, res) => {
  const availability = await db
  .select("*")
  .table("country")

  res.send(availability);
});

module.exports = router;
