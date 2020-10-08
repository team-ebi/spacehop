exports.up = function (knex) {
  return knex.schema
  .dropTableIfExists("availability")
  .dropTableIfExists("businesses")
  .then(() => {
    return knex.schema
      .createTable("businesses", function (table) {
        table.increments("id");
        table.string("name");
        table.string("address_street");
        table.string("address_city");
        table.string("address_zip");
        table.string("phone");
        table.string("business_type");
        table.integer("capacity");
        table.integer("price");
      })
      .createTable("availability", function (table) {
        table.increments("id");
        table.integer("business_id").unsigned().notNullable();
        table.string("day");
        table.integer("start_hour");
        table.integer("end_hour");
        table.foreign("business_id").references("id").inTable("businesses");
      });
  });
};

exports.down = function (knex) {

};
