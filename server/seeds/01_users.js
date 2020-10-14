exports.seed = function(knex) {
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Masuo",
          last_name: "Suzuki",
          email: "m.suzuki@test.com",
          phone: "080-7382-1819"
        },
        {
          first_name: "Ryu",
          last_name: "Tamura",
          email: "r.tamura@test.com",
          phone: "080-3332-1611"
        },
        {
          first_name: "Akina",
          last_name: "Ohira",
          email: "a.ohira@test.com",
          phone: "080-2202-0392"
        },
        {
          first_name: "Potato",
          last_name: "Fan",
          email: "potato@dog.com",
          phone: "090-7777-7777"
        }
      ]);
    });
};
