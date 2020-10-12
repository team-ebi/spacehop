exports.seed = function(knex) {
  return knex("reservations").del()
    .then(function () {
      return knex("reservations").insert([
        {
          date: "2020-12-31",
          price: 10000,
          created_at: "2020-10-12",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-11-30",
<<<<<<< HEAD
          price: 10000, 
          created_at: "2020-10-29",
=======
          price: 10000,
          created_at: "2020-10-12",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-10-30",
          price: 10000,
          created_at: "2020-10-12",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-09-30",
          price: 10000,
          created_at: "2020-09-12",
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-08-30",
          price: 10000,
          created_at: "2020-08-29",
>>>>>>> 1a9d49c5ff8cbbc684542bffd462c8e710101b3c
          business_id: 1,
          user_id: 1
        },
        {
          date: "2020-10-30",
          price: 10000,
          created_at: "2020-09-29",
          business_id: 2,
          user_id: 2
        },
        {
          date: "2021-01-25",
          price: 10000,
          created_at: "2020-12-05",
          business_id: 3,
          user_id: 3
        }
      ]);
    });
};
