"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UfSchema extends Schema {
  up() {
    this.create("ufs", table => {
      table.increments("uf_id");
      table.string("uf_name", 254).notNullable();
      table.timestamp('created_at', { precision: 6 });
      table.timestamp('updated_at', { precision: 6 });
    });
  }

  down() {
    this.drop("ufs");
  }
}

module.exports = UfSchema;
