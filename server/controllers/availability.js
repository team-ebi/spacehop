const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.get("/", async(req, res) => {
  const req_day = req.body.day;

  try {
    const availability = await db
    .select("*")
    .table("availability")
    .where({ day: req_day });
  
    res.send(availability);
  } catch(err) {
    res.send("no match...");
  }
});

module.exports = router;
