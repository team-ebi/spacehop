const knex = require("./config.js");

knex("businesses").del().then(() => {
  return knex("businesses").insert([
    {
      name: "Spacehop Cafe",
      address_street: "1st Street",
      address_city: "Roppongi",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 10,
      price: 10000,
      user_id:1,
      stripe_price_id: 'price_1HbJV4CjwFEQ1pgcagpXzMWb'
    },
    {
      name: "Space Xchange",
      address_street: "2nd Street",
      address_city: "Shibuya",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Bar",
      capacity: 20,
      price: 20000,
      user_id:2,
      stripe_price_id: 'price_1HbHfKCjwFEQ1pgc3poy4TVE' 
    },
    {
      name: "Flexspace Hamburger",
      address_street: "3rd Street",
      address_city: "Shinjuku",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Restaurant",
      capacity: 30,
      price: 30000,
      user_id:3,
      stripe_price_id: 'price_1HbJmgCjwFEQ1pgcoclpmXNO'
    },
    {
      name: "Bar X",
      address_street: "4th Street",
      address_city: "Shibuya",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Bar",
      capacity: 40,
      price: 40000,
      user_id:4,
      stripe_price_id: 'price_1HbJrzCjwFEQ1pgcojUHgGut' 
    },
    {
      name: "Cafe X",
      address_street: "5th Street",
      address_city: "Shinjuku",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 40,
      price: 40000,
      user_id:5,
      stripe_price_id: 'price_1HbJnoCjwFEQ1pgcQVglmJvo'
    },
    {
      name: "Cafe Y",
      address_street: "6th Street",
      address_city: "Shibuya",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 50,
      price: 50000,
      user_id:5,
      stripe_price_id: 'price_1HbJpnCjwFEQ1pgctBSWj8RX'
    },
    {
      name: "Cafe Z",
      address_street: "7th Street",
      address_city: "Shibuya",
      address_zip: "777",
      phone: "0123-456-789",
      business_type: "Cafe",
      capacity: 60,
      price: 60000,
      user_id:5,
      stripe_price_id: 'price_1HbJqfCjwFEQ1pgcOxl1Ihpv'
    }
  ]);
})
.then(() => process.exit());
