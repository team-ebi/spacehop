const { users } = require("./01_users");
const { businesses } = require("./02_businesses");
const { availability } = require("./03_availability");
const { reservations } = require("./04_reservations");
const { ratings } = require("./05_ratings");

users();
businesses();
availability();
reservations();
ratings();
