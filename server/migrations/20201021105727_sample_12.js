exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists("messages")
    .dropTableIfExists("ratings")
    .dropTableIfExists("availability")
    .dropTableIfExists("reservations")
    .dropTableIfExists("businesses")
    .dropTableIfExists("users")
    .then(() => {
      return knex.schema
        .createTable("users", (table) => {
          table.increments("id");
          table.string("first_name");
          table.string("last_name");
          table.string("email");
          table.string("phone");
        })
        .createTable("businesses", (table) => {
          table.increments("id");
          table
            .integer("user_id")
            .unsigned()
            .notNullable();
          table.string("name");
          table.string("address_street");
          table.string("address_city");
          table.string("address_zip");
          table.string("phone");
          table.string("business_type");
          table.integer("capacity");
          table.integer("price");
          table.string("stripe_price_id");
          table.float("lat");
          table.float("lng");

          table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        })
        .createTable("availability", (table) => {
          table.increments("id");
          table
            .integer("business_id")
            .unsigned()
            .notNullable();
          table.string("day");
          table.integer("start_hour");
          table.integer("end_hour");

          table
            .foreign("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");
        })
        .createTable("reservations", (table) => {
          table.increments("id");
          table.date("date");
          table.integer("start_at");
          table.integer("end_at");
          table.integer("price");
          table.date("created_at").defaultTo(knex.fn.now());
          table
            .integer("business_id")
            .unsigned()
            .notNullable();
          table
            .integer("user_id")
            .unsigned()
            .notNullable();

          table
            .foreign("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");

          table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        })
        .createTable("ratings", (table) => {
          table.increments("id");
          table.integer("business_id");
          table.integer("user_id");
          table
            .integer("point")
            .unsigned()
            .notNullable();
          table.string("comment");

          table.unique(["business_id", "user_id"]);

          table
            .foreign("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");

          table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        })
        .createTable("messages", (table) => {
          table.increments("id");
          table.integer("user_id");
          table.integer("business_id");
          table.text("message");
          table.timestamp("created_at");

          table
            .foreign("user_id")
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

          table
            .foreign("business_id")
            .references("id")
            .inTable("businesses")
            .onDelete("CASCADE");
        });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("messages")
    .dropTable("ratings")
    .dropTable("availability")
    .dropTable("reservations")
    .dropTable("businesses")
    .dropTable("users");
};
