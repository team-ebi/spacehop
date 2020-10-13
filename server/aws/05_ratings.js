const knex = require("./config.js");

const ratings = () => {
  knex("ratings").del().then(() => {
    return knex("ratings").insert([
      {
        business_id: 1,
        user_id: 1,
        point: 4,
        comment: "Awesome service!"
      }
    ]);
  })
  .then(() => process.exit());
}

module.exports = { ratings };
