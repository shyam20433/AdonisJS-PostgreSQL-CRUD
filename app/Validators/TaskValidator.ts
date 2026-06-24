import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Schema from '@ioc:Adonis/Lucid/Schema'

export default class TaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({}, [rules.minLength(2), rules.maxLength(100)]),

    description: schema.string.optional(),
    status: schema.enum(['TODO', 'IN_PROGRESS', 'COMPLETED'] as const),

    user_id: schema.number([rules.unsigned()]),
  })

  public messages = {
    '*.required': 'This field is required',
  }
}
