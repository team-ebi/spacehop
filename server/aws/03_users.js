const knex = require("./config.js");

knex("users").del().then(() => {
  return knex("users").insert([
    {
      first_name: "Potato",
      last_name: "Fan",
      email: "potato@dog.com",
      phone: "090-7777-7777"
    },
    {
      first_name: "Bobby",
      last_name: "Boop",
      email: "b.boop@gmail.com",
      phone: "080-7777-7777"
    },
    {
      first_name: "Frog",
      last_name: "Green",
      email: "frog@green.com",
      phone: "070-7777-7777"
    }
  ]);
})
.then(() => process.exit());
