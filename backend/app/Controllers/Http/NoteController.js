"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Note = use("App/Models/Note");
/**
 * Resourceful controller for interacting with notes
 */
class NoteController {
  /**
   * Show a list of all notes.
   * GET notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const notes = await Note.query()
      .select(
        "note_id",
        "category_id",
        "note_type_language",
        "note_title",
        "note_description",
        "note_code",
        "lang_name",
        "lang_extension"
      )
      .innerJoin("languages", "languages.lang_id", "notes.note_type_language")
      .limit(10)
      .fetch();
    return notes;
  }

  /*
   */
  async getCategoriesWithTotal({ params }) {
    const { category_id } = params;

    const categories = await Note.query()
      .select(
        "note_id",
        "category_id",
        "note_type_language",
        "note_title",
        "note_description",
        "note_code",
        "lang_name",
        "lang_extension"
      )
      .where("category_id", parseInt(category_id))
      .innerJoin("languages", "notes.note_type_language", "languages.lang_id")
      .orderBy("notes.created_at", "DESC")
      .fetch();
    return categories;
  }

  /**
   * Create/save a new note.
   * POST notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const body = request.post();

    const { title, description, category, code } = body;

    const note = new Note();
    note.note_title = title;
    note.note_description = description;
    note.note_code = code;
    note.category_id = parseInt(category);
    note.note_type_language = parseInt(body["formatacao-language"]);
    note.created_at = Date.now();

    note.save();
  }

  /**
   * Render a form to update an existing note.
   * GET notes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update note details.
   * PUT or PATCH notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a note with id.
   * DELETE notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = NoteController;
