"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");

class CategoriesController {

  /**
   * @swagger
   * /categories/company/{idEmpresa}:
   *   get:
   *     tags:
   *       - Category
   *     summary: Busca as categorias de uma empresa
   *     description: Busca as categorias de uma empresa com a quantidade de produtos dessa `categoria`.
   *     operationId: "idEmpresa"
   *     parameters:
   *      - in: path
   *        name: "idEmpresa"
   *        schema:
   *          type: integer
   *        required: true
   *        description: Pode ser o id (company_id) ou url relacionada à empresa (company_url)
   *     responses:
   *       200:
   *         description: Retorna os nomes das categorias, `seguido` pela quantidade de produtos em cada categoria.
   *         example:
   *           0: {"category_name": "FRUTAS","category_id": 1,"amount_products": 15}
   *           1: {"category_name": "LEGUMES","category_id": 2,"amount_products": 20}
   *           2: {"category_name": "VERDURAS","category_id": 3,"amount_products": 35}
   */
  async getCategoriesByCompanyId({ params, response }) {
    try {
      const { id } = params; //O Id da empresa

      const categories = await Database.select(
        "categories.category_name",
        "categories.category_id",
        Database.raw(
          "SUM(IF(categories.category_id IS NULL, 0, 1)) AS amount_products"
        )
      )
        .from("categories")
        .leftJoin("products", "categories.category_id", "products.category_id")
        .leftJoin("companies", "products.company_id", "companies.company_id")
        .whereRaw("companies.company_id = ?", [id])
        .orWhere("companies.company_url", "=", id)
        .groupBy("categories.category_id");
      return categories;
    } catch (error) {
      return response.json(error);
    }
  }

}

module.exports = CategoriesController;
