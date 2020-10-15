const express = require("express");
const router = express.Router();
const db = require("../src/knex.js");

router.get("/test", async(req, res) => {
  res.send("working");
});

router.get("/", async(req, res) => {
  const day = req.query.day;
  const address_city = req.query.address_city;
  const start_hour = req.query.start_hour;
  const end_hour = req.query.end_hour;
  
  // Get all availability
  const availability = await db
  .select("*")
  .table("businesses")
  .leftJoin("availability", { "availability.business_id": "businesses.id" })
  .where({
    "availability.day": day,
    "businesses.address_city": address_city
  })
  .where("start_hour", "<=", start_hour)
  .andWhere("end_hour", ">=", end_hour);

  // Calculate average point for each business in array
  for (const business of availability) {
    const avgRating = await db.avg("point")
    .from("ratings")
    .where("business_id", business.id);

    business["avg"] = Number(avgRating[0].avg);
  }

  res.send(availability);
});

router.get("/data", async(req, res) => {
  const availability = await db
  .select("*")
  .table("availability")

  res.send(availability);
});

// TODO
// Get availability by businesses provides and if reservation are not full
router.get("/work_in_progress", async(req, res) => {
  const capacity = await db
  .select(["id", "name", "capacity"])
  .table("businesses");

  const reservation = await db
  .select("*")
  .table("businesses")
  .join("availability", { "businesses.id": "availability.business_id" })
  // .join("reservations", { "businesses.id": "reservations.business_id" })
  // .join("users", { "reservations.user_id": "users.id" });
  
  const all_availabilities = reservation.map(data => {
    const { business_id, name, capacity, user_id, day, start_hour, end_hour } = data;
    const all_availabilities = [{ day, start_hour, end_hour }];

    return { business_id, name, capacity, user_id, all_availabilities };
  });
  res.send(all_availabilities);
});

  // Edit availability info by business id
  router.patch("/:id", async (req, res) => {
    console.log("patching")
    const business_id = req.params.id;
    const updatedAvail = req.body.availabilities;
  
    for (const dailyAvail of updatedAvail) {
      console.log(dailyAvail);
        const day = dailyAvail.day;
        const updated = await db
        .select("*")
        .returning("*")
        .table("availability")
        .where({ business_id, day })
        .update(dailyAvail);
        if (updated.length === 0) {
          const start_hour = dailyAvail.start_hour;
          const end_hour = dailyAvail.end_hour;
          const day = dailyAvail.day;
          await db
            .select("*")
            .table("availability")
            .insert({business_id, day, start_hour, end_hour});
        }
    }
  
    const update = await db
      .select("*")
      .table("availability")
      .where( { business_id } )
    
    console.log("updated avail :", update)
    res.send(update);
  });


module.exports = router;
