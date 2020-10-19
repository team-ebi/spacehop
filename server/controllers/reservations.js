const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require("moment");

// router.get("/", async(req, res) => {
//   res.send("working");
// });

//Make a Reservation
router.post("/", async (req, res) => {
  //ex) req.body = { "email": "potato@dog.com", "date": "2020-12-30", "price": 1000, "business_id": 1 }

  // Get user id that matches with req.body.email
  try {
    const email = req.body.email;
    const user = await db.select("*").table("users").where({
      email,
    });

    const date = req.body.date.substr(0,10);
    const price = req.body.price;
    const start_at = req.body.start_at;
    const end_at = req.body.end_at;
    // created_at is set as default to today so needless to define.
    const business_id = req.body.business_id;
    const user_id = user[0]["id"];

    const register = await db.select("*").table("reservations").insert({
      date,
      price,
      business_id,
      user_id,
      start_at,
      end_at
    });

    res.send("New reservation created!");
  } catch {
    res.sendStatus(500);
  }
});

//Get selected user's reservations
// router.get("/", async(req, res) => {
//   const user_id = req.params.user_id;

//   const reservations = await db
//   .select("*")
//   .table("reservations")
//   .where({
//     user_id
//   })
//   .orderBy('date', 'asc');

//   res.send(reservations);
// });

// Get user's upcoming reservations
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await db.select("*").table("users").where("email", email);

    const user_id = user[0]["id"];

    const upcomingReservations = await db
      .select("*")
      .table("businesses")
      .join("reservations", { "businesses.id": "reservations.business_id" })
      .join("availability", { "businesses.id": "availability.business_id" })
      .join("users", { "reservations.user_id": "users.id" })
      .where("reservations.user_id", user_id);

    res.send(upcomingReservations);
  } catch {
    res.sendStatus(500);
  }
});

//ISO 8601("2020-10-08T15:00:00.000Z") => YYYY-MM-DD
const convertDate = (IsoString) => {};

module.exports = router;
