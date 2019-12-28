"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LanguageSchema extends Schema {
  up() {
    this.create("languages", table => {
      table.increments("lang_id");
      table
        .string("lang_name", 150)
        .notNullable()
        .unique();
      table
        .string("lang_extension", 50)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("languages");
  }
}

module.exports = LanguageSchema;
