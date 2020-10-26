const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

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
    .where({ email });
  const user_id = user[0]["id"];

  // Create business account, then create availability
  const business = await db
    .select("*")
    .table("businesses")
    .returning("*")
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
    });

  // Get new business id 
  const business_id = business[0].id;

  // Loop through availabilities and insert each one into availability table
  for (const availability of availabilities) {
    await db
      .select("*")
      .table("availability")
      .insert({
        business_id,
        day: availability.day,
        start_hour: availability.start_hour,
        end_hour: availability.end_hour,
      });
  }

  // Fetch all availabilities
  const availability = await db
    .select("*")
    .table("availability")
    .where({ business_id });

  // Add availability to business data that will be sent in response
  business[0]["availability"] = availability;

  res.send(business);
});

// Edit business info by email
router.patch("/", async (req, res) => {
  const email = req.body.email;

  // get user details from user table by email
  const user = await db
    .select("*")
    .returning("id")
    .table("users")
    .where({ email });

  const user_id = user[0]["id"];

  const updateInfo = req.body;
  delete updateInfo.email;

  // Update business info for user
  const businessInfo = await db
    .select("*")
    .returning("*")
    .table("businesses")
    .where({ user_id })
    .update(updateInfo);

  // Get business id to fetch all reservations to be sent in response
  const business_id = businessInfo[0]["id"];

  const reservationInfo = await db
    .select("*")
    .table("reservations")
    .where({ business_id });

  // Combine business and reservation info
  businessInfo[0]["reservations"] = reservationInfo;

  res.send(businessInfo);
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
  const allBusinessesInfo = await db.select("*").table("businesses");
  res.send(allBusinessesInfo);
});

// Get selected business's data
router.get("/:id/:date", async (req, res) => {
  const id = req.params.id;
  const date = new Date(req.params.date);

  // Get day as number (0-6)
  const dayOfNum = date.getDay();
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  // Convert number to string
  const day = dayArray[dayOfNum];

  const BusinessesInfo = await db
    .select("businesses.capacity", "availability.day", "availability.start_hour", "availability.end_hour")
    .from("businesses")
    .join("availability", { "availability.business_id": "businesses.id" })
    .where("businesses.id", id)
    .andWhere("availability.day", day);

  // If there is a data
  if (BusinessesInfo.length === 1) {
    const start_hour = Number(BusinessesInfo[0].start_hour);
    const end_hour = Number(BusinessesInfo[0].end_hour);
    const capacity = Number(BusinessesInfo[0].capacity);

    let timeObj = {};
    let reservationsAlready;

    //search each hour's left seats
    for (let i = start_hour; i < end_hour; i++) {
      reservationsAlready = await db
        .count({ count: '*' })
        .from("reservations")
        .where({
          "date": date,
          "business_id": id,
        })
        .where("start_at", "<=", i)
        .andWhere("end_at", ">=", i + 1);
      const timeScale = String(i) + "-" + String(i + 1);
      timeObj[timeScale] = capacity - Number(reservationsAlready[0].count);
    }

    //example
    // {"12-13": 19,"13-14": 19,"14-15": 19,"15-16": 19,"16-17": 18}

    res.send(timeObj);
  }else{
    // If not open that day, return empty object
    res.send({});
  }
});

module.exports = router;
