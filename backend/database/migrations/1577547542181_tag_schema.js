"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TagSchema extends Schema {
  up() {
    this.create("tags", table => {
      table.increments("tag_id");
      table
        .string("tag_name", 100)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("tags");
  }
}

module.exports = TagSchema;
