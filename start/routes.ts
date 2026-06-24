import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login')


Route.post('/users', 'UsersController.insertUser')
Route.post('/user-task', 'UsersController.createUserTask')


Route.group(() => {
// Users
  Route.get('/users/joins', 'UsersController.joinsTasksbyUser')
  Route.get('/users/preload', 'UsersController.preloadTasksbyUser')
  Route.get('/users', 'UsersController.get')
  Route.get('/users/:id', 'UsersController.getUser')
// Tasks
  Route.get('/tasks', 'TasksController.get')
  Route.get('/tasks/:id', 'TasksController.getTask')
}).middleware('Admin')


// Protected Write Routes
Route.group(() => {
  // Users
  Route.put('/users/:id', 'UsersController.updateUser')
  Route.delete('/users/:id', 'UsersController.deleteUser')

  // Tasks
  Route.post('/tasks', 'TasksController.insertTask')
  Route.put('/tasks/:id', 'TasksController.updateTask')
  Route.patch('/tasks/:id', 'TasksController.patchTask')
  Route.delete('/tasks/:id', 'TasksController.deleteTask')
}).middleware(['JwtAuth', 'Admin'])


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


import Route from '@ioc:Adonis/Core/Route'
//import UsersController from 'App/Controllers/Http/UsersController'
//import TasksController from 'App/Controllers/Http/TasksController'
//import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/',async () => {
  return { hello: 'world' }
})


// 1. Route.post('/users', 'UsersController.insertUser').middleware('Admin')
//Route.get('/users/preload','UsersController.preloadTasksbyUser')
//Route.get('/users/joins','UsersController.joinsTasksbyUser')
//Route.get('/users', 'UsersController.get').middleware('JwtAuth')
// a .Route.get('/users/:id', 'UsersController.getUser').middleware('auth')
// 2 . Route.delete('/users/:id', 'UsersController.deleteUser').middleware('Admin')
// 3 . Route.put('users/:id','UsersController.updateUser').middleware('Admin')





// b .Route.get('/tasks','TasksController.get').middleware('auth')
// c .Route.get('/tasks/:id','TasksController.getTask').middleware('auth')
// 4 . Route.post('/tasks','TasksController.insertTask').middleware('Admin')
// 5 . Route.delete('/tasks/:id','TasksController.deleteTask').middleware('Admin')
// 6 . Route.put('/tasks/:id','TasksController.updateTask').middleware('Admin')
//Route.patch('/tasks/:id','TasksController.patchTask')


Route.post('/login', 'AuthController.login')
Route.post('/users', 'UsersController.insertUser')//.middleware('Admin')

Route.group(() => {

  Route.get('/users', 'UsersController.get')
  Route.get('/users/joins', 'UsersController.joinsTasksbyUser')
  Route.get('/users/preload', 'UsersController.preloadTasksbyUser')
  Route.get('/users/:id', 'UsersController.getUser')
  Route.get('/tasks', 'TasksController.get')
  Route.get('/tasks/:id', 'TasksController.getTask')

})//.middleware('JwtAuth')

Route.group(() => {

  
  Route.put('/users/:id', 'UsersController.updateUser')
  Route.post('/tasks', 'TasksController.insertTask')
  Route.put('/tasks/:id', 'TasksController.updateTask')
  Route.patch('/tasks/:id', 'TasksController.patchTask')
  Route.delete('/tasks/:id', 'TasksController.deleteTask')


})//.middleware(['JwtAuth', 'Admin'])

Route.delete('/users/:id', 'UsersController.deleteUser')//.middleware('Admin')
Route.post(
  '/user-task',
  'UsersController.createUserTask'
)

*/