const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.get("/", async(req, res) => {
  const day = req.body.day;
  const address_city = req.body.address_city;
  const start_hour = req.body.start_hour;
  const end_hour = req.body.end_hour;
  
  const availability = await db
  .select("*")
  .table("businesses")
  .join("availability", { "availability.business_id": "businesses.id" })
  .where({
    day,
    address_city
  })
  .where("start_hour", "<=", start_hour)
  .andWhere("end_hour", ">=", end_hour);
  
  res.send(availability);
});

module.exports = router;
