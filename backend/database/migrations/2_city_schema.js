"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CitySchema extends Schema {
  up() {
    this.create("cities", table => {
      table.increments("city_id");
      table.string("city_name", 254).notNullable();
      table
        .integer("uf_id")
        .notNullable()
        .unsigned()
        .index("uf_id");
      table
        .foreign("uf_id")
        .references("ufs.uf_id")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("cities");
  }
}

module.exports = CitySchema;
