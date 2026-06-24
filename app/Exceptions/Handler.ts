import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserNotFoundException from 'App/Exceptions/UserNotFoundException'

export default class ExceptionHandler extends HttpExceptionHandler {

  constructor() {
    super(Logger)
  }

  public async handle(
    error: any,
    ctx: HttpContextContract
  ) {

    if (error instanceof UserNotFoundException) {

      return ctx.response.status(404).send({
        message: error.message
      })
    }

    return super.handle(error, ctx)
  }
}