const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require('moment');

router.get("/", async(req, res) => {
  res.send("working");
});

//Make a Reservation
router.post("/", async (req, res) => {
  //ex) req.body = { "email": "potato@dog.com", "date": "2020-12-30", "price": 1000, "business_id": 1 }

  // Get user id that matches with req.body.email
  const email = req.body.email;
  const user = await db
  .select("*")
  .table("users")
  .where({
    email
  });

  const date = req.body.date;
  const price = req.body.price;
  const created_at = moment().format("YYYY-MM-DD"); // Current date
  const business_id = req.body.business_id;
  const user_id = user[0]["id"];

  const register = await db
  .select("*")
  .table("reservations")
  .insert({
    date,
    price,
    created_at,
    business_id,
    user_id,
  });

  res.send("New reservation created!");
});

//Get selected user's reservations 
router.get("/user/:user_id", async(req, res) => {
  const user_id = req.params.user_id;
  
  const reservations = await db
  .select("*")
  .table("reservations")
  .where({
    user_id
  })
  .orderBy('date', 'asc');
  
  res.send(reservations);
});

//ISO 8601("2020-10-08T15:00:00.000Z") => YYYY-MM-DD
const convertDate =(IsoString)=>{
  
}

module.exports = router;
