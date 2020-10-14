exports.seed = function(knex) {
  return knex("reservations").del()
    .then(function () {
      return knex("reservations").insert([
        {
          date: "2020-11-02",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-11-05",
          price: 10000,
          created_at: "2020-10-01",
          business_id: 2,
          user_id: 1
        },
        {
          date: "2020-12-01",
          price: 5000,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 1
        },
        {
          date: "2020-10-01",
          price: 20000,
          created_at: "2020-09-01",
          business_id: 4,
          user_id: 1
        },
        {
          date: "2020-09-15",
          price: 10000,
          created_at: "2020-08-01",
          business_id: 5,
          user_id: 1
        },
        {
          date: "2020-11-02",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 11
        },
        {
          date: "2020-11-03",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 12
        },
        {
          date: "2020-11-04",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 13
        },
        {
          date: "2020-11-05",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 14
        },
        {
          date: "2020-11-06",
          price: 20000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 15
        }
      ]);
    });
};
