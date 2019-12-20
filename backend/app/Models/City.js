"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** 
*  @swagger
*  definitions:
*    City:
*      type: object
*      properties:
*        city_id:
*          type: uint
*/
class City extends Model {
  static get primaryKey() {
    return "city_id";
  }
}

module.exports = City;