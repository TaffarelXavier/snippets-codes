"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NoteSchema extends Schema {
  up() {
    this.create("notes", table => {
      table.increments("note_id");
      table.text("note_title").notNullable();
      table.text("note_description").notNullable();
      table.text("note_code").notNullable();
      table
        .integer("category_id")
        .unsigned()
        .references("category_id")
        .inTable("categories");
      table
        .integer("note_type_language")
        .unsigned()
        .references("lang_id")
        .inTable("languages");
      table.timestamps();
    });
  }

  down() {
    this.drop("notes");
  }
}

module.exports = NoteSchema;
