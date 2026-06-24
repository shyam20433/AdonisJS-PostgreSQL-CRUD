import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(50),
      rules.noAdmin()
    ]),

    email: schema.string({}, [
      rules.email(),
      rules.gmailOnly(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required',
    'name.minLength': 'Name must be at least 3 characters',
    'name.maxLength': 'Name must not exceed 50 characters',

    'email.required': 'Email is required',
    'email.email': 'Enter a valid email address',
    'email.unique': 'Email already exists',
  }
}