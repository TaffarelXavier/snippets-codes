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

//Upload
Route.post("criar-categoria", "CategoryController.store");

//Mostra uma imagem
Route.get("images/:path", "ImageController.show");

//Resource das notas todas as linguagens
Route.resource("notes", "NoteController");

//Retorna todas as linguagens
Route.resource("languages", "LanguageController");

//Retorna todas as notas
Route.get("/", "NoteController.index");

//Busca as categorias
Route.get("categories", "CategoryController.getCategoriesComTotalDeNotas");

//Busca todas as categorias
Route.get("get-all-categories", "CategoryController.getAll");

Route.get("buscar-todas-categorias", "CategoryController.index");

//Mostra notas por categoria id
Route.get(
  "notes-por-category-id/:category_id",
  "NoteController.getCategoriesWithTotal"
);
