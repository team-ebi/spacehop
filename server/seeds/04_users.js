exports.seed = function(knex) {
  return knex("users").del()
    .then(function () {
      return knex("users").insert([
        {
          first_name: "Potato",
          last_name: "Fan",
          email: "potato@dog.com",
          phone: "090-777-777",
          booking: [1]
        }
      ]);
    });
};
