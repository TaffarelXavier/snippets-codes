"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Products = use("App/Models/Products");

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    return [1, 2, 3];
  }

  /**
   * Render a form to be used for creating a new produto.
   * GET produtos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * @swagger
   * /products/company/{company_id}:
   *   get:
   *       tags:
   *       - "Products"
   *       summary: "Busca produtos de uma empresa pelo id, exclusivamente, dela."
   *       description: "Busca produtos de uma empresa pelo id, exclusivamente, dela."
   *       operationId: "getPetById"
   *       produces:
   *       - "application/xml"
   *       - "application/json"
   *       parameters:
   *       - name: "company_id"
   *         in: "path"
   *         description: "ID da empresa"
   *         required: true
   *         type: "integer"
   *         format: "int64"
   *       responses:
   *         200:
   *           description: "successful operation"
   *           schema:
   *             $ref: "#/definitions/Pet"
   *         400:
   *           description: "Invalid ID supplied"
   *         404:
   *           description: "Pet not found"
   */

  async getProdutosByEmpresaId({ params, response }) {
    try {
      const { id } = params;

      const produtos = await Products.query()
        .where({ company_id: id })
        .fetch();

      if (produtos.rows.length > 0) {
        return produtos;
      }
      return response.send({ erro: true, msg: "REGISTRO_NAO_ENCONTRADO" });
    } catch (error) {
      return error;
    }
  }
}

module.exports = ProdutoController;
