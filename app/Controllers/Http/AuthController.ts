import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import AdminValidator from 'App/Validators/AdminValidator'

export default class AuthController {

  public async login({
    request,
    response
  }: HttpContextContract) {

    try {

      const { username, password } =
        await request.validate(AdminValidator)

      const admin = await Admin.findBy(
        'username',
        username
      )

      if (!admin) {
        return response.badRequest({
          message: 'Invalid Username'
        })
      }

      if (admin.password !== password) {
        return response.badRequest({
          message: 'Invalid Password'
        })
      }

      const token = jwt.sign(
        {
          id: admin.id,
          role: 'admin'
        },
        Env.get('APP_KEY')
      )

      return { token }

    } catch (error:any) {

      return response.badRequest({
        message: 'Validation Failed',
        error: error.messages
      })

    }
  }
}