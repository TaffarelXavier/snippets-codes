'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments("company_id")
      table.string("company_fantasy_name").notNullable()
      table.string("company_cnpj").notNullable().unique()
      table.string("company_phone", 60);
      table.string("company_street", 254).notNullable();
      table.string("company_number", 60);
      table.string("company_district", 60).notNullable();
      table.string("company_logo", 254);
      table.string("company_description", 254);
      table.string("company_url", 254);
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .index("user_id");
      table
        .foreign("user_id")
        .references("users.user_id")
        .onDelete("cascade");
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
