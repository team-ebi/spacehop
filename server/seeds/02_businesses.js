exports.seed = function(knex) {
  return knex("businesses").del()
    .then(function () {
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
          stripe_price_id: "price_1HblppCjwFEQ1pgcJ7QPY9Nd" 
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
          stripe_price_id: "price_1HblqRCjwFEQ1pgcARvCsFXq"
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
          stripe_price_id: "price_1HblrNCjwFEQ1pgcXdtUQq8I" 
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
          stripe_price_id: "price_1HbJqfCjwFEQ1pgcOxl1Ihpv"
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
          stripe_price_id: "price_1HblvRCjwFEQ1pgcNzZjIWEL"
        }
      ]);
    });
};
