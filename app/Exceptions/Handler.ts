import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import UserNotFoundException from 'App/Exceptions/UserNotFoundException'
import InvalidCredentialsException from 'App/Exceptions/InvalidCredentialsException'
import TransactionFailedException from 'App/Exceptions/TransactionFailedException'

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
        success: false,
        message: error.message
      })
    }

    if (error instanceof InvalidCredentialsException) {
      return ctx.response.status(401).send({
        success: false,
        message: error.message
      })
    }

    if (error instanceof TransactionFailedException) {
      return ctx.response.status(400).send({
        success: false,
        message: error.message
      })
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        success: false,
        message: 'Validation Failed',
        errors: error.messages
      })
    }

    return super.handle(error, ctx)
  }
}