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

Route.get("/", async () => {
  const notas = await Database.table("notes").select("*");
  return { greeting: notas };
});

Route.resource('notes', 'NoteController');

Route.resource('languages', 'LanguageController');
//Busca as categorias
Route.get("categories", "CategoryController.getCategoriesComTotalDeNotas");

Route.get("get-all-categories", "CategoryController.getAll");

Route.get("buscar-todas-categorias", "CategoryController.index");

//Mostra notas por categoria id
Route.get("notes-por-category-id/:category_id", "NoteController.getCategoriesWithTotal");