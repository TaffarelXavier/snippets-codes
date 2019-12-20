"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StockSchema extends Schema {
  up() {
    this.create("stocks", table => {
      table.increments("stock_id");
      table.decimal("stock_price", 9, 2).notNullable();
      table.float("stock_amount", 9, 2).notNullable(); //quantidade
      table.string("stock_measure_type").notNullable(); //"Tipo de medida" ex: unidade, kg
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
    this.drop("stocks");
  }
}

module.exports = StockSchema;
