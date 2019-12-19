"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Note = use("App/Models/Note");
const Database = use("Database");
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
    const notes = await Note.all();
    return notes;
  }

  /*
   */
  async getCategoriesWithTotal({ request, params, response, view }) {
    
    const {category_id} = params;

    console.log(category_id);

    const categories = await Note.query()
      .select("*")
      .where('category_id', parseInt(category_id))
      .innerJoin("languages", "notes.note_type_language", "languages.lang_id")
      .orderBy("notes.created_at","DESC")
      .fetch();
    return categories;
  }
  /**
   * Render a form to be used for creating a new note.
   * GET notes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new note.
   * POST notes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single note.
   * GET notes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

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
