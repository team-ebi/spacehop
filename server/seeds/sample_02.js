exports.seed = function (knex) {
  return knex("businesses")
    .del()
    .then(function () {
      return knex("availability").del();
    })
    .then(function () {
      return knex("businesses").insert([
        {
          name: "Spacehop Cafe",
          address_street: "1st Street",
          address_city: "Roppongi",
          address_zip: "777",
          phone: "0123456789",
          business_type: "Cafe",
          capacity: "10",
          price: "10000",
        },
      ]);
    })
    .then(function () {
      return knex("businesses")
        .first("id")
        .then((businesses) => {
          return knex("availability").insert([
            {
              business_id: businesses.id,
              day: "Monday",
              start_hour: 10,
              end_hour: 12,
            },
          ]);
        });
    });
};
