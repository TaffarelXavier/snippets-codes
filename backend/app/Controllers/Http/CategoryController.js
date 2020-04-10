"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use("App/Models/Category");
const Database = use("Database");
const Helpers = use("Helpers");
const sharp = require("sharp");

/* Test Live Code in VScode */

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
    const categories = await Category.all();
    return categories;
  }
  /**
   *
   */
  async getAll({ request }) {
    try {
      const { category_name } = request.get();

      if (Boolean(category_name)) {
        const categories = await Category.query()
          .with("notes")
          .whereRaw("category_name = ?", category_name.toUpperCase())
          .limit(1)
          .fetch();
        return categories;
      }
      const categories = await Category.all();
      return categories;
    } catch (error) {
      return "" + error;
    }
  }

  /*
   */
  async getCategoriesComTotalDeNotas({ request, response, view }) {
    try {
      const categories = await Category.query()
        .select(
          "categories.category_id",
          "categories.category_name",
          "categories.category_icon",
          "categories.category_order",
          "categories.category_placeholder_icon",
          Database.raw("COUNT(*) AS total")
        )
        .innerJoin("notes", "categories.category_id", "notes.category_id")
        .groupBy("notes.category_id")
        .fetch();
     if(Object.keys(categories).length >= 3){
      return categories;
     }
    } catch (error) {}
  }

  async convertToJpeg() {
    sharp(Helpers.tmpPath("uploads") + "/engenharia_software.jpg")
      .resize(1)
      .jpeg()
      .toFile(
        Helpers.tmpPath("uploads") + "/___aoutput.jpeg",
        async (err, info) => {
          if (err) return err;
          return await info;
        }
      );
  }

  /**
   * Create/save a new category.
   * POST categories
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      //Pega os campos vindo da requisição:
      const {
        category__name,
        category__order,
        category__fk__id
      } = request.post();

      if (
        category__name == null ||
        category__name == undefined ||
        category__name.trim() == ""
      ) {
        return { erro: true, message: "O nome da categoria está em branco" };
      }
      //O nome padrão para imagem, caso nenhuma imagem seja enviada na requisição:
      let nomeDoArquivo,
        placeHolder_Icon = (nomeDoArquivo = "default_icon.jpeg");

      const profilePic = request.file("image_name", {
        types: ["image"],
        size: "5mb"
      });

      if (profilePic != null) {
        //Caso a variável image_name exista, mas não seja uma imagem válida.
        const { clientName, subtype } = profilePic;

        //Pega o timestamp da data atual
        let timestamp = new Date().getTime();

        nomeDoArquivo = `${timestamp}_${
          clientName.toLowerCase().split(".")[0]
        }.${subtype}`;

        await profilePic.move(Helpers.tmpPath("uploads"), {
          name: nomeDoArquivo,
          overwrite: true
        });

        if (!profilePic.moved()) {
          return profilePic.error();
        }

        placeHolder_Icon = `${timestamp}__${
          clientName.toLowerCase().split(".")[0]
        }.${subtype}`;

        //Converte para png
        if (subtype == "svg") {
          placeHolder_Icon = `${timestamp}__${
            clientName.toLowerCase().split(".")[0]
          }.png`;
        }

        sharp(Helpers.tmpPath(`uploads/${nomeDoArquivo}`))
          .resize(1) /*DIMINUI PARA 1KB*/
          .toFile(Helpers.tmpPath(`uploads/${placeHolder_Icon}`), function(
            err
          ) {
            return err;
          });
      }

      const category = await Category.create({
        category_name: category__name.toUpperCase(),
        category_order: parseInt(category__order) || 0,
        category_fk_id: parseInt(category__fk__id) || 0,
        category_icon: nomeDoArquivo,
        category_placeholder_icon: placeHolder_Icon
      });

      response.send(category);
    } catch (error) {
      return "" + error;
    }
  }
}

module.exports = CategoryController;
