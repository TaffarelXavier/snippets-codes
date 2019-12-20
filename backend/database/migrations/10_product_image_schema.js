"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProductImageSchema extends Schema {
  up() {
    this.create("product_images", table => {
      table.increments("prod_img_id");
      table.string("prod_img_path").notNullable();
      table.string("prod_img_file");
      table.string("prod_img_name");
      table.string("prod_img_type");
      table.string("prod_img_subtype");
      /*table
        .integer("product_id")
        .notNullable()
        .unsigned()
        .index("product_id");
      table
        .foreign("product_id")
        .references("products.product_id")
        .onDelete("cascade");*/
      table.timestamps();
    });
  }

  down() {
    this.drop("product_images");
  }
}

module.exports = ProductImageSchema;
