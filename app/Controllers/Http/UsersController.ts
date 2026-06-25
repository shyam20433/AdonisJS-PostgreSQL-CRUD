import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserService from 'App/Services/UserService'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UserValidator from 'App/Validators/UserValidator'

import UserTaskService from 'App/Services/UserTaskService'
import IdValidator from 'App/Validators/IdValidator'
import UserNotFoundException from 'App/Exceptions/UserNotFoundException'


import PaginationValidator from 'App/Validators/PaginationValidator'
//import UserNotFoundException from 'App/Exceptions/UserNotFoundException'

export default class UsersController {
    /* public async get({ }: HttpContextContract) {
          const data = await User.all()
          return data
          return await User.query().paginate(1,5)
      } */
    public async get({ request }: HttpContextContract) {

        try {

            const { page = 1, limit = 5 } =
                await request.validate(PaginationValidator)

            return await User
                .query()
                .orderBy('id', 'desc')
                .paginate(page, limit)

        } catch (error) {

            throw error

        }
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

        try {

            const data = await request.validate(UserValidator)

            return await UserService.createUser(data)

        } catch (error) {

            throw error

        }
    }

    public async getUser({ request }: HttpContextContract) {

        try {

            const payload = await request.validate(IdValidator)

            const user = await User.find(payload.id)

            if (!user) {
                throw new UserNotFoundException()
            }

            return user

        } catch (error) {

            throw error

        }
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


    public async deleteUser({ request }: HttpContextContract) {

        try {

            const payload = await request.validate(IdValidator)

            const user = await User.find(payload.id)

            if (!user) {
                throw new UserNotFoundException()
            }

            await user.delete()

            return {
                message: 'User Deleted Successfully'
            }

        } catch (error) {

            throw error

        }
    }

    public async updateUser({ request }: HttpContextContract) {

        try {

            const payload = await request.validate(IdValidator)

            const data = await request.validate(UpdateUserValidator)

            const user = await User.find(payload.id)

            if (!user) {
                throw new UserNotFoundException()
            }

            user.merge(data)

            await user.save()

            return user

        } catch (error) {

            throw error

        }
    }

    public async preloadTasksbyUser() {

        try {

            const data = await User.query().preload('tasks')

            return data

        } catch (error) {

            throw error

        }
    }
    public async joinsTasksbyUser() {

        try {

            const data = await Database
                .from('users')
                .join('tasks', 'users.id', 'tasks.user_id')
                .select(
                    'users.id',
                    'users.name',
                    'users.email',
                    'tasks.title',
                    'tasks.status'
                )

            return data

        } catch (error) {

            throw error

        }
    }

    public async createUserTask({ request }: HttpContextContract) {

        try {

            const data = await request.validate(UserValidator)

            console.log('REQUEST DATA = ', data)

            return await UserTaskService.createUserAndTask(data)

        } catch (error) {

            throw error

        }
    }
}
