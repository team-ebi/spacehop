const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/", async (req, res) => {
  const address_city = req.query.address_city;
  const start_hour = req.query.start_hour;
  const end_hour = req.query.end_hour;

  const date = new Date(req.query.date);

  //get day as number(0-6)
  const dayOfNum = date.getDay();

  const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Tursday", "Friday", "Saturday"]

  //convert number to string
  const day = dayArray[dayOfNum];

  // Get all availability
  const availability = await db
    .select("*")
    .table("businesses")
    .leftJoin("availability", { "availability.business_id": "businesses.id" })
    .where({
      "availability.day": day,
      "businesses.address_city": address_city,
    })
    .where("start_hour", "<=", start_hour)
    .andWhere("end_hour", ">=", end_hour);


  let filteredAvailability = []

  for (let elm of availability) {
    // console.log(elm);
    const id = Number(elm.id);
    const start_hour = Number(elm.start_hour);
    const end_hour = Number(elm.end_hour);
    const capacity = Number(elm.capacity);
    let flag = false;

    //search each hour's left seats
    for (let i = start_hour; i < end_hour; i++) {
      const reservationCount = await db
        .count({ count: '*' })
        .from("reservations")
        .where({
          "date": date,
          "business_id": id,
        })
        .where("start_at", "<=", i)
        .andWhere("end_at", ">=", i + 1);
        
      //Not appear in list if full.
      if (Number(reservationCount[0].count) === capacity) {
        flag = true;
        break;
      }
    }

    //appear in list if not full all time.
    if (!flag) {
      filteredAvailability.push(elm)
    }
  }

  // Calculate average point for each business in array
  for (const business of filteredAvailability) {
    const avgRating = await db
      .avg("point")
      .from("ratings")
      .where("business_id", business.id);

    business["avg"] = Number(avgRating[0].avg);
  }

  res.send(filteredAvailability);
});

router.get("/data", async (req, res) => {
  const availability = await db.select("*").table("availability");

  res.send(availability);
});

// TODO
// Get availability by businesses provides and if reservation are not full
router.get("/work_in_progress", async (req, res) => {
  const capacity = await db
    .select(["id", "name", "capacity"])
    .table("businesses");

  const reservation = await db
    .select("*")
    .table("businesses")
    .join("availability", { "businesses.id": "availability.business_id" });
  // .join("reservations", { "businesses.id": "reservations.business_id" })
  // .join("users", { "reservations.user_id": "users.id" });

  const all_availabilities = reservation.map((data) => {
    const {
      business_id,
      name,
      capacity,
      user_id,
      day,
      start_hour,
      end_hour,
    } = data;
    const all_availabilities = [{ day, start_hour, end_hour }];

    return { business_id, name, capacity, user_id, all_availabilities };
  });
  res.send(all_availabilities);
});

// Edit availability info by business id
router.patch("/:id", async (req, res) => {
  const business_id = req.params.id;
  // updatedAvail is an array of objects; each obj is a business's availability
  const updatedAvail = req.body.availabilities;

  // loop through array of availabilities
  for (const dailyAvail of updatedAvail) {
    const day = dailyAvail.day;

    // update availability
    const updated = await db
      .select("*")
      .returning("*")
      .table("availability")
      .where({ business_id, day })
      .update(dailyAvail);

    // if update query returns empty array, then it's a new
    // availability day => need to insert new row
    if (updated.length === 0) {
      const start_hour = dailyAvail.start_hour;
      const end_hour = dailyAvail.end_hour;
      const day = dailyAvail.day;
      await db
        .select("*")
        .table("availability")
        .insert({ business_id, day, start_hour, end_hour });
    }
  }

  // query all availabilities for business to send as response
  const update = await db
    .select("*")
    .table("availability")
    .where({ business_id });

  res.send(update);
});

module.exports = router;
