const express = require("express");
const app = express();
const cors = require("cors");

const businessesAPI = require("../controllers/businesses");
const usersAPI = require("../controllers/users");
const availabilityAPI = require("../controllers/availability");
const reservationsAPI = require("../controllers/reservations");
const ratingsAPI = require("../controllers/ratings");
const messagesAPI = require("../controllers/messages");

const setupServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use("/api/businesses", businessesAPI);
  app.use("/api/users", usersAPI);
  app.use("/api/availability", availabilityAPI);
  app.use("/api/reservations", reservationsAPI);
  app.use("/api/ratings", ratingsAPI);
  app.use("/api/messages", messagesAPI);

  return app;
};

module.exports = { setupServer };
