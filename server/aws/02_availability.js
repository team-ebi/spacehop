const knex = require("./config.js");

knex("availability").del().then(() => {
  return knex("availability").insert([
    {
      business_id: 1,
      day: "Monday",
      start_hour: 10,
      end_hour: 12
    },
    {
      business_id: 1,
      day: "Tuesday",
      start_hour: 12,
      end_hour: 14
    },
    {
      business_id: 2,
      day: "Wednesday",
      start_hour: 12,
      end_hour: 14
    },
    {
      business_id: 3,
      day: "Friday",
      start_hour: 14,
      end_hour: 16
    },
    {
      business_id: 4,
      day: "Monday",
      start_hour: 16,
      end_hour: 18
    },
    {
      business_id: 5,
      day: "Tuesday",
      start_hour: 18,
      end_hour: 20
    }
  ]);
})
.then(() => process.exit());