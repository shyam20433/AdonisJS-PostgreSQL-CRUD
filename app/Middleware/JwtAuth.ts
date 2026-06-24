 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class JwtAuth {

  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {

    const token = request.header('token')

    if (!token) {
      return response.unauthorized({
        message: 'Token Missing'
      })
    }

    try {

      const payload = jwt.verify(
        token,
        Env.get('APP_KEY')
      )

      console.log(payload)

      await next()

    } catch (error) {
      console.log('JWT ERROR =', error)

      return response.unauthorized({
        message: String(error)
      })
    }
  }
} 