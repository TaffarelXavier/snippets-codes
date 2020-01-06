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
const Config = use("Config");
const fs = use("fs");
const Helpers = use("Helpers");
const readFile = Helpers.promisify(fs.readFile);
const View = use("View");

View.global("currentTime", function() {
  return new Date().getTime();
});

//Faz o login
Route.post("/login", "UserController.login").middleware("guest");

//Cadastrar um novo usuário:
Route.post('/register', 'UserController.register')

//Buscar um usuário pelo ID dele
Route.get("users/:id", "UserController.show").middleware("auth");

//Faz o logout
Route.get("/logout", "UserController.logout");


Route.get("/test", async ({ response }) => {
  return response.status(200).send("Login First");
});

Route.get("/a", ({ session, response }) => {
  session.put("user_id", 1002);
  session.put("username", "virk");
  response.redirect("/hello-world");
});

Route.get("hello-world", ({ session, view }) => {
  return view.render("hello-world", {
    nome: session.get("username"),
    user_id: session.get("user_id")
  });
});

//Grupo de Imagens:

Route.group(() => {
  Route.get("/:path", "ImageController.show");
  Route.post("/store", "ImageController.store");
}).prefix("images"); //Prefixo

//Mostra notas por categoria id
Route.get(
  "notes-por-category-id/:category_id/:pagina",
  "NoteController.getCategoriesComTotal"
);

//Resource das notas:
Route.resource("notes", "NoteController");

//Retorna todas as notas
Route.get("/", "NoteController.index");

Route.get("/search", "NoteController.index");

//Retorna todas as linguagens
Route.resource("languages", "LanguageController");

//Criação de Categorias:
Route.resource("category", "CategoryController");

//Busca as categorias
Route.get("categories", "CategoryController.getCategoriesComTotalDeNotas");

//Busca todas as categorias
Route.get("get-all-categories", "CategoryController.getAll");

Route.get("buscar-todas-categorias", "CategoryController.index");
