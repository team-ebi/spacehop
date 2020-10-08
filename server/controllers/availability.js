const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.get("/", async(req, res) => {
  const req_day = req.body.day;
  const req_city = req.body.address_city;
  const req_start_hour = req.body.start_hour;
  const req_end_hour = req.body.end_hour;
  
  const businesses = await db
  .select("*")
  .table("businesses")
  .join("availability", { "availability.business_id": "businesses.id" })
  .where({
    day: req_day,
    address_city: req_city,
  })
  .where("start_hour", "<=", req_start_hour)
  .andWhere("end_hour", ">=", req_end_hour);
  
  res.send(businesses);
});

module.exports = router;
