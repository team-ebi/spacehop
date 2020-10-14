const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async (req, res) => {
  res.send("working");
});

// Get business info by id with ratings
// router.get("/:id", async (req, res) => {
//   const id = req.params.id;

//   const averageRating = await db.avg('point')
//     .from('ratings')
//     .where('business_id', '=', id)

//   //Get each rating & comment
//   const comments = await db
//     .select("point", "comment", "users.first_name", "users.last_name")
//     .table("ratings")
//     .where('business_id', '=', id)
//     .join("users", { "ratings.user_id": "users.id" })

//   const business = await db
//     .select("*")
//     .table("businesses")
//     .where('id', '=', id)

//   //add average point to business data
//   business[0]['avg'] = averageRating[0]['avg'];
//   business[0]['comments'] = comments;

//   res.send(business[0]);
// });

// Create business account by email
/*
Example JSON request to create business account
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
  "availability": [
    { "day": "Friday", "start_hour": 10, "end_hour": 12 },
    { "day": "Friday", "start_hour": 12, "end_hour": 14 },
    { "day": "Friday", "start_hour": 14, "end_hour": 16 }
  ]
}
*/
router.post("/", async (req, res) => {
  // Information need for creating business account
  const email = req.body.email;
  const name = req.body.name;
  const address_street = req.body.address_street;
  const address_city = req.body.address_city;
  const address_zip = req.body.address_zip;
  const phone = req.body.phone;
  const business_type = req.body.business_type;
  const capacity = req.body.capacity;
  const price = req.body.price;
  
  // Information need for creating availability
  const availabilities = req.body.availability;

  // Get user id by email
  const user = await db
    .select("*")
    .table("users")
    .where({
      email
    });
  const user_id = user[0]["id"];
  
  // Create business account, then create availability
  const business = await db
    .select("*")
    .table("businesses")
    .returning("id")
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

  const business_id = business[0];
  for (const availability of availabilities) {
    await db.select("*").table("availability").insert({
      business_id,
      day: availability.day,
      start_hour: availability.start_hour,
      end_hour: availability.end_hour
    });
  }

  res.send("Business account and availability is created!");
});

// Edit business info by email
router.patch("/", async (req, res) => {
  const email = req.body.email;
  const user = await db
  .select("*")
  .returning("id")
  .table("users")
  .where({ email });
  const user_id = user[0]["id"];

  const updateInfo = {};
  if (req.body.name) updateInfo["name"] = req.body.name;
  if (req.body.last_name) updateInfo["address_street"] = req.body.address_street;
  if (req.body.email) updateInfo["address_city"] = req.body.address_city;
  if (req.body.phone) updateInfo["address_zip"] = req.body.address_zip;
  if (req.body.phone) updateInfo["phone"] = req.body.phone;
  if (req.body.phone) updateInfo["business_type"] = req.body.business_type;
  if (req.body.phone) updateInfo["capacity"] = req.body.capacity;
  if (req.body.phone) updateInfo["price"] = req.body.price;

  await db
  .select("*")
  .table("businesses")
  .where({ user_id })
  .update(updateInfo);

  res.send("Business information is updated");
});

// Delete user by email
router.delete("/", async (req, res) => {
  const email = req.body.email;
  const user = await db
  .select("*")
  .returning("id")
  .table("users")
  .where({ email });
  const user_id = user[0]["id"];

  await db
  .table("businesses")
  .where({ user_id })
  .del();

  res.send("Business information deleted");
});

// Get all business data
router.get("/data", async (req, res) => {
  const allBusinessesInfo = await db
    .select("*")
    .table("businesses");

  res.send(allBusinessesInfo);
});

module.exports = router;
