const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");
const moment = require("moment");

// router.get("/", async(req, res) => {
//   res.send("working");
// });

//Make a Reservation
router.post("/", async (req, res) => {
  //ex) req.body = { "email": "potato@dog.com", "date": "2020-12-30", "business_id": 1,"start_at":12,"end_at":17 }

  // Get user id that matches with req.body.email
  try {
    const email = req.body.email;
    const user = await db.select("*").table("users").where({
      email,
    });
    
    const business_id = req.body.business_id;

    //get business data and pick up hourly price
    const businessData = await db.select("price").table("businesses").where({
      id:business_id,
    });

    const hourlyPrice=Number(businessData[0].price)

    //set format of YYYY-MM-DD
    const date = req.body.date.substr(0,10);
    const start_at = Number(req.body.start_at);
    const end_at = Number(req.body.end_at);

    if(end_at<=start_at){
      res.send("Incorrect start & end times!!!");
    }else{
      //set total price
      const price = hourlyPrice*(end_at-start_at);
  
      // created_at is set as default to today so needless to define.
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
    }

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
