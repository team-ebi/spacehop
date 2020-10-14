exports.seed = function(knex) {
  return knex("reservations").del()
    .then(function () {
      return knex("reservations").insert([
        {
          date: "2021-01-01",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-12-01",
          price: 10000,
          created_at: "2020-10-01",
          business_id: 2,
          user_id: 1
        },
        {
          date: "2020-11-01",
          price: 5000,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 1
        },
        {
          date: "2020-10-01",
          price: 20000,
          created_at: "2020-09-01",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-09-01",
          price: 10000,
          created_at: "2020-08-01",
          business_id: 2,
          user_id: 1
        }
      ]);
    });
};
