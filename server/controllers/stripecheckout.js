const express = require("express");
const router = express.Router();
require("dotenv").config();


const stripe = require('stripe')("sk_test_51HU0G2CjwFEQ1pgcfVWe50YSIpoME7Z58MNUcf7fodRIfops2Af7yPBdrpSevAB5osGf68sQTItOPqvPPV96qPtN006FFEqoXd");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.post("/create-checkout-session", async (req, res) => {
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
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });
  res.json({ id: session.id });
});

module.exports = router;
