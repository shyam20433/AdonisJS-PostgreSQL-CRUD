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
        success: false,
        message: 'Token Missing'
      })
    }

    try {

      const payload = jwt.verify(
        token,
        Env.get('APP_KEY')
      )

      console.log(payload)

    } catch (error) {

      console.log('JWT ERROR =', error)

      return response.unauthorized({
        success: false,
        message: 'Invalid Token'
      })
    }

    // Controller executes only after JWT verification succeeds
    await next()
  }
}