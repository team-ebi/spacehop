require("dotenv").config();

const knex = require("knex")({
  client: "postgresql",
  connection: `postgres://${process.env.USER}@127.0.0.1:5432/spacehoptest`
});

module.exports = knex;