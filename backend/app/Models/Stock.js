'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
/** 
*  @swagger
*  definitions:
*    Stock:
*      type: object
*      properties:
*        stock_id:
*          type: int
*/
class Stock extends Model {
}

module.exports = Stock
