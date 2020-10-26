const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

// Make a reservation
router.post("/", async (req, res) => {
  /*
  ex)
  req.body = {
    "email": "potato@dog.com",
    "date": "2020-12-30",
    "business_id": 1,
    "start_at":12,
    "end_at":17
  };
  */

  // Get user id that matches with req.body.email
  try {
    const email = req.body.email;
    const user = await db
      .select("*")
      .table("users")
      .where({
        email,
      });
    const business_id = req.body.business_id;

    // Get business data and pick up hourly price
    const businessData = await db
      .select("price")
      .table("businesses")
      .where({
        id:business_id,
      });
    const hourlyPrice = Number(businessData[0].price);

    // Set format of YYYY-MM-DD
    const date = req.body.date.substr(0, 10);
    const start_at = Number(req.body.start_at);
    const end_at = Number(req.body.end_at);

    if (end_at <= start_at) {
      res.send("Incorrect start & end times!");
    } else {
      // Set total price
      const price = hourlyPrice*(end_at-start_at);
      // created_at is set as default to today so needless to define.
      const user_id = user[0]["id"];
      const register = await db
        .select("*")
        .table("reservations")
        .insert({
          date,
          price,
          business_id,
          user_id,
          start_at,
          end_at
        });

      // Check already have messages
      const message = await db
        .select("*")
        .table("messages")
        .where({
          business_id,
          user_id
        });

      // If this is the first time to book this space, send message
      if (message.length == 0) {
        const newMessage=[{
          "business_message": "Thank you for booking! Feel free to send messages if you have questions."
        }];
        const message = await db
          .select("*")
          .table("messages")
          .insert({
            business_id,
            user_id,
            message:JSON.stringify(newMessage)
          });
      }
      res.send("New reservation created!");
    }
  } catch {
    res.sendStatus(500);
  }
});

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

module.exports = router;
