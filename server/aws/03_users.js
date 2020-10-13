const knex = require("./config.js");

knex("users").del().then(() => {
  return knex("users").insert([
    {
      first_name: "Masuo",
      last_name: "Suzuki",
      email: "m.suzuki@gmail.com",
      phone: "080-7382-1819"
    },
    {
      first_name: "Ryu",
      last_name: "Tamura",
      email: "r.tamura@gmail.com",
      phone: "080-3332-1611"
    },
    {
      first_name: "Akina",
      last_name: "Ohira",
      email: "a.ohira@gmail.com",
      phone: "080-2202-0392"
    },
    {
      first_name: "Potato",
      last_name: "Fan",
      email: "potato@dog.com",
      phone: "090-7777-7777"
    }
  ]);
})
.then(() => process.exit());
