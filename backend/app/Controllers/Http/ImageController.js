"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use("Helpers");
const sharp = require("sharp");

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new image.
   * GET images/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    
    const profilePic = request.file("profile_pic", {
      types: ["image"],
      size: "2mb"
    });

    const { clientName, subtype } = profilePic;

    //Cria um novo de arquivo único:
    let timestamp = new Date().getTime();

    let nomeDoArquivo = `${timestamp}_${
      clientName.toLowerCase().split(".")[0]
    }.${subtype}`;

    await profilePic.move(Helpers.tmpPath("uploads"), {
      name: nomeDoArquivo,
      overwrite: true
    });

    if (!profilePic.moved()) {
      return profilePic.error();
    }

    this.resizeImage(
      nomeDoArquivo,
      `${timestamp}__${clientName.toLowerCase().split(".")[0]}.${subtype}`
    );

    return "File moved";
  }

  /**
   *
   */
  async resizeImage(fileName, newFileName) {
    sharp(Helpers.tmpPath(`uploads/${fileName}`))
      .resize(10)
      .toFile(Helpers.tmpPath(`uploads/${newFileName}`), function(err) {
        return err;
      });
    return "Sucesso";
  }
  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params,request, response }) {
    console.log(request.raw());
    return response.download(Helpers.tmpPath(`uploads/${params.path}`));
  }

  /**
   * Render a form to update an existing image.
   * GET images/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ImageController;
