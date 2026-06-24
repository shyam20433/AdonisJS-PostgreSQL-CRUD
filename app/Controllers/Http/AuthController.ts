import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import AdminValidator from 'App/Validators/AdminValidator'

import InvalidCredentialsException from 'App/Exceptions/InvalidCredentialsException'

export default class AuthController {

  public async login({
    request,
  }: HttpContextContract) {

    const { username, password } =
      await request.validate(AdminValidator)

    const admin = await Admin.findBy(
      'username',
      username
    )

    if (!admin) {
      throw new InvalidCredentialsException()
    }

    if (admin.password !== password) {
      throw new InvalidCredentialsException()
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: 'admin'
      },
      Env.get('APP_KEY')
    )

    return { token }
  }
}