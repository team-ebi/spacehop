const express = require("express");
const router = express.Router();
require("dotenv").config();

//secret api key in .env
const stripe = require('stripe')(process.env.SECRET_KEY);

//test for route
router.get("/test", async(req, res) => {
  res.send("working");
});

//stripe checkout session endpoint
router.post("/checkoutsession", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "Reservation",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "https://example.com/cancel",
  });
  res.json({ id: session.id });
});

module.exports = router;
