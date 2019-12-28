"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Note extends Model {
  languages() {
    return this.hasOne("App/Models/Language");
  }
}

module.exports = Note;
