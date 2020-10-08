const knex = require("knex");
const config = require("../knexfile.js");

const env = process.env.AWS_ENV || "development";
const envConfig = config[env];
const db = knex(envConfig);

module.exports = db;
