import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),

    email: schema.string.optional({}, [
      rules.email(),
    ]),
  })

  public messages: CustomMessages = {
    'name.minLength': 'Name must be at least 3 characters',
    'name.maxLength': 'Name must not exceed 50 characters',
    'email.email': 'Please enter a valid email address',
  }
}