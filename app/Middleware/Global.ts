import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class Global {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {


    await next()

    console.log('-----------------------')
    console.log('Method:', request.method())
    console.log('URL:', request.url())
    console.log('Time:', new Date())
    console.log('Request Finished')
    console.log('-----------------------')
  }
}
