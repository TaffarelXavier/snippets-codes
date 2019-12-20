"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Companies = use("App/Models/Companies");

class EmpresaController {
  /**
   * @swagger
   * /companies:
   *   get:
   *     tags:
   *       - Company
   *     summary: Retorna todas as empresas.
   *     responses:
   *       200:
   *         description: Retorna um objeto com todas as empresas
   *         example:
   *           message: An Array
   */
  async index({ request, response, view }) {
    const empresa = Companies.all();
    return empresa;
  }

  /**
   * 
   * /companies:
   *   post:
   *     tags:
   *       - Company
   *     summary: Cria uma nova empresa.
   *     description: Cria uma nova empresa.
   *     parameters:
   *     - in: query
   *       name: offset
   *       schema:
   *         type: integer
   *       description: The number of items to skip before starting to collect the result set
   *     - in: query
   *       name: limit
   *       schema:
   *         type: integer
   *       description: The numbers of items to return
   *     responses:
   *       200:
   *         description: Return all list of companies
   *         example:
   *           message: An Array
   */

  async store({ request, response }) {
    try {
      const data = request.only([
        "nome_fantasia",
        "url",
        "codigo_uf",
        "codigo_cidade",
        "nome_rua",
        "bairro",
        "numero"
      ]);

      const empresa = await Companies.create(data);

      return empresa;
    } catch (error) {
      return response.send({ error: error });
    }
  }
  /**
   * @swagger
   * /companies/{company_id}:
   *   get:
   *     tags:
   *       - Company
   *     summary: Retorna uma única empresa (company_id ou company_url)
   *     description: Retorna uma única empresa pelo company_id ou company_url
   *     operationId: "idEmpresa"
   *     parameters:
   *      - in: path
   *        name: "company_id"
   *        schema:
   *          type: integer
   *     required: true
   *     responses:
   *       200:
   *         description: Retorna uma empresa específica pelo seu Id ou url.
   *         example:
   *           0: [
  {
    "company_id": 1,
    "company_fantasy_name": "JOCTI",
    "company_cnpj": "MIADK",
    "company_phone": "HONDE",
    "company_street": "JENET",
    "company_number": "HUKIW",
    "company_district": "ZADRO",
    "company_logo": "//www.gravatar.com/avatar/70c1d9d0e1f23c7d655ad1c1c72959cd.jpg",
    "company_description": "Acser midwu pulele makci idfutvi gawhu hocwove uz pizsajij neddintoc wu bodsa hozah daj.",
    "company_url": "julfu",
    "user_id": 1,
    "created_at": "2019-09-02 22:03:42",
    "updated_at": "2019-09-02 22:03:42"
  }
]
   */
  async show({ params, request, response, view }) {
    try {
      if (params.id) {
        const empresa = await Companies.query()
          .where("company_url", params.id)
          .orWhere("company_id", params.id)
          .fetch();
        if (empresa.rows.length > 0) {
          return empresa;
        } else {
          return response.send({ erro: true, msg: "REGISTRO_NAO_ENCONTRADO" });
        }
      }
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  /**
   * Update empresa details.
   * PUT or PATCH empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    try {
      if (params.id) {
        //Primeiro pesquisa:
        const empresa = await Companies.find(params.id);

        if (empresa !== null) {
          const data = request.only([
            "nome_fantasia",
            "url",
            "codigo_uf",
            "codigo_cidade",
            "nome_rua",
            "bairro",
            "numero"
          ]);

          empresa.merge(data);

          await empresa.save();

          return empresa;
        } else {
          return response.send({ erro: true, msg: "REGISTRO_NAO_ENCONTRADO" });
        }
      } else {
        return response.send({ erro: true, msg: "ID_NAO_ESPECIFICADO" });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * Delete a empresa with id.
   * DELETE empresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      if (params.id) {
        const empresa = await Companies.find(params.id);
        if (empresa !== null) {
          await empresa.delete();

          return empresa;
        } else {
          return response.send({ erro: true, msg: "REGISTRO_NAO_ENCONTRADO" });
        }
      }
    } catch (error) {
      return response.send(error);
    }
  }
}

module.exports = EmpresaController;
