"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use("App/Models/Category");
const Database = use("Database");
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const categories = await Category.query()
      .select("category_id", "category_name")
      .fetch();
    return categories;
  }
  /**
   *
   */
  async getAll({ request, response, view }) {
    const categories = await Category.all();
    return categories;
  }

  /*
   */
  async getCategoriesComTotalDeNotas({ request, response, view }) {
    const categories = await Category.query()
      .select(
        "categories.category_id",
        "categories.category_name",
        "categories.category_icon",
        "categories.category_order",
        Database.raw("COUNT(*) AS total")
      )
      .innerJoin("notes", "categories.category_id", "notes.category_id ")
      .groupBy("notes.category_id")
      .fetch();
    return categories;
  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {

    const {
      category__name,
      category__order,
      category__fk__id
    } = request.post();

    const category = new Category();

    category.category_name = category__name.toUpperCase();
    category.category_order = parseInt(category__order);
    category.category_fk_id = parseInt(category__fk__id);

    await category.save();

    response.send(category);
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CategoryController;
