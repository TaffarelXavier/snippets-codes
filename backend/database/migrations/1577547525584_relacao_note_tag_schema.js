"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RelacaoNoteTagSchema extends Schema {
  up() {
    this.create("relacao_note_tags", table => {
      table.increments("relacao_nt_id");
      table
        .integer("note_fk_id")
        .unsigned()
        .references("note_id")
        .inTable("notes");
      table
        .integer("tag_fk_id")
        .unsigned()
        .references("tag_id")
        .inTable("tags");
      table.timestamps();
    });
  }

  down() {
    this.drop("relacao_note_tags");
  }
}

module.exports = RelacaoNoteTagSchema;
