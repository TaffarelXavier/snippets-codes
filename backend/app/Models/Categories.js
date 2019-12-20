'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
/** 
*  @swagger
*  definitions:
*    Categories:
*      type: object
*      properties:
*        id:
*          type: uint
*        username:
*          type: string
*        email:
*          type: string
*        password:
*          type: string
*      required:
*        - username
*        - email
*        - password
*/
class Categories extends Model {
  products() {
    return this.hasMany('App/Models/Products');
  }
  static get primaryKey () {
    return 'category_id'
  }
}

module.exports = Categories;
