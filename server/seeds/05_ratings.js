exports.seed = function(knex) {
  return knex("ratings").del()
    .then(function () {
      return knex("ratings").insert([
        {
          business_id: 1,
          user_id: 1,
          point: 4,
          comment: "Awesome service!"
        }
      ]);
    });
};
