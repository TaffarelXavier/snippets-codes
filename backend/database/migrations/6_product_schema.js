"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments("product_id");
      table.string("product_name", 254).notNullable();
      table.string("product_description", 254);
      table.string("product_image", 254);
      table
        .integer("company_id")
        .notNullable()
        .unsigned()
        .index("company_id");
      table
        .foreign("company_id")
        .references("companies.company_id")
        .onDelete("cascade");
      table
        .integer("category_id")
        .notNullable()
        .unsigned()
        .index("category_id");
      table
        .foreign("category_id")
        .references("categories.category_id")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("products");
  }
}

module.exports = ProductSchema;
