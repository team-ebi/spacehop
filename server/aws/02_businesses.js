const knex = require("./config.js");

const businesses = () =>  {
  knex("businesses").del().then(() => {
    return knex("businesses").insert([
      {
        name: "Ebi-chan",
        address_street: "1st Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Izakaya",
        capacity: 20,
        price: 20000,
        user_id: 2,
        stripe_price_id: "price_1HbJrzCjwFEQ1pgcojUHgGut" 
      },
      {
        name: "Spacehop Cafe",
        address_street: "2nd Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Cafe",
        capacity: 10,
        price: 10000,
        user_id: 2,
        stripe_price_id: "price_1HbJV4CjwFEQ1pgcagpXzMWb"
      },
      {
        name: "Space Xchange",
        address_street: "3rd Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Bar",
        capacity: 5,
        price: 5000,
        user_id: 2,
        stripe_price_id: "price_1HbHfKCjwFEQ1pgc3poy4TVE" 
      },
      {
        name: "Flexspace Hamburger",
        address_street: "4th Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Restaurant",
        capacity: 30,
        price: 30000,
        user_id: 2,
        stripe_price_id: "price_1HbJmgCjwFEQ1pgcoclpmXNO"
      },
      {
        name: "Dancing Crab Restaurant",
        address_street: "5th Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Restaurant",
        capacity: 30,
        price: 30000,
        user_id: 2,
        stripe_price_id: "price_1HbJnoCjwFEQ1pgcQVglmJvo"
      },
      {
        name: "Jazz Cafe",
        address_street: "6th Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Cafe",
        capacity: 10,
        price: 10000,
        user_id: 2,
        stripe_price_id: "price_1HbJpnCjwFEQ1pgctBSWj8RX"
      },
      {
        name: "Shibuya Golden Bar",
        address_street: "7th Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Bar",
        capacity: 5,
        price: 5000,
        user_id: 2,
        stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv"
      },
      {
        name: "Macchan",
        address_street: "8th Street",
        address_city: "Shibuya",
        address_zip: "777",
        phone: "0123-456-789",
        business_type: "Izakaya",
        capacity: 10,
        price: 10000,
        user_id: 2,
        stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv"
      }
    ]);
  })
  .then(() => process.exit());
}

module.exports = { businesses };
