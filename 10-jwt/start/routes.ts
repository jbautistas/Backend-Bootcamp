/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware("auth")

Route.group(() =>{
  Route.post("/register", "UsuariosController.registrar");
  Route.post("/login", "UsuariosController.login");  
}).prefix("api")

Route.group(() => {
  Route.post("/register", "PerfilsController.registrar");
  Route.get("/listar", "PerfilsController.getListarPerfiles");
}).prefix("/api/perfil")
Route.group(() => {
  Route.post("/register", "LibrosController.registrar");
  Route.get("/listar", "LibrosController.getListarLibros");
}).prefix("/api/libro").middleware("auth")