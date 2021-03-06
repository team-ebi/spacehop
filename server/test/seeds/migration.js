const knex = require("./config.js");
const users = require("./data/users")
const businesses = require("./data/businesses")
const availability = require("./data/availability")
const ratings = require("./data/ratings")
const reservations = require("./data/reservations")

const migration = () => {

    console.log("33333333333333333333333333333");
    knex.schema
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
                    table.integer("user_id").unsigned().notNullable();
                    table.string("name");
                    table.string("address_street");
                    table.string("address_city");
                    table.string("address_zip");
                    table.string("phone");
                    table.string("business_type");
                    table.integer("capacity");
                    table.integer("price");
                    table.string("stripe_price_id");

                    table
                        .foreign("user_id")
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

                    table
                        .foreign("business_id")
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
                    table.integer("point").unsigned().notNullable();
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
                });
        })
        // .then(() => {
        //     return knex.select("*").table("users").insert(users)
        // })
        // .then(() => {
        //     return knex.select("*").table("businesses").insert(businesses)
        // })
        // .then(() => {
        //     return knex.select("*").table("availability").insert(availability)
        // })
        // .then(() => {
        //     return knex.select("*").table("ratings").insert(ratings)
        // })
        // .then(() => {
        //     return knex.select("*").table("reservations").insert(reservations)
        // })
        .then(() => process.exit());
}

migration();

module.exports = { migration };