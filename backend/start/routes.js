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
const Helpers = use("Helpers");

Route.post("upload", async ({ request }) => {
  const profilePic = request.file("profile_pic", {
    types: ["image"],
    size: "2mb"
  });

  await profilePic.move(Helpers.tmpPath("uploads"), {
    name: "custom-name.jpg",
    overwrite: true
  });

  if (!profilePic.moved()) {
    return profilePic.error();
  }
  return "File moved";
});

Route.resource("notes", "NoteController");

Route.resource("languages", "LanguageController");

Route.get("/", "NoteController.index");

//Busca as categorias
Route.get("categories", "CategoryController.getCategoriesComTotalDeNotas");

Route.get("get-all-categories", "CategoryController.getAll");

Route.get("buscar-todas-categorias", "CategoryController.index");

//Mostra notas por categoria id
Route.get(
  "notes-por-category-id/:category_id",
  "NoteController.getCategoriesWithTotal"
);
