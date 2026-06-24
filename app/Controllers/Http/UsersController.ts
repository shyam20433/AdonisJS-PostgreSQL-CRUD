import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserService from 'App/Services/UserService'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UserValidator from 'App/Validators/UserValidator'

import UserTaskService from 'App/Services/UserTaskService'
import IdValidator from 'App/Validators/IdValidator'
import UserNotFoundException from 'App/Exceptions/UserNotFoundException'

//import UserNotFoundException from 'App/Exceptions/UserNotFoundException'

export default class UsersController {
    /* public async get({ }: HttpContextContract) {
          const data = await User.all()
          return data
          return await User.query().paginate(1,5)
      } */
    public async get({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 5)

        console.log('PAGE=', page)
        console.log('LIMIT=', limit)

        const users = await User.query().orderBy('id', 'desc').paginate(page, limit)

        return users
    }

    /*
     const data = request.only([
        'name',
        'email'
      ])
      
      const bulk=request.body()
      if (Array.isArray(bulk)){
          const users = bulk.map((user) => ({
              name: user.name,
              email: user.email
          
      }))
      return await User.createMany(users)
      }
      else{}
      
      //getting json content before validations
      
      const data= request.only([
              'name','email'
          ])
          const user=await User.create(data)
          return user
     
  
      const data =  await request.validate(UserValidator)
      const user=await User.create(data)
      return user
      }
      */
    //before services
    /*
      public async insertUser({ request }: HttpContextContract) {
          const data = await request.validate(UserValidator)
  
          const exists = await User.findBy('email', data.email)
  
          if (exists) {
              return {
                  message: 'Already Exists',
              }
          }
  
          const user = await User.create(data)
  
          return user
      }
      */

    public async insertUser({ request }: HttpContextContract) {
        const data = await request.validate(UserValidator)
        return await UserService.createUser(data)
    }

    public async getUser({ request, params }: HttpContextContract) {
        const payload = await request.validate({
            schema: new IdValidator({} as HttpContextContract).schema,
            data: params,
        })

        const user = await User.find(payload.id)

        if (!user) {
            throw new UserNotFoundException()
        }
        return user
    }

    /*
        public async deleteUser({ params }: HttpContextContract) {
    
            const user = await User.find(params.id)
    
            if (!user) {
                throw new UserNotFoundException()
            }
    
            await user.delete()
    
            return {
                message: 'User Deleted Successfully'
            }
        }
    
     */


    public async deleteUser({ request, params }: HttpContextContract) {
        const payload = await request.validate({
            schema: new IdValidator({} as HttpContextContract).schema,
            data: params,
        })

        const user = await User.find(payload.id)

        if (!user) {
            throw new UserNotFoundException()
        }

        await user.delete()

        return {
            message: 'User Deleted Successfully'
        }
    }

    public async updateUser({ params, request }: HttpContextContract) {
        const user = await User.find(params.id)
        if (!user) {
            throw new UserNotFoundException()
        }
        const data = await request.validate(UpdateUserValidator)
        user.merge(data)
        await user.save()
        return user
    }

    public async preloadTasksbyUser() {
        const data = await User.query().preload('tasks')
        return data
    }

    public async joinsTasksbyUser() {
        const data = await Database.from('users')
            .join('tasks', 'users.id', 'tasks.user_id')
            .select('users.id', 'users.name', 'users.email', 'tasks.title', 'tasks.status')

        return data
    }


    public async createUserTask({ request }: HttpContextContract) {

        const data = request.all()

        console.log('REQUEST DATA = ', data)

        return await UserTaskService.createUserAndTask(data)
    }
}
