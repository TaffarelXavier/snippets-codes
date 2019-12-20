"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserProductSchema extends Schema {
  up() {
    this.create("user_products", table => {
      table.increments("user_prod_id");
      table.float("user_prod_total_amount", 9, 2).notNullable(); //quantidade total
      table.decimal("user_prod_total_value", 9, 2).notNullable(); //valor total
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .index("user_id");
      table
        .foreign("user_id")
        .references("users.user_id")
        .onDelete("cascade");
      table
        .integer("product_id")
        .notNullable()
        .unsigned()
        .index("product_id");
      table
        .foreign("product_id")
        .references("products.product_id")
        .onDelete("cascade");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_products");
  }
}

module.exports = UserProductSchema;
