const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.post("/", async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const booking = req.body.booking;

  const register = await db
  .select("*")
  .table("businesses")
  .insert({
    first_name,
    last_name,
    email,
    phone,
    booking
  });

  res.send("New user created!");
});

module.exports = router;
