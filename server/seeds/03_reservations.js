exports.seed = function(knex) {
  return knex("reservations").del()
    .then(function () {
      return knex("reservations").insert([
        {
          date: "2020-12-31",
          price: 10000,
          created_at: "2020-11-29",
          business_id: 1,
          user_id: 1
        },
      ]);
    });
};
