

exports.up = function (knex) {
    console.log("hello7");
    return knex.schema
        .dropTable("availability")
        .dropTable("reservations")
        .dropTable("businesses")
        .dropTable("users")
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
                    table.integer("user_id").unsigned().notNullable();
                    table.string("name");
                    table.string("address_street");
                    table.string("address_city");
                    table.string("address_zip");
                    table.string("phone");
                    table.string("business_type");
                    table.integer("capacity");
                    table.integer("price");

                    table.foreign("user_id")
                        .references("id")
                        .inTable("users")
                        .onDelete("CASCADE");
                })
                .createTable("availability", (table) => {
                    table.increments("id");
                    table.integer("business_id").unsigned().notNullable();
                    table.string("day");
                    table.integer("start_hour");
                    table.integer("end_hour");

                    table.foreign("business_id")
                        .references("id")
                        .inTable("businesses")
                        .onDelete("CASCADE");
                })
                .createTable("reservations", (table) => {
                    table.increments("id");
                    table.date("date");
                    table.integer("price");
                    table.date("created_at");
                    table.integer("business_id").unsigned().notNullable();
                    table.integer("user_id").unsigned().notNullable();

                    table.foreign("business_id")
                        .references("id")
                        .inTable("businesses")
                        .onDelete("CASCADE");

                    table
                        .foreign("user_id")
                        .references("id")
                        .inTable("users")
                        .onDelete("CASCADE");
                });
        });
};

exports.down = function (knex) {

};

