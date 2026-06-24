import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const key = request.header('api-key')

    if (key !== '12345') {
      return response.unauthorized({
        message: 'Invalid API Key',
      })
    }

    await next()
  }
}
