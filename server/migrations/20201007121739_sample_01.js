exports.up = function(knex) {
  return knex.schema
  .dropTableIfExists("businesses")
  .then(() => {
    return knex.schema.createTable("businesses", (table) => {
      table.increments();
      table.string("name");
      table.string("address_street");
      table.string("address_city");
      table.string("address_zip");
      table.string("phone");
      table.string("business_type");
      table.integer("capacity");
      table.integer("price");
    });
  });
};

exports.down = function(knex) {

};
