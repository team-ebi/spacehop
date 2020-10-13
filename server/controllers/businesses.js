const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

// Create business account by email
/*
Exmaple JSON request to create business account
{
  "email": "potato@dog.com",
  "name": "Potato Cafe",
	"address_street": "100th Street",
  "address_city": "Shibuya",
  "address_zip": "777-777",
  "phone": "0123-456-789",
  "business_type": "Cafe",
  "capacity": 10,
  "price": 10000,
  "stripe_price_id": "stripe price id here"
}
*/
router.post("/", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const address_street = req.body.address_street;
  const address_city = req.body.address_city;
  const address_zip = req.body.address_zip;
  const phone = req.body.phone;
  const business_type = req.body.business_type;
  const capacity = req.body.capacity;
  const price = req.body.price;
  const stripe_price_id = req.body.stripe_price_id;

  const user = await db
  .select("*")
  .table("users")
  .where({
    email
  });

  const user_id = user[0]["id"];

  await db
  .select("*")
  .table("businesses")
  .insert({
    user_id,
    name,
    address_street,
    address_city,
    address_zip,
    phone,
    business_type,
    capacity,
    price,
    stripe_price_id
  });

  res.send("New business provider created!");
});

module.exports = router;
