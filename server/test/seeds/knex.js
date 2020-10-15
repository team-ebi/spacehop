const knex = require("knex");
const config = require("./knexfile.js");

const env = "test";
const envConfig = config[env];
const db = knex(envConfig);

module.exports = db;
