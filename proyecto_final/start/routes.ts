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

Route.group(() => {

  Route.post("/login", "UsersController.loginUser")
  Route.post("/user/create", "UsersController.registerUser")

  Route.group(() => {
    Route.get("/getUsers", "UsersController.getUsers")
    Route.put("/update/:id", "UsersController.updateUser")
    Route.get("/getUser/:id", "UsersController.getUser")
  }).prefix("/user").middleware("admin")

  Route.group(() => {
    Route.post("/create", "QuestionsController.createQuestion").middleware("admin")
    Route.get("/getQuestions", "QuestionsController.getQuestions").middleware("auth")
    Route.delete("/deleteQuestion/:id", "QuestionsController.deleteQuestion").middleware("admin")
    Route.put("/updateQuestion/:id", "QuestionsController.updateQuestion").middleware("admin")
    Route.put("/updateAnswer/:id", "QuestionsController.updateAnswer").middleware("admin")
    Route.get("/getOptions/:id", "QuestionsController.getOptions").middleware("auth")
  }).prefix("/questions")

  Route.group(() => {
    Route.post("/create", "RolesController.createRole")
    Route.get("/get", "RolesController.getRoles")
  }).prefix("/role").middleware("admin")

  Route.group(() => {
    Route.post("/create", "TypeDocumentsController.createTypeDocument")
    Route.get("/get", "TypeDocumentsController.getTypeDocuments")
  }).prefix("/type").middleware("admin")

  Route.group(() => {
    Route.get("/getquestions", "FormsController.getQuestions")
    Route.post("/postquestions", "FormsController.postQuestions")
  }).prefix("/form").middleware("auth")

}).prefix("api/v1")

