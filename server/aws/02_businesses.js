const knex = require("./config.js");

const businesses = () =>  {
  knex("businesses").del().then(() => {
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
        stripe_price_id: "price_1HblppCjwFEQ1pgcJ7QPY9Nd" 
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
        stripe_price_id: "price_1HblqRCjwFEQ1pgcARvCsFXq"
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
        stripe_price_id: "price_1HblrNCjwFEQ1pgcXdtUQq8I" 
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
        stripe_price_id: "price_1HbJmgCjwFEQ1pgcoclpmXNO"
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
        stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv"
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
        stripe_price_id: "price_1HbJpnCjwFEQ1pgctBSWj8RX"
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
        stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv"
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
        stripe_price_id: "price_1HblvRCjwFEQ1pgcNzZjIWEL"
      }
    ]);
  })
  .then(() => process.exit());
}

module.exports = { businesses };
