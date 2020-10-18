exports.seed = function(knex) {
  return knex("businesses").del()
    .then(function () {
      return knex("businesses").insert([
        {
          name: "Ebi-chan",
          address_street: "3-2-22 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Izakaya",
          capacity: 20,
          price: 20000,
          user_id: 2,
          stripe_price_id: "price_1HblppCjwFEQ1pgcJ7QPY9Nd",
          lat: 35.658022,
          lng: 139.699277
        },
        {
          name: "Narukiyo",
          address_street: "2-7-14 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Izakaya",
          capacity: 10,
          price: 10000,
          user_id: 21,
          stripe_price_id: "price_1HblqRCjwFEQ1pgcARvCsFXq",
          lat: 35.658031,
          lng: 139.700146
        },
        {
          name: "Kinka Bar",
          address_street: "1-3-14 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Bar",
          capacity: 5,
          price: 5000,
          user_id: 22,
          stripe_price_id: "price_1HblrNCjwFEQ1pgcXdtUQq8I",
          lat: 35.659774,
          lng: 139.702002
        },
        {
          name: "Mikkeller Bar",
          address_street: "7-4-23 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Bar",
          capacity: 30,
          price: 30000,
          user_id: 23,
          stripe_price_id: "price_1HbJmgCjwFEQ1pgcoclpmXNO",
          lat: 35.660898,
          lng: 139.702034
        },
        {
          name: "Dancing Crab Restaurant",
          address_street: "3-1-21 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Restaurant",
          capacity: 30,
          price: 30000,
          user_id: 24,
          stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv",
          lat: 35.661325,
          lng: 139.700725
        },
        {
          name: "Jazz Cafe",
          address_street: "1-32-4 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Cafe",
          capacity: 10,
          price: 10000,
          user_id: 25,
          stripe_price_id: "price_1HbJpnCjwFEQ1pgctBSWj8RX",
          lat: 35.663478,
          lng: 139.701079
        },
        {
          name: "Shibuya Golden Bar",
          address_street: "1-8-13 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Bar",
          capacity: 5,
          price: 5000,
          user_id: 26,
          stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv",
          lat: 35.656429,
          lng: 139.695978
        },
        {
          name: "Macchan",
          address_street: "3-1-21 Shibuya",
          address_city: "Shibuya",
          address_zip: "150-0002",
          phone: "0123-456-789",
          business_type: "Izakaya",
          capacity: 10,
          price: 10000,
          user_id: 27,
          stripe_price_id: "price_1HblvRCjwFEQ1pgcNzZjIWEL",
          lat: 35.658602,
          lng: 139.705351
        }
      ]);
    });
};
