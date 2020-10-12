const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require('moment');

router.get("/", async(req, res) => {
  res.send("working");
});

//Make a Reservation
router.post("/", async (req, res) => {

  //ex) req.body = {business_id:1,user_id:2,date:"2020-10-09"}

  const date = req.body.date;
  const price = req.body.price;
  const business_id = req.body.business_id;
  const user_id = req.body.user_id;

  //current date
  const created_at = moment().format("YYYY-MM-DD");

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
