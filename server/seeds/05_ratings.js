exports.seed = function(knex) {
  return knex("ratings").del()
    .then(function () {
      return knex("ratings").insert([
        {
          business_id: 2,
          user_id: 1,
          point:4,
          comment:"Confortable."
        },
        {
          business_id: 3,
          user_id: 2,
          point:2,
          comment:"Dirty. Never visit again."
        },
        {
          business_id: 2,
          user_id: 5,
          point:5,
          comment:"Owner is very kind"
        },
      ]);
    });
};
