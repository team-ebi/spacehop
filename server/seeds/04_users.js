exports.seed = function(knex) {
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Potato",
          last_name: "Fan",
          email: "potato@dog.com",
          phone: "090-7777-7777",
          booking: [1, 2]
        },
        {
          first_name: "Bobby",
          last_name: "Boop",
          email: "b.boop@gmail.com",
          phone: "080-7777-7777",
          booking: [3]
        }
      ]);
    });
};
