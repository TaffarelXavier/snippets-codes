"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  static get primaryKey() {
    return "category_id";
  }

  notes() {
    return this.hasMany("App/Models/Note").innerJoin(
      "languages",
      "languages.lang_id",
      "notes.note_type_language"
    );
  }
}

module.exports = Category;
