import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {

    const role = request.header('role')

    if (role !== 'admin') {
      console.log('Access Delined')
      return response.forbidden({
        message: 'Admin access required'
      })
      
    }

    await next()
  }
}