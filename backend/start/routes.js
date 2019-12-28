"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Database = use("Database");
const Route = use("Route");

//Mostra uma imagem
Route.get("images/:path", "ImageController.show");

Route.post("images/store", "ImageController.store");

//Mostra notas por categoria id
Route.get(
  "notes-por-category-id/:category_id/:pagina",
  "NoteController.getCategoriesComTotal"
);

//Resource das notas:
Route.resource("notes", "NoteController");

//Retorna todas as notas
Route.get("/", "NoteController.index");

//Retorna todas as linguagens
Route.resource("languages", "LanguageController");

//Upload
Route.resource("category", "CategoryController");

//Busca as categorias
Route.get("categories", "CategoryController.getCategoriesComTotalDeNotas");

//Busca todas as categorias
Route.get("get-all-categories", "CategoryController.getAll");

Route.get("buscar-todas-categorias", "CategoryController.index");