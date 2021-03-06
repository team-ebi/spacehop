const knex = require("./config.js");

const availability = () => {
  knex("availability").del().then(() => {
    return knex("availability").insert([
      {
        business_id: 1,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 2,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 3,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 4,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 5,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 6,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 7,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      },
      {
        business_id: 8,
        day: "Monday",
        start_hour: 12,
        end_hour: 17
      }
    ]);
  })
  .then(() => process.exit());
}

module.exports = { availability };
