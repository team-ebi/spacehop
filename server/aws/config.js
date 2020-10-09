require("dotenv").config();

const knex = require("knex")({
  client: "postgresql",
  connection: {
    host: process.env.AWS_SPACEHOP_HOST,
    user: process.env.AWS_SPACEHOP_USER,
    password: process.env.AWS_SPACEHOP_PASSWORD,
    database: process.env.AWS_SPACEHOP_DB
  }
});

module.exports = knex;
