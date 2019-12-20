"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments("user_id");
      table.string("user_name", 80).notNullable();
      table.string("user_email", 254).notNullable().unique();
      table.string("user_password", 60).notNullable();
      table.string("user_cellphone", 60);
      table.string("user_street", 254).notNullable();
      table.string("user_number", 60);
      table.string("user_district", 60).notNullable();
      table
        .integer("city_id")
        .notNullable()
        .unsigned()
        .index("city_id");
      table
        .foreign("city_id")
        .references("cities.city_id")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
