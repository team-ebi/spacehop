exports.seed = function(knex) {
  return knex("ratings").del()
    .then(function () {
      return knex("ratings").insert([
        {
          business_id: 1,
          user_id: 9,
          point: 3,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 1,
          user_id: 6,
          point: 4,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 1,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 1,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 1,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 2,
          user_id: 23,
          point: 3,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 2,
          user_id: 6,
          point: 3,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 2,
          user_id: 3,
          point: 3,
          comment: "Very clean space!"
        },
        {
          business_id: 2,
          user_id: 4,
          point: 3,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 2,
          user_id: 5,
          point: 3,
          comment: "Super happy to work here!"
        },
        {
          business_id: 3,
          user_id: 20,
          point: 2,
          comment: "Just okay."
        },
        {
          business_id: 3,
          user_id: 6,
          point: 3,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 3,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 3,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 3,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 4,
          user_id: 6,
          point: 4,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 4,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 4,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 4,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 5,
          user_id: 1,
          point: 3,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 5,
          user_id: 6,
          point: 4,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 5,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 5,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 5,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 6,
          user_id: 21,
          point: 3,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 6,
          user_id: 6,
          point: 4,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 6,
          user_id: 3,
          point: 4,
          comment: "Very clean space!"
        },
        {
          business_id: 6,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 6,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 7,
          user_id: 23,
          point: 5,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 7,
          user_id: 6,
          point: 5,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 7,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 7,
          user_id: 4,
          point: 5,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 7,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        },
        {
          business_id: 8,
          user_id: 22,
          point: 3,
          comment: "Business owner is very kind. Will work here again soon!"
        },
        {
          business_id: 8,
          user_id: 6,
          point: 4,
          comment: "Awesome service! I can't wait to book again."
        },
        {
          business_id: 8,
          user_id: 3,
          point: 5,
          comment: "Very clean space!"
        },
        {
          business_id: 8,
          user_id: 4,
          point: 4,
          comment: "Love this place. It's also fun at night!"
        },
        {
          business_id: 8,
          user_id: 5,
          point: 5,
          comment: "Super happy to work here!"
        }
      ]);
    });
};
