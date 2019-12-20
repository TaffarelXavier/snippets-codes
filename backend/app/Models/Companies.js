"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
/** 
*  @swagger
*  definitions:
*    Company:
*      type: object
*      properties:
*        company_id:
*          type: uint
*/
class Companies extends Model {
  
  static get primaryKey () {
    return 'company_id'
  }
  
  categories() {
    return this.hasMany('App/Models/Products')
    .innerJoin('categories', 'products.category_id', 'categories.category_id');
  }
  

}

module.exports = Companies;
