exports.seed = function (knex) {
  return knex("reservations").del()
    .then(function () {
      return knex("reservations").insert([
        {
          date: "2020-11-02",
          price: 2500,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 23,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-05",
          price: 800,
          created_at: "2020-10-01",
          business_id: 2,
          user_id: 1,
          start_at: 15,
          end_at: 17
        },
        {
          date: "2020-12-01",
          price: 750,
          created_at: "2020-10-01",
          business_id: 5,
          user_id: 1,
          start_at: 12,
          end_at: 15
        },
        {
          date: "2020-10-01",
          price: 1200,
          created_at: "2020-09-01",
          business_id: 4,
          user_id: 1,
          start_at: 12,
          end_at: 14
        },
        {
          date: "2020-09-15",
          price: 700,
          created_at: "2020-08-01",
          business_id: 5,
          user_id: 1,
          start_at: 12,
          end_at: 14
        },
        {
          date: "2020-11-02",
          price: 500,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 11,
          start_at: 16,
          end_at: 17
        },
        {
          date: "2020-11-03",
          price: 1000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 12,
          start_at: 12,
          end_at: 14
        },
        {
          date: "2020-11-04",
          price: 1500,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 13,
          start_at: 12,
          end_at: 15
        },
        {
          date: "2020-11-05",
          price: 2500,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 14,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-06",
          price: 1000,
          created_at: "2020-10-01",
          business_id: 1,
          user_id: 15,
          start_at: 15,
          end_at: 17
        },
        {
          date: "2020-11-09",
          price: 1250,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 1,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-02",
          price: 1250,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 2,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-02",
          price: 1250,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 3,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-02",
          price: 1250,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 4,
          start_at: 12,
          end_at: 17
        },
        {
          date: "2020-11-02",
          price: 1250,
          created_at: "2020-10-01",
          business_id: 3,
          user_id: 5,
          start_at: 12,
          end_at: 17
        },
      ]);
    });
};
