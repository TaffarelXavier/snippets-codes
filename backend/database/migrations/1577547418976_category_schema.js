"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CategorySchema extends Schema {
  up() {
    this.create("categories", table => {
      table.increments("category_id");
      table
      .bigInteger("category_fk_id") //Muitos para Muitos
      .unsigned()
      .references("category_id")
      .inTable("categories")
      table
        .integer("category_order")
      table
        .string("category_name")
        .notNullable()
      table.string("category_icon");
      table.string("category_placeholder_icon");
      table.timestamps();
    });
  }

  down() {
    this.drop("categories");
  }
}

module.exports = CategorySchema;
