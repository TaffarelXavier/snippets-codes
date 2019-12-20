'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/** 
*  @swagger
*  definitions:
*    Product:
*      type: object
*      properties:
*        product_id:
*          type: int
*/
class Products extends Model {
    static get primaryKey () {
        return 'product_id'
      }
}

module.exports = Products