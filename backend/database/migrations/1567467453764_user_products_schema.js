'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserProductsSchema extends Schema {
  up () {
    this.create('user_products', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_products')
  }
}

module.exports = UserProductsSchema
