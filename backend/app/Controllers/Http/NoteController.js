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
  async index({ request, params, response, view }) {
    const { pagina } = request.get();

    const notes = await Note.query()
      .select(
        "note_id",
        "note_type_language",
        "note_title",
        "note_description",
        "note_code",
        "lang_name",
        "lang_extension",
        "categories.category_id",
        "categories.category_name",
        "categories.category_icon",
        "categories.category_order",
        "categories.category_placeholder_icon"
      )
      .innerJoin("languages", "languages.lang_id", "notes.note_type_language")
      .innerJoin("categories", "notes.category_id", "categories.category_id")
      .forPage(pagina, 5)
      .fetch();

    return notes;
  }

  async edit({ request, params, response, view }) {
    //const { pagina } = request.get();

    const { id } = params;

    if (id) {
      return await Note.find(parseInt(id));
    }

    return { erro: "error" };
  }

  /**
   * Update userproduct details.
   * PUT or PATCH userproducts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      const { titulo, codigo, description, note_id } = request.post();
      const note = await Note.find(parseInt(note_id));
      note.note_title = titulo;
      note.note_code = codigo;
      note.note_description = description;
      await note.save();
      return note;
    } catch (error) {}
  }

  /*
   */
  async getCategoriesComTotal({ params }) {
    const { category_id, pagina } = params;

    const categories = await Note.query()
      .select(
        "note_id",
        "notes.category_id",
        "note_type_language",
        "note_title",
        "note_description",
        "note_code",
        "lang_name",
        "lang_extension",
        "categories.category_id",
        "categories.category_name",
        "categories.category_icon",
        "categories.category_order",
        "categories.category_placeholder_icon"
      )
      .where("notes.category_id", parseInt(category_id))
      .orWhere("categories.category_name", category_id)
      .innerJoin("languages", "notes.note_type_language", "languages.lang_id")
      .innerJoin("categories", "notes.category_id", "categories.category_id")
      .forPage(parseInt(pagina), 5)
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

  async show({ request, response, params }) {
    const { id } = params;
    const { page } = request.get();

    const notes = await Note.query()
      .select(
        "note_id",
        "note_type_language",
        "note_title",
        "note_description",
        "note_code",
        "lang_name",
        "lang_extension",
        "categories.category_id",
        "categories.category_name",
        "categories.category_icon",
        "categories.category_order",
        "categories.category_placeholder_icon"
      )
      .innerJoin("languages", "languages.lang_id", "notes.note_type_language")
      .innerJoin("categories", "notes.category_id", "categories.category_id")
      .where("notes.note_title", "LIKE", "%" + decodeURIComponent(id) + "%")
      .orWhere(
        "notes.note_description",
        "LIKE",
        "%" + decodeURIComponent(id) + "%"
      )
      .orWhere(
        "languages.lang_name",
        "LIKE",
        "%" + decodeURIComponent(id) + "%"
      )
      .forPage(page, 20)
      .fetch();

    return notes;
  }
  /**
   * Delete a userproduct with id.
   * DELETE userproducts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const { id } = params;

      const user = await Note.find(id);

      const del = await user.delete();
      return user;
    } catch (error) {}
  }
}

module.exports = NoteController;
