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

  Route.group(() => {
    Route.get("/getUsers", "UsersController.getUsers")
    Route.post("/create", "UsersController.registerUser")
    Route.put("/update/:id", "UsersController.updateUser")
    Route.get("/getUser/:id", "UsersController.getUser")
  }).prefix("/user")

  Route.group(() => {
    Route.post("/create", "QuestionsController.createQuestion")
    Route.get("/getQuestions", "QuestionsController.getQuestions")
    Route.delete("/deleteQuestion/:id", "QuestionsController.deleteQuestion")
    Route.put("/updateQuestion/:id", "QuestionsController.updateQuestion")
    Route.put("/updateAnswer/:id", "QuestionsController.updateAnswer")
    Route.get("/getOptions/:id", "QuestionsController.getOptions")
  }).prefix("/questions")

  Route.group(() => {
    Route.post("/create", "RolesController.createRole")
    Route.get("/get", "RolesController.getRoles")
  }).prefix("/role")

  Route.group(() => {
    Route.post("/create", "TypeDocumentsController.createTypeDocument")
    Route.get("/get", "TypeDocumentsController.getTypeDocuments")
  }).prefix("/type")

  Route.group(() => {
    Route.get("/getquestions", "FormsController.getQuestions")
    Route.post("/postquestions", "FormsController.postQuestions")
  }).prefix("/form")

}).prefix("api/v1")

